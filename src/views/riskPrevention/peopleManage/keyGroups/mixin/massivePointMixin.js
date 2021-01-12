import {
  createMapMarkerList,
  createPolymerizationMarker
} from '@/common/createMapMarker'
import {
  getAcceptInfoByNo,
  getMentalInfoByNo,
  getReleaseInfoByNo,
  getVeteransInfoByNo,
  getKeyPopulationGps
} from '@/api/riskPrevention/peopleManage/keyGroups'

export default {
  data () {
    return {
      searchMarkerList: []
    }
  },
  methods: {
    // 搜索人员标记
    async toSearch () {
      this._resetMap()
      let list = []
      switch (this.curPageType) {
        case '精神障碍患者':
          await getMentalInfoByNo({ name: this.searchKey }).then(res => {
            const { status, data } = res
            if (status === 200) {
              list = data
              if (data.length > 0) {
                this._createSearchMakerList(data, 'mentalDisease')
              } else {
                this.$message.warning('暂无该人员信息')
              }
            }
          })
          break

        case '重点信访人员':
          await getAcceptInfoByNo({ name: this.searchKey }).then(res => {
            const { status, data } = res
            if (status === 200) {
              list = data
              if (data.length > 0) {
                this._createSearchMakerList(data, 'petitionLetter')
              } else {
                this.$message.warning('暂无该人员信息')
              }
            }
          })
          break

        case '退役重点人员':
          await getVeteransInfoByNo({ name: this.searchKey }).then(res => {
            const { status, data } = res
            if (status === 200) {
              list = data
              if (data.length > 0) {
                this._createSearchMakerList(data, 'retire')
              } else {
                this.$message.warning('暂无该人员信息')
              }
            }
          })
          break

        case '刑释解戒人员':
          await getReleaseInfoByNo({ name: this.searchKey }).then(res => {
            const { status, data } = res
            if (status === 200) {
              list = data
              if (data.length > 0) {
                this._createSearchMakerList(data, 'released')
              } else {
                this.$message.warning('暂无该人员信息')
              }
            }
          })
          break

        case '社区矫正人员':
          await getMentalInfoByNo({ name: this.searchKey }).then(res => {
            const { status, data } = res
            if (status === 200) {
              list = data
              if (data.length > 0) {
                this._createSearchMakerList(data, 'correct')
              } else {
                this.$message.warning('暂无该人员信息')
              }
            }
          })
          break
      }

      if (list.length) {
        this._focusMap([list[0].lon, list[0].lat])
      }
    },
    // 获取人员点位列表信息
    getKeyPopulationGps (type, className) {
      // this.loading = true
      getKeyPopulationGps({
        type
      }).then(res => {
        this.loading = false
        const { status, data } = res
        if (status === 200) {
          createPolymerizationMarker(
            this.map,
            data,
            {
              className: className,
              gridSize: 120
            },
            data => {
              this.personModal.visible = true
              this.personModal.info = {
                curPageType: this.curPageType,
                ...data
              }
            }
          )
        }
      })
    },
    // 创建搜索点
    _createSearchMakerList (list, className) {
      this.searchMarkerList = createMapMarkerList(
        this.map,
        list,
        function (item) {
          return {
            position: [item.lon, item.lat],
            content: `<div class="massive-point ${className} twinkle1"><i class="icon"></i><span class="num">1</span></div>`,
            extData: item,
            title: item.phychosis_NAME
          }
        },
        data => {
          this.personModal.visible = true
          this.personModal.info = {
            curPageType: this.curPageType,
            ...data
          }
        }
      )
    }
  }
}
