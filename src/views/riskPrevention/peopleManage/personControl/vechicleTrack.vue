<template>
  <div
    v-if="visible"
    class="person-stack-contianer"
  >
    <span
      class="close"
      @click="close"
    />
    <el-row
      :gutter="8"
      style="width:100%;height:100%;margin-top:10px"
    >
      <el-col
        :span="6"
        class="left-menu"
      >
        <div class="title">
          布控信息
        </div>
        <div class="top-list">
          <ul>
            <li>
              <span class="label">目标类型：</span>
              <span class="info">车辆布控</span>
            </li>
            <li>
              <span class="label">布控类型：</span>
              <span class="info">车辆库布控</span>
            </li>
            <li>
              <span class="label">布控等级：</span>
              <span class="info">高级</span>
            </li>
            <li>
              <span class="label">布控名称：</span>
              <span class="info">-</span>
            </li>
            <li>
              <span class="label">前端/后端：</span>
              <span class="info">后端</span>
            </li>
          </ul>
        </div>
        <div class="title title-second">
          报警记录
        </div>
        <div class="record-num">
          {{ info.times }}条
        </div>
        <div
          style="display: inline-block; cursor:pointer"
          @click="lookAllPath(info.allStracks)"
        >
          <svg-icon
            icon-class="trackAllButton"
            class="svg-icon"
            style="margin-left: 15px;"
          />
          <div class="track-all-button">
            全部轨迹
          </div>
        </div>
        <div class="bottom-list">
          <el-scrollbar style="overflow-x:hidden;height: 78%;width:90%;">
            <div
              v-for="(track,index) in trackList"
              :key="index"
              style="overflow:hidden"
            >
              <div class="date">
                <svg-icon
                  icon-class="faceDateList"
                  class="svg-icon"
                />
                <span class="date-detail">{{ track.date }}</span>
                <span
                  class="check-date-button"
                  @click="lookPath(track.trackArr)"
                >查看轨迹</span>
              </div>
              <ul>
                <el-scrollbar style="overflow-x:hidden;height: 90%;">
                  <li
                    v-for="(trackItem, index) in track.trackArr"
                    :key="index"
                    :class="trackItem.index===selectedItem.index?'li-active':''"
                    @click="handleSelectedItem(trackItem)"
                  >
                    <span class="index">{{ trackItem.index }}</span>
                    <span class="time">{{ trackItem.time }}</span>
                    <span class="vechicle-number">{{ trackItem.plateNo }}</span>
                  </li>
                </el-scrollbar>
              </ul>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col
        :span="18"
        class="right-contianer"
      >
        <el-row class="right-top">
          <el-image
            ref="vehCapPhoto"
            :preview-src-list="[selectedItem.imagePath]"
            :src="selectedItem.imagePath"
            class="center"
            style="width: 280px;height: 200px;"
          />
          <div class="top-label">
            抓拍对象
          </div>
        </el-row>
        <el-row
          v-loading="mapTrackLoading"
          class="right-bottom"
          element-loading-text="轨迹加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <AMap
            style="width:100%;height:100%"
            @mapInit="mapInit"
          >
            <template v-if="markerVisible">
              <el-amap-marker :position="selectedItem?[selectedItem.longitude, selectedItem.latitude]:[]">
                <el-image
                  :src="require('@/assets/images/personControl/car.png')"
                  style="width:50px;height:100px"
                />
              </el-amap-marker>
            </template>

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
                  src="@/assets/images/personControl/close.png"
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
                    >{{ infoWindowData.plateTypeText }}</span>
                  </div>
                  <div class="item-p">
                    <span>车辆品牌：</span>
                    <span class="value-text">{{ infoWindowData.vehicleLogoText }}</span>
                  </div>
                  <div class="item-p">
                    <span>车辆类型：</span>
                    <span class="value-text">{{ infoWindowData.vehicleTypeText }}</span>
                  </div>
                  <div class="item-p">
                    <span>车辆颜色：</span>
                    <span class="value-text">{{ infoWindowData.vehicleColorText }}</span>
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
          </AMap>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VehicleVideoModal from './VehicleVideoModal'
import AMap from './map'

