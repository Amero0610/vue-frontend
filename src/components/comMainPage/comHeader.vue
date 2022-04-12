<!--
 * @Author: AmeroL
 * @Date: 2022-04-08 21:50:40
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-08 22:34:56
 * @FilePath: \vue-frontend\src\components\comMainPage\comHeader.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="Boardbox">
    <el-row type="flex" align="middle" id="Headerrow" justify="space-between">
      <el-col :span="8">
        <div id="Headertitle">
          <span> This is my management system.</span>
        </div>
      </el-col>

      <el-col :span="10" id="headerUsernameArea">
        <el-row type="flex" align="middle" justify="end">
          <el-col :span="7">
            <div id="HeaderPersonNamw">
              <span id="HeaderPersonName">{{
                this.$store.state.username
              }}</span>
            </div></el-col
          >
          <el-col :span="2">
            <div id="HeaderPersonalIcon">
              <el-avatar size="large" :src="avatarIconSrc"></el-avatar></div
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<style>
#headerUsernameArea {
  padding-right: 30px;
}
#Headerrow {
  height: 60px;
}
#Boardbox {
  width: 100%;
  height: 60px;
  background-color: #409eff;
  color: white;
}
#HeaderPersonalIcon {
}
#Headertitle {
  text-align: left;
  padding-left: 5%;
  font-size: large;
}
#HeaderPersonNamw {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: large;
}
</style>
<script>
function test(val) {
  this.username = val;
  console.log('Board call');
  console.log(this.username);
}
export default {
  test,
  props: {},
  data() {
    return {
      avatarIconSrc: require('../../assets/PersonalIcon.png'),
    };
  },
};
</script>
