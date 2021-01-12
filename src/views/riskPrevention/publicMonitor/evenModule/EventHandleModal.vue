<template>
  <div class="mask-container">
    <div class="mask" />
    <div class="toast-container">
      <div class="toast-title">
        事件处置
      </div>

      <div class="form-item">
        <div class="label">
          处理说明：
        </div>
        <el-input
          v-model="content"
          class="input"
          type="textarea"
        />
      </div>

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
import { handleEvent } from '@/api/riskPrevention/publicMonitor/index'
export default {
  props: {
    eventId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    async submit () {
      await handleEvent({
        id: this.eventId,
        processingDesc: this.content,
        processingImageUrl: '',
        isInvalid: false
      })
      this.$message({
        message: '处置成功',
        type: 'success'
      })

      this.$emit('onShowToast')
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 214px;
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
