<template>
  <div class="toast-container">
    <div class="toast-title">
      传达镇街
    </div>

    <div class="form-item">
      <div class="label">
        镇街：
      </div>
      <el-select
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
</template>
<script>
export default {
  props: {
    eventId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      content: '',
      value: '0006',
      options: [
        {
          label: '东湖区',
          value: '0001'
        },
        {
          label: '西湖区',
          value: '0002'
        },
        {
          label: '青云谱区',
          value: '0003'
        },
        {
          label: '青山湖区',
          value: '0004'
        },
        {
          label: '新建区',
          value: '0005'
        },
        {
          label: '红谷滩区',
          value: '0006'
        },
        {
          label: '南昌县',
          value: '0007'
        },
        {
          label: '安义县',
          value: '0008'
        },
        {
          label: '进贤县',
          value: '0009'
        },
        {
          label: '高新区',
          value: '0010'
        },
        {
          label: '经开区',
          value: '0011'
        },
        {
          label: '湾里管理局',
          value: '0012'
        }
      ]
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    submit () {
      this.$message({
        message: '操作成功',
        type: 'success'
      })

      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -103px 0 0 -162px;
  width: 550px;
  height: 280px;
  border: 1px solid #0b61a0;
  background: #03223c;
  border-radius: 8px;
  z-index: 8;
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
