// 二级指标
const initTwoLevel = [
  {
    label: '政治安全防范',
    upLevelLabel: '政治安全'
  },
  {
    label: '暴恐犯罪',
    upLevelLabel: '政治安全'
  },
  {
    label: '防范处理邪教',
    upLevelLabel: '政治安全'
  },
  {
    label: '治安警情',
    upLevelLabel: '治安安全'
  },
  {
    label: '刑事警情',
    upLevelLabel: '治安安全'
  },
  {
    label: '主要经济犯罪安全数',
    upLevelLabel: '经济安全'
  },
  {
    label: '侵犯知识产权案事件数',
    upLevelLabel: '经济安全'
  },
  {
    label: '生产安全事故',
    upLevelLabel: '公共安全'
  },
  {
    label: '交通安全事故',
    upLevelLabel: '公共安全'
  },
  {
    label: '火灾安全事故',
    upLevelLabel: '公共安全'
  },
  {
    label: '食品药品安全',
    upLevelLabel: '公共安全'
  },
  {
    label: '人民调解',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '信访工作',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '行政复议',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '民事行政案件',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '涉稳突出问题分类归口处理机制',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '公众安全感',
    upLevelLabel: '公众安全感'
  },
  {
    label: '政法满意度',
    upLevelLabel: '公众安全感'
  }
]

// 三级指标
const initThreeLevel = [
  {
    label: '危害国家政治安全事件',
    upLevelLabel: '政治安全防范'
  },
  {
    label: '涉恐信息收集数量',
    upLevelLabel: '暴恐犯罪'
  },
  {
    label: '涉恐犯罪案件数量',
    upLevelLabel: '暴恐犯罪'
  },
  {
    label: '邪教犯罪涉案人数',
    upLevelLabel: '防范处理邪教'
  },
  {
    label: '宗教非法聚集活动',
    upLevelLabel: '防范处理邪教'
  },
  {
    label: '治安案件受理数',
    upLevelLabel: '治安警情'
  },
  {
    label: '赌博案件受理数',
    upLevelLabel: '治安警情'
  },
  {
    label: '寻衅滋事案件受理数',
    upLevelLabel: '治安警情'
  },
  {
    label: '严重精神障碍患者强制医疗案件数',
    upLevelLabel: '治安警情'
  },
  {
    label: '群体性事件数',
    upLevelLabel: '治安警情'
  },
  {
    label: '刑事立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '命案立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '入室盗窃立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '八类案件立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '毒品违法犯罪人数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '未成年人犯罪人数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '重复犯罪率',
    upLevelLabel: '刑事警情'
  },
  {
    label: '合同诈骗案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '电信诈骗案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '涉众型经济犯罪立案数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '传销及其他经济犯罪案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '网络借贷违法违规案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '税收违法违规案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '走私违法违规案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '侵犯知识产权案事件数',
    upLevelLabel: '侵犯知识产权案事件数'
  },
  {
    label: '生产安全事故死亡人数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '较大生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '重大生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '特大生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '交通事故发生数',
    upLevelLabel: '交通安全事故'
  },
  {
    label: '交通事故死亡人数',
    upLevelLabel: '交通安全事故'
  },
  {
    label: '城乡火灾',
    upLevelLabel: '火灾安全事故'
  },
  {
    label: '森林火灾',
    upLevelLabel: '火灾安全事故'
  },
  {
    label: '食品药品安全案件',
    upLevelLabel: '食品药品安全'
  },
  {
    label: '人民调解案件数量',
    upLevelLabel: '人民调解'
  },
  {
    label: '民转刑案件数量',
    upLevelLabel: '人民调解'
  },
  {
    label: '赴京进省来市非接待场所访',
    upLevelLabel: '信访工作'
  },
  {
    label: '赴京进省来市集体访',
    upLevelLabel: '信访工作'
  },
  {
    label: '极端过激行为',
    upLevelLabel: '信访工作'
  },
  {
    label: '行政复议案件受理数',
    upLevelLabel: '行政复议'
  },
  {
    label: '民事行政案件一审立案数',
    upLevelLabel: '民事行政案件'
  },
  {
    label: '涉稳突出问题主管部门分别牵头化解数量',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '影响社会稳定矛盾问题化解率',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '涉稳信息预警数量',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '稳评项目备案数量',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '公众安全感指数',
    upLevelLabel: '公众安全感'
  },
  {
    label: '政法机关满意度',
    upLevelLabel: '政法满意度'
  }
]

export { initTwoLevel, initThreeLevel }
