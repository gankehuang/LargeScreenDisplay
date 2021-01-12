<template>
  <InfoBlock
    title="重点场所"
    height="234px"
  >
    <div class="buttons">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="['button', {'active':active === index} ]"
        @click="changeIcon(index)"
      >
        <div>
          <svg-icon
            :icon-class="item.icon"
            class="svg-icon"
          />
          {{ item.name }}
        </div>
        {{ item.count }}
      </div>
    </div>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      active: 7,
      list: [
        {
          name: '学校',
          icon: 'school',
          count: 268
        },
        {
          name: '医院',
          icon: 'hospital',
          count: 211
        },
        {
          name: '加油站',
          icon: 'getGasStation',
          count: 162
        },
        {
          name: '燃气站',
          icon: 'gasStation',
          count: 25
        },
        {
          name: '建筑工地',
          icon: 'building',
          count: 257
        },
        {
          name: '过江大桥',
          icon: 'bridge',
          count: 5
        }
      ]
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
    changeIcon (index) {
      this.active = index
      this.$emit('changeIcon', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  // padding: 18px 22px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .button {
    display: flex;
    width: 185px;
    height: 45px;
    line-height: 45px;
    margin-top: 10px;
    padding-right: 10px;
    font-size: 18px;
    color: #fff;
    background: url("~@/assets/images/regionalPrevention/place-bg.png") no-repeat
      center;
    background-size: 100% 100%;
    cursor: pointer;
    div {
      flex: 1;
      color: #A1D8FF;
    }
    .svg-icon {
      margin-left: 10px;
    }
  }
  .active {
    background: url("~@/assets/images/regionalPrevention/place-bg-active.png") no-repeat
      center;
    background-size: 100% 100%;
    div {
      color: #fff;
    }
  }
}
</style>
