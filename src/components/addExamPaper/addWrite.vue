<!--
 * @Author: AmeroL
 * @Date: 2022-05-04 01:47:23
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-04 02:11:29
 * @FilePath: /vue-frontend/src/components/addExamPaper/addWrite.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="addWriteBox">
    <div id="questionType">
      <el-row type="flex"
              justify="center"
              align="middle">
        <el-col :span="5">
          <p id="descriptText">
            Please Select Type :
          </p>
        </el-col>
        <el-col :span="5">
          <el-select v-model="questionType"
                     @change="handleSelectChooseQuestion">
            <el-option label="WriteQuestion"
                       value="1"></el-option>
            <el-option label="TranslateQuestion"
                       value="2"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div id="QuestionContent">
      <div style="margin: 20px 0;"></div>
      <el-input v-model="questionContent"
                :autosize={maxRows:5}
                type="textarea"></el-input>
      <el-row type="flex"
              justify="center"
              align="middle">
        <el-col :span="10">
          <el-button type="primary"
                     @click="submitQuestion"> Submit</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddWrite",
  data: () => ({
    questionType: '1',
    questionContent: '',
  }),
  methods: {
    handleSelectChooseQuestion () {

    },
    submitQuestion () {
      let question = new Array();
      question.push(this.questionType);
      question.push(this.questionContent);
      console.log(question);
    }
  }
}
</script>
<style scoped>
#questionType {
}
#addWriteBox >>> .el-row {
  height: 50px;
}
#descriptText {
  text-align: right;
  margin-right: 10px;
  line-height: 50px;
}

#QuestionContent >>> .el-row {
  margin-top: 20px;
}
#QuestionContent >>> .el-input {
}
#QuestionContent >>> .el-textarea__inner {
  line-height: 40px;
  margin-left: auto;
  margin-right: auto;
  font-size: 17px;
  width: 80%;
}
</style>