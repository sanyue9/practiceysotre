import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index.vue'
import login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
