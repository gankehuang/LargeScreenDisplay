<!-- 顶部组件 -->
<template>
  <div class="right-top-block">
    <div
      v-for="(item, index) in content"
      :key="index"
      class="right-top-content-box"
    >
      <div
        class="right-top-img"
        :style="'background: url(' + require('@/assets/images/safetyProduction' + item.src ) + ')'"
      />
      <div class="right-top-value">
        <div style="fontSize: 16px; width: 101px">
          {{ item.name }}
        </div>
        <div style="fontSize: 16px; paddingTop: 10px">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

/**
 * @param value 接受一个数组,0: 消防设备超期,1: 安全设备超期,2: 特种设备超期,3: 证件过期
 */

export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      content: [
        { src: '/right-top-one.png', name: '消防设备超期', value: this.value[0] },
        { src: '/right-top-two.png', name: '安全设备超期', value: this.value[1] },
        { src: '/right-top-three.png', name: '特种设备超期', value: this.value[2] },
        { src: '/right-top-four.png', name: '证件过期', value: this.value[3] }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-top-block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    .right-top-content-box {
      display: flex;
      justify-content: center;
      align-items: center;

      .right-top-img {
        width: 56px;
        height: 56px;
      }

      .right-top-value {
        color: #A1D8FF;
        margin-left: 10px;
      }

    }

  }
</style>
