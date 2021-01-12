<template>
  <div class="map">
    <el-amap
      :center="center"
      :events="mapEvents"
      :zooms="[3, 20]"
      :rotate-enable="false"
      :pitch-enable="true"
      :expand-zoom-range="true"
      :pitch="50"
      :building-animation="true"
      view-mode="2D"
    >
      <slot />
    </el-amap>

    <slot name="tool" />

    <div
      class="map-reset"
      @click="reset"
    >
      <img src="@/assets/images/layout/map-reset.png">
    </div>

    <div
      class="map-zoom"
    >
      <div
        class="zoom"
        @click="zoomIn"
      >
        <img src="@/assets/images/layout/zoomIn.png">
      </div>
      <div class="division" />
      <div
        class="zoom"
        @click="zoomOut"
      >
        <img src="@/assets/images/layout/zoomOut.png">
      </div>
    </div>
  </div>
</template>

<script>
import '@/utils/amap'

export default {
  props: {
    viewMode: {
      type: String,
      default: '3D'
    }
  },
  data () {
    return {
      gridDetailInfo: null,
      center: [115.791124, 28.611357],
      zoom: 200,
      map: null,
      mapEvents: {
        init: (map) => {
          this.map = map
          this.zoom = map.getZoom()
          // map.setDefaultCursor("crosshair")
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
          this.$emit('mapInit', map, this.zoom)
        },
        click: (e) => {
          console.log([e.lnglat.lng, e.lnglat.lat].toString())
          const { lng, lat } = e.lnglat
          if (
            lng < 115.919776 &&
            lng > 115.919336 &&
            lat > 28.711902 &&
            lat < 28.712006
          ) {
            this.$emit('bindBuildingClick')
          }
        },
        zoomchange: () => {
          this.zoom = this.map.getZoom()
          this.$emit('zoomChange', this.zoom)
        },
        complete: () => {
          this.$emit('complete')
        }
      }
    }
  },
  methods: {
    reset () {
      if (this.layers.length) {
        this.map.setFitView(this.layers)
      } else {
        this.map.setCenter(this.center)
      }
    },
    zoomIn () {
      this.map.zoomIn()
    },
    zoomOut () {
      this.map.zoomOut()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .amap-overlay-text-container {
  background: inherit;
  padding: 0;
  border: 0;
}

/deep/ .amap-info-content {
  width: 1100px;
  height: 730px;
  background: url('~@/assets/images/personControl/groupRentingBg.png') no-repeat;
  background-size: 100% 100%;
}

/deep/ .amap-info-close {
  right: 22px !important;
  top: 20px !important;
}

.map-reset {
  background: rgba(65, 65, 65, 1);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.35);
  position: absolute;
  bottom: 108px;
  width: 28px;
  height: 28px;
  z-index: 3;
  cursor: pointer;
  // .PageCenter();
}

.map-zoom {
  background: rgba(65, 65, 65, 1);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.35);
  position: absolute;
  width: 28px;
  height: 66px;
  bottom: 28px;
  z-index: 3;
  color: #ffffff;
  font-size: 21px;

  .zoom {
    height: 32.5px;
    // .PageCenter();
    cursor: pointer;
  }

  .division {
    width: 20px;
    height: 1px;
    background-color: #ffffff;
    margin: 0px 4px;
  }
}

.info-window {
  position: relative;
  color: #fff;
  .tabs-container {
    padding: 20px;
    display: flex;
    .tabs-item {
      padding: 1px 10px;
      cursor: pointer;
      &.active {
        border-bottom: 1px solid #16d0ff;
      }
    }
  }

  .content {
    display: flex;
    padding: 10px 20px;
    & > .content-left {
      padding: 0 30px;
      width: 25%;
      img {
        width: 140px;
        height: 176px;
      }

      & > div {
        margin-top: 10px;
      }

      .center {
        text-align: center;
        font-size: 16px;
      }

      .info-title {
        margin-top: 20px;
        margin-bottom: 10px;
        text-align: center;
        color: #00cec9;
        font-size: 18px;
      }

      .info-item {
        display: flex;
        flex: 0 0 50%;
        margin-bottom: 15px;
        .item-left {
          flex: 1;
        }
        .item-right {
          flex: 1;
        }
        .value {
          color: #00cec9;
        }
      }
    }
    & > .content-right {
      flex: 0 0 70%;
      .top-text {
        text-align: right;
        color: #feffff;
        margin-bottom: 10px;
      }

      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        & > .item-left {
          width: 52px;
          height: 52px;
          font-size: 20px;
          text-align: center;
          line-height: 52px;
          border-radius: 50%;
          background: #a6a65b;
        }

        & > .item-right {
          margin-left: 10px;
          display: flex;
        }

        &.first > .item-right {
          .item-box {
            display: flex;
            justify-content: space-between;
            width: 172px;
            height: 56px;
            padding: 0 20px;
            line-height: 56px;
            border: 1px solid #797944;
            margin-left: 10px;

            .box-value {
              color: #ffff00;
              font-size: 18px;
            }
          }

          .item-box:first-child {
            margin-left: 0;
          }
        }

        &.second > .item-left {
          background-color: #22cf4d;
        }

        &.second > .item-right {
          width: 720px;
          height: 96px;
          border: 1px solid #27743a;
          align-items: center;

          .grid-item {
            flex: 1;
            padding: 0 20px;
            display: flex;
            align-items: center;

            .grid-item-left {
              padding-right: 10px;

              .svg-icon {
                color: #27743a;
                font-size: 20px;
              }
            }

            .grid-item-right {
              text-align: center;
            }

            .grid-item-value {
              color: #27743a;
              font-size: 18px;
            }
          }
        }

        &.third > .item-left {
          background-color: #029ae0;
        }

        &.third > .item-right {
          width: 720px;
          height: 96px;
          border: 1px solid #065f77;
          align-items: center;

          .grid-item {
            flex: 1;
            padding: 0 20px;

            .grid-item-value {
              color: #00a0e9;
              font-size: 18px;
            }
          }
        }

        &.fourth > .item-left {
          background-color: #8d313d;
        }

        &.fourth > .item-right {
          width: 720px;
          height: 96px;
          border: 1px solid #8d313d;
          align-items: center;

          .grid-item {
            flex: 1;
            align-items: center;
            padding: 0 20px;
            display: flex;

            .grid-item-left {
              padding-right: 10px;

              .svg-icon {
                color: #8d313d;
                font-size: 20px;
              }
            }

            .grid-item-right {
              text-align: center;
            }

            .grid-item-value {
              color: #8d313d;
              font-size: 18px;
              margin-top: 5px;
            }
          }
        }

        &.fifth > .item-left {
          background-color: #7e8595;
        }

        &.fifth > .item-right {
          width: 720px;
          height: 56px;
          border: 1px solid #606674;
          align-items: center;

          .grid-item {
            padding: 0 20px;

            .grid-item-value {
              color: #7e8595;
              font-size: 18px;
            }
          }
        }

        &.sixth > .item-left {
          background-color: #7e6b5a;
        }

        &.sixth > .item-right {
          width: 720px;
          height: 56px;
          border: 1px solid #7e6b5a;
          align-items: center;
          .grid-item {
            padding: 0 20px;

            .grid-item-value {
              color: #7e6b5a;
              font-size: 18px;
            }
          }
        }

        &.seventh > .item-left {
          background-color: #556fb5;
        }

        &.seventh > .item-right {
          width: 720px;
          height: 56px;
          border: 1px solid #556fb5;
          align-items: center;
          .grid-item {
            padding: 0 20px;

            .grid-item-value {
              color: #556fb5;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}

.search-box {
  position: absolute;
  top: 5%;
  right: 18%;
  text-align: center;
  // background-color: transparent;
  color: #fff;
  background: url('~@/assets/images/map/search-bg.png') no-repeat;
  /*background: url('~@/assets/image/map/searchInput.png') no-repeat;*/
  background-size: 100% 100%;
  cursor: pointer;
}

/deep/ .search-box-wrapper {
  padding: 0 15px 0 25px;
}

/deep/ .el-vue-search-box-container {
  height: 43px;
  line-height: 43px;
  // background-color: #163869;
}
/deep/ .el-vue-search-box-container .search-tips {
  width: 100%;
  background-color: transparent;
}
/deep/ .el-vue-search-box-container .search-box-wrapper input {
  color: #fff;
  background-color: transparent;
}
/deep/ .el-vue-search-box-container .search-tips {
  background-color: #052a49;
  opacity: 0.8;
  border: none;
}
/deep/ .el-vue-search-box-container .search-tips ul li.autocomplete-selected {
  background-color: #17cbf8;
}

.el-vue-search-box-container {
  width: 280px;
}

.info-title {
  display: flex;
  align-items: center;
  padding-left: 50px;
  .circle {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    background-color: #17cbf8;
  }

  .title-text {
    padding: 0 10px;
  }
}

</style>
