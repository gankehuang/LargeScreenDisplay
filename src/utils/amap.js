import VueAMap from 'vue-amap'
import Vue from 'vue'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '3a6d147e8bd4d28253b40f01c43e3733',
  plugin: [
    'MouseTool',
    'RangingTool',
    'Heatmap'
  ],
  v: '1.4.15',
  uiVersion: '1.0'
})
