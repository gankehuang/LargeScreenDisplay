<template>
  <div class="vertical-num-to">
    <span
      v-for="(item, index) in totalNumArr"
      :key="index"
      class="number"
    >
      <i ref="numberItem">0123456789</i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // 传入数值
    total: {
      type: Number,
      default: () => 453840
    },
    // 传入数值的位数
    bits: {
      type: Number,
      default: () => 9
    },
    // 是否开启数字一个一个滚动动画
    oneByOne: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      totalNumArr: [],
      setTimeOutId: 0
    }
  },
  watch: {
    total: {
      immediate: true,
      handler (total) {
        this.handleTotalNumber(total)
      }
    }
  },
  created () {
    this.$nextTick(() => {
      if (this.oneByOne) {
        this.setOneByOneNumberTransform()
      } else {
        this.setAllNumberTransform()
      }
    })
  },
  methods: {
    // 处理数字成字符串
    handleTotalNumber (total) {
      // const that = this
      const totalLength = this.bits
      const length = String(total).split('').length
      const totalArr = String(total).split('')
      for (let index = 0; index < totalLength - length; index++) {
        totalArr.unshift('0')
      }
      this.totalNumArr = totalArr.map(item => Number(item))
    },
    // 动画
    // 数字全部滚动
    setAllNumberTransform () {
      const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量\
      if (!numberItems) return
      // debugger
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]
        this.setTimeOutId = setTimeout(() => {
          elem.style.transform = `translate(-50%, -${this.totalNumArr[index] *
            10}%)`
          clearTimeout(this.setTimeoutOutId)
        }, 1000)
      }
    },
    // 数字一个一个滚动
    setOneByOneNumberTransform () {
      const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量\
      if (!numberItems) return
      // debugger
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]

        this.setTimeOutId = setTimeout(() => {
          elem.style.transform = `translate(-50%, -${this.totalNumArr[index] *
            10}%)`
          clearTimeout(this.setTimeoutOutId)
        }, (numberItems.length - index) * 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-num-to {
  display: flex;
  .number {
    position: relative;
    top: 10px;
    width: 26px;
    height: 36px;
    text-align: center;
    background: #012355;
    border: 1px solid rgba(64, 154, 255, 0.4);
    border-radius: 4px;
    margin-right: 4px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;
    i {
      font-style: normal;
      position: absolute;
      top: 4px;
      left: 50%;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
      letter-spacing: 10px;
    }
  }
}
</style>
