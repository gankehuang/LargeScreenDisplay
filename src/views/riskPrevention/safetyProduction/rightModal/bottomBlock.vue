<!-- 实时预警组件 -->
<template>
  <div class="right-bottom-block-box">
    <div
      v-for="(item, index) in valueList"
      :key="item.id"
      class="infoCard-box"
    >
      <div
        class="infoCard-image-box"
      >
        <el-image
          class="el-image-box"
          :src="imgURL[index]"
          :preview-src-list="changeImg(index)"
        />
      </div>
      <div class="infoCard-content-box">
        <div class="infoCard-content-one">
          <div
            class="text-overflow"
            :style="{width: '150px'}"
          >
            {{ item.eventName }}
          </div>
          <div class="infoCard-content-one-notice notice-true">
            {{ '已派发' }}
          </div>
          <div
            :style="{height: '20px', marginLeft: '40px'}"
            @click="showDialog($event, item)"
          >
            <img
              :style="{ height: '20px', cursor: 'pointer'}"
              src="@/assets/images/conflict/position.png"
            >
          </div>
        </div>
        <div
          :style="{marginTop: '9px', width: '252px'}"
          class="text-overflow"
        >
          {{ item.location }}
        </div>
        <div :style="{marginTop: '6px'}">
          {{ item.createTime }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    valueList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      imgURL: [require('@/assets/images/safetyProduction/warn.jpg'), require('@/assets/images/safetyProduction/warn2.jpg')]
    }
  },
  methods: {
    showDialog: function (event, item) {
      this.$EventBus.$emit('safeProduceEvent', {
        ...item.eventInfo,
        position: [item.longitude, item.latitude]
      })
    },
    changeImg (index) {
      const mid = []
      mid.push(this.imgURL[index])
      return mid
    }
  }

}
</script>
<style lang="scss" scoped>
  .right-bottom-block-box {
    overflow: auto;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .infoCard-box {
      margin-top: 10px;
      padding: 18px 12px;
      width: 384px;
      height: 97.5px;
      background: url('~@/assets/images/safetyProduction/right-bottom-bg.png');
      background-size: 100% 100%;
      display: flex;
      flex-flow: row;
      align-items: center;

      .infoCard-image-box {
        width: 54px;
        height: 72px;
        background: #00A2FF;

        .el-image-box {
          width: 54px;
          height: 72px;
        }
      }

      .infoCard-content-box {
        width: 280px;
        color: #A1D8FF;
        padding-left: 9px;
        height: 72px;

        .infoCard-content-one {
          padding-top: 4px;
          display: flex;
          align-items: center;

          .infoCard-content-one-notice {
            width: 50px;
            height: 20px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 11px;
          }

        }
      }

    }
  }

  /* 设置滚动条的样式 */
  .right-bottom-block-box::-webkit-scrollbar {
    width: 4px;
  }

  /* 滚动槽 */
  .right-bottom-block-box::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .right-bottom-block-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
  }

  .notice-true {
    background: rgba(0, 111, 175, 0.46);
    border: 1px solid #2FA4FF;
  }

  .notice-false {
    background: rgba(0, 111, 175, 0.46);
    border: 1px solid #2FA4FF;
  }
</style>
