<!-- 安全生产 左侧组件 -->
<template>
  <div class="page-left">
    <InfoBlock title="隐患排查">
      <!-- titleValue 接受一个数组,0: 隐患总数,1: 未整改隐患,2: 超期隐患 -->
      <!-- bottomValue 接受一个数组,0: 本月整改总数,1: 本周整改总数 -->
      <TopBlock
        :title-value="[215,186,87]"
        :bottom-value="[120,98]"
      />
    </InfoBlock>
    <InfoBlock title="危险源">
      <!-- content 接受一个数组,0: 危险源总数,1: 一般危险源数,2: 重大危险源数 -->
      <MidBlock :value="[165,150,15]" />
    </InfoBlock>
    <InfoBlock title="隐患行业">
      <template slot="topRight">
        <div
          class="bottom-title-button"
        >
          <div
            v-for="item in btnList"
            :key="item.name"
            :ref="item.name"
            class="bottom-button-font"
            :class="item.class"
            @click="changeItem($event,item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </template>
      <BottomBlock :data="dataList" />
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
  data () {
    return {
      dataList: [
        { value: 23, name: '生产经营单位' },
        { value: 23, name: '经营单位(带存储)' },
        { value: 23, name: '经营单位(不带存储)' },
        { value: 2, name: '使用单位' },
        { value: 22, name: '加油站' }
      ],
      btnList: [
        { name: '危化品', class: 'active' },
        { name: '工商贸', class: '' },
        { name: '烟花爆竹', class: '' }
      ]
    }
  },
  methods: {
    changeItem (event, item) {
      for (let i = 0; i < document.getElementsByClassName('bottom-button-font').length; i++) {
        document.getElementsByClassName('bottom-button-font')[i].className = 'bottom-button-font'
      }
      event.target.className += ' active'

      switch (item) {
        case '危化品':
          this.dataList = [
            { value: 23, name: '生产经营单位' },
            { value: 23, name: '经营单位(带存储)' },
            { value: 23, name: '经营单位(不带存储)' },
            { value: 2, name: '使用单位' },
            { value: 22, name: '加油站' }
          ]
          break
        case '工商贸':
          this.dataList = [
            { value: 23, name: '化工医药' },
            { value: 23, name: '冶金' },
            { value: 23, name: '有色' },
            { value: 2, name: '建材' },
            { value: 22, name: '机械' },
            { value: 23, name: '轻工' },
            { value: 23, name: '纺织' },
            { value: 23, name: '商贸' },
            { value: 2, name: '其他' }
          ]
          break
        case '烟花爆竹':
          this.dataList = [
            { value: 23, name: '烟花爆竹零售企业' }
          ]
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

    .bottom-button-font {
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
