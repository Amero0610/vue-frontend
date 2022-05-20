<!--
 * @Author: AmeroL
 * @Date: 2022-05-04 02:47:07
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-18 16:38:35
 * @FilePath: /vue-frontend/src/components/addExamPaper/AddSubjectiveQuestion2.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="addExampaperBox">
    <div id="addChoose">
      <el-row id="selectQuestionTypeBox"
              type="flex"
              justify="center"
              align="middle">
        <el-col :span="7">
          <p id="descriptText">
            Please First Question Number :
          </p>
        </el-col>
        <el-col :span="5">
          <el-input-number v-model="questionNumber"
                           @change="handleChooseNumber"
                           :min="1"
                           :max="55"
                           size="large"></el-input-number>
        </el-col>

      </el-row>
      <div id="questionAddBox">

        <el-form label-position="top"
                 label-width="100px"
                 :model="questionMainContentform">
          <el-form-item :label="'QuestionContent'"
                        prop="desc"
                        id="questionMainContent">
            <el-input type="textarea"
                      :autosize="{minRows: 5, maxRows: 9}"
                      v-model="questionMainContentform.questionMainContent"></el-input>
          </el-form-item>
        </el-form>

        <!-- <el-row type="flex"
                align="middle"
                style="flex-wrap:wrap">
          <el-col :span="8"
                  v-for="(item,index) in questionContentform.questionOptionWord"
                  :key="index">
            <p class="questionOptionWordTitle">{{index}}</p>
            <el-input :value="item"
                      placeholder=""></el-input>
          </el-col>
        </el-row> -->

        <el-form :model="questionContentform"
                 id="AddQuestionWordBox">
          <el-row type="flex"
                  align="middle"
                  justify="center"
                  style="flex-wrap:wrap">
            <el-form-item v-for="(item,index) in questionContentform.questionOptionWord"
                          :key="index">
              <el-col :span="2"
                      class="questionWordTitle">{{index|indexFilter}}</el-col>
              <el-col :span="6">
                <el-input placeholder=""
                          class="questionWordContent"
                          v-model="questionContentform.questionOptionWord[index]"></el-input>
              </el-col>

            </el-form-item>
          </el-row>
          <div id="questionTrueOptionRowBox">

            <el-row type="flex"
                    align="middle"
                    justify="start"
                    style="flex-wrap:wrap">
              <el-form-item v-for="(item,index) in questionContentform.questionTrueOption"
                            :key="index">
                <el-col :span="2"
                        class="trueOptionTitle">
                  {{index |indexTrueOptionFilter}}.
                </el-col>
                <el-col :span="5">
                  <el-select v-model="questionContentform.questionTrueOption[index]"
                             placeholder="">
                    <el-option v-for="item in trueOption"
                               :key="item"
                               :label="item"
                               :value="item"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

          </div>
        </el-form>
        <div id="ButtonArea">
          <el-button type="primary"
                     @click="submitForm">Submit</el-button>
          <el-button @click="addOption">Add</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
let that;
export default {
  props: ["paperInfo"],
  data: () => ({
    questionNumber: '',
    questionType: '2',
    trueOption: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
    questionMainContentform: { questionMainContent: '', },

    questionContentform: {
      questionOptionWord: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      //   questionOptionWord: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
      questionTrueOption: ['', '', '', '', '', '', '', '', '', ''],
    },


  }),
  beforeCreate () {
    that = this;
  },
  components: {

  },
  methods: {
    showSuccessMessage () {
      this.$message({
        message: 'Add Success',
        type: 'success'
      })
    },
    insertQuestion (_epId, _schoNumber, _schoContent, _schoOption, _schoTrue, _schoType) {
      Axios.post(APIURL + 'deleteSpecialchoise', {
        epId: _epId,
        schoNumber: _schoNumber
      }).then(function (response) {
        console.log(response);
        that.API_insertQuestion(_epId, _schoNumber, _schoContent, _schoOption, _schoTrue, _schoType);
      }).catch(function (error) {
        console.log(error);
      })
    },
    API_insertQuestion (_epId, _schoNumber, _schoContent, _schoOption, _schoTrue, _schoType) {
      Axios.post(APIURL + 'insertSpecialChoise', {
        epId: _epId,
        schoNumber: _schoNumber,
        schoContent: _schoContent,
        schoOption: _schoOption,
        schoTrue: _schoTrue,
        schoType: _schoType
      }).then(function (response) {
        console.log(response);
        console.log(response);
        that.showSuccessMessage();
      }).catch(function (error) {
        console.log(error);
      });
    },
    handleChooseNumber () {
      console.log(this.questionNumber);
    },
    handleSelectChooseQuestion () {
      console.log(this.questionType);
    },
    removeDomain (item) {
      var index = this.questionContentform.questions.indexOf(item)
      if (index !== -1) {
        this.questionContentform.questions.splice(index, 1)
      }
    },
    addOption () {
      this.questionContentform.questions.push({
        value: '',

      });
    },
    submitForm () {
      let resArray = new Array();
      resArray.push(this.questionNumber);
      resArray.push(this.questionMainContentform.questionMainContent.split('\n').join('*'));
      resArray.push(this.questionContentform.questionOptionWord.toString());
      resArray.push(this.questionContentform.questionTrueOption.toString());
      console.log(resArray);
      this.insertQuestion(this.paperInfo.epId, this.questionNumber, this.questionMainContentform.questionMainContent.split('\n').join('*'), this.questionContentform.questionOptionWord, this.questionContentform.questionTrueOption.toString(), this.questionType);
    },
    // index to word 

  },
  filters: {
    indexFilter (value) {
      // number to word
      var index = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      return index[value] + '.';
    },
    indexTrueOptionFilter (value) {
      return value + that.questionNumber;
    }
  },
  mounted () {
  },
}
</script>
<style scoped>
#addExampaperBox {
  height: 72vh;
}
#addChoose {
  width: 95%;

  /* height: 100%; */
  /* background-color: pink; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
#addChoose #selectQuestionTypeBox >>> .el-row {
  height: 50px;
}
#descriptText {
  text-align: right;
  margin-right: 10px;
  line-height: 50px;
}
.el-input-number {
  border-radius: 30px;
}

#questionAddBox {
  width: 100%;
  height: 400px;
  /* background-color: rgb(188, 188, 213); */
  margin-top: 20px;
}
#questionAddBox >>> .el-button {
  margin-left: 10px;
}
#questionMainContent {
  width: 80%;
}

#questionMainContent >>> .el-textarea__inner {
  line-height: 32px;
}

#questionContent >>> .el-form-item {
  width: 800px;
  margin-right: 200px;
}
#questionContent .el-form-item >>> .el-textarea__inner {
  line-height: 37.2px;
}
#questionContent >>> #buttonArea {
  text-align: center;
}
#questionContent #buttonArea >>> .el-button {
}
#trueOption {
  margin-left: 20px;
  width: 100px;
}
#questionTrueOptionRowBox {
  margin-left: 50px;
}
#AddQuestionWordBox {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
#AddQuestionWordBox >>> .el-select {
  width: 140px;
}
.trueOptionTitle {
  width: 20px;
  padding-right: 5px;
  margin-left: 20px;
}
.questionWordTitle {
  margin-left: 20px;
  text-align: right;
  padding-right: 10px;
  width: 20px;
}
.questionWordContent {
  width: 220px;
}
#ButtonArea {
  padding-bottom: 20px;
  /* height: 100%; */
}
</style>
