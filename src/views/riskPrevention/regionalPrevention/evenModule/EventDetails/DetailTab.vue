<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
  >
    <el-tab-pane
      label="事件信息"
      name="DetailInfo"
    />
    <el-tab-pane
      label="处理记录"
      name="DetailRecord"
    />
    <el-tab-pane
      label="关联网格管理对象"
      name="DetailGridObject"
    />
  </el-tabs>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeName: 'DetailInfo'
    }
  },
  watch: {
    name (val) {
      this.activeName = val
    }
  },
  methods: {
    handleClick ({ name }) {
      this.$emit('tabActiveName', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs__nav-wrap::after {
  opacity: 0.1;
}
.el-tabs__item {
  color: #fff;
}
</style>
