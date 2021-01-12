<template>
  <div class="one-level-index">
    <TopCard
      v-for="(item, index) in topTabsList"
      :key="index"
      style="marginTop: 10px"
      :name="item.name"
      :icon="require('@/assets/images/scienceToPolicy' + item.url)"
      :number="item.progress.num"
      :progress="item.progress"
    />
  </div>
</template>

<script>
import TopCard from './TopCard'
export default {
  components: {
    TopCard
  },
  data () {
    return {
      topTabsList: [
        {
          name: '政治安全',
          url: '/right-top-one.png',
          progress: {
            num: 96.18
          }
        },
        {
          name: '治安安全',
          url: '/right-top-three.png',
          progress: {
            num: 95.45
          }
        },
        {
          name: '经济安全',
          url: '/right-top-five.png',
          progress: {
            num: 94.60
          }
        },
        {
          name: '公共安全',
          url: '/right-top-two.png',
          progress: {
            num: 94.37
          }
        },
        {
          name: '矛盾纠纷',
          url: '/right-top-four.png',
          progress: {
            num: 91.56
          }
        },
        {
          name: '公众安全',
          url: '/right-top-six.png',
          progress: {
            num: 90.08
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.one-level-index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
</style>
