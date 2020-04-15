import Vue from 'vue'
import Router from 'vue-router'
import Index from '../Index'
import SignUpView from '../views/signUpView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/signUpView',
      name: '报名管理',
      component: SignUpView
    }
  ]
})
