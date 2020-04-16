import Vue from 'vue'
import Router from 'vue-router'
import Index from '../Index'
import SignUpView from '../views/signUpView'
import TeacherView from '../views/teacherView'
import initSpecialtyView from '../views/initSpecialtyView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/teacherView',
      name: '查看',
      component: TeacherView
    },
    {
      path: '/signUpView',
      name: '报名管理',
      component: SignUpView
    },
    {
      path: '/initSpecialtyView',
      name: '报名管理',
      component: initSpecialtyView
    }
  ]
})
