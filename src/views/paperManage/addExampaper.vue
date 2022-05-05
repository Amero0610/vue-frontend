<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:25:32
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-06 00:04:50
 * @FilePath: /vue-frontend/src/views/paperManage/addExampaper.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="addExampaperMainBox">
    <comPageTitle titleContent="Add Exampaper"></comPageTitle>
    <el-tabs type="border-card"
             tab-position="top">
      <el-tab-pane label="AddChooseQuestion">
        <el-scrollbar style="height: 100%">
          <comAddNormalChoose></comAddNormalChoose>
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
import comAddNormalChoose from "../../components/addExamPaper/comAddNormalChoose.vue";
import comAddWrite from "../../components/addExamPaper/addWrite.vue";
import comAddSubjectiveQuestion1 from "../../components/addExamPaper/AddSubjectiveQuestion1.vue"
import comAddSubjectiveQuestion2 from "../../components/addExamPaper/AddSubjectiveQuestion2.vue"

export default {
  components: {
    comPageTitle,
    comAddNormalChoose,
    comAddWrite,
    comAddSubjectiveQuestion1,
    comAddSubjectiveQuestion2
  }
}
</script>
<style scoped>
#addExampaperMainBox {
  text-align: center;
}
#addExampaperMainBox >>> .el-tabs {
}
</style>