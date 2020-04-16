<template>
  <div>
    <div>
      报名信息登记
    </div>
    <div>
      以下内容请如实填写，将用于发放录取通知书
    </div>
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-field
        v-model="userForm.name"
        label="*姓名"
        name="name"
        :rules="[{ required: true, message: '请输入姓名' },
          { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名输入有误' }]"
      />
      <van-field
        v-model="userForm.identityId"
        label="*身份证号"
        name="identityId"
        :rules="[{ required:true, message:'请输入身份证号'},
          {validator:identityIdrulateOld, message: '该身份证号码是往届生'},
          {validator:identityIdrulateNew, message: '该身份证号码已报名'},
          {validator:identityIdrulate, message: '身份证号码不正确'},
          {validator:identityIdAgerulate, message: '已超过报名年龄上限'}

        ]"
      />
      <van-field
        v-model="userForm.phoneNumber"
        type="digit"
        label="*学生电话"
        :rules="[{ required: true, message: '请输入学生电话' },
        { pattern: /^[1][3-9][0-9]{9}$/, message: '学生电话输入有误' }]"
      />
      <van-field v-model="userForm.birthPlace" label="*户籍地" disabled />
      <van-field v-model="userForm.nationality" label="*民族"
                 :rules="[{ required: true, message: '请输入民族' },
                  { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/, message: '民族输入有误' }]"
                 name="nationality"/>
      <van-field label="性别"
                 >
        <template #input>
          <van-radio-group
            v-model="userForm.gender"
            direction="horizontal"
          >
            <van-radio :name="item.value" v-for="(item, index) in genderTypes" :key="index" disabled>{{item.name}} </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userForm.livePlace" label="*家庭住址" />
      <van-field v-model="userForm.guardianName"
                 label="*家长姓名"
                 :rules="[{ required: true, message: '请输入家长姓名' },
                  { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '家长姓名输入有误' }]"
      ></van-field>
      <van-field label="家长关系" :rules="[{ validator: guardianRelationRules, message: '请选择监护人关系' }]">
        <template #input>
          <van-radio-group v-model="userForm.guardianRelation" direction="horizontal"
                           >
            <van-radio :name="item.value" v-for="(item, index) in guardianRelationList" :key="index" :rules="[{ required: true, message: '请输入长姓名' }]" >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userForm.guardianPhoneNumber" label="家长电话"
                 :rules="[{ required: true, message: '请输入家长电话' },
                 { pattern: /^[1][3-9][0-9]{9}$/, message: '家长电话输入有误' }]"
                 name="guardianPhoneNumber"/>
      <van-field
        :rules="[ { validator: specialtyIdruateByBoy, message: '男生禁止报名学前教育' },
                  { validator: specialtyIdruateByGril, message: '女生禁止报名焊接技术' },
                  { validator: specialtyIdruateByNull, message: '请选择专业' }]"
        readonly
        clickable
        name="picker"
        :value="specialitiesValue"
        label="专业"
        placeholder="点击选择专业"
        @click="showPicker = true"

      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          name="specialitiesValue"
          show-toolbar
          :columns="specialitiesList"
          @change="onChangeSpecialty"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field label="是否住宿" :rules="[{ validator: accommodationRules, message: '请选择是否住宿' }]">
        <template #input>
          <van-radio-group v-model="userForm.accommodation" direction="horizontal">
            <van-radio :name="item.value" v-for="(item, index) in accommodationTypes" :key="index">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="是否为低保户" :rules="[{ validator: incomeSupportRules, message: '请选择是否为低保户' }]">
        <template #input>
          <van-radio-group v-model="userForm.incomeSupport" direction="horizontal">
            <van-radio :name="item.value" v-for="(item, index) in buildFileTypes" :key="index">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="是否建档立卡" :rules="[{ validator: buildFileRules, message: '请选择是否建档立卡' }]">
        <template #input>
          <van-radio-group v-model="userForm.buildFile" direction="horizontal">
            <van-radio :name="item.value" v-for="(item, index) in buildFileTypes" :key="index">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="户籍性质" :rules="[{ validator: householdTypeRules, message: '请选择户籍性质' }]">
        <template #input>
          <van-radio-group v-model="userForm.householdType" direction="horizontal">
            <van-radio :name="item.value" v-for="(item, index) in householdTypes" :key="index">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userForm.achievement" label="中考成绩" type="number" :rules="[{ required: true, message: '请输入中考成绩'}]" />
      <van-field v-model="userForm.teacherCode" label="老师邀请码"
                 :rules="[{validator:teacherCoderulate,message: '老师邀请码有误'}]">
      </van-field>
      <van-field
        :rules="[{ validator: schoolUniformSizeRules, message: '请选择校服尺寸' }]"
        readonly
        clickable
        name="picker"
        :value="schoolUniformSizeValue"
        label="校服尺寸"
        placeholder="点击选择校服尺寸"
        @click="schoolUniformSizeShowPicker = true"

      />
      <van-popup v-model="schoolUniformSizeShowPicker" position="bottom">
        <van-picker
          name="schoolUniformSizeValue"
          show-toolbar
          :columns="schoolUniformSizecolumns"
          @change="onChangeSchoolUniformSize"
          @cancel="schoolUniformSizeShowPicker = false"
        />
      </van-popup>
      <van-field v-show="schoolUniformSizeShow"
                 v-model="userForm.schoolUniformSizeNote"
                 label="校服尺寸备注"
                 :rules="[{ validator: schoolUniformSizeNoteRules, message: '请输入校服尺寸备注'}]" />
        <van-field
          :rules="[{ validator: uniformSizeRules, message: '请选择军训服尺寸' }]"
          readonly
          clickable
          name="picker"
          :value="uniformSizeValue"
          label="军训服尺寸"
          placeholder="点击选择军训服尺寸"
          @click="uniformSizeShowPicker = true"

        />
        <van-popup v-model="uniformSizeShowPicker" position="bottom">
          <van-picker
            name="uniformSizeValue"
            show-toolbar
            :columns="schoolUniformSizecolumns"
            @change="onChangeUniformSize"
            @cancel="uniformSizeShowPicker = false"
          />
        </van-popup>
      <van-field v-show="uniformSizeShow"
                 v-model="userForm.uniformSizeNote"
                 label="军训服尺寸备注"
                 :rules="[{ validator: uniformSizeNoteRules, message: '请输入军训服尺寸备注'}]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
  </van-form>
    <router-view class="homeRouterView"/>
  </div>

