export const sex = [
  {value: 0, name: '男', label: '男'},
  {value: 1, name: '女', label: '女'},
  {value: 2, name: '保密', label: '保密'}
]

export const buildings = [
  {value: '成均楼', label: '成均楼'},
  {value: '敦行楼', label: '敦行楼'},
  {value: 'A1', label: 'A1'},
  {value: 'A2', label: 'A2'},
  {value: 'A3', label: 'A3'},
  {value: 'A4', label: 'A4'},
  {value: 'A5', label: 'A5'},
  {value: 'A6', label: 'A6'},
  {value: 'A7', label: 'A7'},
  {value: 'A8', label: 'A8'},
  {value: 'A9', label: 'A9'},
  {value: 'A10', label: 'A10'},
  {value: 'A11', label: 'A11'},
  {value: 'A12', label: 'A12'},
  {value: 'A13', label: 'A13'},
  {value: 'A14', label: 'A14'},
  {value: 'A15', label: 'A15'},
  {value: 'A16', label: 'A16'},
  {value: 'A17', label: 'A17'},
  {value: 'A18', label: 'A18'},
  {value: 'G1', label: 'G1'},
  {value: 'G2', label: 'G2'},
  {value: 'G3', label: 'G3'},
  {value: 'G4', label: 'G4'},
  {value: 'G5', label: 'G5'},
  {value: '音乐楼', label: '音乐楼'},
  {value: '其他', label: 'other'}
]

export const netTypes = [
  {value: 'none', name: '设备处于离线状态'},
  {value: 'cell', name: 'Edge、3G、WiMax或是LTE网络'},
  {value: 'cellular', name: '蜂窝移动网络'},
  {value: 'bluetooth', name: '蓝牙数据连接'},
  {value: 'dummy', name: '模拟数据连接'},
  {value: 'ethernet', name: '以太网数据连接'},
  {value: 'mobile', name: '移动网络数据连接'},
  {value: 'mobile_dun', name: '拨号移动网络数据连接'},
  {value: 'mobile_hipri', name: '高优先级移动网络数据连接'},
  {value: 'mobile_mms', name: '彩信移动网络数据连接'},
  {value: 'mobile_supl', name: '安全用户面定位（SUPL）数据连接'},

  {value: 'vpn', name: '虚拟网络连接。'},
  {value: 'wifi', name: 'WIFI数据连接'},
  {value: 'wimax', name: 'WiMAX数据连接'},
  {value: 'unknown', name: '未知'}
]
export const userStatus = [
  {value: '1', name: '正常'},
  {value: '2', name: '禁用'}
]

export const userActiveStatus = [
  {value: '1', name: '已激活'},
  {value: '2', name: '待激活'}
]

export const loginType = [
  {value: 'username', name: '用户名'},
  {value: 'mobilephone', name: '手机号'},
  {value: 'wechat', name: '微信'},
  {value: 'alipay', name: '支付宝'},
  {value: 'valueentification', name: '证件'}
]

export const valueentityStatus = [
  {value: 1, name: '已实名'},
  {value: 2, name: '未实名'}
]

export const paymentMethodList = [
  {
    title: '货到付款',
    paymentMethod: 'face',
    defaultChecked: true,
    disabled: false,
    subtitle: '支持微信、支付宝扫码支付，现金支付'
  }
]

// 免服务费最低金额
export const feeWaiver = 10

// 服务费
export const serviceTotal = 1

export const orderStatus = [
  {
    id: 0,
    name: '待付款',
    title: '待付款',
    description: '请先支付哦',
    value: 'isPavalue'
  },
  {
    id: 1,
    name: '待发货',
    title: '待发货',
    description: '商品正在出库',
    value: 'undelivered'
  },
  {
    id: 2,
    name: '配送中',
    title: '配送中',
    description: '正在快马加鞭赶来',
    value: 'distribution'
  },
  {
    id: 3,
    name: '已送达',
    title: '已送达',
    description: '商品已送达',
    value: 'placed'
  }
]

