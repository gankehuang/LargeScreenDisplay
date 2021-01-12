<template>
  <InfoBlockTwo
    title="事件环比同比"
    width="100%"
    height="50%"
    class="block-bg"
  >
    <template v-slot:topRight>
      <div class="drop">
        <span class="drop-label">
          事件类型：
        </span>
        <el-dropdown>
          <span
            class="el-dropdown-link"
          >
            {{ curEventType }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in eventType"
              :key="index"
              @click.native="handleEventType(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="drop-label">
            子类型：
          </span>
          <span
            class="el-dropdown-link"
          >
            {{ curChildType }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in kindList"
              :key="index"
              @click.native="handleChild(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
    <v-chart
      :options="options"
      class="echarts"
    />
  </InfoBlockTwo>
</template>
<script>
export default {
  data () {
    return {
      options: {
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
      eventType: ['法律服务'],
      curEventType: '法律服务',
      kindList: ['全部'],
      curChildType: '全部'
    }
  },
  methods: {
    handleEventType () {

    },
    handleChild () {

    }
  }
}
</script>

<style lang="scss" scoped>
.block-bg {
  background: url("~@/assets/images/servingMasses/center-block-bg.png") no-repeat
  center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 15px;
}
.drop {
  position: absolute;
  right: 30px;
  top: 10px;
  z-index: 40;
  .drop-label {
    color: #A1D8FF;
  }
  .el-dropdown {
    margin-right: 20px;
  }
  .el-dropdown-link {
    display: inline-block;
    width: 96px;
    text-align: center;
    font-size: 12px;
    color: #b2d9fb;
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    background: #012355;
    border: 1px solid rgba(64, 154, 255, 0.4);
    border-radius: 4px;
  }
}

</style>
