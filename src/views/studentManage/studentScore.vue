<!--
 * @Author: AmeroL
 * @Date: 2022-04-20 21:44:50
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-11 21:41:44
 * @FilePath: \vue-frontend\src\views\studentManage\studentScore.vue
 * @email: vian8416@163.com
-->

<template>
  <div id="studentScorePage">
    <comHeader></comHeader>

    <el-page-header @back="goBack">
    </el-page-header>

    <el-dialog title="UpdateScore"
               :visible.sync="dialogVisible">
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
      <div id="scoreInputBox">
        <el-form label-position="right"
                 label-width="150px"
                 v-model="updateScoreList"
                 :status-icon="true">
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
    <!-- 
    <p>StudentNumber: {{this.$route.params.studentNumber}}</p> -->
    <!-- <el-button type="primart"
               plain
               @click="toStudentListPage"> StudentListPage </el-button> -->

    <el-table :data="studentScoreList"
              height="800px">
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
//let that;
import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    activeNames: '1',
    popoveriable: false,
    writeScorePlace: '',
    translateScorePlace: '',
    dialogVisible: false,
    updateScoreList:
    {
      writeContent: ["2", "2", "3"],
      translateContent: ["2", "2", "3"],
      writeScore: "",
      translateScore: "",
    },
    updateName: "",
    studentScoreList: [

    ]
  }),
  components: {
    comHeader,
  },
  beforeCreate () {
    //that = this;
  },
  beforeMount () {
    // init data from server
    this.studentScoreList = [
      {
        examPaperName: "examPaperName1",
        listenScore: "listenScore1",
        readScore: "readScore1",
        writeScore: "122",
        translateScore: "123",
        totalScore: "totalScore1",
      },
      {
        examPaperName: "examPaperName2",
        listenScore: "listenScore2",
        readScore: "readScore2",
        writeScore: "124",
        translateScore: "125",
        totalScore: "totalScore2",
      },
    ]

  },
  methods: {
    editScore (row) {
      this.dialogVisible = true;
      this.updateName = row.examPaperName;
      this.writeScorePlace = row.writeScore;
      this.translateScorePlace = row.translateScore;
    },
    deleteScore (row) {
      this.popoveriable = true;
      this.studentScoreList.splice(this.studentScoreList.indexOf(row), 1);
      // delete data from server
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
      // check is number
      if (isNaN(this.updateScoreList.writeScore) || isNaN(this.updateScoreList.translateScore)) {
        this.$message({
          message: 'Please input number',
          type: 'warning'
        });
        this.updateScoreList.writeScore = "";
        this.updateScoreList.translateScore = "";
        return;
      }
      this.studentScoreList[index].writeScore = this.updateScoreList.writeScore;
      this.studentScoreList[index].translateScore = this.updateScoreList.translateScore;
      this.updateScoreList.writeScore = "";
      this.updateScoreList.translateScore = "";

      // upload date to server

    },
    goBack () {
      this.$router.go(-1);
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

      let resScore = Number(value.writeScore) + Number(value.translateScore);
      return resScore;
    }
  }
};
</script>
<style scoped>
#studentScorePage >>> .el-page-header__title {
  font-size: 17px;
  margin-top: 10px;
}
#studentScorePage >>> .el-icon-back {
  font-size: 20px;
  margin-left: 5px;
  margin-top: 10px;
}
#studenScorePage >>> .el-page-header__title::after,
#studentScorePage >>> .el-page-header__left::after {
  display: none;
}
</style>