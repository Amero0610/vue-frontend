<!--
 * @Author: Amero
 * @Date: 2022-02-03 19:54:07
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-09 02:21:10
 
-->

<template>
  <div>
    <div id="fixedBox">
      <el-row type="flex"
              justify="center"
              align="middle"
              id="submitFlag">
        <el-col :span="20"
                :push="0">Process:
          <div id="spaceBox1"></div>
          <el-progress :percentage="processPercent"
                       type="circle"
                       :status="processStatus"
                       :color="customColors"
                       :stroke-width="10"></el-progress>
        </el-col>
      </el-row>
    </div>
    <el-scrollbar style="height: 100%">
      <div id="testbox">

        <div class="questionBox"
             v-for="(item, index) in questionList"
             :key="index">
          <el-row type="flex"
                  justify=""
                  align="middle">
            <el-col :span="24">
              <el-card>
                <el-row type="flex"
                        justify="start">
                  <el-col :span="1">
                    <p class="questionNo">{{ item.questionNo }}.</p>
                  </el-col>
                  <el-col :span="20">
                    <p class="quesitonContent">{{ item.questionContent }}</p>
                  </el-col>
                </el-row>
                <div id="spaceBox2"></div>
                <el-row class="option"
                        type="flex"
                        justify="start"
                        align="middle">
                  <el-col :span="1">
                    <el-radio v-model="item.userAns"
                              label="A."> </el-radio>
                  </el-col>
                  <el-col :span="0"
                          class="optiontext_1">
                    <span>A</span>
                  </el-col>
                  <el-col :span="20"
                          :push="1"
                          class="optiontext_2">
                    <span class="optiontext_2">{{ item.AnsA }}</span>
                  </el-col>
                </el-row>
                <el-row class="option"
                        type="flex"
                        v-show="item.AnsB"
                        justify="start"
                        align="middle">
                  <el-col :span="1">
                    <el-radio v-model="item.userAns"
                              label="B."></el-radio>
                  </el-col>
                  <el-col :span="0"
                          class="optiontext_1">
                    <span>B</span>
                  </el-col>
                  <el-col :span="21"
                          :push="1"
                          :offset="0"
                          class="optiontext_2">
                    <span class="optiontext_2">{{ item.AnsB }}</span>
                  </el-col>
                </el-row>
                <el-row class="option"
                        type="flex"
                        v-show="item.AnsC"
                        justify="start"
                        align="middle">
                  <el-col :span="1">
                    <el-radio v-model="item.userAns"
                              label="C."></el-radio>
                  </el-col>
                  <el-col :span="0"
                          class="optiontext_1">
                    <span>C</span>
                  </el-col>
                  <el-col :span="21"
                          :push="1"
                          :offset="0"
                          class="optiontext_2">
                    <span class="optiontext_2">{{ item.AnsC }}</span>
                  </el-col>
                </el-row>
                <el-row class="option"
                        type="flex"
                        v-show="item.AnsD"
                        justify="start"
                        align="middle">
                  <el-col :span="1">
                    <el-radio v-model="item.userAns"
                              label="D."></el-radio>
                  </el-col>
                  <el-col :span="0"
                          class="optiontext_1">
                    <span>D</span>
                  </el-col>
                  <el-col :span="21"
                          :push="1"
                          :offset="0"
                          class="optiontext_2">
                    <span class="optiontext_2">{{ item.AnsD }}</span>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>

      </div>
    </el-scrollbar>

    <div id="clear_both"></div>
    <div id="submitBtn">
      <!-- :disabled="isDisabled"  -->
      <el-button type="success"
                 @click="getValue()"
                 round
                 :disabled="isDisabled"
                 plain>Submit Answer</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["questionList"],
  data () {
    return {
      SubmitStatus: "Unsubmitted",
      isDisabled: false,
      processStatus: null,
      processPercent: 0,
      customColors: [
        { color: "#efce61", percentage: 20 },
        { color: "#d9d958", percentage: 40 },
        { color: "#c4e450", percentage: 60 },
        { color: "#aeee47", percentage: 80 },
        { color: "#98f93e", percentage: 100 },
      ],
    };
  },
  methods: {
    getValue: function () {
      let ansList = new Array();
      for (let i = 0; i < this.questionList.length; i++) {
        ansList.push(this.questionList[i].userAns);
      }
      this.SubmitStatus = "Submitted"
      this.processStatus = "success"
      this.$emit("sendAns", ansList);
    },
    judgeIsDisable: function (dataList) {
      let jIndex = 0;
      // dataList[i].userAns == "A" ||
      // dataList[i].userAns == "B" ||
      // dataList[i].userAns == "C" ||
      // dataList[i].userAns == "D"
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].userAns >= "A" && dataList[i].userAns <= "D") {
          jIndex++;
        }
      }
      jIndex == dataList.length
        ? (this.isDisabled = false)
        : (this.isDisabled = true);
    },
    setProcessData: function (userAns, allAns) {
      let temp = (userAns / allAns) * 100;
      this.processPercent = Math.floor(temp);
    },
    setProcessStatus: function (ansList) {
      let tempList = new Array();
      for (let i = 0; i < ansList.length; i++) {
        tempList.push(ansList[i].userAns);
      }
      let index = 0;
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i] != "value") {
          index++;
        }
      }
      this.setProcessData(index, tempList.length);
    },
  },
  watch: {
    questionList: {
      handler: function (newVal) {
        this.judgeIsDisable(newVal);
        this.setProcessStatus(newVal);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
#fixedBox {
  left: 15px;
  position: fixed;
}
#spaceBox1 {
  margin-top: 10px;
}
#spaceBox2 {
  margin-top: 20px;
}
#submitFlag {
  text-align: left;
  width: 100%;
}
#clear_both {
  clear: both;
}
#testbox {
  padding-bottom: 20px;
  width: 100%;
}
/* ../../assets/font/GravityBold-JAp7.otf */
/* @font-face {
  font-family: 'questionFont';
  src: url('../../assets/font/GravityBold-JAp7.otf');
}
@font-face {
  font-family: 'ansFont';
  src: url('../../assets/font/Gravity-V546.otf');
} */
.questionBox {
  /* font-family: 'questionFont'; */

  /* font-family: 'Montserrat', sans-serif; */
  /* font-weight: ; */
  width: 80%;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  border-right: 3px solid white;
}
#title {
  color: black;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 0px;
}
.question {
  text-align: left;
}
.quesitonContent,
.questionNo {
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  font-family: 'questionFont';
}
.questionNo {
  padding-left: 10px;
  margin-right: 5px;
}
.quesitonContent {
  text-align: left;
}
.option {
  /* background-color: gray; */
  margin-top: 3vh;
  width: 100%;
}
.option >>> .el-radio__inner {
  margin-left: 27px;
}
.option >>> .el-radio__label {
  font-size: 17px;
}
.optiontext_1 {
  text-align: right;
  font-size: 16px;
}
.optiontext_2 {
  text-align: left;
  font-size: 16px;
}
#submitBtn {
  width: 100%;
  text-align: center;
  margin-top: 3%;
}
</style>