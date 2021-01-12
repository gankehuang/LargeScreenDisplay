<template>
  <div
    class="page-container"
    :style="containerStyleObj"
  >
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <slot name="pageLeft" />
      </div>
    </transition>
    <div class="page-center">
      <slot name="pageCenter" />
    </div>
    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <slot name="pageRight" />
      </div>
    </transition>

    <slot />
  </div>
</template>
<script>
export default {
  props: {
    containerStyleObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
