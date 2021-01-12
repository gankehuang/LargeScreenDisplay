<!-- 科辅决策 -->
<template>
  <div class="page-container">
    <AMap>
      <div class="total-score">
        <span class="label">{{ areaName }}总分:</span>
        <span class="num">{{ totalScore }}</span>
      </div>
      <div class="report-button">
        平安报告
      </div>
      <ul>
        <li
          v-for="(item,index) in levelList"
          :key="index"
        >
          <span
            :style="{'background': item.color}"
            class="color-block"
          />
          <span class="label-block">{{ item.label }}</span>
        </li>
      </ul>
    </AMap>

    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />

    <!-- 左侧布局 -->
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <RanOrRes />
      </div>
    </transition>

    <!-- 右侧布局 -->
    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <InfoBlock
          title="一级指标"
          height="48%"
        >
          <OneLeveLIndex />
        </InfoBlock>
        <InfoBlock
          title="二级指标"
          height="48%"
        >
          <TwoLeveLIndex />
        </InfoBlock>
      </div>
    </transition>
  </div>
</template>
<script>
import navTabsMixin from '../mixin/navTabsMixin'
import OneLeveLIndex from './right/OneLeveLIndex'
import RanOrRes from './left/RanOrRes'
import TwoLeveLIndex from './right/TwoLeveLIndex'
import AMap from '@/components/AMap'

export default {
  components: {
    RanOrRes,
    OneLeveLIndex,
    TwoLeveLIndex,
    AMap
  },
  mixins: [navTabsMixin],
  data () {
    return {
      areaName: '凤凰街道',
      totalScore: 92.12,
      levelList: [
        {
          label: '90~100',
          color: '#FF8400'
        },
        {
          label: '87~90',
          color: '#FFEA00'
        },
        {
          label: '85~87',
          color: '#10DC92'
        },
        {
          label: '0~85',
          color: '#12A6FB'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.title-block {
  position: absolute;
  top: 0;
}
.total-score {
  position: absolute;
  top: 120px;
  left: 450px;

  .label {
    font-size: 18px;
    font-weight: bold;
    color: #9dc6f5;
  }
  .num {
    display: inline-block;
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
.report-button {
  position: absolute;
  top: 150px;
  left: 450px;
  width: 110px;
  height: 36px;
  background: url('~@/assets/images/safeIndex/safeIndex(8).png') center center /
    100% 100% no-repeat;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #a4cfff;
}
ul {
  position: absolute;
  top: 120px;
  right: 450px;
  margin: 0;
  padding: 0;
  width: 100px;

  li {
    display: block;
    margin: 10px;
    width: 100%;
  }
  .color-block {
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    height: 12px;
    border-radius: 2px;
  }
  .label-block {
    font-size: 16px;
    font-weight: bold;
    color: #a1d8ff;
  }
}
</style>
