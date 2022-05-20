<!--
 * @Author: AmeroL
 * @Date: 2022-05-20 19:15:00
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-21 00:50:21
 * @FilePath: /vue-frontend/src/views/studentInfo.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="studentInfoArea">
    <el-dialog title="Update Student Info"
               :visible.sync="dialogVisible">
      <div id="scoreInputBox">
        <el-form label-position="right"
                 label-width="150px"
                 v-model="studentInfoList">
          <el-form-item label="Name:">
            <el-input v-model="studentInfoList.studentName"></el-input>
          </el-form-item>
          <el-form-item label="StudentNumber:">
            <el-input v-model="studentInfoList.studentNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="Password:">
            <el-input v-model="studentInfoList.studentPassword"></el-input>
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
    <comPageTitile titleContent="Student Information"></comPageTitile>
    <el-descriptions size="medium"
                     border="true"
                     :column="1">
      <el-descriptions-item label="StudentName">{{studentInfoList.studentName}}</el-descriptions-item>
      <el-descriptions-item label="StudentNumber">{{studentInfoList.studentNumber}}</el-descriptions-item>
      <el-descriptions-item label="Role">
        <el-tag size="small">Student</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="success"
               plain
               @click="EditStudentInfo">Edit</el-button>
  </div>
</template>
<script>
let that;
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
import comPageTitile from '../components/publicComponents/comPageTitile.vue'
export default {
  components: {
    comPageTitile
  },
  data: () => ({
    dialogVisible: false,
    studentInfoList: {
      studentName: 'zmz',
      studentNumber: '20184140',
      studentPassword: 'dshakjdsa'
    }
  }),
  created () {
    this.studentInfoList.studentName = this.$store.state.username;
    this.studentInfoList.studentNumber = this.$store.state.userLoginStuNumber;
    this.studentInfoList.studentPassword = this.$store.state.password;
    that = this;
  },
  methods: {
    showSuccessMessage () {
      that.$message({
        message: 'Update Success',
        type: 'success'
      });
    },
    api_UpdateStudentInfo (_Name, _Password, _stuNumber) {
      Axios.post(APIURL + 'updateStudent', {
        stuName: _Name,
        stuPassword: _Password,
        stuNumber: _stuNumber
      }).then(res => {
        that.showSuccessMessage();
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

    },
    EditStudentInfo () {
      this.dialogVisible = true;
    },
    submitUpdate () {
      this.$store.state.username = this.studentInfoList.studentName;
      this.$cookies.set('username', this.studentInfoList.studentName, '1d');
      this.dialogVisible = false;
      this.api_UpdateStudentInfo(this.studentInfoList.studentName, this.studentInfoList.studentPassword, this.studentInfoList.studentNumber);
    }
  },
}
</script>
<style scoped>
#studentInfoArea {
  text-align: center;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 500px;
  background-color: white;
}
#studentInfoArea >>> .el-descriptions {
  margin-top: 20px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
#studentInfoArea >>> .el-descriptions-item__cell {
  font-size: 15px;
  text-align: left;
  /* height: 60px;
  line-height: 60px; */
}
#studentInfoArea >>> .el-descriptions-item__content {
  align-self: center;
}
#studentInfoArea >>> .el-tag {
  font-size: 15px;
}
#studentInfoArea >>> .el-button {
  margin-top: 20px;
  width: 170px;
}
</style>