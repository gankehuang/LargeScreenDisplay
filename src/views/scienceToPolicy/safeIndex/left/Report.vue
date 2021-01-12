<template>
  <div class="safe-index-report">
    <el-scrollbar style="height: 780px">
      <li
        v-for="(item,index) in list"
        :key="index"
        class="item"
      >
        <span class="title">{{ item.community }}</span>
        <span class="edit">
          <i class="down" />
          <i class="down" />
          <i class="down" />
        </span>
        <p class="text-overflows">
          {{ item.content }}
        </p>
        <span class="time">{{ item.time }}</span>
        <span :class="['status',filStatus(item.status)]">{{ item.status }}</span>
      </li>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          community: '凤凰街道',
          content: '针对井冈山大道地下河堵塞问题，排名靠后的二级指标有8项，包括政治安全防范、暴恐犯罪、侵犯知识产权时间、交通安全事故、人民调解、民事行政案件、设稳问题分类出口处理机制...',
          time: '2021.01.23  15:23:34',
          status: '已处理'
        },
        {
          community: '凤凰街道',
          content: '针对井冈山大道地下河堵塞问题，排名靠后的二级指标有8项，包括政治安全防范、暴恐犯罪、侵犯知识产权时间、交通安全事故、人民调解、民事行政案件、设稳问题分类出口处理机制...',
          time: '2021.01.23  15:23:34',
          status: '已处理'
        },
        {
          community: '凤凰街道',
          content: '针对井冈山大道地下河堵塞问题，排名靠后的二级指标有8项，包括政治安全防范、暴恐犯罪、侵犯知识产权时间、交通安全事故、人民调解、民事行政案件、设稳问题分类出口处理机制...',
          time: '2021.01.23  15:23:34',
          status: '已处理'
        },
        {
          community: '凤凰街道',
          content: '针对井冈山大道地下河堵塞问题，排名靠后的二级指标有8项，包括政治安全防范、暴恐犯罪、侵犯知识产权时间、交通安全事故、人民调解、民事行政案件、设稳问题分类出口处理机制...',
          time: '2021.01.23  15:23:34',
          status: '已处理'
        },
        {
          community: '凤凰街道',
          content: '针对井冈山大道地下河堵塞问题，排名靠后的二级指标有8项，包括政治安全防范、暴恐犯罪、侵犯知识产权时间、交通安全事故、人民调解、民事行政案件、设稳问题分类出口处理机制...',
          time: '2021.01.23  15:23:34',
          status: '超时'
        }
      ]
    }
  },
  methods: {
    filStatus (status) {
      switch (status) {
        case '已处理':
          return 'fin-status'
        case '超时':
          return 'ove-status'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.safe-index-report {
  width: 100%;
  margin: 60px auto;
  ::v-deep.el-scrollbar__wrap {
    overflow-x: hidden;
  }

  li {
    position: relative;
    display: block;
    width: 390px;
    height: 146px;
    margin: 0 auto 20px;
    padding: 5px 10px;
    background: url('~@/assets/images/safeIndex/safe-index-report.png') center
      center / 100% 100% no-repeat;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      line-height: 28px;
    }
    .edit {
      position: absolute;
      top: 10px;
      right: 0;

      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 5px;
      }

      i:nth-of-type(1) {
        background: url('~@/assets/images/safeIndex/safe-index3.png') center
          center / 100% 100% no-repeat;
      }
      i:nth-of-type(2) {
        background: url('~@/assets/images/safeIndex/safe-index1.png') center
          center / 100% 100% no-repeat;
      }
      i:nth-of-type(3) {
        background: url('~@/assets/images/safeIndex/safe-index2.png') center
          center / 100% 100% no-repeat;
      }
    }
    p {
      font-size: 12px;
      color: #a1cbfa;
    }
    .time {
      display: inline-block;
      width: 50%;
      font-size: 12px;
      color: #008aff;
      line-height: 28px;
    }
    .status {
      display: inline-block;
      width: 50%;
      text-align: right;
      font-size: 12px;
      line-height: 28px;
    }
    .fin-status {
      color: #008aff;
    }
    .ove-status {
      color: #ff8400;
    }
  }
}
</style>
