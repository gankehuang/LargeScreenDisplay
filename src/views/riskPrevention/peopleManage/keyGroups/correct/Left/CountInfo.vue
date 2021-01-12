<template>
  <InfoBlock
    title="社区矫正人员"
    height="275px"
  >
    <div class="mes">
      <div class="count">
        <div>刑释解戒人员总数</div>
        <div class="num">
          1860
        </div>
        <div>人</div>
      </div>
    </div>
    <ul>
      <li
        v-for="(item, index) in dataList"
        :key="index"
      >
        <RingPerChart
          :number="item.number"
          :total="populationTotal"
          :color="item.color"
          :style-obj="item.styleObj"
        >
          <div class="data">
            <div>{{ item.label }}</div>
            <div class="num-num">
              {{ item.number }}
            </div>
          </div>
        </RingPerChart>
      </li>
    </ul>
  </InfoBlock>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
export default {
  components: {
    RingPerChart
  },
  data () {
    return {
      populationTotal: 1860,
      dataList: [
        {
          label: '被判处管制',
          number: 348,
          color: '#0055FF',
          styleObj: {
            width: '75.5px',
            height: '76px',
            'background-image': `url(${require('@/assets/images/keyGroups/sqjz-1.png')})`
          }
        },
        {
          label: '宣告缓刑',
          number: 259,
          color: '#aadaff',
          styleObj: {
            width: '75.5px',
            height: '76px',
            'background-image': `url(${require('@/assets/images/keyGroups/sqjz-2.png')})`
          }
        },
        {
          label: '裁定假释',
          number: 386,
          color: '#3497FB',
          styleObj: {
            width: '75.5px',
            height: '76px',
            'background-image': `url(${require('@/assets/images/keyGroups/sqjz-3.png')})`
          }
        },
        {
          label: '暂予监外执行',
          number: 867,
          color: '#7FF2F4',
          styleObj: {
            width: '75.5px',
            height: '76px',
            'background-image': `url(${require('@/assets/images/keyGroups/sqjz-4.png')})`
          }
        }
      ]
    }
  },

  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.mes {
  display: flex;
  margin: 0 25px;
  padding-top: 20px;
  background-size: 98px 63px;
  line-height: 34px;
  font-size: 16px;
  color: #aadaff;
  font-weight: bold;
  .count {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    line-height: 18px;
  }
}
.num {
  padding-left: 20px;
  padding-right: 5px;
  font-size: 30px;
  font-weight: bold;
  color: #17fbff;
  line-height: 18px;
}
ul {
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 33px;
}
li {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  .data {
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 400;
    color: #a9daff;
    .num-num {
      width: 25%;
      text-align: center;
      padding-top: 5px;
      font-size: 19px;
      font-weight: bold;
      color: #189aff;
      padding-left: 19px;
    }
  }
}
</style>
