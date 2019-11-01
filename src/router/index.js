import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/denglu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'denglu',
    component: Home
  },
  {
    path: '/yonghu',
    name: 'yonghu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/yonghu.vue'),
    children: [
      {
        path: 'zuij',
        name:'zuij',
        component: () => import('../views/gongnn/zuij.vue')
      }, {
        path: 'best30',
        name : 'best30',
        component: () => import('../views/gongnn/best30.vue')
      }, {
        path: 'miusic',
        name: 'miusic',
        component: () => import('../views/gongnn/miusic.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(window.debug){
    console.log(to);
    console.log(from);
  }
  if(to.path =='/yonghu'||to.path =='/yonghu/zuij'||to.path =='/yonghu/best30'){
    
    // console.log(Vue.$store.getters.getuserinfo);
    if(!window.sessionStorage.userinfo){
      console.log(222)
      next({ path: '/' })
    }
  }
  
 next();
})

export default router
