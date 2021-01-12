<template>
  <InfoBlock
    title="事项办理"
    height="286px"
  >
    <div class="general-affairs">
      <div class="Warning-top">
        <div
          class="Warning-top-center"
          @click="handleVisible"
        >
          <p>事件总数<span class="num">820642</span><span>件</span></p>
        </div>
        <div class="Warning-top-right">
          <div class="arrow" />
          完成率<span>96.12%</span>
        </div>
      </div>
      <div class="Warning-bottom">
        <div class="bottom-tab">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="['tab-list', { selected: selectedIndex === index }]"
            @click="changeTab(index)"
          >
            {{ item }}
          </div>
        </div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%;"
          >
            <el-table-column
              prop="date"
              :label="selectedIndex === 0 ? '事件类型' : '事件来源'"
              width="150"
            >
              <template slot-scope="scope">
                <div class="sort-box">
                  <span :class="'sort' + scope.$index" />
                  {{ scope.row.date }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="数量"
            />
            <el-table-column
              prop="address"
              label="占比"
            >
              <template slot-scope="scope">
                <span style="color: #00FFFF">
                  {{ scope.row.address }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <ColumnsAnimationModal
      :visible.sync="columnsAnimationModal.visible"
      :info="columnsAnimationModal.info"
      page-type="eventRank"
    />
  </InfoBlock>
</template>
<script>
import { typeMostList, originMostList } from './mock'
import ColumnsAnimationModal from './ColumnsAnimationModal'
export default {
  components: {
    ColumnsAnimationModal
  },
  data () {
    return {
      tabList: ['类型最多', '来源最多'],
      selectedIndex: 0,
      tableData: typeMostList,
      columnsAnimationModal: {
        visible: false,
        info: null
      }
    }
  },
  methods: {
    changeTab (index) {
      this.selectedIndex = index
      switch (index) {
        case 0:
          this.tableData = typeMostList
          break
        case 1:
          this.tableData = originMostList
          break
        default:
          break
      }
    },
    // 打开弹窗
    handleVisible () {
      // this.columnsAnimationModal.visible = true
      this.columnsAnimationModal.info = {
        title: '事件排名',
        position: 'right'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.risk-Warning .Warning-top-left {
    background: url("~@/assets/images/situation/组 85.png") center center /
      100% 100% no-repeat;
  }
  .general-affairs .Warning-top-left {
    background: url("~@/assets/images/situation/组 85(2).png") center center /
      100% 100% no-repeat;
  }
  .risk-Warning,
  .general-affairs {
    width: 400px;
    padding: 0 15px;
    margin-bottom: 20px;
    .Warning-top {
      width: 100%;
      height: 48px;
      display: flex;
      .Warning-top-left {
        width: 55px;
        height: 48px;
      }
      .Warning-top-center {
        cursor: pointer;
        width: 170px;
        height: 100%;
        margin-top: 12px;
        p {
          margin: 0;
          padding: 0;
          .num{
            font-size: 24px;
            font-weight: bold;
          }
          &:nth-child(1) {
            font-size: 18px;
            font-weight: 400;
            color: #a9daff;
            line-height: 18px;
          }
          &:nth-child(2) {
            margin-top: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #a9daff;
            line-height: 18px;
            span {
              font-size: 14px;
            }
          }
        }
      }
      .Warning-top-right {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #00ffff;
        line-height: 18px;
        .arrow {
          width: 15px;
          height: 14px;
          margin: 0 30px;
          background: url("~@/assets/images/situation/右箭头.png") center
            center / 100% 100% no-repeat;
        }
      }
    }
  }
  .risk-Warning .Warning-bottom {
    margin-top: 25px;
    display: flex;
    position: relative;
    .echarts {
      width: 400px;
      height: 130px;
    }
    .bottom-bgm {
      width: 55px;
      height: 92px;
      position: absolute;
      top: 20px;
      left: 160px;
      background: url("~@/assets/images/situation/组 88 拷贝.png") center
        center / 100% 100% no-repeat;
    }
  }
  .general-affairs .Warning-bottom {
    margin-top: 0px;
    .bottom-tab {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px solid #0f539b;
      cursor: pointer;
      .tab-list {
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        color: #a9daff;
        cursor: pointer;
      }
      .selected {
        background: url("~@/assets/images/situation/tab-item-active.png")
          center bottom no-repeat;
      }
    }
    .sort-box {
      position: relative;
    }
    .sort0,
    .sort1,
    .sort2 {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      margin: 0 5px 0 -10px;
    }
    .sort0 {
      background: url("~@/assets/images/situation/椭圆 864.png") center bottom /100% 100%
        no-repeat;
      color: #e82524;
    }
    .sort1 {
      background: url("~@/assets/images/situation/椭圆 864(1).png") center
        bottom  /100% 100% no-repeat;
      color: #f2c21c;
    }
    .sort2 {
      background: url("~@/assets/images/situation/椭圆 864(2).png") center
        bottom  /100% 100% no-repeat;
      color: #3b9afe;
    }
    /deep/.el-table,
    /deep/.el-table th,
    /deep/.el-table tr,
    /deep/.el-table td {
      background-color: transparent !important;
      border: none !important;
      color: #a9daff !important;
    }
    /deep/.el-table th {
      color: #3b9afe !important;
    }
    /deep/.el-table th,
    /deep/.el-table tr,
    /deep/.el-table td {
      text-align: center;
    }
  }
  .governance-power {
    width: 100%;
    // height: 170px;
    padding: 0 15px;
    margin-top: 10px;
    .governance-power-top {
      width: 100%;
      height: 80px;
      display: flex;
      .top-list {
        display: flex;
        height: 80px;
        align-items: center;
        .list-left {
          width: 80px;
          height: 80px;
          font-size: 14px;
          font-weight: bold;
          color: #a9daff;
          line-height: 18px;
          text-align: center;
          background: url("~@/assets/images/situation/椭圆 1073.png") center
            center / 100% 100% no-repeat;
        }
        .list-right {
          width: 63px;
          height: 7px;
          background: url("~@/assets/images/situation/组 129.png") center
            center no-repeat;
        }
      }
    }
    .governance-power-bottom {
      width: 100%;
      padding-left: 10px;
      display: flex;
      .bottom-list {
        //  text-align: PageCenter;
        width: 25%;
        p {
          margin: 6.5px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          font-weight: 400;
          color: #a9daff;
          line-height: 18px;
        }
        .power0 {
          background: url("~@/assets/images/situation/摄像头 (2).png")
            no-repeat;
        }
        .power1 {
          background: url("~@/assets/images/situation/Icon_地网总数.png")
            no-repeat;
        }
        .power2 {
          background: url("~@/assets/images/situation/形状 554.png") no-repeat;
        }
        .power3 {
          background: url("~@/assets/images/situation/形状 728.png") no-repeat;
        }
      }
    }
  }
</style>
