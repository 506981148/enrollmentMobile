<template>
  <div>
    <van-divider
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      招生日报
    </van-divider>
    <van-field
            readonly
            clickable
            name="calendar"
            label="时间"
            :value="startData"
            placeholder="点击选择日期"
            @click="showCalendar = true"

    />
    <van-calendar title="查询时间" v-model="showCalendar"  :min-date="minDate"
                  :max-date="maxDate" @confirm="onConfirm" />
        <van-row>
          <van-col span="4">
        <van-grid :column-num="1" square :span="1">
          <van-grid-item >专业</van-grid-item>
          <van-grid-item >学前教育</van-grid-item>
          <van-grid-item >焊接技术</van-grid-item>
          <van-grid-item >西点烘培</van-grid-item>
          <van-grid-item >中餐烹饪</van-grid-item>
          <van-grid-item >机电技术</van-grid-item>
          <van-grid-item >网络技术</van-grid-item>
          <van-grid-item >平面设计</van-grid-item>
          <van-grid-item >汽车维修</van-grid-item>
          <van-grid-item >摄影</van-grid-item>
          <van-grid-item >会计</van-grid-item>
        </van-grid>
          </van-col>
          <van-col span="20">
        <van-grid :column-num="5" square>
          <van-grid-item >{{dateFormat1(startData)}}</van-grid-item>
          <van-grid-item >{{dateFormat2(startData)}}</van-grid-item>
          <van-grid-item >{{dateFormat3(startData)}}</van-grid-item>
          <van-grid-item >{{dateFormat4(startData)}}</van-grid-item>
          <van-grid-item >{{dateFormat5(startData)}}</van-grid-item>
          <van-grid-item v-for="(value,index) in specialtyByDataList" :key="index" >{{value.registerNumber}}</van-grid-item>
        </van-grid>
          </van-col>
        </van-row>
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
      active: 0,
      minDate: new Date(2020, 3, 1),
      maxDate: new Date(2025, 10, 1),
      specialtyByDataList: [],
      specialtyList: [],
      specialtyAllData: [],
      startData: this.birthdayToTime(new Date()),
      showCalendar: false
    }
  },
  methods: {
    getStundetList () {
      this.getRequest('/Student/getDailyReport?startDate=' + this.startData).then(resp => {
        // this.specialtyByDataList = resp
        this.specialtyByDataList = this.studentListAll(resp)
      })
    },
    onConfirm (date) {
      this.startData = `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}`
      this.getStundetList()
      this.showCalendar = false
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
      var date = new Date(new Date(datas).getTime()) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日'
      return M + D
    },
    dateFormat2 (datas) {
      var date = new Date(new Date(datas).getTime() + 86400000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日'
      return M + D
    },
    dateFormat3 (datas) {
      var date = new Date(new Date(datas).getTime() + 172800000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日'
      return M + D
    },
    dateFormat4 (datas) {
      var date = new Date(new Date(datas).getTime() + 259200000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日'
      return M + D
    },
    dateFormat5 (datas) {
      var date = new Date(new Date(datas).getTime() + 345600000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日'
      return M + D
    },
    initSpecialtyData () {
      this.getRequest('/Student/getRecruitNumberBySpecialty').then(resp => {
        this.specialtyAllData = resp
        console.log(resp)
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
