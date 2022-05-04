<!--
 * @Author: AmeroL
 * @Date: 2022-05-04 01:26:03
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-04 02:25:06
 * @FilePath: /vue-frontend/src/components/addExamPaper/comAddNormalChoose.vue
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
            Please Select Number :
          </p>
        </el-col>
        <el-col :span="5">
          <el-input-number v-model="questionNumber"
                           @change="handleChooseNumber"
                           :min="1"
                           :max="55"
                           size="large"></el-input-number>
        </el-col>

        <el-col :span="0">
          <p id="descriptText">
            Please Select Type :
          </p>
        </el-col>
        <el-col :span="0">
          <el-select v-model="questionType"
                     @change="handleSelectChooseQuestion">
            <el-option label="chooseQuestion"
                       value="1"></el-option>
            <el-option label="subpectQuestion"
                       value="2"></el-option>
          </el-select>
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
                      :autosize="{ minRows: 1, maxRows: 10}"
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
              <el-col :span="5">{{index|indexFilter}}</el-col>
              <el-col :span="15">
                <el-input v-model="domain.value"
                          type="textarea"
                          :autosize="{minRows:1,maxRows:5}"></el-input>
              </el-col>
              <el-col :span="
                          4">
                <el-button type="danger"
                           plain
                           @click.prevent="removeDomain(domain)">Delete</el-button>
              </el-col>
            </el-row>

          </el-form-item>
          <el-form-item id="buttonArea">
            <el-button type="primary"
                       @click="submitForm">Submit</el-button>
            <el-button @click="addOption">Add</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data: () => ({
    questionNumber: '',
    questionType: '',
    questionMainContentform: { questionMainContent: '', },

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
    submitForm () {
      let questionContentObj = new Array();
      questionContentObj.push(this.questionMainContentform.questionMainContent);
      questionContentObj.push(this.questionContentform.questions);
      console.log(questionContentObj);
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
