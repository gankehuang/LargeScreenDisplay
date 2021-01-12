export default {
  data () {
    return {
      navTabsList: [
        {
          name: '人员管控',
          children: [
            {
              name: '重点人员',
              url: '/riskPrevention/peopleManage/keyGroups'
            },
            {
              name: '流动人口',
              url: '/riskPrevention/peopleManage/floatingPopulation'
            },
            {
              name: '出租房屋',
              url: '/riskPrevention/peopleManage/rentalHousing'
            },
            {
              name: '动态监测',
              url: '/riskPrevention/peopleManage/informationService'
            },
            {
              name: '一键布控',
              url: '/riskPrevention/peopleManage/personControl'
            }
          ]
        },
        {
          name: '区域防范',
          url: '/riskPrevention/regionalPrevention'
        },
        {
          name: '矛盾排解',
          url: '/riskPrevention/conflictResolution'
        },
        {
          name: '舆情监测',
          url: '/riskPrevention/publicMonitor'
        },
        {
          name: '安全生产',
          url: '/riskPrevention/safetyProduction'
        }
      ]
    }
  }
}
