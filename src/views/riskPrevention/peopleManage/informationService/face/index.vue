<template>
  <div class="page">
    <div class="container">
      <div class="form-search">
        <el-scrollbar style="height:100%">
          <el-form
            :model="form"
            label-width="90px"
          >
            <el-form-item label="人员图片">
              <div class="form-avatar">
                <el-upload
                  ref="upload"
                  class="avatar-uploader"
                  name="file"
                  :http-request="httpRequest"
                  action=""
                  :auto-upload="true"
                  :show-file-list="false"
                  :on-change="handleChange"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="imgUrl"
                    :src="imgUrl"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  />
                </el-upload>
                <p>注：图片大小不能超过10MB,仅支持JPGE/PNG</p>
              </div>
            </el-form-item>

            <el-form-item label="姓名">
              <el-input
                v-model="form.name"
                placeholder="请输入"
              />
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input
                v-model="form.certificateNumber"
                placeholder="请输入"
              />
            </el-form-item>

            <el-form-item label="相似度">
              <el-input-number
                v-model="form.minSimilarity"
                placeholder="请输入"
                :precision="2"
                :step="0.1"
                :min="0"
                :max="1"
              />
            </el-form-item>

            <el-form-item label="所属网格">
              <cascaderGrid v-model="gridName" />
            </el-form-item>

            <el-form-item label="监控资源">
              <el-input
                v-model="form.cameraName"
                placeholder="请输入"
              />
            </el-form-item>

            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.beginTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择时间"
              />
            </el-form-item>

            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择时间"
              />
            </el-form-item>

            <!--            <el-form-item label="上衣类型">-->
            <!--              <el-select v-model="form.jacketType" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="长袖" value="1" />-->
            <!--                <el-option label="短袖" value="2" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="上衣颜色">-->
            <!--              <el-input v-model="form.jacketColor" />-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="下装类型">-->
            <!--              <el-select v-model="form.pantsType" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="短裤" value="1" />-->
            <!--                <el-option label="长裤" value="2" />-->
            <!--                <el-option label="裙子" value="3" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="下装颜色">-->
            <!--              <el-input v-model="form.pantsColor" />-->
            <!--            </el-form-item>-->

            <el-form-item label="是否戴眼镜">
              <el-select
                v-model="form.glass"
                clearable
              >
                <el-option
                  label="未知"
                  value="0"
                />
                <el-option
                  label="有"
                  value="1"
                />
                <el-option
                  label="无"
                  value="2"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="性别">
              <el-select
                v-model="form.sex"
                clearable
              >
                <el-option
                  label="未知"
                  value="0"
                />
                <el-option
                  label="男"
                  value="1"
                />
                <el-option
                  label="女"
                  value="2"
                />
              </el-select>
            </el-form-item>

            <!--            <el-form-item label="是否背包">-->
            <!--              <el-select v-model="form.bag" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="有" value="1" />-->
            <!--                <el-option label="无" value="2" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="是否拎东西">-->
            <!--              <el-select v-model="form.things" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="有" value="1" />-->
            <!--                <el-option label="无" value="2" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="是否戴帽子">-->
            <!--              <el-select v-model="form.hat" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="有" value="1" />-->
            <!--                <el-option label="无" value="2" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="是否戴口罩">-->
            <!--              <el-select v-model="form.mask" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="有" value="1" />-->
            <!--                <el-option label="无" value="2" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="发型">-->
            <!--              <el-select v-model="form.hairStyle" clearable>-->
            <!--                <el-option label="未知" value="0" />-->
            <!--                <el-option label="长发" value="1" />-->
            <!--                <el-option label="短发" value="2" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->

            <el-button
              type="primary"
              size="medium"
              class="btn-submit"
              @click="search"
            >
              搜索
            </el-button>
          </el-form>
        </el-scrollbar>
      </div>

      <div
        v-loading="isLoading"
        class="list-container"
      >
        <el-scrollbar style="width:100%;height:100%;">
          <div class="items">
            <div
              v-if="noData"
              class="empty"
            >
              暂无数据
            </div>
            <div
              v-for="item in list"
              v-else
              :key="item.id"
              class="item"
            >
              <el-image
                style="width:30%;height:100px;"
                :src="item.imageUrl"
                :preview-src-list="[item.bkgUrl]"
              />
              <div
                class="info"
                style="line-height: 1.8;width:70%;"
                @click="showDetail(item)"
              >
                <div
                  class="name"
                  style="color: #2188ed; "
                >
                  {{ item.cameraName }}
                </div>
                <div
                  class="address"
                  style="color: #fff;"
                >
                  {{ item.gridSubPath }}
                </div>
                <div
                  class="time"
                  style="color:#fff;"
                >
                  {{ item.shootTime }}
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>

        <Pagination
          :page-sizes="[12, 24, 36]"
          :page-size.sync="pageSize"
          :page-num.sync="pageNum"
          :total="total"
          @pagination-change="getList"
        />
        <dialogSnapshot
          :visible.sync="dialogDetail.display"
          :info="dialogDetail.info"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { network, webPlatform } from '@/config/gateway'
