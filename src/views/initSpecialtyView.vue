<template>
  <div><van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    各专业招生数量
  </van-divider>
        <van-grid :column-num="5" square >
          <van-grid-item >专业</van-grid-item>
          <van-grid-item >人数</van-grid-item>
          <van-grid-item >住宿</van-grid-item>
          <van-grid-item >住宿男</van-grid-item>
          <van-grid-item >住宿女</van-grid-item>
        </van-grid>
        <van-grid :column-num="5" square v-for="(value,index) in specialtyAllData" :key="index" >
          <van-grid-item >{{value.specialtyName}}</van-grid-item>
          <van-grid-item >{{value.specialtyNumber}}</van-grid-item>
          <van-grid-item >{{value.acommodationcount}}</van-grid-item>
          <van-grid-item >{{value.boycount}}</van-grid-item>
          <van-grid-item >{{value.girlcount}}</van-grid-item>
        </van-grid>
    <router-view />
    <van-tabbar v-model="active" route>
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
      active: 0,
      minDate: new Date(2020, 3, 1),
      maxDate: new Date(2025, 10, 1),
      startData: new Date(),
      specialtyByDataList: [],
      specialtyList: [],
      specialtyAllData: []
    }
  },
  methods: {
    getStundetList () {
      this.getRequest('/Student/getDailyReport?startDate=' + this.birthdayToTime(this.startData)).then(resp => {
        // this.specialtyByDataList = resp
        this.specialtyByDataList = this.studentListAll(resp)
      })
    },
    studentListAll (resp) {
      let i = 0
      let s = 0
      var specialtyList = []
      for (i = 0; i < 50; i++) {
        specialtyList[i] = {registerNumber: 0}
      }
      let leng = resp.length
      for (s = 0; s < leng; s++) {
        let sum = parseInt(resp[s].registerDate) + parseInt(resp[s].specialtyId) * 5
        // console.log(sum)
        // console.log(this.specialtyByDataList[s].registerDate + '-' + this.specialtyByDataList[s].specialtyId * 5 + '-' + this.specialtyByDataList[s].registerNumber)
        specialtyList[sum].registerNumber = resp[s].registerNumber
      }
      return specialtyList
    },
    birthdayToTime (startData) {
      var date = new Date(startData) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      return Y + M + D
    },
    dateFormat1 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
      return M + D
    },
    dateFormat2 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + '日'
      return M + D
    },
    dateFormat3 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() + 2 < 10 ? '0' + (date.getDate() + 2) : date.getDate() + 2) + '日'
      return M + D
    },
    dateFormat4 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() + 3 < 10 ? '0' + (date.getDate() + 3) : date.getDate() + 3) + '日'
      return M + D
    },
    dateFormat5 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() + 4 < 10 ? '0' + (date.getDate() + 4) : date.getDate() + 4) + '日'
      return M + D
    },
    initSpecialtyData () {
      this.getRequest('/Student/getRecruitNumberBySpecialty').then(resp => {
        this.specialtyAllData = resp
      })
    }

  },
  created () {
    let i = 0
    for (i = 0; i < 50; i++) {
      this.specialtyByDataList[i] = {registerNumber: 0}
    }
  },
  mounted () {
    this.getStundetList()
    this.initSpecialtyData()
  }

}
</script>

<style scoped>

</style>
