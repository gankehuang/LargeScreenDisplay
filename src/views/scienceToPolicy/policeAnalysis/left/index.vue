<template>
  <div class="left">
    <div class="btn-box">
      <div class="left-top-btn">
        <el-dropdown
          trigger="click"
          placement="bottom"
        >
          <span
            class="el-dropdown-link"
          >
            {{ btnOneValue }}
            <i
              class="el-icon-arrow-down el-icon--right"
            />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in btnOneList"
              :key="index"
              @click.native="dropMenuOne(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        v-if="showTwoBtn"
        class="left-top-btn"
        style="marginLeft: 10px"
      >
        <el-dropdown
          trigger="click"
          placement="bottom"
        >
          <span
            class="el-dropdown-link"
          >
            {{ btnTwoValue }}年
            <i
              class="el-icon-arrow-down el-icon--right"
            />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in btnTwoList"
              :key="index"
              @click.native="dropMenuTwo(item)"
            >
              {{ item }}年
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        v-if="showTwoBtn"
        class="left-top-btn"
        style="marginLeft: 10px"
      >
        <el-dropdown
          trigger="click"
          placement="bottom"
        >
          <span
            class="el-dropdown-link"
          >
            {{ btnThreeValue }}
            <i
              class="el-icon-arrow-down el-icon--right"
            />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in btnThreeList"
              :key="index"
              @click.native="dropMenuThree(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="info">
      <div class="title">
        警情数量
      </div>
      <div class="count1">
        <span style="margin-right: 5px;">接警总量</span>
        <VerticalNumTo />
        <span style="margin-left: 5px;">件</span>
      </div>
      <div class="count2">
        <div class="mes">
          128<span>起</span>
          <div>有效警情</div>
        </div>
        <div class="mes">
          1971<span>起</span>
          <div>无效警情</div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        警力统计
      </div>
      <div class="lists">
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/icon-police.png"
            alt=""
          >
          警察在线........................................................
          <div class="num">
            235
            <span>人</span>
          </div>
        </div>
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/icon-car.png"
            alt=""
          >
          警车..............................................................
          <div class="num">
            15
            <span>辆</span>
          </div>
        </div>
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/icon-house.png"
            alt=""
          >
          警亭..............................................................
          <div class="num">
            17
            <span>个</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        有效警情分类
      </div>
      <div class="echarts">
        <v-chart :options="option1" />
      </div>
    </div>
  </div>
</template>
<script>
import VerticalNumTo from '@/components/VerticalNumTo'
export default {
  components: {
    VerticalNumTo
  },
  data () {
    return {
      btnOneValue: '截止当前',
      btnOneList: ['截止当前', '按年份', '按季度'],
      btnTwoValue: '2021',
      btnTwoList: ['2021', '2020', '2019', '2018', '2017'],
      btnThreeValue: '全年',
      btnThreeList: [],
      showTwoBtn: false
    }
  },
  computed: {
    option1 () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '60%',
          y: '20%',
          icon: 'rect',
          itemWidth: 8,
          itemHeight: 8,
          data: ['行政(治安)警情', '刑事警情', '交通类警情', '救助', '举报', '其他'],
          textStyle: {
            color: '#93C6EB'
          }

        },
        series: [
          {
            name: '警情',
            type: 'pie',
            selectedMode: 'single',
            radius: [50, 70],
            center: [100, 110],
            label: {
              normal: {
                formatter: '警情\n分类',
                position: 'center',
                color: '#93C6EB'
              }
            },
            data: [
              {
                value: 20,
                name: '行政(治安)警情',
                itemStyle: {
                  normal: {
                    color: '#12ECFA'
                  }
                }
              },
              {
                value: 10,
                name: '刑事警情',
                itemStyle: {
                  normal: {
                    color: '#12A6FB'
                  }
                }
              },
              {
                value: 17,
                name: '交通类警情',
                itemStyle: {
                  normal: {
                    color: '#125FFB'
                  }
                }
              },
              {
                value: 23,
                name: '救助',
                itemStyle: {
                  normal: {
                    color: '#FFEA00'
                  }
                }
              },
              {
                value: 12,
                name: '举报 ',
                itemStyle: {
                  normal: {
                    color: '#10DC92'
                  }
                }
              },
              {
                value: 8,
                name: '其他',
                itemStyle: {
                  normal: {
                    color: '#FF8400'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    dropMenuOne: function (str) {
      this.btnOneValue = str
      this.btnTwoValue = new Date().getFullYear().toString()
      this.showTwoBtn = true
      this.btnThreeList = this.handleList(str)
      this.btnThreeValue = '全年'
      if (str === '截止当前') {
        this.btnOneValue = str
        this.showTwoBtn = false
      }
    },
    dropMenuTwo: function (str) {
      this.btnTwoValue = str
      this.btnThreeList = this.handleList(this.btnOneValue)
      this.btnThreeValue = '全年'
    },
    dropMenuThree: function (str) {
      this.btnThreeValue = str
    },

    // 处理 btnThreeList 的数据
    handleList: function (str) {
      let mid = []
      if (str === '按年份') {
        if (this.btnTwoValue === new Date().getFullYear().toString()) {
          for (let i = 1; i <= new Date().getMonth() + 1; i++) {
            mid.push(`${i}月`)
          }
        } else {
          mid = Array.apply(null, { length: 12 }).map((_, index) => `${index + 1}月`)
        }
      }

      if (str === '按季度') {
        if (this.btnTwoValue === new Date().getFullYear().toString()) {
          mid = Array.apply(null, { length: Math.ceil((new Date().getMonth() + 1) % 4) }).map((_, index) => `第${index + 1}季度`)
        } else {
          mid = Array.apply(null, { length: 4 }).map((_, index) => `第${index + 1}季度`)
        }
      }

      return mid
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
  width: 23%;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .btn-box {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .left-top-btn {
      width: 120px;
      height: 30px;
      color: #ffffff;
      background: url('~@/assets/images/interviewAnalysis/left-btn-bg.png') no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .el-dropdown-width {
        width: 80px;
      }
    }
  }

  .btn-box, .left-top-btn, span {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
  }

  .title {
    width: 290px;
    line-height: 40px;
    padding-left: 30px;
    font-size: 16px;
    color: #D0DFFF;
    font-weight: bold;
    background: url('~@/assets/images/policeAnalysis/title-bg.png')no-repeat center;
    background-size: 100% 100%;
  }
  .info {
    height: 33%;
    .count1 {
      display: flex;
      line-height: 54px;
      font-size: 16px;
      color: #A1D8FF;
      margin: 10px 0 0 30px;
    }
    .count2 {
      display: flex;
      margin-top: 20px;
      .mes {
        width: 165px;
        height: 110px;
        padding-top: 20px;
        color: #fff;
        font-size: 24px;
        margin-right: 25px;
        line-height: 40px;
        background: url('~@/assets/images/policeAnalysis/mes-bg.png')no-repeat center;
        background-size: 100% 100%;
        text-align: center;
        font-weight: bold;
        div {
          color: #A1D8FF;
          font-weight: normal;
          font-size: 16px;
        }
      }
    }
    .lists {
      margin-top: 40px;
      .list {
        display: flex;
        margin-bottom: 45px;
        line-height: 24px;
        font-size: 16px;
        color: #A1D8FF;
        img {
          display: block;
          margin: 0 11px 0 25px;
        }
        .num {
          font-size: 24px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
