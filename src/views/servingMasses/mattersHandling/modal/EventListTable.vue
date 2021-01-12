<template>
  <div
    v-loading="isLoading"
    class="form-page"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <div class="search-bar">
      <div class="left" />
      <div class="right">
        <el-cascader
          v-model="advancedForm.gridCode"
          placeholder="所属网格"
          :props="gridCodeProps"
        />
        <el-button
          type="primary"
          @click="fetchEventList"
        >
          查询
        </el-button>
        <el-button
          plain
          @click="advancedSearchShow = true"
        >
          高级搜索
        </el-button>

        <span
          class="back-btn"
          @click="backPage"
        >
          <svg-icon icon-class="page-back" />
          返回
        </span>
      </div>
    </div>

    <search-advance v-show="advancedSearchShow">
      <el-form
        ref="advancedForm"
        :model="advancedForm"
        label-width="140px"
      >
        <el-form-item label="所属网格">
          <el-cascader
            v-model="advancedForm.gridCode"
            placeholder="请选择所属网格"
            :props="gridCodeProps"
          />
        </el-form-item>
        <el-form-item label="事件影响程度">
          <el-select
            v-model="advancedForm.effectScope"
            placeholder="请选择事件影响程度"
          >
            <el-option
              label="小"
              value="01"
            />
            <el-option
              label="中"
              value="02"
            />
            <el-option
              label="大"
              value="03"
            />
            <el-option
              label="重大"
              value="04"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件名称">
          <el-input
            v-model="advancedForm.eventName"
            placeholder="请输入事件名称"
          />
        </el-form-item>
        <el-form-item label="事件分类">
          <el-cascader
            v-model="advancedForm.eventType"
            placeholder="请选择事件分类"
            :options="eventCategoryList"
            :props="{
              label: 'dictLabel',
              value: 'dictValue',
              checkStrictly: true
            }"
          />
        </el-form-item>
        <el-form-item label="事发时间阶段">
          <el-date-picker
            v-model="timeStep"
            type="daterange"
            value-format="yyyy-MM-dd"
            placeholder="请选择事发时间阶段"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          v-if="pageName !== '待办事件'"
          label="事件状态"
        >
          <el-select
            v-model="advancedForm.status"
            placeholder="请选择事件状态"
          >
            <el-option
              label="不限"
              value="00,01,02,03,04"
            />
            <el-option
              label="受理"
              value="00"
            />
            <el-option
              label="处理中(上报)"
              value="01"
            />
            <el-option
              label="处理中(交办)"
              value="02"
            />
            <el-option
              label="结案"
              value="03,04"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button
            type="primary"
            @click="searchAdvance"
          >
            查询
          </el-button>
          <el-button
            type="primary"
            @click="resetSearchForm"
          >
            重置
          </el-button>
          <el-button
            plain
            @click="advancedSearchShow = false"
          >
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </search-advance>

    <el-table
      :data="tableData"
      current-row-key="id"
      height="100%"
      stripe
    >
      <el-table-column label="事件标题">
        <template slot-scope="scope">
          <span style="color: #7ff2f4;">
            {{ scope.row.eventName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="事件时间"
        prop="happenTime"
      />
      <el-table-column
        label="办结期限"
        prop="handleDate"
      />
      <el-table-column
        label="事件分类"
        prop="typeText"
      />
      <el-table-column
        label="所属网格"
        prop="gridName"
      />
      <el-table-column
        label="当前状态"
        prop="status"
      />
      <el-table-column
        label="采集时间"
        prop="collectDate"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEventDetails(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :page-size.sync="pagination.pageSize"
      :page-num.sync="pagination.pageNum"
      :total.sync="pagination.total"
      @pagination-change="fetchEventList"
    />

    <Dialog
      title="查看事件信息"
      :visible.sync="eventDetailsModal.visible"
    >
      <EventDetailsModal :info="eventDetailsModal.info" />
    </Dialog>
  </div>
</template>

<script>
import {
  queryGovernEvent,
  treeList,
  queryGridByParentId
} from '@/api/servingMasses'
import EventDetailsModal from './EventDetailsModal'
export default {
  components: {
    EventDetailsModal
  },
  props: {
    pageName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoading: false,
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      eventDetailsModal: {
        visible: false,
        info: null
      },
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {
        effectScope: '',
        eventName: '',
        eventType: [],
        gridCode: [],
        status: '00,01,02,03,04',
        bizPlatform: [],
        happenStartTime: '',
        happenEndTime: ''
      },
      timeStep: '',
      eventCategoryList: [],
      gridCodeProps: {
        lazy: true,
        checkStrictly: true,
        lazyLoad (node, resolve) {
          const { data } = node
          let parentId = ''
          if (data && data.id) {
            parentId = data.id
          }
          queryGridByParentId({
            parentId: parentId
          }).then(res => {
            const { status, data } = res
            if (status === 200) {
              const nodes = data.map(item => ({
                value: item.gridCode,
                label: item.gridName,
                id: item.id,
                leaf: item.gridLevel >= 6
              }))
              resolve(nodes)
            }
          })
        }
      }
    }
  },
  created () {
    switch (this.pageName) {
      case '待办事件':
        this.advancedForm.status = '00,01,02'
        break
      case '南昌社会治理APP':
        this.advancedForm.bizPlatform = ['202001']
        break
      case '平安志愿者APP':
        this.advancedForm.bizPlatform = ['202002']
        break
      case '创文明城市系统数':
        this.advancedForm.bizPlatform = ['3601003']
        break
      case '网格员':
        this.advancedForm.bizPlatform = [
          '0',
          '3601020',
          '3601008',
          '3601015',
          '3601012'
        ]
        break
    }
    this.fetchEventList()
    this.fetchEventCategoryList()
  },
  methods: {
    fetchEventList () {
      const postData = {
        ...this.advancedForm
      }

      if (this.pageName === '待办事件' || this.pageName === '事件总数') {
        delete postData.bizPlatform
      }

      if (this.advancedForm.eventType.length) {
        postData.eventType = this.advancedForm.eventType[
          this.advancedForm.eventType.length - 1
        ]
      } else {
        postData.eventType = ''
      }

      if (this.advancedForm.gridCode.length) {
        postData.gridCode = this.advancedForm.gridCode[
          this.advancedForm.gridCode.length - 1
        ]
      } else {
        postData.gridCode = ''
      }

      postData.happenEndTime = this.timeStep !== '' ? this.timeStep[1] : ''
      postData.happenStartTime = this.timeStep !== '' ? this.timeStep[0] : ''

      postData.status =
        this.advancedForm.status !== ''
          ? this.advancedForm.status.split(',')
          : []

      this.isLoading = true
      queryGovernEvent(
        this.pagination.pageNum,
        this.pagination.pageSize,
        postData
      ).then(res => {
        this.isLoading = false
        const { status, data } = res
        if (status === 200) {
          this.tableData = data.list
          this.pagination.total = data.total
        }
      })
    },
    searchAdvance () {
      this.advancedSearchShow = false
      this.fetchEventList()
    },
    fetchEventCategoryList () {
      treeList({
        dictTypeCode: 'GOVERN_EVENT_TYPE'
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.eventCategoryList = data
        }
      })
    },
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
      this.fetchEventList()
    },
    backPage () {
      this.$EventBus.$emit('backPage', {
        pageName: 'home',
        pageType: 'home'
      })
    },
    handleEventDetails (rowData) {
      this.eventDetailsModal.visible = true
      this.eventDetailsModal.info = rowData
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/form.scss";
.back-btn {
  color: #98caff;
  margin-left: 25px;
  cursor: pointer;
}

/deep/ .el-range-input {
  background: transparent;
  color: #fff;
}
/deep/ .el-range-separator {
  color: #fff;
}

/deep/ .form-container {
  top: 200px !important;
}
</style>
