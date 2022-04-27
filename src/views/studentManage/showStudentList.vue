<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:13:58
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-22 01:15:57
 * @FilePath: /vue-frontend/src/views/studentManage/showStudentList.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="studentList">

    <el-divider></el-divider>
    <el-dialog title="UpdateScore"
               :visible.sync="dialogVisible">
      <div id="scoreInputBox">
        <el-form label-position="right"
                 label-width="150px"
                 v-model="studentInfoList">
          <el-form-item label="Name:">
            <el-input v-model="studentInfoList.name"
                      :placeholder="namePlace"></el-input>
          </el-form-item>
          <el-form-item label="StudentNumber:">
            <el-input v-model="studentInfoList.studentNumber"
                      :placeholder="studentNumberPlace"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="Permission:">
            <el-input v-model="studentInfoList.permission"
                      :placeholder="permissionPlace"></el-input>
          </el-form-item>
          <el-form-item label="Password:">
            <el-input v-model="studentInfoList.password"
                      :placeholder="passwordPlace"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="submitUpdate">Confirm</el-button>
      </div>
    </el-dialog>

    <el-table :data="studentList"
              :border="true">
      <el-table-column label="Name"
                       prop="name"></el-table-column>
      <el-table-column label="StudentNumber"
                       prop="studentNumber"></el-table-column>
      <el-table-column label="Permission"
                       prop="permission"></el-table-column>
      <el-table-column label="Operation"
                       width="180">
        <template slot-scope="scope">
          <el-button @click="showStudentInfo(scope.row)"
                     type="primary"
                     size="mini">Score</el-button>
          <el-button type="success"
                     @click="editStudentInfo(scope.row)"
                     size="mini">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    namePlace: '',
    studentNumberPlace: '',
    permissionPlace: '',
    passwordPlace: '',
    dialogVisible: false,
    studentInfoList: {
      name: '',
      studentNumber: '',
      permission: '',
      password: '',
    },
    studentList: [{
      name: "amero",
      studentNumber: "1234569",
      permission: "0",
      password: "123456",
    },
    {
      name: "amero1",
      studentNumber: "12349",
      permission: "1",
      password: "123456",
    },
    {
      name: "amero2",
      studentNumber: "1789",
      permission: "2",
      password: "123456",
    }

    ],
  }),
  methods: {
    // get  student list from server
    getStudentList () {
      // axios get student list from server
    },
    showStudentInfo (row) {
      this.$router.push(
        {
          name: "StudentScore",
          params: {
            studentNumber: row.studentNumber,
          }
        }
      )
      console.log(row);
    },
    editStudentInfo (row) {
      this.namePlace = row.name;
      this.studentNumberPlace = row.studentNumber;
      this.permissionPlace = row.permission;
      let index = this.getUpdateItem(row);
      this.passwordPlace = this.studentList[index].password;
      this.studentInfoList.studentNumber = row.studentNumber;
      this.studentInfoList = JSON.parse(JSON.stringify(this.studentList[index]));


      this.dialogVisible = true;
    },
    getUpdateItem (sutdent) {
      for (let i = 0; i < this.studentList.length; i++) {
        if (this.studentList[i].studentNumber == sutdent.studentNumber) {
          return i;

        }
      }
    },
    clearTempInfo () {
      this.studentInfoList.name = '';
      this.studentInfoList.studentNumber = '';
      this.studentInfoList.permission = '';
      this.studentInfoList.password = '';


      this.namePlace = '';
      this.studentNumberPlace = '';
      this.permissionPlace = '';
      this.passwordPlace = '';

    },
    submitUpdate () {
      let index = this.getUpdateItem(this.studentInfoList);
      //  studentList index update
      let templist = JSON.parse(JSON.stringify(this.studentInfoList));
      this.studentList.splice(index, 1, templist);

      this.$message({
        message: "Update Success",
        type: "success",
      });
      //clear studentInfoList
      this.clearTempInfo();
      console.log(this.studentList);
      this.dialogVisible = false;
    },
  }
}
</script>
<style scoped>
#studentList {
}
</style>