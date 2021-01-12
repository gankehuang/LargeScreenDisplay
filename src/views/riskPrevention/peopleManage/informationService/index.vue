<template>
  <div class="informationService">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />
    <selecrTabs @changeBox="changeBox" />
    <div
      v-if="cur === 0"
      class="information-box"
    >
      <face />
    </div>
    <div
      v-else
      class="information-box"
    >
      <car />
    </div>
  </div>
</template>

<script>
import selecrTabs from './selecrTabs'
import face from './face/index'
import car from './car/index'
import navTabsMixin from '../../mixin/navTabsMixin'
export default {
  components: {
    selecrTabs,
    face,
    car
  },
  mixins: [navTabsMixin],
  data () {
    return {
      cur: 0
    }
  },
  methods: {
    changeBox (data) {
      this.cur = data
    }
  }
}
</script>
<style lang="scss" scoped>
.informationService {
  width: 100%;
  height: 100%;
  background-color: #021133;
  padding-top: 120px;
  .information-box{
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 10px;
  }
}
</style>
