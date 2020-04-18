import Vue from 'vue'
import Router from 'vue-router'
import Index from '../Index'
import SignUpView from '../views/signUpView'
import TeacherView from '../views/teacherView'
import InitSpecialtyView from '../views/initSpecialtyView'
import TeacherInfo from '../views/teacherInfo'
import IndexTeacher from '../IndexTeacher'
import SignUpInfoView from '../views/signUpInfoView'
import SignUpYesView from '../views/signUpYesView'
Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      path: '/signUpInfoView',
      name: '报名成功',
      component: SignUpInfoView
    },
    {
      path: '/signUpYesView',
      name: '录取成功',
      component: SignUpYesView
    },
    {
      path: '/initSpecialtyView',
      name: '统计',
      component: InitSpecialtyView
    }, {
      path: '/teacherInfo',
      name: '密码修改',
      component: TeacherInfo
    }, {
      path: '/indexTeacher',
      name: '登陆',
      component: IndexTeacher
    }

  ]
})
