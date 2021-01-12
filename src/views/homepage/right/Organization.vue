<template>
  <div class="sit-organization">
    <ul>
      <li
        v-for="(item,index) in dataArr"
        :key="index"
      >
        <div>
          <svg-icon
            class="icon"
            :icon-class="item.icon"
          />
          <div class="label">
            {{ item.label }}
          </div>
        </div>
        <div class="dots">
          .....................................................
        </div>
        <div class="num">
          <span>{{ item.num }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataArr: [
        {
          icon: 'homepage-fir',
          label: '综治中心',
          num: 11,
          unit: '个'
        },
        {
          icon: 'homepage-sec',
          label: '综治责任单位',
          num: 19,
          unit: '个'
        },
        {
          icon: 'homepage-third',
          label: '群防群治组织',
          num: 43,
          unit: '个'
        },
        {
          icon: 'homepage-four',
          label: '平安志愿队伍',
          num: 19,
          unit: '个'
        },
        {
          icon: 'homepage-five',
          label: '法律援助组织',
          num: 12,
          unit: '个'
        },
        {
          icon: 'homepage-six',
          label: '人民调解组织',
          num: 24,
          unit: '个'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-organization {
  ul {
    width: 100%;
    margin: 10px;
    padding: 0px;
  }
  li {
    width: 100%;
    display: flex;
    margin-bottom: 12px;
    justify-content: space-between;

    .icon {
      color: #a1d8ff;
    }

    .label {
      display: inline-block;
      margin-left: 5px;
      vertical-align: top;
      font-size: 16px;
      color: #a1d8ff;
    }

    .dots {
      color: #80f4e7;
    }

    .num {
      display: inline-block;
      vertical-align: top;

      span:nth-of-type(1) {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        font-weight: bold;
        color: #538dbe;
      }
    }
  }
}
</style>
