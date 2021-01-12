<template>
  <InfoBlock
    title="信访人员动态预警"
    height="332px"
  >
    <el-scrollbar style="height: 275px;">
      <div
        v-for="(item, index) in listArr"
        :key="index"
        class="item-list"
      >
        <p class="item-title">
          {{ item.alarmTime }}
        </p>
        <div style="position: relative;">
          <div class="line" />
          <div class="item-con">
            <div class="imgs">
              <CustomImage
                v-if="item.imageUrl"
                lazy
                fit="cover"
                :preview-src-list="[item.imageUrl]"
                :src="item.imageUrl"
              />
            </div>
            <div
              class="things"
              @click="showDialog(item)"
            >
              <div class="p">
                {{ item.faceName | hideName
                }}<span v-if="item.eventInfo">{{
                  item.eventInfo.statusText
                }}</span>
              </div>
              <div class="p">
                {{ item.taskName }}
              </div>
              <div class="p">
                {{ item.snapLocation }}出现
              </div>
            </div>
            <div
              class="position"
              @click.stop="focusEvent(item)"
            >
              <img src="@/assets/images/common/position-icon.png">
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </InfoBlock>
</template>
<script>
import { queryAlarmRecord } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      listArr: [
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/keyGroups/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '两会期间陈菊英（3601221954****274X）出现在市信访局',
          type: '未核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/keyGroups/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '两会期间许卓云（3601021941****052X）购买前往北京的高铁票',
          type: '已核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/keyGroups/z78.png'),
          title: '人员群组事件',
          num: '3',
          address:
            '两会期间陈芙蓉（36042119****23062X）冯国花（36012219****15242X）黎小华（36012219****112410）在XX小区聚集',
          type: '已核查'
        }
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const fd = {
        beginTime: '2020-01-01 00:00:00',
        endTime: '2021-10-25 00:00:00',
        taskId: '125687564'
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
    focusEvent (item) {
      this.$EventBus.$emit('focusEvent', {
        ...item.eventInfo,
        position: [item.longitude, item.latitude]
      })
    },
    showDialog (item) {
      this.$EventBus.$emit('detailsEvent', {
        ...item.eventInfo,
        position: [item.longitude, item.latitude]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.item-list {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
  .item-title {
    background: url('~@/assets/images/keyGroups/z82.png') no-repeat;
    padding-left: 30px;
    color: #00ffff;
    margin-bottom: 10px;
  }
  .item-con {
    display: flex;
    margin-left: 30px;
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
.line {
  width: 1px;
  height: 132px;
  background: linear-gradient(180deg, #00a5ff 0%, rgba(0, 165, 255, 0) 100%);
  position: absolute;
  top: -16px;
  left: 11px;
}
</style>
