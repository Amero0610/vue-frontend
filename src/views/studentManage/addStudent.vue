<!--
 * @Author: Amero
 * @Date: 2022-02-10 19:06:55
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-19 17:08:44
 * @FilePath: /vue-frontend/src/views/studentManage/addStudent.vue
-->
<template>
  <div id="userinfoBox">
    <p>Add Student Page</p>
    <div class="userInfoMainbox">
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3">
            <p>User Name:</p>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="6">
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
          <el-col :span="6">
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
          <el-col :span="6">
            <el-input class="myinputbox"
                      v-model="userInfoList.password"
                      placeholder="Please input your password"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="optionBox">
        <el-row type="flex"
                justify="center"
                align="middle">
          <el-col :span="3"></el-col>
          <el-col :span="9">
            <el-button class="subBtn"
                       type="primary"
                       :disabled="isSubmit"
                       @click="submitClick">Submit</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style scoped>
.optionBox .myinputbox {
  width: 100%;
}
.optionBox {
  margin-top: 20px;
}
.optionBox p {
  text-align: left;
}
</style>
<script>
export default {
  data: () => ({
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
