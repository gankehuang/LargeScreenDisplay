<template>
  <div class="imp-or-don">
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
          <span class="icon" />
          <span class="label">{{ item.label }}</span>
          <span class="num">{{ item.num }}</span>
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
          <span class="icon" />
          <span class="label">{{ item.label }}</span>
          <span class="num">{{ item.num }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      improveList: [
        {
          label: '城郊管委会',
          num: 93.12
        },
        {
          label: '五陂镇',
          num: 91.52
        },
        {
          label: '青山镇',
          num: 90.12
        }
      ],
      downList: [
        {
          label: '白源街道',
          num: 89.12
        },
        {
          label: '高坑镇',
          num: 78.12
        },
        {
          label: '丹江街道',
          num: 68.12
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.imp-or-don {
  width: 390px;
  height: 180px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  background: url('~@/assets/images/safeIndex/safeIndex(5).png') center center /
    100% 100% no-repeat;

  .title {
    margin: 15px 10px 0;
    font-size: 16px;
    line-height: 14px;
    i {
      display: block;
      width: 170px;
      height: 11px;
      background-position: left top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: block;

    span {
      display: inline-block;
    }
    .icon {
      width: 12px;
      height: 20px;
      margin: 0 10px;
    }
    .label,
    .num {
      margin: 15px 5px 0;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #a1d8ff;
      line-height: 28px;
    }
    .label {
      width: 100px;
    }
  }

  .improve {
    .title {
      color: #a1d8ff;
    }
    i {
      background-image: url('~@/assets/images/safeIndex/safeIndex(6).png');
    }
    li:nth-of-type(1) {
      .icon {
        background: url('~@/assets/images/safeIndex/imp-1.png') center center /
          100% 100% no-repeat;
      }
    }
    li:nth-of-type(2) {
      .icon {
        background: url('~@/assets/images/safeIndex/imp-2.png') center center /
          100% 100% no-repeat;
      }
    }
    li:nth-of-type(3) {
      .icon {
        background: url('~@/assets/images/safeIndex/imp-3.png') center center /
          100% 100% no-repeat;
      }
    }
  }
  .down {
    .title {
      color: #12ecfa;
    }
    i {
      background-image: url('~@/assets/images/safeIndex/safeIndex(7).png');
    }
    li:nth-of-type(1) {
      .icon {
        background: url('~@/assets/images/safeIndex/don-1.png') center center /
          100% 100% no-repeat;
      }
    }
    li:nth-of-type(2) {
      .icon {
        background: url('~@/assets/images/safeIndex/don-2.png') center center /
          100% 100% no-repeat;
      }
    }
    li:nth-of-type(3) {
      .icon {
        background: url('~@/assets/images/safeIndex/don-3.png') center center /
          100% 100% no-repeat;
      }
    }
  }
}
</style>
