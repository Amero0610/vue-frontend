/*
 * @Author: AmeroL
 * @Date: 2022-04-08 22:39:22
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-07 01:43:45
 * @FilePath: /vue-frontend/src/main.js
 * @email: vian8416@163.com
 */
import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './assets/icon/myicon/iconfont.css';
import './../public/style/theme/index.css';
import '../public/font-awesome-4.7.0/css/font-awesome.min.css';
import VueCookies from 'vue-cookies';

import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  defaultCover: require('./assets/Audio.png'),
  productionTip: true,
});
Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
