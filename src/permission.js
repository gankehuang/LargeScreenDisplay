import router from './router'
// import store from './store'
import { getToken } from '@/utils/auth'
//
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // next()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  console.log(
    isChunkLoadFailed,
    '/Loading chunk (d)+ failed/g',
    '路由懒加载找不到对应的moudle'
  )
  if (isChunkLoadFailed) {
    router.replace(router.history.pending.fullPath)
  } else {
    console.log(error)
  }
})
