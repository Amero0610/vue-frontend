<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:53:53
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-12 22:48:38
 * @FilePath: \vue-frontend\src\views\examManage\examPage.vue
 * @email: vian8416@163.com
-->
<template>
  <div>
    <comHeader></comHeader>
    this is exam page!;
    <el-button type="primart"
               plain
               @click="toMainpage"> toMainPage </el-button>
    <el-button type="error"
               plain
               @click="deleteCookies">
      Delete Cookies</el-button>
  </div>
</template>
<script>
import comHeader from '../../components/comMainPage/comHeader.vue';
export default {
  data: () => ({}),
  components: {
    comHeader,
  },
  methods: {
    toMainpage () {
      this.$router.push('/main');
    },
    // deleteCookies() {
    //   this.$cookies.remove('username');
    //   this.$router.push('/main');
    //   console.log(1);
    // },
  },
};
</script>
