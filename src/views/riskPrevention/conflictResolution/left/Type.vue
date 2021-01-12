<template>
  <InfoBlock title="矛盾纠纷类型">
    <WordCloundChart :data="list" />
  </InfoBlock>
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
          name: '婚恋家庭纠纷',
          value: '23'
        },
        {
          name: '邻里纠纷',
          value: '23'
        },
        {
          name: '城市建设发展纠纷',
          value: '43'
        },
        {
          name: '物权相关纠纷',
          value: '23'
        },
        {
          name: '其它纠纷',
          value: '43'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.content {
  margin-top: 10px;
  width: 390px;
  height: 230px;
}
</style>
