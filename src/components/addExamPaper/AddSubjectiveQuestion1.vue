
<template>
  <div id="addExampaperBox">
    <div id="addChoose">
      <el-row id="selectQuestionTypeBox"
              type="flex"
              justify="center"
              align="middle">
        <el-col :span="2">
          <p id="descriptText">
            题号 :
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
          <el-form-item :label="'题目内容'"
                        prop="desc"
                        id="questionMainContent">
            <el-input type="textarea"
                      :autosize="{ minRows: 5, maxRows: 10}"
                      v-model="questionMainContentform.questionMainContent"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="questionContentform"
                 label-position="right"
                 label-width="200px"
                 id="questionContent">

          <el-form-item v-for="(domain, index) in questionContentform.questions"
                        :key="domain.key"
                        :prop="'questions.' + index + '.value'">
            <el-row type="flex"
                    justify="center"
                    align="middle">
              <el-col :span="3">{{index|indexFilter}}</el-col>
              <el-col :span="15">
                <el-input v-model="domain.value"
                          type="textarea"
                          :autosize="{minRows:1,maxRows:5}"></el-input>
              </el-col>
              <el-col :span="2"
                      id="trueOption">
                <el-select v-model="domain.trueOption"
                           placeholder="">
                  <el-option v-for="item in trueWord"
                             :key="item"
                             :label="item"
                             :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="
                          2">
                <el-button type="danger"
                           plain
                           @click.prevent="removeDomain(domain)">删除</el-button>
              </el-col>

            </el-row>

          </el-form-item>
          <el-form-item id="buttonArea">
            <el-button type="primary"
                       @click="submitForm">提交</el-button>
            <el-button @click="addOption">添加</el-button>
          </el-form-item>
        </el-form>
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
    questionType: '1',
    trueWord: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    questionMainContentform: { questionMainContent: '', },

    questionContentform: {
      questions: [
        {
          value: '',
          trueOption: '',
        }
        , {
          value: '',
          trueOption: '',
        }
        , {
          value: '', trueOption: '',
        }
        , {
          value: '', trueOption: '',
        }
      ],
    },


  }),
  beforeCreate () {
    that = this;
  },
  components: {

  },
  methods: {
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
    showSuccessMessage () {
      this.$message({
        message: 'Add Success',
        type: 'success'
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
    checkAllow () {
      let setLength = this.questionContentform.questions.length;
      let currentTrueOtionsLength = 0;
      let currentOptionsLength = 0;
      for (let i = 0; i < setLength; i++) {
        if (this.questionContentform.questions[i].trueOption != "") {
          currentTrueOtionsLength++;
        }
        if (this.questionContentform.questions[i].value != "") {
          currentOptionsLength++;
        }
      }
      console.log(currentTrueOtionsLength);
      console.log(currentOptionsLength);
      if (currentTrueOtionsLength == setLength
        && currentOptionsLength == setLength) {
        return true;
      } else {
        return false
      }
    },
    submitForm () {
      if (!this.checkAllow()) {
        console.log(1);
        return false;

      }
      let resArray = new Array();
      resArray.push(this.questionNumber);
      resArray.push(this.questionMainContentform.questionMainContent);
      resArray.push(this.questionContentform.questions);
      let options = new Array();
      let trueOptions = new Array();
      for (let i = 0; i < resArray[2].length; i++) {
        options.push(resArray[2][i].value)
        trueOptions.push(resArray[2][i].trueOption);
      }
      let tempContent = resArray[1].split('\n').join('*');
      console.log(resArray[0]);

      this.insertQuestion(this.paperInfo.epId, resArray[0], tempContent, options.join("*"), trueOptions.toString(), this.questionType);
    },
    // index to word 

  },
  filters: {
    indexFilter (value) {
      // number to word
      //var index = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      return value + that.questionNumber + '.';
    },
  },
}
</script>
<style scoped>
#addExampaperBox {
  height: 72vh;
}
#addChoose {
  width: 95%;

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
</style>
