<!--
 * @Author: AmeroL
 * @Date: 2022-05-09 17:57:52
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-09 21:37:59
 * @FilePath: \vue-frontend\src\components\addExamPaper\comAddReadingChoose.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="AddReadingChoose">
    <div class="SelectQuestionNumberBox">Number</div>
    <div class="ReadingQuestionArea"
         v-for="(passageItem,passageIndex) in ReadingPassageList"
         :key="passageIndex">
      <div class="InputPassageBox">Passage:
        <p class="PassageText"
           v-for="(passageTextItem,passageTextIndex) in passageItem.passageContent"
           :key="passageTextIndex">1{{passageTextItem}}</p>
      </div>
      <div class="QuestionArea"
           v-for="(questionItem,questionIndex) in passageItem.questions"
           :key="questionIndex">
        <div class="QuestionContent">
          <!-- <p class="QuestionNumber">{{questionItem.questionContent}}</p> -->
          <p class="questionContentNumber">{{questionIndex| questionNumberFilter(passageIndex)}} </p>
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
                         placeholder="">
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
                <p class="QuestionOptionNo">{{questionSelectIndex}}.</p>
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
        <el-button type="danger"
                   plain
                   round>Delete</el-button>
      </div>
    </div>
    <div class="ReadingPassageButtonArea">
      <el-button type="success"
                 round>Add Passage</el-button>
      <el-button type="danger"
                 plain
                 round>Delete</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddReadingChoose',
  data: () => ({
    questionNumber: '',
    optionWord: ['A', 'B', 'C', 'D'],
    ReadingPassageList: [
      {
        passageContent: ['1', '2'],
        questions: [
          {
            questionContent: "What's your name",
            questionNumber: '1',
            questionSelect: ['a', 'b', 'c', 'd'],
            questionAns: ''
          },
          {
            questionContent: '',
            questionNumber: '',
            questionSelect: ['a', 'b', 'c', 'd'],
            questionAns: ''
          },
        ]
      },
      {
        passageContent: ['2', '3'],
        questions: [
          {
            questionContent: '',
            questionNumber: '',
            questionSelect: ['a', 'b', 'c', 'd'],
            questionAns: ''
          },
          {
            questionContent: '',
            questionNumber: '',
            questionSelect: ['a', 'b', 'c', 'd'],
            questionAns: ''
          },
        ]
      }
    ]
  }),
  methods: {
    AddQuestion (index) {
      let passageListObj = new Object();
      passageListObj.questionContent = "",
        passageListObj.questionNumber = '',
        passageListObj.questionSelect = ['a', 'b', 'c', 'd'],
        passageListObj.questionAns = '';
      this.ReadingPassageList[index].questions.push(passageListObj);
    },
    DeleteQuestionItem (passageIndex, QuestionIndex) {
      this.ReadingPassageList[passageIndex].questions.splice(QuestionIndex, 1);
    }
  },
  filters: {
    questionNumberFilter (value, passageIndex) {
      let questioNumber = 0;
      console.log(passageIndex);
      questioNumber = value + 1;
      return questioNumber
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
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  background-color: lightblue;
}
.ReadingQuestionArea {
  width: 90%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
.InputPassageBox {
  width: 95%;
  height: 200px;
  background-color: lightcyan;
  margin-left: auto;
  margin-right: auto;
}
.QuestionArea {
  width: 87%;
  height: 100%;
  margin-top: 10px;
  background-color: lightpink;
  margin-left: auto;
  margin-right: auto;
}
.QuestionContent {
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 20px;
  background-color: lightseagreen;
  margin-left: auto;
  margin-right: auto;
}
.questionContentNumber {
  display: inline;
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
  text-align: center;
  background-color: lightyellow;
}

.ReadingPassageButtonArea {
  display: none;
  margin-top: 10px;
}
.questionSelectItem {
  height: 40px;
  width: 80%;
  margin-top: 9px;
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