<template>
  <div>
    <van-datetime-picker
            v-model="startData"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @change="getStundetList"
    />
    <van-grid :column-num="5" square>
      <van-grid-item >{{dateFormat1(startData)}}</van-grid-item>
      <van-grid-item >{{dateFormat2(startData)}}</van-grid-item>
      <van-grid-item >{{dateFormat3(startData)}}</van-grid-item>
      <van-grid-item >{{dateFormat4(startData)}}</van-grid-item>
      <van-grid-item >{{dateFormat5(startData)}}</van-grid-item>
      <van-grid-item v-for="value in specialtyList" :key="value" >{{value.registerNumber}}</van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'TeacherView',
  data () {
    return {
      minDate: new Date(2020, 3, 1),
      maxDate: new Date(2025, 10, 1),
      startData: new Date(),
      specialtyByDataList: [],
      specialtyList: []
    }
  },
  methods: {
    getStundetList () {
      this.getRequest('/Student/getDailyReport?startDate=' + this.birthdayToTime(this.startData)).then(resp => {
        this.specialtyByDataList = resp
        this.studentListAll()
      })
    },
    studentListAll () {
      for (let i = 0; i < 5; i++) {
        for (let n = 0; n < 10; n++) {
          this.specialtyList[i * 10 + n] = {registerNumber: 0}
        }
      }
      let leng = this.specialtyByDataList.length
      for (let i = 0; i < leng; i++) {
        let sum = parseInt(this.specialtyByDataList[i].registerDate) * 10 + parseInt(this.specialtyByDataList[i].specialtyId)
        console.log(this.specialtyByDataList[i].registerDate)
        this.specialtyList[sum] = {registerNumber: this.specialtyByDataList[i].registerNumber}
      }
      console.log(this.specialtyList)
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
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate()
      return  M + D
    },
    dateFormat2 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + 1
      return  M + D
    },
    dateFormat3 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + 2
      return  M + D
    },
    dateFormat4 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + 3
      return  M + D
    },
    dateFormat5 (datas) {
      var date = new Date(datas) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + 4
      return  M + D
    }

  },
  mounted () {
    this.studentListAll()
    this.getStundetList()
  }

}
</script>

<style scoped>

</style>
