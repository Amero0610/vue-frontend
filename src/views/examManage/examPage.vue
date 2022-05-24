<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:53:53
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 14:33:31
 * @FilePath: /vue-frontend/src/views/examManage/examPage.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="ExamMainPageBox">
    <comHeader></comHeader>
    <el-button type="primart"
               plain
               style="display:none"
               @click="toMainpage"> toMainPage </el-button>
    <div id="ExamPageBoxStep">
      <el-steps :active="active"
                :align-center="true"
                finish-status="success">
        <el-step title="WritePart"></el-step>
        <el-step title="ListenPart"></el-step>
        <el-step title="Read&TranslatePart"></el-step>
      </el-steps>
    </div>
    <div class="timeDownArea">
      <p class="timeText">{{timeDown}}</p>
    </div>
    <!-- <el-button type="primary"
               @click="testgetReading">get</el-button> -->
    <div class="ExamPagePartBox"
         v-show="active==0">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>Writing</span>
        </div>
        <div id="WritingContent">
          Directions:
          <p v-for="(item,index) in writingContent"
             :key="index">{{item.value}} <span></span></p>
          <!-- <p>{{item}}</p> -->
        </div>

      </el-card>
      <el-divider></el-divider>

      <div id="writingInputContent">
        <el-row type="flex"
                justify="space-around"
                align="middle">
          <el-col :span="12">
            <p>Please Input Your Content:</p>
          </el-col>
          <el-col :span="12">
            <p id="wordCountBox">{{wordLength}} Word<span v-if="wordLength>1">s</span> </p>
          </el-col>
        </el-row>

        <el-input v-model="writingInputContent"
                  :show-word-limit="true"
                  ref="testinput"
                  type="textarea"
                  @input="updateLength"
                  :autosize="{minRows: 5, maxRows: 10}"
                  placeholder="Please Input Content"></el-input>

      </div>
      <div id="writingButtonBox">
        <el-button type="success"
                   :disabled="writingBoxToNext"
                   plain
                   round
                   @click="submitWritingPart">提交</el-button>
      </div>

    </div>

    <!-- part2 -->
    <div class="ExamPagePartBox"
         v-show="active==1">
      <div id="listenAudioBox">
        <aplayer :audio="audio"
                 :lrcType="0"
                 :mini="true"
                 ref="aplayer"
                 fixed />
      </div>

      <el-scrollbar style="height: 100%">
        <comExampaper :questionList="listingContent"
                      ref="comListeningPartRef"
                      @sendAns="ListenAns"></comExampaper>
      </el-scrollbar>
      <div id="listenCardBox">

        <el-row type="flex"
                justify="space-around">
          <el-col :span="11">
            <el-card class="box-card listenCard1">
              <p class="listenMainContent">this is content 1</p>
              <el-divider></el-divider>

            </el-card>
          </el-col>
          <el-col :span="11">
            <el-card class="box-card listenCard1">
              <p class="listenMainContent">this is content 1</p>
              <el-divider></el-divider>
            </el-card>
          </el-col>
        </el-row>

      </div>

    </div>
    <!-- part3 -->
    <div class="ExamPagePartBox"
         v-show="active==2">
      <el-scrollbar style="height: 100%">
        <div id="specticalQuestionBox1">
          <el-card class="specticalQuestionBox1Card">
            <p id="specticalQuestion1Title">选词填空</p>
            <p id="specticalQuestion1Info">{{specticalQuestion1Info}}</p>
            <div id="specticalQuestion1ContentArea">
              <p class="specticalQuestion1ContentText"
                 v-for="(item,index) in specticalQuestion1Content"
                 :key="index">{{item}}</p>
            </div>
            <div id="spacticalQuestion1OptionArea">
              <el-form :model="specticalQuestion1Form">

                <el-row type="flex"
                        justify="center"
                        align="middle"
                        style="flex-wrap:wrap">
                  <el-form-item v-for="(item,index) in specticalQuestion1Form.Options"
                                :key="index"
                                class="spectiocalQuestion1OptionItem">

                    <el-col :span="2">
                      <p class="specticalQuestion1OptionNumber"> {{index|indexFilter}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p class="specticalQuestion1OptionWord"> {{item}}</p>
                    </el-col>

                  </el-form-item>
                </el-row>
              </el-form>
            </div>
            <div id="specticalQuestion1AnsArea">
              <el-form :model="specticalQuestion1Form">
                <el-row type="flex"
                        justify="center"
                        align="middle"
                        style="flex-wrap:wrap">
                  <el-form-item v-for="(item,index) in specticalQuestion1Form.Ans"
                                :key="index">
                    <el-col :span="2">
                      <p class="specticalQuestion1SelectNumber">{{spec1Number+index|OptionIndexFilter}}</p>
                    </el-col>
                    <el-col :span="5">
                      <el-select v-model="specticalQuestion1Form.Ans[index]"
                                 class="specticalQuestion1Select">
                        <el-option v-for="(optionItem,OptionIndex) in specticalQuestion1Form.AnsOption"
                                   :value="optionItem"
                                   :label="optionItem"
                                   :key="OptionIndex"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </el-card>
        </div>

        <el-divider></el-divider>
        <div id="specticalQuestionBox2">
          <el-card class="specticalQuestionBox2Card">
            <p id="specticalQuestion2Title">段落匹配</p>
            <p id="specticalQuestion2Info">Information</p>
            <div id="specticalQuestion2ContentArea">
              <p class="specticalQuestion2ContentText"
                 v-for="(item,index) in specticalQuestion2Content"
                 :key="index">
                {{item}}
              </p>
            </div>
            <div id="specticalQuestion2OptionArea">
              <el-form :model="specticalQuestion2Form">
                <el-row type="flex"
                        justify="center"
                        align="middle"
                        style="flex-wrap:wrap">

                  <el-form-item v-for="(item,index) in specticalQuestion2Form.Options"
                                :key="index">
                    <el-divider></el-divider>
                    <el-col :span="1">
                      <p class="specticalQuestion2OptionNumber">{{index+spec2Number}}.</p>
                    </el-col>
                    <el-col :span="21">
                      <p class="specticalQuestion2OptionContent">{{item}}</p>
                    </el-col>
                    <el-col :span="2">
                      <div class="specticalQuestion2OptionSelect">
                        <el-select v-model="specticalQuestion2Form.Ans[index]"
                                   placeholder="">
                          <el-option v-for="(optionItem,optionIndex) in specticalQuestion2Content"
                                     :key="optionIndex"
                                     :label="optionsWord[optionIndex]"
                                     :value="optionsWord[optionIndex]"></el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-form-item>

                </el-row>
              </el-form>
            </div>
            <div id="specticalQuestion2AnsArea"></div>
          </el-card>
        </div>
        <el-divider></el-divider>
        <div id="readingQuestionBox">
          <p class="readingQuestionTitle">阅读理解</p>
          <p class="readingQuestionInfo">readingQuestionInfo</p>
          <div class="readingQuestionArea"
               v-for="(readingitem,readingIndex) in readingQuestionForm"
               :key="readingIndex">
            <el-card class="readingQuestionBoxCard">
              <p class="readingQuestionPassageText"
                 v-for="(passageItem,passageIndex) in readingitem.Passage"
                 :key="passageIndex">{{passageItem}}</p>
              <div class="readingQuestionOptionArea">
                <comReadingPaper :questionList="readingitem.readingPassageQuestion"></comReadingPaper>
              </div>

              <el-row type="flex"
                      justify="center"
                      align="middle"
                      style="flex-wrap:wrap">
                <el-col :span="2"></el-col>
              </el-row>
            </el-card>
          </div>

        </div>
        <el-divider></el-divider>
        <div id="translatingQuestionBox">
          <p class="translatingTitle">翻译</p>
          <p class="translatingInfo">Info</p>
          <div class="translatingArea">
            <el-card>
              <p class="translatingContent"
                 v-for="(translatingItem,translaringIndex) in  translatingContent"
                 :key="translaringIndex">{{translatingItem}}</p>
              <el-divider />
              <p class="translatingUserTip">Please Input Your Translating content:</p>
              <el-row type="flex"
                      justify="center"
                      align="middle">
                <el-col :span="20">
                  <el-input type="textarea"
                            placeholder="Please Input Your Translating content"
                            :autosize="{minRows:5,maxRows:10}"
                            v-model="translatingAns"></el-input>
                </el-col>
              </el-row>

            </el-card>

          </div>
        </div>
        <div id="part3SubmitButtonBox">
          <el-button type="success"
                     plain
                     class="part3SubmitButton"
                     @click="submitPart3Content"
                     round>提交</el-button>
        </div>
      </el-scrollbar>

    </div>

    <!-- <el-button type="error"
               plain
               @click="deleteCookies">
      Delete Cookies</el-button> -->
  </div>
</template>
<script>
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
let that;
import comReadingPaper from "../../components/examingCom/readingPaper";
import comExampaper from "../../components/examingCom/examPaper.vue"
import global from '../../../public/publicJavaScript/global.js'
import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    listenScore: "",
    readScore: "",
    spec1Score: "",
    spec2Score: "",

    spec1Number: '',
    spec2Number: '',
    readNumber: '',
    isUserChangeListeningPart: false,
    isUserChangeReadingPart: false,
    timeFlag: 'false',
    timeDown: '',
    timer: '',
    totalTime: '',
    writingPartTime: 0,
    writingOverTime: 1800,
    ListeningPartTime: 0,
    ListeningPartOverTime: '',
    ReadingPartTranslatingPartTime: 0,
    active: 0,
    wordLength: '0',
    writingContent: [
      {
        value: ""
      }],
    writingInputContent: '',
    writingBoxToNext: true,


    listingContent: [

    ],
    listenTrue: [],
    listingAns: [],
    audio: [
      {
        name: "test",
        artist: "test",
        url: ''
      },
    ],


    specticalQuestion1Content: [],
    specticalQuestion1True: [],
    specticalQuestion1Info: '',
    specticalQuestion1Form: {
      Options: [],
      AnsOption: [],
      Ans: [],
    },
    specticalQuestion2True: [],
    specticalQuestion2Content: [],
    specticalQuestion2Info: [],
    optionsWord: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
    specticalQuestion2Form: {
      Options: [],
      Ans: [],
    },
    readingTrue: [],
    readingAns: [],
    readingQuestionForm: [

    ],
    translatingContent: [],
    translatingAns: "",
  }),
  components: {
    comReadingPaper,
    comHeader,
    comExampaper
  },
  created () {

    this.audio[0].url = this.$store.state.currentExamingExampapeAudioAddr;
    let ExampaperQuestion = this.$store.state.currentExamingExampaperInfo;
    this.spec1Number = ExampaperQuestion[2][0].schoNumber;
    this.spec2Number = ExampaperQuestion[2][1].schoNumber;
    // set write
    this.writingContent[0].value = ExampaperQuestion[1][0].subContent;
    // set translate
    let temparray = new Array();
    temparray.push(ExampaperQuestion[1][1].subContent)
    this.translatingContent = temparray;
    // set listen
    for (let i = 0; i < ExampaperQuestion[0].length; i++) {
      let obj = new Object();
      obj.userAns = "";
      obj.questionNo = ExampaperQuestion[0][i].chNumber;
      obj.questionContent = "";
      obj.AnsA = ExampaperQuestion[0][i].chA;
      obj.AnsB = ExampaperQuestion[0][i].chB;
      obj.AnsC = ExampaperQuestion[0][i].chC;
      obj.AnsD = ExampaperQuestion[0][i].chD;
      this.listingContent.push(obj);
      this.listenTrue.push(ExampaperQuestion[0][i].chTrue);
    }
    // set read
    for (let i = 0; i < ExampaperQuestion[3].length; i++) {
      let array = new Array();
      array = ExampaperQuestion[3][i].rdPassage.split("*");
      let obj = new Object();
      obj.Passage = array;
      obj.readingPassageQuestion = [];
      for (let j = 0; j < ExampaperQuestion[4].length; j++) {
        if (ExampaperQuestion[4][j].rdPassageNo == i + 1) {
          let questionObj = new Object();
          questionObj.userAns = "";
          questionObj.questionNo = ExampaperQuestion[4][j].rdNumber;
          questionObj.questionContent = ExampaperQuestion[4][j].rdContent;
          questionObj.AnsA = ExampaperQuestion[4][j].rdOptionA;
          questionObj.AnsB = ExampaperQuestion[4][j].rdOptionB;
          questionObj.AnsC = ExampaperQuestion[4][j].rdOptionC;
          questionObj.AnsD = ExampaperQuestion[4][j].rdOptionD;

          obj.readingPassageQuestion.push(questionObj);

          this.readingTrue.push(ExampaperQuestion[4][j].rdTrue);
        }
      }
      this.readingQuestionForm.push(obj);

    }
    // set spec
    for (let i = 0; i < ExampaperQuestion[2].length; i++) {
      switch (ExampaperQuestion[2][i].schoType) {
        case 2: {
          // set spec 1

          this.specticalQuestion1Content = ExampaperQuestion[2][i].schoContent.split("*");
          this.specticalQuestion1Form.Options = ExampaperQuestion[2][i].schoOption.split(",");
          this.specticalQuestion1Form.AnsOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
          this.specticalQuestion1Form.Ans = ['', '', '', '', '', '', '', '', '', ''];
          this.specticalQuestion1True = ExampaperQuestion[2][i].schoTrue.split(",")
          break;
        }
        case 1: {
          // set spec 2
          this.specticalQuestion2Content = ExampaperQuestion[2][i].schoContent.split("*");
          this.specticalQuestion2Form.Options = ExampaperQuestion[2][i].schoOption.split("*");
          this.specticalQuestion2Form.Ans = [];
          this.specticalQuestion2True = ExampaperQuestion[2][i].schoTrue.split(",");
          break;
        }
      }
    }


















    if (this.$store.state.currentExamType == 'cet4') {
      this.totalTime = 7500;
      this.ListeningPartOverTime = 1500
    } else {
      this.totalTime = 7800;
      this.ListeningPartOverTime = 1800
    }

    let loading = this.$loading({
      lock: true,
      background: 'rgba(0, 0, 0, 0.9)'
    });
    setTimeout(() => {
      loading.close();
      this.active = 0;
      this.startExam();
    }, 3 * 1000);
    this.$message({
      message: "The exam starts in 3 seconds!",
      type: 'success',
      duration: 3000
    });
  },
  mounted () {
    that = this;
    let length = this.specticalQuestion2Form.Options.length;
    for (let i = 0; i < length; i++) {
      this.specticalQuestion2Form.Ans[i] = "";
    }
  },
  methods: {
    examOver () {
      // /this.getStudentAns();
    },
    formatWriteInput (_input) {
      let obj = global.stringToArrayWithWrap(_input);
      let resStr = "";
      for (let i = 0; i < obj.length; i++) {
        resStr += obj[i].value + "*";
      }
      return resStr;

    },

    api_InsertScore (_stuNumber, _epId, _scWrite, _scListen, _scRead, _scTranslate, _scSubject1Ans, _scSubject2Ans, scSum) {
      Axios.post(APIURL + '/deleteScore', {
        stuNumber: _stuNumber,
        epId: _epId
      }).then(res => {
        console.log(res);
        this.api_insert(_stuNumber, _epId, _scWrite, _scListen, _scRead, _scTranslate, _scSubject1Ans, _scSubject2Ans, scSum);
      })
    },
    api_insert (_stuNumber, _epId, _scWrite, _scListen, _scRead, _scTranslate, _scSubject1Ans, _scSubject2Ans, scSum) {

      Axios.post(APIURL + "insertScore", {
        stuNumber: _stuNumber,
        epId: _epId,
        scWrite: _scWrite,
        scListen: _scListen,
        scRead: _scRead,
        scTranslate: _scTranslate,
        scSubject1Ans: _scSubject1Ans,
        scSubject2Ans: _scSubject2Ans,
        scSum: scSum
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

    },
    setScore (_ansArray, _trueArray, _itemScore) {
      let _score = 0;

      for (let i = 0; i < _ansArray.length; i++) {
        if (_ansArray[i] == _trueArray[i]) {
          _score += _itemScore;
        }
      }
      return _score;
    },

    setListenScore () {
      let listenAns = this.$refs.comListeningPartRef.returnAns();
      for (let i = 0; i < listenAns.length; i++) {
        if (listenAns[i] == this.listenTrue[i]) {
          this.listenScore += 10;
        }
      }
    },
    setReadScore () {
      let readingAns = this.getReadingAns();
      for (let i = 0; i < readingAns.length; i++) {
        if (readingAns[i] == this.readingTrue[i]) {
          this.readingScore += 20;
        }
      }
    },
    setSpec1Score () {
      let spec1Ans = this.specticalQuestion1Form.Ans;
      for (let i = 0; i < spec1Ans.length; i++) {
        if (spec1Ans[i] == this.specticalQuestion1True[i]) {
          this.specticalScore1 += 10;
        }
      }
    },
    setSpec2Score () { },
    getStudentAns () {
      console.log("write ans");

      console.log(this.formatWriteInput(this.writingInputContent));
      console.log("translate ans");
      console.log(this.formatWriteInput(this.translatingAns));
      console.log("listen ans");
      let listenAns = this.$refs.comListeningPartRef.returnAns();
      console.log(listenAns)
      console.log("read ans");
      console.log(this.getReadingAns());
      console.log("spec1 ans");
      console.log(this.specticalQuestion1Form.Ans);
      console.log("spec2 ans");
      console.log(this.specticalQuestion2Form.Ans);


    },
    examOverSubmitScore () {
      console.log(this.$store.state.currentExamInfo.epId);
      console.log(this.$store.state.userLoginStuNumber);
      //this.getStudentAns();



      //this.api_insertScore(this.$store.state.userLoginStuNumber,)

    },
    submitPart3Content () {
      this.active = 3;




    },
    SendScore () {
      this.listenScore = this.setScore(this.$refs.comListeningPartRef.returnAns(), this.listenTrue, 10);
      console.log(this.listenScore);
      this.readingScore = this.setScore(this.getReadingAns(), this.readingTrue, 20);
      console.log(this.readingScore);
      this.spec1Score = this.setScore(this.specticalQuestion1Form.Ans, this.specticalQuestion1True, 10);
      console.log(this.spec1Score)
      this.spec2Score = this.setScore(this.specticalQuestion2Form.Ans, this.specticalQuestion2True, 10);
      console.log(this.spec2Score)
      let sumScore = Number(this.listenScore) + Number(this.readingScore) + Number(this.spec1Score) + Number(this.spec2Score);
      console.log(sumScore);
      this.api_InsertScore(this.$store.state.userLoginStuNumber,
        this.$store.state.currentExamInfo.epId,
        0,
        this.listenScore,
        this.readingScore + this.spec1Score + this.spec2Score,
        0,
        this.formatWriteInput(this.writingInputContent),
        this.formatWriteInput(this.translatingAns),
        sumScore);

    },
    getListeningAns () {

      console.log(this.$refs.comListeningPartRef.returnAns());
    },

    ListenAns (value) {
      this.active = 2;
      this.isUserChangeReadingPart = true;
      this.listingAns = value;
      // this.$loading();
      // setTimeout(() => {
      //   this.active = 2;

      //   this.$loading().close();
      // }, 1000);

      console.log(this.listingAns);
    },
    getReadingAns () {
      let AnsArray = [];
      for (let i = 0; i < this.readingQuestionForm.length; i++) {
        for (let j = 0; j < this.readingQuestionForm[i].readingPassageQuestion.length; j++) {
          AnsArray.push(this.readingQuestionForm[i].readingPassageQuestion[j].userAns);
        }
      }
      return AnsArray;
    },
    updateLength () {
      this.wordLength = global.returnStringWordLenght(this.writingInputContent);

    },
    startExam () {
      this.customTimeInterval(this.totalTime);

    },
    endExam () {
      clearInterval(this.timer);
      this.timeDown = "Exam is over!";
      this.timeFlag = false;
      this.active = 3;
      let loading = this.$loading({
        lock: true,
        background: 'rgba(0, 0, 0, 0.5)'
      });
      this.$message({
        message: "Exam is over!, 5 seconds back!",
        type: 'success',
        duration: 5000
      })

      setTimeout(() => {
        this.$router.push('/main/selectexampaper')
        loading.close();
      }, 5 * 1000);
      this.examOver();
    },
    toMainpage () {

      // this.$router.push('/main');
      // this.active++;
      // if (this.active == 3) {
      //   this.active = 0;
      // }
      this.timeFlag = true;
      if (this.timeFlag == true) {
        clearInterval(this.timer);
      }
      let timeCount = 60 * 60 * 2;
      this.timer = setInterval(() => {
        let minutes = Math.floor(timeCount / 60);
        let seconds = Math.floor(timeCount % 60);
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        let msg = '' + minutes + ':' + seconds + '';
        this.writingPartTime++;
        this.ListeningPartTime++;

        timeCount--;
        this.timeDown = msg;
        if (timeCount <= 0) {
          this.submitPart3Content();
          clearInterval(this.timer);
        }
      }, 1000);

    },
    customTimeInterval (time) {
      this.timeFlag = true;
      if (this.timeFlag == true) {
        clearInterval(this.timer);
      }
      let timeCount = time;
      this.timer = setInterval(() => {
        let minutes = Math.floor(timeCount / 60);
        let seconds = Math.floor(timeCount % 60);
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        let msg = '' + minutes + ':' + seconds + '';
        this.writingPartTime++;
        this.ListeningPartTime++;
        timeCount--;
        this.timeDown = msg;
        if (timeCount <= 0) {
          this.submitPart3Content();
          clearInterval(this.timer);
        }
      }, 1000);

    },
    submitWritingPart () {
      this.active = 1;
      this.isUserChangeListeningPart = true;
      this.writingContent = global.stringToArrayWithWrap(this.writingInputContent)
      console.log(this.writingInputContent);
      // this.writingContent = this.writingInputContent;
    }
    // deleteCookies() {
    //   this.$cookies.remove('username');
    //   this.$router.push('/main');
    //   console.log(1);
    // },
  },
  watch: {
    wordLength: {
      handler: function (val) {
        if (val > 0) {
          this.writingBoxToNext = false
        }
      },
      deep: true
    },
    active: {
      handler: function (val) {
        switch (val) {
          case 0: {

            break;
          }
          case 1: {
            that.submitWritingPart();
            console.log(111);
            that.totalTime = that.totalTime - 1800;
            that.customTimeInterval(that.totalTime);
            that.$refs.aplayer.play();
            console.log(that.audio[0].url);

            break;
          }
          case 2: {
            that.totalTime = that.totalTime - that.ListeningPartOverTime;
            that.customTimeInterval(that.totalTime);
            that.getListeningAns();
            that.$refs.aplayer.pause();
            break;
          }
          case 3: {
            that.endExam();
            that.examOverSubmitScore();
            that.submitPart3Content();
            that.SendScore();
            break;
          }
        }
      }, deep: true
    },
    writingPartTime: {
      handler: function (val) {
        if (val > that.writingOverTime && val < that.writingOverTime + 2 && that.isUserChangeListeningPart == false) {
          this.active = 1;

        }
      },
      deep: true
    },
    ListeningPartTime: {
      handler: function (val) {
        if (val > that.writingOverTime + 4 && val < that.ListeningPartOverTime + 2 && that.isUserChangeReadingPart == false) {


          this.active = 2;
        }
      }
    }
  },
  filters: {
    indexFilter (value) {
      // number to word
      var index = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      return index[value] + '.';
    },
    OptionIndexFilter (value) {
      return value + "."
    },
  }
};
</script>
<style scoped>
#specticalQuestion1Info {
  display: none;
}

