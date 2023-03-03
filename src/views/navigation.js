const navigationList = [{
  url: '/home',
  title: '首页',
  type: 'basic', // basic collapse
  icon: 'icon-home'
}, {
  url: '/report',
  title: '报告',
  type: 'basic', // basic collapse
  icon: 'icon-file'
},{
  url: '/index',
  title: '鱼',
  type: 'basic', // basic collapse
  icon: 'icon-comment',
},{
  title: '杂',
  type: 'collapse',
  icon: 'icon-ashbin',
  collapseList: [{
    url: '/canvas',
    title: 'canvas',
    type: 'basic', // basic collapse
    icon: 'el-icon-menu',
  },{
    url: '/randomIamge',
    title: 'randomIamge',
    type: 'basic', // basic collapse
    icon: 'el-icon-menu',
  },{
    url: '/test',
    title: 'test',
    type: 'basic', // basic collapse
    icon: 'el-icon-menu',
  },]
},{
  url: '/login',
  title: '登录',
  type: 'basic', // basic collapse
  icon: 'el-icon-menu',
},]
export { navigationList }