<template>
  <InfoBlock
    title="案件详情"
    height="300px"
  >
    <div class="container">
      <div>
        <span class="label">案件编号</span>
        <span class="content">2020225022109</span>
      </div>
      <div class="container-box">
        <span class="label">案件描述</span>
        <span class="content">出现多人聚集，人群聚集...</span>
      </div>
      <div class="container-box">
        <span class="label">案件等级</span>
        <span class="case-level">紧急件</span>
      </div>
      <div class="container-box">
        <span class="label">上报时间</span>
        <span class="content">2020-05-06</span>
      </div>
      <div class="container-box">
        <span class="label">上报地址</span>
        <span class="content">观山湖区下铺村委会</span>
      </div>
      <div class="container-box">
        <div
          class="case-image"
        >
          <div
            v-for="(item, index) in vehicleInfo"
            :key="index"
            class="image-box"
          >
            <el-image
              v-if="item.imagePath"
              style="width:100%;height:100%;"
              :z-index="9999"
              :src="item.imagePath"
              :preview-src-list="[item.imagePath]"
            />
            <img
              v-else
              :src="require('@/assets/images/commandAndDispatch/no-avatar.png')"
              style="width:100%;height:100%;"
            >
          </div>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>
<script>
export default {
  data () {
    return {
      vehicleInfo: [
        { imagePath: require('@/assets/images/commandAndDispatch/zdjs_01.jpg') },
        { imagePath: require('@/assets/images/commandAndDispatch/冬季消防4.jpg') }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0px 0 0 29px;

  .container-box{
    margin-top: 10px;
    .case-level{
      display: inline-block;
      width: 69px;
      height: 19px;
      text-align: center;
      line-height: 19px;
      border: 1px solid red;
      color: red;
      border-radius: 10px;
      margin-left: 15px;
    }
    .case-image{
      width: 100%;
      height: 100px;
      margin-top: 15px;
      .image-box{
        width: 47%;
        height: 100px;
        margin-right: 8px;
        display: inline-block;
      }
    }
  }

  .label{
    color: #A1D8FF;
    font-weight: bold;
    font-size: 14px;
  }
  .content{
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
