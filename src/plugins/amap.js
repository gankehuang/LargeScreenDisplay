import Vue from 'vue'
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '3a6d147e8bd4d28253b40f01c43e3733',
  plugin: [
    'MouseTool',
    'RangingTool',
    'Heatmap',
    'PathSimplifier',
    'MarkerClusterer',
    'AMap.RangingTool',
    ''
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0'
})
