<template>
  <div class="two-level-index">
    <ul>
      <li
        v-for="(item,index) in dataArr"
        :key="index"
      >
        <div>
          <span class="icon" />
          <div
            class="label text-overflow"
            :title="item.label"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="dots">
          .....................................................
        </div>
        <div class="num">
          <span>{{ item.num }}</span>
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
          label: '政治防范安全',
          num: 99.24
        },
        {
          label: '暴徒犯罪',
          num: 98.14
        },
        {
          label: '普法教学消防',
          num: 97.24
        },
        {
          label: '治安警情',
          num: 96.14
        },
        {
          label: '刑事警情',
          num: 95.84
        },
        {
          label: '主要经济犯罪传教',
          num: 94.94
        },
        {
          label: '交通事故',
          num: 93.34
        },
        {
          label: '火灾事故',
          num: 92.64
        },
        {
          label: '人民调解',
          num: 91.14
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.two-level-index {
  ul {
    width: 100%;
    margin: 10px;
    padding: 0px;
  }
  li {
    width: 100%;
    height: 40px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:nth-of-type(2n) {
      background: #012451;
    }
    &:nth-of-type(2n + 1) {
      background: #012047;
    }
    .icon {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50% 50%;
      background: #a1d8ff;
    }

    .label {
      display: inline-block;
      width: 100px;
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
