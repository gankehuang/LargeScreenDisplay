<template>
  <div class="sit-network">
    <div
      v-for="(item,index) in dataArr"
      :key="index"
      class="data-item"
      @click="handleMapVisible(index)"
    >
      <i class="icon" />
      <div class="label">
        {{ item.label }}
      </div>
      <div class="num">
        {{ item.num }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mapVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataArr: [
        {
          label: '网格员',
          num: 434
        },
        {
          label: '网格数',
          num: 424
        },
        {
          label: '网格融入',
          num: 333
        },
        {
          label: '网络舆情',
          num: 4589
        }
      ]
    }
  },
  methods: {
    handleMapVisible (index) {
      if (index === 1) {
        this.$emit('update:mapVisible', true)
        this.$EventBus.$emit('update:mapVisible', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-network {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
}
.data-item {
  width: 24%;
  text-align: center;

  i {
    display: block;
    margin: 0 auto;
    width: 68px;
    height: 68px;
  }
  .label {
    font-size: 16px;
    color: #a1d8ff;
    line-height: 28px;
  }
  .num {
    font-size: 20px;
    color: #ffffff;
    line-height: 36px;
  }
  &:nth-of-type(1) {
    i {
      background: url('~@/assets/images/homepage/situation(9).png') center
        center / 100% 100% no-repeat;
    }
  }
  &:nth-of-type(2) {
    cursor: pointer;
    i {
      background: url('~@/assets/images/homepage/situation(6).png') center
        center / 100% 100% no-repeat;
    }
  }
  &:nth-of-type(3) {
    i {
      background: url('~@/assets/images/homepage/situation(7).png') center
        center / 100% 100% no-repeat;
    }
  }
  &:nth-of-type(4) {
    i {
      background: url('~@/assets/images/homepage/situation(8).png') center
        center / 100% 100% no-repeat;
    }
  }
}
</style>
