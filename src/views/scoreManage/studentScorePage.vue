<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:22:14
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-29 01:04:36
 * @FilePath: /vue-frontend/src/views/scoreManage/studentScorePage.vue
 * @email: vian8416@163.com
 * @Show Score at student page
-->
<template>
  <div>
    <comPageTitile titleContent="Student Score Page"></comPageTitile>
    <el-table :data="scoreList"
              :border="true">
      <el-table-column label="ExamPaperName"
                       prop="scExampaperName"></el-table-column>
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
    </el-table>
  </div>
</template>
<script>
import comPageTitile from '../../components/publicComponents/comPageTitile.vue';
export default {
  components: {
    comPageTitile
  },
  data: () => ({
    scoreList: [
      {
        scExampaperName: 'dsa',
        scListenScore: '22',
        scReadScore: '21',
        scWriteScore: '33',
        scTranslateScore: '44',
        scTotalScore: '66',
        scTime: '2020-04-09',
      },
      {
        scExampaperName: 'dsa',
        scListenScore: '222',
        scReadScore: '212',
        scWriteScore: '333',
        scTranslateScore: '414',
        scTotalScore: '662',
        scTime: '2020-04-19',
      },

    ],


  }),
  methods: {
    //get StudentScoreList



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
