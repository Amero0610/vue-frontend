<!--
 * @Author: Amero
 * @Date: 2022-02-10 19:06:55
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 14:39:34
 * @FilePath: /vue-frontend/src/views/studentManage/addStudent.vue
-->
<template>
  <div id="userinfoBox">
    <comPageTitile titleContent="添加学生"></comPageTitile>
    <el-result icon="success"
               title="Success"
               subTitle="添加成功!"
               v-show="showResult">
      <template slot="extra">
        <el-button type="primary"
                   @click="ResultBack"
                   size="medium">返回</el-button>
      </template>
    </el-result>

    <div v-show="!showResult"
         class="userInfoMainbox">
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>用户名:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-input class="myinputbox"
                      v-model="userInfoList.name"
                      placeholder=""></el-input>
          </el-col>
        </el-row>
      </div>

      <!-- <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>permission:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-select class="myinputbox"
                       v-model="userInfoList.permission"
                       placeholder="Please select sex">
              <el-option label="no pass CET-4"
                         value="0"> </el-option>
              <el-option label="have passed CET-4 ,no pass CET-6"
                         value="1"> </el-option>
              <el-option label="have passed CET-6"
                         value="2"> </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div> -->
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>考生号:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-input class="myinputbox"
                      v-model="userInfoList.studentNumber"
                      placeholder="请输入学生的考生号"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>密码:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-input class="myinputbox"
                      v-model="userInfoList.password"
                      placeholder="请输入密码"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="optionBox">

        <el-button class="subBtn"
                   type="primary"
                   :disabled="isSubmit"
                   @click="submitClick">提交</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
#userinfoBox {
}
.inputBox {
  margin-left: 20px;
}
.subBtn {
  width: 120px;
}
.optionBox .myinputbox {
  width: 100%;
}
.optionBox {
  text-align: center;
  margin-top: 30px;
}
.optionBox p {
  text-align: left;
}
</style>
<script>
import Axios from 'axios';

//const APIURL = "http://localhost:8000/api/examination/";
const APIURL = "http://123.57.7.40:5067/api/examination/";
//let axios = require('axios');
import comPageTitile from "../../components/publicComponents/comPageTitile.vue";
export default {
  components: {
    comPageTitile
  },
  data: () => ({
    showResult: false,
    isSubmit: true,
    userInfoList: {
      name: "",
      studentNumber: "",
      password: "",
    },
  }),
  methods: {
    submitClick: function () {
      console.log(this.userInfoList);
      this.api_AddStudent(this.userInfoList.name, this.userInfoList.studentNumber, this.userInfoList.password);
      // submit data to server
      this.$message({
        message: this.userInfoList.name + " 已经添加成功",
        type: "success",
      });
      this.showResult = true;
      // clear unserInfoList 
      this.userInfoList = {
        name: "",
        studentNumber: "",
        password: "",
      };

    },
    api_AddStudent (_stuName, _stuNumber, _stuPassword) {
      Axios.post(APIURL + 'insertStudent', {
        stuName: _stuName,
        stuNumber: Number(_stuNumber),
        stuPassword: _stuPassword
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })
    },
    judgeIsDisable: function (dataList) {
      let jIndex = 0;
      let valueArray = Object.values(dataList);
      valueArray.forEach(function (item) {
        if (item != "") {
          jIndex++;
        }
      });
      jIndex == Object.keys(dataList).length
        ? (this.isSubmit = false)
        : (this.isSubmit = true);
    },
    ResultBack: function () {
      this.showResult = false;
    },
  },
  watch: {
    userInfoList: {
      handler: function (newVal) {
        this.judgeIsDisable(newVal);
      },
      deep: true,
    },
  },
};
</script>
