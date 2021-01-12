import {
  releaseManagement,
  materialSubmit,
  postManage
} from '@/router/adminSection'
const state = {
  isCollapse: false,
  adminRouters: []
}

const mutations = {
  SET_ADMINROUTERS: (state, routerType) => {
    if (routerType === 'adminReleaseManagement') {
      state.adminRouters = releaseManagement
    } else if (routerType === 'adminMaterialSubmit') {
      state.adminRouters = materialSubmit
    } else if (routerType === 'adminPostManage') {
      state.adminRouters = postManage
    }
  },
  SET_ASIDESTATUS (state, status) {
    state.isCollapse = status
  }
}

const getters = {
  isCollapse: state => state.isCollapse
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
