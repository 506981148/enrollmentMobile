<template>
<div>
  <van-form @submit="login" @failed="onFailed">
  <van-field
          v-model="studentCodeLogin.phoneNumber"
          type="digit"
          label="*学生电话"
          :rules="[{ required: true, message: '请输入学生电话' },
        { pattern: /^[1][3-9][0-9]{9}$/, message: '学生电话输入有误' }]"
  />
  <input v-model="studentCodeLogin.phoneNumberCode">
  <button @click="getLoginCode">获取验证码</button>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  <button @click="logOut">登出</button>
  </van-form>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      studentCodeLogin: {
        phoneNumber: '',
        phoneNumberCode: ''
      }
    }
  },
  methods: {
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    logOut () {
      window.sessionStorage.removeItem('user')
      window.sessionStorage.removeItem('teacher')
      this.$router.replace('/')
    },
    login () {
      this.postRequest('/loginCode', this.studentCodeLogin).then(resp => {
        if (resp) {
          this.$store.commit('INIT_CURRENTHR', this.studentCodeLogin)
          // window.sessionStorage.setItem('user', JSON.stringify(this.ruleForm))
          window.sessionStorage.setItem('user', JSON.stringify(resp.obj))
          let path = this.$route.query.redirect
          this.$router.replace((path === '/' || path === undefined) ? '/signUpView' : path)
        }
      })
    },
    getLoginCode () {
      this.getRequest('/getLoginCode?phoneNumber=' + this.studentCodeLogin.phoneNumber).then(resp => {
      })
    }
  }
}

</script>

<style scoped>

</style>
