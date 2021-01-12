<template>
  <div class="switch-buttons">
    <div
      :class="['echart-button', { selected: !mapOrEcharts }]"
      @click="handlemMapOrEcharts(false)"
    />
    <div
      :class="['map-button', { selected: mapOrEcharts }]"
      @click="handlemMapOrEcharts(true)"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      mapOrEcharts: false
    }
  },
  methods: {
    handlemMapOrEcharts (isShow) {
      this.mapOrEcharts = isShow
      this.$emit('updateView', isShow)
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-buttons {
  position: absolute;
  top: 100px;
  right: 23%;
  z-index: 99;
  .map-button,
  .echart-button {
    width: 54px;
    height: 40px;
    margin: 6px;
  }

  & > div {
    cursor: pointer;
  }
  .map-button {
    background: url("~@/assets/images/keyGroups/map-button.png") center
      center / 100% 100% no-repeat;
  }
  .echart-button {
    background: url("~@/assets/images/keyGroups/echart-button.png")
      center center / 100% 100% no-repeat;
  }
  .map-button.selected {
    background: url("~@/assets/images/keyGroups/map-button-selected.png")
      center center / 100% 100% no-repeat;
  }
  .echart-button.selected {
    background: url("~@/assets/images/keyGroups/echart-button-selected.png")
      center center / 100% 100% no-repeat;
  }
}
</style>
