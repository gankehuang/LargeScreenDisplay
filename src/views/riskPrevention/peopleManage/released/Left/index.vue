<template>
  <div class="page-left">
    <CountInfo />
    <WatchInfo />
  </div>
</template>

<script>
import CountInfo from './CountInfo'
import WatchInfo from './WatchInfo'
export default {
  components: {
    CountInfo,
    WatchInfo
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
