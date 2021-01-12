<template>
  <el-scrollbar
    v-loading="isLoading"
    style="height:100%;width:100%;"
  >
    <el-tree
      :empty-text="emptyText"
      :data="data"
      default-expand-all
      :props="props"
      @node-click="nodeClick"
    />
  </el-scrollbar>
</template>

<script>
import { grid, qfqzdw, unit } from './data'
import {
  getOrgList,
  getGridTree,
  safeVolunteerTeam as volunteerTeam,
  queryOrgTree
} from '@/api/common/grid'
import { getFaceDatabaseList } from '@/api/common/face'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    orgId: {
      type: String,
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: ''
    },
    getList: {
      type: Function,
      default: () => {}
    },
    code: {
      type: String,
      default: '360106'
    },
    parentId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoading: false,
      emptyText: ''
    }
  },
  watch: {
    type: {
      immediate: true,
      async handler (e) {
        switch (e) {
          case 'grid':
            await this.getGridTree()
            break
          case 'qfqzdw':
            await this.getQfqzOrgTree()
            break
          case 'organ':
            await this.getOrganTree()
            break
          case 'center':
            await this.getOrganTree()
            break
          case 'mass':
            await this.getOrganTree()
            break
          case 'face':
            await this.getFaceDatabaseList()
            break
          case 'unit':
            this.$props.data = unit
            break
          case 'volunteer':
            await this.getVolunteerTeam()
            break
          default:
            break
        }
      }
    }
  },
  created () {},
  methods: {
    // 获取群防组织树
    async getQfqzOrgTree () {
      this.isLoading = true
      const params = { type: 1 }
      const { status, data } = await queryOrgTree(params)
      if (status === 200) {
        this.isLoading = false
        if (data.length === 0) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ''
        }
        this.$props.data = [{ name: '群治力量', children: data }]
      } else {
        this.$props.data = qfqzdw
      }
    },
    async getVolunteerTeam () {
      this.isLoading = true
      const params = { code: this.code }
      const { status, data } = await volunteerTeam(params)
      if (status === 200) {
        this.isLoading = false
        if (data.length === 0) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ''
        }
        this.$props.data = [{ name: '志愿者队伍', children: data }]
      }
    },
    // 获取综治组织
    async getOrganTree () {
      this.isLoading = true
      let params = {}
      if (this.type === 'organ') {
        params = { type: 0 }
      } else if (this.type === 'center') {
        params = { type: 8 }
      } else if (this.type === 'mass') {
        params = { type: 1 }
      }
      const { status, data } = await getOrgList({
        ...params,
        code: this.$props.code
      })
      if (status === 200) {
        this.isLoading = false
        if (data.length === 0) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ''
        }
        if (this.type === 'organ') {
          this.$props.data = [{ name: '综治机构', children: data }]
        } else if (this.type === 'center') {
          this.$props.data = [{ name: '综治中心', children: data }]
        } else if (this.type === 'mass') {
          this.$props.data = [{ name: '群防群治', children: data }]
        }
      } else {
        this.$props.data = qfqzdw
      }
    },
    // 获取网格组织
    async getGridTree () {
      this.isLoading = true
      let params = {}
      if (this.parentId) {
        params = { parentId: this.parentId }
      }
      const { status, data } = await getGridTree(params)
      if (status === 200) {
        this.isLoading = false
        if (data.length === 0) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ''
        }
        this.$props.data = [{ gridName: '网格信息', children: data }]
      } else {
        this.$props.data = grid
      }
    },
    // 获取人脸库表
    async getFaceDatabaseList () {
      this.isLoading = true
      const { status, data } = await getFaceDatabaseList()
      if (status === 200) {
        this.isLoading = false
        if (data.length === 0) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ''
        }
        this.$props.data = [{ name: '人脸库', children: data }]
        this.$emit('startFdid', data[0].fdid)
      }
    },
    // 点击节点回调
    nodeClick (data) {
      switch (this.$props.type) {
        case 'qfqzdw':
          this.emitOrgId(data.id)
          break
        case 'organ':
          this.emitOrg(data.id)
          break
        case 'mass':
          this.emitOrg(data.id)
          break
        case 'center':
          this.emitOrg(data.id)
          break
        case 'grid':
          this.emitGrid(data.gridCode)
          break
        default:
          break
      }
    },
    // 获取群防组织id
    emitOrgId (orgId) {
      this.$emit('update:orgId', orgId)
      this.$emit('getList')
    },
    // 获取机构id
    emitOrg (id) {
      this.$emit('changeOrganId', id)
    },
    // 获取网格
    emitGrid (id) {
      this.$emit('changeGridId', id)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
  padding: 10px;
}

/deep/ .el-tree {
  color: #606266;
}

/deep/ .el-tree-node__content {
  height: 34px;
}

/deep/ .el-tree-node__content:hover {
  background: #eee;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
  background: #eee;
}
</style>
