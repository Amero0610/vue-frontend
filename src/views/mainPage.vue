<!--
 * @Author: AmeroL
 * @Date: 2022-04-08 01:51:55
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-09 20:15:44
 * @FilePath: \vue-frontend\src\views\mainPage.vue
 * @email: vian8416@163.com
-->
<!-- this is main page!;
    <div id="router-view">
      <router-view></router-view>
    </div> -->
<template>
  <div id="mainPage">
    <el-container class="cnter"
                  :class="{ folded: folded }">
      <el-header class="header">
        <comHeader></comHeader>
      </el-header>
      <el-container>
        <el-aside class="left"
                  width="">
          <el-scrollbar style="height: 100%">
            <comAside id="comAside"
                      @getReply="getReply"></comAside>
          </el-scrollbar>
        </el-aside>
        <el-main class="main classTrademark">
          <!-- <el-scrollbar style="height: 100%"> -->

          <div id="router-view">
            <transition name="fade"
                        mode="out-in">
              <router-view> </router-view>
            </transition>
          </div>
          <!-- </el-scrollbar> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import comAside from '../components/comMainPage/comAside.vue';
import comHeader from '../components/comMainPage/comHeader.vue';
export default {
  data: () => ({
    folded: false,
    loginflag: false,
  }),
  components: {
    comHeader,
    comAside,
  },
  methods: {
    getReply (reply) {
      this.folded = reply;
    },
  },
  mounted: function () {

    // if (this.$cookies.get('examflag') == 1) {
    //   this.$store.state.username = 'AmeroL';
    //   this.loginflag = true;
    // } else {
    //   alert("Please login first!");
    //   this.loginflag = false;
    //   this.$store.state.username = 'visitor';
    // }
  },
  destroyed: function () {
    // this.$cookies.remove('examflag');
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
* {
  font-family: 'Poppins', sans-serif !important;
  margin: 0;
  padding: 0;
}
#mainPage .el-header {
  padding: 0px;
}

#mainPage .left {
  width: 280px;
  transition: 0.4s;
  height: calc(100vh - 60px);
}
#mainPage .folded .left {
  width: 64px;
}
#mainPage .folded .el-menu span {
  display: none;
}
#mainPage .folded #buttonBox {
  width: 64px;
}
#mainPage .main {
  transition: 0.84s;
  height: calc(100vh - 60px);
  padding: 0px;
}
#mainPage .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.classTrademark::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.classTrademark::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-radius: 5px;
}

.classTrademark::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #bbbbbb;
}
.classTrademark ::-webkit-scrollbar-corner {
  display: block;
}
.classTrademark::-webkit-scrollbar-track {
  background: #f3f3f3;
  border-radius: 4px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
