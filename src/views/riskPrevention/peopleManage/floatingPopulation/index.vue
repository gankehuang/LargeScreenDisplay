<template>
  <div class="page-container">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />
    <MapView />
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <StatisticalData />
        <InfoBlock
          height="455px"
          title="流动人口分布图"
        >
          <leftOne />
        </InfoBlock>
        <InfoBlock
          title="流动人口流入趋势分析"
          height="275px"
        >
          <leftTwo />
        </InfoBlock>
      </div>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <InfoBlock
          title="流动人口结构"
          height="275px"
        >
          <rightOne />
        </InfoBlock>
        <InfoBlock
          title="高危地区流入TOP5"
          height="275px"
        >
          <rightTwo />
        </InfoBlock>
        <InfoBlock
          title="人员流动实时预警"
          height="275px"
        >
          <rightThree />
        </InfoBlock>
      </div>
    </transition>

    <Dialog
      width="1200px"
      height="700px"
      :visible.sync="dialogVisible"
    />
  </div>
</template>
<script>
import navTabsMixin from '../../mixin/navTabsMixin'
import StatisticalData from './StatisticalData'
import leftOne from './leftOne'
import leftTwo from './leftTwo'
import rightOne from './rightOne'
import rightTwo from './rightTwo'
import rightThree from './rightThree'
import MapView from './MapView'
export default {
  components: {
    leftOne,
    leftTwo,
    rightOne,
    rightTwo,
    rightThree,
    MapView,
    StatisticalData
  },
  mixins: [navTabsMixin],
  data () {
    return {
      dialogVisible: false,
      isShowPointView: false,
      leftTwo: {
        title: '流动人口流入趋势分析',
        width: '420px',
        height: '275px'
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/floatingPopulation/组 634.png') center center / 100%
    100% no-repeat;
}
</style>
