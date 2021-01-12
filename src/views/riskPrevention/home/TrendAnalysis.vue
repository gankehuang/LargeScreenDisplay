<template>
  <InfoBlock
    title="事件分布"
    height="470px"
  >
    <div class="list-container">
      <div
        v-for="(item, index) in objList"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.regionCode }}</span>
        <div class="item-progress">
          <el-progress
            :style="{ width: getWidth(item.totalCount) + '%' }"
            :text-inside="true"
            :stroke-width="15"
            :percentage="getPercentage(item.unProcessedCount, item.totalCount)"
          />
          <span class="item-total">{{ item.totalCount }}</span>
        </div>
      </div>
    </div>

    <div class="legand-box">
      <div class="item-legand">
        <span class="item-dot" />
        <span>已完成</span>
      </div>
      <div class="item-legand">
        <span class="item-dot" />
        <span>应完成</span>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { countEventByRegion } from '@/api/common/event'
export default {
  data () {
    return {
      objList: []
    }
  },
  created () {
    this.countEventByRegion()
  },
  methods: {
    getPercentage (unProcessedCount, totalCount) {
      return Number((unProcessedCount / totalCount * 100).toFixed(2))
    },
    countEventByRegion () {
      countEventByRegion().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.objList = data.sort((a, b) => {
            return b.totalCount - a.totalCount
          })
        }
      })
    },
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    },
    getWidth (totalCount) {
      const totalNum = this.objList.map(item => item.totalCount)
      const maxNum = Math.max.apply(null, totalNum)
      return Number((totalCount / maxNum * 100).toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-progress-bar__inner {
  background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
  border-radius: 0;
}
::v-deep .el-progress-bar__outer {
  background-color: #0075AB;
  border-radius: 0;
}

.list-container {
  margin-top: 10px;
  .list-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .item-name {
      color: #A1D8FF;
      flex: 0 0 100px;
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
  bottom: 10px;
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
