<!--
 * @Author: AmeroL
 * @Date: 2022-04-29 00:40:45
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-29 01:33:38
 * @FilePath: /vue-frontend/src/components/publicComponents/comPageTitile.vue
 * @email: vian8416@163.com
-->
<template>

  <div id="comPageTitle">
    <p id="title">{{titleContent}} </p>
    <el-divider></el-divider>

  </div>
</template>
<script>
export default {
  name: 'comPageTitile',
  props: {
    titleContent: {
      //   type: String,
      //   default: 'test'
    }
  },
}
</script>
<style scoped>
#comPageTitle {
  text-align: center;
  height: 62.5px;
}
#title {
  font-size: 20px;
  line-height: 61.5px;
  font-weight: bold;
}
.el-divider {
  color: black;
  position: relative;
  bottom: 0px;
  height: 1px;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>