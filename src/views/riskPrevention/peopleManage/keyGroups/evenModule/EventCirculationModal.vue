<template>
  <div class="mask-container">
    <div class="mask" />
    <div class="modal">
      <img
        class="btn-close"
        src="@/assets/images/common/close-btn.png"
        @click="bindBtnClose"
      >
      <div class="title">
        {{ modalTitle }}
      </div>
      <div class="body">
        <div class="content1">
          <el-scrollbar style="height:100%;">
            <el-tree
              ref="tree"
              :data="groupList"
              :expand-on-click-node="false"
              show-checkbox
              accordion
              :default-expanded-keys="['网格员']"
              node-key="id"
              :default-expand-all="modalTitle === '事件上报'"
              @check="bindTreeCheck"
            >
              <div
                slot-scope="{ node, data }"
                class="node"
              >
                <img
                  v-if="node.isLeaf"
                  class="img-device"
                  :class="data.active || 'inactive'"
                  src="@/assets/images/events/device.png"
                >
                <span>{{ node.label }} {{ data.phone ? "-" + data.phone : "" }}</span>
              </div>
            </el-tree>
          </el-scrollbar>
        </div>
        <div class="content2 checked">
          <el-scrollbar style="height:225px;">
            <div class="checked">
              <div
                v-for="item in checkedList"
                :key="item.name"
                class="item"
                @click="removeDevice(item.name)"
              >
                {{ item.name }}
                <img src="@/assets/images/events/label-remove.png">
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="content2 msg">
          <textarea
            v-model="text"
            placeholder="请输入信息"
          />
        </div>
        <div class="btn">
          <button @click="bindBtnClose">
            返回
          </button>
          <button @click="dealEvent">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGroupForce,
  eventAssign,
  queryOrgMember
} from '@/api/common/event'
export default {
  props: {
    modalTitle: {
      type: String,
      default: '事件处置'
    },
    eventId: {
      type: String,
      default: ''
    },
    gridCode: {
      type: String,
      default: ''
    },
    peopleLabel: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      groupList: [],
      checkedList: [],
      text: ''
    }
  },
  mounted () {
    if (this.modalTitle === '事件指派') {
      this.getGroupForce()
    } else if (this.modalTitle === '事件上报') {
      this.queryOrgMember()
    }
  },
  methods: {
    getGroupForce () {
      getGroupForce({
        gridCode: this.gridCode,
        eventId: this.eventId
      }).then(res => {
        const classObj = {}
        classObj['网格员'] = []
        if (this.peopleLabel && this.peopleLabel.indexOf('精神') > -1) {
          res.data.forEach((item, index) => {
            if (item.industryTypeName && index === 1) {
              classObj['法定监护人'] = [item]
            } else if (item.industryTypeName && index === 2) {
              classObj['精防人员'] = [item]
            } else if (item.industryTypeName && index === 3) {
              classObj['社区干部'] = [item]
            } else if (item.industryTypeName && index === 4) {
              classObj['社区民警'] = [item]
            } else if (item.industryTypeName && index !== 5) {
              classObj['' + item.industryTypeName + ''] = [item]
            } else {
              classObj['网格员'].push(item)
            }
          })
        } else {
          res.data.forEach(item => {
            if (item.industryTypeName) {
              if (!classObj['' + item.industryTypeName + '']) {
                classObj['' + item.industryTypeName + ''] = [item]
              } else {
                classObj['' + item.industryTypeName + ''].push(item)
              }
            } else {
              classObj['网格员'].push(item)
            }
          })
        }

        const controlTeamList = []
        for (const key in classObj) {
          let needArr = []
          if (classObj[key].length) {
            if (
              key === '法定监护人' ||
              key === '精防人员' ||
              key === '社区干部' ||
              key === '社区民警'
            ) {
              needArr = classObj[key].map(item1 => {
                return {
                  id: item1.id,
                  label: item1.name,
                  name: item1.name,
                  active: false,
                  phone: item1.phone
                }
              })

              controlTeamList.push({
                label: key,
                name: key,
                children: needArr
              })
            } else {
              needArr = classObj[key].map(item1 => {
                return {
                  id: item1.id,
                  label: item1.name,
                  name: item1.name,
                  active: false,
                  phone: item1.phone
                }
              })

              this.groupList.push({
                label: key,
                name: key,
                children: needArr
              })
            }
          }
        }

        this.groupList.splice(1, 0, {
          label: '管控服务小组',
          name: '管控服务小组',
          children: controlTeamList
        })
      })
    },
    queryOrgMember () {
      queryOrgMember({
        orgId: '2370',
        type: 0
      }).then(res => {
        let needArr = []
        if (res.data.list.length) {
          needArr = res.data.list.map(item1 => {
            return {
              id: item1.id,
              label: item1.name,
              name: item1.name,
              active: false
            }
          })

          this.groupList.push({
            label: '市综治中心',
            children: needArr
          })
        }
      })
    },
    bindBtnClose () {
      this.$emit('bindBtnClose')
    },
    bindTreeCheck (data, nodes) {
      this.checkedList = this.$refs.tree.getCheckedNodes()
      if (this.checkedList.length) {
        this.checkedList = this.checkedList.filter(item => {
          return !item.children
        })
      }
    },
    removeDevice (deviceName) {
      this.checkedList = this.checkedList.filter(
        item => item.name !== deviceName
      )
      this.$refs.tree.setCheckedKeys(
        this.checkedList.map(item => item.name)
      )
    },
    dealEvent () {
      if (this.modalTitle === '事件指派') {
        eventAssign({
          desc: this.text,
          eventId: this.eventId,
          groupForceIdList: this.checkedList.map(item => {
            return item.id
          })
        }).then(() => {
          this.$message.success('发送成功')
          this.$emit('onDealModal')
        })
      } else {
        this.$message.success('发送成功')
        this.$emit('onDealModal')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}
.modal {
  position: absolute;
  background: url("~@/assets/images/common/modal-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 666px;
  height: 610px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 12px 7px 6px 6px;
  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
  .title {
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #00ffff;
    font-weight: bold;
    border-bottom: 1px solid #0b61a0;
  }
  .body {
    height: calc(100% - 36px);
    padding: 18px 23px 72px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    position: relative;
    .content1 {
      background: url("~@/assets/images/events/modal-content1.png") no-repeat;
      width: 354px;
      height: 466px;
    }
    .content2 {
      background: url("~@/assets/images/events/modal-content2.png") no-repeat;
      width: 243px;
      height: 225px;
      align-items: baseline;
      align-content: baseline;
      .checked {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        .item {
          color: #fff;
          font-size: 12px;
          padding: 10px 12px;
          margin-right: 4px;
          margin-bottom: 4px;
          background-color: #199ccb;
        }
      }
      &.msg textarea {
        font-size: 14px;
        color: #fff;
        width: 100%;
        height: 100%;
        background: transparent;
        outline: none;
        resize: none;
        border: none;
        padding: 15px;
        line-height: 28px;
        &::placeholder {
          color: #aaa;
        }
      }
    }
    .btn {
      text-align: right;
      position: absolute;
      bottom: 20px;
      right: 14px;
      button {
        background: url("~@/assets/images/events/submit-btn.png");
        width: 104px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
}

.node {
  position: relative;
  width: 100%;
  .img-device {
    margin-right: 8px;
    &.inactive {
      filter: grayscale(1);
    }
  }
  .img-right {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 2px;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
