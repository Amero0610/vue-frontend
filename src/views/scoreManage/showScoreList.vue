<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:22:08
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-11 21:43:56
 * @FilePath: \vue-frontend\src\views\scoreManage\showScoreList.vue
 * @email: vian8416@163.com
-->
<template>
  <div>
    <el-dialog title="UpdateScore"
               :visible.sync="dialogVisible">
      <div class="studentAnsContent">
        <el-collapse v-model="activeNames"
                     accordion>
          <el-collapse-item title="Write Content"
                            name="1">
            <p class="AnsContent"
               v-for="(item,index) in updateScoreList.writeContent"
               :key="index">{{item}}</p>
          </el-collapse-item>
          <el-collapse-item title="Translate Content"
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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="submitUpdate">Confirm</el-button>
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
                     placeholder="Please Select Exampaper"
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
                       prop="scStudentNumber">
        <template slot-scope="scope">{{scope.row|writeScoreFilter}}</template>
      </el-table-column>
      <el-table-column label="scTotalScore"
                       prop="scTotalScore"></el-table-column>
      <el-table-column label="scTime"
                       prop="scTime"></el-table-column>
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
      writeScore: "",
      translateScore: "",
    },
    scoreList: [
      {
        scStudentNumber: '20184140',
        scListenScore: '22',
        scReadScore: '21',
        scWriteScore: '33',
        scTranslateScore: '44',
        scTotalScore: '66',
        scTime: '2020-04-09',
      },
      {
        scStudentNumber: '20180000',
        scListenScore: '222',
        scReadScore: '212',
        scWriteScore: '333',
        scTranslateScore: '414',
        scTotalScore: '662',
        scTime: '2020-04-19',
      },

    ],
    currentExampaper: '',
    ExampaperList: [
      {
        id: '1',
        name: 'Exampaper1',
      },
      {
        id: '2',
        name: 'Exampaper2',
      },
      {
        id: '3',
        name: 'Exampaper3',
      },
    ],
  }),
  methods: {
    clearTempInfo () {
      this.updateScoreList.writeScore = '';
      this.updateScoreList.translateScore = '';
      this.writeScorePlace = '';
      this.translateScorePlace = '';

    },
    showExampaperTitle (_title) {
      this.currentExampaperTitle = _title;
    },

    getCurrentItem () {
      // get exampaper name
      for (let i = 0; i < this.ExampaperList.length; i++) {
        if (this.ExampaperList[i].id == this.currentExampaper) {
          this.showExampaperTitle(this.ExampaperList[i].name);
        }
      }
    },
    editScore (row) {
      this.dialogVisible = true;
      this.writeScorePlace = row.scWriteScore;
      this.translateScorePlace = row.scTranslateScore;
      this.updateStudentNumber = row.scStudentNumber;
    },
    submitUpdate () {
      // update student score
      for (let i = 0; i < this.scoreList.length; i++) {
        if (this.scoreList[i].scStudentNumber == this.updateStudentNumber) {
          this.scoreList[i].scWriteScore = this.updateScoreList.writeScore;
          this.scoreList[i].scTranslateScore = this.updateScoreList.translateScore;
        }
      }
      this.clearTempInfo();
      this.dialogVisible = false;
    },
    deleteScore (row) {
      this.popoveriable = true;
      this.scoreList.splice(this.scoreList.indexOf(row), 1);
    },

  },
  filters: {
    writeScoreFilter (value) {
      const SCORERES = Number(value.scWriteScore) + Number(value.scTranslateScore);
      return SCORERES;
    },
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
