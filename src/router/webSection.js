import Layout from '@/layout'
// 主模块路由路径需要增加/index,方便页面什么时候显示主导航，什么时候不显示
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/homepage/index',
    name: 'Layout',
    children: [
      {
        path: '/homepage/index',
        name: 'Situation',
        meta: {
          title: '治理态势'
        },
        component: () => import('@/views/homepage')
      },
      {
        path: '/situation/index',
        name: 'Situation',
        meta: {
          title: '治理态势'
        },
        component: () => import('@/views/situation')
      },
      {
        path: '/riskPrevention/index',
        name: 'RiskPrevention',
        meta: {
          title: '风险防范'
        },
        component: () => import('@/views/riskPrevention/home')
      },
      {
        path: '/riskPrevention/peopleManage/keyGroups',
        name: 'KeyGroups',
        meta: {
          title: '风险防范-人员管控-重点人员'
        },
        component: () => import('@/views/riskPrevention/peopleManage/keyGroups')
      },
      {
        path: '/riskPrevention/peopleManage/floatingPopulation',
        name: 'FloatingPopulation',
        meta: {
          title: '风险防范-人员管控-流动人口'
        },
        component: () =>
          import('@/views/riskPrevention/peopleManage/floatingPopulation')
      },
      {
        path: '/riskPrevention/peopleManage/rentalHousing',
        name: 'RentalHousing',
        meta: {
          title: '风险防范-人员管控-出租房屋'
        },
        component: () =>
          import('@/views/riskPrevention/peopleManage/rentalHousing')
      },
      {
        path: '/riskPrevention/peopleManage/personControl',
        name: 'PersonControl',
        meta: {
          title: '风险防范-人员管控-一键布控'
        },
        component: () =>
          import('@/views/riskPrevention/peopleManage/personControl')
      },
      {
        path: '/riskPrevention/peopleManage/informationService',
        name: 'InformationService',
        meta: {
          title: '风险防范-人员管控-信息查询'
        },
        component: () =>
          import('@/views/riskPrevention/peopleManage/informationService')
      },
      {
        path: '/riskPrevention/regionalPrevention',
        name: 'RegionalPrevention',
        meta: {
          title: '风险防范-区域防范'
        },
        component: () => import('@/views/riskPrevention/regionalPrevention')
      },
      {
        path: '/riskPrevention/conflictResolution',
        name: 'ConflictResolution',
        meta: {
          title: '风险防范-矛盾排解'
        },
        component: () => import('@/views/riskPrevention/conflictResolution')
      },
      {
        path: '/riskPrevention/publicMonitor',
        name: 'PublicMonitor',
        meta: {
          title: '风险防范-舆情监测'
        },
        component: () => import('@/views/riskPrevention/publicMonitor')
      },
      {
        path: '/riskPrevention/safetyProduction',
        name: 'SafetyProduction',
        meta: {
          title: '风险防范-安全生产'
        },
        component: () => import('@/views/riskPrevention/safetyProduction')
      },
      {
        path: '/commandAndDispatch/index',
        name: 'CommandAndDispatch',
        meta: {
          title: '指挥调度'
        },
        component: () => import('@/views/commandAndDispatch')
      },
      {
        path: '/servingMasses/mattersHandling',
        name: 'MattersHandling',
        meta: {
          title: '惠民服务-事项通办'
        },
        component: () => import('@/views/servingMasses/mattersHandling')
      },
      {
        path: '/servingMasses/psychologicalCounseling',
        name: 'PsychologicalCounseling',
        meta: {
          title: '惠民服务-心理咨询'
        },
        component: () => import('@/views/servingMasses/psychologicalCounseling')
      },
      {
        path: '/intelligentJudge/index',
        name: 'IntelligentJudge',
        meta: {
          title: '智能研判'
        },
        component: () => import('@/views/intelligentJudge')
      },
      {
        path: '/scienceToPolicy/index',
        name: 'ScienceToPolicy',
        meta: {
          title: '科辅决策'
        },
        component: () => import('@/views/scienceToPolicy/policeAnalysis')
      },
      {
        path: '/scienceToPolicy/safeIndex',
        name: 'SafeIndex',
        meta: {
          title: '科辅决策-安全指数'
        },
        component: () => import('@/views/scienceToPolicy/safeIndex')
      },
      {
        path: '/scienceToPolicy/interviewAnalysis',
        name: 'InterviewAnalysis',
        meta: {
          title: '科辅决策-访情分析'
        },
        component: () => import('@/views/scienceToPolicy/interviewAnalysis')
      }
    ]
  }
]
