import SignUpView from '../views/signUpView'

export const initSignUp = (router, store) => {
  if (store.state.routes.length > 0) {
    console.log(1)
    return
  }
  let fmtRoutes = formatRoutes()
  router.addRoutes(fmtRoutes)
  console.log(router)
  store.commit('initRoutes', fmtRoutes)
}
export const formatRoutes = (routes) => {
  let fmRoutes = [{
    path: '/signUpView',
    name: '报名管理',
    component: SignUpView
  },
  {
    path: '/signUpViews',
    name: '报名管理s',
    component: SignUpView
  }]
  return fmRoutes
}
