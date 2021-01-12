<template>
  <InfoBlock
    class="imp-or-don"
    title="矛盾重点区域"
  >
    <div class="improve">
      <div class="title">
        <span>提升前3名</span>
        <i />
      </div>
      <ul>
        <li
          v-for="(item,index) in improveList"
          :key="index"
        >
          <span class="num">{{ item.num }}</span>
          <span class="label">{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div class="down">
      <div class="title">
        <span>下降前3名</span>
        <i />
      </div>
      <ul>
        <li
          v-for="(item,index) in downList"
          :key="index"
        >
          <span class="num">{{ item.num }}</span>
          <span class="label">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      improveList: [
        {
          label: '城郊管委会',
          num: 1745
        },
        {
          label: '五陂镇',
          num: 3268
        },
        {
          label: '青山镇',
          num: 3980
        }
      ],
      downList: [
        {
          label: '安源镇',
          num: 7976
        },
        {
          label: '高坑镇',
          num: 1916
        },
        {
          label: '白源街道',
          num: 1278
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.imp-or-don {
  ::v-deep.content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .title {
    margin: 15px 0 0;
    font-size: 16px;
    line-height: 14px;
    display: flex;
    span {
      display: inline-block;
      font-size: 16px;
      font-weight: 400;
    }
    i {
      display: inline-block;
      width: 304px;
      height: 7px;
      background-position: left top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  ul {
    width: 100%;
    margin: 10px 0 0 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  li {
    display: block;
    width: 120px;
    height: 60px;
    display: flex;
    flex-direction: column;
    text-align: center;

    span {
      display: inline-block;
    }
    .label,
    .num {
      font-size: 16px;
      color: #a1d8ff;
      line-height: 28px;
    }
    .num {
      color: #fff;
    }
  }

  .improve {
    .title {
      span {
        color: #0086f8;
      }
    }
    i {
      background-image: url('~@/assets/images/conflict/conflict(14).png');
    }
    li:nth-of-type(1) {
      background: url('~@/assets/images/conflict/conflict(15).png') center
        center / 100% 100% no-repeat;
    }
    li:nth-of-type(2) {
      background: url('~@/assets/images/conflict/conflict(16).png') center
        center / 100% 100% no-repeat;
    }
    li:nth-of-type(3) {
      background: url('~@/assets/images/conflict/conflict(17).png') center
        center / 100% 100% no-repeat;
    }
  }
  .down {
    .title {
      span {
        color: #12ecfa;
      }
    }
    i {
      background-image: url('~@/assets/images/conflict/conflict(21).png');
    }
    li:nth-of-type(1) {
      background: url('~@/assets/images/conflict/conflict(18).png') center
        center / 100% 100% no-repeat;
    }
    li:nth-of-type(2) {
      background: url('~@/assets/images/conflict/conflict(19).png') center
        center / 100% 100% no-repeat;
    }
    li:nth-of-type(3) {
      background: url('~@/assets/images/conflict/conflict(20).png') center
        center / 100% 100% no-repeat;
    }
  }
}
</style>
