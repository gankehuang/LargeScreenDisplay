<template>
  <div
    v-if="visible"
    class="mask-container"
  >
    <div class="mask" />
    <div class="pdf-modal-contianer">
      <div
        class="close"
        @click="close"
      />
      <el-scrollbar class="popup-scrollbar">
        <pdf
          v-for="(item, index) in pdfFile.numPages"
          :key="index"
          class="pdf-page"
          :src="pdfFile.file"
          :page="item"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    pdfFile: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      numPages: 0
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.pdf-modal-contianer {
  width: 800px;
  height: 900px;
  position: fixed;
  top: 60px;
  left: 30%;
  z-index: 2000 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/images/publicMonitor/popup_right_bg.png") center
    center / 100% 100% no-repeat;
}
.popup-scrollbar {
  margin: 20px 0 0 10px;
  width: 92%;
  height: 92%;
}
.pdf-page {
  width: 96%;
  margin-left: 2%;
  height: 100%;
}
.close {
  cursor: pointer;
  position: absolute;
  z-index: 2001;
  top: 45px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/images/publicMonitor/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
</style>
