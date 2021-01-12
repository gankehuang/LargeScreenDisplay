<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
    title="人脸布控"
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
      style="height:600px;overflow:hidden;"
      label-width="120px"
    >
      <el-scrollbar style="height: 95%;">
        <div class="title">
          基本信息
        </div>
        <div class="form-container">
          <div class="form1">
            <el-form-item
              label="姓名"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="请输入"
              />
            </el-form-item>

            <el-form-item
              label="性别"
              prop="gender"
            >
              <el-radio
                v-model="form.gender"
                label="0"
              >
                未知
              </el-radio>
              <el-radio
                v-model="form.gender"
                label="1"
              >
                男
              </el-radio>
              <el-radio
                v-model="form.gender"
                label="2"
              >
                女
              </el-radio>
            </el-form-item>

            <el-form-item
              label="生日"
              prop="bornTime"
            >
              <el-date-picker
                v-model="form.bornTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>

            <el-form-item
              label="证件类型"
              prop="certificateType"
            >
              <el-select
                v-model="form.certificateType"
                clearable
              >
                <el-option
                  label="军官证"
                  value="officerID"
                />
                <el-option
                  label="身份证"
                  value="ID"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="证件号码"
              prop="certificateNumber"
            >
              <el-input
                v-model="form.certificateNumber"
                placeholder="请输入"
              />
            </el-form-item>

            <el-form-item
              label="布控人员类型"
              prop="bkpersontype"
            >
              <el-select
                v-model="form.bkpersontype"
                placeholder="请选择"
              >
                <el-option
                  label="信访人员"
                  :value="1"
                />
                <el-option
                  label="精神障碍人员"
                  :value="2"
                />
                <el-option
                  label="刑满释放人员"
                  :value="3"
                />
                <el-option
                  label="矫正人员"
                  :value="4"
                />
                <el-option
                  label="邪教人员"
                  :value="5"
                />
                <el-option
                  label="吸毒人员"
                  :value="6"
                />
                <el-option
                  label="艾滋病人员"
                  :value="7"
                />
                <el-option
                  label="重点青少年"
                  :value="8"
                />
                <el-option
                  label="其他"
                  :value="9"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="地址"
              prop="address"
            >
              <el-input
                v-model="form.address"
                placeholder="请输入"
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

        <div class="title">
          布控信息
        </div>
        <div class="form-container">
          <div class="form2">
            <el-form-item
              label="布控名称"
              prop="bkname"
            >
              <el-input
                v-model="form.bkname"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="监控点名称"
              prop="cameraindexcodes"
            >
              <el-select
                v-model="form.cameraindexcodes"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in cameraList"
                  :key="index"
                  :label="item.name"
                  :value="item.cameraIndexCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="布控时间段"
              prop="startperiod"
            >
              <el-date-picker
                v-model="form.periodDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item
              label="报警接受手机"
              prop="phoneno"
            >
              <el-input
                v-model="form.phoneno"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="报警阀值"
              prop="thresholdmin"
            >
              <el-input-number
                v-model="form.thresholdmin"
                :precision="2"
                :step="0.1"
                :max="1"
              />
            </el-form-item>
            <el-form-item
              label="报警时段"
              prop="startperiod"
            >
              <el-time-picker
                v-model="form.alarmTime"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="hh:mm"
                placeholder="选择时间范围"
              />
            </el-form-item>

            <el-form-item label="布控说明">
              <el-input
                v-model="form.remark"
                type="textarea"
              />
            </el-form-item>
          </div>
        </div>
      </el-scrollbar>

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
import { insertObject } from '@/utils/tool'
// import { saveFaceControl, editFaceControl } from '@/api/staffAdmin'
import { queryCameraList } from '@/api/composite/composite'
export default {
  props: {
    visible: Boolean,
    // info: Object,
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
        name: '',
        gender: '',
        bornTime: '',
        certificateType: '',
        certificateNumber: '',
        bkpersontype: '',
        address: '',
        faceUrl: '',
        bkname: '',
        cameraindexcodes: '',
        startperiod: '',
        endperiod: '',
        begintime: '',
        endtime: '',
        phoneno: '',
        thresholdmin: '',
        remark: '',
        periodDate: '',
        alarmTime: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        bornTime: [
          { required: true, message: '请选择出生年月日', trigger: 'blur' }
        ],
        certificateType: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        certificateNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        bkpersontype: [{ required: true, message: '请选择布控类型', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        bkname: [
          { required: true, message: '请输入布控名称', trigger: 'blur' }
        ],
        cameraIndexCodes: [
          { required: true, message: '请选择布控编码', trigger: 'blur' }
        ],
        periodDate: [
          { required: true, message: '请选择布控时间段', trigger: 'blur' }
        ],
        alarmTime: [
          { required: true, message: '请选择报警时间段', trigger: 'blur' }
        ]
      },
      authGroupList: [],
      network1: network,
      cameraList: []
    }
  },
  methods: {
    dialogOpen () {
      this.queryCameraList()
      if (Object.keys(this.info).length) {
        this.form = insertObject(this.form, this.info)
        this.form.alarmTime = [this.form.startperiod, this.form.endperiod]
        this.form.periodDate = [this.form.begintime, this.form.endtime]
      } else {
        this.form = this.$options.data().form
      }
    },
    dialogClose () {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    queryCameraList () {
      queryCameraList(1, 10).then(res => {
        this.cameraList = res.data.list
      })
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        if (!this.form.faceUrl) {
          this.$message.warning('必须上传人脸图片')
          return false
        }
        // const type = Object.keys(this.info).length ? 1 : 0 // 1-修改 0-新增
        this.form.begintime = this.form.periodDate[0]
        this.form.endtime = this.form.periodDate[1]
        this.form.startperiod = this.form.alarmTime[0]
        this.form.endperiod = this.form.alarmTime[1]
        // if (type === 0) {
        //     await saveFaceControl(this.form);
        // } else {
        //     await editFaceControl(this.form);
        // }
        this.$message.success('成功添加人员布控信息!')
        // this.$message.success(`${type ? "修改" : "新增"}成功`);
        this.$emit('submit-success')
        this.dialogClose()
      })
    },
    handleAvatarSuccess (res) {
      console.log(res)
      if (res.status === 200) {
        this.form.faceUrl = res.data
      } else {
        this.$message.error(res.data)
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

/deep/ .el-dialog{
  background: url('~@/assets/images/common/modal-bg.png') no-repeat
      center center;
  background-size: 100% 100%;
  padding: 0 20px 20px 20px;
}
/deep/ .el-dialog--center .el-dialog__body{
  height: 629px;
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
  border-bottom: #dcdcdc solid 1px;
  display: flex;
  flex-wrap: wrap;
  .form1::v-deep {
    .el-form-item {
      .el-form-item__content > .el-input,
      .el-form-item__content > .el-select {
        width: 380px;
      }
      .el-input-group__prepend > .el-select {
        width: 105px;
        .el-input__inner {
          padding-left: 10px;
        }
      }
    }
  }

  .form2::v-deep {
    .el-form-item {
      .el-form-item__content,
      .el-form-item__content > .el-input,
      .el-form-item__content > .el-select {
        width: 380px;
      }
      .el-input-group__prepend > .el-select {
        width: 100px;
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
