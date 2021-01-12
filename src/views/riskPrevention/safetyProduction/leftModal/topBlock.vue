<!-- 隐患排查组件 -->
<template>
  <div class="top-block">
    <!-- 头部区域 -->
    <div class="top-top-block">
      <div
        v-for="(item, index) in title"
        :key="index"
      >
        <div class="top-top-title-box">
          <div class="top-top-title">
            {{ item.name }}
          </div>
          <!-- 数据 -->
          <div class="top-top-value">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- 中部区域 -->
    <div class="top-mid-block">
      <div class="top-mid-bg" />
    </div>

    <!-- 下部区域 -->
    <div class="top-bottom-block">
      <div
        v-for="(item, index) in bottom"
        :key="index"
        class="top-bottom-box"
      >
        <div class="top-bottom-img" />
        <div class="top-bottom-content">
          <div class="top-bottom-title">
            {{ item.name }}
          </div>
          <div class="top-bottom-value">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

/**
 * @param titleValue 接受一个数组,0: 隐患总数,1: 未整改隐患,2: 超期隐患
 * @param bottomValue 接受一个数组,0: 本月整改总数,1: 本周整改总数
 */

export default {
  props: {
    titleValue: {
      type: Array,
      required: true
    },
    bottomValue: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      title: [
        { name: '隐患总数', value: this.titleValue[0] },
        { name: '未整改隐患', value: this.titleValue[1] },
        { name: '超期隐患', value: this.titleValue[2] }
      ],
      bottom: [
        { name: '本月整改总数', value: this.bottomValue[0] },
        { name: '本周整改总数', value: this.bottomValue[1] }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .top-block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    .top-top-block {
      display: flex;
      justify-content: space-around;

      .top-top-title-box {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        .top-top-title {
          color: #A1D8FF;
          font-size: 16px;
          line-height: 28px;
        }

        .top-top-value {
          color: #FFFFFF;
          font-size: 18px;
          padding-top: 5px;
        }
      }
    }

    .top-mid-block {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 5px;

      .top-mid-bg {
        width: 370px;
        height: 32px;
        background: url('~@/assets/images/safetyProduction/left-top-line.png') no-repeat;
      }
    }

    .top-bottom-block {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding-top: 5px;

      .top-bottom-box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;

        .top-bottom-img {
          width: 54px;
          height: 54px;
          background: url('~@/assets/images/safetyProduction/left-top-one.png') no-repeat;
        }

        .top-bottom-content {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          padding-left: 10px;

          .top-bottom-title {
            color: #A1D8FF;
            font-size: 16px;
            line-height: 28px;
          }

          .top-bottom-value {
            color: #FFFFFF;
            font-size: 18px;
            line-height: 28px;
          }
        }

      }
    }

  }
</style>
