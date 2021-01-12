<template>
  <div class="page">
    <div class="container">
      <div class="form-search">
        <el-form
          :model="form"
          label-width="90px"
        >
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

          <el-form-item label="车牌号码">
            <el-input
              v-model="form.plateNo"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="车牌类型">
            <select-dict
              v-model="form.plateType"
              dict="plateType"
            />
          </el-form-item>

          <el-form-item label="车辆颜色">
            <select-dict
              v-model="form.vehicleColor"
              dict="carColor"
            />
          </el-form-item>

          <el-form-item label="车辆类型">
            <select-dict
              v-model="form.vehicleType"
              dict="carType"
            />
          </el-form-item>

          <el-button
            type="primary"
            size="medium"
            class="btn-submit"
            @click="search"
          >
            搜索
          </el-button>
        </el-form>
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
                style="width:50%;height:100px;"
                :src="item.imagePath"
                :preview-src-list="[item.imagePath]"
              />
              <div
                class="info"
                @click="showDetail(item)"
              >
                <p
                  class="name"
                  style="color:#fff;"
                >
                  {{ item.plateNo }}
                </p>
                <p class="address">
                  {{ item.crossingName }}
                </p>
                <p class="time">
                  {{ item.shootTime }}
                </p>
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
import dialogSnapshot from './dialogSnapshot'
import { getVehicleSnapRecords } from '@/api/riskPrevention/peopleManage/informationService'
export default {
  components: {
    dialogSnapshot
  },
  data () {
    return {
      form: {
        beginTime: '',
        endTime: '',
        plateNo: '',
        plateColor: '',
        plateType: '',
        vehicleColor: ''
      },
      pageNum: 1,
      pageSize: 12,
      total: 0,
      list: [],
      noData: false,
      isLoading: false,
      dialogDetail: {
        display: false,
        info: {}
      }
    }
  },
  created () {
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
    this.getList()
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
      this.isLoading = true
      const res = await getVehicleSnapRecords(
        this.pageNum,
        this.pageSize,
        this.form
      )
      this.isLoading = false
      this.list = res.data.list
      if (this.list.length === 0) {
        this.noData = '暂无数据'
      } else {
        this.noData = ''
      }
      this.total = res.data.total
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
      flex-grow: 1;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: baseline;
      .empty {
        color: #999;
        height: 100px;
        width: 100%;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item {
        width: 304px;
        height: 186px;
        box-sizing: border-box;
        padding: 16px;
        display: flex;
        margin-right: 5px;
        background-color: #283446;
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
/deep/ .el-icon-circle-close {
  color: #fff;
}
/deep/ .el-loading-mask{
  background-color: rgb(23,38,56);
}
</style>
