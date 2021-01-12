<template>
  <div class="rank-tabs">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="tab"
      :class="selectedItem.index === index ? 'tab-selected' : ''"
      @click="handleTab({ index, ...item })"
    >
      <div
        class="label"
        :title="item.label"
        @click="
          index === 0
            ? handleSelectedIndicator({
              label: '综合',
              indicatorName: '综合',
              level: 0
            })
            : ''
        "
      >
        {{ item.label }}
      </div>
      <ul
        class="tab-ul"
        :style="
          index === 1 && selectedItem.index === index ? '' : 'display:none'
        "
      >
        <li
          v-for="(oneItem, oneIndex) in oneLevel"
          :key="oneIndex"
          @click="handleOneLevel(oneItem)"
        >
          <span @click="handleSelectedIndicator({ ...oneItem, level: 1 })">{{
            oneItem.label
          }}</span>
        </li>
      </ul>
      <ul
        class="tab-ul"
        :style="
          index === 2 && selectedItem.index === index ? '' : 'display:none'
        "
      >
        <li
          v-for="(twoItem, twoIndex) in twoLevel"
          :key="twoIndex"
          :title="twoItem.label"
          @click="handleTwoLevel(twoItem)"
        >
          <span @click="handleSelectedIndicator({ ...twoItem, level: 2 })">{{
            twoItem.label
          }}</span>
        </li>
      </ul>
      <ul
        class="tab-ul"
        :style="
          index === 3 && selectedItem.index === index ? '' : 'display:none'
        "
      >
        <li
          v-for="(threeItem, threeIndex) in threeLevel"
          :key="threeIndex"
          :title="threeItem.label"
          @click="handleThreeLevel(threeItem)"
        >
          <span @click="handleSelectedIndicator({ ...threeItem, level: 3 })">{{
            threeItem.label
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { initTwoLevel, initThreeLevel } from '../mock'
export default {
  data () {
    return {
      selectedItem: { index: undefined },
      oneLevelItem: { label: '政治安全' },
      twoLevelItem: { label: '政治安全防范' },
      selectedIndicator: { label: '综合', level: 0 },
      tabs: [
        {
          label: '总分'
        },
        {
          label: '一级指标'
        },
        {
          label: '二级指标'
        },
        {
          label: '三级指标'
        }
      ],
      oneLevel: [
        {
          label: '政治安全'
        },
        {
          label: '治安安全'
        },
        {
          label: '经济安全'
        },
        {
          label: '公共安全'
        },
        {
          label: '矛盾纠纷'
        },
        {
          label: '公众安全感'
        }
      ],
      twoLevel: [],
      threeLevel: []
    }
  },
  watch: {
    oneLevelItem (oneLevelItem) {
      this.twoLevel = initTwoLevel
      this.twoLevel = this.twoLevel.filter(
        item => item.upLevelLabel === oneLevelItem.label
      )
    },
    twoLevelItem (twoLevelItem) {
      this.threeLevel = initThreeLevel
      this.threeLevel = this.threeLevel.filter(
        item => item.upLevelLabel === twoLevelItem.label
      )
    }
  },
  methods: {
    // 获取当前选中指标
    handleSelectedIndicator (indicator) {
      //   this.$EventBus.$emit('update:selectedIndicator', indicator)
      this.selectedIndicator = indicator
      //   if (this.selectedItemCode === '3601') {
      //     this.handleQuerySecurityAssessList(initListData)
      //   } else {
      //     this.handleGetGridLine(this.selectedItemCode)
      //   }
    },
    handleTab (item) {
      if (item.index === 0) {
        this.handleOneLevel({ label: '一级指标' })
        this.handleTwoLevel({ label: '二级指标' })
        this.handleThreeLevel({ label: '三级指标' })
      }
      if (this.selectedItem.index === item.index) {
        this.selectedItem = { index: undefined }
      } else {
        this.selectedItem = item
      }
    },
    handleOneLevel (item) {
      this.oneLevelItem = { label: item.label }
      this.tabs[1] = { label: item.label }
      this.handleTwoLevel({ label: '二级指标' })
      this.handleThreeLevel({ label: '三级指标' })
    },
    handleTwoLevel (item) {
      this.twoLevelItem = { label: item.label }
      this.tabs[2] = { label: item.label }
    },
    handleThreeLevel (item) {
      this.tabs[3] = { label: item.label }
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-tabs {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tab {
    width: 86px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #7ebdff;
    background: url('~@/assets/images/safeIndex/safeIndex(4).png') no-repeat
      center center;
    background-size: 100% 100%;
    cursor: pointer;
    .label {
      width: 100%;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tab-selected {
    background: url('~@/assets/images/safeIndex/safeIndex(3).png') no-repeat
      center center;
    background-size: 100% 100%;
  }
  .tab-ul {
    list-style-type: none;
    padding: 0;
    width: 86px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #033d9c;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    position: relative;
    z-index: 10;
    li {
      display: block;
      font-size: 18px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: #01295d;
      }
    }
  }
}
</style>
