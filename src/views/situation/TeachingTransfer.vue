<template>
  <InfoBlock title="治安态势">
    <div class="dwts-container">
      <div class="case-info">
        <div class="info-one">
          <div class="info-block">
            <span class="icon" />
            <div class="label">
              案件总数
            </div>
            <div class="number" />
            <div class="right-num">
              4720553&nbsp;<span>件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="case-list">
        <div class="case-list-th-container">
          <div class="case-frist-th" />
          <div class="case-list-th">
            突出问题
          </div>
          <div class="case-list-th">
            数量
          </div>
          <div class="case-list-th">
            占比
          </div>
        </div>
        <el-scrollbar style="height:100px; overflow: hidden;">
          <div
            v-for="(item, index) in zhiAnList"
            :key="index"
            class="case-list-tr"
          >
            <div
              :class="[
                'td',
                { 'td-frist': index === 0 },
                { 'td-second': index === 1 },
                { 'td-third': index === 2 }
              ]"
            />
            <div class="case-list-td">
              {{ item.label }}
            </div>
            <div class="case-list-td">
              {{ item.number }}件
            </div>
            <div class="case-list-td fourth">
              {{ item.percentage }}%
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </InfoBlock>
</template>
<script>
import { zhiAnList } from './mock'
export default {
  data () {
    return {
      tabName: '信访',
      oneInfo: {
        optionLabel: '化解率',
        optionNumber: 53.86,
        blockLabel: '涉稳案件',
        blockNumber: 440
      },
      twoInfo: {
        optionLabel: '化解率',
        optionNumber: 92.25,
        blockLabel: '信访案件',
        blockNumber: 47205
      },
      zhiAnList: zhiAnList
    }
  },
  computed: {
    oneInfoOption () {
      return {
        color: ['#3B9AFE', '#00FFFF'],
        tooltip: {
          show: false
        },
        series: [
          {
            name: this.oneInfo.optionLabel,
            type: 'pie',
            radius: ['40%', '50%'],
            hoverAnimation: false,
            slient: true,
            label: {
              normal: {
                show: true,
                position: 'center',
                fontSize: 14,
                lineHeight: 18,
                textStyle: {
                  align: 'center'
                },
                formatter: () => {
                  // return `${this.oneInfo.optionLabel} \n ${this.oneInfo.optionNumber}%`
                }
              }
            },
            data: [
              {
                value: this.oneInfo.optionNumber
                // name: this.oneInfo.optionLabel
              },
              { value: 100 - this.oneInfo.optionNumber, name: '未化解率' }
            ]
          }
        ]
      }
    },
    twoInfoOption () {
      return {
        color: ['#3B9AFE', '#00FFFF'],
        tooltip: {
          show: false
        },
        series: [
          {
            name: this.twoInfo.optionLabel,
            type: 'pie',
            radius: ['90%', '100%'],
            hoverAnimation: false,
            slient: true,
            label: {
              normal: {
                show: true,
                position: 'center',
                fontSize: 14,
                lineHeight: 18,
                textStyle: {
                  align: 'center'
                },
                formatter: () => {
                  return `${this.twoInfo.optionLabel} \n ${this.twoInfo.optionNumber}%`
                }
              }
            },
            data: [
              {
                value: this.twoInfo.optionNumber,
                name: this.twoInfo.optionLabel
              },
              { value: 100 - this.twoInfo.optionNumber, name: '未化解率' }
            ]
          }
        ]
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.dwts-container {
  width: 100%;
  height: 360px;
  .case-info {
    padding: 0 10px;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info-one {
    display: flex;
    align-items: center;
    .info-block {
      width: 370px;
      height: 43px;
      padding: 15px 0 0 17px;
      color: #a9daff;
      background: url("~@/assets/images/situation/矩形 785@2x.png") center
        center / 100% 100% no-repeat;
      .icon{
        background: url("~@/assets/images/situation/case.png") center
        center / 100% 100% no-repeat;
        display: inline-block;
        width: 24px;
        height: 24px;
        float: left;
        margin-top: -4px;
        margin-left: -3px;
      }
      .label{
        font-size: 16px;
        font-weight: bold;
      }
      .number {
        font-size: 20px;
        line-height: 36px;
        font-weight: bold;
        margin-top: -27px;
        margin-left: 70px;
      }
      .right-num{
        margin-top: 6px;
        margin-left: 223px;
        font-size: 16px;
        font-weight: none;
        span{
          font-size: 18px;
        }
      }
    }
  }
  .info-two {
    display: flex;
    align-items: center;
    .info-block {
      width: 96px;
      height: 69px;
      padding: 15px 17px 0 0;
      color: #a9daff;
      text-align: right;
      background: url("~@/assets/images/situation/two-info-block.png") center
        center / 100% 100% no-repeat;
      .number {
        font-size: 20px;
        line-height: 36px;
        font-weight: bold;
      }
    }
  }
}
.case-tab {
  margin: 0 auto;
  width: 90%;
  padding: 0 20px 10px;
  font-size: 16px;
  color: #a9daff;
  border-bottom: 1px solid #0f539b;
  .tab-item {
    cursor: pointer;
    width: 40px;
    position: relative;
    margin: 0px 17px;
  }
  .tab-item.active {
    color: #00ffff;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 20px;
      left: -5px;
      width: 38px;
      height: 7px;
      background: url("~@/assets/images/situation/tab-item-active.png") center
        center / 100% 100% no-repeat;
    }
  }
}
.case-list {
  margin-top: 10px;
  text-align: center;
  .case-list-th-container {
    width: 100%;
    height: 20px;
    display: flex;
  }
  .case-list-th {
    flex: 33.333333%;
    color: #3b9afe;
    font-size: 16px;
    line-height: 20px;
  }
  .case-list-tr {
    width: 98%;
    display: flex;
    color: #a9daff;
    line-height: 36px;
  }
  .case-list-td {
    flex: 33.333333%;
    font-size: 16px;
  }
  .case-list-td.fourth {
    color: #00ffff;
  }
  .case-frist-th {
    width: 30px;
    height: 40px;
    margin-left: 15px;
  }
  .td {
    width: 20px;
    height: 20px;
    margin: 5px 0 0 15px;
    position: relative;
  }
  .td-frist {
    background: url("~@/assets/images/situation/椭圆 864.png") center center /
      100% 100% no-repeat;
    &::after {
      display: block;
      position: absolute;
      top: -8px;
      left: 4px;
      font-size: 14px;
      color: #fe2821;
    }
  }
  .td-second {
    background: url("~@/assets/images/situation/椭圆 864(1).png") center center /
      100% 100% no-repeat;
    &::after {
      display: block;
      position: absolute;
      top: -8px;
      left: 4px;
      font-size: 14px;
      color: #e9aa00;
    }
  }
  .td-third {
    background: url("~@/assets/images/situation/椭圆 864(2).png") center center /
      100% 100% no-repeat;
    &::after {
      display: block;
      position: absolute;
      top: -8px;
      left: 4px;
      font-size: 14px;
      color: #a9daff;
    }
  }
}
/deep/.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
