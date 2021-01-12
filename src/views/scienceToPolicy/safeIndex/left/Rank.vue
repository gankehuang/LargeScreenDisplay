<template>
  <div class="rank-container">
    <RankTab />
    <RankProgress
      v-for="(item,index) in progresses"
      :key="index"
      :progress="item"
    />
    <ImpOrDon />
  </div>
</template>

<script>
import RankTab from './RankTab'
import RankProgress from './RankProgress'
import ImpOrDon from './ImpOrDon'
export default {
  components: {
    RankTab,
    RankProgress,
    ImpOrDon
  },
  data () {
    return {
      progresses: [
        {
          image: require('@/assets/images/safeIndex/rank-index-1.png'),
          num: 92.12,
          label: '凤凰街道'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-2.png'),
          num: 86.35,
          label: '八一街道'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-3.png'),
          num: 82.56,
          label: '后埠街道'
        }, {
          image: require('@/assets/images/safeIndex/rank-index-4.png'),
          num: 78.74,
          label: '丹江街道'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-5.png'),
          num: 75.89,
          label: '东大街道'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-6.png'),
          num: 72.98,
          label: '白源街道'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-7.png'),
          num: 70.25,
          label: '安源镇'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-8.png'),
          num: 68.21,
          label: '高坑镇'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-9.png'),
          num: 64.32,
          label: '五陂镇'
        }, {
          image: require('@/assets/images/safeIndex/rank-index-10.png'),
          num: 62.29,
          label: '青山镇'
        },
        {
          image: require('@/assets/images/safeIndex/rank-index-11.png'),
          num: 60.54,
          label: '城郊管委会'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-container {
  width: 100%;
  margin: 60px auto 0;
}
</style>
