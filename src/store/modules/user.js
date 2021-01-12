import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      })
        .then(res => {
          if (res.status === 200) {
            const token = res.data.Authentication
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          } else {
            reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 用户登出
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout({
  //       access_token: state.token
  //     })
  //       .then(() => {
  //         removeToken() // must remove  token  first
  //         resetRouter()
  //         commit('RESET_STATE')
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  logout ({ commit }) {
    removeToken()
    resetRouter()
  },

  // 清除token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
