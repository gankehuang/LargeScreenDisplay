<template>
  <div class="page-right">
    <InfoBlock
      title="出租房分布"
      height="516px"
    >
      <v-chart
        :options="useTypeOptions"
        class="echart"
      />
    </InfoBlock>

    <InfoBlock
      title="实时预警"
      height="330px"
    >
      <el-scrollbar style="height: 260px;">
        <div
          v-for="(item, index) in listArr"
          :key="index"
          class="item-list"
        >
          <p class="item-title">
            {{ item.time }}
          </p>
          <div class="item-con">
            <div class="things">
              <div>{{ item.title }}</div>
              <div>群租人数：{{ item.num }}</div>
              <div>
                群租地址：{{ item.address }}
                <svg-icon
                  icon-class="position"
                  class="position-icon"
                />
              </div>
              <div class="types">
                已审核
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </InfoBlock>
  </div>
</template>

<script>
import { queryRentRoomDistributed } from '@/api/riskPrevention/peopleManage/rentalHousing'
export default {
  data () {
    return {
      tab: 0,
      yType: [],
      czNums: [],
      listArr: [
        {
          time: '2020-11-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '13',
          address: '青山湖区北京东路258号京东小区A区7栋3单元301',
          type: '未核查'
        },
        {
          time: '2020-10-24 12:01:45',
          alemType: '二级警报',
          img: require('@/assets/images/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '16',
          address: '青云谱区井冈山大道533号锦绣花园9号楼1单元604',
          type: '已核查'
        },
        {
          time: '2020-10-15 17:45:26',
          alemType: '二级警报',
          img: require('@/assets/images/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '18',
          address: '红谷滩区会展路89号丰和花园A区6栋1单元401',
          type: '已核查'
        }
      ]
    }
  },
  computed: {
    resultYType () {
      const yType = [...this.yType]
      return yType.reverse()
    },
    useTypeOptions () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 30,
          width: '100%',
          height: '70%',
          data: ['出租房屋数', '租住人员数'],
          textStyle: {
            color: '#A9DAFF'
          }
        },
        grid: {
          top: '9%',
          left: '3%',
          right: '6%',
          bottom: '2%',

          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#72B0F1'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#A9DAFF ',
            interval: 0
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          },
          data: this.resultYType
        },
        series: [
          {
            name: '出租房屋数',
            type: 'bar',
            barWidth: '30%',
            data: [
              7722,
              6551,
              5376,
              4733,
              4421,
              3873,
              3400,
              2732,
              982,
              708,
              586,
              277
            ].reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ],
                global: false
              }
            }
          },
          {
            name: '租住人员数',
            type: 'bar',
            barWidth: '30%',
            data: [
              15444,
              13102,
              10743,
              9466,
              8842,
              7746,
              6800,
              5464,
              1964,
              1416,
              1172,
              554
            ].reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#4FC7FF' },
                  { offset: 1, color: '#68E0CF' }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      queryRentRoomDistributed({}).then(res => {
        if (res.status === 200) {
          // const arrs = res.data
          // arrs.forEach(item => {
          //   this.yType.push(item.name)
          //   this.czNums.push(item.num)
          // })
          this.yType = [
            '凤凰街道',
            '八一街道',
            '后埠街道',
            '丹江街道',
            '东大街道',
            '白源街道',
            '安源镇',
            '高坑镇',
            '五陂镇',
            '青山镇',
            '城郊管委会'
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.item-list {
  width: 100%;
  margin-bottom: 10px;
  .item-title {
    background-size: 100% 100%;
    color: #00ffff;
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 67px;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      text-align: center;
      background: url("~@/assets/images/rentalHousing/矩形 1299.png") no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
    }
  }
  .item-con {
    display: flex;
    padding: 10px;
    background: rgba(0, 85, 255, 0.26);
    border: 1px solid #0b61a0;
    .imgs {
      align-self: center;
    }
    .things {
      padding-left: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #a9daff;
      line-height: 25px;
      position: relative;
      .position-icon {
        font-size: 18px;
        color: #3397fb;
        cursor: pointer;
        display: inline-block;
        margin-left: 50px;
      }
      .types {
        position: absolute;
        top: 6px;
        right: 0;
        width: 56px;
        height: 19px;
        line-height: 19px;
        background: rgba(48, 85, 146, 0);
        border: 1px solid #e6b00e;
        border-radius: 4px;
        color: #e6b00e;
        text-align: center;
      }
    }
  }
}
</style>
