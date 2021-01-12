<template>
  <div class="page-right">
    <QuestionInfo />
    <LineInfo />
    <ListInfo />
  </div>
</template>

<script>
import QuestionInfo from './QuestionInfo'
import LineInfo from './LineInfo'
import ListInfo from './ListInfo'
export default {
  components: {
    QuestionInfo,
    LineInfo,
    ListInfo
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