</template>

<script>
export default {
  data () {
    return {
      userForm: {
        id: 0,
        identityId: '',
        name: '',
        gender: '',
        birthday: '',
        birthPlace: '',
        nationality: '',
        phoneNumber: '',
        guardianPhoneNumber: '',
        guardianName: '',
        guardianRelation: '',
        livePlace: '',
        specialtyId: '',
        accommodation: '',
        householdType: '',
        incomeSupport: '',
        buildFile: '',
        schoolUniformSize: '',
        schoolUniformSizeNote: '',
        uniformSize: '',
        uniformSizeNote: '',
        teacherCode: '',
        achievement: '',
        registerDate: '',
        registerManagerId: 0,
        tuitionShouldCharge: 0,
        tuitionActualCharge: 0,
        tuitionNeedCharge: 0,
        charegeDate: 0,
        chargeManagerId: 0,
        enrollType: 0,
        admissionType: 0,
        ps: ''
      },
      index: '',
      showPicker: false,
      specialities: 0,
      specialitiesValue: '请选择',
      schoolUniformSizeShow: false,
      schoolUniformSizeValue: '请选择',
      schoolUniformSizeShowPicker: false,
      uniformSizeShow: false,
      uniformSizeValue: '请选择',
      uniformSizeShowPicker: false,
      radio: 1,
      specialitiesList: [],
      specialitiesListOld: [],
      genderTypes: [
        {name: '男', value: 0},
        {name: '女', value: 1}

      ],
      guardianRelationList: [
        {name: '父母', value: 0},
        {name: '亲属', value: 1}
      ],
      accommodationTypes: [
        {name: '走读', value: 0},
        {name: '住校', value: 1}
      ],
      householdTypes: [
        {name: '农村', value: 0},
        {name: '城市', value: 1},
        {name: '县镇非农', value: 2}
      ],
      buildFileTypes: [
        {name: '是', value: 1},
        {name: '否', value: 0}
      ],
      schoolUniformSizecolumns: [
        '155', '160', '165', '170', '175', '180', '185', '190', '特体'
      ],
      schoolUniformSizeList: [
        {name: '155', value: 0},
        {name: '160', value: 1},
        {name: '165', value: 2},
        {name: '170', value: 3},
        {name: '175', value: 4},
        {name: '180', value: 5},
        {name: '185', value: 6},
        {name: '190', value: 7},
        {name: '特体', value: 8}
      ],
      admissionTypeList: [
        {name: '未录取', value: 0},
        {name: '已录取', value: 1},
        {name: '已在读', value: 2},
        {name: '已拒绝', value: 3},
        {name: '已往届', value: 4},
        {name: '退学', value: 5}
      ]
    }
  },
  methods: {
    onChangeSpecialty (picker, value, index) {
      var len = this.specialitiesListOld.length
      for (var i = 0; i < len; i++) {
        if (value === this.specialitiesListOld[i].specialtyName) {
          this.userForm.specialtyId = this.specialitiesListOld[i].id
        }
      }
      this.specialitiesValue = value
      this.showPicker = false
      this.getRequest('/Specialties/specialtyLimitNumebr?specialtyId=' + value).then(resp => {
        if (resp > 0) {
          alert('该专业录取人数已超过专业限制，请核实后再报名')
        }
      })
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onChangeSchoolUniformSize (picker, value, index) {
      var len = this.schoolUniformSizeList.length
      for (var i = 0; i < len; i++) {
        if (value === this.schoolUniformSizeList[i].name) {
          this.userForm.schoolUniformSize = this.schoolUniformSizeList[i].value
        }
      }
      if (value === '特体') {
        this.schoolUniformSizeShow = true
      } else {
        this.schoolUniformSizeShow = false
      }
      this.schoolUniformSizeValue = value
      this.schoolUniformSizeShowPicker = false
      console.log(value[0])
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onChangeUniformSize (picker, value, index) {
      var len = this.schoolUniformSizeList.length
      for (var i = 0; i < len; i++) {
        if (value === this.schoolUniformSizeList[i].name) {
          this.userForm.uniformSize = this.schoolUniformSizeList[i].value
        }
      }
      if (value === '特体') {
        this.uniformSizeShow = true
      } else {
        this.uniformSizeShow = false
      }
      this.uniformSizeValue = value
      this.uniformSizeShowPicker = false
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    accommodationRules (val) {
      if (this.userForm.accommodation === '') {
        return false
      } else {
        return true
      }
    },
    incomeSupportRules (val) {
      if (this.userForm.incomeSupport === '') {
        return false
      } else {
        return true
      }
    },
    buildFileRules (val) {
      if (this.userForm.buildFile === '') {
        return false
      } else {
        return true
      }
    },
    householdTypeRules (val) {
      if (this.userForm.householdType === '') {
        return false
      } else {
        return true
      }
    },
    guardianRelationRules (val) {
      if (this.userForm.guardianRelation === '') {
        return false
      } else {
        return true
      }
    },
    schoolUniformSizeRules (val) {
      if (val === '请选择') {
        return false
      } else {
        return true
      }
    },
    uniformSizeRules (val) {
      if (val === '请选择') {
        return false
      } else {
        return true
      }
    },
    schoolUniformSizeNoteRules (val) {
      if (this.userForm.schoolUniformSize === 8) {
        if (val === '') {
          return false
        } else {
          return true
        }
      }
    },
    uniformSizeNoteRules (val) {
      if (this.userForm.uniformSize === 8) {
        if (val === '') {
          return false
        } else {
          return true
        }
      }
    },
    initCode (codeId) {
      this.getRequest('/Code/load?codeId=' + codeId).then(resp => {
        this.userForm.birthPlace = resp.name
      })
    },
    initSpecialitiesList () {
      this.getRequest('/Specialties/list').then(resp => {
        this.specialitiesListOld = resp
        var len = this.specialitiesListOld.length
        for (var i = 0; i < len; i++) {
          this.specialitiesList[i] = this.specialitiesListOld[i].specialtyName
        }
      })
    },
    specialtyIdruateByGril (val) {
      if (this.userForm.gender === 1 && this.userForm.specialtyId === 1) {
        return false
      } else {
        return true
      }
    },
    specialtyIdruateByBoy (val) {
      if (this.userForm.gender === 0 && this.userForm.specialtyId === 0) {
        return false
      } else {
        return true
      }
    },
    specialtyIdruateByNull (val) {
      if (this.specialitiesValue === '请选择') {
        return false
      } else {
        return true
      }
    },
    identityIdrulate (val) {
      let coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 除11取余的结果对应的校验位（最后一位）的值
      let checkDigitMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var sum = 0
      if (val.length !== 18) {
        return false
      } else {
        for (var i = 0; i < 17; i++) {
          sum += val[i] * coefficient[i]
        }
        if (val[17] === checkDigitMap[sum % 11]) {
          if (val[17] % 2 === 1) {
            this.userForm.gender = 1
            console.log(val)
          } else {
            this.userForm.gender = 0
            console.log(val)
          }
          if (val[17] === 'x' || val[17] === 'X') {
            this.userForm.gender = 1
          }
          var day = val[6] + val[7] + val[8] + val[9] + '-' + val[10] + val[11] + '-' + val[12] + val[13]
          this.userForm.birthday = new Date(day).getTime()
          var code = val[0] + val[1] + val[2] + val[3] + val[4] + val[5]
          this.initCode(code)
          return true
        } else {
          return false
        }
      }
    },
    identityIdrulateOld (val) {
      return new Promise(resolve => {
        this.getRequest('/DropoutStudent/selectStudentByID?identityId=' + val).then(resp => {
          if (resp === 1) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
      })
    },
    identityIdrulateNew (val) {
      return new Promise(resolve => {
        if (this.userForm.id === 0) {
          this.getRequest('/DropoutStudent/selectStudentByID?identityId=' + val).then(resp => {
            if (resp === 2) {
              console.log(1)
              resolve(false)
            } else {
              console.log(2)
              resolve(true)
            }
          })
        } else {
          console.log(3)
          resolve(true)
        }
      })
    },
    identityIdAgerulate (val) {
      return new Promise(resolve => {
        if (this.userForm.id === 0) {
          this.getRequest('/getConfigureById?codeId=1&typeId=1').then(resp => {
            if (this.userForm.birthday < new Date(resp.type_name).getTime()) {
              resolve(false)
            } else {
              resolve(true)
            }
          })
        } else {
          console.log(3)
          resolve(true)
        }
      })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },

    onSubmit () {
      var tuition = 0
      var bookFee = 0
      var acommodationFee = 0
      var len = this.specialitiesList.length
      for (var i = 0; i < len; i++) {
        if (this.specialitiesList[i].id === this.userForm.specialtyId) {
          tuition = this.specialitiesList[i].tuition
          bookFee = this.specialitiesList[i].bookFee
          acommodationFee = this.specialitiesList[i].acommodationFee
        }
      }
      var totle = bookFee
      if (this.userForm.accommodation === 1) {
        totle = totle + acommodationFee
      }
      if (this.userForm.householdType !== 0 && this.userForm.incomeSupport === 0 && this.userForm.buildFile === 0) {
        totle = totle + tuition
      }
      this.userForm.tuitionShouldCharge = totle
      if (this.userForm.ps !== '') {
        this.putRequest('/Student/update', this.userForm).then(
        )
      } else {
        this.userForm.registerDate = new Date()
        this.userForm.ps = '学生:' + this.userForm.name + '在' + this.userForm.registerDate + '报名了。'
        this.userForm.enrollType = 1
        this.postRequest('/Student/insert', this.userForm).then(
        )
      }
    },
    teacherCoderulate (val) {
      return new Promise(resolve => {
        if (val !== '') {
          this.getRequest('/Teacher/selectTeacherByCode?teacherCode=' + val).then(resp => {
            if (resp.teacherName !== undefined) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        } else {
          resolve(true)
        }
      })
    }
  },
  mounted () {
    this.initSpecialitiesList()
  }
}
</script>

<style scoped>

</style>
