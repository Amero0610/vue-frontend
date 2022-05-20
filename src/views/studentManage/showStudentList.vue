<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:13:58
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-20 19:31:29
 * @FilePath: /vue-frontend/src/views/studentManage/showStudentList.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="studentList">
    <comPageTitile titleContent="Student list"></comPageTitile>

    <el-dialog title="Update Student Info"
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
          <!-- <el-form-item label="Permission:">
            <el-input v-model="studentInfoList.permission"
                      :placeholder="permissionPlace"></el-input>
          </el-form-item> -->
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
      <el-table-column label="Role"
                       prop="permission">
        <template slot-scope="scope">
          {{scope.row.permission| permissionFilter}}
        </template>
      </el-table-column>
      <el-table-column label="Operation"
                       width="260">
        <template slot-scope="scope">
          <el-button @click="showStudentInfo(scope.row)"
                     type="primary"
                     size="mini">Score</el-button>
          <el-button type="success"
                     @click="editStudentInfo(scope.row)"
                     size="mini">Edit</el-button>
          <el-button type="danger"
                     plain
                     @click="deleteStudent(scope.row)"
                     size="mini">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
import comPageTitile from "../../components/publicComponents/comPageTitile.vue"
export default {
  components: {
    comPageTitile
  },
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
    studentList: [

    ],
  }),
  created () {
    this.api_GetStudentList();
  },
  methods: {
    // get  student list from server
    getStudentList () {
      // axios get student list from server
    },
    showStudentInfo (row) {
      console.log(row);
      this.$router.push(
        {
          name: "StudentScore",
          params: {
            studentNumber: row.studentNumber,
            //studentNumber: 20184140,
          }
        }
      )

    },
    setStudentList (_list) {
      for (let i = 0; i < _list.length; i++) {
        if (_list[i].stuExamLevel === "1") {
          continue;
        }
        let tempObj = new Object();
        tempObj.name = _list[i].stuName;
        tempObj.studentNumber = _list[i].stuNumber;
        tempObj.permission = _list[i].stuExamLevel;
        tempObj.password = _list[i].stuPassword;
        tempObj.stuId = _list[i].stuId;
        this.studentList.push(tempObj);
      }
    },
    api_GetStudentList () {
      this.studentInfoList = [];
      Axios.get(APIURL + "getStudents").then(res => {
        //this.studentList = res.data.data;
        this.setStudentList(res.data.data)
      }).catch(err => {
        console.log(err);
      })
    },
    api_UpdateStudentInfo (_Name, _Password, _stuNumber) {
      Axios.post(APIURL + 'updateStudent', {
        stuName: _Name,
        stuPassword: _Password,
        stuNumber: _stuNumber
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

    },
    api_DeleteStudent (_stuNumber) {
      Axios.post(APIURL + 'deleteStudent', {
        stuNumber: _stuNumber
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    editStudentInfo (row) {
      this.namePlace = row.name;
      this.studentNumberPlace = row.studentNumber;
      this.permissionPlace = row.permission;
      let index = this.getUpdateItem(row);
      this.passwordPlace = this.studentList[index].password;
      // this.studentInfoList.studentNumber = row.studentNumber;
      // this.studentInfoList.name = row.name;
      // this.studentInfoList.stuId = row.stuId;
      // this.studentInfoList.stuPassword = row.password;
      // this.studentInfoList.studentNumber = row.studentNumber;
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
    updateToLocalList (_list, index) {
      this.studentList[index].name = _list.name;
      this.studentList[index].studentNumber = _list.studentNumber;
      this.studentList[index].permission = _list.permission;
      this.studentList[index].password = _list.password;

    },
    submitUpdate () {
      let index = this.getUpdateItem(this.studentInfoList);
      console.log(index);
      console.log(this.studentInfoList)
      this.updateToLocalList(this.studentInfoList, index);
      this.api_UpdateStudentInfo(this.studentInfoList.name, this.studentInfoList.password, this.studentInfoList.studentNumber);
      //  studentList index update
      this.$message({
        message: "Update Success",
        type: "success",
      });
      //clear studentInfoList
      this.clearTempInfo();

      this.dialogVisible = false;
    },
    deleteStudent (value) {

      this.$confirm('This option will delete this student all of data', 'Tip', {
        type: 'warning',
      }).then(() => {
        let index = 0;
        for (let i = 0; i < this.studentList.length; i++) {
          if (this.studentList[i].studentNumber == value.studentNumber) {
            index = i;
            break;
          }
        }
        this.studentList.splice(index, 1);
        this.api_DeleteStudent(value.studentNumber);
      }).catch(() => {
        this.$message({
          message: 'Delete Cancelled',
          type: 'info',
        });
      })
      console.log(value)
    }
  },
  filters: {
    permissionFilter (value) {
      if (value == 1) {
        return "Admin";
      } else if (value == 2) {
        return "Student";
      } else if (value == 3) {
        return "Student";
      }
    }
  }
}
</script>
<style scoped>
#studentList {
}
.el-table {
  margin-top: 20px;
}
</style>