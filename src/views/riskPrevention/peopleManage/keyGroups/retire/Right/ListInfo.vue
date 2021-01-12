<template>
  <InfoBlock
    title="动态预警"
    height="520px"
  >
    <el-scrollbar style="height: 480px;">
      <div
        v-for="(item, index) in listArr"
        :key="index"
        class="item-list"
      >
        <p class="item-title">
          {{ item.alarmTime }}<span class="alarm">{{ item.warningLevel }}</span>
          <span class="type">
            预警类型: 视频预警
          </span>
        </p>
        <div style="position: relative;">
          <div class="line" />
          <div class="item-con">
            <div>
              {{ item.faceName | hideName }}在{{ item.snapLocation }}附近出现
            </div>
            <div class="position">
              <img
                src="@/assets/images/common/position-icon.png"
                @click="focusEvent(item)"
              >
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
          address: '两会期间陈菊英（36012219540824274X）出现在市信访局',
          type: '未核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/keyGroups/z78.png'),
          title: '人员群组事件',
          num: '3',
          address:
            '两会期间陈芙蓉（36042119600723062X）冯国花（36012219580915242X）黎小华（360122196612112410）在XX小区聚集',
          type: '已核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/keyGroups/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '两会期间陈菊英（36012219540824274X）出现在市信访局',
          type: '已核查'
        },
        {
          time: '2019-08-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/images/keyGroups/z78.png'),
          title: '人员群组事件',
          num: '3',
          address: '两会期间陈菊英（36012219540824274X）出现在市信访局',
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
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.line {
  width: 1px;
  height: 132px;
  background: linear-gradient(180deg, #00a5ff 0%, rgba(0, 165, 255, 0) 100%);
  position: absolute;
  top: -16px;
  left: 11px;
}
.item-list {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
  .item-title {
    background: url('~@/assets/images/keyGroups/z82.png') no-repeat;
    color: #00ffff;
    margin-bottom: 10px;
    padding-left: 30px;
    .alarm {
      display: inline-block;
      width: 67px;
      height: 16px;
      margin-left: 10px;
      text-align: center;
      background: url('~@/assets/images/keyGroups/j1299.png') no-repeat;
      color: #ffffff;
    }
    .type {
      display: inline-block;
      margin-left: 10px;
      color: #a9daff;
    }
  }
  .item-con {
    display: flex;
    height: 90px;
    margin-left: 20px;
    padding: 10px 25px;
    line-height: 24px;
    font-size: 12px;
    color: #a9daff;
    border: 1px solid #0b61a0;
    .position {
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
</style>
