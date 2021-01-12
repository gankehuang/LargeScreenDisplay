<template>
  <InfoBlock
    title="处置人员"
  >
    <div
      slot="topRight"
      class="right-btns"
      @click="conversation"
    >
      <span>多人通话</span>
      <span>多人视屏</span>
    </div>
    <div class="container">
      <div
        v-for="(item, index) in departmentList"
        :key="index"
        class="content"
      >
        <div class="check">
          <img
            :ref="`img${index}`"
            class="check-image"
            data-status="0"
            :src="noCheck"
            @click="checkNode($event)"
          >
        </div>
        <div class="people-img">
          <img src="@/assets/images/commandAndDispatch/矩形 533@2x.png">
        </div>
        <div class="name">
          <p>
            {{ item.nickName }}<span class="status">在线</span><span
              class="trajectory"
              @click="peopleRow(item)"
            >轨迹</span>
          </p>
          <p>行政部</p>
          <p>12546987899</p>
        </div>
        <div class="phone">
          <div class="phone-box">
            <img src="@/assets/images/commandAndDispatch/电话.png">
            <p>电话</p>
          </div>
          <div class="phone-box">
            <img src="@/assets/images/commandAndDispatch/视频.png">
            <p>视频</p>
          </div>
        </div>
      </div>

      <!-- <div class="tree-container">
        <el-tree
          :data="departmentTree"
          default-expand-all
          accordion
        >
          <div
            slot-scope="{ node, data }"
            class="node"
          >
            <img
              v-if="node.isLeaf && node.level !== 1"
              class="img-device"
              :class="data.isOnline || 'inactive'"
              src="@/assets/images/commandAndDispatch/safe/device.png"
            >
            <span>{{ node.label }}</span>
            <img
              v-if="node.isLeaf && data.isOnline"
              src="@/assets/images/commandAndDispatch/safe/pos.png"
              class="img-right"
              @click="focusDevice(data.lon, data.lat)"
            >
          </div>
        </el-tree>
      </div> -->
    </div>
  </InfoBlock>
</template>

<script>
export default {
  props: {
    departmentList: {
      type: [Array],
      default: () => []
    }
  },
  data () {
    return {
      search: '',
      noCheck: require('@/assets/images/commandAndDispatch/椭圆 550@2x.png'),
      check: require('@/assets/images/commandAndDispatch/椭圆 550@2x (1).png'),
      checkStatus: ''
    }
  },
  computed: {
    departmentTree () {
      if (this.departmentList.length === 0) {
        return []
      }
      const list = this.departmentList.map(item => {
        return {
          label: item.nickName,
          isOnline: item.isOnline,
          lon: item.lon,
          lat: item.lat
        }
      })
      return [
        {
          label: '安源区',
          children: list
        }
      ]
    }
  },
  methods: {
    peopleRow (item) {
      this.$emit('peopleRow', item)
    },
    checkNode (event) {
      const status = event.target.getAttribute('data-status')
      if (status === '0') {
        event.target.setAttribute('src', this.check)
        event.target.setAttribute('data-status', 1)
        this.checkStatus = 1
      } else {
        event.target.setAttribute('src', this.noCheck)
        event.target.setAttribute('data-status', 0)
      }
    },
    conversation () {
      if (this.checkStatus === '') {
        this.$message.warning('未选择处置人员')
      }
    },
    nodeClick (data, node, list) {
      console.log(data, node, list)
    },
    focusDevice (lon, lat) {
      this.$emit('focusDevice', [lon, lat])
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/{
    .el-tree{
        background: none;
    }
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header, .content {
      width: 100%;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #D0DFFF;

      div {
        display: inline-block;
      }
      .check {
        width: 1%;
        vertical-align: top;
        .check-image{
          width: 16px;
          height: 16px;
          margin-left: -20px;
          margin-top: 27px;
          cursor: pointer;
        }
      }
      .people-img {
        width: 13%;

        img {
          width: 100%;
        }
      }
      .name {
        width: 55%;
        p {
          margin: 5px;

          .status {
            display: inline-block;
            width: 40px;
            height: 16px;
            font-size: 12px;
            text-align: center;
            line-height: 15px;
            color: #00FFAE;
            margin-left: 5px;
            background: url("~@/assets/images/commandAndDispatch/圆角矩形 551@2x.png") no-repeat;
            background-size: 100% 100%;
          }
          .trajectory {
             display: inline-block;
              width: 40px;
              height: 16px;
              font-size: 12px;
              text-align: center;
              line-height: 13px;
              color: #A1D8FF;
              margin-left: 5px;
              border: 1px solid #A1D8FF;
              border-radius: 16px;
          }
        }
      }
      .phone {
        width: 28%;
        vertical-align: top;
        float: right;
        .phone-box {
          width: 44px;
          height: 60px;
          background: rgba(0, 159, 251, 0.21);
          border: 1px solid #0072B4;
          border-radius: 8px;
          padding: 10px 0;
          margin-left: 5px;
          font-size: 12px;

          img {
            width: 18px;
            height: 18px;
            margin-left: 10px;
          }
          p {
            text-align: center;
            margin: 0;
          }
        }
      }
    }
    .content {
      padding-top: 8px;
      font-size: 16px;
      font-weight: 400;
      background: url("~@/assets/images/commandAndDispatch/矩形 596@2x.png") no-repeat;
      height: 86px;
      background-size: 100% 100%;
      margin-top: 10px;
      cursor: pointer;
    }
}
.right-btns {
      span {
        display: inline-block;
        width: 78px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background: rgba(0, 159, 251, 0.27);
        border: 1px solid #009FFB;
        border-radius: 4px;
        color: #D0DFFF;
        margin-left: 5px;
        cursor: pointer;
      }
}
</style>
