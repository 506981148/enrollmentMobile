<template>
  <div>
    <van-divider
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      招生日报
    </van-divider>
    <van-form @submit="submitForm">
    <van-field
            v-model="password"
            type="password"
            name="原密码"
            label="原密码"
            placeholder="原密码"
            :rules="[{ required: true, message: '请填写原密码' },
            { validator: chePass, message: '密码输入不正确' }]"
    />
    <van-field
            v-model="pass"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="新密码"
            :rules="[{ required: true, message: '请填写新密码' },
             {validator:passByCheckPass, message:'密码输入不一致'}
            ]"
    />
    <van-field
            v-model="checkPass"
            type="password"
            name="请再一次输入新密码"
            label="请再一次输入新密码"
            placeholder="请再一次输入新密码"
            :rules="[{ required: true, message: '请再一次输入新密码' },
            {validator:passByCheckPass, message:'密码输入不一致'}
            ]"
    />
    </van-form>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/initSpecialtyView"  icon="home-o">总录取</van-tabbar-item>
      <van-tabbar-item replace to="/teacherView"  icon="friends-o">日报</van-tabbar-item>
      <van-tabbar-item replace to="/teacherInfo" icon="setting-o">修改密码</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TeacherView',
  data () {
    return {
      password: '',
      pass: '',
      checkPass: '',
      manager: {
        id: '',
        managerOldPassword: '',
        managerPassword: ''
      },
      managers: {
        id: '',
        managerPassword: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sessionUser = JSON.parse(window.sessionStorage.getItem('user'))
          this.manager.id = this.sessionUser.id
          this.manager.managerOldPassword = this.password
          this.manager.managerPassword = this.checkPass
          this.putRequest('Manager/updatePassword', this.manager).then()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    passByCheckPass () {
      if (this.pass === this.checkPass) {
        return true
      } else {
        return false
      }
    },
    chePass () {
      this.sessionUser = JSON.parse(window.sessionStorage.getItem('user'))
      this.manager.id = this.sessionUser.id
      this.manager.managerOldPassword = this.password
      this.postRequest('Manager/checkPass', this.manager).then(resp => {
        if (resp > 0) {
          return true
        } else {
          return false
        }
      })
    }
  },
  created () {
  },
  mounted () {
  }

}
</script>

<style scoped>

</style>
