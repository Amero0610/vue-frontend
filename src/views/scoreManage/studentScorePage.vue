<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:22:14
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 14:44:58
 * @FilePath: /vue-frontend/src/views/scoreManage/studentScorePage.vue
 * @email: vian8416@163.com
 * @Show Score at student page
-->
<template>
  <div>
    <comPageTitile titleContent="成绩列表"></comPageTitile>
    <el-table :data="scoreList"
              :border="true">
      <el-table-column label="试卷名"
                       prop="scExampaperName"></el-table-column>
      <el-table-column label="听力成绩"
                       prop="scListenScore"></el-table-column>
      <el-table-column label="阅读成绩"
                       prop="scReadScore"></el-table-column>
      <el-table-column label="写作成绩"
                       prop="scStudentNumber">
        <template slot-scope="scope">{{scope.row|writeScoreFilter}}</template>
      </el-table-column>
      <el-table-column label="总成绩"
                       prop="scTotalScore"></el-table-column>
      <!-- <el-table-column label="scTime"
                       prop="scTime"></el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
import comPageTitile from '../../components/publicComponents/comPageTitile.vue';
export default {
  components: {
    comPageTitile
  },
  data: () => ({
    scoreList: [
      // {
      //   scExampaperName: 'CET4-2019-12-01',
      //   scListenScore: '22',
      //   scReadScore: '21',
      //   scWriteScore: '19',
      //   scTranslateScore: '30',
      //   scTotalScore: '92',
      //   scTime: '2020-04-09',
      // },
      // {
      //   scExampaperName: 'CET4-2019-12-02',
      //   scListenScore: '18',
      //   scReadScore: '45',
      //   scWriteScore: '18',
      //   scTranslateScore: '16',
      //   scTotalScore: '97',
      //   scTime: '2020-04-19',
      // },

    ],

  }),
  created () {
    this.api_getStudentScoreList(this.$store.state.userLoginStuNumber)

  },
  methods: {
    formatName (_data) {

      let _str = "";
      _str += _data.epType.toUpperCase() + " " + _data.epYear + '.' + _data.epMonth + ' No.' + _data.epIndex;
      return _str;
    },
    setName (_obj) {

      Axios.get(APIURL + 'getExampaperbyid', {
        params: {
          epId: _obj.epId
        }
      }).then(res => {
        //console.log(res.data.data)
        _obj.scExampaperName = this.formatName(res.data.data[0]);
        // /_obj.scExampaperName = res.data.data[0].epIndex;
      })

    },
    setScoreList (_scoreList) {
      for (let i = 0; i < _scoreList.length; i++) {
        let obj = new Object();
        obj.epId = _scoreList[i].epId
        obj.scExampaperName = "djsakl";
        obj.scListenScore = _scoreList[i].scListen;
        obj.scReadScore = _scoreList[i].scRead;
        obj.scWriteScore = _scoreList[i].scWrite;
        obj.scTranslateScore = _scoreList[i].scTranslate;
        obj.scTotalScore = _scoreList[i].scSum;
        obj.scTime = "";

        this.scoreList.push(obj);
        this.setName(this.scoreList[i])

      }

    },
    //get StudentScoreList
    api_getStudentScoreList (_stuNumber) {
      Axios.get(APIURL + 'getScore', {
        params: {
          stuNumber: _stuNumber
        }
      }).then(res => {
        //console.log(res.data.data);
        let remoteList = res.data.data;
        console.log(remoteList)
        this.setScoreList(remoteList);
      }).catch(err => {
        console.log(err)
      })

    }



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
  margin-top: 20px;
}

#ExamPaperTitle {
  text-align: left;
}
.el-select {
  margin-right: 0px;
  width: 300px;
}
</style>
