<template>
  <div class="container">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="2"
    />
    <div class="center">
      <Left />
      <div class="center-center">
        <Center />
      </div>
      <Right />
    </div>
  </div>
</template>

<script>
import navTabsMixin from '@/views/scienceToPolicy/mixin/navTabsMixin'
import Left from './left'
import Center from './center'
import Right from './right'
export default {
  components: {
    Left,
    Center,
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
.container {
  width: 100%;
  height: 100%;
  padding-top: 85px;
  background: rgb(2, 17, 51);
  .center {
    height: 100%;
    display: flex;

    .center-center {
      padding-top: 52px;
      width: 52%;
    }
  }
}
</style>
