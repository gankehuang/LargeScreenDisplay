<template>
  <div
    v-loading="loading"
    class="page-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <NavTabs
      :nav-list="navTabsList"
      :active-index="0"
    />

    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo"
        :vid="eventInfo.id"
        :position="[eventInfo.longitude, eventInfo.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker
          :event-type="eventInfo.typeText"
          @markerClick="showEventDetail(eventInfo)"
        />
      </el-amap-marker>

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
            src="@/assets/images/common/close-btn.png"
            @click="infoWindowData = null"
          >

          <div class="content-left">
            <div class="item-p">
              <span>网格归属：</span>
              <span class="value-text">{{
                infoWindowData.gridSubPath || '暂无'
              }}</span>
            </div>
            <div
              class="item-p"
              style="display: flex"
            >
              <span style="align-self: center">姓名：</span>
              <span class="value-text">{{ infoWindowData.faceName }}</span>
            </div>
            <div class="item-p">
              <span>抓拍时间：</span>
              <span class="value-text">{{ infoWindowData.alarmTime }}</span>
            </div>
            <div class="item-p">
              <span>抓拍地点：</span>
              <span class="value-text">{{
                infoWindowData.snapLocation || '暂无'
              }}</span>
            </div>
          </div>
          <div class="content-right">
            <el-image
              style="width:100px;height:100px"
              :z-index="9999"
              fit="contain"
              :src="infoWindowData.bkgUrl"
              :preview-src-list="[infoWindowData.bkgUrl]"
            />
            <div
              class="look-trajectory"
              @click="lookVideo(infoWindowData)"
            >
              查看视频
            </div>
          </div>
        </div>
      </el-amap-info-window>
    </SimpleMap>

    <div
      v-if="showCloseButton"
      class="closeTrajectory"
      @click="closeTrajectory"
    >
      <i class="iconfont el-icon-close" />
      关闭轨迹
    </div>
    <div
      v-if="curPageType !== '失意人员'"
      class="search-btn"
    >
      <el-input
        v-model="searchKey"
        placeholder="请搜索人员名称"
      />
      <div
        class="searchIcon"
        @click="toSearch"
      />
    </div>

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <keep-alive>
        <component :is="curLeftComponent" />
      </keep-alive>
    </transition>
    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <keep-alive>
        <component :is="curRightComponent" />
      </keep-alive>
    </transition>

    <PageSwitch @switchPage="switchPage" />

    <!--人员信息-->
    <PeronInfoModal
      :visible.sync="personModal.visible"
      :info="personModal.info"
      @showPath="showPath"
    />

    <!--标记点视频弹框-->
    <PersonVideoModal
      :visible.sync="personVideoModal.visible"
      :info="personVideoModal.info"
    />

    <!-- 失意人员弹框 -->
    <MessTable :visible.sync="messTableVisible" />

    <!--事件详情弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      :grid-code="gridCode"
      :people-label="peopleLabel"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = 'event'"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @closeModal="modal = 'event'"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="modal = 'event'"
    />
  </div>
</template>

<script>
import navTabsMixin from '@/views/riskPrevention/mixin/navTabsMixin'
import massivePointMixin from './mixin/massivePointMixin'
import trajectoryMixin from './mixin/trajectoryMixin'
import eventMixin from './evenModule/eventMixin'

import PageSwitch from './PageSwitch'

import MentalDiseaseLeft from './mentalDisease/Left/index'
import MentalDiseaseRight from './mentalDisease/Right/index'
import PetitionLetterLeft from './petitionLetter/Left/index'
import PetitionLetterRight from './petitionLetter/Right/index'
import RetireLeft from './retire/Left/index'
import RetireRight from './retire/Right/index'
import CorrectLeft from './correct/Left/index'
import CorrectRight from './correct/Right/index'
import ReleasedLeft from './released/Left/index'
import ReleasedRight from './released/Right/index'

import MessTable from './MessTable'
import PeronInfoModal from './PeronInfoModal'
import PersonVideoModal from './PersonVideoModal'

