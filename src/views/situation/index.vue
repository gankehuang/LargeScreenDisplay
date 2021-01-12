<template>
  <div class="page-container">
    <CenterMap />
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <StabilityInvolved />
        <PublicSecurity />
        <TeachingTransfer />
      </div>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <RiskWarning />
        <GeneralAffairs />
        <GovernancePower />
      </div>
    </transition>

    <Dialog
      width="1200px"
      height="700px"
      :visible.sync="dialogVisible"
    />
  </div>
</template>
<script>
import StabilityInvolved from './StabilityInvolved'
import PublicSecurity from './PublicSecurity'
import TeachingTransfer from './TeachingTransfer'
import RiskWarning from './RiskWarning'
import GeneralAffairs from './GeneralAffairs'
import GovernancePower from './GovernancePower'
import CenterMap from './CenterMap'

export default {
  components: {
    StabilityInvolved,
    PublicSecurity,
    TeachingTransfer,
    RiskWarning,
    GeneralAffairs,
    GovernancePower,
    CenterMap
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
