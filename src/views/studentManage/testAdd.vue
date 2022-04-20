<!--
 * @Author: AmeroL
 * @Date: 2022-04-20 23:47:31
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-21 00:01:02
 * @FilePath: \vue-frontend\src\views\studentManage\testAdd.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="AddStudentPage">
    <el-row type="flex"
            justify="center">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <div id="inputArea">
          <el-form :model="studentInfoList"
                   label-width="230px"
                   size="medium">
            <el-form-item label="StudentName:">
              <el-input v-model="studentInfoList.studentName"></el-input>
            </el-form-item>
            <el-form-item label="StudentNumber:">
              <el-input v-model="studentInfoList.studentNumber"></el-input>
            </el-form-item>
            <el-form-item label="permission:">
              <el-select class="myinputbox"
                         v-model="studentInfoList.permission"
                         placeholder="Please select sex">
                <el-option label="no pass CET-4"
                           value="0"> </el-option>
                <el-option label="have passed CET-4 ,no pass CET-6"
                           value="1"> </el-option>
                <el-option label="have passed CET-6"
                           value="2"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Password:">
              <el-input v-model="studentInfoList.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  data: () => ({
    studentInfoList: {
      name: '',
      studentNumber: '',
      permission: '',
      password: '',
    }
  }),
}
</script>
<style scoped>
#AddStudentPage #inputArea {
}
</style>