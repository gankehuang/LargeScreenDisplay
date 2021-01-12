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
              <span>网格归属：</span>
              <span class="value-text">{{ infoWindowData.gridSubPath }}</span>
            </div>
            <div
              class="item-p"
              style="display:flex;"
            >
              <span>姓名：</span>
              <span
                style="align-self:center;"
                class="value-text"
              >{{ infoWindowData.name }}</span>
            </div>
            <div class="item-p">
              <span>抓拍时间：</span>
              <span class="value-text">{{ infoWindowData.shootTime }}</span>
            </div>
            <div class="item-p">
              <span>抓拍地点：</span>
              <span class="value-text">{{ infoWindowData.cameraName }}</span>
            </div>
          </div>

          <div class="content-right">
            <el-image
              style="width:80px;height:80px"
              :z-index="9999"
              fit="contain"
              :src="infoWindowData.imageUrl"
              :preview-src-list="srcList"
            />

            <div
              class="look-trajectory"
              @click="lookVideo(infoWindowData.cameraIndexCode)"
            >
              查看视频
            </div>
          </div>
        </div>
      </el-amap-info-window>

      <PersonVideoModal
        :visible.sync="personVideoModal.visible"
        :info="personVideoModal.info"
      />
    </SimpleMap>

    <div class="left">
      <div>
        <el-form
          class="search-form"
          :model="form"
          label-width="90px"
        >
          <el-form-item label="姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="证件号码">
            <el-input
              v-model="form.certificateNumber"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="开始时间">
            <el-date-picker
              v-model="beginTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
            />
          </el-form-item>

          <el-form-item label="结束时间">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
            />
          </el-form-item>
        </el-form>

        <div
          class="search-input"
          @click="getFaceRecordList"
        >
          <i class="el-icon-search" />
          <span class="search-text">搜索</span>
        </div>

        <div
          v-loading="loading"
          class="search-list"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0,0,0,1)"
        >
          <span class="search-title">搜索到相关人员</span>

          <div
            v-if="!personList.length"
            class="no-data"
          />
          <div
            v-else
            class="scrollbar-box"
          >
            <el-scrollbar style="width:100%;height:100%">
              <div class="avatar-list">
                <div
                  v-for="(item, index) in personList"
                  :key="index"
                  class="list-item"
                  :class="{ active: curPersonIndex === index }"
                  @click="selectPerson(item, index)"
                >
                  <div class="item-avatar">
                    <img
                      :src="item.faceUrl"
                      style="width:100%;height:100%;"
                    >
                  </div>
                  <span class="item-title">{{ item.name }}</span>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="search-result">
        <div class="result-top">
          <div class="result-left">
            <div>
              <span class="result-label">姓名：</span>{{ curPersonInfo ? curPersonInfo.name : "" }}
            </div>
            <div>
              <span class="result-label">证件号：</span>{{ curPersonInfo ? curPersonInfo.certificateNumber : "" }}
            </div>
            <div>
              <span class="result-label">抓拍次数：</span>{{ captureNum }}次
            </div>
          </div>
          <div class="result-right">
            <el-image
              v-if="curPersonInfo"
              style="width:100%;height:100%;"
              :z-index="9999"
              :src="curPersonInfo.faceUrl"
              :preview-src-list="[curPersonInfo.faceUrl]"
            />
            <img
              v-else
              :src="require('@/assets/images/informationService/no-avatar.png')"
              style="width:100%;height:100%;"
            >
          </div>
        </div>

        <div
          v-if="!Object.keys(faceCaptureList).length"
          class="no-data"
        />

        <div
          v-else
          class="scrollbar-box"
        >
          <el-scrollbar style="width:100%;height:100%;">
            <div class="list-container">
              <div
                v-for="(value, key, index) in faceCaptureList"
                :key="index"
                class="list-item"
              >
                <div
                  class="item-select"
                  :class="[
                    faceCaptureList[key].active ? 'select-off' : 'select-on'
                  ]"
                  @click="selectPath(value, key, index)"
                />
                <div class="item-time">
                  {{ key }}
                </div>
                <div class="item-num">
                  {{ faceCaptureList[key].pathList.length }}次
                </div>
                <div
                  class="item-btn"
                  @click="lookPath(faceCaptureList[key].pathList)"
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
import { getFaceRecordList, getFaceCaptureList } from '@/api/riskPrevention/peopleManage/informationService'
import PersonVideoModal from './PersonVideoModal'
export default {
  components: {
    PersonVideoModal
  },
  props: {
    visible: Boolean
  },
  data () {
    return {
      map: null,
      form: {
        certificateNumber: '',
        faceLibId: '20200525',
        name: ''
      },
      beginTime: '',
      endTime: '',
      personList: [],
      curPersonIndex: 0,
      curPersonInfo: null,
      faceCaptureList: {},
      totalPathNum: 0,
      captureNum: 0,
      personVideoModal: {
        visible: false,
        info: null
      },
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
        for (const key in this.faceCaptureList) {
          if (!this.faceCaptureList[key].active) {
            flag = false
          } else {
            num++
          }
        }

        this.totalPathNum = num

        if (!flag) {
          this.isSelectAllPath = false
        } else {
          if (Object.keys(this.faceCaptureList).length) {
            this.isSelectAllPath = true
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    dialogClose () {
      this.$emit('update:visible', false)
    },
    opened () {

    },
    mapInit (map) {
      this.map = map
      this.map.setCenter([115.986664, 28.574716])
      this.map.setZoom(12.2)
    },
    getFaceRecordList () {
      this.loading = true
      this.personList = []
      getFaceRecordList(this.form).then(res => {
        this.loading = false
        if (res.status === 200) {
          this.personList = res.data.list
          if (this.personList.length) {
            this.getOneFaceCapture(this.personList[0].certificateNumber)
            this.curPersonInfo = this.personList[0]
            this.curPersonIndex = 0
          }
        }
      })
    },
    selectPerson (item, index) {
      this.curPersonIndex = index
      this.curPersonInfo = item
      this.getOneFaceCapture(item.certificateNumber)
    },
    getOneFaceCapture (idCard) {
      const fd = new FormData()
      fd.append('certificateNumber', idCard)
      fd.append('beginTime', this.beginTime)
      fd.append('endTime', this.endTime)
      getFaceCaptureList(1, 100, fd).then(res => {
        const listObj = {}
        res.data.list.forEach(item => {
          if (item.longitude && item.latitude) {
            const shootTime = item.shootTime.split(' ')
            if (shootTime.length) {
              if ((shootTime[0]) in listObj) {
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

        this.captureNum = res.data.list.length

        this.faceCaptureList = listObj
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
      for (const key in this.faceCaptureList) {
        if (this.faceCaptureList[key].active) {
          const curItem = [...this.faceCaptureList[key].pathList]
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
      this.faceCaptureList[key].active = !this.faceCaptureList[key].active

      this.$set(this.faceCaptureList, key, {
        ...value,
        active: this.faceCaptureList[key].active
      })
    },
    selectAllPath () {
      this.isSelectAllPath = !this.isSelectAllPath
      for (const key in this.faceCaptureList) {
        this.$set(this.faceCaptureList, key, {
          ...this.faceCaptureList[key],
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
        window.pathSimplifierIns.setData([])
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
          getHoverTitle: null,
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
            width: 80,
            height: 80,
            autoRotate: false,
            // 使用图片
            content: PathSimplifier.Render.Canvas.getImageContent(
              that.curPersonInfo.faceImageBase64,
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

        that.navg.start()

        pathSimplifierIns.on('pointClick', function (e, info) {
          console.log(e, info)
          that.infoWindowData = {
            lat: e.originalEvent.lnglat.lat,
            lon: e.originalEvent.lnglat.lng,
            ...info.pathData.points[info.pointIndex]
          }
          that.srcList = [
            that.infoWindowData.bkgUrl ? that.infoWindowData.bkgUrl : that.infoWindowData.imageUrl
          ]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 62px 5px 15px 5px;
}
/deep/ .left {
  margin-top: -30px;
  justify-content: flex-start;
  z-index: 999;
}
/deep/ .right {
  margin-top: -36px;
  justify-content: flex-start;
  z-index: 999;
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.search-form {
  background: url("~@/assets/images/informationService/组 47.png") no-repeat 100%
    100%;
  background-size: 100% 100%;
  width: 376px;
  height: 260px;
  padding: 40px 10px;

  /deep/ .el-input__inner {
    width: 220px;
    background-color: #0088ff59;
    color: #fff;
  }

  /deep/ .el-form-item__label {
    color: #A1D8FF;
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
  background: url("~@/assets/images/informationService/sousuo.png") no-repeat
    100% 100%;
  background-size: 99% 100%;
  width: 372px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A1D8FF;
  cursor: pointer;

  .el-icon-search {
    font-size: 18px;
  }

  .search-text {
    font-size: 18px;
    padding-left: 10px;
  }
}

.search-list {
  position: relative;
  margin-top: 15px;
  width: 366px;
  height: 402px;
  background: url("~@/assets/images/informationService/组 35 拷贝 3.png") no-repeat
    100% 100%;
  background-size: 100% 100%;
  color: #fff;
  .search-title {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
  }

  .no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 140px;
    height: 140px;
    background: url("~@/assets/images/informationService/no-data.png") no-repeat
    100% 100%;
    background-size: 100% 100%;
    transform: translate(-50%, -50%);
  }

  .scrollbar-box {
    height: 400px;
    padding: 40px 20px 20px 20px;
  }
  .avatar-list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      position: relative;
      margin-top: 12px;
      width: 70px;
      height: 83px;
      background: url("~@/assets/images/informationService/组 48 (1).png")
        no-repeat 100% 100%;
      background-size: 100% 100%;
      margin-right: 10px;
      padding-top: 4px;
      .item-avatar {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #01ffff;
        img{
          width: 100%;
          height: 100%;
          border-radius: 60px;
        }
      }

      .item-title {
        position: absolute;
        bottom: 2px;
        text-align: center;
        color: #fff;
        width: 100%;
      }
    }

    .active {
      background: url("~@/assets/images/informationService/组 44.png")
        no-repeat 100% 100%;
      background-size: 100% 100%;
      .item-title {
        color: #1efce3;
      }
    }
  }
}
.search-result {
  background: url("~@/assets/images/informationService/组 48.png") no-repeat
    100% 100%;
  background-size: 100% 100%;
  width: 364px;
  height: 775px;
  color: #fff;
  padding: 20px;
  position: relative;

  .result-label {
    color: #A1D8FF;
    line-height: 2;
  }

  .result-right {
    width: 86px;
    height: 92px;
    padding: 7px 2px 2px 2px;
    background: url("~@/assets/images/informationService/avatar-bg.png") no-repeat 100%
      100%;
    background-size: 100% 100%;
    margin-left: 20px;
  }

  .result-top {
    display: flex;
    .result-left {
      flex: 0 0 65%;
    }
  }

  .no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 140px;
    height: 140px;
    background: url("~@/assets/images/informationService/no-data.png") no-repeat
    100% 100%;
    background-size: 100% 100%;
    transform: translate(-50%, -50%);
  }

  .scrollbar-box {
    height: 450px;
    margin-top: 60px;
    padding: 0 25px;
  }

  .select-on {
    background: url("~@/assets/images/informationService/noSelect-bg.png") no-repeat 100%
      100%;
    background-size: 100% 100%;
    width: 22px;
    height: 22px;
  }

  .select-off {
    background: url("~@/assets/images/informationService/select-bg.png") no-repeat 100%
      100%;
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
    position: absolute;
    bottom: 15px;
    .mark-text {
      color: #f1d431;
    }
    .select-path {
      cursor: pointer;
      .look-icon {
        background: url("~@/assets/images/informationService/startVideo-icon.png")
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
  }
}

.modal-content {
  position: relative;
  width: 600px !important;
  height: 180px !important;
  padding: 10px 20px;
  background: url("~@/assets/images/informationService/search-modal-bg.png") no-repeat 100% 100%;
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
