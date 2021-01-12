<template>
  <div class="sit-event-tab">
    <span
      v-for="(item,index) in tabs"
      :key="index"
      :class="['tab',{active:selectedTab.seleTab===item.seleTab}]"
      @click="handleTab(item)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    selectedTab: {
      type: Object,
      default: () => { return { seleTab: 'EventStatus' } }
    }
  },
  data () {
    return {
      tabs: [
        {
          label: '状态',
          seleTab: 'EventStatus'
        },
        {
          label: '来源',
          seleTab: 'EventOrigin'
        },
        {
          label: '分类',
          seleTab: 'EventClassify'
        }
      ]
    }
  },
  methods: {
    handleTab (item) {
      this.$emit('update:selectedTab', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-event-tab {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tab {
  display: inline-block;
  width: 50px;
  height: 30px;
  color: #a1d8ff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;

  &.active {
    background: url('~@/assets/images/homepage/situation(2).png') center center /
      100% 100% no-repeat;
  }
}
</style>
