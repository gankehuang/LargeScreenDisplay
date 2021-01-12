<template>
  <div class="mask-container">
    <div class="mask" />
    <div class="modal">
      <div
        class="btn-close"
        @click="bindBtnClose"
      />
      <div class="title-bar">
        {{ info.peopleLabel ? info.peopleLabel : '人员布控' }}-{{
          info.eventName ? formatField(info.eventName) : ''
        }}
      </div>
      <div class="title">
        事件详情
      </div>
      <div class="dt-container">
        <div class="dt">
          基础 信息
        </div>
        <div class="dt">
          人员 信息
        </div>
        <div class="dt">
          事件 图片
        </div>
        <div class="dt">
          临近 摄像头
        </div>
        <div class="dt">
          网格 人员
        </div>
      </div>
      <div class="dd-container">
        <div class="dd detail">
          <el-scrollbar style="height:100%;width:100%;">
            <p>事件状态：{{ info.statusText }}</p>
            <p>紧急程度：{{ info.emergencyLevelText }}</p>
            <p>事件类型：{{ info.typeText }}</p>
            <p>发生时间：{{ info.happenedTime }}</p>
            <p>
              事件描述：{{
                info.description
                  ? info.description
                  : info.eventName + '预警，请及时处理！'
              }}
            </p>
          </el-scrollbar>
        </div>
        <div class="dd peopel-info">
          <p v-if="info.peopleName && info.peopleName.indexOf(',') !== -1">
            姓名：<span
              v-for="(item, index) in info.peopleName.split(',')"
              :key="index"
            >{{ item | hideName }}</span>
          </p>
          <p v-else>
            姓名：{{ info.peopleName | hideName }}
          </p>
          <p
            v-if="
              info.peopleIdNumber && info.peopleIdNumber.indexOf(',') !== -1
            "
          >
            身份证：<span
              v-for="(item, index) in info.peopleIdNumber.split(',')"
              :key="index"
            >{{ item | hideIdCard }}</span>
          </p>
          <p v-else>
            身份证：{{ info.peopleIdNumber | hideIdCard }}
          </p>
          <p>人员类别：{{ info.peopleLabel }}</p>
          <!-- <p>事发地址：{{ info.location }}</p> -->
        </div>
        <div class="dd">
          <div class="item">
            <div v-if="info.snapImageUrl.indexOf(',') === -1">
              <el-image
                :src="
                  info.snapImageUrl
                    ? info.snapImageUrl
                    : require('@/assets/images/common/no-avatar.png')
                "
                class="img"
                :preview-src-list="[
                  info.snapImageUrl
                    ? info.snapImageUrl
                    : require('@/assets/images/common/no-avatar.png')
                ]"
                @click.native="isShowHkVideo = false"
              />
            </div>
            <div v-else>
              <el-image
                v-for="(item, index) in info.snapImageUrl.split(',')"
                :key="index"
                :src="
                  item ? item : require('@/assets/images/common/no-avatar.png')
                "
                class="img"
                :preview-src-list="[
                  item ? item : require('@/assets/images/common/no-avatar.png')
                ]"
                @click.native="isShowHkVideo = false"
              />
            </div>
            <p>上报图片</p>
          </div>
          <div
            v-if="info.processingImageUrl"
            class="item"
          >
            <el-image
              :src="
                info.processingImageUrl
                  ? info.processingImageUrl
                  : require('@/assets/images/common/no-avatar.png')
              "
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
            <flv-player
              :id="videoId"
              :src="playSrc"
              class="flvPlayer"
            />
          </div>
          <div
            v-if="info.gbIndexCode || info.cameraIndexCode"
            class="player"
            style="width:100%;height:100%;"
          >
            <IframeVideoPlay
              :camera-index-code="
                info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
              "
              class="video-item"
              width="100%"
              height="200"
            />
          </div>
          <div
            v-else
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
              <span>{{ item.gender === '1' ? '男' : '女' }}</span>
              <span>{{ item.phone | hidePhone }}</span>
            </div>
          </div>
          <div v-else>
            暂无数据
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <div
          class="btn btn1"
          @click="
            handelEventType(
              '事件指派',
              info.id,
              info.gridCode,
              info.peopleLabel
            )
          "
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
    </div>
  </div>
</template>

<script>
import { getGroupForce } from '@/api/common/event'

export default {
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
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      videoTitle: '南门',
      loading: false,
      playSrc: '',
      videoId: '',
      personList: []
    }
  },
  mounted () {
    this.startVideo()
    this.getGroupForce()
  },
  methods: {
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
    // 处理不同按钮操作
    handelEventType (dealType, id, gridCode, peopleLabel) {
      if (
        dealType === '事件指派' ||
        dealType === '事件上报' ||
        dealType === '事件处置' ||
        dealType === '事件详情'
      ) {
        this.$emit('onEventModal', dealType, id, gridCode, peopleLabel)
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
  background: url('~@/assets/images/events/eventModal-bg.png') no-repeat;
  background-size: 100% 100%;
  width: 929px;
  height: 699px;
  top: 50%;
  left: 50%;
  font-size: 14px;
  transform: translate(-50%, -50%);
  z-index: 999;
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
    .detail {
      overflow: auto;
    }
    /deep/ .el-scrollbar__wrap {
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
          margin-right: 6px;
          width: 72px;
          height: 72px;
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
        top: 247px;
        right: 19px;
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
        overflow-y: auto;
      }
    }
    .peopel-info {
      span {
        display: inline-block;
        min-width: 45px;
      }
    }
  }

  .bottom-btn {
    position: absolute;
    z-index: 999;
    right: 30px;
    bottom: 30px;
    display: flex;
    .btn {
      margin-right: 15px;
      background: url('~@/assets/images/events/submit-btn.png') no-repeat;
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
