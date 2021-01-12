<template>
  <div class="leftOne">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="con-list"
    >
      <p class="point" />
      <p class="names">
        {{ item.name }}
      </p>
      <p class="nums">
        {{ item.num }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          name: '今日预警数',
          num: '1733'
        },
        {
          name: '一般预警数',
          num: '1721'
        },
        {
          name: '重点预警数',
          num: '12'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.leftOne {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  .con-list {
    width: 390px;
    height: 50px;
    background: url('~@/assets/images/publicMonitor/组 85.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 400;
    color: #a1d8ff;
    align-items: center;
    .point {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      margin: 0 10px 0 60px;
    }
    .names {
      width: 180px;
      font-size: 20px;
      font-weight: 400;
      color: #A1D8FF;
    }
    .nums{
     font-size: 24px;
     font-weight: bold;
     color: #FFFFFF;
     width: 120px;
     text-align: right;
    }
    &:nth-child(1) {
      .point {
        background: #a1d8ff;
      }
      .nums{
        color: #a1d8ff;
      }
    }
    &:nth-child(2) {
      .point {
        background: #FF8400;
      }
       .nums{
        color: #FF8400;
      }
    }
    &:nth-child(3) {
      .point {
        background:#FB2D12;
      }
       .nums{
        color: #FB2D12;
      }
    }
  }
}
</style>
