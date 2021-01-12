<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
    title="车辆布控"
    width="1000px"
    :visible="visible"
    @close="dialogClose"
    @open="dialogOpen"
  >
    <el-form
      ref="form"
      class="form-page"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <div class="title">
        布控信息
      </div>
      <div class="form-container">
        <div class="form1">
          <el-form-item
            label="布控车牌"
            prop="carNum"
          >
            <el-input
              v-model="form.carNum"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item
            label="布控车辆类型"
            required
          >
            <el-select
              v-model="form.type"
              clearable
            >
              <el-option
                label="涉案车辆"
                value="涉案车辆"
              />
              <el-option
                label="肇事车辆"
                value="肇事车辆"
              />
              <el-option
                label="逃逸车辆"
                value="逃逸车辆"
              />
              <el-option
                label="套牌车辆"
                value="套牌车辆"
              />
              <el-option
                label="其它"
                value="其它"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="布控说明">
            <el-input
              v-model="form.remarks"
              :rows="6"
              type="textarea"
              :maxlength="150"
              show-word-limit
              resize
            />
          </el-form-item>
        </div>

        <div class="form-avatar">
          <el-upload
            class="avatar-uploader"
            name="file"
            :action="url + uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.photoUrl"
              :src="form.photoUrl"
              class="avatar"
            >
            <img
              v-else
              src="@/assets/images/personControl/avatar-placeholer.png"
              class="avatar"
            >
          </el-upload>

          <p>注：图片大小不能超过10MB,仅支持JPEG</p>
        </div>
      </div>

      <div class="form-controls">
        <el-button
          size="small"
          type="primary"
          @click="submit"
        >
          提交
        </el-button>
        <el-button
          size="small"
          plain
          @click="dialogClose"
        >
          取消
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { network } from '@/config/gateway'
import { carReg } from '@/utils/regs.js'
import { insertObject } from '@/utils/tool'
export default {
  props: {
    visible: Boolean,
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      url: network,
      uploadUrl: '/video/face/upPhoto',
      form: {
        id: '',
        carNum: '',
        url: '',
        type: '',
        remarks: ''
      },
      rules: {
        carNum: [
          { required: true, message: '请输入车牌号', trigger: 'blur' },
          { type: 'string', pattern: carReg, message: '车牌格式错误', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择布控车辆类型', trigger: 'blur' }]
      }
    }
  },
  methods: {
    dialogOpen () {
      if (Object.keys(this.info).length) {
        this.form = insertObject(this.form, this.info)
      } else {
        this.form = this.$options.data().form
      }
    },
    dialogClose () {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        // await saveVehicle(this.form)
        this.$message.success('成功添加车辆布控信息!')
        // this.$message.success(`${Object.keys(this.info).length ? "修改" : "新增"}成功`)
        this.$emit('submit-success')
        this.dialogClose()
      })
    },
    handleAvatarSuccess (res) {
      if (res.resp_code === 1) {
        this.form.url = res.resp_msg
      } else {
        this.$message.error(res.resp_msg)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }

      return isJPG && isLt10M
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input-group__prepend {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  background-color: #172638 !important;
}

/deep/ .el-scrollbar__wrap {
  overflow: auto;
}

/deep/ .el-date-editor .el-range-input{
  background: #172638 !important;
}

/deep/ .el-dialog__header{
    padding-top: 15px;
}

/deep/ .el-dialog--center .el-dialog__body{
  height: 500px;
}

/deep/ .el-dialog{
  background: url('~@/assets/images/common/modal-bg.png') no-repeat
      center center;
  background-size: 100% 100%;
  padding: 0 20px 20px 20px;
}
.form-page {
    height: calc(100% - 90px);
    overflow: auto;
    background-color: #fff;
    .title {
        font-size: 14px;
        color: #666666;
        padding-left: 8px;
        border-left: #3a85ff solid 2px;
        margin-left: 15px;
    }
    .form-controls {
        text-align: right;
        padding-right: 5%;
    }
}

.form-container {
    margin: 15px 5% 20px 5%;
    display: flex;
    flex-wrap: wrap;
    .form1::v-deep {
        .el-form-item {
            .el-form-item__content > .el-input,
            .el-form-item__content > .el-select {
                width: 340px;
            }
            .el-input-group__prepend > .el-select {
                width: 105px;
                .el-input__inner {
                    padding-left: 10px;
                }
            }
        }
    }

    .form-avatar {
        width: 150px;
        font-size: 12px;
        color: #999999;
        text-align: center;
        margin-left: 3%;
        .avatar-uploader {
            &::v-deep .el-upload {
                border: 1px dashed #d9d9d9;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            &::v-deep .el-upload:hover {
                border-color: #409eff;
            }

            .avatar {
                width: 140px;
                height: 184px;
                display: block;
            }
        }
    }
}
</style>
