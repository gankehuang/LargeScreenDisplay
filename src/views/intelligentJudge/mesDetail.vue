<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    width="1439px"
    :visible="visible"
    @open="dialogOpen"
    @close="dialogClose"
  >
    <div class="z-top">
      <div class="z-title">
        {{ title }}
        <div>
          {{ total }}
          <span>件</span>
        </div>
      </div>
      <div class="close">
        <img
          src="@/assets/images/intelligentJudge/close.png"
          alt=""
        >
      </div>
    </div>
    <div class="z-search">
      <el-input
        v-model="searchForm1.eventName"
        placeholder="输入关键字搜索"
        style="color: #226C6C"
      />
      <img
        src="@/assets/images/intelligentJudge/search.png"
        alt=""
        @click="search"
      >
    </div>
    <div class="z-center">
      <div class="z-list">
        <div class="z-form">
          <el-table
            v-loading="oneLoading"
            :data="tableData"
            height="316px"
            :row-style="rowClass"
            @row-click="handdle"
          >
            <template slot="empty">
              <p>{{ oneEmptyText }}</p>
            </template>
            <el-table-column width="30">
              <template>
                <img
                  src="@/assets/images/intelligentJudge/event.png"
                  style="width: 16px;height: 15px;display:block;"
                  alt=""
                >
              </template>
            </el-table-column>
            <el-table-column
              label="事件名称"
              width="160"
              prop="eventName"
            />
            <el-table-column
              label="事件类型"
              prop="subTypeText"
            />
            <el-table-column
              label="事件来源"
              width="160"
              prop="sourceText"
            />
            <el-table-column label="上报平台">
              <template slot-scope="scope">
                {{ scope.row.reportPlatform || "暂无" }}
              </template>
            </el-table-column>
            <el-table-column
              label="发生时间"
              width="160"
              prop="happenedTime"
            />
            <el-table-column
              label="事件状态"
              prop="statusText"
            />
          </el-table>
          <div class="pagination1">
            <el-pagination
              :current-page.sync="pageNum"
              :page-size="pageSize"
              layout="total, prev, pager, next,jumper"
              :total="total"
              @current-change="getList"
            />
          </div>
        </div>
        <div
          v-if="info.eventName"
          class="z-mes"
        >
          <el-form>
            <div class="form-container">
              <el-form-item label="事件名称">
                {{ info.eventName }}
              </el-form-item>
              <el-form-item label="事件类型">
                {{
                  info.subTypeText
                }}
              </el-form-item>
              <el-form-item label="事件来源">
                {{
                  info.sourceText
                }}
              </el-form-item>
              <el-form-item label="上报平台">
                {{
                  info.reportPlatform || "暂无"
                }}
              </el-form-item>
              <el-form-item label="发生时间">
                {{
                  info.happenedTime
                }}
              </el-form-item>
            </div>
            <div class="form-container1">
              <el-form-item label="发生地点">
                {{
                  info.location || "暂无"
                }}
              </el-form-item>
              <el-form-item label="前端设备名称">
                {{
                  info.deviceName
                }}
              </el-form-item>
              <el-form-item label="事件等级">
                {{
                  info.emergencyLevelText
                }}
              </el-form-item>
              <el-form-item label="事件状态">
                {{
                  info.statusText
                }}
              </el-form-item>
            </div>
          </el-form>
          <div class="z-buttons">
            <div
              class="z-button"
              @click="deal('report')"
            >
              上报
            </div>
            <div
              class="z-button"
              @click="deal('order')"
            >
              指派
            </div>
            <div
              class="z-button"
              @click="urge"
            >
              催单
            </div>
            <div
              class="z-button"
              @click="deal('deal')"
            >
              处置
            </div>
            <div
              class="z-button"
              @click="ddDeal"
            >
              调度
            </div>
            <div
              class="z-button"
              @click="deal('detail')"
            >
              详情
            </div>
          </div>
        </div>
        <div
          v-else
          class="z-mes"
        >
          <div class="none">
            暂无数据
          </div>
        </div>
      </div>
      <div class="z-img">
        <div class="z-img">
          <div class="z-video">
            <el-image
              v-if="info.snapImageUrl"
              style="width: 492px;height: 30.9vh;"
              :src="info.snapImageUrl"
              :preview-src-list="[info.snapImageUrl]"
              @click="isShowHkVideo = false"
            />
            <img
              v-else
              src="@/assets/images/intelligentJudge/noPhoto.png"
              alt=""
            >
          </div>
          <div class="img-mes">
            <span>{{ info.eventName }}</span>
            <span>{{ info.happenedTime }}</span>
          </div>
        </div>
        <div class="z-video">
          <VideoPlay
            v-if="info.deviceSerialNo && isShowHkVideo"
            :width="492"
            :height="298"
            :camera-index-code="info.deviceSerialNo"
          />
          <img
            v-else
            src="@/assets/images/intelligentJudge/noVideo.png"
            alt=""
          >
        </div>
        <div class="img-mes">
          <span>{{ info.eventName }}</span>
          <span>{{ info.happenedTime }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { letUrgeEventById, getZnypList } from '@/api/intelligentJudge.js'
import VideoPlay from '@/components/VideoPlay'

export default {
  components: {
    VideoPlay
  },
  props: {
    visible: Boolean,
    type: {
      // 类型:1-河湖监管 2-市容市貌整治 3-危险火源分析 4-积水分析 5-人员异常行为分析 6-车辆违停分析 7-街道路面经验行为分析 8-人员聚集分析
      type: Number,
      required: true,
      default: 1
    }
  },
  data () {
    return {
      total: 0,
      title: '小区异常分析',
      pageSize: 9,
      pageNum: 1,
      searchForm: {
        aiType: []
      },
      searchForm1: {
        baseType: '',
        emergencyLevel: '',
        eventName: '',
        gridCode: '',
        source: '',
        status: '',
        subType: '',
        type: ''
      },
      oneLoading: false,
      oneEmptyText: '',
      info: {},
      tableData: [],
      isShowHkVideo: true
    }
  },
  mounted () {
    document.addEventListener('click', this.handleCloseImg)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleCloseImg)
  },
  methods: {
    handleCloseImg (e) {
      if (e.target.className === 'el-icon-circle-close') {
        this.isShowHkVideo = true
      }
    },
    dialogOpen () {
      this.pageNum = 1
      switch (this.type) {
        case 1:
          this.title = '社区异常分析'
          break
        case 2:
          this.title = '河湖监管'
          break
        case 3:
          this.title = '市容市貌整治'
          break
        case 4:
          this.title = '危险火源分析'
          break
        case 5:
          this.title = '积水分析'
          break
        case 6:
          this.title = '高危行为分析'
          break
        case 7:
          this.title = '车辆违停分析'
          break
        case 8:
          this.title = '违规经营分析'
          break
        case 9:
          this.title = '人员聚集分析'
          break
        default:
          break
      }
      this.searchForm.aiType = this.type
      this.getList()
    },
    getList () {
      this.oneLoading = true
      const params = {
        ...this.searchForm1
      }
      getZnypList(this.pageNum, this.pageSize, this.searchForm, params).then(
        res => {
          this.oneLoading = false
          if (res.status === 200) {
            this.tableData = res.data.list
            if (this.tableData.length === 0) {
              this.oneEmptyText = '暂无数据'
            } else {
              this.oneEmptyText = ''
            }
            this.total = res.data.total
            if (res.data.list.length > 0) {
              this.info = res.data.list[0]
            }
          }
        }
      )
    },
    dialogClose () {
      this.$emit('update:visible', false)
      this.info = {}
      // this.info = this.$options.data().info
      this.searchForm = this.$options.data().searchForm
      this.searchForm1.eventName = ''
    },
    handdle (row) {
      this.info = {}
      this.$nextTick(() => {
        this.info = row
      })
    },
    rowClass ({ row }) {
      if (this.info.id === row.id) {
        return { 'background-color': '#0043FF!important' }
        // return { "border": "solid 1px #3dffef","background-color": "rgba(185, 221, 249, 0.75)" }
      }
    },
    search () {
      this.pageNum = 1
      this.info = this.$options.data().info
      this.getList()
    },
    async urge () {
      await letUrgeEventById({ eventId: this.info.id }).then(res => {
        if (res.status === 200) {
          this.$message.success('催单成功!')
          this.getList()
        }
      })
    },
    ddDeal () {
      this.$router.push({
        path: '/zhddAdmin/coordinatedCommand',
        query: {
          longitude: this.info.longitude,
          latitude: this.info.latitude
        }
      })
    },
    deal (modal) {
      this.$emit('getModal', modal, this.info.id)
      this.dialogClose()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog {
  background: #0a2d5a;
  border: 1px solid #17cbf8;
  border-radius: 20px;
  height: 83vh;
  overflow: hidden;
  position: relative;
  margin-top: 11vh !important;
  .el-dialog__body {
    background: #0a2d5a;
  }
}
/deep/.el-dialog__headerbtn {
  width: 52px;
  height: 52px;
  right: 80px;
  top: 13px;
  z-index: 20;
  border-radius: 50%;
  i {
    display: none;
  }
}
.z-top {
  display: flex;
  justify-content: space-between;
  position: relative;
  background: url("~@/assets/images/intelligentJudge/titleBg.png") no-repeat left top;
  background-size: 229px 13.5vh;
  height: 13.5vh;
  top: -60px;
  .z-title {
    font-size: 30px;
    font-weight: bold;
    line-height: 106px;
    margin-left: 44px;
    color: #00f9fa;

    div {
      margin-left: 20px;
      display: inline-block;
      color: #fa8d00;
      span {
        font-size: 18px;
        color: #00f9fa;
      }
    }
  }
  .close {
    position: relative;
    right: -20px;
    top: 27px;
    img {
      width: 135px;
      height: 52px;
    }
  }
}
.z-center {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -90px;
  .z-list {
    width: 865px;
    .z-form {
      height: 32.6vh;
      border: 1px solid #68c8ef;
      border-radius: 10px;
      margin-bottom: 11px;
      background-color: transparent;
      overflow: hidden;
    }
    .z-mes {
      height: 35.6vh;
      background: url("~@/assets/images/intelligentJudge/detailBg.png") no-repeat center;
      background-size: 100% 100%;
      padding: 20px 0 0 30px;
      .none {
        margin-top: 30px;
        line-height: 80px;
        font-size: 30px;
        color: #fff;
        text-align: center;
      }
      .el-form {
        display: flex;
        .form-container {
          width: 35%;
        }
        .form-container1 {
          width: 65%;
        }
      }
      .z-buttons {
        width: 600px;
        display: flex;
        margin-left: 200px;
        .z-button {
          width: 80px;
          height: 80px;
          line-height: 80px;
          font-size: 16px;
          color: #00f9fa;
          margin-right: 20px;
          background: url("~@/assets/images/intelligentJudge/button.png") no-repeat center;
          background-size: 100% 100%;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
  .z-img {
    width: 501px;
    .z-video {
      height: 31.6vh;
      background: url("~@/assets/images/intelligentJudge/border.png") no-repeat center;
      background-size: 100% 100%;
      padding: 4px 5px;
      img {
        display: block;
        width: 492px;
        height: 30.9vh;
      }
    }
    .img-mes {
      line-height: 36px;
      font-size: 12px;
      color: #00f9fa;
      text-align: center;
      span {
        margin: 0 20px;
      }
    }
  }
}
/deep/.el-table thead {
  color: #00f9fa;
  font-size: 16px;
  border: none;
  font-weight: bold;
  // background: #14182C;
  border-radius: 8px;
}
/deep/.el-table {
  background-color: transparent;
  color: #00f9fa;
  height: 29vh !important;
}
/deep/.el-table td {
  border-bottom: 1px dashed rgba(104, 200, 239, 0.3);
}
/deep/.el-table th,
/deep/.el-table tr,
/deep/.el-table td {
  background-color: transparent !important;
}
.table-wrapper /deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.table-wrapper /deep/ .el-table tr {
  background-color: transparent !important;
}
.table-wrapper /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}
/deep/.el-table ::-webkit-scrollbar-thumb {
  background: #324a7d;
}
/deep/.el-form-item__content {
  color: #a1e3ff;
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
.pagination1 {
  text-align: right;
  padding-right: 20px;
}
/deep/.btn-prev {
  background-color: transparent !important;
}
/deep/.btn-next {
  background-color: transparent !important;
}
/deep/.el-pager li {
  background-color: transparent !important;
  color: #fff;
  margin: 0 5px;
}
/deep/.el-pager li.active {
  background: #023690 !important;
}
/deep/.el-input__inner {
  background: #12508a;
}
/deep/.el-table__row {
  cursor: pointer;
}
.z-search {
  position: absolute;
  top: 5.2vh;
  left: 636px;
  width: 260px;
  line-height: 30px;
  display: flex;
  background: #15192c;
  border-radius: 4px;
  /deep/input::-webkit-input-placeholder {
    color: #226c6c;
    -webkit-text-fill-color: #226c6c;
  }
  /deep/.el-input {
    width: 200px;
    border: none;
    flex: 1;
    .el-input__inner {
      background-color: transparent;
      border: none;
      color: #226c6c;
    }
  }
  img {
    width: 18px;
    height: 18px;
    margin: 8px 10px 0;
  }
}
</style>
<style lang="scss">
.el-icon {
  color: #fff;
}
</style>
