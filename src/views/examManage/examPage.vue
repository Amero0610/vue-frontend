<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:53:53
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-06 02:08:51
 * @FilePath: /vue-frontend/src/views/examManage/examPage.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="ExamMainPageBox">
    <comHeader></comHeader>
    <el-button type="primart"
               plain
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
      <p>{{wordLength}}</p>
      <div id="writingInputContent">
        <p>Please Input Your Content:</p>
        <el-input v-model="writingInputContent"
                  :show-word-limit="true"
                  ref="testinput"
                  type="textarea"
                  @input="updateLength"
                  :autosize="{minRows: 5, maxRows: 10}"
                  placeholder="Please Input Content"></el-input>

      </div>
      <div id="writingButtonBox">
        <el-button type="primary"
                   @click="testInput">input</el-button>
      </div>

    </div>

    <!-- part2 -->
    <div class="ExamPagePartBox"
         v-show="active==1">
      2
    </div>
    <!-- part3 -->
    <div class="ExamPagePartBox"
         v-show="active==2">
      3
    </div>

    <!-- <el-button type="error"
               plain
               @click="deleteCookies">
      Delete Cookies</el-button> -->
  </div>
</template>
<script>
import global from '../../../public/publicJavaScript/global.js'
import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    active: 0,
    wordLength: '',
    writingContent: [],
    writingInputContent: '',
  }),
  components: {
    comHeader,
  },
  methods: {
    updateLength () {
      this.wordLength = global.returnStringWordLenght(this.writingInputContent);

    },
    toMainpage () {

      // this.$router.push('/main');
      this.active++;
      if (this.active == 3) {
        this.active = 0;
      }
    },
    testInput () {
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
};
</script>
<style scoped>
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
#ExamPageBoxStep {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.ExamPagePartBox {
  width: 90%;
  height: 300px;
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
</style>