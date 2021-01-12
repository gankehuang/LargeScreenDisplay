<template>
  <div class="index-map-contianer">
    <SimpleMap
      ref="AMap"
      class="map"
      :z-index="999"
      @mapInit="mapInit"
    >
      <div
        v-if="county"
        class="total-score"
      >
        <span>当前位置</span>：<el-button
          type="text"
          @click.stop="ncClick"
        >
          萍乡市
        </el-button>
        > 安源区
        <!-- > {{ county }} -->
      </div>

      <div
        v-else
        class="total-score"
      >
        <span>当前位置</span>：<el-button
          type="text"
          @click.stop="ncClick"
        >
          萍乡市 > 安源区
        </el-button>
      </div>
    </SimpleMap>
  </div>
</template>

<script>
import { buttonList, initTotalData } from './mock'
import { monthlyVisits } from '@/api/situation/mood'
import { queryGridThreeLine } from '@/api/situation/gridView'
export default {
  data () {
    return {
      county: null,
      map: null,
      buttonList: buttonList,
      selectedItem: initTotalData,
      textList: [],
      colorLegend: [
        { score: '100~ 1000', color: '#073E7E' },
        { score: '50 ~ 100', color: '#3B9AFE' },
        { score: '20 ~ 50', color: '#0148D7' },
        { score: '0 ~ 20', color: '#07B7D8' }
      ]
    }
  },
  async mounted () {},
  methods: {
    ncClick () {
      this.county = null
      this.$emit('mapEvent', null)
    },
    async mapInit (map) {
      this.map = map
      await this.handleQuerySecurityAssessList()
      await this.renderGrid()
      this.map.setCenter([113.884852, 27.630262])
      this.map.setZoom(12.3)
    },
    // 整合地图分数后端联调数据
    handleBackenddata (data, buttonList) {
      this.buttonList = data.map(item => {
        for (let index = 0; index < buttonList.length; index++) {
          const element = buttonList[index]
          if (item.area === element.name) {
            return {
              ...element,
              value: item.num,
              total: item.num
            }
          }
        }
      })
    },
    // 获取各县区得分
    async handleQuerySecurityAssessList () {
      try {
        const objects = {
          date: '2020-10'
        }
        const { status, data } = await monthlyVisits(objects)
        if (status === 200) {
          console.log(data)
          this.$nextTick(() => {
            this.handleBackenddata(data, this.buttonList)
          })
        }
      } catch (error) {}
    },

    // 绘制地图 初始化图层
    async renderGrid () {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
      }
      //   console.log('-------', this.buttonList)
      gridArr.forEach((item, index) => {
        this.buttonList.forEach(button => {
          if (button.code === item.gridCode) {
            item.total = button.total
          }
        })
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.6,
          fillColor: this.handleColor(item.total),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          cursor: 'pointer',
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName,
            total: item.total
          }
        })
        // 点击区县切换分数排名、详情
        ploygon.on(
          'click',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.county = extData.name
            this.$emit('mapEvent', extData)
          }
        )
        polygons.push(ploygon)
        // 悬浮色块出现分数和名称
        ploygon.on(
          'mouseover',
          ({
            target: {
              w: { extData }
            }
          }) => {
            // console.log(extData)
            this.handleAmapText(extData.code)
          }
        )
        ploygon.on(
          'mouseout',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.handleAmapText(undefined)
          }
        )
        // 绘制县区名称和分数
        if (item.gridLevel === 3) {
          let position = []
          if (item.gridName === '青云谱区') {
            position = [115.919124, 28.626145]
          } else if (item.gridName === '红谷滩区') {
            position = [115.772439, 28.605425]
          } else if (item.gridName === '青山湖区') {
            position = [115.980493, 28.639178]
          } else if (item.gridName === '新建区') {
            position = [116.011049, 28.979415]
          } else if (item.gridName === '经开区') {
            position = [115.87166, 28.768364]
          } else if (item.gridName === '东湖区') {
            position = [115.908738, 28.733148]
          }

          const text = new window.AMap.Text({
            // text: item.gridName + '<br/>' + item.total,
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            // cursor: 'pointer',
            style: {
              'font-size': '24px',
              'text-align': 'center',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            extData: {
              code: item.gridCode,
              path: item.gridPath,
              gridLevel: item.gridLevel,
              name: item.gridName,
              total: item.total
            },
            visible: false,
            position: position.length ? position : [item.cenLon, item.cenLat]
          })
          // 点击区县切换分数排名、详情
          text.on(
            'click',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.county = extData.name
              this.$emit('mapEvent', extData)
            }
          )
          // 悬浮色块出现分数和名称
          text.on(
            'mouseover',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.handleAmapText(extData.code)
            }
          )
          text.on(
            'mouseout',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.handleAmapText(undefined)
            }
          )
          this.textList.push(text)
        }
      })
      this.map.add(polygons)
      this.map.add(this.textList)
    },
    // 处理地区颜色
    handleColor (total) {
      if (total >= 100) {
        return this.colorLegend[0].color
      } else if (total < 100 && total >= 50) {
        return this.colorLegend[1].color
      } else if (total < 50 && total >= 20) {
        return this.colorLegend[2].color
      } else if (total < 20 && total >= 0) {
        return this.colorLegend[3].color
      } else {
        return this.colorLegend[3].color
      }
    },
    // 悬浮处理
    handleAmapText (flag) {
      if (!flag) {
        this.textList.forEach(item => {
          item.hide()
        })
      } else {
        this.textList.forEach(item => {
          if (flag === item.w.extData.code) {
            item.show()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-map-contianer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;

  .location {
    position: absolute;
    color: #a9daff;
    z-index: 9;
    span {
      color: #2c69e3;
    }
    /deep/ .el-button--text,
    .el-button--text {
      color: #a9daff;
    }
  }
}

.map {
  width: 100%;
  height: 100%;
}
.index-img-map-legend {
  position: absolute;
  top: 150px;
  right: 500px;
  color: #a9daff;
  font-size: 26px;
  font-weight: bold;
  z-index: 1000;
  .color {
    width: 26px;
    height: 13px;
    background: #0d2861;
    border-radius: 7px;
    display: inline-block;
    margin-right: 10px;
  }
  .data {
    color: #a9daff;
    font-size: 18px;
  }
}
.total-score {
  position: absolute;
  top: 120px;
  left: 480px;
  color: #a9daff;
  font-size: 14px;
  font-weight: bold;
  z-index: 1000;
  span {
    color: #1bd7f9;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
