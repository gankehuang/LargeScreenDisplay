<template>
  <div class="rightThree">
    <div class="list">
      <el-scrollbar style="height:100%;">
        <div
          v-for="(item, index) in rightBottomList"
          :key="index"
          class="item"
        >
          <div class="time">
            {{ item.time }}
          </div>
          <div class="detail">
            <el-image
              style="width:64px;height:64px"
              :src="item.imageUrl"
            />
            <div class="info">
              <div class="thing">
                {{ item.thing }}
              </div>
              <div class="veh-name">
                {{ item.vehName }}
              </div>
              <div class="veh-address">
                {{ item.vehAddress }}
              </div>
            </div>
            <div class="icon" />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightBottomList: [
        {
          time: '2020-10-28 17:24:23',
          warningLevel: '二级警报',
          imageUrl: require('@/assets/images/keyGroups/has-avatar.png'),
          thing: '7天内来自新疆人员同时入住xxx宾馆',
          vehName: '人脸微卡口',
          vehAddress: '南昌市高新区艾溪湖管理处xx宾馆'
        },
        {
          time: '2020-11-03 21:34:09',
          warningLevel: '二级警报',
          imageUrl: require('@/assets/images/keyGroups/has-avatar.png'),
          thing: '流动人口在东湖区XXX小区聚集',
          vehName: '人脸微卡口',
          vehAddress: '东湖区XXX小区'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.rightThree {
  width: 100%;
    height: 100%;
  .list {
    width: 100%;
    height: 100%;
    color: #fff;
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .item {
    margin: 10px auto;
    width: 356px;
    height: 100%;
  }
  .time,
  .warning-level {
    display: inline-block;
  }
  .time {
    color: #00ffff;
    padding-right: 20px;
  }
  .warning-level {
    background: #ec6100;
    padding: 5px;
    border-radius: 20px;
  }
  .detail {
    width: 100%;
    height: 100%;
    margin-top: 5px;
    border: 1px solid #0c62a0;
  }
  .info {
    display: inline-block;
    padding: 5px 0 0 5px;
    vertical-align: top;
  }
}
</style>