export const orderStatusWithFace = [
  {
    id: 0,
    name: '待发货',
    title: '待发货',
    description: '商品正在出库',
    value: 'undelivered'
  },
  {
    id: 1,
    name: '配送中',
    title: '配送中',
    description: '正在快马加鞭赶来',
    value: 'distribution'
  },
  {
    id: 2,
    name: '已送达',
    title: '已送达',
    description: '商品已送达',
    value: 'placed'
  }
]

export const starCategory = [
  {
    id: 0,
    name: '超市商品',
    title: '超市商品',
    value: 'Market'
  },
  {
    id: 1,
    name: '二手物品',
    title: '二手物品',
    value: 'FleaMarket'
  }
]

export const productSearchTabs = [
  {title: '综合', sub: '1', value: undefined},
  {title: '价格', sub: '2', value: 'price'},
  {title: '销量', sub: '3', value: 'sold'}
]

export const loginTabs = [
  {
    id: 0,
    name: '密码登录',
    title: '密码登录',
    value: 'username'
  },
  {
    id: 1,
    name: '手机号登录',
    title: '手机号登录',
    value: 'mobilePhoneNumber'
  }
]

export const headerTitles = [
  {name: 'Home', value: '主页'},
  {name: 'UserCenter', value: '个人中心'},
  {name: 'Campus', value: '校园'},
  {name: 'Market', value: '超市'},
  {name: 'Category', value: '分类'},
  {name: 'Cart', value: '购物车'},
  {name: 'Order', value: '订单'}
]

export const userCategory = [
  {
    label: '学生',
    name: '学生',
    value: 'Student'
  },
  {
    label: '教师',
    name: '教师',
    value: 'Teacher'
  },
  {
    label: '保密',
    name: '保密',
    value: 'Secret'
  },
  {
    label: '其他',
    name: '其他',
    value: 'Others'
  }
]
export const studentSchools = [
  {
    value: '01',
    name: '中文',
    label: '文学院',
    pinyin: ''
  },
  {
    value: '02',
    name: '历史',
    label: '历史文化学院',
    pinyin: ''
  },
  {
    value: '03',
    name: '政法',
    label: '政法与公共管理学院',
    pinyin: ''
  },
  {
    value: '04',
    name: '数学',
    label: '数学科学学院',
    pinyin: ''
  },
  {
    value: '05',
    name: '物理',
    label: '物理与电子信息学院',
    pinyin: ''
  },
  {
    value: '06',
    name: '化学',
    label: '化学化工学院',
    pinyin: ''
  },
  {
    value: '07',
    name: '外语',
    label: '外国语学院',
    pinyin: ''
  },
  {
    value: '08',
    name: '体育',
    label: '体育学院',
    pinyin: ''
  },
  {
    value: '09',
    name: '音乐',
    label: '音乐学院',
    pinyin: ''
  },
  {
    value: '10',
    name: '美术',
    label: '美术学院',
    pinyin: ''
  },
  {
    value: '11',
    name: '信息',
    label: '信息技术学院（软件职业技术学院）',
    pinyin: 'xinxijishuxueyuan（ruanjianzhiyejishuxueyuan）'
  },
  {
    value: '12',
    name: '教科',
    label: '教育科学学院',
    pinyin: ''
  },
  {
    value: '13',
    name: '生科',
    label: '生命科学学院',
    pinyin: ''
  },
  {
    value: '14',
    name: '学前',
    label: '学前教育学院',
    pinyin: ''
  },
  {
    value: '15',
    name: '商学',
    label: '商学院',
    pinyin: ''
  },
  {
    value: '16',
    name: '继教',
    label: '继续教育学院',
    pinyin: ''
  },
  {
    value: '17',
    name: '国教',
    label: '国际教育学院（国际合作交流处）',
    pinyin: 'guojijiaoyuxueyuan（guojihezuojiaoliuchu）'
  },
  {
    value: '18',
    name: '软件',
    label: '软件职业技术学院',
    pinyin: ''
  },
  {
    value: '19',
    name: '新传',
    label: '新闻与传播学院',
    pinyin: ''
  },
  {
    value: '20',
    name: '国土',
    label: '国土与旅游学院',
    pinyin: ''
  },
  {
    value: '21',
    name: '艺术',
    label: '艺术设计学院',
    pinyin: ''
  },
  {
    value: '22',
    name: '电商',
    label: '电子商务学院',
    pinyin: ''
  },
  {
    value: '23',
    name: '食品',
    label: '食品与药品学院',
    pinyin: ''
  },
  {
    value: '24',
    name: '马克思',
    label: '马克思主义学院',
    pinyin: ''
  },
  {
    value: '25',
    name: '法社',
    label: '法学与社会学院',
    pinyin: ''
  }
]

