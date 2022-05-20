<!--
 * @Author: AmeroL
 * @Date: 2022-04-08 01:30:40
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-21 00:44:17
 * @FilePath: /vue-frontend/src/App.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  created () {
    if (!this.checkCookie()) {
      this.$router.push('/userlogin');
      this.$message({
        message: "Please Login First!",
        type: 'warning'
      })
    } else {
      this.setCookies();
    }
  },
  methods: {
    checkCookie () {
      return this.$cookies.isKey('loginflag')
    },
    setCookies () {
      this.$store.state.password = this.$cookies.get('password');
      this.$store.state.username = this.$cookies.get('username');
      this.$store.state.permission = this.$cookies.get('permission')
      switch (this.$store.state.permission) {
        case '1': {
          this.$router.push({ path: '/main/showstudentlist' });
          break;
        }
        case '2': {
          this.$router.push({ name: 'SelectExamPaper' });
          break;
        }
      }
      this.$store.state.loginflag = this.$cookies.get('loginflag');
      this.$store.state.userLoginStuNumber = this.$cookies.get('stuNumber');
    }

  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
/* Animation */
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
