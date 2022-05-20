<!--
 * @Author: AmeroL
 * @Date: 2022-04-20 21:44:50
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-19 00:22:54
 * @FilePath: /vue-frontend/src/views/studentManage/studentScore.vue
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
                       prop="totalScore">
        <template slot-scope="scope">{{scope.row|totalScoreFilter}}</template>
      </el-table-column>

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
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
let that;
import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    activeNames: '1',
    popoveriable: false,
    writeScorePlace: '',
    translateScorePlace: '',
    dialogVisible: false,
    updateAllInfo: {},
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
    ]

  },
  created () {
    that = this;
    this.api_getScore();
  },
  methods: {
    formatName (_data) {

      let _str = "";
      _str += _data.epType.toUpperCase() + " " + _data.epYear + '.' + _data.epMonth + ' No.' + _data.epIndex;
      return _str;
    },
    showSuccessMessage () {
      that.$message({
        message: 'Success',
        type: 'success'
      })
    },
    pushScoreList (_list) {
      this.studentScoreList = [];
      for (let i = 0; i < _list.length; i++) {
        let obj = new Object();
        obj.scStudentNumber = _list[i].stuNumber;
        obj.listenScore = _list[i].scListen;
        obj.readScore = _list[i].scRead;
        obj.writeScore = _list[i].scWrite;
        obj.translateScore = _list[i].scTranslate;
        obj.totalScore = _list[i].scSum;
        obj.Sub1Ans = _list[i].scSubject1Ans;
        obj.Sub2Ans = _list[i].scSubject2Ans;
        obj.scId = _list[i].scId;
        obj.epId = _list[i].epId;
        obj.examPaperName = "";
        this.api_getExampaperInfo(obj.epId, i);
        //console.log(obj)
        this.studentScoreList.push(obj);
      }
    },
    api_updateScore (_obj) {
      _obj.totalScore = Number(_obj.listenScore) + Number(_obj.readScore) + Number(_obj.writeScore) + Number(_obj.translateScore);

      Axios.post(APIURL + "updateScore", {
        stuNumber: _obj.scStudentNumber,
        epId: _obj.epId,
        scWrite: _obj.writeScore,
        scListen: _obj.listenScore,
        scRead: _obj.readScore,
        scTranslate: _obj.translateScore,
        scSubject1Ans: _obj.Sub1Ans,
        scSubject2Ans: _obj.Sub2Ans,
        scSum: _obj.totalScore,
      })
        .then(response => {
          console.log(response);
          that.showSuccessMessage();
          that.api_getScore();
        })
        .catch(error => {
          console.log(error);
        })
    },
    api_getExampaperInfo (_epId, _index) {
      Axios.get(APIURL + 'getExampaperbyId/', {
        params: {
          epId: _epId,
        }
      }).then(res => {

        this.studentScoreList[_index].examPaperName = this.formatName(res.data.data[0])
      })
    },
    api_getScore () {
      Axios.get(APIURL + "getScore/", {
        params: {
          stuNumber: this.$route.params.studentNumber
        }
      }).then(res => {
        let remoteList = res.data.data;
        this.pushScoreList(remoteList)
      })
    },
    api_deleteScore (_stuNumber, _epId) {
      Axios.post(APIURL + 'deleteScore', {
        stuNumber: _stuNumber,
        epId: _epId,
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    editScore (row) {
      this.updateAllInfo = row;
      this.dialogVisible = true;
      this.updateScoreList.writeContent = row.Sub1Ans.split("*");
      this.updateScoreList.translateContent = row.Sub2Ans.split("*");
      this.updateName = row.examPaperName;
      this.updateScoreList.writeScore = row.writeScore;
      this.updateScoreList.translateScore = row.translateScore;
      this.writeScorePlace = row.writeScore;
      this.translateScorePlace = row.translateScore;
    },
    deleteScore (row) {
      console.log(row);
      this.api_deleteScore(row.scStudentNumber, row.epId);
      this.popoveriable = true;
      this.studentScoreList.splice(this.studentScoreList.indexOf(row), 1);
      // delete data from server
    },
    getUpdateItem () {
      for (let i = 0; i < this.studentScoreList.length; i++) {
        if (this.updateAllInfo.studentNumber == this.studentScoreList[i].studentNumber) {
          return i;
        }
      }
    },
    submitUpdate () {
      this.dialogVisible = false;
      let index = this.getUpdateItem();
      console.log(index)
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

      //this.api_updateScore(this.updateAllInfo)
      let totalScore = Number(this.updateScoreList.writeScore) + Number(this.updateScoreList.translateScore) + Number(this.studentScoreList[index].readScore) + Number(this.studentScoreList[index].listenScore);
      this.studentScoreList[index].writeScore = this.updateScoreList.writeScore;
      this.studentScoreList[index].translateScore = this.updateScoreList.translateScore;
      this.studentScoreList[index].totalScore = totalScore
      this.api_updateScore(this.studentScoreList[index])
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
    },
    totalScoreFilter (value) {
      const SCORERES = Number(value.listenScore) + Number(value.readScore) + Number(value.writeScore) + Number(value.translateScore);
      return SCORERES
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