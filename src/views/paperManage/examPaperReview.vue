<template>
  <div id="ExamMainPageBox">
    <div class="revireOptionArea">
      <el-button type="primary"
                 @click="nextPart"
                 plain> Next Part</el-button>
    </div>
    <!-- <comHeader></comHeader> -->
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
                   @click="testInput">input</el-button>
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
            <p id="specticalQuestion1Title">specticalQuestion1</p>
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
                      <p class="specticalQuestion1SelectNumber">{{index|OptionIndexFilter}}</p>
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
            <p id="specticalQuestion2Title">title</p>
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
                      <p class="specticalQuestion2OptionNumber">{{index}}.</p>
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
          <p class="readingQuestionTitle">readingQuestionTitle</p>
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
          <p class="translatingTitle">Title</p>
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
                     round>Submit</el-button>
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
let that;
import comReadingPaper from "../../components/examingCom/readingPaper";
import comExampaper from "../../components/examingCom/examPaper.vue"
import global from '../../../public/publicJavaScript/global.js'
// import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    timeFlag: 'false',
    timeDown: '',
    timer: '',
    writingPartTime: 0,
    ListeningPartTime: 0,
    ReadingPartTranslatingPartTime: 0,
    active: 0,
    wordLength: '0',
    writingContent: [],
    writingInputContent: '',
    writingBoxToNext: true,


    listingContent: [
      {
        userAns: "",
        questionNo: 1,
        questionContent: "This is Question10",
        AnsA: "10Ans A",
        AnsB: "10Ans B",
        AnsC: "10Ans C",
        AnsD: "10Ans D",
      },
      {
        userAns: "",
        questionNo: 2,
        questionContent: "This is Questdsankdsajhkldh jsakdhjks ahdjksahjkd hjksahd jksahjk shajk hdsjkah jkdsahjk ion10",
        AnsA: "10Ans A",
        AnsB: "10Ans B",
        AnsC: "10Ans C",
        AnsD: "10Ans D",
      },
      {
        userAns: "",
        questionNo: 3,
        questionContent: "This is Questiodsnabdsajkd sajkdhjksahdjks ahjk dhjksahjk dsahkn10",
        AnsA: "10Ans A",
        AnsB: "10Ans B",
        AnsC: "10Ans C",
        AnsD: "10Ans D",
      },
      {
        userAns: "",
        questionNo: 4,
        questionContent: "This is Question11",
        AnsA: "11Ans A",
        AnsB: "11Ans B",
        AnsC: "11Ans C",
        AnsD: "11Ans D",
      },
    ],
    listingAns: [],
    audio: [
      {
        name: "Nevada",
        artist: "Vicetone",
        url: 'http://123.57.7.40:5057/media/Nevada.ba9172c2.mp3',
      },
    ],


    specticalQuestion1Content: ['In [10] flood of darkness, hope is the light. It brings comfort, faith, and confidence. It gives us guidance when we are lost, and gives support when we are afraid. And the moment we give up hope, we give up our lives. The world we live in is disintegrating into a place of malice and hatred, where we need hope and find it harder. In this world of fear, hope to find better, but easier said than done, the more meaningful life of faith will make life meaningful.',
      "Only when you understand the true meaning of life can you live truly. Bittersweet as life is, it's still wonderful, and it's fascinating even in tragedy. If you're just alive, try harder and try to live wonderfully.",
      'this is 3',
      'this is 4'],
    specticalQuestion1Info: 'this is info',
    specticalQuestion1Form: {
      Options: ['direationlly', 'the', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      AnsOption: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
      Ans: ['', '', '', '', '', '', '', '', '', ''],
    },
    specticalQuestion2Content: ['(A).In [10] flood of darkness, hope is the light. It brings comfort, faith, and confidence. It gives us guidance when we are lost, and gives support when we are afraid. And the moment we give up hope, we give up our lives. The world we live in is disintegrating into a place of malice and hatred, where we need hope and find it harder. In this world of fear, hope to find better, but easier said than done, the more meaningful life of faith will make life meaningful.',
      "(B).Only when you understand the true meaning of life can you live truly. Bittersweet as life is, it's still wonderful, and it's fascinating even in tragedy. If you're just alive, try harder and try to live wonderfully.",
      '(C).this is 3',
      '(D).this is 4'],
    specticalQuestion2Info: [],
    optionsWord: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
    specticalQuestion2Form: {
      Options: ['1',
        "Only when you understand the true meaning of life can you live truly. Bittersweet as life is, it's still wonderful, and it's fascinating even in tragedy. If you're just alive, try harder and try to live wonderfully.",
        "If people really understood the horrible consequences of sugary foods and drinks, they would support governmentmeasures against sugar consumption.",
        '4', '5', '6', '7', '8', '9'],
      Ans: [],
    },

    readingAns: [],
    readingQuestionForm: [

      {
        Passage: ['In [10] flood of darkness, hope is the light. It brings comfort, faith, and confidence. It gives us guidance when we are lost, and gives support when we are afraid. And the moment we give up hope, we give up our lives. The world we live in is disintegrating into a place of malice and hatred, where we need hope and find it harder. In this world of fear, hope to find better, but easier said than done, the more meaningful life of faith will make life meaningful.',
          "Only when you understand the true meaning of life can you live truly. Bittersweet as life is, it's still wonderful, and it's fascinating even in tragedy. If you're just alive, try harder and try to live wonderfully.",
          'this is 3',
          'this is 4'],
        readingPassageQuestion: [
          {
            userAns: "",
            questionNo: 1,
            questionContent: "This is Question10",
            AnsA: "10Ans A",
            AnsB: "10Ans B",
            AnsC: "10Ans 1",
            AnsD: "10Ans D",

          },
          {
            userAns: "",
            questionNo: '2',
            questionContent: 'this is 2',
            AnsA: "10Ans A",
            AnsB: "10Ans B",
            AnsC: "10Ans C",
            AnsD: "10Ans D",
          },
        ],
      },
      {
        Passage: ["this is 3", "this is 4", "this is 5"],
        readingPassageQuestion: [
          {
            userAns: "",
            questionNo: 1,
            questionContent: "This is Question10",
            AnsA: "10Ans A",
            AnsB: "10Ans B",
            AnsC: "10Ans 1",
            AnsD: "10Ans D",

          },
          {
            userAns: "",
            questionNo: '2',
            questionContent: 'this is 2',
            AnsA: "10Ans A",
            AnsB: "10Ans B",
            AnsC: "10Ans C",
            AnsD: "10Ans D",
          },
        ],
      },
    ],
    translatingContent: ['In [10] flood of darkness, hope is the light. It brings comfort, faith, and confidence. It gives us guidance when we are lost, and gives support when we are afraid. And the moment we give up hope, we give up our lives. The world we live in is disintegrating into a place of malice and hatred, where we need hope and find it harder. In this world of fear, hope to find better, but easier said than done, the more meaningful life of faith will make life meaningful.',
      "Only when you understand the true meaning of life can you live truly. Bittersweet as life is, it's still wonderful, and it's fascinating even in tragedy. If you're just alive, try harder and try to live wonderfully.",
      'this is 3',
      'this is 4'],
    translatingAns: "",
  }),
  components: {
    comReadingPaper,
    // comHeader,
    comExampaper
  },
  created () {

    // let loading = this.$loading({
    //   lock: true,
    //   background: 'rgba(0, 0, 0, 0.9)'
    // });
    // setTimeout(() => {
    //   loading.close();
    //   this.active = 0;
    //   this.startExam();
    // }, 3 * 1000);
    // this.$message({
    //   message: "The exam starts in 3 seconds!",
    //   type: 'success',
    //   duration: 3000
    // });
  },
  mounted () {
    that = this;
    let length = this.specticalQuestion2Form.Options.length;
    for (let i = 0; i < length; i++) {
      this.specticalQuestion2Form.Ans[i] = "";
    }
  },
  methods: {
    submitPart3Content () {
      console.log(this.specticalQuestion1Form.Ans);
      console.log(this.specticalQuestion2Form.Ans);
      console.log(this.getReadingAns());
      console.log(this.translatingAns)
      this.endExam();


    },
    getListeningAns () {
      console.log(this.$refs.comListeningPartRef.returnAns());
    },

    ListenAns (value) {
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
        loading.close();
      }, 5 * 1000);
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
    testInput () {
      this.active = 1;
      this.writingContent = global.stringToArrayWithWrap(this.writingInputContent)
      console.log(this.writingInputContent);
      // this.writingContent = this.writingInputContent;
    },
    nextPart () {
      this.active++;
      if (this.active == 3) {
        this.active = 0;
      }
    },
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
    writingPartTime: {
      handler: function (val) {
        if (val > 5 && val < 7) {
          this.active = 1;
          this.testInput();
        }
      },
      deep: true
    },
    ListeningPartTime: {
      handler: function (val) {
        if (val > 9 && val < 11) {

          that.getListeningAns();
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
      return value + 1 + ".";
    }
  }
};
</script>
<style scoped>
.revireOptionArea {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
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
  display: none;
  width: 100%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.timeDownArea {
  display: none;
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
.ExamPagePartBox >>> .el-button {
  display: none;
}
.ExamPagePartBox >>> .el-progress,
.ExamPagePartBox >>> #fixedBox {
  display: none;
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