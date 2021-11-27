import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login'
  },{
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },{
    path:'/home',
    name:'Home',
    redirect:'/panel',
    component: () => import('../pages/Home.vue'),
    children:[
      {
        path:'/panel',
        component:() => import('../pages/panel/Panel.vue'),
        meta:{title:'系统首页'}
      },
      {
        path:'/setting',
        component:() => import('../pages/setting/Setting.vue'),
        meta:{title:'轮播设置'}
      },
      {
        path:'/add',
        component:() => import('../pages/music/musicAdd.vue'),
        meta:{title:'添加音乐'}
      },
      {
        path:'/manage',
        component:() => import('../pages/music/musicManage.vue'),
        meta:{title:'管理音乐'}
      },
      {
        path:'/user',
        component:() => import('../pages/user/User.vue'),
        meta:{title:'用户列表'}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
