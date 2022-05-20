/*
 * @Author: AmeroL
 * @Date: 2022-04-08 01:32:21
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-20 20:20:46
 * @FilePath: /vue-frontend/src/router/index.js
 * @email: vian8416@163.com
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

//studentInfo
import comStudentInfo from '../views/studentInfo.vue';

//welcome
import comWelcome from '../views/welcomePage.vue';

//loginPage
import comLoginPage from '../views/loginPart/loginPage.vue';

//Student Management
//import comAddStudent from '../views/studentManage/testAdd.vue';
import comAddStudent from '../views/studentManage/addStudent.vue';
import comStudentList from '../views/studentManage/showStudentList.vue';
import comUpdateStudent from '../views/studentManage/updateStudent.vue';
import comStudentScore from '../views/studentManage/studentScore.vue';

//Score Management
import comScoreList from '../views/scoreManage/showScoreList.vue';
import comUpdateScore from '../views/scoreManage/studentScorePage.vue';

//Exampaper Management
import comAddExampaper from '../views/paperManage/addExampaper.vue';
import comReviewExamPaper from '../views/paperManage/examPaperReview.vue';
import comUpdateExampaper from '../views/paperManage/updateExampaper.vue';
import comExampaperList from '../views/paperManage/showExampaperList.vue';

//Exam Management
import comExam from '../views/examManage/examPage.vue';
import comSelectExampaper from '../views/examManage/selectExampaper.vue';

import comMainPage from '../views/mainPage.vue';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'Main',
  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: comLoginPage,
  },
  {
    path: '/main',
    name: 'Main',
    component: comMainPage,
    redirect: '/main/welcome',
    children: [
      {
        path: 'studentinfo',
        name: 'StudentInfo',
        component: comStudentInfo,
      },
      {
        path: 'welcome',
        name: 'Welcome',
        component: comWelcome,
      },
      {
        path: 'showstudentlist',
        name: 'StudentManage',
        component: comStudentList,
      },
      {
        path: 'addstudent',
        name: 'AddStudent',
        component: comAddStudent,
      },
      {
        path: 'updatestudent',
        name: 'UpdateStudent',
        component: comUpdateStudent,
      },
      {
        path: 'addexampaper',
        name: 'AddExamPaper',
        component: comAddExampaper,
      },
      {
        path: 'showexampaperlist',
        name: 'ShowExamPaperList',
        component: comExampaperList,
      },
      {
        path: 'reviewexampaper',
        name: 'ReviewExamPaper',
        component: comReviewExamPaper,
      },
      {
        path: 'updateexampaper',
        name: 'UpdateExamPaper',
        component: comUpdateExampaper,
      },

      {
        path: 'showscorelist',
        name: 'ShowScoreList',
        component: comScoreList,
      },
      {
        path: 'studentscore',
        name: 'MainStudentScore',
        component: comUpdateScore,
      },
      {
        path: 'selectexampaper',
        name: 'SelectExamPaper',
        component: comSelectExampaper,
      },
    ],
  },
  {
    path: '/exam',
    name: 'Exam',
    component: comExam,
  },
  {
    path: '/studentscore',
    name: 'StudentScore',
    component: comStudentScore,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
