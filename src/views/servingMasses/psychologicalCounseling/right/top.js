// 上部组件

import './styles.scss'
import { dataList } from './mock'

export default {
  render () {
    return (
      <InfoBlockTwo title={'心理问题类型'} class={'top-components-box'}>
        <div class={'top-info top-info-background'}>
          <v-chart options={this.options} />
          <span class={'tip'}>问题类型</span>
        </div>
      </InfoBlockTwo>
    )
  },
  data () {
    return {

    }
  },
  computed: {
    options () {
      return {
        color: ['#12ECFA', '#12A6FB', '#125FFB', '#FFEA00', '#10DC92'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'square',
          right: 10,
          top: 10,
          height: 130,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          // data: ['生产经营单位', '经营单位(带存储)', '经营单位(不带存储)', '使用单位', '加油站'],
          formatter: (name) => {
            return name
          }
        },
        series: [
          {
            name: '信访个数',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
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
            data: dataList
          }
        ]
      }
    }
  }
}
