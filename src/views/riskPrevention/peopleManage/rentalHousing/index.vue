<template>
  <div class="page-container">
    <CommunityAMap
      @mapInit="mapInit"
      @bindMarker="bindMarker"
      @showVR="showVR"
    />
    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <Left />
    </transition>
    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <Right />
    </transition>

    <BuildModal :visible.sync="buildModal.visible" />
    <VRModal
      :visible.sync="VRModal.visible"
      :info="VRModal.info"
    />
  </div>
</template>

<script>
import navTabsMixin from '@/views/riskPrevention/mixin/navTabsMixin'

import CommunityAMap from './CommunityAMap'
import BuildModal from './BuildModal'
import VRModal from './VRModal.vue'
import Left from './Left'
import Right from './Right'
export default {
  components: {
    CommunityAMap,
    BuildModal,
    VRModal,
    Left,
    Right
  },
  mixins: [navTabsMixin],
  data () {
    return {
      buildModal: {
        info: null,
        visible: false
      },
      VRModal: {
        info: null,
        visible: false
      }
    }
  },
  methods: {
    mapInit (map) {
      this.map = map
    },
    // 标签点击事件
    bindMarker (community) {
      this.buildModal.visible = true
    },
    showVR (community) {
      this.VRModal.visible = true
      this.VRModal.info = community
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
