<template>
  <InfoBlockTwo
    title="事件来源"
    :content-style-obj="{
      display: 'flex',
      flexWrap: 'wrap'
    }"
  >
    <div class="item">
      <i class="item-icon" />
      <div class="item-content">
        <div class="item-num-box">
          <span class="item-num">58790</span>
          <span class="item-unit">件</span>
        </div>
        <div class="item-title">
          网格员上报
        </div>
      </div>
    </div>
    <div
      class="item"
      @click="headleItem('居民APP上报')"
    >
      <i class="item-icon" />
      <div class="item-content">
        <div class="item-num-box">
          <span class="item-num">58790</span>
          <span class="item-unit">件</span>
        </div>
        <div class="item-title">
          居民APP上报
        </div>
      </div>
    </div>
    <div class="item">
      <i class="item-icon" />
      <div class="item-content">
        <div class="item-num-box">
          <span class="item-num">58790</span>
          <span class="item-unit">件</span>
        </div>
        <div class="item-title">
          部门系统流转
        </div>
      </div>
    </div>
    <div class="item">
      <i class="item-icon" />
      <div class="item-content">
        <div class="item-num-box">
          <span class="item-num">58790</span>
          <span class="item-unit">件</span>
        </div>
        <div class="item-title">
          智能预警
        </div>
      </div>
    </div>
    <Dialog
      title="事件列表"
      :visible.sync="eventListTableModal.visible"
      width="90%"
      height="90%"
      :top="10"
    >
      <EventListTable />
    </Dialog>
  </InfoBlockTwo>
</template>
<script>
import EventListTable from '../modal/EventListTable'
export default {
  components: {
    EventListTable
  },
  data () {
    return {
      eventListTableModal: {
        visible: false,
        info: null
      }
    }
  },
  methods: {
    headleItem (itemType) {
      switch (itemType) {
        case '居民APP上报':
          this.eventListTableModal.visible = true
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  flex-basis: 50%;
  display: flex;
  align-items: center;
  &:nth-child(2n) {
    justify-content: center;
  }
  .item-icon {
    width: 42px;
    height: 48px;
  }
  &:nth-child(1) {
    .item-icon {
      background: url('~@/assets/images/servingMasses/left2-item-grid-icon.png') no-repeat;
      background-size: 100% 100%;
    }

  }
  &:nth-child(2) {
    .item-icon {
      background: url('~@/assets/images/servingMasses/left2-item-app-icon.png') no-repeat;
      background-size: 100% 100%;
    }

  }
  &:nth-child(3) {
    .item-icon {
      background: url('~@/assets/images/servingMasses/left2-item-department-icon.png') no-repeat;
      background-size: 100% 100%;
    }

  }
  &:nth-child(4) {
    .item-icon {
      background: url('~@/assets/images/servingMasses/left2-item-warning-icon.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .item-content {
    margin-left: 20px;
    .item-num {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
    }
    .item-unit {
      color: #A1D8FF;
    }

    .item-title {
      margin-top: 10px;
      color: #A1D8FF;
      font-size: 16px;
    }
  }
}
</style>
