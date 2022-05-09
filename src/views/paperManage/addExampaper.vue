<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:25:32
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-09 18:30:41
 * @FilePath: \vue-frontend\src\views\paperManage\addExampaper.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="addExampaperMainBox">
    <comPageTitle titleContent="Add Exampaper"></comPageTitle>
    <el-tabs type="border-card"
             tab-position="top">
      <el-tab-pane label="AddListenChooseQuestion">
        <el-scrollbar style="height: 100%">
          <comAddListeningChoose></comAddListeningChoose>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="AddReadingChooseQuestion">
        <el-scrollbar style="height: 100%"
                      wrapStyle="overflow-x:hidden;">
          <comAddReadingChoose></comAddReadingChoose>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="AddWriteQuestion">
        <comAddWrite></comAddWrite>
      </el-tab-pane>
      <el-tab-pane label="AddSpecificalChooseQuestion1">
        <el-scrollbar style="height: 100%">
          <comAddSubjectiveQuestion1></comAddSubjectiveQuestion1>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="AddSpecificalChooseQuestion2">
        <el-scrollbar style="height: 100%">
          <comAddSubjectiveQuestion2></comAddSubjectiveQuestion2>
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
  components: {
    comPageTitle,
    comAddListeningChoose,
    comAddReadingChoose,
    comAddWrite,
    comAddSubjectiveQuestion1,
    comAddSubjectiveQuestion2
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
</style>