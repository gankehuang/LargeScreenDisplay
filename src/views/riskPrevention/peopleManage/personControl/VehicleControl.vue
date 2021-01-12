<template>
  <div class="page-box content">
    <div
      v-loading="isLoading"
      class="staffAdmin-face-contianer"
    >
      <div
        class="controll-button"
        @click="dialogVisible = true"
      >
        一键布控
      </div>
      <el-scrollbar style="height: 95%;overflow-x:hidden">
        <div class="cards">
          <div
            v-for="(item,index) in tableData"
            :key="index"
            class="card"
          >
            <div>
              <font>布控名称：</font>{{ item.taskName }}
            </div>
            <div>
              <font>车牌号码：</font>{{ item.plateNo }}
            </div>
            <div>
              <font>布控说明：</font>{{ item.remark }}
            </div>
            <div />
            <div>
              <span>
                <font>布控时间：</font>{{ item.beginTime }}
              </span>
              <span @click="item.times?showVehStaInfo(item):$message.warning('暂无数据')">{{ item.times }}</span>
            </div>
          </div>
          <div
            v-if="!tableData.length"
            class="empty"
          >
            暂无数据
          </div>
        </div>
      </el-scrollbar>
      <Pagination
        :page-size.sync="pageSize"
        :page-num.sync="pageNum"
        :total.sync="total"
        style="width:98%;margin:0 auto"
        @pagination-change="getList"
      />
      <DialogInfo
        :visible.sync="dialogVisible"
      />
      <vechicleTrack
        :visible.sync="vehStaInfo.display"
        :info="vehStaInfo.info"
      />
    </div>
  </div>
</template>

<script>
import {
  queryDeployResultWithPage,
  getVehicleSnapRecords
} from '@/api/personControl'
import vechicleTrack from './vechicleTrack'
import DialogInfo from './DialogInfoVechicle'
import { parseTime } from '@/utils/dateTime'
export default {
  components: {
    vechicleTrack,
    DialogInfo
  },
  data () {
    return {
      form: {},
      searchForm: {
        name: '',
        dateTime: [
          parseTime(
            new Date(new Date().getTime() - 7776000000),
            '{y}-{m}-{d} {h}:{i}:{s}'
          ),
          parseTime(new Date() + 604800000, '{y}-{m}-{d} {h}:{i}:{s}')
        ]
      },
      isLoading: false,
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      vehStaInfo: {
        display: false,
        info: {}
      },
      dialogVisible: false
      // asyncTimes: 0,
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
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      // this.loading = true
      const { status, data } = await queryDeployResultWithPage(
        this.pageNum,
        this.pageSize
      )
      if (status === 200) {
        if (data.list || data.list.length === 0) {
          return
        }
        this.tableData = data.list
        const promises = await data.list.map((item) => {
          return () => {
            getVehicleSnapRecords(1, 500, {
              plateNo: item.plateNo,
              ...this.form
            }).then(({ data }) => {
              if (this.tableData.length === 0) {
                return
              }
              for (let index = 0; index < this.tableData.length; index++) {
                if (item.plateNo === this.tableData[index].plateNo) {
                  // console.log(data.list)
                  // console.log('------------------------')
                  this.tableData.splice(index, 1, {
                    times: data.list.length,
                    allStracks: data.list,
                    ...this.tableData[index]
                  })
                  // console.log(this.tableData[index])
                  this.tableData[index].trackList = this.handleGroup(data.list)
                  // console.log(this.tableData[index].trackList)
                  // this.asyncTimes++
                  // if (this.asyncTimes === this.tableData.length) {
                  //   this.loading = false
                  // }
                }
              }
            })
          }
        })
        for (const promiseItem of promises) {
          await promiseItem()
        }
      }
    },
    showVehStaInfo (item) {
      this.vehStaInfo.info = item
      this.vehStaInfo.display = true
    },
    // 归集数据
    handleGroup (dataArr) {
      const trackList = []
      // console.log(dataArr)
      let flag = dataArr[0].shootTime.slice(0, 10)
      let obj = { date: flag, trackArr: [] }
      dataArr.forEach((item, index) => {
        if (flag === item.shootTime.slice(0, 10)) {
          obj.trackArr.push({
            time: item.shootTime.slice(11, item.shootTime.length),
            index: index + 1,
            ...item
          })
          if (index === dataArr.length - 1) {
            trackList.push(obj)
          }
        } else {
          trackList.push(obj)
          flag = item.shootTime.slice(0, 10)
          obj = { date: flag, trackArr: [] }
          obj.trackArr.push({
            time: item.shootTime.slice(11, item.shootTime.length),
            index: index + 1,
            ...item
          })
        }
      })
      return trackList
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  position: absolute;
  width: 100%;
  height: 80%;
  padding: 0 50px;
  top: 19%;
  color: #ffffff;
}
/deep/ .el-loading-mask{
  background: #26263f;
}
.staffAdmin-face-contianer {
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  width: 100%;
  height: 100%;
  .search-form {
    text-align: right;
  }
  .cards {
    margin: 10px auto 0;
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
  }
  .card {
    width: 19%;
    padding: 30px 20px;
    margin: 12px 0;
    background-color: #283446;
    overflow: hidden;
    font-size: 18px;
    &:not(:nth-child(5n)) {
      margin-right: calc(5% / 4);
    }
    div:nth-of-type(1) {
      color: #2188ed;
      line-height: 36px;
      span {
        color: #f8b551;
      }
      font {
        color: #fff;
      }
    }
    div:nth-of-type(2) {
      color: #2188ed;
      line-height: 30px;
      font {
        color: #fff;
      }
    }
    div:nth-of-type(3),
    div:nth-of-type(4),
    div:nth-of-type(5) {
      color: #2188ed;
      line-height: 30px;
      font {
        color: #fff;
      }
    }
    div:nth-of-type(5) {
      color: #2188ed;
      span {
        display: block;
      }
      font {
        color: #fff;
      }
      span:nth-of-type(1) {
        float: left;
        text-align: left;
        font-size: 16px;
        line-height: 30px;
        color: #2188ed;
      }
      span:nth-of-type(2) {
        float: right;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50% 50%;
        color: #fff;
        cursor: pointer;
        background-color: #2188ed;
        // &::before {
        //   content: "报警记录";
        //   display: inline-block;
        //   width: 150px;
        //   position: relative;
        //   left: -260px;
        //   color: #fff;
        // }
      }
    }
  }
  .empty {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
  }
  .controll-button {
    position: absolute;
    right: 4%;
    top: -9%;
    line-height: 36px;
    font-size: 14px;
    width: 90px;
    background: #0d779a;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
}
</style>
