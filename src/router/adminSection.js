export const releaseManagement = [
  {
    path: '/intelligentOffice/adminReleaseManagement/announcement',
    name: 'announcement',
    meta: {
      title: '通知公告管理',
      icon: 'earlyWarning'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/announcement.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/systemConstruction',
    name: 'systemConstruction',
    meta: {
      title: '制度建设管理',
      icon: 'sociology'
    },
    component: () =>
      import(
        '@/views/intelligentOffice/releaseManagement/systemConstruction.vue'
      )
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/mountains',
    name: 'mountains',
    meta: {
      title: '他山之石管理',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/mountains.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/workDynamicsReview',
    name: 'workDynamics',
    meta: {
      title: '工作动态待审核',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/workDynamics.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/dynamicsCity',
    name: 'dynamicsCity',
    meta: {
      title: '工作动态管理(市)',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/dynamicsCity.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/dynamicsArea',
    name: 'dynamicsArea',
    meta: {
      title: '工作动态管理(区)',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/dynamicsArea.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/dynamicsRelease',
    name: 'dynamicsRelease',
    meta: {
      title: '工作动态发布评估',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/dynamicsRelease.vue')
  }
]
