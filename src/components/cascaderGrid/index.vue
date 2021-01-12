<template>
  <el-cascader
    :value="value"
    v-bind="$attrs"
    placeholder="请选择所属网格"
    :options="options"
    :props="props"
    clearable
    filterable
    :disabled="judgeIsDisabled"
    @change="bindChange"
  />
</template>

<script>
import { getGridTree } from '@/api/riskPrevention/peopleManage/informationService'
export default {
  name: 'SelectGrid',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Object, Array],
      default: null
    },
    // 是否禁用全部网格
    isNoNeedAll: {
      type: Boolean,
      default: false
    },
    // 是否开启特别需求搜索功能
    isOnSearch: {
      type: Boolean,
      default: false
    },
    // 是否明确禁用下拉框（如编辑表单的时候）
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      options: [],
      props: {
        label: 'gridName',
        value: 'gridCode'
      }
    }
  },
  computed: {
    curGridName () {
      return this.$store.getters.curGridName
    },
    judgeIsDisabled () {
      // 当特别需求搜索和明确禁用同时存在 优先明确禁用
      if (this.isDisabled) {
        return true
      }

      // 当开启搜索功能，并且当前所选小区不是全部，禁用下拉框，优先选择全局选择的小区
      if (this.curGridName !== '全部' && this.isOnSearch) {
        this.$emit('change', this.$store.getters.curCommunityCode)
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getGridList()
  },
  methods: {
    bindChange (val) {
      this.$emit('change', val)
    },
    async getGridList () {
      const res = await getGridTree()
      if (res.status === 200) {
        this.options = this.getTreeData(res.data)
      }
    },
    getTreeData (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    }
  }
}
</script>

<style scoped></style>
