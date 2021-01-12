<template>
  <InfoBlock
    title="重点区域"
    height="224px"
  >
    <div class="buttons">
      <div class="button">
        <img
          src="~@/assets/images/regionalPrevention/important-position.png"
          alt=""
        >
        市行政中心
      </div>
      <div class="button">
        <img
          src="~@/assets/images/regionalPrevention/important-position.png"
          alt=""
        >
        秋收起义广场
      </div>
      <div class="button">
        <img
          src="~@/assets/images/regionalPrevention/important-position.png"
          alt=""
        >
        世纪广场
      </div>
      <div class="button">
        <img
          src="~@/assets/images/regionalPrevention/important-position.png"
          alt=""
        >
        旅游景点
      </div>
    </div>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      eventStatusObj: {
        unProcessedCount: 0,
        processingCount: 0,
        completedCount: 0,
        totalCount: 0,
        timeoutCount: 0,
        processedCount: 0,
        reminderCount: 0
      },
      eventTypeObj: {
        conflict: 0,
        internetPublicOpinion: 0,
        politicalSecurity: 0,
        publicSafety: 0,
        socialSecurity: 0
      }
    }
  },
  computed: {
    options () {
      return {
        color: ['#A9DAFF', '#00FFFF', '#0055FF', '#E6B00E', '#FE573B'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 20,
          top: 80,
          height: 130,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          data: ['政治安全', '社会治安', '矛盾纠纷', '公共安全', '网络安全']
        },
        grid: {
          left: '20%',
          height: '50%'
        },
        series: [
          {
            name: '事件情况',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['34%', '33%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'right',
              formatter: '{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                position: 'center',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.eventTypeObj.politicalSecurity,
                name: '政治安全'
              },
              { value: this.eventTypeObj.socialSecurity, name: '社会治安' },
              { value: this.eventTypeObj.conflict, name: '矛盾纠纷' },
              { value: this.eventTypeObj.publicSafety, name: '公共安全' },
              {
                value: this.eventTypeObj.internetPublicOpinion,
                name: '网络安全'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  // padding: 18px 22px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
  .button {
    display: flex;
    width: 180px;
    height: 64px;
    line-height: 64px;
    margin-top: 10px;
    font-size: 18px;
    color: #A1D8FF;
    font-weight: bold;
    background: url("~@/assets/images/regionalPrevention/list-item-bg.png") no-repeat
      center;
    background-size: 100% 100%;
    img {
      display: block;
      margin: 16px 10px 0;
      width: 25px;
      height: 31px;
    }
  }
}
</style>
