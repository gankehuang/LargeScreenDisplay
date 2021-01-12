<template>
  <div class="page-left">
    <CountInfo />
    <SpreadInfo />
  </div>
</template>

<script>
import CountInfo from './CountInfo'
import SpreadInfo from './SpreadInfo'
export default {
  components: {
    CountInfo,
    SpreadInfo
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
