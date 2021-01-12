<template>
  <InfoBlock
    title="关爱小组配备情况"
    height="565px"
    :bg-url="require('@/assets/images/common/info-middle-block-bg.png')"
  >
    <template v-slot:topRight>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ level }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in levelList"
            :key="index"
            @click.native="tabLevel(item.name, index)"
          >
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>

    <div class="list-container">
      <div
        v-for="(item, index) in objList"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.name }}</span>
        <div class="item-progress">
          <el-progress
            :style="{ width: getWidth(item.totalNum) + '%' }"
            :text-inside="true"
            :stroke-width="15"
            :percentage="getPercentage(item.num, item.totalNum)"
          />
          <span class="item-total">{{ item.totalNum }}</span>
        </div>
      </div>
    </div>

    <div class="legand-box">
      <div class="item-legand">
        <span class="item-dot" />
        <span>已配备</span>
      </div>
      <div class="item-legand">
        <span class="item-dot" />
        <span>应配备</span>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      objList: [],
      level: '法定监护人',
      levelList: [{
        name: '法定监护人',
        list: []
      }, {
        name: '精防人员',
        list: []
      }, {
        name: '社区干部',
        list: []
      }, {
        name: '社区民警',
        list: []
      }]
    }
  },
  created () {
    this.levelList.forEach(item => {
      item.list = this._getRandomList()
    })
    this.objList = this.levelList[0].list
  },
  methods: {
    _sum (m, n) {
      return Math.floor(Math.random() * (m - n) + n)
    },
    getPercentage (num, totalCount) {
      return Number((num / totalCount * 100).toFixed(2))
    },
    getWidth (totalCount) {
      const totalNum = this.objList.map(item => item.totalNum)
      const maxNum = Math.max.apply(null, totalNum)
      return Number((totalCount / maxNum * 100).toFixed(2))
    },
    _getRandomList () {
      const needList = []
      const nameList = [
        '凤凰街道',
        '八一街道',
        '后埠街道',
        '丹江街道',
        '东大街道',
        '白源街道',
        '安源镇',
        '高坑镇',
        '五陂镇',
        '青山镇',
        '城郊管委会'
      ]
      for (let i = 0; i < 11; i++) {
        const num = this._sum(200, 370)
        const totalNum = this._sum(180, 400)
        needList.push({
          name: nameList[i],
          num,
          totalNum: totalNum < num ? num + 20 : totalNum
        })
      }

      return needList.sort(this._compare('totalNum'))
    },
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value2 - value1
      }
    },
    tabLevel (item, index) {
      this.level = item
      this.objList = this.levelList[index].list
      switch (this.level) {
        case '法定监护人':
          break
        case '精防人员':
          break
        case '社区干部':
          break
        case '社区民警':
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: inline-block;
  width: 110px;
  line-height: 31px;
  text-align: center;
  font-size: 12px;
  color: #b2d9fb;
  background: url("~@/assets/images/keyGroups/button-bg.png") no-repeat
  center;
  background-size: 100% 100%;
  cursor: pointer;
}

.list-container {
  width: 100%;
  margin-top: 20px;
  .list-item {
    display: flex;
    margin-bottom: 20px;
    .item-name {
      color: #fff;
      flex: 0 0 85px;
    }

    .item-progress {
      display: flex;
      flex: 0 0 calc(100% - 100px);
      ::v-deep .el-progress-bar__inner {
        background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__outer {
        background-color: #0075AB;
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__innerText {
        color: #031C3C;
      }
    }

    .item-total {
      margin-left: 13px;
      color: #FEFFFF;
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
  }
}

.legand-box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  .item-legand {
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    margin-right: 15px;
    .item-dot {
      margin-right: 8px;
      width: 8px;
      height: 8px;
      background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
    }

    &:last-child {
      .item-dot {
        background: #0075AB;
      }
    }
  }
}

</style>
