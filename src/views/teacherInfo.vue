<template>
  <div>
    <van-divider
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      密码修改
    </van-divider>
    <van-form @submit="submitForm" @failed="onFailed">
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
            :rules="[{ required: true, message: '请填写新密码' }
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>

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
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    submitForm (formName) {
      this.sessionUser = JSON.parse(window.sessionStorage.getItem('teacher'))
      this.manager.id = this.sessionUser.id
      this.manager.managerOldPassword = this.password
      this.manager.managerPassword = this.checkPass
      this.putRequest('Manager/updatePassword', this.manager).then(resp => {
        if (resp.status === 200) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      }
      )
    },
    passByCheckPass () {
      if (this.pass === this.checkPass) {
        return true
      } else {
        return false
      }
    },
    chePass () {
      return new Promise(resolve => {
        this.sessionUser = JSON.parse(window.sessionStorage.getItem('teacher'))
        this.manager.id = this.sessionUser.id
        this.manager.managerOldPassword = this.password
        this.postRequest('Manager/checkPass', this.manager).then(resp => {
          if (resp === 0) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
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
