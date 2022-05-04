<!--
 * @Author: Amero
 * @Date: 2022-02-10 19:06:55
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-29 01:43:28
 * @FilePath: /vue-frontend/src/views/studentManage/addStudent.vue
-->
<template>
  <div id="userinfoBox">
    <comPageTitile titleContent="Add Student"></comPageTitile>
    <el-result icon="success"
               title="Success"
               subTitle="Add new student successfully!"
               v-show="showResult">
      <template slot="extra">
        <el-button type="primary"
                   @click="ResultBack"
                   size="medium">Back</el-button>
      </template>
    </el-result>

    <div v-show="!showResult"
         class="userInfoMainbox">
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>User Name:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-input class="myinputbox"
                      v-model="userInfoList.name"
                      placeholder=""></el-input>
          </el-col>
        </el-row>
      </div>

      <div class="optionBox">
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
      </div>
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>StudentNumber:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-input class="myinputbox"
                      v-model="userInfoList.studentNumber"
                      placeholder="Please input Student Number"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>password:</p>
          </el-col>
          <el-col :span="9"
                  class="inputBox">
            <el-input class="myinputbox"
                      v-model="userInfoList.password"
                      placeholder="Please input your password"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="optionBox">

        <el-button class="subBtn"
                   type="primary"
                   :disabled="isSubmit"
                   @click="submitClick">Submit</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
  margin-top: 30px;
}
.optionBox p {
  text-align: left;
}
</style>
<script>
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
      permission: "",
      studentNumber: "",
      password: "",
    },
  }),
  methods: {
    submitClick: function () {
      // submit data to server
      this.$message({
        message: this.userInfoList.name + " has been added",
        type: "success",
      });
      this.showResult = true;
      // clear unserInfoList 
      this.userInfoList = {
        name: "",
        permission: "",
        studentNumber: "",
        password: "",
      };
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
