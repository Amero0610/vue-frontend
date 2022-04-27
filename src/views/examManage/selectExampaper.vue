<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 18:37:38
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-28 01:28:35
 * @FilePath: /vue-frontend/src/views/examManage/selectExampaper.vue
 * @email: vian8416@163.com
-->
<template>
  <div>
    <p id="pageTitle">Select Exampaper</p>
    <el-divider></el-divider>
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
                       prop="name"></el-table-column>
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
export default {
  data: () => ({
    currentSelectExamPaper: '',

    examPaperList: [
      {
        name: '4paper1',
        examPaperType: '4',
        id: '1'
      },
      {
        name: '4paper2',
        examPaperType: '4',
        id: '2'
      },
      {
        name: '4paper3',
        examPaperType: '4',
        id: '3'
      },
      {
        name: '6paper1',
        examPaperType: '6',
        id: '1'
      },
      {
        name: '6paper2',
        examPaperType: '6',
        id: '2'
      },
      {
        name: '6paper3',
        examPaperType: '6',
        id: '3'
      }
    ],
    showExamPaperList: [
    ],
  }),
  methods: {
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
.el-select {
  width: 330px;
}
#pageTitle {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.el-divider {
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-table {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.el-button {
  width: 100px;
}
</style>