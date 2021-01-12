<template>
  <div class="rank-tabs">
    <div class="btn-box">
      <div class="left-top-btn">
        <el-dropdown
          trigger="click"
          placement="bottom"
        >
          <span class="el-dropdown-link">
            {{ btnOneValue }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in btnOneList"
              :key="index"
              @click.native="dropMenuOne(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        v-if="showTwoBtn"
        class="left-top-btn"
        style="marginLeft: 10px"
      >
        <el-dropdown
          trigger="click"
          placement="bottom"
        >
          <span class="el-dropdown-link">
            {{ btnTwoValue }}年
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in btnTwoList"
              :key="index"
              @click.native="dropMenuTwo(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        v-if="showTwoBtn"
        class="left-top-btn"
        style="marginLeft: 10px"
      >
        <el-dropdown
          trigger="click"
          placement="bottom"
        >
          <span class="el-dropdown-link">
            {{ btnThreeValue }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 96px;"
          >
            <el-dropdown-item
              v-for="(item, index) in btnThreeList"
              :key="index"
              @click.native="dropMenuThree(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      btnOneValue: '截止当前',
      btnOneList: ['截止当前', '按年份', '按季度'],
      btnTwoValue: '2021',
      btnTwoList: ['2021', '2020', '2019', '2018', '2017'],
      btnThreeValue: '全年',
      btnThreeList: [],
      showTwoBtn: false
    }
  },
  methods: {
    dropMenuOne: function (str) {
      this.btnOneValue = str
      this.btnTwoValue = new Date().getFullYear().toString()
      this.showTwoBtn = true
      this.btnThreeList = this.handleList(str)
      this.btnThreeValue = '全年'
      if (str === '截止当前') {
        this.btnOneValue = str
        this.showTwoBtn = false
      }
    },
    dropMenuTwo: function (str) {
      this.btnTwoValue = str
      this.btnThreeList = this.handleList(this.btnOneValue)
      this.btnThreeValue = '全年'
    },
    dropMenuThree: function (str) {
      this.btnThreeValue = str
    },

    // 处理 btnThreeList 的数据
    handleList: function (str) {
      let mid = []
      if (str === '按年份') {
        if (this.btnTwoValue === new Date().getFullYear().toString()) {
          for (let i = 1; i <= new Date().getMonth() + 1; i++) {
            mid.push(`${i}月`)
          }
        } else {
          mid = Array.apply(null, { length: 12 }).map((_, index) => `${index + 1}月`)
        }
      }

      if (str === '按季度') {
        if (this.btnTwoValue === new Date().getFullYear().toString()) {
          mid = Array.apply(null, { length: Math.ceil((new Date().getMonth() + 1) % 4) }).map((_, index) => `第${index + 1}季度`)
        } else {
          mid = Array.apply(null, { length: 4 }).map((_, index) => `第${index + 1}季度`)
        }
      }

      return mid
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-tabs {
  width: 100%;
}

.btn-box {
  width: 100%;
  display: flex;

  .left-top-btn {
    width: 120px;
    height: 30px;
    color: #ffffff;
    background: url('~@/assets/images/interviewAnalysis/left-btn-bg.png')
      no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .el-dropdown-width {
      width: 80px;
    }
  }
}

.btn-box,
.left-top-btn,
span {
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
}
</style>
