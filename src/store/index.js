/*
 * @Author: AmeroL
 * @Date: 2022-04-08 01:55:38
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-09 19:53:48
 * @FilePath: \vue-frontend\src\store\index.js
 * @email: vian8416@163.com
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginflag: false,
    username: 'nologin',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
