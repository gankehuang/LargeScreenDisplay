<template>
  <div
    class="event-marker"
    :class="classObject()"
    @click="handleClick"
  >
    <img
      class="event-type-img"
      :src="toEventTypeImg()"
    >
    <div class="event-type-text">
      {{ eventType }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    eventType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    classObject () {
      return {
        zzaq: this.eventType === '政治安全',
        shza: this.eventType === '社会治安',
        mdjf: this.eventType === '矛盾纠纷',
        ggaq: this.eventType === '公共安全',
        wlaq: this.eventType === '网络安全',
        customType: (this.eventType !== '网络安全' &&
          this.eventType !== '社会治安' &&
          this.eventType !== '矛盾纠纷' &&
          this.eventType !== '公共安全')
      }
    },
    toEventTypeImg () {
      let imgUrl = ''
      switch (this.eventType) {
        case '政治安全':
          imgUrl = require('@/assets/images/common/event-type1.gif')
          break
        case '社会治安':
          imgUrl = require('@/assets/images/common/event-type2.gif')
          break
        case '矛盾纠纷':
          imgUrl = require('@/assets/images/common/event-type3.gif')
          break
        case '公共安全':
          imgUrl = require('@/assets/images/common/event-type4.gif')
          break
        case '网络安全':
          imgUrl = require('@/assets/images/common/event-type5.gif')
          break
        default:
          imgUrl = require('@/assets/images/common/event-type6.gif')
          break
      }
      return imgUrl
    },
    handleClick () {
      this.$emit('markerClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.event-marker {
  display: flex;
  align-items: center;
  .event-type-text {
    color: #fff;
    white-space: nowrap;
    padding: 4px 7px;
    text-align: left;
  }

  &.zzaq {
    .event-type-text {
      background: url('~@/assets/images/common/event-type-text1.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  &.shza {
    .event-type-text {
      background: url('~@/assets/images/common/event-type-text2.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  &.mdjf {
    .event-type-text {
      background: url('~@/assets/images/common/event-type-text3.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  &.ggaq {
    .event-type-text {
      background: url('~@/assets/images/common/event-type-text4.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  &.wlaq {
    .event-type-text {
      background: url('~@/assets/images/common/event-type-text5.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  &.customType {
    .event-type-text {
      background: url('~@/assets/images/common/event-type-text6.png') no-repeat;
      background-size: 100% 100%;
    }
  }

}

</style>