export default {
  components: {
    PageSwitch,
    MentalDiseaseLeft,
    MentalDiseaseRight,
    PetitionLetterLeft,
    PetitionLetterRight,
    RetireLeft,
    RetireRight,
    CorrectLeft,
    CorrectRight,
    ReleasedLeft,
    ReleasedRight,
    PeronInfoModal,
    PersonVideoModal,
    MessTable
  },
  mixins: [navTabsMixin, eventMixin, massivePointMixin, trajectoryMixin],
  data () {
    return {
      loading: false,
      map: null,
      curLeftComponent: 'MentalDiseaseLeft',
      curRightComponent: 'MentalDiseaseRight',
      messTableVisible: false,
      personModal: {
        visible: false,
        info: null
      },
      personVideoModal: {
        visible: false,
        info: null
      },
      infoWindowData: null,
      infoWindowEvents: {
        close: () => {
          this.infoWindowData = null
        }
      },
      searchKey: '',
      curPageType: '精神障碍患者',
      showCloseButton: false
    }
  },
  beforeDestroy () {
    window.clusterer = null
    window.pathSimplifierIns = null
  },
  methods: {
    mapInit (map) {
      this.map = map
      this._focusMap([113.862187, 27.661108], 13)
      this.getKeyPopulationGps(3, 'mentalDisease')
    },
    // 聚焦地图
    _focusMap (pos, zoom) {
      this.map.setCenter(pos)
      this.map.setZoom(zoom)
    },
    // 查看视频
    lookVideo (data) {
      this.personVideoModal.visible = true
      this.personVideoModal.info = data
      this.infoWindowData = null
    },
    // 重置地图标记
    _resetMap () {
      if (this.searchMarkerList.length) {
        this.map.remove(this.searchMarkerList)
        this.searchMarkerList = []
      }
      if (window.clusterer) {
        window.clusterer.setMarkers([])
      }

      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([])
      }

      if (window.navg) {
        window.navg.destroy()
      }
    },
    // 切换页面
    switchPage (item) {
      this.searchKey = ''
      this._resetMap()
      this.curPageType = item.title
      switch (item.title) {
        case '精神障碍患者':
          this.getKeyPopulationGps(3, 'mentalDisease')
          this.curLeftComponent = 'MentalDiseaseLeft'
          this.curRightComponent = 'MentalDiseaseRight'
          break

        case '重点信访人员':
          this.getKeyPopulationGps(4, 'petitionLetter')
          this.curLeftComponent = 'PetitionLetterLeft'
          this.curRightComponent = 'PetitionLetterRight'
          break

        case '退役重点人员':
          this.getKeyPopulationGps(5, 'retire')
          this.curLeftComponent = 'RetireLeft'
          this.curRightComponent = 'RetireRight'
          break

        case '刑释解戒人员':
          this.getKeyPopulationGps(1, 'released')
          this.curLeftComponent = 'ReleasedLeft'
          this.curRightComponent = 'ReleasedRight'
          break

        case '社区矫正人员':
          this.getKeyPopulationGps(2, 'correct')
          this.curLeftComponent = 'CorrectLeft'
          this.curRightComponent = 'CorrectRight'
          break

        case '失意人员':
          this.messTableVisible = true
      }
    },
    // 关闭轨迹
    closeTrajectory () {
      this.showCloseButton = false
      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([])
      }
      if (window.navg) {
        window.navg.destroy()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .mentalDisease {
  .icon {
    background: url('~@/assets/images/keyGroups/jingshen.png') no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .petitionLetter {
  .icon {
    background: url('~@/assets/images/keyGroups/xinfang.png') no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .retire {
  .icon {
    background: url('~@/assets/images/keyGroups/tuiyijunren.png') no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .released {
  .icon {
    background: url('~@/assets/images/keyGroups/xingshijiejie.png') no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .correct {
  .icon {
    background: url('~@/assets/images/keyGroups/jiaozheng.png') no-repeat;
    background-size: 100% 100%;
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

.modal-content {
  position: relative;
  width: 600px !important;
  height: 180px !important;
  padding: 10px 20px;
  background: url('~@/assets/images/keyGroups/search-modal-bg.png') no-repeat
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

/deep/ .gj-btns {
  position: absolute;
  width: 84px;
  height: 36px;
  background: url('~@/assets/images/keyGroups/gj-btn.png');
  background-size: 100% 100%;
  top: 150px;
  left: 450px;
  font-size: 16px;
  font-weight: 400;
  color: #a9daff;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}

/deep/ .search-btn {
  position: absolute;
  width: 252px;
  height: 36px;
  background: url('~@/assets/images/common/input-bg.png');
  background-size: 100% 100%;
  top: 150px;
  left: 460px;
  display: inline-flex;
  .el-input {
    width: calc(100% - 30px);
    height: 36px;
  }
  .el-input__inner {
    height: 36px;
    display: inline-block;
    border: none;
    &::placeholder {
      color: #2971c2;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .searchIcon {
    width: 18px;
    height: 36px;
    background-color: red;
    background: url('~@/assets/images/common/serach-icon.png') no-repeat;
    background-position: 0 8px;
  }
}

.closeTrajectory {
  position: absolute;
  top: 14%;
  right: 25%;
  width: 120px;
  line-height: 40px;
  font-size: 16px;
  color: #A9DAFF;
  cursor: pointer;
  text-align: center;
  background-size: 100% 100%;
  background: url('~@/assets/images/keyGroups/close-button-bg.png')no-repeat center;
}
</style>
