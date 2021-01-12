<template>
  <InfoBlock
    class="con-res-overview"
    title="矛盾纠纷排解"
  >
    <div
      v-for="(item,index) in dataFirOrSec"
      :key="index"
      class="item"
    >
      <i />
      <div class="info">
        <span class="num">{{ item.num }}</span>
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
    <div class="ring">
      <div class="num">
        {{ rate.num }}
      </div>
      <div class="label">
        {{ rate.label }}
      </div>
    </div>
    <ul class="right-bottom-list">
      <li
        v-for="(item,index) in dataReset"
        :key="index"
      >
        <i />
        <span class="label">{{ item.label }}</span>
        <span class="num">{{ item.num }}<b>件</b></span>
      </li>
    </ul>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      dataFirOrSec: [
        {
          label: '排调组织',
          num: 234562
        },
        {
          label: '排调人员',
          num: 234562
        }
      ],
      rate: {
        label: '年化解率',
        num: '89.88%'
      },
      dataReset: [
        {
          label: '矛盾纠纷数',
          num: 234562
        },
        {
          label: '一般矛盾',
          num: 234562
        },
        {
          label: '突出矛盾',
          num: 234562
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.con-res-overview {
  width: 420px;
  height: 275px;

  .item {
    width: 50%;
    margin: 5px 0;
    display: inline-flex;
    justify-content: center;

    i {
      display: block;
      width: 42px;
      height: 42px;
      margin: 10px 20px 0;
    }
    .info {
      width: 50%;

      span {
        display: block;
        width: 100%;
        line-height: 18px;
      }

      .label {
        font-size: 14px;
        color: #a1d8ff;
        line-height: 28px;
      }

      .num {
        font-size: 20px;
        color: #fff;
        line-height: 28px;
      }
    }
  }

  .item:nth-of-type(1) {
    i {
      background: url('~@/assets/images/conflict/conflict(1).png') center center /
        100% 100% no-repeat;
    }
  }
  .item:nth-of-type(2) {
    i {
      background: url('~@/assets/images/conflict/conflict(6).png') center center /
        100% 100% no-repeat;
    }
  }

  .ring {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    vertical-align: top;
    width: 118px;
    height: 118px;
    margin: 10px 20px 0 0;
    background: url('~@/assets/images/conflict/conflict(12).png') center center /
      100% 100% no-repeat;

    .num {
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      line-height: 28px;
    }

    .label {
      font-size: 16px;
      color: #a1d8ff;
      line-height: 28px;
    }
  }

  .right-bottom-list {
    width: 250px;
    display: inline-block;
    padding: 0;

    li {
      width: 250px;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('~@/assets/images/conflict/conflict(11).png') center
          center / 100% 100%;
      }
      .label {
        width: 100px;
        color: #a1d8ff;
      }
      .num {
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>
