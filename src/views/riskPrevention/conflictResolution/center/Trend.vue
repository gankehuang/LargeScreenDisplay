<template>
  <div class="center">
    <div class="info">
      <div class="title">
        矛盾纠纷趋势
      </div>
      <div class="drop">
        <span class="el-dropdown-link">
          矛盾类型:
        </span>
        <el-dropdown>
          <span
            class="el-dropdown-link"
            style="
              height: 24px;
              line-height: 24px;
              background: #012355;
              border: 1px solid rgba(64, 154, 255, 0.4);
              border-radius: 4px;"
          >
            {{ area }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in areaList"
              :key="index"
              @click.native="areaClick(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            子类型:
          </span>
          <span
            class="el-dropdown-link"
            style="
              height: 24px;
              line-height: 24px;
              background: #012355;
              border: 1px solid rgba(64, 154, 255, 0.4);
              border-radius: 4px;"
          >
            {{ kind }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in kindList"
              :key="index"
              @click.native="kindClick(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="echarts">
        <v-chart :options="amountOptions" />
      </div>
    </div>
    <div class="info">
      <div class="title">
        矛盾纠纷化解率
      </div>
      <div class="echarts">
        <v-chart :options="option1" />
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts'
export default {
  data () {
    return {
      amountOptions: {
        grid: {
          left: '8%',
          right: 20,
          bottom: '5%',
          top: '5%',
          height: '75%'
          //     containLabel: true,
        },
        legend: [
          {
            data: ['2020', '2019'],
            // itemWidth: 12,
            // itemHeight: 12,
            icon: 'line',
            textStyle: {
              color: '#99C1FE',
              fontSize: 14
            },
            top: '0',
            left: '60%'
          },
          {
            data: ['同比上升', '同比下降'],
            // itemWidth: 12,
            // itemHeight: 12,
            icon: 'rect',
            textStyle: {
              color: '#99C1FE',
              fontSize: 14
            },
            top: '0',
            left: '76%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisLabel: {
              show: true,
              color: '#ffffff'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#A9DAFF'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.7)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0, 73, 104, 0.7)'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '2020',
            type: 'line',
            barWidth: '30px',
            data: [11800, 22800, 31200, 23008, 17800, 11800, 12080, 31020, 13080, 17080, 17080, 33800],
            smooth: true,
            symbol: 'none',
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#559AF6' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(85,154, 246,0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#ffffff',
                    fontSize: 12
                  }
                },
                color: '#559AF6'
              }
            }
          },
          {
            name: '2019',
            type: 'line',
            barWidth: '30px',
            data: [8800, 12800, 21200, 13080, 27080, 37800, 21800, 12200, 29800, 11080, 21020, 30080],
            smooth: true,
            symbol: 'none',
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#DEB13F' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(222,177,63,0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#ffffff',
                    fontSize: 12
                  }
                },
                color: '#DEB13F'
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['1月', 8800],
              ['1月', 11800]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['2月', 22800],
              ['2月', 12800]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['3月', 31200],
              ['3月', 21200]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['4月', 23008],
              ['4月', 13080]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            symbol: 'none',
            data: [
              ['5月', 17800],
              ['5月', 27080]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            symbol: 'none',
            data: [
              ['6月', 11800],
              ['6月', 37800]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            symbol: 'none',
            data: [
              ['7月', 12080],
              ['7月', 21800]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['8月', 31020],
              ['8月', 12200]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            symbol: 'none',
            data: [
              ['9月', 13080],
              ['9月', 29800]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['10月', 17080],
              ['10月', 11080]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            symbol: 'none',
            data: [
              ['11月', 17080],
              ['11月', 21020]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            symbol: 'none',
            data: [
              ['12月', 33800],
              ['12月', 30080]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            }
          }
        ]
      },
      area: '邻里纠纷',
      areaList: [
        '邻里纠纷',
        '社会纠纷'
      ],
      kind: '全部',
      kindList: [
      ],
      areaData: '',
      kindData: '',
      isShow: true,
      option1: {
        tooltip: {
          show: true,
          formatter: '{b}:{c}'
        },
        grid: {
          left: '2%',
          top: '8%',
          right: '3%',
          bottom: '12%',
          containLabel: true
        },
        legend: {
          data: ['已化解', '总数'],
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          // selectedMode: 'single',
          // selected: { 总数: true, 未整治: false },
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          top: '15%',
          right: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: [
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
            ],
            axisLabel: {
              show: true,
              color: '#ffffff'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#A9DAFF'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.7)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0, 73, 104, 0.7)'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '已化解',
            type: 'bar',
            barWidth: 20,
            zlevel: 2,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: '#3B9AFE' },
                  { offset: 0, color: '#00FFFF' }
                ]),
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#00FEFF'
                  }
                }
              }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [15900, 67456, 12350, 23150, 32150, 43510, 51502, 13505, 11250, 23150, 32150],
            stack: '堆叠',
            animation: false,
            tooltip: {
              show: false
            }
          },
          {
            name: '总数',
            type: 'bar',
            barWidth: '50%',
            data: [24500, 89520, 15468, 28796, 36789, 45632, 57894, 20985, 15697, 29078, 39076],
            stack: '堆叠',
            label: {
              show: true,
              position: 'top',
              color: '#fff'
            },
            itemStyle: {
              color: '#0075AB'
            }
          }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    areaClick (item) {
      this.area = item
      this.alertDate()
    },
    kindClick (item) {
      this.kind = item
      this.alertDate()
    },
    timeclick (item) {
      this.time = item
      this.alertDate()
    },
    traverseFun (data) {
      const arrayList = []
      for (let i = 0; i < data.length; i++) {
        arrayList.push(parseInt(data[i].value))
      }
      return arrayList
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  position: relative;
  top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .title {
    width: 290px;
    line-height: 40px;
    padding-left: 30px;
    font-size: 16px;
    color: #d0dfff;
    font-weight: bold;
    background: url('~@/assets/images/policeAnalysis/title-bg.png') no-repeat
      center;
    background-size: 100% 100%;
  }
  .info {
    position: relative;
    margin: 0 auto;
    width: 1040px;
    height: 384px;
    background: url('~@/assets/images/interviewAnalysis/interview-bg.png')
      no-repeat;
    background-size: 100% 100%;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
  .drop {
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 40;
  }
  .el-dropdown {
    margin-right: 20px;
  }
  .el-dropdown-link {
    display: inline-block;
    width: 96px;
    line-height: 31px;
    text-align: center;
    font-size: 12px;
    color: #b2d9fb;
    // background: url("~@/assets/image/policeSituation/button-bg.png") no-repeat
    // center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow: auto;
}
</style>