export const schools = [
  {
    value: '00',
    name: '校领导',
    label: '学校领导',
    pinyin: ''
  },
  {
    value: '01',
    name: '中文',
    label: '文学院',
    pinyin: ''
  },
  {
    value: '02',
    name: '历史',
    label: '历史文化学院',
    pinyin: ''
  },
  {
    value: '03',
    name: '政法',
    label: '政法与公共管理学院',
    pinyin: ''
  },
  {
    value: '04',
    name: '数学',
    label: '数学科学学院',
    pinyin: ''
  },
  {
    value: '05',
    name: '物理',
    label: '物理与电子信息学院',
    pinyin: ''
  },
  {
    value: '06',
    name: '化学',
    label: '化学化工学院',
    pinyin: ''
  },
  {
    value: '07',
    name: '外语',
    label: '外国语学院',
    pinyin: ''
  },
  {
    value: '08',
    name: '体育',
    label: '体育学院',
    pinyin: ''
  },
  {
    value: '09',
    name: '音乐',
    label: '音乐学院',
    pinyin: ''
  },
  {
    value: '10',
    name: '美术',
    label: '美术学院',
    pinyin: ''
  },
  {
    value: '11',
    name: '信息',
    label: '信息技术学院（软件职业技术学院）',
    pinyin: 'xinxijishuxueyuan（ruanjianzhiyejishuxueyuan）'
  },
  {
    value: '12',
    name: '教科',
    label: '教育科学学院',
    pinyin: ''
  },
  {
    value: '13',
    name: '生科',
    label: '生命科学学院',
    pinyin: ''
  },
  {
    value: '14',
    name: '学前',
    label: '学前教育学院',
    pinyin: ''
  },
  {
    value: '15',
    name: '商学',
    label: '商学院',
    pinyin: ''
  },
  {
    value: '16',
    name: '继教',
    label: '继续教育学院',
    pinyin: ''
  },
  {
    value: '17',
    name: '国教',
    label: '国际教育学院（国际合作交流处）',
    pinyin: 'guojijiaoyuxueyuan（guojihezuojiaoliuchu）'
  },
  {
    value: '18',
    name: '软件',
    label: '软件职业技术学院',
    pinyin: ''
  },
  {
    value: '19',
    name: '新传',
    label: '新闻与传播学院',
    pinyin: ''
  },
  {
    value: '20',
    name: '国土',
    label: '国土与旅游学院',
    pinyin: ''
  },
  {
    value: '21',
    name: '艺术',
    label: '艺术设计学院',
    pinyin: ''
  },
  {
    value: '22',
    name: '电商',
    label: '电子商务学院',
    pinyin: ''
  },
  {
    value: '23',
    name: '食品',
    label: '食品与药品学院',
    pinyin: ''
  },
  {
    value: '24',
    name: '马克思',
    label: '马克思主义学院',
    pinyin: ''
  },
  {
    value: '25',
    name: '法社',
    label: '法学与社会学院',
    pinyin: ''
  },
  {
    value: '41',
    name: '公外',
    label: '公共外语教研部',
    pinyin: ''
  },
  {
    value: '42',
    name: '公体',
    label: '公共体育教研部',
    pinyin: ''
  },
  {
    value: '43',
    name: '公艺',
    label: '公共艺术教研部',
    pinyin: ''
  },
  {
    value: '44',
    name: '马列',
    label: '马列理论教研部',
    pinyin: ''
  },
  {
    value: '45',
    name: '公教',
    label: '公共教研部',
    pinyin: ''
  },
  {
    value: '46',
    name: '河洛文化中心',
    label: '河洛文化国际研究中心',
    pinyin: 'heluowenhuaguojiyanjiuzhongxin'
  },
  {
    value: '47',
    name: '河南省公共文化研究中心',
    label: '河南省公共文化研究中心',
    pinyin: 'henanshenggonggongwenhuayanjiuzhongxin'
  },
  {
    value: '48',
    name: '高教所',
    label: '高等教育研究所',
    pinyin: 'gaodengjiaoyuyanjiusuo'
  },
  {
    value: '49',
    name: '水产研究所',
    label: '水产研究所',
    pinyin: 'shuichanyanjiusuo'
  },
  {
    value: '51',
    name: '党政办',
    label: '党政办公室',
    pinyin: ''
  },
  {
    value: '52',
    name: '纪委',
    label: '纪委办公室（监察处）',
    pinyin: 'jiweibangongshi（jianchachu）'
  },
  {
    value: '53',
    name: '组织部',
    label: '党委组织部',
    pinyin: ''
  },
  {
    value: '54',
    name: '宣传部',
    label: '党委宣传部',
    pinyin: ''
  },
  {
    value: '55',
    name: '工会',
    label: '工会办公室',
    pinyin: ''
  },
  {
    value: '56',
    name: '团委',
    label: '团委',
    pinyin: ''
  },
  {
    value: '57',
    name: '学工部',
    label: '党委学工部',
    pinyin: 'dangweixuegongbu'
  },
  {
    value: '58',
    name: '保卫部',
    label: '党委保卫部',
    pinyin: ''
  },
  {
    value: '59',
    name: '机关党委',
    label: '机关党委',
    pinyin: ''
  },
  {
    value: '60',
    name: '统战部',
    label: '党委统战部',
    pinyin: ''
  },
  {
    value: '61',
    name: '党校',
    label: '校党委党校',
    pinyin: ''
  },
  {
    value: '62',
    name: '公教党总支',
    label: '公共教研部党总支',
    pinyin: ''
  },
  {
    value: '71',
    name: '发规处',
    label: '发展规划处',
    pinyin: ''
  },
  {
    value: '72',
    name: '离退处',
    label: '离退休工作处',
    pinyin: ''
  },
  {
    value: '73',
    name: '人事处',
    label: '人事处',
    pinyin: ''
  },
  {
    value: '74',
    name: '教务处',
    label: '教务处',
    pinyin: ''
  },
  {
    value: '75',
    name: '招就处',
    label: '招生就业处',
    pinyin: ''
  },
  {
    value: '76',
    name: '科研处',
    label: '科研管理处',
    pinyin: ''
  },
  {
    value: '77',
    name: '研究生处',
    label: '研究生与学科建设处',
    pinyin: ''
  },
  {
    value: '78',
    name: '国资处',
    label: '国有资产管理处',
    pinyin: ''
  },
  {
    value: '79',
    name: '审计处',
    label: '审计处',
    pinyin: ''
  },
  {
    value: '80',
    name: '财务处',
    label: '财务处',
    pinyin: ''
  },
  {
    value: '81',
    name: '后勤管理',
    label: '后勤管理处',
    pinyin: ''
  },
  {
    value: '82',
    name: '基建处',
    label: '基建处',
    pinyin: ''
  },
  {
    value: '84',
    name: '后勤集团',
    label: '后勤服务集团',
    pinyin: ''
  },
  {
    value: '85',
    name: '网络中心',
    label: '网络与电化教育中心',
    pinyin: ''
  },
  {
    value: '86',
    name: '图书馆',
    label: '图书馆',
    pinyin: ''
  },
  {
    value: '87',
    name: '学报',
    label: '学报编辑部',
    pinyin: ''
  },
  {
    value: '88',
    name: '卫生所',
    label: '卫生所',
    pinyin: ''
  },
  {
    value: '89',
    name: '新建办',
    label: '新校区建设办公室',
    pinyin: ''
  },
  {
    value: '90',
    name: '教育基金会',
    label: '教育基金会',
    pinyin: ''
  },
  {
    value: '91',
    name: '监察处',
    label: '监察处',
    pinyin: ''
  },
  {
    value: '92',
    name: '武装部',
    label: '人民武装部',
    pinyin: ''
  },
  {
    value: '93',
    name: '资助中心',
    label: '学生资助管理中心',
    pinyin: ''
  },
  {
    value: '94',
    name: '心理中心',
    label: '大学生心理健康教育咨询中心',
    pinyin: ''
  },
  {
    value: '95',
    name: '语委',
    label: '语言文字工作委员会',
    pinyin: ''
  },
  {
    value: '96',
    name: '女工委',
    label: '女工委员会',
    pinyin: ''
  },
  {
    value: '99',
    name: '其他',
    label: '其他',
    pinyin: ''
  }
]

