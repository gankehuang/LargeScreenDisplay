<template>
  <InfoBlock title="涉稳态势">
    <div class="dwts-container">
      <div class="case-info">
        <div class="info-one">
          <v-chart
            :options="oneInfoOption"
            style="width: 77px;height: 77px"
          />
          <div class="info-block">
            <div class="label">
              {{ oneInfo.blockLabel }}
            </div>
            <div class="number">
              {{ oneInfo.blockNumber }}
            </div>
            <div class="right-num">
              化解率&nbsp;<span>92.25%</span>
            </div>
          </div>
        </div>
        <!-- <div class="info-two">
          <div class="info-block">
            <div class="label">
              {{ twoInfo.blockLabel }}
            </div>
            <div class="number">
              {{ twoInfo.blockNumber }}
            </div>
          </div>
          <v-chart
            :options="twoInfoOption"
            style="width: 77px;height: 77px"
          />
        </div> -->
      </div>
      <!-- <div class="case-tab">
        <span
          class="tab-item"
          :class="{ active: tabName === '涉稳' }"
          @click="tab('涉稳')"
        >涉稳</span>
        <span
          class="tab-item"
          :class="{ active: tabName === '信访' }"
          @click="tab('信访')"
        >信访</span>
      </div> -->
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
            v-for="(item, index) in dwtsList"
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
import { sheWenList, xinFangList } from './mock'
export default {
  data () {
    return {
      tabName: '涉稳',
      oneInfo: {
        optionLabel: '化解率',
        optionNumber: 53.86,
        blockLabel: '涉稳案件',
        blockNumber: 440
      },
      dwtsList: sheWenList,
      xinFangList: xinFangList
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
              }
              // { value: 100 - this.oneInfo.optionNumber, name: '未化解率' }
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
              }
              // { value: 100 - this.twoInfo.optionNumber, name: '未化解率' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    tab (tabName) {
      this.tabName = tabName
      switch (tabName) {
        case '涉稳':
          this.dwtsList = sheWenList
          break
        case '信访':
          this.dwtsList = xinFangList
          break
        default:
          break
      }
    }
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
      width: 287px;
      height: 43px;
      padding: 15px 0 0 17px;
      color: #a9daff;
      background: url("~@/assets/images/situation/one-info-block.png") center
        center / 100% 100% no-repeat;
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
        margin-top: -28px;
        margin-left: 132px;
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