.box-card {
  width: 90%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.box-card span {
  font-weight: bold;
  letter-spacing: 1px;
}

#ExamMainPageBox {
}
.ExamPagePartBox >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
#ExamPageBoxStep {
  width: 100%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.timeDownArea {
  width: 100%;
  height: 40px;
  background-color: lightgreen;
}
.timeText {
  line-height: 40px;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
}
.ExamPagePartBox {
  width: 90%;
  height: 75vh;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}

/* part1 */
#WritingContent {
  text-align: left;
}
#WritingContent p {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  font-size: 17px;
}
#writingInputContent {
  width: 90%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
#writingInputContent p {
  margin-bottom: 10px;
  font-size: 17px;
}
#writingInputContent >>> .el-textarea__inner {
  line-height: 30px;
  font-size: 17px;
}

#writingButtonBox {
  text-align: center;
  margin-top: 10px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
#writingButtonBox >>> .el-button {
  width: 60%;
}
#wordCountBox {
  text-align: right;
}

/* par2 */

.listenMainContent {
  text-align: left;
}
#listenCardBox {
  display: none;
}
#listenAudioBox {
  /* height: 100px;
  width: 100%; */
}
#listenAudioBox >>> .aplayer-body {
  left: 40px;
  margin-top: 20px;
  top: 50vh;
  display: none;
}
#listenAudioBox >>> .aplayer-pic {
  width: 100px;
  height: 100px;
  display: none;
  border-radius: 100px;
}
#listenAudioBox >>> .aplayer-icon-miniswitcher {
  display: none;
}
#listenAudioBox >>> .aplayer-miniswitcher {
  display: none;
}

