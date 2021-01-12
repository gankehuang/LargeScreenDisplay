<template>
  <div class="event-classfiy">
    <div class="content">
      <div
        v-for="(item, index) in nameList"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.name }}</span>
        <div style="flex: 0 0 calc(100% - 70px);display:flex;">
          <el-progress
            :style="{ width: getwidthList(item) + 'px' }"
            :text-inside="true"
            :stroke-width="18"
            :title="getPercentage(item) + '%'"
            :percentage="getPercentage(item)"
            color="#3B9AFE"
          />
          <span class="item-total">{{ item.all }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameList: [
        {
          name: '城市管理',
          all: 206,
          isProcess: 198
        },
        {
          name: '矛盾纠纷',
          all: 184,
          isProcess: 180
        },
        {
          name: '城市建设',
          all: 79,
          isProcess: 70
        },
        {
          name: '生活服务',
          all: 66,
          isProcess: 60
        },
        {
          name: '公共服务',
          all: 54,
          isProcess: 51
        },
        {
          name: '社会保障',
          all: 30,
          isProcess: 25
        },
        {
          name: '环境保护',
          all: 8,
          isProcess: 7
        },
        {
          name: '隐藏排查',
          all: 5,
          isProcess: 4
        },
        {
          name: '法律服务',
          all: 5,
          isProcess: 4
        }
      ]
    }
  },
  methods: {
    getPercentage (item) {
      return Number(((item.isProcess / item.all) * 100).toFixed(2))
    },
    getwidthList (item) {
      return parseInt((item.all / 700) * 10 * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.event-classfiy {
  position: relative;
  // padding: 30px 30px 10px 20px;
  .content {
    width: 100%;
    height: calc(100% - 20px);
  }
  .el-progress {
    width: 100%;
    display: inline-block;
  }
  /deep/.el-progress-bar__innerText {
    font-weight: bold;
  }
  /deep/.el-progress-bar__outer {
    background: #a9daff;
  }
  .list-item {
    display: flex;
    margin-bottom: 8px;
    .item-name {
      color: #fff;
      flex: 0 0 70px;
    }
    .item-total {
      color: #fff;
      margin-left: 10px;
      text-align: right;
    }
  }
}
</style>
