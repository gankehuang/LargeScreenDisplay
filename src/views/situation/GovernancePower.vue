<template>
  <InfoBlock title="治理力量">
    <div class="governance-power">
      <div class="governance-power-top">
        <div
          v-for="(item, index) in powerList"
          :key="index"
          class="top-list"
        >
          <div class="list-left">
            <p>{{ item.date }}</p>
            <p>{{ item.name }}</p>
          </div>
          <div
            v-if="index + 1 !== powerList.length"
            class="list-right"
          />
        </div>
      </div>
      <div class="governance-power-bottom">
        <div
          v-for="(item, index) in governanceList"
          :key="index"
          class="bottom-list"
        >
          <p :class="'power' + index">
            {{ item.value }}
          </p>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>
<script>
import { typeMostList, originMostList } from './mock'
export default {
  data () {
    return {
      powerList: [
        {
          date: '424',
          name: '网格数'
        },
        {
          date: '434',
          name: '网格员'
        },
        {
          date: '333',
          name: '网格融入'
        }
      ],
      governanceList: [
        {
          value: '4582',
          name: '一类点'
        },
        {
          value: '1218',
          name: '二类点'
        },
        {
          value: '610',
          name: '三类点'
        },
        {
          value: '10333',
          name: '社会资源'
        }
      ]
    }
  },
  methods: {
    changeTab (index) {
      this.selectedIndex = index
      switch (index) {
        case 0:
          this.tableData = typeMostList
          break
        case 1:
          this.tableData = originMostList
          break
        default:
          break
      }
    },
    // 打开弹窗
    handleVisible () {
      this.columnsAnimationModal.visible = true
      this.columnsAnimationModal.info = {
        title: '事件排名',
        position: 'right'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.risk-Warning .Warning-top-left {
    background: url("~@/assets/images/situation/组 85.png") center center /
      100% 100% no-repeat;
  }
  .general-affairs .Warning-top-left {
    background: url("~@/assets/images/situation/组 85(2).png") center center /
      100% 100% no-repeat;
  }
  .risk-Warning,
  .general-affairs {
    width: 400px;
    padding: 0 15px;
    margin-bottom: 20px;
    .Warning-top {
      width: 100%;
      height: 48px;
      display: flex;
      .Warning-top-left {
        width: 55px;
        height: 48px;
      }
      .Warning-top-center {
        cursor: pointer;
        margin-left: 15px;
        width: 120px;
        height: 100%;
        p {
          margin: 0;
          padding: 0;
          &:nth-child(1) {
            font-size: 18px;
            font-weight: 400;
            color: #a9daff;
            line-height: 18px;
          }
          &:nth-child(2) {
            margin-top: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #a9daff;
            line-height: 18px;
            span {
              font-size: 14px;
            }
          }
        }
      }
      .Warning-top-right {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #00ffff;
        line-height: 18px;
        .arrow {
          width: 15px;
          height: 14px;
          margin: 0 30px;
          background: url("~@/assets/images/situation/右箭头.png") center
            center / 100% 100% no-repeat;
        }
      }
    }
  }
  .risk-Warning .Warning-bottom {
    margin-top: 25px;
    display: flex;
    position: relative;
    .echarts {
      width: 400px;
      height: 130px;
    }
    .bottom-bgm {
      width: 55px;
      height: 92px;
      position: absolute;
      top: 20px;
      left: 160px;
      background: url("~@/assets/images/situation/组 88 拷贝.png") center
        center / 100% 100% no-repeat;
    }
  }
  .general-affairs .Warning-bottom {
    margin-top: 0px;
    .bottom-tab {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px solid #0f539b;
      cursor: pointer;
      .tab-list {
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        color: #a9daff;
        cursor: pointer;
      }
      .selected {
        background: url("~@/assets/images/situation/tab-item-active.png")
          center bottom no-repeat;
      }
    }
    .sort-box {
      position: relative;
    }
    .sort0,
    .sort1,
    .sort2 {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      margin: 0 5px 0 -10px;
    }
    .sort0 {
      background: url("~@/assets/images/situation/椭圆 864.png") center bottom
        no-repeat;
      color: #e82524;
    }
    .sort1 {
      background: url("~@/assets/images/situation/椭圆 864(1).png") center
        bottom no-repeat;
      color: #f2c21c;
    }
    .sort2 {
      background: url("~@/assets/images/situation/椭圆 864(2).png") center
        bottom no-repeat;
      color: #3b9afe;
    }
    /deep/.el-table,
    /deep/.el-table th,
    /deep/.el-table tr,
    /deep/.el-table td {
      background-color: transparent !important;
      border: none !important;
      color: #a9daff !important;
    }
    /deep/.el-table th {
      color: #3b9afe !important;
    }
    /deep/.el-table th,
    /deep/.el-table tr,
    /deep/.el-table td {
      text-align: center;
    }
  }
  .governance-power {
    width: 100%;
    // height: 170px;
    padding: 0 15px;
    margin-top: 10px;
    .governance-power-top {
      width: 100%;
      height: 80px;
      display: flex;
      .top-list {
        display: flex;
        height: 80px;
        align-items: center;
        .list-left {
          width: 95px;
          height: 80px;
          font-size: 14px;
          font-weight: bold;
          color: #a9daff;
          line-height: 18px;
          text-align: center;
          background: url("~@/assets/images/situation/椭圆 1073.png") center
            center / 100% 100% no-repeat;
        }
        .list-right {
          width: 40px;
          height: 73px;
          background: url("~@/assets/images/situation/组 129.png") center
            center no-repeat;
        }
      }
    }
    .governance-power-bottom {
      width: 100%;
      padding-left: 10px;
      margin-top: 20px;
      display: flex;
      .bottom-list {
        //  text-align: PageCenter;
        width: 25%;
        p {
          margin: 6.5px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          font-weight: 400;
          color: #a9daff;
          line-height: 18px;
        }
        .power0 {
          background: url("~@/assets/images/situation/摄像头 (2).png")
            no-repeat;
        }
        .power1 {
          background: url("~@/assets/images/situation/Icon_地网总数.png")
            no-repeat;
        }
        .power2 {
          background: url("~@/assets/images/situation/形状 554.png") no-repeat;
        }
        .power3 {
          background: url("~@/assets/images/situation/形状 728.png") no-repeat;
        }
      }
    }
  }
</style>
