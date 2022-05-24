<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:22:08
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 15:09:51
 * @FilePath: /vue-frontend/src/views/scoreManage/showScoreList.vue
 * @email: vian8416@163.com
-->
<template>
  <div>
    <el-dialog title="修改成绩"
               :visible.sync="dialogVisible">
      <div class="studentAnsContent">
        <el-collapse v-model="activeNames"
                     accordion>
          <el-collapse-item title="写作作答内容"
                            name="1">
            <p class="AnsContent"
               v-for="(item,index) in updateScoreList.writeContent"
               :key="index">{{item}}</p>
          </el-collapse-item>
          <el-collapse-item title="翻译作答内容"
                            name="2">
            <p class="AnsContent"
               v-for="(item,index) in updateScoreList.translateContent"
               :key="index">{{item}}</p>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div id="scoreInputBox">
        <el-form label-position="right"
                 label-width="150px"
                 v-model="updateScoreList">
          <el-form-item label="WriteScore:">
            <el-input v-model.number="updateScoreList.writeScore"
                      :placeholder="writeScorePlace"></el-input>
          </el-form-item>
          <el-form-item label="TranslateScore:">
            <el-input v-model.number="updateScoreList.translateScore"
                      :placeholder="translateScorePlace"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="submitUpdate">确认</el-button>
      </div>
    </el-dialog>
    <div id="ScoreListTable">

      <el-row type="flex"
              justify="space-between"
              align="middle">
        <el-col :span="8">
          <p id="ExamPaperTitle">{{this.currentExampaperTitle}}</p>
        </el-col>
        <el-col :span="8">
          <el-select v-model="currentExampaper"
                     id="selectExamPaperArea"
                     placeholder="请选择试卷"
                     @change="getCurrentItem">
            <el-option v-for="item in ExampaperList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>
    <el-empty description="Please Select Exampaper"
              v-show="!currentExampaper.length"></el-empty>

    <el-table v-show="currentExampaper.length"
              :data="scoreList"
              :border="true">
      <el-table-column label="StudentNumber"
                       prop="scStudentNumber"></el-table-column>
      <el-table-column label="Listening"
                       prop="scListenScore"></el-table-column>
      <el-table-column label="Reading"
                       prop="scReadScore"></el-table-column>
      <el-table-column label="Writing"
                       prop="scWriteScore">
        <template slot-scope="scope">{{scope.row|writeScoreFilter}}</template>
      </el-table-column>
      <el-table-column label="scTotalScore"
                       prop="scTotalScore">
        <template slot-scope="scope">{{scope.row|totalScoreFilter}}</template>
      </el-table-column>
      <!-- <el-table-column label="scTime"
                       prop="scTime"></el-table-column> -->
      <el-table-column label="Operation"
                       width="180px">

        <template slot-scope="scope">
          <el-button @click="editScore(scope.row)"
                     type="primary"
                     size="mini">Edit</el-button>
          <el-popconfirm title="Confirm to delete this item"
                         confirm-button-text="Confirm"
                         @confirm="deleteScore(scope.row)"
                         cancel-button-text="Cancel"
                         style="margin-left:10px">
            <el-button type="danger"
                       plain
                       size="mini"
                       slot="reference">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
