<template>
  <div class="container">
    <el-scrollbar style="height: 95%;overflow-x:hidden">
      <div class="cards">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="card"
        >
          <el-row class="grid-name">
            {{ item.gridName }}
          </el-row>
          <el-row class="department">
            {{ item.department }}
          </el-row>
          <el-row class="info">
            <el-col :span="18">
              <div class="name">
                <span>姓名：</span>
                <span>{{ item.name | hideName }}</span>
              </div>
              <div class="phone">
                <span>电话：</span>
                <span>{{ item.phone | hidePhone }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <el-avatar
                :size="68"
                :src="item.avatar"
              />
            </el-col>
          </el-row>
        </div>
        <div
          v-if="!list.length"
          class="empty"
        >
          暂无数据
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          gridName: '第3网格',
          department: '综治',
          name: '熊翔宇',
          phone: '13698095719',
          avatar:
            'http://10.31.170.150:8088/group1/M00/04/E8/Ch-qll9PufKACS0MAAB23BRjcmY507.jpg'
        },
        {
          gridName: '第5网格',
          department: '综治',
          name: '汤小林',
          phone: '13803536930',
          avatar:
            'http://10.31.170.150:8088/group1/M00/03/E3/Ch-qll9PYsaANGu0AAB0dIJpE5w611.jpg'
        },
        {
          gridName: '第4网格',
          department: '综治',
          name: '李佩茹',
          phone: '13767981358',
          avatar:
            'http://10.31.170.150:8088/group1/M00/04/E1/Ch-qll9Pt6aARyngAABvlcbMo2M190.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 32%;
  padding: 30px 20px;
  margin: 12px 0;
  background-color: #283446;
  overflow: hidden;
  &:not(:nth-child(3n)) {
    margin-right: calc(4% / 2);
  }
}
.grid-name {
  font-size: 16px;
  color: #2188ed;
  line-height: 24px;
}
.department {
  color: #fff;
}

.info {
  line-height: 24px;
  color: #cccccc;
  .name {
    margin-top: 15px;
  }
}

.empty {
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
}
</style>
