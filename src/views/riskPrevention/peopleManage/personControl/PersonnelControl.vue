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
      <el-scrollbar style="height: 88%;overflow-x:hidden;">
        <div class="cards">
          <div
            v-for="(item,index) in tableData"
            :key="index"
            class="card"
          >
            <div>
              <font>布控名称：</font>{{ item.name }}
            </div>
            <div>
              <font>布控说明：</font>{{ item.remark }}
            </div>
            <div>
              <font>布控状态：</font>{{ item.taskStatusName!=='未调度'?item.taskStatusName:'-' }}
            </div>
            <div />
            <div>
              <span>
                <font>布控时间：</font>{{ item.beginTime }}
              </span>
              <span @click="item.alarmRecords.length?showPerStaInfo(item):()=>{}">{{ item.alarmRecords.length }}</span>
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
      <personStack
        :visible.sync="perStaInfo.display"
        :info="perStaInfo.info"
      />
      <DialogInfo
        :visible.sync="dialogVisible"
      />
    </div>
  </div>
</template>

<script>
import personStack from './personStack'
import DialogInfo from './DialogInfo'
import { getPersonControlsWithPage, queryAlarmRecord } from '@/api/personControl'
import { parseTime } from '@/utils/dateTime'
export default {
  components: {
    personStack,
    DialogInfo
  },
  data () {
    return {
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
      isEmpty: false,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      perStaInfo: {
        display: false,
        info: {}
      },
      dialogVisible: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.isEmpty = false
      const params = {
        // ...this.searchForm,
      }
      this.isLoading = true
      const { status, data } = await getPersonControlsWithPage(
        this.pageNum,
        this.pageSize,
        params
      )
      this.isLoading = false
      if (status === 200) {
        const alarmRecords = await this.handleQueryAlarmRecord()
        this.total = data.total
        if (data.list.length === 0) {
          return
        }
        this.tableData = data.list.map((item) => {
          // if (item.taskStatusName !== '未调度') {
          item.alarmRecords = []
          const selectedArr = alarmRecords.filter((alarmRecord) => {
            if (item.taskId === alarmRecord.taskId) {
              return alarmRecord
            }
          })
          item.alarmRecords = selectedArr
          return item
          // }
        })
        this.tableData = this.tableData.filter(
          (item) => typeof item !== 'undefined'
        )
        if (this.tableData.length <= 0) this.isEmpty = true
      }
    },
    async handleQueryAlarmRecord () {
      const { status, data } = await queryAlarmRecord(1, 1000, {
        beginTime: this.searchForm.dateTime[0],
        endTime: this.searchForm.dateTime[1]
      })
      if (status === 200) {
        return data.list
      }
    },
    showPerStaInfo (item) {
      this.perStaInfo.info = item
      this.perStaInfo.display = true
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
    height: 80%;
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
