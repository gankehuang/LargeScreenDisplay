<template>
  <Container>
    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />
    <template v-slot:pageLeft>
      <EventSurvey />
      <EventSource />
      <EventType />
    </template>
    <template v-slot:pageCenter>
      <ChainRank />
      <EventRank />
    </template>
    <template v-slot:pageRight>
      <ProblemRank />
      <EventHandleRank />
      <RealTimeEvent />
    </template>
  </Container>
</template>
<script>
import navTabsMixin from '../navTabsMixin'
import EventSurvey from './left/EventSurvey'
import EventSource from './left/EventSource'
import EventType from './left/EventType'
import ProblemRank from './right/ProblemRank'
import EventHandleRank from './right/EventHandleRank'
import RealTimeEvent from './right/RealTimeEvent'
import ChainRank from './pageCenter/ChainRank'
import EventRank from './pageCenter/EventRank'
export default {
  components: {
    EventSurvey,
    EventSource,
    EventType,
    ProblemRank,
    EventHandleRank,
    RealTimeEvent,
    ChainRank,
    EventRank
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