export default {
  components: {
    AMap,
    VehicleVideoModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      map: null,
      trackList: [],
      selectedItem: null,
      navg: null,
      vehicleInfo: {
        plateNo: '',
        plateTypeText: '',
        vehicleLogoText: '',
        vehicleTypeText: '',
        vehicleColorText: '',
        imagePath: ''
      },

      vehicleVideoModal: {
        visible: false,
        info: null
      },
      infoWindowData: null,
      infoWindowEvents: {
        close: () => {
          this.infoWindowData = null
        }
      },

      markerVisible: true,
      mapTrackLoading: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        // console.log(this.info)
        this.markerVisible = true
        this.trackList = this.info.trackList
        this.selectedItem = this.info.trackList[0].trackArr[0]
        this.vehicleInfo = {
          plateNo: this.selectedItem.plateNo,
          plateTypeText: this.selectedItem.plateTypeText,
          vehicleLogoText: this.selectedItem.vehicleLogoText,
          vehicleTypeText: this.selectedItem.vehicleTypeText,
          vehicleColorText: this.selectedItem.vehicleColorText,
          imagePath: this.selectedItem.imagePath
        }
      }
    }
  },
  methods: {
    // 地图初始化
    mapInit (map) {
      this.map = map
      this.map.setCenter([
        this.selectedItem.longitude,
        this.selectedItem.latitude
      ])
      this.map.setZoom(18)
    },
    // 关闭弹窗
    close () {
      this.$emit('update:visible', false)
    },
    handleSelectedItem (trackItem) {
      this.selectedItem = trackItem
      this.markerVisible = true
      this.infoWindowData = null
      if (this.navg) {
        this.navg.destroy()
      }
      if (window.pathSimplifierIns) {
        // eslint-disable-next-line no-undef
        pathSimplifierIns.setData([])
      }
      this.map.setCenter([
        this.selectedItem.longitude,
        this.selectedItem.latitude
      ])
      this.map.setZoom(18)
    },
    // 查看单日轨迹
    lookPath (list) {
      this.markerVisible = false
      const pathList = []
      console.log(list)
      list.forEach((item) => {
        pathList.push({
          ...item,
          lnglat: [item.longitude, item.latitude]
        })
      })
      this.renderPath(pathList.reverse())
    },
    // 查看所有轨迹
    lookAllPath (allStracks) {
      this.markerVisible = false
      const pathList = allStracks
      pathList.reverse()
      const needList = []
      pathList.forEach((item) => {
        if (item.longitude && item.latitude) {
          needList.push({
            ...item,
            lnglat: [item.longitude, item.latitude]
          })
        }
      })

      this.renderPath(needList)
    },
    // 查看视频
    lookVideo (cameraIndexCode) {
      this.personVideoModal.visible = true
      this.personVideoModal.info = {
        cameraIndexCode: cameraIndexCode
      }

      this.infoWindowData = null
    },
    // 绘制轨迹
    renderPath (path) {
      const that = this
      if (that.navg) {
        that.navg.destroy()
      }

      if (window.pathSimplifierIns) {
        // eslint-disable-next-line no-undef
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
              require('@/assets/images/personControl/car.png'),
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
.person-stack-contianer {
  padding: 30px;
  background: url('~@/assets/images/events/eventModal-bg.png') no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 70%;
  height: 752px;
  z-index: 999;
  background-color: transparent;

  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .viewToggle {
    right: -100% !important;
  }

  /deep/ .modal {
    z-index: 9999;
  }

  /deep/ .amap-marker-label {
    background: rgba(0, 255, 255, 1);
    opacity: 0.9;
    border-radius: 6px;
    padding: 3px 5px;
    border: 1px solid rgba(0, 0, 0, 0.51);
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

  .eventMarker {
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    p {
      background: url('~@/assets/images/personControl/marker-bg.png') no-repeat 100% 100%;
      margin: 0 0 4px 0;
      padding: 3px 6px;
      word-wrap: none;
      word-break: keep-all;
    }
  }

  .modal-content {
    position: relative;
    width: 600px !important;
    height: 250px !important;
    padding: 10px 20px;
    background: url('~@/assets/images/personControl/search-modal-bg.png') no-repeat
      100% 100%;
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
      flex: 0 0 70%;
      padding-right: 25px;
    }

    .content-right {
      flex: 0 0 30%;
    }
  }

  .content-right {
    /deep/ .el-image-viewer__close {
      top: 150px;
    }
    /deep/ .el-image-viewer__img {
      transform: scale(0.45) rotate(0deg) !important;
    }
  }

  /deep/ .el-icon-circle-close {
    color: #fff;
    z-index: 99999;
  }

  .close {
    cursor: pointer;
    position: absolute;
    z-index: 1002;
    left: 95.73%;
    top: 22px;
    width: 5px;
    height: 20px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    display: inline-block;
  }

  .close:after {
    cursor: pointer;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 20px;
    background: #fff;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .left-menu {
    height: 100%;
    background: url('~@/assets/images/personControl/left-menu.png') no-repeat
      center center;
    background-size: 100% 100%;
    padding: 15px 0 0 0 !important;
    .title {
      color: #01ffff;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      margin-left: 35px;
    }
    .title-second {
      margin-top: 15px;
      display: inline-block;
    }
    .record-num {
      display: inline-block;
      margin-left: 5px;
      width: 126px;
      height: 32px;
      text-align: center;
      color: #fff;
      line-height: 32px;
      background: url('~@/assets/images/personControl/record-button.png')
        no-repeat center center;
      background-size: 100% 100%;
    }
    .track-all-button {
      display: inline-block;
      margin-left: -20px;
      color: #fff;
      line-height: 32px;
    }
    .top-list {
      background-color: #003b72;
      width: 80%;
      margin: 0 auto;
      padding: 4px 3px;
      ul {
        list-style-type: none;
        padding: 0;
        li {
          font-size: 14px;
          line-height: 24px;
          .label {
            color: #01ffff;
          }
          .info {
            display: inline-block;
            margin-left: 15px;
            color: #fff;
          }
        }
      }
    }
    .bottom-list {
      width: 100%;
      height: 65%;
      margin: 20px auto 0;
      .date {
        width: 85%;
        margin: 10px 5px 20px 35px;
        .svg-icon {
          color: #01ffff;
          font-size: 20px;
        }
        .date-detail {
          display: inline-block;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          margin-left: 15px;
        }
        .check-date-button {
          cursor: pointer;
          display: inline-block;
          color: #fff;
          font-size: 14px;
          // font-weight: bold;
          margin-left: 60px;
        }
      }
      ul {
        list-style-type: none;
        padding: 0 !important;
        width: 300px;
        height: 285px;
        background: #022b54;
        margin: auto 0 auto 25px;
      }
      li {
        cursor: pointer;
        width: 100%;
        height: 50px;
        padding: 10px 0;
        .index {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #145fc0;
          border-radius: 50% 50%;
          color: #fff;
          line-height: 20px;
          text-align: center;
          margin: 0 10px 0 5px;
          font-size: 12px;
        }
        .time {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
        .vechicle-number {
          display: inline-block;
          padding: 5px;
          color: #fff;
          margin-left: 110px;
        }
      }
      .li-active {
        background-color: #195b9d !important;
        .index {
          background-color: #023466 !important;
        }
      }
    }
  }

  //   .right-contianer {
  //   }

  .right-top {
    position: relative;
    height: 200px;
    background: url('~@/assets/images/personControl/right-top.png') no-repeat
      center center;
    background-size: 100% 100%;
    margin-bottom: 8px;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 99;
      width: 180px;
      height: 180px;
      padding: 15px 0 45px;
      // background: url('~@/assets/image/staffAdminFace/right-top-yuan.png')
      //   no-repeat center center;
      // background-size: 100% 100%;
      text-align: center;
      color: #16d0ff;
    }
    .top-label {
      position: absolute;
      bottom: 15px;
      width: 100%;
      text-align: center;
      color: #04dbe0;
      font-size: 16px;
    }
    .left,
    .right {
      padding-top: 30px;
      flex: 0.45;
      background-color: #003b72;
      height: 85%;
      text-align: center;
      line-height: 90%;
      .label {
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #01ffff;
        margin-top: 20px;
      }
    }
  }
  .right-bottom {
    border: 1px solid #4cdbff;
    padding: 2px;
    border-radius: 8px;
    height: 480px;
  }
}
</style>
