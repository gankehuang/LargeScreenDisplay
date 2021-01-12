<template>
  <div
    class="head-box"
    :style="isHomepage ? homepageSty : otherSty"
  >
    <div class="left-block">
      <template v-if="!isHomepage">
        <i class="title-icon" />
        <h6
          class="small-title"
          @click="routeBack"
        >
          {{ smallTitle.split('-')[smallTitle.split('-').length - 1] }}
        </h6>
      </template>
      <template v-else>
        <i class="title-icon" />
        <h6 class="small-title">
          省级平台
        </h6>
        <i class="title-icon" />
        <h6 class="small-title">
          市级平台
        </h6>
      </template>
    </div>

    <h1 class="project-title">
      安源区社会治理实战应用平台
    </h1>

    <div class="right-block">
      <div class="operate-item item-search" />
      <div
        v-clickoutside="handleClose"
        class="operate-item item-menu"
        @click="toggleMenu"
      >
        <div
          v-if="isShowMenu"
          class="down-menu"
        >
          <div
            class="menu-item"
            :class="{ active: currentMenu === '退出' }"
            @click="handleMenuItem('退出')"
          >
            <svg-icon
              icon-class="close-btn"
              class="svg-icon"
            />
            退出
          </div>
        </div>
      </div>
      <div
        v-if="!isHomepage"
        class="operate-item item-home"
        @click="routeHome"
      />
    </div>

    <HomeNav v-if="isHomepage" />
  </div>
</template>
<script>
import HomeNav from './HomeNav'
export default {
  components: {
    HomeNav
  },
  data () {
    return {
      smallTitle: '',
      isHomepage: true,
      isShowMenu: false,
      currentMenu: ''
    }
  },
  computed: {
    homepageSty () {
      return {
        height: '130px',
        background: `url(${require('@/assets/images/homepage/top.png')}) center center / 100% 100% no-repeat`
      }
    },
    otherSty () {
      return {
        height: '62px',
        background: `url(${require('@/assets/images/layout/head-nav-bg.png')}) center center / 100% 100% no-repeat`
      }
    }
  },
  watch: {
    $route: {
      handler (newVal) {
        newVal.path === '/homepage/index' ? this.isHomepage = true : this.isHomepage = false
        const title = newVal.meta.title
        this.smallTitle = newVal.meta.title ? title.split('-')[0] : '-'
      },
      immediate: true
    }
  },
  methods: {
    routeHome () {
      this.$router.push('/homepage/index')
      if (sessionStorage.getItem('curChildName')) {
        sessionStorage.removeItem('curChildName')
      }
    },
    routeBack () {
      if (!this.$route.path.includes('index')) {
        const firstPath = this.$route.path.split('/')[1]
        this.$router.push(`/${firstPath}/index`)
      }
    },
    toggleMenu () {
      this.isShowMenu = !this.isShowMenu
    },
    handleClose () {
      this.isShowMenu = false
    },
    handleMenuItem (menuType) {
      if (menuType === '退出') {
        this.$store.dispatch('user/logout')
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.head-box {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;

  .project-title {
    text-align: center;
    letter-spacing: 2px;
    color: #ddeaff;
    font-size: 28px;
    font-weight: 600;
  }

  .left-block {
    position: absolute;
    left: 20px;
    top: 28px;
    display: flex;
    align-items: center;
    .title-icon {
      width: 22px;
      height: 22px;
      margin-right: 10px;
      background: url('~@/assets/images/layout/title-icon.png') no-repeat;
      background-size: 100% 100%;
    }
    .small-title {
      margin: 0;
      margin-right: 20px;
      font-size: 18px;
      font-weight: bolder;
      background-image: linear-gradient(0deg, #72bdff 0%, #f1feff 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .right-block {
    position: absolute;
    right: 20px;
    top: 23px;
    .operate-item {
      width: 26px;
      height: 26px;
      display: inline-block;
      margin-left: 20px;
      cursor: pointer;
      &.item-search {
        background: url('~@/assets/images/layout/search-icon.png') no-repeat;
        background-size: 100% 100%;
      }
      &.item-menu {
        position: relative;
        background: url('~@/assets/images/layout/menu-icon.png') no-repeat;
        background-size: 100% 100%;
        .down-menu {
          position: absolute;
          left: -120px;
          top: 40px;
          z-index: 99;
          background-color: #00285b;
          width: 150px;
          color: #a1d0ff;
          border-radius: 10px;
          .menu-item {
            height: 50px;
            line-height: 50px;
            text-align: center;
            &:hover {
              background-color: #084495;
            }

            &.active {
              background-color: #084495;
            }
            .svg-icon {
              margin-right: 10px;
            }
          }
        }
      }
      &.item-home {
        background: url('~@/assets/images/layout/home-icon.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
