<template>
  <div class="map-tabs">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="item"
      :class="{ 'item-selected': index === curIndex }"
      @click="handleTab(item, index)"
    >
      <img
        v-if="index === curIndex"
        :src="item.img"
      >
      <img
        v-else
        :src="item.img1"
      >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curIndex: 0,
      menuList: [
        {
          icon: 'mentalDisease',
          title: '精神障碍患者',
          name: '精神障碍',
          taskId: '925644860',
          img: require('@/assets/images/keyGroups/js-icon.png'),
          img1: require('@/assets/images/keyGroups/js-un-icon.png')
        },
        {
          icon: 'visitsPerson',
          title: '重点信访人员',
          name: '信访人员',
          taskId: '125687564',
          img: require('@/assets/images/keyGroups/xf-icon.png'),
          img1: require('@/assets/images/keyGroups/xf-un-icon.png')
        },
        {
          icon: 'retiredPersonnel',
          title: '退役重点人员',
          name: '退役人员',
          taskId: null,
          img: require('@/assets/images/keyGroups/ty-icon.png'),
          img1: require('@/assets/images/keyGroups/ty-un-icon.png')
        },
        {
          icon: 'releasePerson',
          title: '刑释解戒人员',
          name: '刑释解戒',
          taskId: '125557975',
          img: require('@/assets/images/keyGroups/xsjj-icon.png'),
          img1: require('@/assets/images/keyGroups/xsjj-un-icon.png')
        },
        {
          icon: 'correctPerson',
          title: '社区矫正人员',
          name: '社区矫正',
          taskId: '925731909',
          img: require('@/assets/images/keyGroups/sqjz-icon.png'),
          img1: require('@/assets/images/keyGroups/sqjz-un-icon.png')
        },
        {
          icon: 'keyYouth',
          title: '失意人员',
          name: '失意人员',
          taskId: '',
          img: require('@/assets/images/keyGroups/sy-icon.png'),
          img1: require('@/assets/images/keyGroups/sy-un-icon.png')
        }
      ]
    }
  },
  methods: {
    handleTab (item, index) {
      this.curIndex = index
      this.$emit('switchPage', {
        title: item.title
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-tabs {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 652px;
  height: 95px;
  background: url("~@/assets/images/keyGroups/map-opereate-bg.png") center center / 100%
    100% no-repeat;
  margin-bottom: 10px;
  display: flex;

  .item {
    flex: 1;
    cursor: pointer;
    text-align: center;
    line-height: 49px;
    color: #7dbcff;
    padding: 0 10px;
    img {
      display: block;
      width: 30px;
      height: 30px;
      margin: 15px auto 0;
    }
  }
  .item-selected {
    color: #fff;
  }
}
</style>
