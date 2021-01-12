<template>
  <div class="container main">
    <SimpleMap @mapInit="mapInit">
      <el-amap-info-window
        v-if="infoWindowData"
        :auto-move="true"
        :show-shadow="true"
        :position="[infoWindowData.lon, infoWindowData.lat]"
        :events="infoWindowEvents"
        :is-custom="true"
      >
        <div class="modal-content">
          <img
            class="close-btn"
            src="@/assets/images/informationService/close.png"
            @click="infoWindowData = null"
          >

          <div class="content-left">
            <div class="item-p">
              <span>车牌号码：</span>
              <span class="value-text">{{ infoWindowData.plateNo }}</span>
            </div>
            <div
              class="item-p"
              style="display:flex;"
            >
              <span>车牌类型：</span>
              <span
                style="align-self:center;"
                class="value-text"
              >{{
                infoWindowData.plateTypeText
              }}</span>
            </div>
            <div class="item-p">
              <span>车辆品牌：</span>
              <span class="value-text">{{
                infoWindowData.vehicleLogoText
              }}</span>
            </div>
            <div class="item-p">
              <span>车辆类型：</span>
              <span class="value-text">{{
                infoWindowData.vehicleTypeText
              }}</span>
            </div>
            <div class="item-p">
              <span>车辆颜色：</span>
              <span class="value-text">{{
                infoWindowData.vehicleColorText
              }}</span>
            </div>
            <div class="item-p">
              <span>抓拍地点：</span>
              <span class="value-text">{{ infoWindowData.crossingName }}</span>
            </div>
            <div class="item-p">
              <span>抓拍时间：</span>
              <span class="value-text">{{ infoWindowData.shootTime }}</span>
            </div>
          </div>

          <div class="content-right">
            <el-image
              style="width:80px;height:80px"
              :src="infoWindowData.imagePath"
              :preview-src-list="[infoWindowData.imagePath]"
            />
          </div>
        </div>
      </el-amap-info-window>

      <VehicleVideoModal
        :visible.sync="vehicleVideoModal.visible"
        :info="vehicleVideoModal.info"
      />
    </SimpleMap>
    <div class="left">
      <div>
        <el-form
          class="search-form"
          :model="form"
          label-width="90px"
        >
          <el-form-item label="车牌号码">
            <el-input
              v-model="form.plateNo"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.beginTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
            />
          </el-form-item>

          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
            />
          </el-form-item>
        </el-form>

        <div
          class="search-input"
          @click="getVehicleSnapRecords"
        >
          <i class="el-icon-search" />
          <span class="search-text">搜索</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="search-result">
        <div class="result-top">
          <div class="result-left">
            <div>
              <span class="result-label">车牌号码：</span>{{ vehicleInfo.plateNo }}
            </div>
            <div><span class="result-label">抓拍次数：</span>{{ snapNum }}</div>
          </div>
          <div class="result-right">
            <el-image
              v-if="vehicleInfo.imagePath"
              style="width:100%;height:100%;"
              :z-index="9999"
              :src="vehicleInfo.imagePath"
              :preview-src-list="[vehicleInfo.imagePath]"
            />
            <img
              v-else
              :src="
                require('@/assets/images/informationService/no-vehicle.png')
              "
              style="width:100%;height:100%;"
            >
          </div>
        </div>

        <div
          v-loading="loading"
          class="scrollbar-box"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0,0,0,1)"
        >
          <el-scrollbar style="width:100%;height:100%;">
            <div class="list-container">
              <div
                v-for="(value, key, index) in vehicleSnapList"
                :key="index"
                class="list-item"
              >
                <div
                  class="item-select"
                  :class="[
                    vehicleSnapList[key].active ? 'select-off' : 'select-on'
                  ]"
                  @click="selectPath(value, key, index)"
                />
                <div class="item-time">
                  {{ key }}
                </div>
                <div class="item-num">
                  {{ vehicleSnapList[key].pathList.length }}次
                </div>
                <div
                  class="item-btn"
                  @click="lookPath(vehicleSnapList[key].pathList)"
                >
                  查看
                </div>
              </div>
            </div>
          </el-scrollbar>
          <div
            class="select-all"
            @click="selectAllPath()"
          >
            <div
              class="select-btn"
              :class="[this.isSelectAllPath ? 'select-off' : 'select-on']"
            />
            <div class="select-text">
              全选
            </div>
          </div>
        </div>

        <div class="select-result">
          <div class="select-num">
            已选择<span class="mark-text">{{ totalPathNum }}</span>项
          </div>
          <div
            class="select-path"
            @click="lookAllPath"
          >
            <span class="look-icon" />
            <span class="look-text">查看轨迹</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVehicleSnapRecords } from '@/api/riskPrevention/peopleManage/informationService'
