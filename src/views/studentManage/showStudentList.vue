<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:13:58
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 14:51:19
 * @FilePath: /vue-frontend/src/views/studentManage/showStudentList.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="studentList">
    <comPageTitile titleContent="学生列表"></comPageTitile>

    <el-dialog title="修改学生信息"
               :visible.sync="dialogVisible">
      <div id="scoreInputBox">
        <el-form label-position="right"
                 label-width="150px"
                 v-model="studentInfoList">
          <el-form-item label="用户名:">
            <el-input v-model="studentInfoList.name"
                      :placeholder="namePlace"></el-input>
          </el-form-item>
          <el-form-item label="考生号:">
            <el-input v-model="studentInfoList.studentNumber"
                      :placeholder="studentNumberPlace"
                      disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="Permission:">
            <el-input v-model="studentInfoList.permission"
                      :placeholder="permissionPlace"></el-input>
          </el-form-item> -->
          <el-form-item label="密码:">
            <el-input v-model="studentInfoList.password"
                      :placeholder="passwordPlace"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="submitUpdate">确认</el-button>
      </div>
    </el-dialog>

    <el-table :data="studentList"
              :border="true">
      <el-table-column label="用户名"
                       prop="name"></el-table-column>
      <el-table-column label="考生号"
                       prop="studentNumber"></el-table-column>
      <el-table-column label="角色"
                       prop="permission">
        <template slot-scope="scope">
          {{scope.row.permission| permissionFilter}}
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="260">
        <template slot-scope="scope">
          <el-button @click="showStudentInfo(scope.row)"
                     type="primary"
                     size="mini">成绩</el-button>
          <el-button type="success"
                     @click="editStudentInfo(scope.row)"
                     size="mini">编辑</el-button>
          <el-button type="danger"
                     plain
                     @click="deleteStudent(scope.row)"
                     size="mini">删除</el-button>
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

      this.$confirm('是否删除该学生的信息？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
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
        return "管理员";
      } else if (value == 2) {
        return "学生";
      } else if (value == 3) {
        return "学生";
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