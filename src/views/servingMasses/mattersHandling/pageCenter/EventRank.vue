<template>
  <InfoBlockTwo
    width="100%"
    height="50%"
    class="block-bg"
    title="镇街事件排行"
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
            {{ curEventSource }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in eventSource"
              :key="index"
              @click.native="handleEventSource(item)"
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
            // For shadow
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#00AFFF',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#ffffff'
                  }
                }
              }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [15900, 67456, 12350, 23150, 32150, 43510, 51502, 13505, 11250, 23150, 32150],
            animation: false,
            tooltip: {
              show: false
            }
          }
        ]
      },
      eventSource: ['法律服务'],
      curEventSource: '法律服务',
      kindList: ['全部'],
      curChildType: '全部'
    }
  },
  methods: {
    handleEventSource () {

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

}
</style>
