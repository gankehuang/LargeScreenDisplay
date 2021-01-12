// 底部组件

import './styles.scss'

export default {
  render () {
    return (
      <InfoBlockTwo title={'心理健康活动'} class={'bottom-components-box'}>
        <template slot={'topRight'}>
          <div class={'bottom-title-button'}>
            {
              this.btnList.map((item, index) => (
                <div class={`${item.class} bottom-components-button-font`} onClick={($event) => this.checkClick($event, item)}>{item.name}</div>
              ))
            }
          </div>
        </template>

      </InfoBlockTwo>
    )
  },
  data () {
    return {
      btnList: [
        { name: '区级培训', class: 'active' },
        { name: '街道活动', class: '' }
      ]
    }
  },
  methods: {
    checkClick (event, item) {
      for (let i = 0; i < document.getElementsByClassName('bottom-components-button-font').length; i++) {
        document.getElementsByClassName('bottom-components-button-font')[i].className = 'bottom-components-button-font'
      }
      event.target.className += ' active'
    }
  }
}
