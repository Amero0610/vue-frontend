<!--
 * @Author: AmeroL
 * @Date: 2022-05-04 01:26:03
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-28 02:24:32
 * @FilePath: /vue-frontend/src/components/addExamPaper/comAddListeningChoose.vue
 * @email: vian8416@163.com
-->
<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:25:32
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-04 01:23:46
 * @FilePath: /vue-frontend/src/views/paperManage/addExampaper.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="addExampaperBox">

    <div id="addChoose">
      <el-row id="selectQuestionTypeBox"
              type="flex"
              justify="center"
              align="middle">
        <el-col :span="5">
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

        <el-col :span="5">
          <p id="descriptText">
            正确选项 :
          </p>
        </el-col>
        <el-col :span="5">
          <el-select v-model="questionAns">
            <el-option v-for="(item,index) in questionContentform.questions"
                       :key="index"
                       :label="wordList[index]"
                       :value="wordList[index]"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <div id="questionAddBox">
        <div id="ListenContentArea">
          <el-form label-position="top"
                   label-width="100px"
                   :model="questionMainContentform">
            <el-form-item :label="'QuestionContent'"
                          prop="desc"
                          id="questionMainContent">
              <el-input type="textarea"
                        :autosize="{ minRows: 1, maxRows: 10}"
                        v-model="questionMainContentform.questionMainContent"></el-input>
            </el-form-item>
          </el-form>
        </div>
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
              <el-col :span="5">{{index|indexFilter}}</el-col>
              <el-col :span="15">
                <el-input v-model="domain.value"
                          type="textarea"
                          :autosize="{minRows:1,maxRows:5}"></el-input>
              </el-col>
              <!-- <el-col :span="
                          4">
                <el-button type="danger"
                           plain
                           @click.prevent="removeDomain(domain)">Delete</el-button>
              </el-col> -->
            </el-row>

          </el-form-item>
          <el-form-item id="buttonArea">
            <el-button type="primary"
                       @click="submitForm">提交</el-button>
            <!-- <el-button @click="addOption">Add</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
let that;
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
export default {
  props: ["paperInfo"],
  data: () => ({
    wordList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    questionNumber: '',
    questionAns: '',
    questionMainContentform: { questionMainContent: 'no', },

    questionContentform: {
      questions: [
        {
          value: ''
        }
        , {
          value: ''
        }
        , {
          value: ''
        }
        , {
          value: ''
        }
      ],
    },


  }),
  created () {
    that = this;
  },
  components: {
  },
  methods: {
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
    api_deleteListen (_epId, _chNumber) {
      Axios.post(APIURL + "deleteChoise", {
        epId: _epId,
        chNumber: _chNumber,
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

    },
    insertQuestion (_epId, _chNumber, _chContent, _chA, _chB, _chC, _chD, _chTrue) {
      Axios.post(APIURL + "deleteChoise", {
        epId: _epId,
        chNumber: _chNumber,
      }).then(res => {
        console.log(res);
        that.api_insertListen(_epId, _chNumber, _chContent, _chA, _chB, _chC, _chD, _chTrue);
      }).catch(err => {
        console.log(err);
      })
    },
    showSuccessMessage () {
      this.$message({
        message: 'Add Success',
        type: 'success'
      })
    },
    api_insertListen (_epId, _chNumber, _chContent, _chA, _chB, _chC, _chD, _chTrue) {

      Axios.post(APIURL + 'insertChoise', {
        epId: _epId,
        chNumber: _chNumber,
        chContent: _chContent,
        chA: _chA,
        chB: _chB,
        chC: _chC,
        chD: _chD,
        chTrue: _chTrue,
      }).then(res => {
        console.log(res);
        that.showSuccessMessage();
      }).catch(err => {
        console.log(err)
      })

    },
    toLiteral (str) {
      var dict = { '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f' };
      return str.replace(/([\\'"\b\t\n\v\f])/g, function ($0, $1) {
        return '\\' + (dict[$1] || $1);
      })
    },
    submitForm () {
      let questionContentObj = new Object();
      questionContentObj.questionNumber = this.questionNumber;
      let tempArray = new Array();
      tempArray.push(this.questionContentform.questions);
      questionContentObj.questionContent = tempArray;
      questionContentObj.questionAns = this.questionAns;
      this.insertQuestion(this.paperInfo.epId, questionContentObj.questionNumber, " ", this.toLiteral(questionContentObj.questionContent[0][0].value), this.toLiteral(questionContentObj.questionContent[0][1].value), this.toLiteral(questionContentObj.questionContent[0][2].value), this.toLiteral(questionContentObj.questionContent[0][3].value), questionContentObj.questionAns);


    },
    // index to word 

  },
  filters: {
    indexFilter (value) {
      // number to word
      var index = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      return index[value] + '.';
    },
  },
}
</script>
<style scoped>
#addExampaperBox {
  height: 72vh;
}
#addChoose {
  width: 90%;
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

#ListenContentArea {
  display: none;
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
  width: 500px;
}

#questionMainContent >>> .el-textarea__inner {
  line-height: 32px;
}

#questionContent >>> .el-form-item {
  width: 700px;
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
</style>
