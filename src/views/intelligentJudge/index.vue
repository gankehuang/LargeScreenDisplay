<template>
  <div class="intelligentJudge-container">
    <div class="center">
      <div class="intelligentJudge-left">
        <div class="part s1">
          <div class="all">
            <span>0</span>件
          </div>
          <div class="s-list">
            <div class="title">
              高危人群分析
            </div>
            <div class="s-item">
              <div>高危地区流入</div>
              <div>老人</div>
              <div>青少年</div>
              <div>易患病人群</div>
            </div>
          </div>
        </div>
        <div
          class="part s2"
          @click="showDetail(6)"
        >
          <div class="all">
            <span>{{ count.abnormalBehaviorCount }}</span>件
          </div>
          <div class="s-list">
            <div class="s-item">
              <div>平地摔倒</div>
              <div>人员闯入</div>
              <div>打架识别</div>
              <div>越界检测</div>
              <div>攀爬识别</div>
              <div>抛物识别</div>
            </div>
            <div class="title">
              高危行为分析
            </div>
          </div>
        </div>
        <div class="part s3">
          <div class="s-list">
            <div class="s-item">
              <div>人口流入</div>
              <div>公共场所</div>
              <div>营业场所</div>
            </div>
            <div class="title">
              高危区域分析
            </div>
          </div>
          <div class="all">
            <span>0</span>件
          </div>
        </div>
        <div class="part s4">
          <div class="all">
            <span>0</span>件
          </div>
          <div class="s-list">
            <div class="title">
              高危时段分析
            </div>
            <div class="s-item">
              <div>
                疫情变化监测
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="intelligentJudge-icon">
        <img
          src="@/assets/images/intelligentJudge/intelligentJudge-icon.png"
          alt=""
        >
      </div>
      <div class="intelligentJudge-right">
        <div
          class="part s5"
          @click="showDetail(1)"
        >
          <div class="all">
            <span>{{ count.communityBehaviorCount }}</span>件
          </div>
          <div class="s-list">
            <div class="title">
              社区异常分析
            </div>
            <div class="s-item">
              <div>同行人分析</div>
              <div>流动人口研判</div>
              <div>群租预警</div>
              <div>传销窝点嫌疑</div>
              <div>物联感知</div>
              <div>重点人员监测</div>
            </div>
          </div>
        </div>
        <div
          class="part s6"
          @click="showDetail(7)"
        >
          <div class="s-list">
            <div class="s-item">
              <div>人行道机动车违停</div>
              <div>非机动车违停</div>
            </div>
            <div class="title">
              车辆违停分析
            </div>
          </div>
          <div class="all">
            <span>{{ count.vehicleParkingCount }}</span>件
          </div>
        </div>
        <div
          class="part s7"
          @click="showDetail(9)"
        >
          <div class="all">
            <span>{{ count.peopleGatheringCount }}</span>件
          </div>
          <div class="s-list">
            <div class="s-item">
              <div>重点场所人员聚集</div>
              <div>沿街道路人员聚集</div>
              <div>人流密度</div>
            </div>
            <div class="title">
              人员聚集分析
            </div>
          </div>
        </div>
        <div
          class="part s8"
          @click="showDetail(8)"
        >
          <div class="s-list">
            <div class="s-item">
              <div>店外经营</div>
              <div>占道经营</div>
              <div>游商摊贩</div>
            </div>
            <div class="title">
              违规经营分析
            </div>
          </div>
          <div class="all">
            <span>{{ count.streetPavementCount }}</span>件
          </div>
        </div>
      </div>
    </div>
    <MesDetail
      :visible.sync="dialogShow"
      :type="type"
      @getModal="getModal"
    />
    <!--事件指派或上报弹框-->
    <!-- <DealModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      @onDealModal="onDealModal"
      @bindBtnClose="closeModal"
    /> -->

    <!--事件处置弹框-->
    <!-- <ShowToast
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @closeModal="closeModal"
    /> -->
    <!-- <DetailModal
      :id="detailModal.eventId"
      :visible.sync="detailModal.visible"
    /> -->
  </div>
