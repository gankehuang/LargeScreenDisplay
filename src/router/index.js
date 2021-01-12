import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import webSection from './webSection'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function replace (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: Login
  }
]

const createRouter = () =>
  new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [...constantRoutes, ...webSection]
  })

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
