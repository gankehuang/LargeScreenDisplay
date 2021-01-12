<!-- 安全生产 右侧组件 -->
<template>
  <div class="page-right">
    <InfoBlock title="事件预警">
      <!-- value 接受一个数组,0: 消防设备超期,1: 安全设备超期,2: 特种设备超期,3: 证件过期 -->
      <TopBlock
        :value="[12,34,12,22]"
      />
    </InfoBlock>
    <InfoBlock title="预警事件分析">
      <template slot="topRight">
        <div
          class="bottom-title-button"
        >
          <div
            v-for="item in btnList"
            :key="item.name"
            :ref="item.name"
            class="right-bottom-button-font"
            :class="item.class"
            @click="changeItem($event,item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </template>
      <MidBlock :data="data" />
    </InfoBlock>
    <InfoBlock title="实时预警">
      <BottomBlock :value-list="eventList" />
    </InfoBlock>
  </div>
</template>
<script>

import TopBlock from './topBlock'
import MidBlock from './midBlock'
import BottomBlock from './bottomBlock'

export default {
  components: {
    TopBlock,
    MidBlock,
    BottomBlock
  },
  props: {
    eventList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      data: {
        time: Array.apply(null, { length: 24 }).map((_, index) => `${index < 10 ? '0' + index.toString() : index}:00`),
        data: [3, 5, 6, 7, 8, 9, 7, 12, 5, 7, 2, 4, 2, 8, 10]
      },
      btnList: [
        { name: '今日', class: 'active' },
        { name: '本周', class: '' },
        { name: '本月', class: '' }
      ]
    }
  },
  methods: {
    changeItem (event, item) {
      for (let i = 0; i < document.getElementsByClassName('bottom-button-font').length; i++) {
        document.getElementsByClassName('right-bottom-button-font')[i].className = 'right-bottom-button-font'
      }
      event.target.className += ' active'

      switch (item) {
        case '今日':
          this.data = {
            time: Array.apply(null, { length: 24 }).map((_, index) => `${index < 10 ? '0' + index.toString() : index}:00`),
            data: [3, 5, 6, 7, 8, 9, 7, 12, 5, 7, 2, 4, 2, 8, 10]
          }
          break
        case '本周':
          this.data = {
            time: Array.apply(null, { length: 7 }).map((_, index) => `星期${index + 1}`),
            data: [120, 100, 78, 90, 230, 53]
          }
          break
        case '本月':
          this.data = {
            time: Array.apply(null, { length: 30 }).map((_, index) => `${index + 1}号`),
            data: [120, 100, 78, 90, 230, 53, 150, 148]
          }
          break
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .bottom-title-button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    .right-bottom-button-font {
      width: 74px;
      height: 30px;
      font-size: 14px;
      color: #A1D8FF;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }

    .active {
      background: url('~@/assets/images/safetyProduction/left-bottom-btn.png')
    }
  }
</style>