</template>
<script>
import MesDetail from './mesDetail'
// import DealModal from '../event/modules/DealModal'
// import ShowToast from '../event/modules/ShowToast'
import { getZnypStatistic } from '@/api/intelligentJudge.js'
// import DetailModal from '@/views/ldczAdmin/report/DetailModal'

export default {
  components: {
    MesDetail
    // DealModal,
    // ShowToast,
    // DetailModal
  },
  data () {
    return {
      type: 1, // 展示信息类型
      dialogShow: false,
      count: {
        riverSupervisionCount: 66,
        cityscapeCount: 12,
        dangerousFireCount: 36,
        stagnantWaterCount: 68,
        abnormalBehaviorCount: 1195,
        vehicleParkingCount: 34,
        streetPavementCount: 56,
        peopleGatheringCount: 1235,
        communityBehaviorCount: 12
      },
      modal: '',
      detailModal: {
        eventId: null,
        visible: false
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    showDetail (type) {
      this.type = type
      this.dialogShow = true
    },
    getModal (modal, id) {
      switch (modal) {
        case 'order':
          this.onEventModal('事件指派', id)
          break
        case 'report':
          this.onEventModal('事件上报', id)
          break
        case 'deal':
          this.onEventModal('事件处置', id)
          break
        case 'detail':
          this.detailModal.eventId = id
          this.detailModal.visible = true
          break
        default:
          break
      }
    },
    // 关闭弹窗
    closeModal () {
      this.dialogShow = false
      this.modal = ''
    },
    // 监听事件详情弹框
    onEventModal (title, id) {
      if (title === '事件指派' || title === '事件上报') {
        this.modal = 'report'
        this.dealModalTitle = title
        this.needEventId = id
        return
      }

      if (title === '事件处置') {
        this.modal = 'deal'
        this.needEventId = id
        return
      }

      this.modal = ''
    },
    getList () {
      getZnypStatistic().then(res => {
        if (res.status === 200) {
          this.count = res.data
        }
      })
    },
    toCommunity () {
      const routeData =
        'http://223.84.148.163:8081/big-data/#/composite?type=survey'
      window.open(routeData, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.intelligentJudge-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 40px;
  background: rgb(2,12,71);
  .center {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/intelligentJudge/intelligentJudge.png") no-repeat center;
    background-size: 100% 100%;
    // margin-top: 40px;
    overflow: hidden;
    color: #00f9fa;
    .all {
      font-size: 14px;
      span {
        font-size: 36px;
        color: #ffa03a;
        margin-right: 10px;
        font-weight: bold;
      }
    }
    .title {
      font-weight: bold;
      font-size: 28px;
    }
    .s-item {
      font-size: 16px;
      color: #04b8d6;
      text-align: center;
      width: 18vw;
    }
    .part {
      position: relative;
      height: 20%;
      .all {
        position: absolute;
        cursor: pointer;
      }
      .s-list {
        position: relative;
        .title {
          position: absolute;
        }
        .s-item {
          position: absolute;
          div {
            line-height: 28px;
          }
        }
      }
    }
    .xq {
      width: 21.5vw;
      height: 29vh;
      background: url("~@/assets/images/intelligentJudge/xq-bg.png") no-repeat center;
      background-size: 100% 100%;
      margin-left: -10.8vw;
      left: 50%;
      top: 2vh;
      cursor: pointer;
      .all {
        top: 5vh;
        left: 2.5vw;
      }
      .title {
        right: 3.1vw;
        top: 1vh;
      }
      .s-item {
        top: 8.5vh;
        right: -4.62vw;
        div {
          width: 5.9vw;
          margin-right: 0.42vw;
          float: left;
        }
      }
    }
    .s1 {
      width: 34.8vw;
      height: 25.6vh;
      background: url("~@/assets/images/intelligentJudge/bg1.png") no-repeat center;
      background-size: 100% 100%;
      left: -2vw;
      .all {
        top: 1vh;
        left: 3.5vw;
      }
      .title {
        right: 12.1vw;
        top: 0vh;
      }
      .s-item {
        top: 6.5vh;
        right: 3.59vw;
        div {
          width: 6.9vw;
          margin-right: 0.42vw;
          float: left;
        }
      }
    }
    .s2 {
      width: 32vw;
      height: 18.2vh;
      background: url("~@/assets/images/intelligentJudge/bg2.png") no-repeat center;
      background-size: 100% 100%;
      left: -1.5vw;
      top: -5vh;
      .all {
        top: 1.5vh;
        left: 3.5vw;
      }
      .title {
        right: 9.1vw;
        top: -0.2vh;
      }
      .s-item {
        top: 5.5vh;
        right: 1.59vw;
        div {
          width: 6.9vw;
          margin-right: 0.42vw;
          float: left;
        }
      }
    }
    .s3 {
      width: 31.3vw;
      height: 18.6vh;
      background: url("~@/assets/images/intelligentJudge/bg3.png") no-repeat center;
      background-size: 100% 100%;
      top: -4vh;
      left: -2vw;
      .all {
        top: 1.5vh;
        left: 4vw;
      }
      .title {
        right: 8.7vw;
        top: 3.4vh;
      }
      .s-item {
        top: 8.5vh;
        right: 4.59vw;
      }
    }
    .s4 {
      width: 31.8vw;
      height: 29.1vh;
      background: url("~@/assets/images/intelligentJudge/bg4.png") no-repeat center;
      background-size: 100% 100%;
      top: -3.5vh;
      left: -3vw;
      .all {
        top: 8vh;
        left: 6.5vw;
      }
      .title {
        right: 11.3vw;
        top: 17.5vh;
      }
      .s-item {
        top: 22.5vh;
        right: 7.59vw;
      }
    }
    .s5 {
      width: 35vw;
      height: 32vh;
      background: url("~@/assets/images/intelligentJudge/bg5.png") no-repeat center;
      background-size: 100% 100%;
      top: -5.2vh;
      right: -0.7vw;
      .all {
        top: 8vh;
        right: 3vw;
      }
      .title {
        right: 17vw;
        top: 19vh;
      }
      .s-item {
        width: 15vw;
        top: 8.5vh;
        right: 14vw;
        div {
          width: 6.9vw;
          margin-right: 0.42vw;
          float: left;
        }
      }
    }
    .s6 {
      width: 31.8vw;
      height: 15.5vh;
      background: url("~@/assets/images/intelligentJudge/bg6.png") no-repeat center;
      background-size: 100% 100%;
      right: -2vw;
      top: -9vh;
      .all {
        top: 1.5vh;
        right: 4vw;
      }
      .title {
        right: 13.5vw;
        top: 1vh;
      }
      .s-item {
        width: 15vw;
        top: 7vh;
        right: 10.5vw;
      }
    }
    .s7 {
      width: 35.5vw;
      height: 15vh;
      background: url("~@/assets/images/intelligentJudge/bg7.png") no-repeat center;
      background-size: 100% 100%;
      right: -2vw;
      top: -3vh;
      .all {
        top: 4.5vh;
        right: 3.5vw;
      }
      .title {
        right: 11vw;
        top: -3.5vh;
      }
      .s-item {
        width: 15vw;
        top: 2vh;
        right: 10vw;
      }
    }
    .s8 {
      width: 31.3vw;
      height: 23.2vh;
      background: url("~@/assets/images/intelligentJudge/bg8.png") no-repeat center;
      background-size: 100% 100%;
      right: -0.2vw;
      top: -3vh;
      .all {
        top: 9.8vh;
        right: 3.55vw;
      }
      .title {
        right: 15vw;
        top: 2vh;
      }
      .s-item {
        width: 15vw;
        top: 8vh;
        right: 11vw;
      }
    }
    .intelligentJudge-left {
      float: left;
      margin: 7vh 0 0 10vw;
      width: 474px;
      height: 100%;
    }
    .intelligentJudge-icon {
      position: absolute;
      left: 50%;
      top: 55%;
      margin: -49px 0 0 -150px;
      img {
        width: 300px;
        height: 98px;
      }
    }
    .intelligentJudge-right {
      float: right;
      margin: 4% 6% 0 0;
      width: 674px;
      height: 100%;
    }
  }
}
</style>
