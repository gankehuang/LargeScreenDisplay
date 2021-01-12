<template>
  <div>
    <el-select
      v-if="isObj"
      value-key="option.dictValue"
      :value="value"
      v-bind="$attrs"
      clearable
      @change="bindChange"
    >
      <el-option
        v-for="option in options"
        :key="option.dictValue"
        :label="option.dictLabel"
        :value="option"
      />
    </el-select>

    <el-select
      v-else
      :value="value"
      v-bind="$attrs"
      clearable
      @change="bindChange"
    >
      <el-option
        v-for="option in options"
        :key="option.dictValue"
        :label="option.dictLabel"
        :value="option.dictValue"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    dict: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Object, Number],
      default: ''
    },
    isObj: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      options: []
    }
  },
  mounted () {
    this.getOptions()
  },
  methods: {
    bindChange (e) {
      this.$emit('change', e)
    },
    async getOptions () {
      await this.$store.dispatch('dictionary/setDict', this.dict)
      this.options = this.$store.getters[`dictionary/${this.dict}`]
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
