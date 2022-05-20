<!--
 * @Author: AmeroL
 * @Date: 2022-05-09 17:57:52
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-18 16:38:02
 * @FilePath: /vue-frontend/src/components/addExamPaper/comAddReadingChoose.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="AddReadingChoose">
    <div class="SelectQuestionNumberBox">

      <el-row id="selectQuestionTypeBox"
              type="flex"
              justify="center"
              align="middle">
        <el-col :span="5">
          <p id="descriptText">
            Please Select Number :
          </p>
        </el-col>
        <el-col :span="5">
          <el-input-number v-model="questionNumber"
                           :min="1"
                           :max="55"
                           size="large"></el-input-number>
        </el-col>

      </el-row>
    </div>
    <div class="ReadingQuestionArea"
         v-for="(passageItem,passageIndex) in ReadingPassageList"
         :key="passageIndex">
      <div class="InputPassageBox">

        <el-input :autosize="{minRows:4,maxRows:8}"
                  type="textarea"
                  v-model="passageItem.passageContent"
                  placeholder=""></el-input>

        <el-button type="danger"
                   plain
                   @click="DeletePassage(passageIndex)"
                   round> Delete this passage</el-button>

      </div>
      <div class="QuestionArea"
           v-for="(questionItem,questionIndex) in passageItem.questions"
           :key="questionIndex">
        <div class="QuestionContent">
          <!-- <p class="QuestionNumber">{{questionItem.questionContent}}</p> -->
          <p class="questionContentNumber">{{questionIndex| questionNumberFilter(passageIndex)}}.</p>
          <el-input type="textarea"
                    :autosize="{minRows: 1,maxRows: 2}"
                    v-model="questionItem.questionContent"></el-input>
        </div>
        <div class="questionItemOptionArea">
          <el-row type="flex"
                  justify="center"
                  align="middle">
            <el-col :span="10">
              <el-select v-model="questionItem.questionAns"
                         placeholder="TrueOption">
                <el-option v-for="(optionWordItem,optionWordIndex) in optionWord"
                           :key="optionWordIndex"
                           :label="optionWordItem"
                           :value="optionWordItem"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">

              <el-button type="danger"
                         @click="DeleteQuestionItem(passageIndex,questionIndex)"
                         plain
                         round>Delete Question</el-button>
            </el-col>
          </el-row>

        </div>
        <div class="QuestionSelect">
          <el-row type="flex"
                  justify="center"
                  align="middle"
                  style="flex-wrap:wrap">
            <div class="questionSelectItem"
                 v-for="(questionSelectItem,questionSelectIndex) in questionItem.questionSelect"
                 :data-length-n="4"
                 :key="questionSelectIndex">
              <el-col :span="2">
                <p class="QuestionOptionNo">{{questionSelectIndex|questionSelectIndexFilter}}.</p>
              </el-col>
              <el-col :span="20">
                <div class="questionOptionSingle">
                  <!-- {{questionSelectItem}} -->
                  <el-input v-model=" questionItem.questionSelect[questionSelectIndex]"
                            placeholder=""></el-input>
                </div>

              </el-col>
            </div>
          </el-row>
        </div>
      </div>
      <div class="QuestonButtonArea">
        <el-button type="success"
                   @click="AddQuestion(passageIndex)"
                   round>Add Question</el-button>
        <el-divider></el-divider>
      </div>
    </div>
    <div class="ReadingPassageButtonArea">
      <el-button type="primary"
                 plain
                 @click="AddPassage">Add Passage</el-button>
      <el-button type="success"
                 plain
                 @click="SubmitReadingQuestion">Submit</el-button>
    </div>
  </div>