import VehicleVideoModal from './VehicleVideoModal'
export default {
  components: {
    VehicleVideoModal
  },
  props: {
    visible: Boolean
  },
  data () {
    return {
      map: null,
      form: {
        beginTime: '',
        endTime: '',
        plateNo: ''
      },
      vehicleInfo: {
        plateNo: '',
        plateTypeText: '',
        vehicleLogoText: '',
        vehicleTypeText: '',
        vehicleColorText: '',
        imagePath: ''
      },
      snapNum: 0,
      vehicleVideoModal: {
        visible: false,
        info: null
      },
      vehicleSnapList: {},
      totalPathNum: 0,
      captureNum: 0,
      navg: null,
      curPathIndex: 0,
      isSelectAllPath: false,
      infoWindowData: null,
      infoWindowEvents: {
        close: () => {
          this.infoWindowData = null
        }
      },
      loading: false
    }
  },
  watch: {
    faceCaptureList: {
      handler () {
        let flag = true
        let num = 0
        for (const key in this.vehicleSnapList) {
          if (!this.vehicleSnapList[key].active) {
            flag = false
          } else {
            num++
          }
        }

        this.totalPathNum = num

        if (!flag) {
          this.isSelectAllPath = false
        } else {
          if (Object.keys(this.vehicleSnapList).length) {
            this.isSelectAllPath = true
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    const date1 = new Date()
    const date2 = new Date(date1)

    // -30为30天前，+30可以获得30天后的日期
    date2.setDate(date1.getDate() - 7)

    // 30天前（月份判断是否小于10，小于10的前面+0）
    const agoDay = `${date2.getFullYear()}-${
      date2.getMonth() + 1 < 10
        ? `0${date2.getMonth() + 1}`
        : date2.getMonth() + 1
    }-${date2.getDate()}`
    const nowDay = `${date1.getFullYear()}-${
      date1.getMonth() + 1 < 10
        ? `0${date1.getMonth() + 1}`
        : date1.getMonth() + 1
    }-${date1.getDate()} ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`

    this.form.beginTime = agoDay + ' 00:00:00'
    this.form.endTime = nowDay
  },
  methods: {
    dialogClose () {
      this.$emit('update:visible', false)
    },
    opened () {},
    mapInit (map) {
      this.map = map
      this.map.setCenter([115.986664, 28.574716])
      this.map.setZoom(12.2)
    },
    getVehicleSnapRecords () {
      this.loading = true
      getVehicleSnapRecords(1, 500, this.form).then(res => {
        this.loading = false
        if (res.status === 200) {
          const listObj = {}
          this.vehicleInfo = {
            plateNo: res.data.list[0].plateNo,
            plateTypeText: res.data.list[0].plateTypeText,
            vehicleLogoText: res.data.list[0].vehicleLogoText,
            vehicleTypeText: res.data.list[0].vehicleTypeText,
            vehicleColorText: res.data.list[0].vehicleColorText,
            imagePath: res.data.list[0].imagePath
          }

          this.snapNum = res.data.list.length

          res.data.list.forEach(item => {
            if (item.longitude && item.latitude) {
              const shootTime = item.shootTime.split(' ')
              if (shootTime.length) {
                if (shootTime[0] in listObj) {
                  listObj[shootTime[0]].pathList.push(item)
                } else {
                  listObj[shootTime[0]] = {
                    active: false,
                    pathList: [item]
                  }
                }
              }
            }
          })

          this.vehicleSnapList = listObj
        }
      })
    },
    lookVideo (cameraIndexCode) {
      this.personVideoModal.visible = true
      this.personVideoModal.info = {
        cameraIndexCode: cameraIndexCode
      }

      this.infoWindowData = null
    },
    lookPath (list) {
      const pathList = []
      list.forEach(item => {
        pathList.push({
          ...item,
          lnglat: [item.longitude, item.latitude]
        })
      })
      this.renderPath(pathList.reverse())
    },
    lookAllPath () {
      const pathList = []
      for (const key in this.vehicleSnapList) {
        if (this.vehicleSnapList[key].active) {
          const curItem = [...this.vehicleSnapList[key].pathList]
          pathList.push(...curItem)
        }
      }

      if (!pathList.length) {
        this.$message.warning('请先选择某阶段轨迹！')
        return
      }

      pathList.reverse()

      const needList = []

      pathList.forEach(item => {
        if (item.longitude && item.latitude) {
          needList.push({
            ...item,
            lnglat: [item.longitude, item.latitude]
          })
        }
      })

      this.renderPath(needList)
    },
    selectPath (value, key, index) {
      this.vehicleSnapList[key].active = !this.vehicleSnapList[key].active

      this.$set(this.vehicleSnapList, key, {
        ...value,
        active: this.vehicleSnapList[key].active
      })
    },
    selectAllPath () {
      this.isSelectAllPath = !this.isSelectAllPath
      for (const key in this.vehicleSnapList) {
        this.$set(this.vehicleSnapList, key, {
          ...this.vehicleSnapList[key],
          active: this.isSelectAllPath
        })
      }
    },
    renderPath (path) {
      const that = this
      if (that.navg) {
        that.navg.destroy()
      }

      if (window.pathSimplifierIns) {
        pathSimplifierIns.setData([])
      }

      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        const pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          autoSetFitView: true,
          map: that.map, // 所属的地图实例
          getPath: function (pathData, pathIndex) {
            const points = pathData.points
            const lnglatList = []

            for (var i = 0, len = points.length; i < len; i++) {
              lnglatList.push(points[i].lnglat)
            }

            return lnglatList
          },
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
            // console.log(pathData, pathIndex, pointIndex);
            // return pathData.points[pointIndex].crossingName
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: -1,
            pathTolerance: 2,
            keyPointTolerance: 0,
            pathLineStyle: {
              lineWidth: 3,
              strokeStyle: '#F7B538',
              borderWidth: 1,
              borderStyle: '#eeeeee',
              dirArrowStyle: false
            },
            pathLineHoverStyle: {
              lineWidth: 3,
              strokeStyle: 'rgba(204, 63, 88,1)',
              borderWidth: 1,
              borderStyle: '#cccccc',
              dirArrowStyle: false
            },
            pathLineSelectedStyle: {
              lineWidth: 6,
              strokeStyle: '#C11534',
              borderWidth: 1,
              borderStyle: '#cccccc',
              dirArrowStyle: true
            },
            dirArrowStyle: {
              stepSpace: 35,
              strokeStyle: '#ffffff',
              lineWidth: 2
            },
            startPointStyle: {
              radius: 4,
              fillStyle: '#109618',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            endPointStyle: {
              radius: 4,
              fillStyle: '#dc3912',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            keyPointStyle: {
              radius: 7,
              fillStyle: 'rgba(8, 126, 196, 1)',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            keyPointHoverStyle: {
              radius: 4,
              fillStyle: 'yellow',
              lineWidth: 2,
              strokeStyle: '#ffa500'
            },
            keyPointOnSelectedPathLineStyle: {
              radius: 4,
              fillStyle: 'rgba(8, 126, 196, 1)',
              lineWidth: 2,
              strokeStyle: '#eeeeee'
            }
          }
        })

        window.pathSimplifierIns = pathSimplifierIns

        // 设置数据
        pathSimplifierIns.setData([
          {
            name: '路线0',
            points: path
          }
        ])

        function onload () {
          pathSimplifierIns.renderLater()
        }

        function onerror (e) {
          alert('图片加载失败！')
        }

        // 对第一条线路（即索引 0）创建一个巡航器
        that.navg = pathSimplifierIns.createPathNavigator(0, {
          loop: true, // 循环播放
          speed: 1000, // 巡航速度，单位千米/小时
          pathNavigatorStyle: {
            width: 24,
            height: 48,
            // 使用图片
            content: PathSimplifier.Render.Canvas.getImageContent(
              require('@/assets/images/informationService/car.png'),
              onload,
              onerror
            ),
            strokeStyle: null,
            fillStyle: null,
            pathLinePassedStyle: {
              lineWidth: 6,
              strokeStyle: 'green',
              dirArrowStyle: {
                stepSpace: 15,
                strokeStyle: 'yellow'
              }
            }
          }
        })

        pathSimplifierIns.on('pointClick', function (e, info) {
          that.infoWindowData = {
            lat: e.originalEvent.lnglat.lat,
            lon: e.originalEvent.lnglat.lng,
            ...info.pathData.points[info.pointIndex]
          }
        })

        that.navg.start()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  width: 100%;
  height: 100%;
  padding: 62px 5px 15px 5px;
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.left {
  position: absolute;
  top: 6px;
  left: 15px;
  z-index: 999;
  width: 376px;
  height: 250px;
  background: url('~@/assets/images/informationService/组 47s.png') no-repeat
    100% 100%;
  background-size: 100% 100%;
}
.search-form {
  width: 376px;
  height: 182px;
  padding: 40px 10px 0 20px;
  margin-bottom: 10px;
  /deep/ .el-input__inner {
    width: 220px;
    background: rgba(0, 138, 255, 0.23);
    color: #fff;
  }

  /deep/ .el-form-item__label {
    color: #a1d8ff;
  }

  /deep/ .el-slider__bar {
    background: linear-gradient(
      -90deg,
      rgba(25, 156, 203, 1) 0%,
      rgba(135, 225, 248, 1) 100%
    );
  }
}

.search-input {
  width: 294px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 138, 255, 0.55);
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;

  .el-icon-search {
    font-size: 18px;
  }

  .search-text {
    font-size: 18px;
    padding-left: 10px;
  }
}
/deep/ .right {
  position: absolute;
  top: 256px;
  left: 21px;
  z-index: 999;
}
.search-result {
  background: url('~@/assets/images/informationService/sousuos.png') no-repeat
    100% 100%;
  background-size: 100% 100%;
  width: 364px;
  height: 587px;
  color: #fff;
  padding: 20px;

  .result-label {
    color: #a1d8ff;
    line-height: 2;
  }

  .result-right {
    width: 90px;
    height: 66px;
    padding: 7px 2px 2px 2px;
    background: url('~@/assets/images/informationService/avatar-bg.png')
      no-repeat 100% 100%;
    background-size: 100% 100%;
    margin-left: 20px;
  }

  .result-top {
    display: flex;
    .result-left {
      flex: 0 0 65%;
    }
  }

  .scrollbar-box {
    height: 312px;
    margin-top: 60px;
    padding: 0 25px;
  }

  .select-on {
    background: url('~@/assets/images/informationService/noSelect-bg.png')
      no-repeat 100% 100%;
    background-size: 100% 100%;
    width: 22px;
    height: 22px;
  }

  .select-off {
    background: url('~@/assets/images/informationService/select-bg.png')
      no-repeat 100% 100%;
    background-size: 100% 100%;
    width: 22px;
    height: 22px;
  }

  .list-container {
    .list-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 12px;
      .item-btn {
        cursor: pointer;
      }

      .item-select {
        cursor: pointer;
      }
    }
  }

  .select-all {
    display: flex;
    border-top: 1px dotted #58d0ea;
    padding: 10px 10px;
    .select-btn {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
    .select-text {
      padding-left: 10px;
    }
  }

  .select-result {
    .mark-text {
      color: #f1d431;
    }
    .select-path {
      cursor: pointer;
      .look-icon {
        background: url('~@/assets/images/informationService/startVideo-icon.png')
          no-repeat 100% 100%;
        background-size: 100% 100%;
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    margin-top: 65px;
    margin-left: 5px;
    width: 313px;
    height: 53px;
    display: flex;
    justify-content: space-between;
    padding: 18px 35px;
    background: rgba(0, 138, 255, 0.38);
    border-radius: 8px;
  }
}

.modal-content {
  position: relative;
  width: 600px !important;
  height: 230px !important;
  padding: 10px 20px;
  background: url('~@/assets/images/informationService/search-modal-bg.png')
    no-repeat 100% 100%;
  background-size: 100% 100%;
  display: flex;
  .close-btn {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
  .item-p {
    color: #fff;
    padding-bottom: 10px;
    .value-text {
      color: #01aae5;
    }
  }

  .content-left {
    flex: 0 0 75%;
    padding-right: 25px;
  }

  .content-right {
    flex: 0 0 25%;
  }
}

.look-trajectory {
  width: 110px;
  height: 28px;
  line-height: 28px;
  background: rgba(3, 35, 63, 0.2);
  border: 1px solid rgba(1, 170, 229, 1);
  border-radius: 20px;
  text-align: center;
  color: #17cbf8;
  cursor: pointer;
  margin-top: 10px;
}

/deep/ .el-icon-circle-close {
  color: #fff;
  z-index: 99999;
}

/deep/ .el-image-viewer__img {
  transform: scale(0.45) rotate(0deg) !important;
}
</style>
