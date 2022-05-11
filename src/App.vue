<!--
 * @Author: AmeroL
 * @Date: 2022-04-08 01:30:40
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-11 21:58:06
 * @FilePath: \vue-frontend\src\App.vue
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
  beforeCreate () {
    // if (this.$store.state.username == 'nologin') {
    //   this.$router.push('/userlogin');
    //   this.$message({
    //     message: "Please Login First!",
    //     type: 'warning'
    //   })
    // }
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
