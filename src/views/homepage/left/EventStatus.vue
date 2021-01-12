<template>
  <div class="sit-event-status">
    <div
      v-for="(item,index) in dataList"
      :key="index"
      class="echart-content"
    >
      <RingPerChart
        :number="item.number"
        :total="total"
        :color="item.color"
        :style-obj="item.styleObj"
      >
        <div class="data">
          <div class="label">
            {{ item.label }}
          </div>
          <div class="num">
            {{ item.number }}件
          </div>
        </div>
      </RingPerChart>
    </div>
  </div>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
export default {
  components: {
    RingPerChart
  },
  data () {
    return {
      total: 264,
      dataList: [
        {
          label: '待受理',
          number: 2,
          color: '#2FA4FF',
          styleObj: {
            width: '71px',
            height: '71px',
            'background-image': `url(${require('@/assets/images/homepage/situation(13).png')})`
          }
        },
        {
          label: '已派发',
          number: 23,
          color: '#A1D8FF',
          styleObj: {
            width: '71px',
            height: '71px',
            'background-image': `url(${require('@/assets/images/homepage/situation(13).png')})`
          }
        },
        {
          label: '逾期',
          number: 5,
          color: '#1DFFF7',
          styleObj: {
            width: '71px',
            height: '71px',
            'background-image': `url(${require('@/assets/images/homepage/situation(13).png')})`
          }
        }, {
          label: '已办结',
          number: 234,
          color: '#2FA4FF',
          styleObj: {
            width: '71px',
            height: '71px',
            'background-image': `url(${require('@/assets/images/homepage/situation(13).png')})`
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-event-status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 20px;
}
.echart-content {
  width: 50%;
  margin: 15px 0;
  position: relative;
}
.data {
  position: absolute;
  top: 10px;
  left: 80px;
  .label {
    font-size: 16px;
    color: #a1d8ff;
    line-height: 28px;
  }
  .num {
    font-size: 16px;
    color: #ffffff;
    line-height: 28px;
  }
}
</style>
