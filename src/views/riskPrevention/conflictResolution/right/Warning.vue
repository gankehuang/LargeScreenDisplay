<template>
  <div class="con-res-warning">
    <span class="title">
      动态预警
    </span>
    <div class="content">
      <div class="item-box">
        <div
          v-for="(item, index) in listArr"
          :key="index"
          class="item-list"
        >
          <p class="item-title">
            {{ item.happenedTime }}
          </p>
          <div style="position:relative;">
            <div class="line" />
            <div class="item-con">
              <div class="imgs">
                <CustomImage
                  v-if="item.snapImageUrl"
                  lazy
                  fit="cover"
                  :src="item.snapImageUrl"
                  :preview-src-list="
                    item.snapBakUrl ? [item.snapBakUrl] : [item.snapImageUrl]
                  "
                />
              </div>
              <div
                class="things"
                @click="showDialog(item)"
              >
                <div class="p">
                  中华情动态预警<span>{{ item.statusText }}</span>
                </div>
                <div class="p">
                  {{ item.peopleName }}
                </div>
                <div
                  class="p text-overflows"
                  :title="item.location"
                >
                  {{ item.location }}
                </div>
              </div>
              <div
                class="position"
                @click.stop="handleItem(item)"
              >
                <img src="@/assets/images/conflict/position.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryEventList } from '@/api/riskPrevention/conflictResolution/index'
export default {
  data () {
    return {
      listArr: []
    }
  },
  mounted () {
    this.getEventList()
  },
  methods: {
    getEventList () {
      const form = {
        eventName: '',
        type: '',
        status: '',
        emergencyLevel: '',
        eventCodeList: 'ZHQ_PERSONAL_CONTROL'
      }
      queryEventList(1, 50, form).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.listArr = data.list.filter(
            item => item.longitude && item.latitude
          )
        }
      })
    },
    handleItem (item) {
      this.$emit('focusEvent', item)
    },
    showDialog (item) {
      this.$emit('detailsEvent', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.con-res-warning {
  position: relative;
  width: 420px;
  height: 275px;
  background: url('~@/assets/images/conflict/left_block_bg.png') center center /
    100% 100% no-repeat;
  .content {
    width: 100%;
    margin-top: 40px;
    height: calc(100% - 40px);
  }
  .title {
    position: absolute;
    top: 10px;
    left: 30px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
  }
  .line {
    width: 1px;
    height: 110px;
    background: linear-gradient(180deg, #00a5ff 0%, rgba(0, 165, 255, 0) 100%);
    position: absolute;
    top: -12px;
    left: 11px;
  }
  .item-box {
    width: 100%;
    height: 220px;
    overflow-y: auto;
  }
  /* 设置滚动条的样式 */
  .item-box::-webkit-scrollbar {
    width: 12px;
  }

  /* 滚动槽 */
  .item-box::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .item-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
  }
  .item-list {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 10px;
    .item-title {
      background: url('~@/assets/images/conflict/z82.png') no-repeat;
      padding-left: 30px;
      color: #00ffff;
      margin-bottom: 6px;
    }
    .item-con {
      display: flex;
      margin-left: 30px;
      width: 356px;
      // height: 80px;
      background: rgba(0, 85, 255, 0.26);
      border: 1px solid #0b61a0;
      .imgs {
        .el-image {
          width: 70px;
          height: 100%;
        }
      }
      .things {
        flex: 1;
        padding-left: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #a9daff;
        line-height: 25px;
        position: relative;
        padding: 10px;
        height: 130px;
        .p {
          width: 260px;
          span {
            display: inline-block;
            width: 80px;
            height: 20px;
            line-height: 20px;
            margin-left: 80px;
            text-align: center;
            background: #3498fb;
            border-radius: 8px;
            color: #ffffff;
          }
        }
        .p:nth-of-type(2) {
          height: 25px;
        }
        .p:nth-of-type(3) {
          height: 50px;
        }
        .types {
          position: absolute;
          top: 6px;
          right: 0;
          width: 56px;
          height: 19px;
          line-height: 19px;
          background: rgba(48, 85, 146, 0);
          border: 1px solid #e6b00e;
          border-radius: 4px;
          color: #e6b00e;
          text-align: center;
        }
      }
      .position {
        position: absolute;
        bottom: 10px;
        right: 0px;
        width: 64px;
        cursor: pointer;
        img {
          display: block;
          width: 15px;
          height: 20px;
        }
      }
    }
  }
}
</style>
