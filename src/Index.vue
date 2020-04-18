<template>
<div>
  <van-form @submit="onSubmit" @failed="onFailed">
    <div style="text-align:center;font-size: 30px; color: #1989fa; margin-top:30px ">阜新一职专报名系统</div>
    <div style="margin: 20px;">
    <van-field
            style="border-radius:10px 10px 0px 0px;"
            v-model="newcall"
            label="手机号"
            name="name"
            maxlength="11"
            placeholder="手机号"
            :rules="[{ required: true, message: '请输入电话' },
            { pattern: /^[1][3-9][0-9]{9}$/, message: '电话输入有误' }]"
    >
    </van-field>

  <van-field
          style="border-radius:0px 0px 10px 10px;"
          v-model="studentCodeLogin.phoneNumberCode"
          type="digit"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请输入验证码' },
        { pattern: /^[0-9]{6}$/, message: '验证码输入有误' }]"
  />
      <div style="border-radius:10px; float: right">
        <van-button @click="getyzcode" :disabled="attcode" v-if="showbtn">获取验证码</van-button>
        <button class="tsbtn" v-else>{{code_ts}}</button>
      </div>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      登陆
    </van-button>
  </div>
    </div>
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
    onSubmit () {
      this.studentCodeLogin.phoneNumber = this.newcall
      this.postRequest('/loginCode', this.studentCodeLogin).then(resp => {
        if (resp) {
          this.$store.commit('INIT_CURRENTHR', this.studentCodeLogin)
          // window.sessionStorage.setItem('user', JSON.stringify(this.ruleForm))
          window.sessionStorage.setItem('user', JSON.stringify(resp.obj))
          let path = this.$route.query.redirect
          if (resp.obj.admissionType === null) {
            this.$router.replace((path === '/' || path === undefined) ? '/signUpView' : path)
          } else if (resp.obj.admissionType === 0) {
            this.$router.replace((path === '/' || path === undefined) ? '/signUpInfoView' : path)
          } else if (resp.obj.admissionType === 2) {
            this.$router.replace((path === '/' || path === undefined) ? '/signUpYesView' : path)
          }
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
