<template>
  <div
    v-loading="loading"
    class="float-people-modal-container"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="transparent"
  >
    <div class="float-people-modal-right">
      <el-input
        v-model="searchForm.name"
        placeholder="姓名"
        class="search-input"
      />
      <el-input
        v-model="searchForm.idNumber"
        placeholder="公民身份证号"
        class="search-input"
      />
      <el-button
        type="primary"
        @click="getList"
      >
        查询
      </el-button>
      <el-button
        type="primary"
        @click="
          searchForm.idNumber = '';
          searchForm.name = '';
        "
      >
        重置
      </el-button>
    </div>
    <el-scrollbar
      v-loading="tableLoading"
      style="height:80%;width:100%;"
      element-loading-text="数据加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="transparent"
    >
      <div
        v-if="tableData.length !== 0"
        v-loading="loading"
        class="list"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="transparent"
      >
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="list-item"
        >
          <el-row :gutter="64">
            <el-col :span="4">
              <el-image
                v-if="
                  item.idCardImageUrl &&
                    item.idCardImageUrl.indexOf('http://') > -1
                "
                fit="cover"
                :src="item.idCardImageUrl"
                :preview-src-list="[item.idCardImageUrl]"
              />
              <el-image
                v-else
                style="margin: 5px 10px 0 0;width: 100px; height: 135px"
                :src="photoUrl"
                :preview-src-list="[photoUrl]"
              />
              <div class="image-explain">
                采集照片
              </div>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="12">
                  <span class="label">姓名：</span>
                  <span>{{ item.name | hideName }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span class="label">性别：</span>
                  <span>{{ item.genderText }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="label">民族：</span>
                  <span>{{ item.nationText }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span class="label">管理类别：</span>
                  <span>{{ item.manageCategoryText }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="label">登记时间：</span>
                  <span>{{ item.createTime }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span class="label">手机号码：</span>
                  <span>{{ item.phone | hidePhone }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="label">身份证号：</span>
                  <span>{{ item.idNumber | hideIdCard }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span class="label">所属网格：</span>
                  <span>{{ item.gridName }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="label">所属区域：</span>
                  <span>{{ item.committeeName }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="label">居住地址：</span>
                  <span>{{ item.curResidenceAddress }}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div
        v-if="tableData.length === 0 && !tableLoading"
        class="empty"
      >
        暂无数据
      </div>
    </el-scrollbar>
    <Pagination
      :page-size.sync="pageSize"
      :page-num.sync="pageNum"
      :total.sync="total"
      @pagination-change="getList"
    />
  </div>
</template>

<script>
// import { queryFlowPopulationByProvince } from '@/api/riskPrevention/floatingPopulation'

export default {
  props: {
    provinceCode: undefined
  },
  data () {
    return {
      searchForm: {
        idNumber: '',
        name: ''
      },
      tableLoading: false,
      photoUrl: require('@/assets/images/keyGroups/has-avatar.png'),
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted () {
    // this.getList()
  },
  methods: {
    getList () {}
    // async getList () {
    //   this.tableLoading = true
    //   const params = {
    //     ...this.searchForm
    //   }
    //   if (this.$props.provinceCode) {
    //     params.provinceCode = this.$props.provinceCode
    //   }
    //   const { status, data } = await queryFlowPopulationByProvince(
    //     this.pageNum,
    //     this.pageSize,
    //     params
    //   )
    //   this.tableLoading = false
    //   if (status === 200) {
    //     this.loading = false
    //     this.tableData = data.list
    //     this.total = data.total
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-pagination {
  padding: 2px 40px;
}
/deep/.el-pager li {
  background-color: transparent;
}
/deep/.el-pagination .btn-next {
  color: #fff;
}
/deep/.el-pagination .btn-prev {
  color: #fff;
}
.float-people-modal-container {
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  width: 100%;
  height: 100%;
  .float-people-modal-right {
    margin: 10px 40px 0 0;
    padding: 20px 0;
    text-align: right;
    .el-input {
      width: 15%;
      margin-right: 1%;
    }
  }
  .list {
    padding-top: 20px;
  }
  .list-item {
    font-size: 16px;
    padding: 10px;
    display: inline-block;
    width: 45%;
    background-color: transparent;
    border: 1px solid #2268b6;
    border-radius: 8px;
    color: #a9daff;
    .label {
      color: #7fbdff;
      line-height: 28px;
    }
    &:nth-child(odd) {
      margin: 0 4%;
    }
  }
  .image-explain {
    width: 100px;
    text-align: center;
  }
  .empty {
    width: 10%;
    height: 90%;
    text-align: center;
    margin: 15% auto;
    color: #fff;
  }
}
</style>
