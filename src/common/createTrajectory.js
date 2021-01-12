/**
 * @function 高德地图中循环轨迹
 * @description 渲染高德地图轨迹和巡航器
 * @return void
 * @param map 地图容器
 * @param points 轨迹列表(必须有lnglat:[经度,纬度]字段)
 * @param config 轨迹和巡航器配置参数
 * @param pointClick 轨迹节点点击事件
 */

function renderPath (map, points, config, pointClick) {
  const {
    autoSetFitView = true, // 轨迹路径是否自适应
    width = 30, // 巡航器图片宽度
    height = 30, // 巡航器图片高度
    isAutoRotate = true, // 巡航器自动调节方向
    avatar, // 巡航器头像
    speed = 1000, // 巡航速度，单位千米/小时
    loop = true //  是否循环播放巡航器
  } = config

  if (window.pathSimplifierIns) {
    window.pathSimplifierIns.setData([])
  }

  if (window.navg) {
    window.navg.destroy()
  }

  if (!points || !points.length) {
    return
  }

  window.AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (
    PathSimplifier,
    $
  ) {
    if (!PathSimplifier.supportCanvas) {
      alert('当前环境不支持 Canvas！')
      return
    }

    const pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      autoSetFitView: autoSetFitView,
      map: map, // 所属的地图实例
      getPath: function (pathData, pathIndex) {
        const points = pathData.points
        return points.map(item => {
          return item.lnglat
        })
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
          lineWidth: 3,
          strokeStyle: '#C11534',
          borderWidth: 1,
          borderStyle: '#cccccc',
          dirArrowStyle: true
        },
        dirArrowStyle: {
          stepSpace: 20,
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
          radius: 3,
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
        points: points
      }
    ])

    function onload () {
      pathSimplifierIns.renderLater()
    }

    function onerror (e) {
      alert('图片加载失败！')
    }

    // 对第一条线路（即索引 0）创建一个巡航器
    window.navg = pathSimplifierIns.createPathNavigator(0, {
      loop: loop, // 循环播放
      speed: speed, // 巡航速度，单位千米/小时
      pathNavigatorStyle: {
        width: width,
        height: height,
        autoRotate: isAutoRotate,
        // 使用图片
        content: PathSimplifier.Render.Canvas.getImageContent(
          avatar,
          onload,
          onerror
        ),
        strokeStyle: null,
        fillStyle: null,
        pathTolerance: 5,
        keyPointTolerance: 3,
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

    window.navg.start()

    if (pointClick) {
      pathSimplifierIns.on('pointClick', function (e, info) {
        pointClick(e, info)
      })
    }
  })
}

/**
 * @function 高德地图中动态延伸轨迹
 * @description 渲染高德地图轨迹和巡航器
 * @return void
 * @param map 地图容器
 * @param points 轨迹列表(必须有lnglat:[经度,纬度]字段)
 * @param config 轨迹和巡航器配置参数
 * @param pointClick 轨迹节点点击事件
 */
function expandRenderPath (map, points, config, pointClick) {
  const {
    width = 30, // 巡航器图片宽度
    height = 30, // 巡航器图片高度
    isAutoRotate = true, // 巡航器自动调节方向
    avatar, // 巡航器头像
    speed = 100000000000, // 普通巡航器速度
    carNavgSpeed = 1000, // 巡航速度，单位千米/小时
    loop = true //  是否循环播放巡航器
  } = config
  const data = [
    {
      name: '动态路线',
      points: points.slice(0, 1)
    }
  ]
  if (window.trajectoryTimer) {
    clearTimeout(window.trajectoryTimer)
  }
  if (window.navg) {
    window.navg.destroy()
  }
  if (window.carNavg) {
    window.carNavg.destroy()
  }
  if (window.pathSimplifierIns) {
    window.pathSimplifierIns.setData([])
  }

  window.AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (
    PathSimplifier,
    $
  ) {
    if (!PathSimplifier.supportCanvas) {
      alert('当前环境不支持 Canvas！')
      return
    }

    const pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      autoSetFitView: false,
      map: map, // 所属的地图实例
      getPath: function (pathData, pathIndex) {
        const points = pathData.points
        return points.map(item => {
          return item.lnglat
        })
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
    window.pathSimplifierIns.setData(data)

    // 对第一条线路（即索引 0）创建一个巡航器
    window.navg = window.pathSimplifierIns.createPathNavigator(0, {
      speed: speed, // 巡航速度，单位千米/小时
      pathNavigatorStyle: {
        content: 'none'
      }
    })

    // 动态延展路径
    let endIdx = 0
    function expandPath () {
      function doExpand () {
        endIdx++

        if (endIdx >= points.length) {
          return false
        }

        const cursor = window.navg.getCursor().clone() // 保存巡航器的位置
        const status = window.navg.getNaviStatus()

        data[0].points = points.slice(0, endIdx + 1)
        pathSimplifierIns.setData(data) // 延展路径

        // 重新建立一个巡航器
        window.navg = pathSimplifierIns.createPathNavigator(0, {
          speed: speed, // 巡航速度，单位千米/小时
          pathNavigatorStyle: {
            content: 'none'
          }
        })

        if (status !== 'stop') {
          window.navg.start()
        }

        // 恢复巡航器的位置
        if (cursor.idx >= 0) {
          window.navg.moveToPoint(cursor.idx, cursor.tail)
        }

        return true
      }

      if (doExpand()) {
        window.trajectoryTimer = setTimeout(expandPath, 1)
      } else {
        carRun()
      }
    }

    // 车子巡航
    function carRun () {
      function onload () {
        window.pathSimplifierIns.renderLater()
      }

      function onerror (e) {
        alert('图片加载失败！')
      }
      window.carNavg = window.pathSimplifierIns.createPathNavigator(0, {
        loop: loop, // 循环播放
        speed: carNavgSpeed, // 巡航速度，单位千米/小时
        pathNavigatorStyle: {
          width: width,
          height: height,
          autoRotate: isAutoRotate,
          // 使用图片
          content: PathSimplifier.Render.Canvas.getImageContent(
            avatar,
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

      window.carNavg.start()
    }

    window.navg.start()
    expandPath()

    if (pointClick) {
      pathSimplifierIns.on('pointClick', function (e, info) {
        pointClick(e, info)
      })
    }
  })
}

export { renderPath, expandRenderPath }
