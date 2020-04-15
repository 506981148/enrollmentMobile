<template>
<div>
  <input v-model="loginMessage.iphone">
  <input v-model="loginMessage.code">
  <button @click="loginMessageGet">获取验证码</button>
  <button @click="login">登陆</button>
  <button @click="logOut">登出</button>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      loginMessage: {
        iphone: '',
        code: ''
      },
      ruleForm: {
        managerID: '1',
        managerPassword: '1'
      }

    }
  },
  methods: {
    loginMessageGet () {
      this.postRequest('/login', this.loginMessage).then(resp => {

      })
    },
    logOut () {
      window.sessionStorage.removeItem('user')
      this.$router.replace('/')
    },
    login () {
      this.postRequest('/login', this.ruleForm).then(resp => {
        if (resp) {
          this.$store.commit('INIT_CURRENTHR', this.ruleForm)
          window.sessionStorage.setItem('user', JSON.stringify(this.ruleForm))
          let path = this.$route.query.redirect
          this.$router.replace((path === '/' || path === undefined) ? '/signUpView' : path)
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
