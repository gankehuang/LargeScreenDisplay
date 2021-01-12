<template>
  <div class="ran-or-inx">
    <TitleBlock :sele-com.sync="seleCom" />
    <component :is="seleCom" />
  </div>
</template>

<script>
import TitleBlock from './TitlBlock'
import Rank from './Rank'
import Report from './Report'
export default {
  components: {
    TitleBlock,
    Rank,
    Report
  },
  data () {
    return {
      seleCom: 'Rank'
    }
  }

}
</script>

<style lang="scss" scoped>
.ran-or-inx {
  position: relative;
  width: 420px;
  height: 842px;
  background: url('~@/assets/images/common/info-big-block-bg.png') center center /
    100% 100% no-repeat;
}
</style>
