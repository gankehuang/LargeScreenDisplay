<template>
  <div class="selecrTabs">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="['one', { selectOne: current === index }]"
      @click="changeCurrent(index)"
    >
      {{ item }}
    </div>
    <div
      class="trajectory"
      @click="showDialog"
    >
      {{ current === 0 ? '人脸轨迹' : '车辆轨迹' }}
    </div>
    <Dialog
      title="车辆轨迹"
      width="1500px"
      height="95%"
      :visible.sync="carVisible"
    >
      <carDialogInfo />
    </Dialog>
    <Dialog
      title="人脸轨迹"
      width="1500px"
      height="90%"
      :visible.sync="faceVisible"
    >
      <faceDialogInfo />
    </Dialog>
  </div>
</template>

<script>
import carDialogInfo from './car/dialogInfo'
import faceDialogInfo from './face/dialogInfo'
export default {
  components: {
    carDialogInfo,
    faceDialogInfo
  },
  data () {
    return {
      list: ['人脸抓拍', '车辆抓拍'],
      current: 0,
      carVisible: false,
      faceVisible: false
    }
  },
  methods: {
    // tab切换
    changeCurrent (index) {
      this.current = index
      this.$emit('changeBox', index)
    },
    // 点击轨迹按钮
    showDialog () {
      if (this.current === 0) {
        this.faceVisible = true
      } else {
        this.carVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selecrTabs {
  width: 100%;
  height: 36px;
  border-bottom: 2px solid #13476a;
  display: flex;
  position: relative;
  .one {
    width: 120px;
    height: 34px;
    background-color: #243142;
    text-align: center;
    line-height: 34px;
    color: #fff;
    cursor: pointer;
  }
  .selectOne {
    background-color: #0a8fc7;
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 20px;
      height: 10px;
      background: url('~@/assets/images/informationService/多边形 1.png') center
        center / 100% 100% no-repeat;
      position: absolute;
      top: 35px;
      left: 50px;
    }
  }
  .trajectory {
    width: 110px;
    height: 34px;
    position: absolute;
    right: 15px;
    bottom: 2px;
    background-color: #0a8fc7;
    text-align: center;
    line-height: 34px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