export const homeMenus = [
  {
    id: 1,
    routeName: 'ONUList',
    iconName: 'ios-keypad',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '光猫列表',
    linking: false,
    webBrowser: false
  },
  {
    id: 2,
    routeName: 'ONUSearch',
    iconName: 'ios-search',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '光猫查询',
    linking: false,
    webBrowser: false
  },
  {
    id: 3,
    routeName: 'ONUAdd',
    iconName: 'ios-build',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '光猫登记',
    linking: false,
    webBrowser: false
  },
  {
    id: 4,
    routeName: 'NetTest',
    iconName: 'ios-globe',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '网络检测',
    linking: false,
    webBrowser: false
  },
  {
    id: 5,
    routeName: 'QRCode',
    iconName: 'ios-qr-scanner',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '二维码识别',
    linking: false,
    webBrowser: false
  }
]

export const userCenterMenus = [
  {
    id: 1,
    routeName: 'Place',
    iconName: 'ios-pin',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '地址管理',
    linking: false,
    webBrowser: false
  },
  {
    id: 2,
    routeName: 'Setting',
    iconName: 'ios-settings',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '设置',
    linking: false,
    webBrowser: false
  },
  {
    id: 3,
    routeName: 'Setting',
    iconName: 'ios-chatbubbles',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '关于我们',
    linking: false,
    webBrowser: true,
    url: 'http://sites.lynu.edu.cn/wlzx/'
  },
  {
    id: 4,
    routeName: 'Setting',
    iconName: 'ios-chatbubbles',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '管理平台',
    linking: true,
    webBrowser: false,
    url: 'http://140.143.196.143:8000'
  },
  {
    id: 5,
    routeName: 'Setting',
    iconName: 'ios-browsers',
    iconSize: 32,
    iconColor: 'tianyi',
    text: '版权信息',
    linking: false,
    webBrowser: true,
    url: 'http://sites.lynu.edu.cn/wlzx/'
  }
]
export const stateList = [
  {
    value: 0,
    label: '未开始',

  }, {
    value: 1,
    label: '进行中',

  }, {
    value: 2,
    label: '无法完成',

  }, {
    value: 3,
    label: '已完成',
  },]
export const levelList = [
  {
    value: 0,
    label: '不重要',
    color: 'grey600',
  }, {
    value: 1,
    label: '一般',
    color: 'lightBlue600',
  }, {
    value: 2,
    label: '重要',
    color: 'orange600',
  }, {
    value: 3,
    label: '极其重要',
    color: 'red600',
  }
]
export const replyStateList=[
  {
    value: '0',
    id:1,
    label: '未完成',

  },
  {
    value: '1',
    id:3,
    label: '已完成',

  },
  {
    value: '2',
    id:2,
    label: '无法完成',

  },
]
export const toID = [
  {
    label: '胡毅谱',
    value: '5b0671f6ee920a0044777532',
  },
  {
    value: '5c1b635967f356005fcb92fa',
    label: '余传栋',
  },
  {
    value: '5b0be09e2f301e00381a1a5b',
    label: '张帅',
  },
  {
    value: '5b168a442f301e0038ea4a17',
    label: '张峻',
  },
]