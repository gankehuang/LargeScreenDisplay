<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="抓拍信息"
    width="534px"
    append-to-body
    :visible="visible"
    class="dialog"
    @open="dialogOpen"
    @close="dialogClose"
  >
    <el-form label-width="105px">
      <el-form-item label="车牌号码">
        <span class="value-color">{{ snapInfo.plateNo }}</span>
      </el-form-item>
      <el-form-item label="车牌类型">
        <span class="value-color">{{ snapInfo.plateTypeText }}</span>
      </el-form-item>
      <el-form-item label="车牌状态">
        <span class="value-color">{{ snapInfo.plateStateText }}</span>
      </el-form-item>
      <el-form-item label="车牌品牌">
        <span class="value-color">{{ snapInfo.vehicleLogoText }}</span>
      </el-form-item>
      <el-form-item label="车牌类型">
        <span class="value-color">{{ snapInfo.vehicleTypeText }}</span>
      </el-form-item>
      <el-form-item label="车辆颜色">
        <span class="value-color">{{ snapInfo.vehicleColorText }}</span>
      </el-form-item>
      <el-form-item label="抓拍地点">
        <span class="value-color">{{ snapInfo.crossingName }}</span>
      </el-form-item>
      <el-form-item label="抓拍时间">
        <span class="value-color">{{ snapInfo.shootTime }}</span>
      </el-form-item>
    </el-form>

    <div class="img">
      <el-image
        v-if="snapInfo.imagePath"
        style="width:100px ; height:120px"
        :src="snapInfo.imagePath"
        :preview-src-list="[snapInfo.imagePath]"
      />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      snapInfo: {}
    }
  },
  methods: {
    dialogOpen () {
      this.snapInfo = { ...this.info }
    },

    dialogClose () {
      this.$emit('update:visible', false)
    },
    srcList (path) {
      const list = []
      if (path.indexOf('http') !== -1) {
        list.push(path)
        return list
      } else {
        list.push(this.$store.getters.uploadImg + path)
        return list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  .el-dialog__header {
    border-bottom: 1px solid #dcdcdc;
  }
  .el-dialog__body {
    margin-top: 20px;
    color: #333;
    position: relative;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 5px;
    .el-form-item__label {
      padding: 0 24px 0 0;
      color: #999;
    }
  }
}
/deep/ .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}
.img {
  position: absolute;
  right: 25px;
  top: 0;
}
.value-color {
  color: #01aae5;
}
</style>
