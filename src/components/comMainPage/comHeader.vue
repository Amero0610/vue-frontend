<!--
 * @Author: AmeroL
 * @Date: 2022-04-08 21:50:40
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-24 14:22:46
 * @FilePath: /vue-frontend/src/components/comMainPage/comHeader.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="Boardbox">
    <el-row type="flex"
            align="middle"
            id="Headerrow"
            justify="space-between">
      <el-col :span="8">
        <div id="Headertitle">
          <span>大学英语四六级模拟考试系统</span>
        </div>
      </el-col>

      <el-col :span="10"
              id="headerUsernameArea">
        <el-row type="flex"
                align="middle"
                justify="end">
          <el-col :span="5">
            <div id="HeaderPersonNamw">
              <span id="HeaderPersonName">{{
                this.$store.state.username
              }}</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div id="HeaderPersonalIcon">
              <!-- <el-avatar size="large"
                         :src="avatarIconSrc"></el-avatar> -->
              <el-button type="danger"
                         @click="ExitSystem"
                         plain>退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
#Boardbox #headerUsernameArea {
  padding-right: 30px;
}
#Boardbox #Headerrow {
  height: 60px;
}
#Boardbox {
  width: 100%;
  height: 60px;
  background-color: #3542fa;
  color: white;
}
#Boardbox #HeaderPersonalIcon {
}
#HeaderPersonalIcon >>> .el-button {
  width: 100%;
}
#Boardbox #Headertitle {
  text-align: left;
  padding-left: 5%;
  font-size: large;
}
#Boardbox #HeaderPersonNamw {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: large;
}
</style>
<script>
function test (val) {
  this.username = val;
  console.log('Board call');
  console.log(this.username);
}
export default {
  test,
  props: {},
  data () {
    return {
      avatarIconSrc: require('../../assets/PersonalIcon.png'),
    };
  },
  methods: {
    deleteCookies () {
      this.$cookies.remove('password');
      this.$cookies.remove('username');
      this.$cookies.remove('permission');
      this.$cookies.remove('loginflag');
      this.$cookies.remove('stuNumber');
    },
    ExitSystem () {
      this.$confirm("Are you exit this System?", "Tip").then(() => {
        this.deleteCookies();
        // this.$store.state.username = 'Nologin!';
        // this.$store.state.userLoginStuNumber = '';
        // this.$store.state.loginflag = false;
        // this.$store.state.permission = 0;
        this.$router.push('/userlogin');
      }).catch(() => {
        this.$message('Cancel');
      });
    }
  }

};
</script>
