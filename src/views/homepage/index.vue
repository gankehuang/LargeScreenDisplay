<template>
  <div class="situation-container page-container">
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <InfoBlock title="人口概况">
          <Population />
        </InfoBlock>
        <InfoBlock title="地概况">
          <Land />
        </InfoBlock>
        <InfoBlock title="事件概况">
          <template slot="topRight">
            <EventTab :selected-tab.sync="selectedTab" />
          </template>
          <component :is="selectedTab.seleTab" />
        </InfoBlock>
      </div>
    </transition>

    <div
      v-if="!mapVisible"
      class="homepage-center"
    >
      <div class="data">
        <h1>数据池</h1>
        <CountTo
          :start-val="befNum"
          :end-val="aftNum"
          :duration="300"
          class="h1"
        />
        <b class="h2">条</b>
      </div>
    </div>
    <AMap
      v-if="mapVisible"
      ref="amap"
      @mapInit="mapInit"
    />

    <div
      v-if="mapVisible"
      class="map-top-tool"
    >
      <div class="position-bg">
        <el-amap-search-box
          class="search-box"
          placeholder="请输入定位地点"
          :search-option="searchOption"
          :on-search-result="onSearchResult"
        />
        <svg-icon
          icon-class="location"
          class="svg-icon"
        />
      </div>
      <div class="tuceng">
        <span class="tip">图层</span>
        <span class="arrow">>></span>
      </div>
      <div
        class="back-block"
        @click="handleBack"
      >
        返回上一级
      </div>
    </div>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <InfoBlock title="物概况">
          <Thing />
        </InfoBlock>
        <InfoBlock title="网概况">
          <Network :map-visible.sync="mapVisible" />
        </InfoBlock>
        <InfoBlock title="组织概况">
          <Organization />
        </InfoBlock>
      </div>
    </transition>

    <div
      v-if="mapVisible"
      class="map-bottom-tools"
    >
      <div class="commity block">
        <span class="label">{{ commity.title }}</span>
      </div>
      <div class="county block">
        <span class="label">街镇</span>
      </div>
      <div class="countyside block">
        <span class="label">村社</span>
      </div>
      <div class="grid block">
        <span class="label">网格</span>
      </div>
    </div>

    <Dialog
      width="1200px"
      height="700px"
      :visible.sync="dialogVisible"
    />
  </div>
</template>
<script>
import Population from './left/Population'
import Land from './left/Land'
import EventTab from './left/EventTab'
import EventStatus from './left/EventStatus'
import EventOrigin from './left/EventOrigin'
import EventClassify from './left/EventClassify'
import Thing from './right/Thing'
import Network from './right/Network'
import Organization from './right/Organization'
import AMap from '@/components/AMap'
import CountTo from 'vue-count-to'

