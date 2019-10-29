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
  console.log(to);
  if(to.path =='/yonghu'){
    if(!window.userinfo){
      next({ path: '/' })
    }
  }
  console.log(from);
 next();
})

export default router
