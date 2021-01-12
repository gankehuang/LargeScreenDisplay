import EventModal from './EventModal'
import EventCirculationModal from './EventCirculationModal'
import EventHandleModal from './EventHandleModal'
import EventDetailModal from './EventDetails/DetailModal'

import { getEventArr } from '@/api/common/event'
export default {
  components: {
    EventModal,
    EventCirculationModal,
    EventHandleModal,
    EventDetailModal
  },
  data () {
    return {
      modal: '',
      eventInfo: null,
      needEventId: '',
      dealModalTitle: '',
      selected: ['设备感知', '群众上报', '督导协办', '主动发现'],
      eventList: [],
      eventDetailModal: {
        visible: false,
        info: null
      },
      eventTypeText: '',
      eventAllList: [],
      gridCode: '',
      peopleLabel: ''
    }
  },
  computed: {
    zzaqList () {
      return this.eventList.filter(event => event.typeText === '政治安全')
    },
    shzaList () {
      return this.eventList.filter(event => event.typeText === '社会治安')
    },
    mdjfList () {
      return this.eventList.filter(event => event.typeText === '矛盾纠纷')
    },
    ggaqList () {
      return this.eventList.filter(event => event.typeText === '公共安全')
    },
    wlyqList () {
      return this.eventList.filter(event => event.typeText === '网络安全')
    }
  },
  watch: {
    $route () {
      this.warningFocus(this.$route.query.id)
    }
  },
  methods: {
    mapInit (map) {
      this.map = map
      this.map.setCenter([113.885191, 27.620516])
      this.map.setZoom(12)
      this.getAllEventList()
      this.renderGrid()
    },
    async getAllEventList () {
      const { data } = await getEventArr({
        excludeEventCodeList: 'supervise'
      })
      this.eventList = data.filter((item, index) => {
        item.isShow = true
        return item.longitude && item.latitude
      })
      this.eventList = toRepeat(this.eventList, 'deviceSerialNo')
      function toRepeat (arr, key) {
        const res = new Map()
        return arr.filter(
          (list) => !res.has(list[key]) && res.set(list[key], 1)
        )
      }
      this.eventAllList = [...data]
      this.eventList = this.eventList.slice(0, 10)

      if (this.$route.query.id) {
        this.warningFocus(this.$route.query.id)
      }
    },

    focusEvent (item) {
      this.eventList = []
      if (item.position.length && item.position[0] && item.position[1]) {
        this.eventTypeText = item.typeText
        this.eventInfo = item
        this.map.setCenter([item.longitude, item.latitude])
        this.map.setZoom(32)
      } else {
        this.$message.warning('未获取到该事件的位置信息')
      }
    },
    todetails (item) {
      this.showEventDetail(item)
    },
    // 监听事件指派和上报弹框
    onDealModal () {
      this.modal = ''
    },
    // 跳转页面聚焦当前点击的事件
    warningFocus (curId) {
      this.eventList = []
      const event = this.eventAllList.filter(item => item.id === curId)
      if (!event.length) return

      const needItem = event[0]

      this.focusEvent({
        position: [needItem.longitude, needItem.latitude],
        ...needItem
      })
    },
    // 监听事件详情弹框
    onEventModal (title, id, gridCode, peopleLabel) {
      if (title === '事件指派' || title === '事件上报') {
        this.modal = 'report'
        this.dealModalTitle = title
        this.needEventId = id
        this.gridCode = gridCode
        this.peopleLabel = peopleLabel
        return
      }

      if (title === '事件详情') {
        this.modal = ''
        this.eventDetailModal.visible = true
        this.eventDetailModal.info = {
          id: id
        }
        return
      }

      if (title === '事件处置') {
        this.modal = 'deal'
        this.needEventId = id
        return
      }

      this.modal = ''
    },
    // 监听事件处置弹框
    onShowToast () {
      this.modal = ''
    },
    // 查看事件弹框
    showEventDetail (info) {
      this.eventInfo = info
      this.modal = 'event'
    }
  }
}
