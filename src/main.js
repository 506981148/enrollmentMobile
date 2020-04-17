// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store'
// import VeeValidate, { Validator } from 'vee-validate'
// import {initStudent} from './router/initStudent'
// import {initTeacher} from './router/initTeacher'
// import zh from 'vee-validate/dist/locale/zh_CN'

import {postRequest, postKeyValueRequest, putRequest, deleteRequest, getRequest} from './utils/api'

// Validator.addLocale(zh)
// const config = {
//   locale: 'zh_CN'
// }
Vue.prototype.postRequest = postRequest
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest
Vue.use(Vant)
// Vue.use(VeeValidate, config)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log(1)
  if (to.fullPath === '/') {
    console.log(2)
    next()
  } else if (to.fullPath === '/IndexTeacher') {
    next()
  } else {
    console.log(window.sessionStorage.getItem('user'))
    if (window.sessionStorage.getItem('user') !== null) {
      // initMenu(router, store)
      if (to.path !== '/signUpView') {
        next('/')
      }
      console.log(111)
      // initStudent(router, store)
      next()
    } else if (window.sessionStorage.getItem('teacher')) {
      if (to.path === '/signUpView') {
        next('/indexTeacher')
      }
      console.log(222)
      // initTeacher(router, store)
      console.log(to.path)
      next()
    } else {
      console.log(333)
      next('/')
    }
  }
})
