<template>
  <div class="leftThree">
    <div class="con-top">
      <WordCloundChart
        :data="list"
      />
    </div>
  </div>
</template>
<script>
import WordCloundChart from '@/components/WordCloundChart/index'
export default {
  components: {
    WordCloundChart
  },
  data () {
    return {
      list: [
        {
          name: '突发事件',
          value: '123'
        },
        {
          name: '械斗',
          value: '265'
        },
        {
          name: '劳资纠纷',
          value: '300'
        },
        {
          name: '黑社会',
          value: '456'
        },
        {
          name: '药品安全',
          value: '168'
        },
        {
          name: '打伤',
          value: '203'
        },
        {
          name: '新冠病毒',
          value: '360'
        },
        {
          name: '暴力执法',
          value: '340'
        },
        {
          name: '领导干预',
          value: '220'
        },
        {
          name: '网络借贷',
          value: '168'
        },
        {
          name: '空气质量',
          value: '360'
        },
        {
          name: '恶势力',
          value: '340'
        },
        {
          name: '团伙',
          value: '220'
        },
        {
          name: '安全生产',
          value: '168'
        },
        {
          name: '拘留所猝死',
          value: '360'
        },
        {
          name: '网络借贷',
          value: '340'
        },
        {
          name: '矛盾纠纷',
          value: '220'
        },
        {
          name: '司法纠纷',
          value: '168'
        },
        {
          name: '追截致死',
          value: '781'
        },
        {
          name: '重大交通事故',
          value: '120'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.leftThree {
  .con-top {
    margin-top: 10px;
    width: 390px;
    height: 230px;
  }
}
</style>
