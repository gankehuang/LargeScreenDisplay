<template>
  <div class="mask-container">
    <div class="mask" />
    <div class="modal">
      <div
        class="btn-close"
        @click="bindBtnClose"
      />
      <div class="title-bar">
        {{ info.eventName ? formatField(info.eventName) : "" }}
      </div>
      <div class="title">
        事件详情
      </div>
      <div class="dt-container">
        <div class="dt">
          基础 信息
        </div>
        <div class="dt">
          媒体 报告
        </div>
        <div class="dt">
          事件 图片
        </div>
        <div class="dt">
          事件 专报
        </div>
        <div class="dt">
          处置 单位
        </div>
      </div>
      <div class="dd-container">
        <div class="dd detail">
          <el-scrollbar style="height:100%;width:100%;">
            <p>事件主题：{{ info.eventName }}</p>
            <p>紧急程度：{{ info.emergencyLevelText }}</p>
            <p>事件类型：{{ info.typeText }}</p>
            <p>发生时间：{{ info.happenedTime }}</p>
          </el-scrollbar>
        </div>
        <div class="dd mtbd">
          <!-- <p>新浪微博 <span>凤凰新闻</span></p>
        <p>新文化网<span>搜狐网</span></p> -->
          <p
            v-for="(item, index) in info.media"
            :key="index"
          >
            {{ item }}
          </p>
        </div>
        <div class="dd">
          <div class="item">
            <el-image
              fit="cover"
              :src="info.snapImageUrl"
              class="img"
              :preview-src-list="[info.snapImageUrl]"
            />
          </div>
        </div>
        <div
          class="dd space"
          style="padding:0;"
        >
          <p>
            {{ info.description }}
          </p>
          <p
            class="pdfs"
            @click="towatch"
          >
            舆情报告
          </p>
        </div>
        <div class="dd xgdw">
          <el-scrollbar style="height:100%;width:100%;">
            <p
              v-for="(item, index) in info.comments"
              :key="index"
            >
              {{ item }}
            </p>
          </el-scrollbar>
        </div>
      </div>
      <div class="bottom-btn">
        <div
          class="btn btn1"
          @click="handelEventType('事件指派', info.id)"
        >
          指派
        </div>
        <div
          class="btn btn2"
          @click="handelEventType('事件上报', info.id)"
        >
          上报
        </div>
        <div
          class="btn btn3"
          @click="handelEventType('事件处置', info.id)"
        >
          处置
        </div>
        <div
          class="btn btn4"
          @click="handelEventType('调度')"
        >
          调度
        </div>
        <div
          class="btn btn5"
          @click="handelEventType('事件详情', info.id)"
        >
          详情
        </div>
      </div>
      <PdfModal
        :visible.sync="pdfModalVisible"
        :pdf-file="pdfFile"
      />
    </div>
  </div>
</template>

