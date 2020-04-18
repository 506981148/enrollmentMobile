<template>
<div>

  <div class="list">
    <div class="left">手机号码</div>
    <div class="mid">
      <input type="text" maxlength="11" v-model="newcall" placeholder="请输入">
    </div>
    <div class="right">
      <van-button @click="getyzcode" :disabled="attcode" v-if="showbtn">获取验证码</van-button>
      <button class="tsbtn" v-else>{{code_ts}}</button>
    </div>
  </div>
  <div class="list">
    <div class="left">验证码</div>
    <div class="mid">
      <input type="number" maxlength="6" v-model="studentCodeLogin.phoneNumberCode" placeholder="请输入">
    </div>
  </div>
  <van-button @click="login" >登陆</van-button>
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
      },
      confirm: true,
      attcode: true, // 点击获取验证码按钮判断
      showbtn: true, // 展示获取验证码或倒计时按钮判断
      yzcode: '',
      newcall: '',
      code_ts: '获取验证码', // 倒计时提示文字
      sec: 60 // 倒计时秒数
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
    getyzcode () {
      this.getLoginCodePC()
      this.code_ts = this.sec + 'S后重试'
      this.showbtn = false
      var timer = setInterval(() => {
        this.sec = this.sec - 1
        this.code_ts = this.sec + 'S后重试'
        this.showbtn = false
        if (this.sec === 0) {
          clearInterval(timer)
          this.sec = 60
          this.code_ts = this.sec + 'S后重试'
          this.showbtn = true
        }
      }, 1000)
    },
    getLoginCode () {
      this.getRequest('/getLoginCode?phoneNumber=' + this.studentCodeLogin.phoneNumber).then(resp => {
      })
    },
    getLoginCodePC () {
      this.studentCodeLogin.phoneNumber = this.newcall
      this.getRequest('/getLoginCodePC?phoneNumber=' + this.studentCodeLogin.phoneNumber).then(resp => {
      })
    }
  },
  watch: {
    newcall: function (value) {
      var reg = /\b1[3456789]\d{9}\b/g
      let val = reg.test(value)
      if (val) {
        this.attcode = false
      } else {
        this.attcode = true
      }
    }
  }
}

</script>

<style scoped>

</style>
