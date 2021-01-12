<template>
  <div class="page-left">
    <InfoBlock
      title="房屋数量"
      height="275px"
      :content-style-obj="{background: `url(${require('@/assets/images/rentalHousing/left1-bg.png')}) no-repeat`,
                           backgroundPosition: '5%',
                           position: 'relative'}"
    >
      <div class="position-top1">
        <span class="label-text">房屋总数</span>
        <span class="value-text">430254</span>
      </div>
      <div class="position-top2">
        <div class="item">
          <span class="label-text">自住房屋</span>
          <span class="value-text">126929</span>
          <span class="rate-text">23.15%</span>
        </div>
        <div class="item">
          <span class="label-text">租住房屋</span>
          <span class="value-text">126929</span>
          <span class="rate-text">23.15%</span>
        </div>
        <div class="item">
          <span class="label-text">空置房屋</span>
          <span class="value-text">126929</span>
          <span class="rate-text">23.15%</span>
        </div>
        <div class="item">
          <span class="label-text">其它</span>
          <span class="value-text">3821</span>
          <span class="rate-text">23.15%</span>
        </div>
      </div>
    </InfoBlock>

    <InfoBlock
      title="出租房使用类型"
      height="275px"
    >
      <v-chart
        :options="useTypeOptions"
        class="echart"
      />
    </InfoBlock>

    <InfoBlock
      title="出租房数量变化"
      height="275px"
    >
      <v-chart
        :options="amountChangeOptions"
        class="echart"
      />
    </InfoBlock>
  </div>
</template>

<script>
import {
  queryRoomCount,
  queryUseTypeRoomRentCount
} from '@/api/riskPrevention/peopleManage/rentalHousing'
export default {
  data () {
    return {
      roomCount: {
        totalRoomCount: ''
      },
      roomData: [],
      dataType2: [],
      dataNums: [],
      amountChangeOptions: {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0780F1'
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
        },
        grid: {
          containLabel: true,
          left: 0,
          top: 20,
          bottom: 0,
          right: 0
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD'
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD'
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
        series: [
          {
            data: [
              40089,
              41340,
              39805,
              40177,
              39790,
              41300,
              41520,
              41220,
              41332,
              41352,
              41608
            ],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#14ACFF4d'
                  },
                  {
                    offset: 1,
                    color: '#14ACFF00'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    distributeOptions () {
      return {
        color: ['#3B9AFE', '#E6B00E', '#0055FF', '#D3DA1D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 40,
          right: 30,
          height: '70%',
          show: false,
          data: ['自住房屋', '租住房屋', '空置房屋', '其它'],
          textStyle: {
            color: '#A9DAFF'
          }
        },
        series: [
          {
            name: '房屋数量',
            type: 'pie',
            center: ['28%', '55%'],
            radius: ['25%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{d}%',
              textStyle: {
                color: '#7EBDFF'
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false,
              length: 1
            },
            data: this.roomData
          }
        ]
      }
    },
    useTypeOptions () {
      return {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          containLabel: true,
          left: 0,
          top: 20,
          bottom: 0,
          right: 0
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
            interval: 0
            // rotate: -40,
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
          data: this.dataType2
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD'
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
        series: [
          {
            name: '出租房使用类型',
            type: 'bar',
            barWidth: '40%',
            data: this.dataNums,
            label: {
              show: true,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3C9AFE'
                  },
                  {
                    offset: 1,
                    color: '#00FFFF'
                  }
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
    this.getList()
    this.getTypeList()
  },
  methods: {
    getList () {
      queryRoomCount({ gridCode: '' }).then(res => {
        if (res.status === 200) {
          // this.roomCount = res.data
          // this.roomData = [
          //   { value: res.data.roomSelfCount, name: '自住房屋' },
          //   { value: res.data.roomRentCount, name: '租住房屋' },
          //   { value: res.data.roomLeisureCount, name: '空置房屋' },
          //   { value: res.data.otherCount, name: '其它' }
          // ]
          this.roomCount = {
            totalRoomCount: 430254,
            roomSelfCount: 126929,
            roomRentCount: 41352,
            roomLeisureCount: 258152,
            otherCount: 3821
          }
          this.roomData = [
            { value: 126929, name: '自住房屋' },
            { value: 41352, name: '租住房屋' },
            { value: 258152, name: '空置房屋' },
            { value: 3821, name: '其它' }
          ]
        }
      })
    },
    getTypeList () {
      queryUseTypeRoomRentCount({ gridCode: '' }).then(res => {
        if (res.status === 200) {
          const that = this
          const arrs = res.data
          arrs.forEach(item => {
            that.dataType2.push(item.name)
            // that.dataNums.push({
            //   name: item.name,
            //   value: item.numVal
            // })
          })
          that.dataNums = [
            {
              name: '住宅',
              value: 37508
            },
            {
              name: '工商区',
              value: 2939
            },
            {
              name: '仓库',
              value: 658
            },
            {
              name: '其他',
              value: 247
            }
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.position-top1 {
  position: absolute;
  left: 95px;
  top: 35px;
  .label-text {
    font-size: 20px;
    color: #A1D8FF;
    padding-right: 25px;
  }
  .value-text {
    font-size: 20px;
    color: #fff;
  }
}

.position-top2 {
  position: absolute;
  left: 115px;
  top: 90px;
  .item {
    margin-bottom: 15px;
  }
  .label-text {
    font-size: 18px;
    color: #A1D8FF;
  }
  .value-text {
    font-size: 18px;
    color: #fff;
    padding: 0 30px;
  }
  .rate-text {
    font-size: 18px;
    color: #12ECFA;
  }
}
</style>
