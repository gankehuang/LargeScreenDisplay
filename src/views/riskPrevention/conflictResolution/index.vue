<template>
  <Container class="page-container">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="2"
    />
    <!-- <SimpleMap @mapInit="mapInit" /> -->
    <template v-slot:pageLeft>
      <Tab style="z-index:20" />
      <CallAway />
      <HigAreas />
      <Type />
    </template>
    <template v-slot:pageCenter>
      <Trend />
    </template>
    <template v-slot:pageRight>
      <ImpArea />
      <Origin />
      <Warning />
    </template>
  </Container>
</template>

<script>
import navTabsMixin from '@/views/riskPrevention/mixin/navTabsMixin'
import Tab from './left/Tab'
import CallAway from './left/CallAway'
import HigAreas from './left/HigAreas'
import Type from './left/Type'
import ImpArea from './right/ImpArea'
import Origin from './right/Origin'
import Warning from './right/Warning'
import Trend from './center/Trend'

export default {
  components: {
    Tab,
    CallAway,
    HigAreas,
    Type,
    ImpArea,
    Origin,
    Warning,
    Trend
  },
  mixins: [navTabsMixin],
  data () {
    return {

    }
  },
  methods: {
    mapInit (map) {
      this.map = map
      this._focusMap([115.79799, 28.633771], 13)
    },
    // 聚焦地图
    _focusMap (pos, zoom) {
      this.map.setCenter(pos)
      this.map.setZoom(zoom)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.page-left,
/deep/.page-right,
/deep/.page-center {
  z-index: 10;
}
/deep/.page-center {
  width: 100%;
}
.page-container {
  background-color: #021133;
}
</style>
