<!--
 * @Author: AmeroL
 * @Date: 2022-04-20 21:44:50
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-21 00:25:50
 * @FilePath: \vue-frontend\src\views\studentManage\studentScore.vue
 * @email: vian8416@163.com
-->

<template>
  <div>
    <comHeader></comHeader>
    this is student score!;
    <el-dialog title="UpdateScore"
               :visible.sync="dialogVisible">
      <div id="scoreInputBox">
        <el-form label-position="right"
                 label-width="150px"
                 v-model="updateScoreList">
          <el-form-item label="WriteScore:">
            <el-input v-model="updateScoreList.writeScore"></el-input>
          </el-form-item>
          <el-form-item label="TranslateScore:">
            <el-input v-model="updateScoreList.translateScore"></el-input>
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

    <p>StudentNumber: {{this.$route.params.studentNumber}}</p>
    <el-button type="primart"
               plain
               @click="toStudentListPage"> StudentListPage </el-button>

    <el-table :data="studentScoreList">
      <el-table-column label="Name"
                       prop="examPaperName"></el-table-column>
      <el-table-column label="ListenScore"
                       prop="listenScore"></el-table-column>
      <el-table-column label="ReadScore"
                       prop="readScore"></el-table-column>
      <el-table-column label="WriteScore"
                       prop="writeScore">
        <template slot-scope="scope">{{scope.row|writeScoreFilter}}</template>

      </el-table-column>
      <el-table-column label="TotalScore"
                       prop="totalScore"></el-table-column>
      <el-table-column label="Operation">

        <template slot-scope="scope">
          <el-button @click="editScore(scope.row)"
                     type="primary"
                     size="mini">Edit</el-button>
          <el-button @click="deleteScore(scope.row)"
                     type="danger"
                     plain
                     size="mini">Delete</el-button>
        </template>

      </el-table-column>

    </el-table>
  </div>
</template>
<script>
//let that;
import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    dialogVisible: false,
    updateScoreList: [
      {
        writeScore: "",
        translateScore: "",
      }
    ],
    updateName: "",
    studentScoreList: [
      {
        examPaperName: "examPaperName1",
        listenScore: "listenScore1",
        readScore: "readScore1",
        writeScore: "writeScore1",
        translateScore: "translateScore1",
        totalScore: "totalScore1",
      },
      {
        examPaperName: "examPaperName2",
        listenScore: "listenScore2",
        readScore: "readScore2",
        writeScore: "writeScore2",
        translateScore: "translateScore2",
        totalScore: "totalScore2",
      },
    ]
  }),
  components: {
    comHeader,
  },
  beforeCreate () {
    //that = this;
  },
  methods: {
    editScore (row) {
      this.dialogVisible = true;
      this.updateName = row.examPaperName;
      this.updateScoreList.writeScore = row.writeScore;
      this.updateScoreList.translateScore = row.translateScore;
    },
    deleteScore (row) {
      console.log(row);
      console.log(this.$route.params.studentNumber)
    },
    getUpdateItem (_name) {
      for (let i = 0; i < this.studentScoreList.length; i++) {
        if (this.studentScoreList[i].examPaperName == _name) {
          return i;
        }
      }
    },
    submitUpdate () {
      this.dialogVisible = false;
      let index = this.getUpdateItem(this.updateName);
      this.studentScoreList[index].writeScore = this.updateScoreList.writeScore;
      this.studentScoreList[index].translateScore = this.updateScoreList.translateScore;

    },
    toStudentListPage () {
      this.$router.push(
        {
          name: "StudentManage",
        }
      )
    }
  },
  filters: {
    writeScoreFilter (value) {
      console.log(value);
      let resScore = value.writeScore + value.translateScore;
      return resScore;
    }
  }
};
</script>