export default {
  components: {
    Population,
    Land,
    EventTab,
    EventStatus,
    EventOrigin,
    EventClassify,
    Thing,
    Network,
    Organization,
    AMap,
    CountTo
  },
  data () {
    return {
      dialogVisible: false,
      mapVisible: false,
      marker: null,
      selectedTab: {
        seleTab: 'EventStatus'
      },
      commity: {
        title: '安源区'
      },
      county: {

      },
      countyside: {

      },
      grid: {

      },
      curGrid: {},
      befNum: 21125345,
      aftNum: 21125345,
      setIntervalId: null
    }
  },
  computed: {
    searchOption () {
      return {
        city: '萍乡',
        citylimit: true
      }
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:curGrid')
    clearInterval(this.setIntervalId)
  },
  created () {
    this.updateCurGrid()
    this.handleCountTo()
  },
  methods: {
    mapInit (map) {
      this.map = map
    },
    // 地图查询
    onSearchResult (pois) {
      if (this.marker) {
        this.map.remove(this.marker)
      }
      if (pois && pois.length > 0) {
        this.marker = new window.AMap.Marker({
          position: [pois[0].lng, pois[0].lat],
          visible: true
        })
        this.map.setCenter([pois[0].lng, pois[0].lat])
        this.map.setZoom(15)
        this.map.add(this.marker)
      }
    },
    // 返回上一级的操作
    handleBack () {
      if (JSON.stringify(this.curGrid) === '{}') {
        this.mapVisible = false
        this.$EventBus.$emit('update:mapVisible', false)
      } else {
        this.$refs.amap.renderGrid()
        this.curGrid = {}
      }
    },
    // DOM更新之后监听地图覆盖物点击
    updateCurGrid () {
      this.$nextTick(() => {
        this.$EventBus.$on('update:curGrid', curGrid => {
          console.log('-------------', curGrid)
          this.curGrid = curGrid
        })
      })
    },
    // 定时增加
    handleCountTo () {
      this.setIntervalId = setInterval(() => {
        this.befNum = this.aftNum
        this.aftNum = this.befNum + 1000 * Math.random().toFixed(2)
      }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
.situation-container {
  width: 1920px;
  height: 100%;
  background: url('~@/assets/images/homepage/situation(10).png') center center /
    100% 100% no-repeat;
}
.page-right {
  position: relative;
  z-index: 10;
}
.page-left {
  position: relative;
  z-index: 10;
}

.homepage-center {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1075px;
  height: 850px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: url('~@/assets/images/homepage/home-page-center.gif') center
    center / 100% 100%;

  .data {
    position: relative;
    top: -50px;
  }
  .h2 {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0px 2px 3px rgba(0, 26, 53, 0.45);
  }
  h1,
  .h1 {
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0px 2px 3px rgba(0, 26, 53, 0.45);
  }
}

.map-top-tool {
  position: fixed;
  top: 80px;
  left: 430px;
  width: 55%;
  z-index: 1000;
}

.position-bg {
  position: relative;
  display: inline-block;
  width: 215px;
  height: 36px;
  margin-right: 10px;
  background: url('~@/assets/images/common/common(11).png') center center / 100%
    100% no-repeat;

  .svg-icon {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 24px;
    color: #007bef;
  }

  /deep/ .search-box {
    width: 252px;
    height: 36px;
    top: 3px;
    background-color: transparent;
    background-size: 100% 100%;
    z-index: 200 !important;
    border: 0;
    outline: 0;
    box-shadow: none;

    input {
      width: 100%;
      height: 100%;
      background-color: transparent !important;
      border: none;
      color: #a9daff;
    }
    .search-btn {
      display: none !important;
    }
    .search-tips {
      background: transparent;
      border: none;
      color: #b2d9fb;
    }
    .autocomplete-selected {
      background: #3b9afe !important;
    }
  }
}

.tuceng {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 115px;
  height: 36px;
  background: url('~@/assets/images/common/common(12).png') center center / 100%
    100% no-repeat;
  padding-left: 18px;

  .tip {
    font-size: 16px;
    color: #a4cfff;
    line-height: 36px;
  }
  .arrow {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bolder;
    font-size: 16px;
    color: #007bef;
  }
}

.back-block {
  position: absolute;
  top: 0;
  right: 0;
  width: 115px;
  height: 36px;
  cursor: pointer;
  background: url('~@/assets/images/common/common(13).png') center center / 100%
    100% no-repeat;
  text-align: center;
  line-height: 36px;
  color: #a4cfff;
}

.map-bottom-tools {
  position: absolute;
  bottom: 45px;
  left: 50%;
  width: 700px;
  margin-left: -350px;
  // display: flex;
  align-items: center;
  justify-content: space-between;

  .block {
    display: inline-block;
    vertical-align: top;
    width: 162px;
    height: 36px;
    padding-left: 45px;

    .label {
      font-size: 18px;
      font-weight: bold;
      color: #a1d8ff;
      line-height: 36px;
    }
  }

  .commity {
    background: url('~@/assets/images/common/common(3).png') center center /
      100% 100% no-repeat;
  }
  .county {
    background: url('~@/assets/images/common/common(6).png') center center /
      100% 100% no-repeat;
  }
  .countyside {
    background: url('~@/assets/images/common/common(10).png') center center /
      100% 100% no-repeat;
  }
  .grid {
    background: url('~@/assets/images/common/common (8).png') center center /
      100% 100% no-repeat;
  }
}
</style>
