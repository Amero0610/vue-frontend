<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:25:14
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 15:03:47
 * @FilePath: /vue-frontend/src/views/paperManage/showExampaperList.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="selectExampaperBox">
    <!-- <p id="pageTitle">Select Exampaper</p>
    <el-divider></el-divider> -->
    <comPageTitile titleContent="试卷列表"></comPageTitile>
    <el-select v-model="currentSelectExamPaper"
               @change="selectExamPaperChange"
               placeholder="请选择试卷的类型">
      <el-option label="CET-4"
                 value="4"></el-option>
      <el-option label="CET-6"
                 value="6"></el-option>
    </el-select>
    <el-empty description="请选择试卷"
              v-show="!showExamPaperList.length"></el-empty>
    <el-table :data="showExamPaperList"
              :border="true"
              v-show="showExamPaperList.length">
      <el-table-column label="试卷名"
                       prop="name">
      </el-table-column>
      <el-table-column label="操作"
                       width="250px">
        <template slot-scope="scope">
          <el-popconfirm title="是否选择该试卷预览？"
                         confirm-button-text="确认"
                         @confirm="reviewExamPaper(scope.row)"
                         cancel-button-text="Cancel"
                         style="margin-left:10px">
            <el-button type="success"
                       plain
                       size="mini"
                       slot="reference">预览</el-button>
          </el-popconfirm>

          <el-button class="optionBtn2"
                     @click="deleteExamPaper(scope.row)"
                     type="danger"
                     plain
                     size="mini"
                     slot="reference">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Axios from 'axios';
const APIURL = "http://123.57.7.40:5067/api/examination/";
import router from '@/router';
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
    api_delteExampaper (_epId) {
      Axios.post(APIURL + 'deleteExampaper', {

        epId: _epId

      }).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    },
    api_getExampaperInfo (_epId) {
      Axios.get(APIURL + 'getAllData', {
        params: {
          epId: _epId,
        },
      })
        .then((res) => {
          this.$store.state.currentReviewExamPaper = res.data.data;
          router.push("reviewexampaper");
          //console.log(this.$store.state.currentReviewExamPaper);
        })
        .catch((err) => {
          return err;
        });
    },
    reviewExamPaper (value) {
      this.$store.state.currentReviewExamPaper = value;
      this.api_getExampaperInfo(value.epId);



    },
    selectExamPaperChange (value) {

      this.currentSelectExamPaper = value;
      this.showExamPaperList = this.examPaperList.filter(item => {
        return item.examPaperType === value;
      });

    },
    showDeleteConfrim (value) {
      this.$confirm("This option will delete all of date about this exampaper", 'Tip', {
        type: 'warning'
      }).then(() => {
        let index = 0;
        for (let i = 0; i < this.examPaperList.length; i++) {
          if (this.examPaperList[i].id === value.id) {
            index = i;
            break;
          }
        }
        this.examPaperList.splice(index, 1);
        this.showExamPaperList = this.examPaperList.filter(item => {
          return item.examPaperType === this.currentSelectExamPaper;
        });
        this.api_delteExampaper(value.epId);
        this.$message({
          message: "Delete success",
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: "Option Cancel",
          type: 'info'
        })
      })
    },
    deleteExamPaper (value) {
      //console.log(value)
      this.showDeleteConfrim(value)
      //delete this item in examPaperList

    }
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
.optionBtn2 {
  margin-left: 10px;
}
</style>
