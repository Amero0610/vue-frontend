<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:22:14
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-28 00:17:11
 * @FilePath: /vue-frontend/src/views/scoreManage/updateScore.vue
 * @email: vian8416@163.com
-->
<template>
  <div>

    <el-table :data="scoreList">
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
export default {
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
#ScoreListTable {
  width: 100%;
  margin-top: 10px;
}

#ExamPaperTitle {
  text-align: left;
}
.el-select {
  margin-right: 0px;
  width: 300px;
}
.el-divider {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
