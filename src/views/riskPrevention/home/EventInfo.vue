<template>
  <InfoBlock
    title="预警列表"
    height="495px"
  >
    <div class="search-box">
      <el-input
        v-model="searchForm.eventName"
        placeholder="关键字"
        class="input-with-select"
      >
        <el-select
          slot="prepend"
          v-model="searchForm.status"
          placeholder="请选择"
          class="select-style"
        >
          <el-option
            label="全部"
            value=""
          />
          <el-option
            label="未受理"
            value="1"
          />
          <el-option
            label="已派发"
            value="2"
          />
          <el-option
            label="超时"
            value="4"
          />
          <el-option
            label="催单"
            value="5"
          />
        </el-select>
      </el-input>
      <svg-icon
        icon-class="search"
        class="svg-icon"
        @click="searchBtn"
      />
    </div>
    <div class="event-list">
      <div
        v-for="(item, index) in renderList"
        :key="index"
        class="item"
      >
        <div class="status_btn">
          {{ item.statusText }}
        </div>
        <div class="img">
          <el-image
            v-if="item.eventCode === '62053'"
            lazy
            :src="
              item.snapBakUrl
                ? item.snapBakUrl
                : item.snapImageUrl
                  ? item.snapImageUrl
                  : require('@/assets/images/common/no-avatar.png')
            "
            :preview-src-list="[
              item.snapBakUrl
                ? item.snapBakUrl
                : item.snapImageUrl
                  ? item.snapImageUrl
                  : require('@/assets/images/common/no-avatar.png')
            ]"
          />
          <CustomImage
            v-else
            lazy
            :src="
              item.snapBakUrl
                ? item.snapBakUrl
                : item.snapImageUrl
                  ? item.snapImageUrl
                  : require('@/assets/images/common/no-avatar.png')
            "
            :preview-src-list="[
              item.snapBakUrl
                ? item.snapBakUrl
                : item.snapImageUrl
                  ? item.snapImageUrl
                  : require('@/assets/images/common/no-avatar.png')
            ]"
          />
        </div>
        <div
          v-if="item.eventName === '人员布控告警'"
          class="info"
          @click="todetails(item)"
        >
          <div class="line1">
            <span>{{ item.peopleName | hideName }}{{ item.peopleLabel }}布控</span>
          </div>
          <div
            class="detail"
            style="width: 240px;"
            :title="item.address"
          >
            {{ item.address }}
          </div>
          <div
            class="detail"
            style="width: 240px;"
          >
            {{ item.date }}
          </div>
        </div>
        <div
          v-else
          class="info"
          @click="todetails(item)"
        >
          <div class="line1">
            <span>{{ item.name }}</span>
          </div>
          <div
            class="detail"
            style="width: 240px;"
            :title="item.address"
          >
            {{ item.address }}
          </div>
          <div
            class="detail"
            style="width: 240px;"
          >
            {{ item.date }}
          </div>
        </div>
        <img
          src="@/assets/images/common/position-icon.png"
          class="position"
          @click.stop="focusEvent(item)"
        >
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { getEventArr } from '@/api/common/event'
const enumEventStatus = {
  1: '未受理',
  2: '已派发',
  3: '已处置',
  4: '超时',
  5: '催单',
  6: '已归档'
}

