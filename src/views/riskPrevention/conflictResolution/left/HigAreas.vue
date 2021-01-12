<template>
  <InfoBlock
    class="con-res-hig-areas"
    title="重点矛盾纠纷"
  >
    <ul>
      <li
        v-for="(item,index) in tableData"
        :key="index"
      >
        <span class="icon">{{ index + 1 }}</span>
        <span class="label text-overflow">{{ item.title }}</span>
        <span class="num">{{ item.num }}</span>
      </li>
    </ul>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          title: '青山镇餐馆行业大罢工',
          num: 3467
        },
        {
          title: '城郊管委会建筑行业烂尾问题',
          num: 2571
        },
        {
          title: '凤凰街道餐馆行业大罢工',
          num: 987
        },
        {
          title: '丹江街道安全防范所措施推延问题',
          num: 345
        },
        {
          title: '青山镇餐馆行业大罢工',
          num: 289
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.con-res-hig-areas {
  width: 420px;
  height: 275px;
  position: relative;

  /deep/.content {
    position: relative;
    width: 100%;
  }

  ul {
    width: 100%;
    margin: 10px 0 0 0;
    padding: 0;
  }

  li {
    display: block;
    width: 100%;

    span {
      display: inline-block;
    }
    .icon {
      margin: 0 10px;
      width: 20px;
      height: 20px;
      color: #a1d8ff;
      text-align: center;
      line-height: 18px;
    }
    .label,
    .num {
      margin: 15px 5px 0;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #fff;
    }
    .label {
      width: 250px;
      color: #a1d8ff;
    }
    .num {
      width: 80px;
      text-align: right;
    }
  }
  li:nth-of-type(1) {
    .icon {
      background: rgba(254, 40, 33, 0.36);
      border: 1px solid #fe2821;
      border-radius: 50%;
    }
  }
  li:nth-of-type(2) {
    .icon {
      background: rgba(233, 170, 0, 0.36);
      border: 1px solid #e9aa00;
      border-radius: 50%;
    }
  }
  li:nth-of-type(3) {
    .icon {
      background: rgba(0, 136, 245, 0.36);
      border: 1px solid #0088f5;
      border-radius: 50%;
    }
  }
  li:nth-of-type(4) {
    .icon {
      background: rgba(3, 61, 156, 0.36);
      border: 1px solid #033d9c;
      border-radius: 50%;
    }
  }
  li:nth-of-type(5) {
    .icon {
      background: rgba(3, 61, 156, 0.36);
      border: 1px solid #033d9c;
      border-radius: 50%;
    }
  }
}
</style>
