<template>
  <Container>
    <NavTabs
      :nav-list="navTabsList"
      :active-index="1"
    />
    <template v-slot:pageLeft>
      <TimeNode />
      <PsychologyTotal />
      <SubjectAnalysis />
      <PsychologicalCases />
    </template>
    <template v-slot:pageCenter />
    <template v-slot:pageRight>
      <Right />
    </template>
  </Container>
</template>
<script>
import navTabsMixin from '../navTabsMixin'
import TimeNode from './left/TimeNode'
import PsychologyTotal from './left/PsychologyTotal'
import SubjectAnalysis from './left/SubjectAnalysis'
import PsychologicalCases from './left/PsychologicalCases'
import Right from './right/right'
export default {
  components: {
    TimeNode,
    PsychologyTotal,
    SubjectAnalysis,
    PsychologicalCases,
    Right
  },
  mixins: [navTabsMixin],
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  background-color: #021133;
}
::v-deep .page-center {
  margin-top: 50px;
  height: calc(100% - 50px);
}
</style>