</template>
<script>
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
let that;
import GLOBAL from "../../../public/publicJavaScript/global.js"
export default {
  props: ["paperInfo"],
  name: 'AddReadingChoose',
  data: () => ({
    questionNumber: '0',
    optionWord: ['A', 'B', 'C', 'D'],
    ReadingPassageList: [
      {
        passageContent: '',
        questions: [
          {
            questionContent: "",
            questionNumber: '',
            questionSelect: ['', '', '', ''],
            questionAns: ''
          },
          {
            questionContent: '',
            questionNumber: '',
            questionSelect: ['', '', '', ''],
            questionAns: ''
          },
        ]
      },
    ]
  }),
  created: function () {
    that = this;
  },
  methods: {
    AddQuestion (index) {
      let passageListObj = new Object();
      passageListObj.questionContent = "",
        passageListObj.questionNumber = '',
        passageListObj.questionSelect = ['', '', '', ''],
        passageListObj.questionAns = '';
      this.ReadingPassageList[index].questions.push(passageListObj);
    },
    DeleteQuestionItem (passageIndex, QuestionIndex) {
      this.ReadingPassageList[passageIndex].questions.splice(QuestionIndex, 1);
    },
    AddPassage () {
      let passageObj = new Object();
      passageObj.passageContent = "",
        passageObj.questions = [{
          questionContent: "",
          questionNumber: '',
          questionSelect: ['', '', '', ''],
          questionAns: ''
        },];
      this.ReadingPassageList.push(passageObj);
    },
    DeletePassage (index) {
      this.ReadingPassageList.splice(index, 1);
    },
    insertPassage (_epId, _rdPassageNo, _rdPassage) {
      Axios.post(APIURL + 'deletereadpassage', {
        epId: _epId,
        rdPassageNo: _rdPassageNo,
      }).then(res => {
        console.log(res)
        that.api_insertReadpassage(_epId, _rdPassageNo, _rdPassage);
      }).catch(err => {
        console.log(err);
      })

    },
    insertQuestion (_epId, _rdPassageNo, _rdNumber, _rdContent, _rdOptionA, _rdOptionB, _rdOptionC, _rdOptionD, _rdTrue) {
      //console.log(_rdNumber, _rdContent, _rdOptionA, _rdOptionB, _rdOptionC, _rdOptionD, _rdTrue);
      Axios.post(APIURL + 'deleteReadquestion', {
        epId: _epId,
        rdPassageNo: _rdPassageNo,
      }).then(res => {
        console.log(res)
        that.api_insertReadquestion(_epId, _rdPassageNo, _rdNumber, _rdContent, _rdOptionA, _rdOptionB, _rdOptionC, _rdOptionD, _rdTrue);
      }).catch(err => {
        console.log(err);
      })
    },
    testfun () {
      console.log("321321321")
    },
    showSuccessMessage () {
      this.$message({
        message: 'Add Success',
        type: 'success'
      })
    },
    api_insertReadQuestion (_epId, _rdPassageNo, _rdNumber, _rdContent, _rdOptionA, _rdOptionB, _rdOptionC, _rdOptionD, _rdTrue) {
      Axios.post(APIURL + "insertReadquestion", {
        epId: _epId,
        rdPassageNo: _rdPassageNo,
        rdNumber: _rdNumber,
        rdContent: _rdContent,
        rdOptionA: _rdOptionA,
        rdOptionB: _rdOptionB,
        rdOptionC: _rdOptionC,
        rdOptionD: _rdOptionD,
        rdTrue: _rdTrue
      }).then(function (response) {
        console.log(response);
        that.showSuccessMessage();
        // this.$message({
        //   message: 'Add Reading Question Success',
        //   type: 'success'
        // });
      }).catch(function (error) {
        console.log(error);
      })
    },
    api_insertReadpassage (_epId, _rdPassageNo, _rdPassage) {
      Axios.post(APIURL + "insertReadpassage", {
        epId: _epId,
        rdPassageNo: _rdPassageNo,
        rdPassage: _rdPassage
      }).then(function (response) {
        that.showSuccessMessage();
        console.log(response);

      }).catch(function (error) {
        console.log(error);
      });

    },
    SubmitReadingQuestion () {
      let readQuestionLength = this.ReadingPassageList.length;
      let ReadQuestionArray = new Array();
      for (let i = 0; i < readQuestionLength; i++) {
        let questionLength = this.ReadingPassageList[i].questions.length;
        let tempObj = new Array();
        let tempQuestionArray = new Array();
        let tempQuestionAns = new Array();
        tempObj.passageContent = GLOBAL.stringToArrayWithWrap(this.ReadingPassageList[i].passageContent);
        for (let j = 0; j < questionLength; j++) {
          let questionObj = new Object();
          questionObj = this.ReadingPassageList[i].questions[j];
          tempQuestionArray.push(questionObj);
        }
        tempObj.questions = tempQuestionArray;
        for (let j = 0; j < questionLength; j++) {
          tempQuestionAns.push(this.ReadingPassageList[i].questions[j].questionAns);
        }
        tempObj.questionAns = tempQuestionAns;
        ReadQuestionArray.push(tempObj);
      }
      //console.log(this.ObjectToString(ReadQuestionArray[0].passageContent));
      for (let i = 0; i < ReadQuestionArray.length; i++) {
        this.insertPassage(this.paperInfo.epId, i + 1, this.ObjectToString(ReadQuestionArray[i].passageContent));
        for (let j = 0; j < ReadQuestionArray[i].questions.length; j++) {
          this.api_insertReadQuestion(this.paperInfo.epId, i + 1, j + 1, ReadQuestionArray[i].questions[j].questionContent, ReadQuestionArray[i].questions[j].questionSelect[0], ReadQuestionArray[i].questions[j].questionSelect[1], ReadQuestionArray[i].questions[j].questionSelect[2], ReadQuestionArray[i].questions[j].questionSelect[3], ReadQuestionArray[i].questionAns[j]);
        }
      }
      console.log(ReadQuestionArray);
    },
    ObjectToString (_objArray) {
      let str = "";
      for (let i = 0; i < _objArray.length; i++) {
        str += _objArray[i].value.toString() + "*";
      }
      return str;

    }
  },
  filters: {
    questionNumberFilter (value, passageIndex) {
      let questioNumber = 0;
      let numberBefore = 0;
      let index = passageIndex;
      while (index > 0) {
        index--;
        numberBefore += that.ReadingPassageList[index].questions.length;
      }
      questioNumber = value + numberBefore + Number(that.questionNumber);
      return questioNumber
    },
    questionSelectIndexFilter (value) {
      let wordList = ['A', 'B', 'C', 'D'];
      return wordList[value]
    }
  }
}
</script>
<style scoped>
#AddReadingChoose {
  height: 72vh;
}
.SelectQuestionNumberBox {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  background-color: white;
}
.ReadingQuestionArea {
  width: 90%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
.InputPassageBox {
  width: 95%;
  height: 100%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
.InputPassageBox >>> .el-textarea__inner {
  width: 100%;
  font-size: 18px;
  line-height: 30px;
  margin-left: auto;
  margin-right: auto;
}
.InputPassageBox >>> .el-button {
  margin-top: 5px;
}
.QuestionArea {
  width: 87%;
  height: 100%;
  margin-top: 10px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
.QuestionContent {
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 20px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
.questionContentNumber {
  display: inline-block;
  height: 30px;
  font-size: 17px;
  vertical-align: top;
  padding-top: 8px;
  padding-left: 20px;
  padding-right: 13px;
}
.QuestionContent >>> .el-textarea {
  width: 90%;
}
.QuestionContent >>> .el-textarea__inner {
  width: 100%;
  font-size: 17px;
  height: 30px;
  line-height: 30px;
}

.questionItemOptionArea {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  background-color: white;
}
.QuestonButtonArea {
  width: 100%;
  margin-top: 10px;
}
.QuestonButtonArea >>> .el-divider {
  width: 100%;
  margin-top: 10px;
}
.ReadingPassageButtonArea {
  /* display: none; */
  margin-top: 10px;
}
.questionSelectItem {
  height: 40px;
  width: 80%;
  margin-top: 9px;
  margin-left: auto;
  margin-right: auto;
}
.QuestionSelect {
}
.QuestionOptionNo {
  line-height: 40px;
  text-align: right;
  padding-right: 13px;
  width: 100%;
}
.questionOptionSingle {
  width: 100%;
}
.questionOptionSingle >>> .el-input {
  font-size: 17px;
}
</style>