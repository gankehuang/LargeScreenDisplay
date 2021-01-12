<template>
  <InfoBlock
    title="精神病患者"
    height="270px"
    :content-style-obj="{display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center' }"
  >
    <div class="top-block">
      <span class="top-label">严重精神障碍患者总数</span>
      <div class="top-value-box">
        <span class="num-text">1835</span>
        <span class="num-unit">人</span>
      </div>
    </div>
    <div class="bottom-block">
      <div class="item">
        <div class="item-level">
          5级
        </div>
        <div class="item-value">
          113人
        </div>
      </div>
      <div class="item">
        <div class="item-level">
          4级
        </div>
        <div class="item-value">
          355人
        </div>
      </div>
      <div class="item">
        <div class="item-level">
          3级
        </div>
        <div class="item-value">
          1367人
        </div>
      </div>
      <div class="item">
        <div class="item-level">
          2级
        </div>
        <div class="item-value">
          5445人
        </div>
      </div>
      <div class="item">
        <div class="item-level">
          1级
        </div>
        <div class="item-value">
          123人
        </div>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { countMentalPeopleByRiskDegree } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      count: 1835,
      count1: 113,
      count2: 355,
      count3: 1401
    }
  },
  methods: {
    getList () {
      countMentalPeopleByRiskDegree().then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            if (item.name === 'total') {
              this.count = item.numVal
            } else if (item.name === '5级') {
              this.count1 = item.numVal
            } else if (item.name === '4级') {
              this.count2 = item.numVal
            } else if (item.name === '3级') {
              this.count3 = item.numVal
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-block {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 366px;
  height: 70px;
  background: url('~@/assets/images/keyGroups/mental-left1-top-bg.png') no-repeat center;
  background-size: 100% 100%;
  .top-label {
    font-size: 16px;
    color: #D0DFFF;
  }
  .top-value-box {
    color: #fff;
    .num-text {
      font-size: 24px;
    }
    .num-unit {
       font-size: 14px;
    }
  }
}
.bottom-block {
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 366px;
  height: 99px;
  background: rgba(3, 61, 156, 0.08);
  border: 1px solid #0B2E68;
  border-radius: 2px;
  .item {
    padding: 0 8px;
    .item-level {
      width: 55px;
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
    .item-value {
      text-align: center;
      margin-top: 5px;
    }
    &:nth-child(1) {
      color: #FF0000;
      .item-level {
        background: url('~@/assets/images/keyGroups/mental-left1-item1-bg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    &:nth-child(2) {
      color: #F7C000;
      .item-level {
        background: url('~@/assets/images/keyGroups/mental-left1-item2-bg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    &:nth-child(3) {
      color: #5FA6FF;
      .item-level {
        background: url('~@/assets/images/keyGroups/mental-left1-item3-bg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    &:nth-child(4) {
      color: #00F7EE;
      .item-level {
        background: url('~@/assets/images/keyGroups/mental-left1-item4-bg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    &:nth-child(5) {
      color: #7FE64E;
      .item-level {
        background: url('~@/assets/images/keyGroups/mental-left1-item5-bg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
