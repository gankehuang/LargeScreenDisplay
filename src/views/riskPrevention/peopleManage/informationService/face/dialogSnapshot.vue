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
    <el-form
      label-width="105px"
      label-position="left"
    >
      <el-form-item
        label="姓名"
      >
        <span class="value-color">{{
          snapInfo.name === "unknown" ? "未知" : snapInfo.name
        }}</span>
      </el-form-item>
      <el-form-item
        label="性别"
      >
        <span class="value-color">{{ snapInfo.sexText }}</span>
      </el-form-item>
      <el-form-item
        label="是否微笑"
      >
        <span class="value-color">{{ snapInfo.smileText }}</span>
      </el-form-item>
      <el-form-item
        label="是否戴眼镜"
      >
        <span class="value-color">{{ snapInfo.glassText }}</span>
      </el-form-item>
      <el-form-item
        label="年龄段"
      >
        <span class="value-color">{{
          snapInfo.ageGroupText
        }}</span>
      </el-form-item>
      <el-form-item
        label="车牌号码"
      >
        <span class="value-color">{{
          snapInfo.plateNo === "unknown" ? "未知" : snapInfo.plateNo
        }}</span>
      </el-form-item>
      <el-form-item
        label="网格名称"
      >
        <span class="value-color">{{
          snapInfo.gridSubPath + snapInfo.gridName
        }}</span>
      </el-form-item>
      <el-form-item
        label="抓拍地点"
      >
        <span class="value-color">{{
          snapInfo.cameraName
        }}</span>
      </el-form-item>
      <el-form-item
        label="抓拍时间"
      >
        <span class="value-color">{{ snapInfo.shootTime }}</span>
      </el-form-item>
    </el-form>

    <div class="img">
      <el-image
        v-if="snapInfo.imageUrl"
        style="width:100px ; height:120px"
        :src="snapInfo.imageUrl"
        :preview-src-list="[snapInfo.imageUrl]"
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
    color: #fff;
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