let that;
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
export default {
  data: () => ({
    activeNames: '1',
    dialogVisible: false,
    currentExampaperTitle: '',
    writeScorePlace: '',
    translateScorePlace: '',
    updateStudentNumber: '',
    updateScoreList:
    {
      writeContent: ["2", "2", "3"],
      translateContent: ["2", "2", "3"],
      writeScore: '',
      translateScore: '',
    },
    updateAllInfo: {},
    scoreList: [


    ],
    currentExampaper: '',
    ExampaperList: [
      // {
      //   id: '1',
      //   name: 'CET4-2019-12-01',
      // },
      // {
      //   id: '2',
      //   name: 'CET4-2019-12-02',
      // },
      // {
      //   id: '3',
      //   name: 'CET4-2019-06-01',
      // },
    ],
  }),
  created () {
    that = this;
    this.api_getAllExampaper();
  },
  methods: {
    formatName (_data) {

      let _str = "";
      _str += _data.epType.toUpperCase() + " " + _data.epYear + '.' + _data.epMonth + ' No.' + _data.epIndex;
      return _str;
    },
    pushScoreList (_list) {
      this.scoreList = [];
      for (let i = 0; i < _list.length; i++) {
        let obj = new Object();
        obj.scStudentNumber = _list[i].stuNumber;
        obj.scListenScore = _list[i].scListen;
        obj.scReadScore = _list[i].scRead;
        obj.scWriteScore = _list[i].scWrite;
        obj.scTranslateScore = _list[i].scTranslate;
        obj.scTotalScore = _list[i].scSum;
        obj.Sub1Ans = _list[i].scSubject1Ans;
        obj.Sub2Ans = _list[i].scSubject2Ans;
        obj.scId = _list[i].scId;
        obj.epId = _list[i].epId;
        this.scoreList.push(obj);
      }
    },
    showSuccessMessage () {
      that.$message({
        message: 'Success',
        type: 'success'
      })
    },
    pushExampaperList (_list) {
      for (let i = 0; i < _list.length; i++) {
        let obj = new Object();
        obj.id = i;
        obj.name = this.formatName(_list[i]);
        obj.epId = _list[i].epId;
        this.ExampaperList.push(obj);
      }
    },
    api_deleteStudentScore (_obj) {
      Axios.post(APIURL + 'deleteScore', {
        stuNumber: _obj.scStudentNumber,
        epId: _obj.epId,
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    api_updateStudentScore (_obj) {
      console.log(_obj);
      _obj.scTotalScore = Number(_obj.scWriteScore) + Number(_obj.scListenScore) + Number(_obj.scReadScore) + Number(_obj.scTranslateScore);
      Axios.post(APIURL + 'updateScore', {
        stuNumber: _obj.scStudentNumber,
        epId: _obj.epId,
        scWrite: _obj.scWriteScore,
        scListen: _obj.scListenScore,
        scRead: _obj.scReadScore,
        scTranslate: _obj.scTranslateScore,
        scSubject1Ans: _obj.Sub1Ans,
        scSubject2Ans: _obj.Sub2Ans,
        scSum: _obj.scTotalScore,
      }).then(res => {
        that.showSuccessMessage();
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    api_getStudentScore (_epId) {
      Axios.get(APIURL + 'getScore', {
        params: {
          epId: _epId
        }
      }).then(res => {
        let remoteList = res.data.data;
        this.pushScoreList(remoteList)

      })
    },
    api_getAllExampaper () {
      Axios.get(APIURL + 'getAllExampaper')
        .then(res => {
          let remoteList = res.data.data;
          this.pushExampaperList(remoteList);
        })
    },
    clearTempInfo () {
      this.updateScoreList.writeScore = '';
      this.updateScoreList.translateScore = '';
      this.writeScorePlace = '';
      this.translateScorePlace = '';

    },

    showExampaperTitle (_title) {
      this.currentExampaperTitle = _title;
    },

    getCurrentItem (value) {

      // get exampaper name
      // for (let i = 0; i < this.ExampaperList.length; i++) {
      //   if (this.ExampaperList[i].id == this.currentExampaper) {
      //     this.showExampaperTitle(this.ExampaperList[i].name);
      //   }
      // }
      this.currentExampaper = this.ExampaperList[value].name;
      this.currentExampaperTitle = this.ExampaperList[value].name
      let epId = this.ExampaperList[value].epId;

      this.api_getStudentScore(epId);
    },
    updateScore (_obj) {
      this.api_updateStudentScore(_obj);
      // Axios.post(APIURL + 'deleteScore', {
      //   stuNumber: _obj.studentNumber,
      //   epId: _obj.epId,
      // }).then(res => {
      //   this.api_updateStudentScore(_obj);
      //   console.log(res);
      // })
    },

    editScore (row) {
      this.updateAllInfo = row;
      this.dialogVisible = true;
      this.writeScorePlace = row.scWriteScore;
      this.translateScorePlace = row.scTranslateScore;
      this.updateScoreList.writeScore = row.scWriteScore;
      this.updateScoreList.translateScore = row.scTranslateScore;
      this.updateScoreList.writeContent = row.Sub1Ans.split('*');
      this.updateScoreList.translateContent = row.Sub2Ans.split('*');
    },
    submitUpdate () {
      // update student score
      for (let i = 0; i < this.scoreList.length; i++) {
        if (this.scoreList[i].scStudentNumber == this.updateAllInfo.scStudentNumber) {
          this.scoreList[i].scWriteScore = this.updateScoreList.writeScore;
          this.updateAllInfo.scWriteScore = this.updateScoreList.writeScore;
          this.scoreList[i].scTranslateScore = this.updateScoreList.translateScore;
          this.updateAllInfo.scTranslateScore = this.updateScoreList.translateScore;
        }
      }
      this.updateScore(this.updateAllInfo);
      this.clearTempInfo();
      this.dialogVisible = false;
    },
    deleteScore (row) {
      this.api_deleteStudentScore(row);
      this.scoreList.splice(this.scoreList.indexOf(row), 1);
    },

  },
  filters: {
    writeScoreFilter (value) {

      const SCORERES = Number(value.scWriteScore) + Number(value.scTranslateScore);
      return SCORERES;
    },
    totalScoreFilter (value) {
      const SCORERES = Number(value.scListenScore) + Number(value.scReadScore) + Number(value.scWriteScore) + Number(value.scTranslateScore);
      return SCORERES
    }
  },
  mounted () {
    if (this.currentExampaper == '') {
      this.currentExampaperTitle = "Please Select Exampaper";
    }
  },
}
</script>
<style scoped>
.el-table {
  width: 100%;
  margin-top: 20px;
}

.el-row {
  height: 62.5px;
}
#ExamPaperTitle {
  text-align: left;
  margin-left: 20px;
}
#ScoreListTable >>> .el-select {
  /* margin-left: 180px; */
}
.el-select {
  width: 300px;
}
.el-divider {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
