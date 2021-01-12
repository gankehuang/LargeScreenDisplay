import Vue from 'vue'
import localforage from 'localforage'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'

import './icons'
import '@/plugins/element.js'
import '@/plugins/component.js'
import '@/plugins/echarts'
import '@/styles/index.scss'
import '@/permission'
import * as filters from '@/plugins/filters.js'
import * as directives from '@/plugins/directives.js'

// 插入过滤器名和对应方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 插入指令和对应方法
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false
window.localforage = localforage

// 公共bus
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
