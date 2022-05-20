/*
 * @Author: AmeroL
 * @Date: 2022-04-08 01:55:38
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-20 19:41:51
 * @FilePath: /vue-frontend/src/store/index.js
 * @email: vian8416@163.com
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLoginStatus: '',
    userLoginUserName: '',
    userLoginUserId: '',
    userLoginPassword: '',
    userLoginStuNumber: '',
    currentExamType: '',
    currentExamInfo: '',
    currentReviewExampaperInfo: {},
    currentExamingExampaperInfo: {},
    currentExamingExampapeAudioAddr: '',
    currentAddExampaperInfo: {},
    permission: '',
    password: '',
    loginflag: false,
    username: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
