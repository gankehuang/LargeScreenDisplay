// 中部组件

import './styles.scss'
import { wordCloud } from './mock'
import WordCloundChart from '@/components/WordCloundChart/index'

export default {
  render () {
    return (
      <InfoBlockTwo title={'心理咨询高频词'} class={'middle-components-box'}>
        <WordCloundChart data={wordCloud} class={'top-info'} />
      </InfoBlockTwo>
    )
  }
}
