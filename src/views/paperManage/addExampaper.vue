<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:25:32
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-11 19:41:25
 * @FilePath: /vue-frontend/src/views/paperManage/addExampaper.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="addExampaperMainBox">
    <el-dialog title="Input ExamPaper Information"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :visible.sync="dialogFormVisible">
      <el-form :model="paperInfoForm"
               label-width="90px"
               label-position="left">
        <el-form-item label="Type">
          <el-select v-model="paperInfoForm.type"
                     placeholder="">
            <el-option label="CET-4"
                       value="cet4"></el-option>
            <el-option label="CET-6"
                       value="cet6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Year">
          <el-select v-model="paperInfoForm.year"
                     placeholder="">
            <el-option v-for="(item ,index) in yearList"
                       :key="index"
                       :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Month">
          <el-select v-model="paperInfoForm.month"
                     placeholder="">
            <el-option label="6"
                       value="06"></el-option>
            <el-option label="12"
                       value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="index">
          <el-select v-model="paperInfoForm.index"
                     placeholder="">
            <el-option label="1"
                       value="01"></el-option>
            <el-option label="2"
                       value="02"></el-option>
            <el-option label="3"
                       value="03"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="success"
                   plain
                   round
                   @click="submitExamPaperinfo">Confirm</el-button>
      </div>
    </el-dialog>
    <comPageTitle titleContent="Add Exampaper"></comPageTitle>
    <el-tabs type="border-card"
             tab-position="top">
      <el-tab-pane label="AddListenChooseQuestion">
        <el-scrollbar style="height: 100%">
          <comAddListeningChoose :paperInfo=paperInfoForm></comAddListeningChoose>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="AddReadingChooseQuestion">
        <el-scrollbar style="height: 100%"
                      wrapStyle="overflow-x:hidden;">
          <comAddReadingChoose :paperInfo=paperInfoForm></comAddReadingChoose>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="AddWriteQuestion">
        <comAddWrite :paperInfo=paperInfoForm></comAddWrite>
      </el-tab-pane>
      <el-tab-pane label="AddSpecificalChooseQuestion1">
        <el-scrollbar style="height: 100%">
          <comAddSubjectiveQuestion1 :paperInfo=paperInfoForm></comAddSubjectiveQuestion1>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="AddSpecificalChooseQuestion2">
        <el-scrollbar style="height: 100%">
          <comAddSubjectiveQuestion2 :paperInfo=paperInfoForm></comAddSubjectiveQuestion2>
        </el-scrollbar>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
import comPageTitle from "../../components/publicComponents/comPageTitile.vue";
import comAddListeningChoose from "../../components/addExamPaper/comAddListeningChoose.vue";
import comAddReadingChoose from "../../components/addExamPaper/comAddReadingChoose.vue";
import comAddWrite from "../../components/addExamPaper/addWrite.vue";
import comAddSubjectiveQuestion1 from "../../components/addExamPaper/AddSubjectiveQuestion1.vue"
import comAddSubjectiveQuestion2 from "../../components/addExamPaper/AddSubjectiveQuestion2.vue"

export default {
  data: () => ({
    yearList: ['2020', '2019', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'],
    dialogFormVisible: true,
    paperInfoForm: {
      type: '',
      year: '',
      month: '',
      index: ''
    },
  }),
  components: {
    comPageTitle,
    comAddListeningChoose,
    comAddReadingChoose,
    comAddWrite,
    comAddSubjectiveQuestion1,
    comAddSubjectiveQuestion2
  },
  methods: {
    submitExamPaperinfo () {
      this.dialogFormVisible = false;
      console.log(this.paperInfoForm)
    }
  }
}
</script>
<style scoped>
#addExampaperMainBox .el-tab-pane >>> .el-scrollbar__wrap {
  margin-bottom: 0px !important;
  overflow-x: hidden;
}
#addExampaperMainBox {
  text-align: center;
}
#addExampaperMainBox >>> .el-tabs {
}
#addExampaperMainBox >>> .el-tabs__content {
  /* height: 75vh; */
  height: 75vh;
}
.dialog-footer {
  text-align: center;
}
.dialog-footer >>> .el-button {
  width: 40%;
}
</style>