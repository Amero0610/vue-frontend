/*
 * @Author: AmeroL
 * @Date: 2022-04-25 00:25:51
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-05-27 02:29:32
 * @FilePath: /vue-frontend/src/plugins/element.js
 * @email: vian8416@163.com
 */
import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(Element, { locale });
Vue.use(Element);
