// 创建普通div类型图标标记
function createMapMarker (config) {
  const {
    icon, // 本地图标地址
    size = [49, 60], // 图标尺寸
    imageSize = [28, 36], // 图标背景图片大小
    zIndex = 100, // 点标记的叠加顺序
    position, // 点标记的经纬度
    offset = [-10, -34], // 点标记显示位置偏移量
    extData = {}, // 该标记需要存储的数据
    title = '', // 鼠标滑过标题
    visible = true, // 是否显示
    content, // 点标记显示内容, 可以是HTML要素字符串或者HTML DOM对象
    draggable = false, // 设置点标记是否可拖拽移动，默认为false
    raiseOnDrag = false // 设置拖拽点标记时是否开启点标记离开地图的效果
  } = config
  const markerObj = {
    zIndex,
    position,
    offset: new window.AMap.Pixel(offset[0], offset[1]),
    extData,
    visible,
    draggable,
    raiseOnDrag
  }
  if (icon && !content) {
    markerObj.icon = new window.AMap.Icon({
      image: icon,
      size: new window.AMap.Size(size[0], size[1]), // 图标所处区域大小
      imageSize: new window.AMap.Size(imageSize[0], imageSize[1]) // 图标大小
    })
  }

  if (content) {
    markerObj.content = content
  }

  if (title) {
    markerObj.title = title
  }

  return new window.AMap.Marker(markerObj)
}

/*
创建普通div类型图标标记列表
map 地图容器(必填)
list 原始列表数据(必填)
resultMarkFunc 对某一项数据处理的函数(选填)
markClickFunc 标记点点击函数(选填)
return 创建好的标记点列表
*/
function createMapMarkerList (map, list, resultMarkFunc, markClickFunc) {
  const markerList = []
  list.forEach(item => {
    const handledItem = resultMarkFunc(item)
    if (
      handledItem &&
      typeof handledItem === 'object' &&
      'configItem' in handledItem) {
      const { configItem, dataItem } = handledItem
      const baseConfig = {
        isNeedMarkClickFunc: false // 是否需要点击事件
      }

      Object.assign(baseConfig, configItem)

      if (dataItem) {
        const marker = createMapMarker(dataItem)
        if (markClickFunc && baseConfig.isNeedMarkClickFunc) {
          marker.on('click', event => {
            markClickFunc(event.target.w.extData)
          })
        }
        markerList.push(marker)
      }
    } else {
      if (handledItem) {
        const marker = createMapMarker(handledItem)
        if (markClickFunc) {
          marker.on('click', event => {
            markClickFunc(event.target.w.extData)
          })
        }

        markerList.push(marker)
      }
    }
  })

  map.add(markerList)

  return markerList
}

// 创建聚合类型图标标记
// window.clusterer 重新设置聚合列表 例如：window.clusterer.setMarkers([]) 清空聚合点
function createPolymerizationMarker (
  map, // 地图容器（必填）
  polymerizationList, // 原始数据列表（必填）
  config, // 配置项（选填）
  onePointClickCallback, // 具体某一个标记点击事件（选填）
  onePointDragendCallback // 具体某一个标记点拖拽（选填）
) {
  const {
    className = '', // 聚合点的class
    gridSize = 80, // 聚合面积大小
    maxZoom = 16, // 放大到指定层级不聚合
    averageCenter = false,
    draggable = false, // 设置点标记是否可拖拽移动，默认为false
    compatibleKeys = {
      // 兼容不同数据格式key对象
      longitude: 'longitude',
      latitude: 'latitude',
      title: 'name'
    }
  } = config

  if (window.clusterer) {
    window.clusterer.setMarkers([])
  }

  let markers = []

  if (polymerizationList.length) {
    markers = createMassiveMakerList(
      polymerizationList,
      {
        className,
        compatibleKeys,
        draggable
      },
      onePointClickCallback,
      onePointDragendCallback
    )
  }

  const count = polymerizationList.length
  const _renderClusterMarker = function (context) {
    const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
    context.marker.setOffset(new window.AMap.Pixel(-size / 2, -size / 2))
    context.marker.setContent(`<div class="massive-point ${className}">
        <i class="icon"></i>
        <span class="num">${context.count}</span>
        </div>`)
  }

  window.clusterer = new window.AMap.MarkerClusterer(map, markers, {
    gridSize: gridSize,
    maxZoom: maxZoom,
    minClusterSize: 2,
    averageCenter: averageCenter,
    renderClusterMarker: _renderClusterMarker
  })

  return markers
}

// 创建聚合点markers
function createMassiveMakerList (
  list,
  config,
  onePointClickCallback,
  onePointDragendCallback
) {
  // className 聚合点的class（必填）
  // compatibleKeys  选填
  const { className, compatibleKeys, draggable = false } = config
  const baseCompatibleKeys = {
    // 兼容不同数据格式key对象
    longitude: 'longitude',
    latitude: 'latitude',
    title: 'name'
  }

  if (compatibleKeys &&
    Object.prototype.toString.call(compatibleKeys) === '[object Object]') {
    Object.assign(baseCompatibleKeys, compatibleKeys)
  }

  const markers = []
  list.forEach(item => {
    if (
      item[baseCompatibleKeys.longitude] &&
      item[baseCompatibleKeys.latitude]
    ) {
      const marker = new window.AMap.Marker({
        position: [
          item[baseCompatibleKeys.longitude],
          item[baseCompatibleKeys.latitude]
        ],
        content: `<div class="massive-point ${className}"><i class="icon"></i><span class="num">1</span></div>`,
        offset: new window.AMap.Pixel(-15, -15),
        extData: item,
        title: baseCompatibleKeys.title
          ? item[baseCompatibleKeys.title]
          : item.name,
        draggable
      })

      if (onePointClickCallback) {
        marker.on('click', event => {
          onePointClickCallback(event.target.w.extData)
        })
      }

      if (draggable && onePointDragendCallback) {
        marker.on('dragend', event => {
          onePointDragendCallback(event.target.w.extData)
          marker.setPosition([
            item[baseCompatibleKeys.longitude],
            item[baseCompatibleKeys.latitude]
          ])
        })
      }

      markers.push(marker)
    }
  })
  return markers
}

export {
  createMapMarker,
  createMapMarkerList,
  createPolymerizationMarker,
  createMassiveMakerList
}