export default {
  data () {
    return {
      list: [],
      renderList: [],
      searchForm: {
        status: '',
        eventName: '',
        excludeEventCodeList: 'supervise'
      },
      tab: 0
    }
  },
  created () {
    this.getAllEventList()
  },
  methods: {
    changeTab (index) {
      this.tab = index
    },
    focusEvent (item) {
      this.$emit('focusEvent', item)
    },
    todetails (item) {
      this.$emit('todetails', item)
    },
    getAllEventList () {
      getEventArr(this.searchForm).then(res => {
        this.list = res.data
          .filter(
            item =>
              item.longitude &&
              item.latitude &&
              item.statusText !== '已处置' &&
              item.statusText !== '已归档' &&
              item.peopleLabel !== '退役人员'
          )
          .map((item, index) => {
            return {
              ...item,
              status: enumEventStatus[item.status],
              name: item.eventName,
              date: item.happenedTime,
              peopleName: item.peopleName,
              peopleLabel: item.peopleLabel,
              detail: item.eventName + '预警，请及时处理！',
              address: item.location,
              position: [item.longitude, item.latitude],
              source: item.source,
              longitude: item.longitude,
              latitude: item.latitude,
              id: item.id,
              snapImageUrl: item.snapImageUrl
            }
          })

        this.renderList = toRepeat(this.list, 'deviceSerialNo')
        function toRepeat (arr, key) {
          const res = new Map()
          return arr.filter(
            list => !res.has(list[key]) && res.set(list[key], 1)
          )
        }
      })
    },
    eventNum (status) {
      if (this.list.length) {
        return this.list.filter(item => item.status === status).length
      }
    },
    searchBtn () {
      this.getAllEventList()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 420px;
  height: 495px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 30px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}
.type-list {
  margin-top: 58px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  .item {
    width: 76px;
    height: 72px;
    color: #fff;
    text-align: center;
    border: 1px solid transparent;
    cursor: pointer;
    &.selected {
      border: 1px solid #0ff;
    }
    .dd {
      font-size: 18px;
      margin-top: 12px;
      font-weight: bold;
    }
    .dt {
      font-size: 12px;
      margin-top: 5px;
    }
    &:nth-of-type(1) {
      background-color: #eb6877;
    }
    &:nth-of-type(2) {
      background-color: #f8b551;
    }
    &:nth-of-type(3) {
      background-color: #199ccb;
    }
    &:nth-of-type(4) {
      background-color: #89c997;
    }
    &:nth-of-type(5) {
      background-color: #9b78ff;
    }
    &:nth-of-type(6) {
      background-color: #458eff;
    }
  }
}
.search-box {
  position: relative;
  margin: 10px auto;
  width: 379px;
  height: 36px;
  background: url('~@/assets/images/riskPreventionHome/special-search-bg.png')
    no-repeat center center;
  background-size: 100% 100%;
  /deep/ .input-with-select {
    background: rgba(0, 0, 0, 0);
    border: 0;
    border-radius: 10px;
  }
  /deep/ .el-select .el-input {
    width: 100px;
    font-size: 14px;
    color: #fff;
  }
  /deep/ .el-input__inner {
    font-size: 14px;
    height: 36px !important;
    line-height: 36px !important;
    border: none;
    background: rgba(0, 0, 0, 0);
    color: #fff;
  }
  /deep/ .el-input-group__prepend {
    border-radius: 10px 0 0 10px;
    background: rgba(0, 0, 0, 0);
    border: none;
  }
  .svg-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: #2971c2;
    cursor: pointer;
  }
}
.event-list {
  height: calc(100% - 60px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .item {
    width: 379px;
    height: 82px;
    background: url('~@/assets/images/riskPreventionHome/item-bg.png') no-repeat center;
    background-size: 100% 100%;
    margin: 10px auto;
    position: relative;
    display: flex;
    cursor: pointer;
    .status_btn {
      position: absolute;
      top: 6px;
      right: 10px;
      width: 67px;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      text-align: center;
      background: #3498fb;
      border-radius: 8px;
      color: #ffffff;
    }
    .img {
      width: 90px;
      height: 80px;
      .el-image {
        width: 90px;
        height: 80px;
      }
    }
    .info {
      margin-left: 11px;
      padding-left: 10px;
      padding-right: 10px;
      flex-grow: 1;
      position: relative;
      .line1 {
        color: #ffffff;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
      }
      .detail {
        color: #b2e3fc;
        margin-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .position {
      position: absolute;
      width: 16px;
      height: 20px;
      bottom: 12px;
      right: 20px;
      cursor: pointer;
    }
    .warn {
      display: inline-block;
      margin-left: 10px;
      width: 56px;
      line-height: 18px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      background: #eb6877;
      border-radius: 6px;
    }
  }
}
</style>
