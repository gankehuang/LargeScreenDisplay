<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="detail-modal-dialog"
    center
    width="1000px"
    :visible="visible"
    @close="dialogClose"
    @open="getList"
  >
    <template slot="title">
      <DetailTab
        :name="activeName"
        @tabActiveName="tabActiveName"
      />
    </template>
    <div class="tab-content">
      <el-scrollbar style="height:95%">
        <DetailInfo
          v-if="activeName === 'DetailInfo'"
          :data="tableData"
        />
        <DetailRecord
          v-if="activeName === 'DetailRecord'"
          :data="tableData"
        />
        <DetailGridObject
          v-if="activeName === 'DetailGridObject'"
        />
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import DetailTab from './DetailTab'
import DetailInfo from './DetailInfo'
import DetailRecord from './DetailRecord'
import DetailGridObject from './DetailGridObject'
import { getEventById } from '@/api/common/event'

export default {
  components: {
    DetailTab,
    DetailInfo,
    DetailRecord,
    DetailGridObject
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: 'DetailInfo',
      tableData: {}
    }
  },
  methods: {
    dialogClose () {
      this.$emit('update:visible', false)
    },
    tabActiveName (activeName) {
      this.activeName = activeName
      this.getList()
    },
    async getList () {
      const param = {
        id: this.info.id
      }
      const { data, status } = await getEventById(param)
      if (status === 200) {
        this.tableData = data
        if (data.processingImageUrl && data.processingImageUrl !== '无') {
          this.tableData.processingImageUrl = data.processingImageUrl.split(
            ','
          )
        }
        if (data.snapImageUrl && data.snapImageUrl !== '无') {
          this.tableData.snapImageUrl = data.snapImageUrl.split(',')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-modal-dialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /deep/ .el-dialog .el-dialog__body {
    padding: 0 20px;
  }
  /deep/ .el-tabs__item {
    color: #fff;
  }
}

.tab-content {
  width: 100%;
  height: 75vh;
}
</style>
