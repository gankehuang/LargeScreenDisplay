<template>
  <el-pagination
    class="pagination"
    :current-page="pageNum"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageNum: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 15, 25, 50]
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    sizeChange (val) {
      this.$emit('update:pageNum', 1)
      this.$emit('update:pageSize', val)
      this.$emit('pagination-change')
    },
    currentChange (val) {
      this.$emit('update:pageNum', val)
      this.$emit('pagination-change')
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
