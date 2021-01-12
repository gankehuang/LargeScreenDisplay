import EventModal from './EventModal'
import EventCirculationModal from './EventCirculationModal'
import EventHandleModal from './EventHandleModal'
import EventDetailModal from './EventDetails/DetailModal'
import CheckModal from './CheckModal'

export default {
  components: {
    EventModal,
    EventCirculationModal,
    EventHandleModal,
    EventDetailModal,
    CheckModal
  },
  data () {
    return {
      modal: '',
      eventInfo: null,
      needEventId: '',
      dealModalTitle: '',
      eventDetailModal: {
        visible: false,
        info: null
      },
      processingDesc: '',
      processingTime: '',
      gridCode: ''
    }
  },
  methods: {
    // 监听事件指派和上报弹框
    onDealModal () {
      this.modal = ''
      this.getList()
    },
    // 聚焦当前点击的事件
    warningFocus (item) {
      let curId = ''

      if (typeof item === 'string') {
        curId = item
      } else {
        // 解决事件重叠问题
        curId = item.id
        this._eventIsShow(item)
      }

      const event = this.eventAllList.find(item => item.id === curId)
      if (!event) return

      // 刷新动画
      this.focusingId = null
      setTimeout(() => {
        this.focusingId = curId
      }, 0)

      if (event.longitude && event.latitude) {
        this.map.setCenter([event.longitude, event.latitude])
        this.map.setZoom(20)
      }
    },
    // 监听事件详情弹框
    onEventModal (title, id, gridCode) {
      if (title === '事件指派' || title === '事件上报') {
        this.modal = 'report'
        this.dealModalTitle = title
        this.needEventId = id
        this.gridCode = gridCode
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
      this.getList()
    },
    // 监听核查弹框
    onCheckModal () {
      this.modal = ''
      this.getList()
    },
    // 查看事件弹框
    showEventDetail (info) {
      console.log(info, '事件信息')
      this.eventInfo = info
      this.modal = 'event'
    }
  }
}