<script>
// import FlvPlayer from '@/components/FlvPlayer'
import { startVideo, getGroupForce } from '@/api/riskPrevention/publicMonitor/index'
import PdfModal from '../PdfModal'
export default {
  components: {
    // FlvPlayer,
    PdfModal
  },
  filters: {
    statusFilter (value) {
      switch (value) {
        case 0:
          return '无效'
        case 1:
          return '未处理'
        case 2:
          return '处置中'
        case 3:
          return '已完成'
        case 4:
          return '超时'
        case 5:
          return '催单'
        default:
          return ''
      }
    }
  },
  props: {
    info: Object
  },
  data () {
    return {
      pdfFile: {
        file: this.info.attachment,
        numPages: 8
      },
      pdfModalVisible: false,
      videoTitle: '南门',
      loading: false,
      playSrc: '',
      videoId: '',
      personList: []
    }
  },
  mounted () {
    console.log(this.info)
    this.startVideo()
    this.getGroupForce()
  },
  methods: {
    towatch () {
      this.pdfModalVisible = true
    },
    // 关闭事件详情弹框
    bindBtnClose () {
      this.$emit('bindBtnClose')
    },
    getGroupForce () {
      getGroupForce({
        gridCode: this.info.gridCode,
        eventId: this.info.eventId
      }).then(res => {
        const classObj = {}
        classObj['网格员'] = []
        res.data.forEach(item => {
          if (item.industryTypeName) {
            if (!classObj['' + item.industryTypeName + '']) {
              classObj['' + item.industryTypeName + ''] = [item]
            } else {
              classObj['' + item.industryTypeName + ''].push(item)
            }
          } else {
            classObj['网格员'].push(item)
          }
        })

        this.personList = classObj['网格员']
      })
    },
    // 开启视频
    async startVideo () {
      if (
        this.info.extension &&
        this.info.extension.deviceType &&
        this.info.extension.serialNumber
      ) {
        this.loading = true

        const res = await startVideo({
          deviceType: this.info.extension.deviceType,
          serialNumber: this.info.extension.serialNumber
        })

        this.playSrc = res.url
        this.videoId = res.id
        this.loading = false
      }
    },
    // 处理不同按钮操作
    handelEventType (dealType, id, gridCode) {
      if (
        dealType === '事件指派' ||
        dealType === '事件上报' ||
        dealType === '事件处置' ||
        dealType === '事件详情'
      ) {
        this.$emit('onEventModal', dealType, id, gridCode)
        return
      }

      if (dealType === '调度') {
        this.$router.push({
          path: '/intelligentCommand/command',
          query: {
            longitude: this.info.longitude,
            latitude: this.info.latitude,
            source: this.info.source
          }
        })
      }
    },
    // 格式化数据
    formatField (val) {
      return val || '-'
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/images/publicMonitor/eventModal-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 929px;
  height: 699px;
  top: 50%;
  left: 50%;
  font-size: 14px;
  transform: translate(-50%, -50%);
  z-index: 999;
  /deep/ .el-scrollbar__wrap {
    overflow: auto;
  }
  .title-bar {
    color: #0ff;
    font-size: 14px;
    text-align: center;
    line-height: 34px;
    margin-top: 13px;
    font-weight: bold;
  }
  .btn-close {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 23px;
    right: 27px;
    z-index: 3;
    cursor: pointer;
  }
  .title {
    width: 2em;
    position: absolute;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    top: 335px;
    left: 473px;
  }
  .dt-container {
    width: 100%;
    height: 100%;
    color: #0ff;
    font-size: 14px;
    position: absolute;
    .dt {
      width: 3em;
      position: absolute;
      font-weight: bold;
      text-align: center;
      &:nth-of-type(1) {
        top: 114px;
        left: 488px;
      }
      &:nth-of-type(2) {
        top: 245px;
        right: 250px;
      }
      &:nth-of-type(3) {
        right: 314px;
        bottom: 231px;
      }
      &:nth-of-type(4) {
        left: 335px;
        bottom: 257px;
      }
      &:nth-of-type(5) {
        top: 203px;
        left: 290px;
      }
    }
  }
  .dd-container {
    z-index: 2;
    width: 100%;
    height: 80%;
    position: absolute;

    .status {
      color: #00ffff;
      font-size: 14px;
    }
    .detail {
      margin: 10px 0 0 20px;
      overflow: auto;
    }

    .dd {
      position: absolute;
      font-size: 14px;
      color: #fff;
      padding: 8px 10px;
      p {
        line-height: 26px;
        margin: 0;
        span {
          width: 70px;
          display: inline-block;
        }
      }
      .people-list {
        line-height: 24px;
        .p-title {
          display: flex;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 6px;
          span {
            &:nth-of-type(1) {
              width: 48px;
            }
            &:nth-of-type(2) {
              width: 74px;
            }
          }
        }
        .p-mes {
          display: flex;
          line-height: 30px;
          span {
            &:nth-of-type(1) {
              width: 48px;
            }
            &:nth-of-type(2) {
              width: 74px;
            }
          }
        }
      }
      .item {
        display: inline-block;
        text-align: center;
        margin: 10px;
        cursor: pointer;

        .img {
          width: 180px;
          height: 100px;
        }
      }
      &:nth-of-type(1) {
        width: 289px;
        height: 153px;
        top: 26px;
        right: 76px;
      }
      &:nth-of-type(2) {
        width: 200px;
        height: 106px;
        top: 242px;
        right: 19px;
      }
      &:nth-of-type(3) {
        width: 210px;
        height: 130px;
        right: 60px;
        bottom: 10px;
        img {
          width: 24px;
          height: 30px;
        }
      }
      &:nth-of-type(4) {
        width: 260px;
        height: 235px;
        bottom: -35px;
        left: 29px;
      }
      &:nth-of-type(5) {
        width: 246px;
        height: 166px;
        top: 35px;
        left: 25px;
      }
      .player {
      }
    }
    .mtbd {
      p {
        padding-left: 10px;
      }
      span {
        display: inline-block;
        margin-left: 20px;
      }
    }
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .space {
      padding: 20px 10px !important;
      .pdfs {
        color: #17fbff;
        cursor: pointer;
      }
    }
    .xgdw {
      overflow: hidden;
      /deep/ .el-scrollbar__wrap {
        overflow: auto;
      }
      p {
        font-size: 16px;
        margin: 0 10px;
      }
    }
  }

  .bottom-btn {
    position: absolute;
    right: 30px;
    bottom: 30px;
    display: flex;
    .btn {
      margin-right: 15px;
      background: url("~@/assets/images/publicMonitor/submit-btn.png") no-repeat;
      background-size: 100% 100%;
      width: 65px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border: none;
      outline: none;
      color: #fff;
      cursor: pointer;
      bottom: 36px;
    }
  }
}
</style>
