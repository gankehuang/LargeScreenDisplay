<template>
  <div class="page-container">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="3"
    />
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-for="(item, index) in markingPointList"
        :key="index"
        :vid="index"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
        :z-index="999"
      >
        <EventMarker
          :event-type="item.eventName"
          @markerClick="towatch(item, index)"
        />
      </el-amap-marker>
    </SimpleMap>
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <InfoBlock
          title="舆情统计"
          height="274px"
        >
          <leftOne />
        </InfoBlock>
        <InfoBlock
          title="舆情采集源"
          height="300px"
        >
          <leftTwo />
        </InfoBlock>
        <InfoBlock
          title="舆情热词"
          height="300px"
        >
          <leftThree />
        </InfoBlock>
      </div>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <InfoBlock
          title="舆情分析"
          height="300px"
        >
          <rightOne />
        </InfoBlock>
        <InfoBlock
          title="舆情走势"
          height="250px"
        >
          <rightTwo />
        </InfoBlock>
        <InfoBlock
          title="热门事件"
          height="280px"
        >
          <rightThree
            @showDetail="showDetail"
            @focusEvent="focusEvent"
          />
        </InfoBlock>
      </div>
    </transition>
    <!--事件信息弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="
        modal = ''
        eventInfo = null
      "
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      :grid-code="gridCode"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = 'event'"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @closeModal="modal = 'event'"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="modal = 'event'"
    />
  </div>
</template>

<script>
import {
  queryEventList,
  autoLogin
} from '@/api/riskPrevention/publicMonitor/index'
import leftOne from './leftOne'
import leftTwo from './leftTwo'
import leftThree from './leftThree'
import rightOne from './rightOne'
import rightTwo from './rightTwo'
import rightThree from './rightThree'
import eventMixin from './evenModule/eventMixin'
import { yuqingList } from './mock'
import navTabsMixin from '../mixin/navTabsMixin'
export default {
  components: {
    leftOne,
    leftTwo,
    rightOne,
    rightTwo,
    rightThree,
    leftThree
  },
  mixins: [eventMixin, navTabsMixin],
  data () {
    return {
      // btnList: ['热力图', '实时事件'],
      map: null,
      markingPointList: [],
      advancedForm: {
        excludeEventCodeList: 'supervise',
        type: 5
      }
    }
  },
  methods: {
    mapInit (map) {
      this.map = map
      this.map.setCenter([113.866167, 27.637209])
      this.map.setZoom(15)
      this.getList()
    },
    getList () {
      this.markingPointList = []
      queryEventList(1, 100, this.advancedForm)
        .then(res => {
          this.isLoading = false
          const { status, data } = res
          if (status === 200) {
            this.markingPointList = data.list.map((item, index) => {
              const objs = yuqingList.find(
                one => item.eventName.indexOf(one.name) > -1
              )
              if (objs !== undefined) {
                return {
                  ...item,
                  media: objs.media,
                  comments: objs.comments
                }
              } else {
                return {
                  ...item,
                  media: yuqingList[0].media,
                  comments: yuqingList[0].comments
                }
              }
            })
          }
        })
        .catch(() => {})
    },

    // 判断浏览区是否支持canvas
    isSupportCanvas () {
      const elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    },
    toggleHeatMapShow () {
      this.ifShow = !this.ifShow
      if (this.ifShow) {
        this.heatMap.show()
      } else {
        this.heatMap.hide()
      }
    },
    changeClisk () {
      autoLogin().then(res => {
        const { status, data } = res
        if (status === 200) {
          window.open(
            `http://nczfw.geostaryuqing.com:8080/auth?token=${data.token}`,
            '_blank'
          )
        }
      })
    },
    showDetail (item) {
      this.showEventDetail(item)
    },
    towatch (item, index) {
      this.showEventDetail(item)
    },
    focusEvent (item) {
      if (item.latitude && item.longitude) {
        this.map.setCenter([item.longitude, item.latitude])
        this.map.setZoom(32)
      } else {
        this.$message.warning('未获取到该事件的位置信息')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .app-main {
  top: 59px;
}
.page-bg {
  position: relative;
  margin-top: 15px;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
}
.btn {
  z-index: 3;
  width: 162px;
  height: 30px;
  position: absolute;
  top: 124px;
  right: 450px;
  display: flex;
  // .btnlist {
  //   width: 81px;
  //   height: 30px;
  //   background: url('~@/assets/images/publicMonitor/组 50.png') no-repeat;
  //   background-size: 100% 100%;
  //   text-align: PageCenter;
  //   font-size: 16px;
  //   line-height: 30px;
  //   font-weight: 400;
  //   color: #7dbcff;
  //   cursor: pointer;
  // }
  // .isSelected {
  //   background: url('~@/assets/images/publicMonitor/n 拷贝.png') no-repeat;
  //   background-size: 100% 100%;
  // }
}
// .btn {
//   position: absolute;
//   top: 74px;
//   right: 450px;
//   z-index: 3;
//   width: 48px;
//   height: 48px;
//   background: url('~@/assets/images/publicMonitor/图标.png') no-repeat;
//   background-size: 100% 100%;
//   border: none;
//   cursor: pointer;
// }
.btns {
  position: absolute;
  bottom: 14px;
  right: 450px;
  z-index: 3;
  width: 70px;
  height: 70px;
  background: url('~@/assets/images/publicMonitor/组 118.png') no-repeat;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
}
.eventMarker {
  padding-top: 10px;
  width: 150px;
  height: 85px;
  background: url('~@/assets/images/publicMonitor/组 63.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;
  color: #58a7fe;
  .position-icon {
    display: inline-block;
    margin-right: 6px;
  }
  .nums {
    color: #f2bd1b;
  }
}

/deep/ .amap-info-content {
  width: 266px;
  height: 100px;
  background: url('~@/assets/images/publicMonitor/组 63.png') no-repeat;
  background-size: 100% 100%;
}

.bottom-center .amap-info-sharp {
  bottom: -12px;
  left: 50%;
  margin-left: -15px;
  border-left: 15px solid transparent !important;
  border-right: 15px solid transparent !important;
  border-top: 20px solid transparent !important;
}
</style>