/* part3 */
#specticalQuestionBox1 {
  width: 100%;
  height: 100%;
  background-color: white;
  /* display: none; */
}
#specticalQuestion1Title,
#specticalQuestion2Title,
.readingQuestionTitle,
.translatingTitle {
  font-size: 20px;
}
#specticalQuestion1Info,
#specticalQuestion2Info,
.readingQuestionInfo,
.translatingInfo {
  display: none;
  margin-top: 10px;
  padding-left: 20px;
  font-size: 16px;
  color: pink;
}
#specticalQuestion1ContentArea {
  width: 90%;
  height: 100%;
  font-size: 18px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  background-color: white;
}
#spacticalQuestion1OptionArea {
  width: 90%;
  height: 100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
.specticalQuestion1ContentText {
  margin-top: 13px;
}
#spacticalQuestion1OptionArea >>> .el-form {
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
}
#specticalQuestionAnsArea {
  width: 90%;
  height: 100px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
.spectiocalQuestion1OptionItem >>> .el-form-item__content {
  margin-left: 10px;
}
.specticalQuestion1OptionNumber {
  width: 15px;
  font-weight: bold;
  text-align: left;
  color: black;
  background-color: white;
}
.specticalQuestion1OptionWord {
  width: 180px;
  height: 100%;
  padding-left: 10px;
  font-size: 17px;
  text-align: left;
  background-color: white;
}
#specticalQuestion1AnsArea {
  height: 100%;
  background-color: white;
}
.specticalQuestion1SelectNumber {
  width: 50px;
}
.specticalQuestion1Select {
  width: 150px;
}

