<template>
  <div class="page-container">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />
    <Tab @bindSelect="bindSelect" />
    <PersonnelControl v-show="navStatus===1" />
    <VehicleControl v-show="navStatus===2" />
  </div>
</template>

<script>
import navTabsMixin from '../../mixin/navTabsMixin'
import Tab from './Tab'
import PersonnelControl from './PersonnelControl'
import VehicleControl from './VehicleControl'
export default {
  components: {
    Tab,
    PersonnelControl,
    VehicleControl
  },
  mixins: [navTabsMixin],
  data () {
    return {
      navStatus: 1
    }
  },
  methods: {
    navChange (val) {
      this.navStatus = val
    },
    bindSelect (val) {
      this.navStatus = val
    }
  }
}
</script>
<style lang="scss" scoped>
.nav{
  position: absolute;
  top: 100px;
  width: 94%;
  height: 36px;
  margin: 20px 50px;
  border-bottom: 2px solid #13476A;

  .nav-item {
    display: inline-block;
    text-align: center;
    height: 50px;
    vertical-align: top;
    color: #ffffff;
    cursor: pointer;

    p{
      width: 120px;
      height: 36px;
      margin: 0;
      line-height: 36px;
      text-align: center;
      background-color: #243142;
    }
    .img-box{
      width: 100px;

      img {
        width: 20px;
      }
    }

  }
}
.select{
  background-color: #0893DC !important;
}
</style>
