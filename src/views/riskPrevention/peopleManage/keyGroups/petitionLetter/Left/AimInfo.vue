<template>
  <InfoBlock
    title="重点信访人员"
    height="auto"
  >
    <div class="list-item">
      <div class="flex-item1">
        <img
          style="width: 98px;height: 69px;"
          src="@/assets/images/keyGroups/xfry-2.png"
        >
      </div>
      <div class="flex-item2">
        <span>人员总数</span>
        233
        <span>人</span>
      </div>
    </div>
    <div class="echarts-box">
      <div class="echarts-title">
        信访场所分析
      </div>
      <v-chart
        :options="distributeOptions"
        class="echart"
      />
    </div>
  </InfoBlock>
</template>

<script>
import {
  queryPetitionPurpose,
  queryPetitionCount
} from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      data: [],
      count1: 16,
      loading: false
    }
  },
  computed: {
    distributeOptions () {
      return {
        color: ['#00FFFF', '#0055FF', '#e6b00e'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'
        },
        grid: {
          right: '4%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          top: -20,
          right: 0,
          height: '70%',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 30,
          padding: 40,
          show: true,
          data: ['赴京', '赴省', '其它'],
          textStyle: {
            color: '#A9DAFF'
          }
        },
        series: [
          {
            name: '信访数量',
            type: 'pie',
            center: ['35%', '30%'],
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{c}(次)',
              textStyle: {
                color: '#7EBDFF'
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              length: 1
            },
            data: [
              { value: 387, name: '赴京' },
              { value: 708, name: '赴省' },
              { value: 1006, name: '其它' }
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.getList()
    this.getLists()
  },
  methods: {
    getLists () {
      queryPetitionCount().then(res => {
        if (res.status === 200) {
          this.count = res.data.total
          this.count1 = res.data.keyPetition
          this.count2 = res.data.petition
        }
      })
    },
    getList () {
      queryPetitionPurpose({ gridCode: 3601 }).then(res => {
        if (res.status === 200) {
          this.data = [res.data.fjCount, res.data.fsCount, res.data.fcCount]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  .flex-item1 {
    margin-left: 41px;
  }
  .flex-item2 {
    padding-top: 18px;
    font-size: 30px;
    font-weight: bold;
    color: #17fbff;
    text-align: center;
    padding-left: 12px;
    span {
      padding-right: 28px;
      padding-left: 6px;
      font-size: 16px;
      font-weight: bold;
      color: #a9daff;
      line-height: 18px;
    }
  }
}
.echarts-box {
  height: 237px;
  width: 100%;
  background: url("~@/assets/images/keyGroups/xfry.png") no-repeat;
  background-size: 100% 100%;
  .echarts-title {
    width: 200px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
    color: #a9daff;
    background: url("~@/assets/images/keyGroups/xfry-1.png") no-repeat;
  }
}
</style>
