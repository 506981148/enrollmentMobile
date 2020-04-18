<template>
<div>
  <div style="text-align:center;font-size: 30px; color: #1989fa; margin-top:30px ">阜新一职专报名系统</div>
  <div style="margin: 20px;">
  <van-form @submit="login">
    <van-field
            style="border-radius:10px 10px 0px 0px;"
            v-model="manager.managerID"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
            style="border-radius:10px;"
            v-model="manager.managerPassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</div>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      manager: {
        managerID: '',
        managerPassword: ''
      }
    }
  },
  methods: {
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    logOut () {
      window.sessionStorage.removeItem('user')
      this.$router.replace('/')
    },
    login () {
      this.postRequest('/login', this.manager).then(resp => {
        if (resp) {
          this.$store.commit('INIT_CURRENTHR', this.studentCodeLogin)
          // window.sessionStorage.setItem('user', JSON.stringify(this.ruleForm))
          window.sessionStorage.setItem('teacher', JSON.stringify(resp.obj))
          let path = this.$route.query.redirect
          this.$router.replace((path === '/' || path === undefined) ? '/initSpecialtyView' : path)
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
