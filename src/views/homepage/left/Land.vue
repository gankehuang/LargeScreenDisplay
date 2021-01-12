<template>
  <div class="sit-land">
    <div class="tabs">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="['tab',{ active:item.label===activeTab.label }]"
        @click="handleTab(item)"
      >{{ item.label }}</span>
    </div>
    <div class="tab-content">
      <div
        v-for="(item,index) in selectedList"
        :key="index"
        class="data-item"
      >
        <div class="icon" />
        <div class="info">
          <div class="label">
            {{ item.label }}
          </div>
          <div class="num">
            {{ item.num }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const initActiveTab = { label: '实有房屋', seleArr: 'houseList' }
const initSelectedList = [
  {
    label: '房屋总数',
    num: 389304
  },
  {
    label: '出租房',
    num: 42641
  },
  {
    label: '小区总数',
    num: 2611
  },
  {
    label: '楼房总数',
    num: 37800
  }
]
export default {
  data () {
    return {
      activeTab: initActiveTab,
      selectedList: initSelectedList,
      houseList: initSelectedList,
      keyPlaceList: [
        {
          label: '学校',
          num: 150
        },
        {
          label: '医院',
          num: 50
        },
        {
          label: '加油站',
          num: 7
        },
        {
          label: '旅游景点',
          num: 36
        }
      ],
      premisesList: [
        {
          label: '宾馆',
          num: 52
        },
        {
          label: '网吧',
          num: 75
        },
        {
          label: 'KTV',
          num: 12
        },
        {
          label: '九小场所',
          num: 0
        }
      ],
      publicPlaceList: [
        {
          label: '火车站',
          num: 1
        },
        {
          label: '公交车站',
          num: 102
        },
        {
          label: '汽车站',
          num: 4
        },
        {
          label: '机场',
          num: 0
        }
      ],
      tabs: [
        {
          label: '实有房屋',
          seleArr: 'houseList'
        },
        {
          label: '重点场所',
          seleArr: 'keyPlaceList'
        },
        {
          label: '经营场所',
          seleArr: 'premisesList'
        },
        {
          label: '公共场所',
          seleArr: 'publicPlaceList'
        }
      ]
    }
  },
  methods: {
    handleTab (tab) {
      this.activeTab = tab
      this.selectedList = this[tab.seleArr]
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-land {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
.tabs {
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab {
  cursor: pointer;
  position: relative;
  width: 25%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a1d8ff;
  line-height: 28px;
  padding-bottom: 10px;
}
.tab.active {
  color: #ffffff;
  border-bottom: 1px solid #0093f0;

  &::after {
    content: '';
    position: absolute;
    top: 30px;
    left: 40px;
    display: block;
    width: 13px;
    height: 8px;
    background: url('~@/assets/images/homepage/situation(1).png') center center /
      100% 100% no-repeat;
  }
}
.tab-content {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.data-item {
  width: 50%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  .icon {
    width: 42px;
    height: 42px;
    margin-right: 15px;
    background: url('~@/assets/images/homepage/situation(3).png') center center /
      100% 100%;
  }
  .info {
    .label {
      font-size: 16px;
      line-height: 28px;
      color: #a1d8ff;
    }
    .num {
      font-size: 16px;
      line-height: 28px;
      color: #fff;
    }
  }
}
</style>
