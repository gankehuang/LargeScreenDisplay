<template>
  <div>
    <div class="modal-top">
      <div class="top-left">
        <div class="event-introduction">
          <div>
            {{ `[${introductionInfo.typeText}]` }}
            <span class="text-mark">{{ introductionInfo.eventName }}</span>
          </div>
          <div>
            于<span class="text-mark">{{ introductionInfo.happenTime }}</span>
            在 <span class="text-mark">{{ introductionInfo.addr }}</span> 发生
            <span class="text-mark">{{ introductionInfo.eventDesc }}</span>
          </div>
        </div>

        <div class="event-info">
          <el-row>
            <el-col :span="8">
              <span class="item-label">信息来源：</span>
              {{ eventDetailsInfo.sourceText }}
            </el-col>
            <el-col :span="8">
              <span class="item-label">采集渠道：</span>
              {{ eventDetailsInfo.collectChannelText }}
            </el-col>
            <el-col :span="8">
              <span class="item-label">紧急程度：</span>
              {{ eventDetailsInfo.degreeText }}
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <span class="item-label">影响范围：</span>
              {{ eventDetailsInfo.effectText }}
            </el-col>
            <el-col :span="12">
              <span class="item-label">联系人员：</span>
              {{ eventDetailsInfo.contactUser }}
              {{ eventDetailsInfo.tel ? `(${eventDetailsInfo.tel})` : "" }}
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <span class="item-label">当前状态：</span>
              {{ eventDetailsInfo.status }}
            </el-col>
            <el-col :span="12">
              <span class="item-label">事件编号：</span>
              {{ eventDetailsInfo.eventCode }}
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <span class="item-label">涉及人员：</span>
              {{
                eventDetailsInfo.involvePerson
                  ? eventDetailsInfo.involvePerson
                  : "-"
              }}
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="item-label">所属网格：</span>
              {{ eventDetailsInfo.gridName }}
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="division-bg" />
      <div class="top-right">
        <div
          v-if="!photoList.length"
          class="no-img"
        />
        <div
          v-else
          class="imgList"
        >
          <el-image
            style="width:100%;height:320px;"
            :src="active.file"
            fit="fit"
            :preview-src-list="[active.file]"
          />
        </div>
        <div class="cur-img-name">
          <div>
            {{ active.name }}
          </div>
          <div class="right">
            <div
              v-for="index in photoList.length"
              :key="index"
              class="choose"
            >
              <img
                v-if="active.status === index"
                src="@/assets/images/servingMasses/eventDetails-choosed.png"
                alt=""
              >
              <span
                v-else
                class="unchoose"
                @click="chooseImage(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-step">
      <div class="step-top">
        <div class="step-title">
          处理环节
        </div>
        <div class="step-legend">
          <div class="legend-item">
            <i class="legend-icon" />
            <span>当前环节</span>
          </div>
          <div class="legend-item">
            <i class="legend-icon" />
            <span>历史环节</span>
          </div>
          <div class="legend-item">
            <i class="legend-icon" />
            <span>驳回环节</span>
          </div>
          <div class="legend-item">
            <i class="legend-icon" />
            <span>撤回环节</span>
          </div>
        </div>
      </div>

      <el-row class="step-notes">
        <el-col
          class="notes-item"
          :span="6"
        >
          办理环节
        </el-col>
        <el-col
          class="notes-item"
          :span="6"
        >
          办理人/办理时间
        </el-col>
        <el-col
          class="notes-item"
          :span="6"
        >
          办理意见
        </el-col>
      </el-row>

      <div class="step-box">
        <el-scrollbar style="height:220px;">
          <div ref="stepBox">
            <div class="step-bg" />
            <div
              class="step-line"
              :style="{ height: stepLineHeight + 'px' }"
            />
            <div
              v-for="(item, index) in dealList"
              :key="index"
              class="step-item"
            >
              <div class="step-name">
                {{ item.handleNode }}
              </div>
              <img
                class="step-icon"
                src="@/assets/images/servingMasses/eventDetails-history-icon.png"
              >
              <div class="step-content">
                <div class="info">
                  <span class="text-mark">{{ item.handleUser }}</span> 耗时
                  <span
                    v-if="item.handleTime < 1"
                    class="text-mark"
                  >小于1分钟</span>
                  <span
                    v-else
                    class="text-mark"
                  >{{ item.handleTime }}分钟</span>
                </div>
                <div class="time">
                  <span class="text-mark">办结时间：</span>
                  <span>{{ item.endTime }}</span>
                </div>
              </div>
              <div class="step-opinion">
                {{ item.remarks || "暂无" }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryGovernEventDetail,
  queryGovernEventProcessInfo
} from '@/api/servingMasses'
export default {
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      stepLineHeight: 0,
      loading: false,
      introductionInfo: {
        typeText: '',
        eventName: '',
        happenTime: '',
        addr: '',
        eventDesc: ''
      },
      eventDetailsInfo: {
        sourceText: '',
        collectChannelText: '',
        degreeText: '',
        effectText: '',
        contactUser: '',
        status: '',
        eventCode: '',
        involvePerson: '',
        gridName: ''
      },
      photoList: [],
      dealList: [],
      active: {
        name: '处理前图片',
        status: 1,
        file: ''
      }
    }
  },
  mounted () {
    this.fetchEventDetails()
    this.queryGovernEventProcessInfo()
  },
  methods: {
    bindBtnClose () {
      this.$emit('update:visible', false)
    },
    fetchEventDetails () {
      this.loading = true
      queryGovernEventDetail({
        id: this.info.eventId
      }).then(res => {
        const { status, data } = res
        this.loading = false
        if (status === 200) {
          this.introductionInfo = {
            typeText: data.typeText,
            eventName: data.eventName,
            happenTime: data.happenTime,
            addr: data.addr,
            eventDesc: data.eventDesc
          }

          this.eventDetailsInfo = {
            sourceText: data.sourceText,
            collectChannelText: data.collectChannelText,
            degreeText: data.degreeText,
            effectText: data.effectText,
            contactUser: data.contactUser,
            status: data.status,
            eventCode: data.eventCode,
            involvePerson: data.involvePerson,
            gridName: data.gridName
          }

          this.photoList = data.photo
          this.active.file = this.photoList[0].file_path
        }
      })
    },
    chooseImage (index) {
      this.active.status = index
      this.active.file = this.photoList[index - 1].file_path
      switch (this.photoList[index - 1].EVENT_SEQ) {
        case '1':
          this.active.name = '处理前图片'
          break
        case '2':
          this.active.name = '处理中图片'
          break
        case '3':
          this.active.name = '处理后图片'
          break
      }
    },
    // 处理环节查询
    queryGovernEventProcessInfo () {
      queryGovernEventProcessInfo({ instanceId: this.info.instanceId }).then(
        res => {
          if (res.data.length > 0 && res.status === 200) {
            this.dealList = res.data.reverse()

            this.$nextTick(() => {
              this.stepLineHeight = this.$refs.stepBox.clientHeight + 20
            })
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.modal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  .top-left {
    flex: 0 0 60%;
    border: 1px solid #09468e;
    padding: 20px;
    .event-introduction {
      line-height: 1.8;
      padding-bottom: 26px;
      border-bottom: 1px solid #09468e;
      .text-mark {
        color: #00ffff;
      }
    }
    .event-info {
      padding-top: 30px;
      .item-label {
        color: #3b9afe;
      }

      .el-row {
        margin-bottom: 20px;
      }
    }
  }

  .division-bg {
    width: 4px;
    height: 187px;
    background: url("~@/assets/images/servingMasses/eventDetails-division-bg.png")
    no-repeat;
    background-size: 100% 100%;
  }

  .top-right {
    position: relative;
    flex: 0 0 38%;
    height: 365px;
    border: 1px solid #09468e;
    color: #fff;

    .no-img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 146px;
      height: 116px;
      background: url("~@/assets/images/servingMasses/eventDetails-no-img.png") no-repeat;
      background-size: 100% 100%;
    }
    .imgList {
      position: relative;
      height: 400px;
      .el-image {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .cur-img-name {
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 0;
      height: 42px;
      width: 100%;
      background: rgba(58, 89, 157, 0.26);
      padding: 14px 0 14px 16px;
      .right {
        display: flex;
        .choose {
          flex: 1;
          img {
            margin-right: 10px;
          }
          .unchoose {
            display: block;
            width: 24px;
            height: 14px;
            background: #0159b6;
            margin: 2px 10px 0 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.step-top {
  display: flex;
  padding: 20px 10px;
  color: #fff;

  .step-legend {
    display: flex;
    .legend-item {
      margin-left: 50px;

      .legend-icon {
        display: inline-block;
        margin-right: 5px;
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }

      &:nth-child(1) {
        .legend-icon {
          background: url("~@/assets/images/servingMasses/eventDetails-current-icon.png")
          no-repeat;
          background-size: 100% 100%;
        }
      }

      &:nth-child(2) {
        .legend-icon {
          background: url("~@/assets/images/servingMasses/eventDetails-history-icon.png")
          no-repeat;
          background-size: 100% 100%;
        }
      }

      &:nth-child(3) {
        .legend-icon {
          background: url("~@/assets/images/servingMasses/eventDetails-reject-icon.png")
          no-repeat;
          background-size: 100% 100%;
        }
      }

      &:nth-child(4) {
        .legend-icon {
          background: url("~@/assets/images/servingMasses/eventDetails-withdraw-icon.png")
          no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}

.step-notes {
  display: flex;
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: #031234;
  border: 1px solid #09468e;
  color: #fff;

  .notes-item {
    text-align: center;
  }
}

.step-box {
  position: relative;
  color: #fff;
  .step-bg {
    position: absolute;
    z-index: -1;
    left: -60px;
    width: 528px;
    height: 163px;
    background: url("~@/assets/images/servingMasses/eventDetails-line-top-bg.png")
    no-repeat;
    background-size: 100% 100%;
  }
  .step-line {
    position: absolute;
    z-index: -1;
    left: 197px;
    width: 1px;
    height: 500px;
    border: 1px solid #3b9afe;
    background: linear-gradient(0deg, #46aef7 0%, #1dd5e6 100%);
  }
}

.step-item {
  display: flex;
  padding: 20px 0;
  color: #fff;

  .text-mark {
    color: #00ffff;
  }

  .step-name {
    width: 150px;
    text-align: right;
  }

  .step-icon {
    width: 25px;
    height: 25px;
    margin: 0 35px;
  }

  .step-content {
    width: 300px;
    white-space: pre-wrap;
    .time {
      margin-top: 6px;
    }
  }

  .step-opinion {
    margin-left: 40px;
    min-width: 229px;
    min-height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: url("~@/assets/images/servingMasses/eventDetails-opinion-bg.png")
    no-repeat;
    background-size: 100% 100%;
  }
}
</style>
