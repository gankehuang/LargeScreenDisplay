<template>
  <div class="detail-recorcontainer">
    <el-row
      v-for="(item, index) in actions"
      :key="index"
      class="record-info"
    >
      <el-col
        :span="5"
        class="status-section"
      >
        <div class="status">
          <div class="action">
            {{ item.action }}
          </div>
          <div class="actioner">
            （{{ item.actioner }}）
          </div>
        </div>
        <div class="det-rec-circular">
          <div class="det-rec-circular-inside">
            {{ item.index }}
          </div>
        </div>
        <div class="record-line" />
      </el-col>
      <el-col
        :span="19"
        style="padding-right:20px"
      >
        <div class="record-detail">
          <el-form :label-width="labelWidth">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  v-if="index === 0"
                  label="上报人："
                >
                  <el-input
                    readonly
                    value="监控设备"
                  />
                </el-form-item>
                <el-form-item
                  v-else
                  label="负责人："
                >
                  <el-input
                    v-model="item.detailForm.principal"
                    readonly
                  />
                </el-form-item>
                <el-form-item label="联系电话：">
                  <el-input
                    v-model="item.detailForm.phone"
                    readonly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理时间：">
                  <el-input
                    v-model="item.detailForm.time"
                    readonly
                  />
                </el-form-item>
                <el-form-item label="超时状态：">
                  <el-input
                    v-model="item.detailForm.statusText"
                    readonly
                    :class="
                      item.detailForm.status === 1
                        ? 'status-success'
                        : 'status-error'
                    "
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="上报说明：">
                <el-input
                  v-model="item.detailForm.explain"
                  readonly
                />
              </el-form-item>
            </el-row>
          </el-form>
          <div class="image-list">
            <template v-if="index <= 1">
              <el-image
                v-for="(img, li) in data.snapImageUrl"
                :key="li"
                style="width: 100px; height: 100px;margin-right: 20px;"
                :src="img"
                :preview-src-list="[img]"
                fit="fit"
              />
            </template>

            <template v-else>
              <el-image
                v-for="(img, li) in data.processingImageUrl"
                :key="li"
                style="width: 100px; height: 100px;margin-right: 20px;"
                :src="img"
                :preview-src-list="[img]"
                fit="fit"
              />
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { hideName, hidePhone } from '@/plugins/filters'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      labelWidth: '100px',
      actions: [
        {
          action: '事件生成',
          actioner: '研判中心',
          index: 1,
          detailForm: {
            principal: hideName(this.data.peopleName),
            time: this.data.happenedTime,
            phone: hidePhone('18170879118'),
            status: 1,
            statusText: '正常',
            explain: '事件主动研判'
          }
        },
        {
          action: '事件派发',
          actioner: '指挥中心',
          index: 2,
          detailForm: {
            principal: this.data.assignGroupList
              ? this.data.assignGroupList[0].name
              : '',
            time: this.data.happenedTime,
            phone: hidePhone(
              this.data.assignGroupList
                ? this.data.assignGroupList[0].phone
                : ''
            ),
            status: 1,
            statusText: '正常',
            explain: '事件自动派发，已转至专职网格员处置'
          }
        },
        {
          action: '事件处置',
          actioner: '专职网格员',
          index: 3,
          detailForm: {
            principal: this.data.processorName,
            time: this.data.processingTime,
            phone: hidePhone(this.data.processorPhone),
            status: 1,
            statusText: '正常',
            explain: '等待现场处置'
          }
        },
        {
          action: '处理完成',
          actioner: '专职网格员',
          index: 4,
          detailForm: {
            principal: this.data.processorName,
            time: this.data.processingTime,
            phone: hidePhone(this.data.processorPhone),
            status: 1,
            statusText: '正常',
            explain: this.data.processingDesc
          }
        },
        {
          action: '核查',
          actioner: '主管单位',
          index: 5,
          detailForm: {
            principal: '核查员',
            time: this.setDefaultTime(),
            phone: hidePhone('13576043615'),
            status: 1,
            statusText: '正常',
            explain: this.data.verifyDesc
          }
        },
        {
          action: '办结归档',
          actioner: '市平台',
          index: 6,
          detailForm: {
            principal: hideName('熊振宇'),
            time: this.setDefaultTime(),
            phone: hidePhone('13698095719'),
            status: 1,
            statusText: '正常',
            explain: '处置完成，归档成功'
          }
        }
      ]
    }
  },
  watch: {
    data (val) {
      if (val) {
        this.actions[0].detailForm.time = this.data.happenedTime
        this.actions[0].detailForm.explain = this.data.description || '暂无'
        // 未受理
        if (val.status - 0 <= 1) {
          this.actions = this.actions.slice(0, 1)
        }

        // 已派发
        if (val.status - 0 <= 2) {
          this.actions = this.actions.slice(0, 2)
        }

        if (val.status - 0 === 3) {
          this.actions = this.actions.slice(0, 4)
        }

        if (val.status - 0 === 4) {
          // 事件超时
          if (this.data.assignGroupList) {
            this.actions = this.actions.slice(0, 2)
            this.actions[0].detailForm.statusText = '超时'
            this.actions[1].detailForm.statusText = '超时'
          } else {
            this.actions = this.actions.slice(0, 1)
            this.actions[0].detailForm.statusText = '超时'
            this.actions[1].detailForm.statusText = '超时'
          }
        }

        if (val.status - 0 === 5) {
          // 事件催单
          if (this.data.assignGroupList) {
            this.actions = this.actions.slice(0, 2)
          } else {
            this.actions = this.actions.slice(0, 1)
          }
        }
      }
    }
  },
  methods: {
    setDefaultTime () {
      const t = new Date(this.data.processingTime).getTime() + 1200000
      const d = new Date(t)
      let theMonth = d.getMonth() + 1
      let theDate = d.getDate()
      let theHours = d.getHours()
      let theMinutes = d.getMinutes()
      const theSeconds = d.getSeconds()
      if (theMonth < 10) {
        theMonth = '0' + theMonth
      }
      if (theDate < 10) {
        theDate = '0' + theDate
      }
      if (theHours < 10) {
        theHours = '0' + theHours
      }
      if (theMinutes < 10) {
        theMinutes = '0' + theMinutes
      }
      return (
        d.getFullYear() +
        '-' +
        theMonth +
        '-' +
        theDate +
        ' ' +
        theHours +
        ':' +
        theMinutes +
        ':' +
        theSeconds
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-recorcontainer {
  /deep/ .el-form-item__label {
    text-align: right;
    color: #cccccc;
    background-color: #283446;
    padding: 5px 0;
  }
  .el-input--small .el-input__inner,
  .el-textarea__inner {
    height: 43px;
    line-height: 43px;
    color: #fff;
    border: none;
    border-radius: 0;
  }
  .status-success {
    /deep/ .el-input__inner {
      color: green !important;
    }
  }

  /deep/ .el-textarea__inner {
    height: 80px;
  }
  /deep/ .el-form-item {
    margin: 0;
  }
}
.event-detail {
  /deep/ .el-form-item__label {
    height: 120px;
    line-height: 120px;
  }
}
.record-info {
  margin-bottom: 20px;
}
.status-section {
  margin-top: 100px;
}
.status {
  width: 100px;
  line-height: 32px;
  height: 32px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  float: left;
  position: relative;
  .actioner {
    font-size: 14px;
    color: #cccccc;
    line-height: 24px;
  }
}
.det-rec-circular {
  width: 36px;
  height: 36px;
  border: 1px solid #2188ed;
  border-radius: 50% 50%;
  float: right;
  margin: 8px 16% 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.det-rec-circular-inside {
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50% 50%;
  background-color: #2188ed;
  color: #fff;
  text-align: center;
}
.record-line {
  position: absolute;
  top: 140px;
  left: 150px;
  height: 250px;
  border: none;
  border-right: 2px solid #2188ed;
  z-index: 99;
}
.record-detail {
  width: 100%;
  height: 250px;
  // overflow: hidden;
  position: relative;
  background-color: #283446;
  &::before {
    display: block;
    content: "";
    border-width: 8px 8px 8px 8px;
    border-style: solid;
    border-color: transparent #283446 transparent transparent;

    /* 定位 */
    position: absolute;
    left: -15px;
    top: 117px;
  }
}
.image-list {
  padding: 0 10px 0 30px;
  width: 100%;
  justify-content: space-between;
}
.record-info:nth-last-child(1) {
  .record-line {
    display: none;
  }
}
</style>
