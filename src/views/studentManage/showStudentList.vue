<!--
 * @Author: AmeroL
 * @Date: 2022-04-09 01:13:58
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-04-21 01:41:27
 * @FilePath: /vue-frontend/src/views/studentManage/showStudentList.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="studentList">
    this is student list!
    <el-table :data="studentList"
              :border="true">
      <el-table-column label="Name"
                       prop="name"></el-table-column>
      <el-table-column label="StudentNumber"
                       prop="studentNumber"></el-table-column>
      <el-table-column label="Permission"
                       prop="permission"></el-table-column>
      <el-table-column label="Operation"
                       width="180">
        <template slot-scope="scope">
          <el-button @click="showStudentInfo(scope.row)"
                     type="primary"
                     size="mini">Score</el-button>
          <el-button type="success"
                     @click="editStudentInfo(scope.row)"
                     size="mini">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data: () => ({


    studentList: [{
      name: "amero",
      studentNumber: "1234569",
      permission: "0"
    },
    {
      name: "amero1",
      studentNumber: "12349",
      permission: "1"
    },
    {
      name: "amero2",
      studentNumber: "1789",
      permission: "2"
    }

    ],
  }),
  methods: {
    // get  student list from server
    getStudentList () {
      // axios get student list from server
    },
    showStudentInfo (row) {
      this.$router.push(
        {
          name: "StudentScore",
          params: {
            studentNumber: row.studentNumber,
          }
        }
      )
      console.log(row);
    },
    editStudentInfo (row) {
      console.log(row);
    }
  }
}
</script>
<style scoped>
#studentList {
}
</style>