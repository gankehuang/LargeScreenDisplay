// 地图县区、及其各项指数

// 涉稳数据
const sheWenList = [
  { label: '煤矿爆炸', number: 15, percentage: 8.56 },
  { label: '违章私盖', number: 7, percentage: 6.66 },
  { label: '食品安全', number: 5, percentage: 4.76 }
]

//  信访数据
const xinFangList = [
  { label: '安置补偿', number: 26, percentage: 23.56 },
  { label: '环境污染', number: 18, percentage: 18.86 },
  { label: '公共设施', number: 11, percentage: 13.56 }
]

//  信访数据
const zhiAnList = [
  { label: '救助', number: 1256, percentage: 31.56 },
  { label: '交通警情', number: 6845, percentage: 29.80 },
  { label: '行政案件', number: 2654, percentage: 10.35 }
]

// 类型最多
const typeMostList = [
  {
    date: '矛盾纠纷',
    name: '275863件',
    address: '29.54%'
  },
  {
    date: '城市管理',
    name: '228429件',
    address: '25.36%'
  },
  {
    date: '城市建设',
    name: '129180件',
    address: '15.28%'
  }
]

// 来源最多
const originMostList = [
  {
    date: '村社PC端上报',
    name: '492644件',
    address: '61.88%'
  },
  {
    date: '社会治理APP上报',
    name: '203988件',
    address: '25.36%'
  },
  {
    date: '部门系统流转',
    name: '95647件',
    address: '12.01%'
  }
]

// 地图县区、及其各项指数
const buttonList = [
  {
    name: '安义县',
    value: 96,
    code: '360123',
    scoreList: [99.89, 99.9, 99.89, 99.93, 99.91, 99.96],
    total: 96.3,
    style: 'top: 165px;left:205px',
    imgUrl: require('@/assets/images/personControl/dataView/anyi-map.png')
  },
  {
    name: '新建区',
    value: 90,
    code: '360122',
    scoreList: [97.89, 98.9, 98.89, 96.93, 97.91, 98.96],
    total: 94.8,
    style: 'top:100px;left:525px',
    imgUrl: require('@/assets/images/personControl/dataView/xinjian-map.png')
  },
  {
    name: '湾里局',
    value: 94,
    code: '360105',
    scoreList: [98.89, 97.9, 97.89, 98.93, 97.91, 97.96],
    total: 95.0,
    style: 'top: 205px;left:275px',
    imgUrl: require('@/assets/images/personControl/dataView/wanli-map.png')
  },
  {
    name: '经开区',
    value: 96,
    code: '360125',
    scoreList: [97.89, 99.1, 99.19, 99.23, 99.31, 99.36],
    total: 96.5,
    style: 'top: 155px;left:405px',
    imgUrl: require('@/assets/images/personControl/dataView/jingkai-map.png')
  },
  {
    name: '东湖区',
    value: 97,
    code: '360102',
    scoreList: [99.29, 99.39, 98.59, 99.73, 98.71, 99.06],
    total: 96.5,
    style: 'top:200px;left:405px',
    imgUrl: require('@/assets/images/personControl/dataView/donghu-map.png')
  },
  {
    name: '高新区',
    value: 96,
    code: '360107',
    scoreList: [98.89, 98.9, 98.89, 99.03, 99.01, 98.96],
    total: 96.2,
    style: 'top:190px;left:530px',
    imgUrl: require('@/assets/images/personControl/dataView/gaoxin-map.png')
  },
  {
    name: '西湖区',
    value: 94,
    code: '360103',
    scoreList: [99.89, 99.9, 99.89, 99.93, 99.91, 99.96],
    total: 94.5,
    style: 'top:235px;left:395px',
    imgUrl: require('@/assets/images/personControl/dataView/xihu-map.png')
  },
  {
    name: '红谷滩区',
    value: 93,
    code: '360106',
    scoreList: [99.99, 99.9, 99.19, 99.93, 99.21, 99.96],
    total: 94.3,
    style: 'top:285px;left:325px',
    imgUrl: require('@/assets/images/personControl/dataView/honggutan-map.png')
  },
  {
    name: '青云谱区',
    value: 90,
    code: '360104',
    scoreList: [98.89, 99.29, 99.49, 99.53, 99.71, 99.06],
    total: 92.9,
    style: 'top:270px;left:440px',
    imgUrl: require('@/assets/images/personControl/dataView/qingyunpu-map.png')
  },
  {
    name: '青山湖区',
    value: 99,
    code: '360111',
    scoreList: [99.89, 99.9, 99.89, 99.93, 99.91, 99.96],
    total: 98.3,
    style: 'top:230px;left:520px',
    imgUrl: require('@/assets/images/personControl/dataView/qingshanhu-map.png')
  },
  {
    name: '南昌县',
    value: 94,
    code: '360121',
    scoreList: [99.89, 98.9, 97.89, 98.93, 98.91, 98.96],
    total: 96.3,
    style: 'top:280px;left:580px',
    imgUrl: require('@/assets/images/personControl/dataView/nanchang-map.png')
  },
  {
    name: '进贤县',
    value: 96,
    code: '360124',
    scoreList: [99.89, 99.09, 98.89, 98.93, 99.01, 99.16],
    total: 96.3,
    style: 'top:320px;left:780px',
    imgUrl: require('@/assets/images/personControl/dataView/jinxian-map.png')
  }
]

// 初始化南昌市、及其各项指数
const initTotalData = {
  name: '南昌市',
  scoreList: [98.99, 96.88, 90.88, 98.88, 94.88, 98.88],
  total: 90,
  code: '3601'
}
export {
  sheWenList,
  xinFangList,
  typeMostList,
  originMostList,
  buttonList,
  initTotalData,
  zhiAnList
}
