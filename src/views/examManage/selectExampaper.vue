<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 18:37:38
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-17 21:11:09
 * @FilePath: /vue-frontend/src/views/examManage/selectExampaper.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="selectExampaperBox">
    <!-- <p id="pageTitle">Select Exampaper</p>
    <el-divider></el-divider> -->
    <comPageTitile titleContent="Select Exampaper"></comPageTitile>
    <el-select v-model="currentSelectExamPaper"
               @change="selectExamPaperChange"
               placeholder="Please Select Exampaper Type">
      <el-option label="CET-4"
                 value="4"></el-option>
      <el-option label="CET-6"
                 value="6"></el-option>
    </el-select>
    <el-empty description="Please Select Exampaper"
              v-show="!showExamPaperList.length"></el-empty>
    <el-table :data="showExamPaperList"
              :border="true"
              v-show="showExamPaperList.length">
      <el-table-column label="ExamPaperName"
                       class="TitleName"
                       prop="name">
      </el-table-column>
      <el-table-column label="Option"
                       width="150px">
        <template slot-scope="scope">
          <el-popconfirm title="Confirm to selelct this exampaper"
                         confirm-button-text="Confirm"
                         @confirm="selectExamPaper(scope.row)"
                         cancel-button-text="Cancel"
                         style="margin-left:10px">
            <el-button type="success"
                       plain
                       size="mini"
                       slot="reference">Exam</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//const APIURL = "http://123.57.7.40:5067/api/examination/";
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
import comPageTitile from '../../components/publicComponents/comPageTitile.vue'
export default {
  components: {
    comPageTitile
  },
  data: () => ({
    currentSelectExamPaper: '',

    examPaperList: [

    ],
    showExamPaperList: [
    ],
  }),
  created () {
    this.api_getExampaper('cet4', "4");
    this.api_getExampaper("cet6", "6");


  },
  methods: {

    setName () {
      for (let i = 0; i < this.examPaperList.length; i++) {
        let type = this.examPaperList[i].examPaperType;
        let year = this.examPaperList[i].year;
        let month = this.examPaperList[i].month;
        let index = this.examPaperList[i].index;
        this.examPaperList[i].name = "CET" + type + "  " + year + "." + month + " " + "No." + index;
      }
    },
    setList (_cetlist, _typeNumber) {
      let list = _cetlist.data.data;
      for (let i = 0; i < list.length; i++) {
        let tempObj = new Object();
        tempObj.name = "321";
        tempObj.epId = list[i].epId;
        tempObj.type = list[i].epType;
        tempObj.year = list[i].epYear;
        tempObj.month = list[i].epMonth;
        tempObj.index = list[i].epIndex;
        tempObj.examPaperType = _typeNumber;
        tempObj.id = this.examPaperList.length + 1;
        this.examPaperList.push(tempObj);
      }
      this.setName();
    },
    api_getExampaper (_epType, _typeNumber) {
      Axios.get(APIURL + 'getExampaper', {
        params: {
          epType: _epType
        }
      }).then(res => {
        this.setList(res, _typeNumber);
      }).catch(error => {
        console.log(error);
      })
    },
    getAudio (_type, _year, _month, _index) {
      let getUrl = 'http://123.57.7.40:5000/getcloudfile/list/' + _type;
      if (_index == "3") {
        _index = "2";
      }
      Axios({
        method: "GET",
        //http://123.57.7.40:5000/getcloudfile/list/cet6?month=12&year=2020&index=2
        url: getUrl,
        params: {
          year: _year,
          month: _month,
          index: _index
        },
      }).then((response) => {

        this.$store.state.currentExamingExampapeAudioAddr = response.data[1];
        console.log(this.$store.state.currentExamingExampapeAudioAddr);
      })
        .catch((error) => {
          console.log(error)
        })
    },
    api_getExampaperInfo (_epId) {
      Axios.get(APIURL + 'getAllData', {
        params: {
          epId: _epId,
        },
      })
        .then((res) => {
          this.$store.state.currentExamingExampaperInfo = res.data.data;
          //console.log(this.$store.state.currentReviewExamPaper);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectExamPaper (value) {
      this.$store.state.currentExamType = value.type;
      this.$store.state.currentExamInfo = value;
      this.getAudio(value.type, value.year, value.month, value.index);
      this.api_getExampaperInfo(value.epId);
      //this.getExamingExampaperInfo(value.type, value.year, value.month, value.index);
      this.$router.push("/exam")


    },
    selectExamPaperChange (value) {
      this.currentSelectExamPaper = value;
      this.showExamPaperList = this.examPaperList.filter(item => {
        return item.examPaperType === value;
      });
    },
    //get StudentScoreList
  },
}
</script>
<style scoped>
#selectExampaperBox {
  text-align: center;
}
#selectExampaperBox >>> .cell {
  /* font-size: 19px;
  font-family: 'Times New Roman' !important; */
}
.el-select {
  width: 330px;
  margin-top: 20px;
}
#pageTitle {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.el-divider {
  margin-top: 21px;
  margin-bottom: 20px;
}
.el-table {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.el-button {
  width: 100px;
}
</style>