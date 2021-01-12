<template>
  <div class="mask-container">
    <div class="mask" />
    <div class="toast-container">
      <div class="toast-title">
        事件核查
      </div>

      <div class="form-item">
        <div class="label">
          核查说明：
        </div>
        <el-input
          v-model="verifyDesc"
          class="input"
          type="textarea"
        />
      </div>

      <el-row>
        <el-col
          class="rate-title"
          :span="4"
        >
          评价信息：
        </el-col>
      </el-row>
      <el-row class="evaluate-info">
        <el-col :span="4">
          <el-avatar
            :size="58"
            :src="require('@/assets/images/common/no-avatar.png')"
          />
        </el-col>

        <el-col :span="12">
          <div>艾*德</div>
          <div>{{ processingDesc }}</div>
          <div>{{ processingTime }}</div>
        </el-col>

        <el-col :span="8">
          <el-rate
            v-model="rate"
            show-text
            :texts="texts"
          />
        </el-col>
      </el-row>
      <div class="toast-bottom">
        <div
          class="button"
          @click="closeModal"
        >
          取消
        </div>
        <div
          class="button"
          @click="submit"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventVerify } from '@/api/riskPrevention/publicMonitor/index'
export default {
  props: {
    eventId: {
      type: String,
      default: ''
    },
    processingDesc: {
      type: String,
      default: ''
    },
    processingTime: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      verifyDesc: '',
      rate: '5',
      texts: ['1星', '2星', '3星', '4星', '5星'],
      evaluateList: [
        {
          name: '**明',
          avatar: require('@/assets/images/common/no-avatar.png'),
          brief: '事件已经得到完善处理，相关人员辛苦啦！',
          time: '2020-09-13 10:50:28',
          rate: 5
        },
        {
          name: '**里',
          avatar: require('@/assets/images/common/no-avatar.png'),
          brief: '处理到位，辛苦啦！',
          time: '2020-09-14 11:25:10',
          rate: 5
        }
      ]
    }
  },
  watch: {
    processingDesc () {}
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    async submit () {
      await eventVerify({
        eventId: this.eventId,
        verifyDesc: this.verifyDesc
      })
      this.$message({
        message: '核实成功',
        type: 'success'
      })

      this.$emit('onShowToast')
    }
  }
}
</script>
<style lang="scss" scoped>
.rate-title {
  color: #fff;
  margin-bottom: 5px;
}
/deep/ .el-rate__text {
  color: #fff !important;
}
.evaluate-info {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(220, 220, 220, 0.1);
  /deep/ .el-rate__text {
    display: block;
    font-size: 28px;
    margin: 20px 20px 0 0;
    color: #fff45c !important;
  }
  .el-col:nth-of-type(1) {
    text-align: center;
  }
  .el-col:nth-of-type(2) {
    line-height: 24px;
    div:nth-of-type(1) {
      font-size: 16px;
      color: #fff;
    }
    div:nth-of-type(2) {
      color: #fff;
    }
    div:nth-of-type(3) {
      color: #999999;
    }
  }
}

.toast-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 735px;
  height: 355px;
  border: 1px solid #0b61a0;
  background: #03223c;
  border-radius: 8px;
  z-index: 999;
  text-align: center;

  .toast-title {
    line-height: 50px;
    font-size: 14px;
    color: #fff;
    border-bottom: 1px solid #0b61a0;
  }

  .form-item {
    padding: 10px;
    display: flex;
    .label {
      width: 120px;
      color: #fff;
    }
    .input {
      color: #fff;

      ::v-deep.el-textarea__inner {
        background-color: #03223c;
        border: 1px solid #0b61a0 !important;
        color: #fff;
        height: 90px;
        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }
  }

  .toast-bottom {
    border-top: 1px solid #0b61a0;
    padding: 9px 0;
    display: flex;
    justify-content: flex-end;

    .button {
      width: 48px;
      line-height: 30px;
      border: 1px solid #0b61a0;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      margin-left: 20px;

      &:hover {
        background: #0b61a0;
      }

      &:nth-child(2) {
        margin-right: 10px;
      }
    }
  }
}
</style>