import dialogSnapshot from './dialogSnapshot'
import { getFaceCaptureList } from '@/api/riskPrevention/peopleManage/informationService'
export default {
  components: {
    dialogSnapshot
  },
  data () {
    return {
      url: network + '/' + webPlatform,
      uploadUrl: '/police/uploadImage',
      gridName: '',
      imgUrl: '',
      form: {
        gridCode: '',
        cameraName: '',
        beginTime: '',
        endTime: '',
        certificateNumber: '',
        jacketType: '',
        jacketColor: '',
        pantsType: '',
        pantsColor: '',
        glass: '',
        sex: '',
        bag: '',
        things: '',
        hat: '',
        mask: '',
        hairStyle: '',
        minSimilarity: 0.8
      },
      pageNum: 1,
      pageSize: 16,
      total: 0,
      noData: false,
      list: [],
      isLoading: false,
      dialogDetail: {
        display: false,
        info: {}
      },
      fd: new FormData()
    }
  },
  mounted () {
    this.getList()

    const date1 = new Date()
    const date2 = new Date(date1)

    // -30为30天前，+30可以获得30天后的日期
    date2.setDate(date1.getDate() - 30)

    // 30天前（月份判断是否小于10，小于10的前面+0）
    const agoDay = `${date2.getFullYear()}-${
            date2.getMonth() + 1 < 10
                ? `0${date2.getMonth() + 1}`
                : date2.getMonth() + 1
        }-${date2.getDate()}`
    const nowDay = `${date1.getFullYear()}-${
            date1.getMonth() + 1 < 10
                ? `0${date1.getMonth() + 1}`
                : date1.getMonth() + 1
        }-${date1.getDate()} ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`

    this.form.beginTime = agoDay + ' 00:00:00'
    this.form.endTime = nowDay
  },
  methods: {
    srcList (path) {
      const list = []
      if (path.indexOf('http') !== -1) {
        list.push(path)
        return list
      } else {
        list.push(this.$store.getters.uploadImg + path)
        return list
      }
    },
    async getList () {
      if (this.fd.get('file') && (!this.form.beginTime || !this.form.endTime)) {
        this.$message.warning('上传搜图图片后，必须选择开始时间和结束时间！')
        return
      }

      this.isLoading = true
      this.form.gridCode = this.gridName.length
        ? this.gridName[this.gridName.length - 1]
        : ''

      for (const key in this.form) {
        this.fd.delete(key)
        this.fd.append(key, this.form[key])
      }

      await getFaceCaptureList(this.pageNum, this.pageSize, this.fd).then(
        (res) => {
          this.isLoading = false
          this.list = res.data.list
          if (this.list.length === 0) {
            this.noData = true
          } else {
            this.noData = false
          }
          this.total = res.data.total
        }
      )
    },
    search () {
      this.pageNum = 1
      this.getList()
    },
    showDetail (info) {
      this.dialogDetail = {
        display: true,
        info
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }

      return isJPG && isLt10M
    },
    handleChange (file) {
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    httpRequest (param) {
      console.log(param)
      const fileObj = param.file
      this.fd.append('file', fileObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.container {
  background-color: #172638;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  text-align: center;
  .form-search {
    height: 100%;
    width: 300px;
    border: 1px solid #4a6d9b;
    box-sizing: border-box;
    padding: 24px 0;
    overflow-y: auto;
    flex-shrink: 0;
    &::v-deep {
      .el-form-item {
        .el-form-item__content,
        .el-form-item__content > .el-input,
        .el-form-item__content > .el-cascader,
        .el-form-item__content > .el-select {
          width: 185px;
        }
      }
    }

    .btn-submit {
      width: 250px;
    }

    /deep/ .el-form-item__label {
      color: #fff;
    }

    /deep/ .el-input__inner {
      background-color: #172638 !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
      color: #fff !important;
    }
  }

  .list-container {
    flex-grow: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    .items {
      height: 100%;
      flex-grow: 1;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: baseline;
      .empty {
        color: #999;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item {
        width: 304px;
        background-color: #283446;
        box-sizing: border-box;
        padding: 16px;
        display: flex;
        margin-right: 5px;
        margin-bottom: 5px;
        .info {
          position: relative;
          margin-left: 20px;
          text-align: left;
          p {
            padding: 0;
            margin: 10px 0 10px 0;
            font-size: 16px;
            line-height: 20px;
            &:nth-of-type(1) {
              font-size: 18px;
              color: #333333;
            }
            &:nth-of-type(2) {
              font-size: 16px;
              color: #2188ed;
            }
            &:nth-of-type(3) {
              font-size: 12px;
              color: #666666;
            }
          }

          .btn {
            position: absolute;
            bottom: 0;
          }
        }
      }
    }

    .pagination {
      flex-shrink: 0;
    }
  }
}

.form-avatar {
  // width: 150px;
  font-size: 12px;
  color: #999999;
  text-align: center;
  margin-left: 8%;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/deep/ .el-scrollbar__wrap {
  overflow: auto !important;
}
/deep/ .el-icon-circle-close {
  color: #fff;
}

/deep/ .el-image-viewer__close {
  top: 100px;
  right: 100px;
}

/deep/ .el-input-number__decrease {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

/deep/ .el-input-number__increase {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}
/deep/ .el-loading-mask{
  background-color: rgb(23,38,56);
}
</style>
