<template>
  <div class="thing">
    <div class="tabs">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="['tab',{ active:item.label===activeTab.label }]"
        @click="handleTab(item)"
      >{{ item.label }}</span>
    </div>
    <div
      v-if="activeTab.label!=='寄递物流'"
      class="tab-content"
    >
      <div
        v-for="(item,index) in selectedList"
        :key="index"
        class="data-item"
      >
        <img
          class="icon"
          :src="item.img"
        >
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
    <div
      v-else
      class="logistics-content"
    >
      <ul>
        <el-scrollbar style="height:170px">
          <li
            v-for="(item, index) in logisticsList"
            :key="index"
          >
            <div class="company-name">
              {{ item.name }}
            </div>
            <div
              class="type text-overflow"
              :title="item.type ? item.type : '其它'"
            >
              快递类型：{{ item.type ? item.type : "其它" }}
            </div>
            <div class="info">
              <span
                class="text-overflow"
                :title="item.addr"
              >
                <svg-icon
                  icon-class="location"
                  class="icon"
                />
                <span>{{ item.addr }}</span>
              </span>
            </div>
          </li>
        </el-scrollbar>
      </ul>
    </div>
  </div>
</template>

<script>
const initActiveTab = { label: '公共视频', seleArr: 'videoList' }
const initSelectedList = [
  {
    label: '一类点',
    num: 4582,
    img: require('@/assets/images/homepage/video-list(4).png')
  },
  {
    label: '二类点',
    num: 1218,
    img: require('@/assets/images/homepage/video-list(1).png')
  },
  {
    label: '三类点',
    num: 610,
    img: require('@/assets/images/homepage/video-list(3).png')
  },
  {
    label: '社会资源',
    num: 10333,
    img: require('@/assets/images/homepage/video-list(2).png')
  }
]
export default {
  data () {
    return {
      activeTab: initActiveTab,
      selectedList: initSelectedList,
      videoList: initSelectedList,
      trafficList: [
        {
          label: '客运车',
          num: 2004,
          img: require('@/assets/images/homepage/traffic-list(4).png')
        },
        {
          label: '危化品车',
          num: 67,
          img: require('@/assets/images/homepage/traffic-list(1).png')
        },
        {
          label: '中型货车',
          num: 2220,
          img: require('@/assets/images/homepage/traffic-list(2).png')
        },
        {
          label: '小型货车',
          num: 3829,
          img: require('@/assets/images/homepage/traffic-list(3).png')
        }
      ],
      facilitiesList: [
        {
          label: '消防设施',
          num: 7806,
          img: require('@/assets/images/homepage/traffic-list(4).png')
        },
        {
          label: '通信交接箱',
          num: 1768,
          img: require('@/assets/images/homepage/traffic-list(1).png')
        },
        {
          label: '充电桩',
          num: 229,
          img: require('@/assets/images/homepage/traffic-list(2).png')
        },
        {
          label: '变电站',
          num: 12,
          img: require('@/assets/images/homepage/traffic-list(3).png')
        }
      ],
      logisticsList: [
        {
          name: '海航天天快递',
          addr: '江西省新建县长堎开发区工业三路（恒通电子）'
        },
        {
          name: '海航天天快递',
          addr: '江西省新建县长堎开发区工业三路（恒通电子）'
        },
        {
          name: '海航天天快递',
          addr: '江西省新建县长堎开发区工业三路（恒通电子）'
        }, {
          name: '海航天天快递',
          addr: '江西省新建县长堎开发区工业三路（恒通电子）'
        }
      ],
      tabs: [
        {
          label: '公共视频',
          seleArr: 'videoList'
        },
        {
          label: '公共交通',
          seleArr: 'trafficList'
        },
        {
          label: '公共设施',
          seleArr: 'facilitiesList'
        },
        {
          label: '寄递物流',
          seleArr: 'logistics'
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
.thing {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
.tabs {
  position: fixed;
  z-index: 1000;
  top: 120px;
  right: 10px;
  width: 400px;
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
  display: flex;
  margin-top: 50px;
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
.logistics-content {
  width: 100%;
  margin-top: 50px;

  /deep/.el-scrollbar__wrap {
    overflow: hidden;
  }

  ul {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  li {
    width: 100%;
    height: 56px;
    padding: 0 10px;
    margin-bottom: 10px;
    background-color: rgba(76, 145, 231, 0.2);
    .company-name {
      display: inline-block;
      color: #ffffff;
      line-height: 32px;
      margin-right: 100px;
    }
    .type {
      display: inline-block;
      color: #a1d8ff;
    }

    .icon {
      color: '#3497FB';
      font-size: 12px;
    }
    .info {
      color: #3497fb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      span:nth-of-type(1) {
        text-align: left;
      }
    }
  }
}
</style>
