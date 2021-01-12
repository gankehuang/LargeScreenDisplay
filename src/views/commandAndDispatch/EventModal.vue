<template>
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
        位置 信息
      </div>
      <div class="dt">
        事件 图片
      </div>
      <div class="dt">
        临近 摄像头
      </div>
      <div class="dt">
        附近 人员
      </div>
    </div>
    <div class="dd-container">
      <div class="dd detail">
        <p>事件状态：{{ info.statusText }}</p>
        <p>紧急程度：{{ info.emergencyLevelText }}</p>
        <p>事件类型：{{ info.typeText }}</p>
        <p>发生时间：{{ info.happenedTime }}</p>
        <p>事件描述：{{ info.description }}</p>
      </div>
      <div class="dd">
        <p>所属网格：{{ info.gridName }}</p>
        <p>涉事单位：{{ info.involvedUnitText }}</p>
        <p>事发地址：{{ info.location }}</p>
      </div>
      <div class="dd">
        <div
          class="item"
        >
          <img-preview
            :src="info.snapImageUrl ? info.snapImageUrl : require('@/assets/images/commandAndDispatch/event/no-avatar.png')"
            :size="72"
            class="img"
            @click.native="isShowHkVideo = false"
          />
          <p>上报图片</p>
        </div>
        <div class="item">
          <img-preview
            :src="info.processingImageUrl ? info.processingImageUrl : require('@/assets/images/commandAndDispatch/event/no-avatar.png')"
            :size="72"
            class="img"
            @click.native="isShowHkVideo = false"
          />
          <p>处理图片</p>
        </div>
      </div>
      <div
        class="dd space"
        style="padding:0;"
      >
        <div
          v-if="playSrc"
          v-loading="loading"
          class="player"
        >
          <div class="vtitle">
            <img src="@/assets/images/common/controll.png">
            <div class="name">
              {{ videoTitle }}
            </div>
          </div>
          <!-- <flv-player
            :id="videoId"
            :src="playSrc"
            class="flvPlayer"
          /> -->
        </div>
        <div
          v-if="info.deviceSerialNo"
          class="player"
          style="width:100%;height:100%;"
        >
          <!-- <VideoPlay
            v-if="info.deviceSerialNo && isShowHkVideo"
            :width="260"
            :height="235"
            :camera-index-code="info.deviceSerialNo"
          /> -->
        </div>
        <div
          v-if="!playSrc && !info.deviceSerialNo "
          style="padding-top:20px;padding-left: 20px;"
        >
          暂无相关视频
        </div>
      </div>
      <div class="dd">
        <div
          v-if="personList.length"
          class="people-list"
        >
          <div class="p-title">
            <span>姓名</span>
            <span>性别</span>
            <span>手机号</span>
          </div>
          <div
            v-for="item in personList"
            :key="item.id"
            class="p-mes"
          >
            <span>{{ item.name | hideName }}</span>
            <span>{{ item.sex === 'M' ? '男' : '女' }}</span>
            <span>{{ item.phone | hidePhone }}</span>
          </div>
        </div>
        <div v-else>
          暂无数据
        </div>
      </div>
    </div>
    <div
      class="btn btn1"
      @click="handelEventType('事件指派', info.id)"
    >
      指派
    </div>
    <div
      class="btn btn2"
      @click="handelEventType('事件上报')"
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
  </div>
</template>

<script>
// import ImgPreview from '@/components/ImgPreview'
// import FlvPlayer from './FlvPlayer'
import { startVideo } from '@/api/perception'
// import VideoPlay from '@/components/VideoPlay'
import { getGroupForce } from '@/api/event'

export default {
  components: {
    // ImgPreview,
    // FlvPlayer
    // VideoPlay
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
      videoTitle: '南门',
      loading: false,
      playSrc: '',
      videoId: '',
      personList: [],
      isShowHkVideo: true
    }
  },
  computed: {
    needName () {
      if (this.info.extension && this.info.extension.name) {
        if (this.info.extension.idNo) {
          return this.info.extension.name + '-' + this.info.extension.idNo
        } else {
          return this.info.extension.name
        }
      } else {
        return '-'
      }
    }
  },
  mounted () {
    this.startVideo()
    this._getGroupForce()
    document.addEventListener('click', this.handleCloseImg)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleCloseImg)
  },
  methods: {
    // 关闭事件详情弹框
    bindBtnClose () {
      this.$emit('bindBtnClose')
    },
    handleCloseImg (e) {
      if (e.target.className === 'el-icon-circle-close') {
        this.isShowHkVideo = true
      }
    },
    _getGroupForce () {
      getGroupForce().then(res => {
        const list = res[2]
        const classObj = {}
        list.groupForceList.forEach((item) => {
          if (!classObj['' + item.job + '']) {
            classObj['' + item.job + ''] = [item]
          } else {
            classObj['' + item.job + ''].push(item)
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
    handelEventType (dealType, id) {
      if (
        dealType === '事件指派' ||
                    dealType === '事件上报' ||
                    dealType === '事件处置'
      ) {
        this.$emit('onEventModal', dealType, id)
        return
      }

      if (dealType === '调度') {
        this.$router.push({
          path: '/zhddAdmin/coordinatedCommand',
          query: {
            longitude: this.info.longitude,
            latitude: this.info.latitude
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
        background: url("~@/assets/images/commandAndDispatch/event/eventModal-bg.png");
        width: 929px;
        height: 699px;
        top: 50%;
        left: 50%;
        font-size: 14px;
        transform: translate(-50%, -50%);
        z-index: 999999999;
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
            height: 100%;
            position: absolute;

            .status {
                color: #00ffff;
                font-size: 14px;
            }

            .dd {
                position: absolute;
                font-size: 14px;
                color: #fff;
                padding: 8px 10px;
                // .noscrollbar();
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
                }
                &:nth-of-type(1) {
                    width: 289px;
                    height: 153px;
                    top: 26px;
                    right: 76px;
                }
                &:nth-of-type(2) {
                    width: 190px;
                    height: 106px;
                    top: 258px;
                    right: 22px;
                }
                &:nth-of-type(3) {
                    width: 210px;
                    height: 130px;
                    right: 60px;
                    bottom: 149px;
                    img {
                        width: 24px;
                        height: 30px;
                    }
                }
                &:nth-of-type(4) {
                    width: 260px;
                    height: 235px;
                    bottom: 115px;
                    left: 29px;
                }
                &:nth-of-type(5) {
                    width: 246px;
                    height: 166px;
                    top: 35px;
                    left: 25px;
                    overflow-y: scroll;
                }
                .player {}
            }
        }
        .btn {
            background: url("~@/assets/images/commandAndDispatch/event/btn.png") no-repeat;
            background-size: 100% 100%;
            width: 65px;
            height: 38px;
            border: none;
            text-align: center;
            line-height: 38px;
            outline: none;
            color: #fff;
            cursor: pointer;
            bottom: 36px;
            z-index: 3;
            position: absolute;
            // .PageCenter();
            &.btn1 {
                right: 276px;
            }
            &.btn2 {
                right: 190px;
            }
            &.btn3 {
                right: 105px;
            }
            &.btn4 {
                right: 20px;
            }
        }
    }
</style>
<style>
    .el-image-viewer__btn {
        bottom: 80px;
    }
    .el-image-viewer__wrapper {
        top: -80px;
    }

    .el-image-viewer__img {
        max-height: 70% !important;
    }
</style>
