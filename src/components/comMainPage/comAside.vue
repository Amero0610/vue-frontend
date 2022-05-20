<template>
  <div class="MenuItemtext">
    <!-- <el-radio-group
      v-model="isCollapse"
      id="MenuButton"
      style="margin-bottom: 20px"
      fill="#6c5ce7"
      text-color="#a29bfe"
      size="medium "
    >
      <el-radio-button :label="false">
        <i class="myicon-zhankai-"></i>Expand</el-radio-button
      >
      <el-radio-button :label="true" >
        <i class="myicon-zhankai"></i>Collapse</el-radio-button
      >
    </el-radio-group> -->
    <!-- <el-row type="flex" justify="start" align="top">
      <el-col :span="6" style="margin-bottom: 5px"> -->
    <div id="buttonBox">
      <transition>
        <el-button id="MenuButton"
                   type="primary"
                   circle
                   icon="myicon-zhankai-"
                   size="mini"
                   :class="{
            arrowTransform: !isCollapse,
            arrowTransformReturn: isCollapse,
          }"
                   @click="testfunc()"></el-button>
      </transition>
    </div>
    <!-- </el-col>
    </el-row> -->

    <div class="atestbox">
      <el-menu class="el-menu-vertical-demo2"
               v-if="false"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               router
               :default-active="this.$route.path">
        <el-menu-item index="/main/welcome"
                      route="/main/welcome"
                      class="menuItemContentleft">
          <i class="myicon-main-sy"></i>
          <span slot="title">MainPage</span>
        </el-menu-item>

      </el-menu>
      <el-menu class="el-menu-vertical-demo2"
               v-if="permission=='2'"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               router
               :default-active="this.$route.path">
        <el-menu-item index="/main/studentinfo"
                      route="/main/studentinfo"
                      class="menuItemContentleft">
          <i class="myicon-main-sy"></i>
          <span slot="title">Show Student Information</span>
        </el-menu-item>

      </el-menu>
      <el-menu :default-active="this.$route.path"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               router>
        <el-submenu index="1"
                    class="menuItemContentleft"
                    v-if="permission=='1'">
          <template slot="title">
            <i class="myicon-zhanghao"></i>
            <span slot="title">Student Management</span>
          </template>
          <el-menu-item-group class="menuItemContentcenter">
            <el-menu-item index="/main/showstudentlist"
                          route="/main/showstudentlist">Student List</el-menu-item>
            <el-menu-item index="/main/addstudent"
                          route="/main/addstudent">Add Student</el-menu-item>
            <!-- <el-menu-item index="/main/updatestudent"
                          route="/main/updatestudent">Update Student</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <el-menu :default-active="this.$route.path"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               router>
        <el-submenu index="3"
                    v-if="permission=='1'"
                    class="menuItemContentleft">
          <template slot="title">
            <i class="myicon-paper"></i>
            <span slot="title">Exampaper Management</span>
          </template>
          <el-menu-item-group class="menuItemContentcenter">
            <el-menu-item index="/main/addexampaper"
                          route="/main/addexampaper">Add Exampaper</el-menu-item>
            <el-menu-item index="/main/showexampaperlist"
                          route="/main/showexampaperlist">Show Exampaper List</el-menu-item>
            <!-- <el-menu-item index="/main/updateexampaper"
                          route="/main/updateexampaper">Update Exampaper</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4"
                    v-if="permission=='2'"
                    class="menuItemContentleft">
          <template slot="title">
            <i class="myicon-exam"></i>
            <span slot="title">Online Exam Management</span>
          </template>
          <el-menu-item-group class="menuItemContentcenter">
            <el-menu-item index="/main/selectexampaper"
                          route="/main/selectexampaper">

              Select Exampaper</el-menu-item>
            <el-menu-item index="/exam"
                          v-if="false"
                          route="/exam">

              Online Exam
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-menu class="el-menu-vertical-demo2"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               router
               :default-active="this.$route.path">

        <el-menu-item v-if="permission=='1'"
                      index="/main/showscorelist"
                      route="/main/showscorelist"
                      class="menuItemContentleft">
          <i class="myicon-score"></i>
          <span slot="title">Score List</span>
        </el-menu-item>
        <el-menu-item index="/main/studentscore"
                      route="/main/studentscore"
                      v-if="permission=='2'"
                      class="menuItemContentleft">
          <i class="myicon-score"></i>
          <span slot="title"> Score List</span>
        </el-menu-item>
      </el-menu>

    </div>
  </div>
</template>
<style scoped>
i {
  font-size: 23px;
  margin-right: 10px;
}
.MenuItemtext {
  text-align: center;
}
.MenuItemtext .atestbox .el-menu-vertical-demo .el-menu-item {
  text-align: left;
  margin-left: 10px;
}
#buttonBox {
  line-height: 52px;
  background-color: white;
  transition: 0.4s;
  /* bottom: 0px; */
  z-index: 2;
  top: 60px;
  width: 280px;
  position: fixed;
  /* height: 1000px; */
  /* background-color: rebeccapurple; */
}
#buttonBox:hover {
  /* background-color: #ecf5ff; */
  background-color: rgb(235, 236, 253);
  /* background-color:rgb(240, 236, 236); */
}

.atestbox {
  /* margin-top: 30px; */
  margin-top: 60px;
  /* 
  height: calc(100vh - 57px - 60px - 5px); */
}
.atestbox .el-scrollbar__wrap {
  overflow-x: hidden;
}
.atestbox .el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 99%;
  /* border-right: solid 1px #e6e6e6; */
  min-height: 0px;
}
.el-menu-vertical-demo2:not(.el-menu--collapse) {
  /* border-right: solid 1px #e6e6e6; */
  width: 99%;
  min-height: 0px;
}
.el-menu-vertical-demo,
.el-menu-vertical-demo2 {
  /* border-right: none !important; */
}

#MenuButton {
  margin-top: 20px;
  transition-duration: 0.4s;
  /* margin-right: 135px; */
}
.menuItemContentleft {
  text-align: left !important;
  /* background-color: rebeccapurple; */
}
.menuItemContentcenter {
  text-align: center !important;
}
.menuItemContentcenter .el-submenu__title {
  /* padding-left: 3px !important; */
}
.el-submenu__icon-arrow {
  background: url('../../assets/downicon.png') center center no-repeat;
  background-size: 16px;
}
.arrowTransform {
  /* animation: myframes 1s ; */
  transform: rotate(180deg);
}
.arrowTransformReturn {
  /* animation: myframes1 1s ; */
  transform: rotate(0deg);
}
</style>

<script>
export default {
  data () {
    return {
      permission: '',
      isCollapse: false,
    };
  },
  created () {
    this.permission = this.$store.state.permission;
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    testfunc () {
      if (this.isCollapse) {
        this.isCollapse = false;
        this.$emit('getReply', false);
      } else {
        this.isCollapse = true;
        this.$emit('getReply', true);
      }
    },
  },
};









</script>
