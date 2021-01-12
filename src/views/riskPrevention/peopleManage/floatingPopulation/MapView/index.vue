<template>
  <div
    v-loading="loading"
    class="float-peo-map-center"
    style="width:60%;height:70%"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="transparent"
  >
    <v-chart
      id="chinaMap"
      :options="options"
    />
    <div
      v-if="tableModalVisible"
      class="mask-container"
    >
      <div class="mask" />
      <div class="table-modal">
        <div
          class="table-modal-close"
          style="z-index:1000"
          @click="tableModalVisible = false"
        />
        <floatPeopletable
          :province-code="provinceCode"
          style="position:relative;z-index:1000"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'echarts'
import chinaMap from './china.json'
import floatPeopletable from './floatPeopletable'
// import { queryPopulationProvince } from '@/api/riskPrevention/floatingPopulation'
ECharts.registerMap('china', chinaMap)

export default {
  components: {
    floatPeopletable
  },
  data () {
    return {
      loading: false,
      chinaMapEchart: undefined,
      tableModalVisible: false,
      provinceCode: undefined,
      effScaMapData: [
        {
          name: '北京',
          value: [116.4, 40.4, 0]
        },
        {
          name: '河北',
          value: [115.21, 38.44, 0]
        },
        {
          name: '黑龙江',
          value: [128.34, 47.05, 0]
        },
        {
          name: '吉林',
          value: [126.32, 43.38, 0]
        },
        {
          name: '辽宁',
          value: [123.42, 41.29, 0]
        },
        {
          name: '天津',
          value: [118.94, 39.52, 0]
        },
        {
          name: '内蒙古',
          value: [112.17, 42.81, 0]
        },
        {
          name: '新疆',
          value: [86.61, 40.79, 0]
        },
        {
          name: '青海',
          value: [97.07, 35.62, 0]
        },
        {
          name: '甘肃',
          value: [103.82, 36.05, 0]
        },
        {
          name: '宁夏',
          value: [106.27, 36.76, 0]
        },
        {
          name: '山西',
          value: [111.95, 37.65, 0]
        },
        {
          name: '陕西',
          value: [108.94, 34.46, 0]
        },
        {
          name: '河南',
          value: [113.46, 34.25, 0]
        },
        {
          name: '山东',
          value: [118.01, 36.37, 0]
        },
        {
          name: '西藏',
          value: [89.13, 30.66, 0]
        },
        {
          name: '四川',
          value: [103.36, 30.65, 0]
        },
        {
          name: '重庆',
          value: [107.51, 29.63, 0]
        },
        {
          name: '湖北',
          value: [112.29, 30.98, 0]
        },
        {
          name: '安徽',
          value: [117.28, 31.86, 0]
        },
        {
          name: '江苏',
          value: [120.26, 32.54, 0]
        },
        {
          name: '上海',
          value: [121.46, 31.28, 0]
        },
        {
          name: '浙江',
          value: [120.15, 29.28, 0]
        },
        {
          name: '湖南',
          value: [112.08, 27.79, 0]
        },
        {
          name: '云南',
          value: [101.71, 24.84, 0]
        },
        {
          name: '贵州',
          value: [106.91, 26.67, 0]
        },
        {
          name: '福建',
          value: [118.31, 26.07, 0]
        },
        {
          name: '广东',
          value: [113.98, 22.82, 0]
        },
        {
          name: '广西',
          value: [108.67, 23.68, 0]
        },
        {
          name: '澳门',
          value: [113.54, 22.19, 0]
        },
        {
          name: '香港',
          value: [114.17, 22.32, 0]
        },
        {
          name: '海南',
          value: [110.03, 19.33, 0]
        },
        {
          name: '台湾',
          value: [121.01, 23.54, 0]
        },
        {
          name: '江西',
          value: [115.89, 27.97, 0]
        }
      ],
      moveLine: {
        normal: [
          {
            fromName: '北京',
            toName: '江西',
            coords: [
              [116.4, 40.4],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '河北',
            toName: '江西',
            coords: [
              [115.21, 38.44],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '黑龙江',
            toName: '江西',
            coords: [
              [128.34, 47.05],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '吉林',
            toName: '江西',
            coords: [
              [126.32, 43.38],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '辽宁',
            toName: '江西',
            coords: [
              [123.42, 41.29],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '天津',
            toName: '江西',
            coords: [
              [118.94, 39.52],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '内蒙古',
            toName: '江西',
            coords: [
              [112.17, 42.81],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '新疆',
            toName: '江西',
            coords: [
              [86.61, 40.79],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '青海',
            toName: '江西',
            coords: [
              [97.07, 35.62],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '青海',
            toName: '江西',
            coords: [
              [97.07, 35.62],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '甘肃',
            toName: '江西',
            coords: [
              [103.82, 36.05],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '宁夏',
            toName: '江西',
            coords: [
              [106.27, 36.76],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '山西',
            toName: '江西',
            coords: [
              [111.95, 37.65],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '陕西',
            toName: '江西',
            coords: [
              [108.94, 34.46],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '河南',
            toName: '江西',
            coords: [
              [113.46, 34.25],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '山东',
            toName: '江西',
            coords: [
              [118.01, 36.37],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '西藏',
            toName: '江西',
            coords: [
              [89.13, 30.66],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '四川',
            toName: '江西',
            coords: [
              [103.36, 30.65],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '重庆',
            toName: '江西',
            coords: [
              [107.51, 29.63],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '湖北',
            toName: '江西',
            coords: [
              [112.29, 30.98],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '安徽',
            toName: '江西',
            coords: [
              [117.28, 31.86],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '江苏',
            toName: '江西',
            coords: [
              [120.26, 32.54],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '上海',
            toName: '江西',
            coords: [
              [121.46, 31.28],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '浙江',
            toName: '江西',
            coords: [
              [120.15, 29.28],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '湖南',
            toName: '江西',
            coords: [
              [112.08, 27.79],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '云南',
            toName: '江西',
            coords: [
              [101.71, 24.84],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '贵州',
            toName: '江西',
            coords: [
              [106.91, 26.67],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '福建',
            toName: '江西',
            coords: [
              [118.31, 26.07],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '广西',
            toName: '江西',
            coords: [
              [108.67, 23.68],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '广东',
            toName: '江西',
            coords: [
              [113.98, 22.82],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '澳门',
            toName: '江西',
            coords: [
              [113.54, 22.19],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '香港',
            toName: '江西',
            coords: [
              [114.17, 22.32],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '海南',
            toName: '江西',
            coords: [
              [110.03, 19.33],
              [115.89, 27.97]
            ]
          },
          {
            fromName: '台湾',
            toName: '江西',
            coords: [
              [121.01, 23.54],
              [115.89, 27.97]
            ]
          }
        ]
      }
    }
  },
  computed: {
    options () {
      return {
        geo: {
          type: 'map',
          map: 'china',
          zoom: 1.1,
          roam: true,
          top: 30,
          scaleLimit: {
            min: 1,
            max: 10
          },
          label: {
            show: false,
            emphasis: {
              show: false
            }
          },
          // 特定地区高亮
          regions: [
            {
              name: '江西',
              itemStyle: {
                areaColor: '#a6dcff'
              }
            }
          ],
          itemStyle: {
            normal: {
              borderWidth: 0.5, // 区域边框宽度
              borderColor: '#005895', // 区域边框颜色
              areaColor: '#0F75AE', // 区域颜色
              shadowColor: 'rgba(2,64,116,1)',
              shadowBlur: 10,
              shadowOffsetX: -10,
              shadowOffsetY: 10
            },

            // 高亮提示
            emphasis: {
              label: {
                show: false,
                textStyle: {
                  color: '#554106'
                }
              },
              borderWidth: 0.5,
              borderColor: '#005895',
              areaColor: '#E4B62D'
            }
          }
        },
        tooltip: {},
        series: [
          // 带有涟漪特效动画的散点（气泡）图
          {
            name: '省外流入人口',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.effScaMapData,
            zlevel: 3,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              color: 'white',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            hoverAnimation: true,
            symbolSize: function () {
              return 10
            },
            encode: {
              value: 2
            },
            label: {
              show: true,
              fontSize: 20,
              margin: 8,
              formatter: '{b}\n{@[2]}人',
              position: 'top'
            }
          },
          // 射线样式
          {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2, // 数值越大越在上面
            large: true,
            symbol: ['none', 'arrow'],
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                // 线条颜色
                color: '#3ed4ff',
                curveness: 0.2
              }
            },
            data: this.moveLine.normal
          }
        ]
      }
    }
  },
  mounted () {
    // this.handleQueryPopulationProvince()
    this.initMapClick()
  },
  methods: {
    // 初始化地图添加点击事件
    initMapClick () {
      const that = this
      that.$nextTick(() => {
        that.chinaMapEchart = ECharts.init(document.getElementById('chinaMap'))
        that.chinaMapEchart.on('click', ({ data: { code } }) => {
          that.provinceCode = code
          that.tableModalVisible = true
        })
      })
    }
    // 流动人口统计
    // async handleQueryPopulationProvince () {
    //   const that = this
    //   this.loading = true
    //   const { status, data } = await queryPopulationProvince()
    //   this.loading = false
    //   if (status === 200) {
    //     this.effScaMapData = data.province.map((province) => {
    //       const resultArr = that.effScaMapData
    //         .map((item) => {
    //           if (item.name === province.name) {
    //             return {
    //               ...province,
    //               value: [item.value[0], item.value[1], province.number],
    //               code: province.code
    //             }
    //           }
    //         })
    //         .filter((item) => {
    //           if (item) return item
    //         })
    //       return resultArr[0]
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.float-peo-map-center {
  position: fixed;
  top: 83px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 300;
  cursor: pointer;
}

.table-modal {
  width: 1350px;
  height: 828px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  background: url('~@/assets/images/keyGroups/组 9.png') center center / 100%
    100% no-repeat;
  .table-modal-close {
    position: absolute;
    width: 40px;
    height: 40px;
    z-index: 999;
    top: -20px;
    right: -20px;
    background: url('~@/assets/images/keyGroups/table-modal-close.png')
      no-repeat center center;
    background-size: 100% 100%;
  }

  .colse {
    cursor: pointer;
    position: absolute;
    top: 26px;
    right: 148px;
    width: 26px;
    height: 26px;
    background: url('~@/assets/images/common/close-btn.png') no-repeat center
      center;
    background-size: cover;
  }
}
</style>
