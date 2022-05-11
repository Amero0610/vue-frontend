<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 18:37:38
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-11 19:19:10
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
import Axios from "axios";
import comPageTitile from '../../components/publicComponents/comPageTitile.vue'
export default {
  components: {
    comPageTitile
  },
  data: () => ({
    currentSelectExamPaper: '',

    examPaperList: [
      {
        name: '4paper1',
        type: 'cet4',
        year: '2019',
        month: '12',
        index: '02',
        examPaperType: '4',
        id: '1'
      },
      {
        name: '4paper2',
        type: '',
        year: '',
        month: '',
        index: '',
        examPaperType: '4',
        id: '2'
      },
      {
        name: '4paper3',
        type: '',
        year: '',
        month: '',
        index: '',
        examPaperType: '4',
        id: '3'
      },
      {
        name: '6paper1',
        type: '',
        year: '',
        month: '',
        index: '',
        examPaperType: '6',
        id: '1'
      },
      {
        name: '6paper2',
        type: '',
        year: '',
        month: '',
        index: '',
        examPaperType: '6',
        id: '2'
      },
      {
        name: '6paper3',
        type: '',
        year: '',
        month: '',
        index: '',
        examPaperType: '6',
        id: '3'
      }
    ],
    showExamPaperList: [
    ],
  }),
  created () {
    for (let i = 0; i < this.examPaperList.length; i++) {
      let type = this.examPaperList[i].examPaperType;
      let year = this.examPaperList[i].year;
      let month = this.examPaperList[i].month;
      let index = this.examPaperList[i].index;
      this.examPaperList[i].name = "CET" + type + "  " + year + "." + month + " " + "No." + index;
    }
  },
  methods: {
    getAudio (_type, _year, _month, _index) {
      Axios({
        method: "POST",
        url: "http://123.57.7.40:5000/downfile/d",
        params: {
          year: _year,
          exam: _type,
          month: _month,
          index: _index
        },
      }).then((response) => {
        console.log(response.data);
      })
    },
    selectExamPaper (value) {
      this.getAudio(value.type, value.year, value.month, value.index);
      console.log(value)

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