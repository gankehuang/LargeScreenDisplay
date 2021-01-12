<template>
  <div class="win-info">
    <div class="title">动态预警</div>
    <div class="item-box">
      <div class="item-list" v-for="(item, index) in listArr" :key="index">
        <p class="item-title">
          {{ item.alarmTime }}
        </p>
        <div style="position: relative;">
          <div class="line" />
          <div class="item-con">
            <div class="imgs">
              <CustomImage
                lazy
                v-if="item.imageUrl"
                fit="cover"
                :preview-src-list="[item.imageUrl]"
                :src="item.imageUrl"
              />
            </div>
            <div class="things" @click="showDialog(item)">
              <div class="p">
                {{ item.faceName | hideName
                }}<span v-if="item.eventInfo">{{
                  item.eventInfo.statusText
                }}</span>
              </div>
              <div class="p">{{ item.taskName }}</div>
              <div class="p">{{ item.snapLocation }}出现</div>
            </div>
            <div class="position" @click.stop="focusEvent(item)">
              <img src="@/assets/image/importPeople/position.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryAlarmRecord } from '@/api/riskPrevention/importPeople'

export default {
  data() {
    return {
      listArr: [
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级报警',
          img: require('@/assets/image/importPeople/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '南昌高新大道创业楼',
          type: '未核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级报警',
          img: require('@/assets/image/importPeople/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '南昌高新大道创业楼',
          type: '已核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级报警',
          img: require('@/assets/image/importPeople/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '南昌高新大道创业楼',
          type: '已核查'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const fd = {
        beginTime: '2020-01-01 00:00:00',
        endTime: '2021-10-25 00:00:00',
        taskId: '125557975'
      }
      queryAlarmRecord(1, 10, fd).then(res => {
        if (res.status === 200) {
          const list = []
          res.data.list.forEach(item => {
            if (
              item.eventInfo.statusText !== '已处置' &&
              item.eventInfo.statusText !== '已归档'
            ) {
              list.push({
                ...item,
                warningLevel: '四级警报'
              })
            }
          })
          this.listArr = list
        }
      })
    },
    focusEvent(item) {
      this.$EventBus.$emit('focusEvent', {
        ...item.eventInfo,
        position: [item.longitude, item.latitude]
      })
    },
    showDialog(item) {
      this.$EventBus.$emit('detailsEvent', {
        ...item.eventInfo,
        position: [item.longitude, item.latitude]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 275px;
  background: url('~@/assets/image/importPeople/xsjj-right-bg3.png') no-repeat;
  background-size: 100% 100%;
  padding-top: 40px;
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
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .item-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .item-list {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 20px;
    cursor: pointer;
    .item-title {
      background: url('~@/assets/image/importPeople/z82.png') no-repeat;
      padding-left: 30px;
      color: #00ffff;
      margin-bottom: 10px;
    }
    .item-con {
      display: flex;
      margin-left: 30px;
      width: 356px;
      // height: 85px;
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
        .p {
          span {
            display: inline-block;
            width: 67px;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            text-align: center;
            // background: url("~@/assets/image/importPeople/j1299.png")no-repeat PageCenter;
            // background-size: 100% 100%;
            background: #3498fb;
            border-radius: 8px;
            color: #ffffff;
          }
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
        width: 64px;
        cursor: pointer;
        img {
          display: block;
          width: 15px;
          height: 20px;
          margin: 40px auto 0;
        }
      }
    }
  }
}
.title {
  position: absolute;
  top: 15px;
  left: 30px;
  color: #7dbcff;
  font-weight: bold;
  font-size: 16px;
}
.line {
  width: 1px;
  height: 110px;
  background: linear-gradient(180deg, #00a5ff 0%, rgba(0, 165, 255, 0) 100%);
  position: absolute;
  top: -12px;
  left: 11px;
}
</style>