#specticalQuestionBox2 {
  width: 100%;
  height: 100%;
  background-color: white;
  /* display: none;  */
}
#specticalQuestion2Title {
  font-size: 20px;
}
#specticalQuestion2Info {
  margin-top: 10px;
  padding-left: 20px;
  font-size: 16px;
  color: pink;
}
#specticalQuestion2ContentArea {
  width: 90%;
  height: 100%;
  text-indent: -33px;
  font-size: 18px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  background-color: white;
}
.specticalQuestion2ContentText {
  margin-top: 13px;
}
#specticalQuestion2OptionArea {
  width: 90%;
  height: 100%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
#specticalQuestion2OptionArea >>> .el-form {
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
}
#specticalQuestion2OptionArea >>> .el-row {
  width: 100%;
}
#specticalQuestion2OptionArea >>> .el-form-item {
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
#specticalQuestion2OptionArea >>> .el-divider {
  margin-top: 0px;
  margin-bottom: 20px;
}

.specticalQuestion2OptionNumber {
  padding-left: 15px;
  width: 100%;
  background-color: white;
}
.specticalQuestion2OptionContent {
  width: 100%;
  font-size: 17px;
  text-align: left;
  background-color: white;
}
.specticalQuestion2OptionSelect {
  width: 100%;
  height: 40px;
  background-color: white;
}

#readingQuestionBox {
  width: 100%;
  height: 100%;
  /* display: none; */
  background-color: white;
}
.readingQuestionArea {
  margin-top: 10px;
}
.readingQuestionOptionArea {
  width: 100%;
  height: 100%;
  background-color: white;
}
.readingQuestionPassageText {
  width: 90%;
  text-indent: calc(17 * 2px);
  font-size: 17px;
  margin-top: 13px;
  margin-left: auto;
  margin-right: auto;
}

#translatingQuestionBox {
  width: 100%;
  height: 100%;
  background-color: white;
}
.translatingArea {
  width: 100%;
  height: 100%;
  background-color: white;
}
.translatingContent {
  width: 90%;
  margin-top: 13px;
  margin-left: auto;
  margin-right: auto;
}
.translatingUserTip {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}
.translatingArea >>> .el-textarea {
  width: 100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  font-size: 17px;
}
#part3SubmitButtonBox {
  width: 60%;
  height: 100%;
  margin-top: 10px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
#part3SubmitButtonBox >>> .el-button {
  width: 180px;
}
</style>