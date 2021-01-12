import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
// import asideRouters from './modules/asideRouters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
    // asideRouters
  },
  getters
})

export default store
