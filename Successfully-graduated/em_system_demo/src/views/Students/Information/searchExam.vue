<template>
  <div>
    考试信息查询
    <p class="headertop">
      <i></i>
      <i></i>
      <i></i>
      <el-button type="success" @click="msgOut">导出全部考试信息</el-button>
    </p>
    <header class="header">
      <i></i>
      <i></i>
      <el-input
        placeholder="输入课程编号查询..."
        v-model.trim="course.class_id"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </header>
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- :label：绑定首行数据 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        width="217"  
      >
        <template slot-scope="scope">
          <span>{{
            item.prop === "teacherList"
              ? scope.row[item.prop].map((item) => item.teacher_name).join(",")
              : scope.row[item.prop]
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <i></i>
      <el-pagination 
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        v-show="show"
      >

      </el-pagination>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "searchScore",
  data() {
    return {
      show: true,
      course: {
        class_id: "",
        stuid: 201911001,
      },
      tableLabel: [
        {
          prop: "elec_classid",
          label: "课程编号",
        },
        {
          prop: "class_name",
          label: "课程名称",
        },
        {
          prop: "teacher_name",
          label: "任课教师",
        },
        {
          prop: "class_testtime",
          label: "考试时间",
        },
        {
          prop: "class_address",
          label: "考试地点",
        },
        {
          prop: "class_campus",
          label: "开设学院",
        },
      ],
      tableData: [  
        {
          elec_classid: 1,
          class_name: "Java",
          class_testtime: "周一3-4节",
          class_address: "b404",
          class_campus: "信控学院",
          teacher_name: "xxx",
        },
      ],
      // 分页相关模型数据
      pagination: {
        currentPage: 1, //当前页
        pageSize: 3,  //每页显示的记录数
        total: 8 //总记录数
       }
    };
  },
  methods: {
    /* showData() {
      axios({
        method: "post", 
        url: "http://localhost:8088/pro_qst/queryAll",
      }).then((resp) => {
        this.tableData = resp.data;
        console.log('student请求到的tableData---', this.tableData)
      });
    }, */
    getData(){
      const result = localStorage.getItem('student')
      const res = JSON.parse(result)
      console.log("getData=",res);
      this.stu_id = res.stu_id
      console.log("getData.stu_name=",this.stu_id);
    },
    // 导出信息
     msgOut(){
      // location.href = "http://localhost:8080/pro_qst/exportExamInfo/" + this.stu_id;
      axios.post("http://localhost:8080/pro_qst/exportExamInfo/" + this.stu_id).then((res)=>{
        // this.tableData = res.data.list
        console.log(res);
        console.log('searchMessage导出请求到的tableData---', this.tableData)
        this.$message.success("已生成完成！");
      })
    },
    search() {
      if (
        this.course.class_id === "" 
      ) {
        this.$message.warning('课程编号不能为空')
      }else{
        let param = [
          { class_id: this.course.class_id },
        ];
        axios({
          method: "post",
          url: "http://localhost:8080/pro_qst/selectExamById/"+ this.stu_id + "/" + this.course.class_id,
          data: param,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then((resp) => {
          this.tableData = resp.data; 
          console.log('student请求到的tableData---', this.tableData)
          this.show = false;
        });
      }
    },
    // 分页查询
    getAll(){
      axios.post("http://localhost:8080/pro_qst/selectExam/" + this.pagination.currentPage + "/" + this.pagination.pageSize + "/" + this.stu_id).then((res)=>{
        this.pagination.pageSize = res.data.pageSize
        this.pagination.currentPage = res.data.pageNum
        this.pagination.total = res.data.total

        this.tableData = res.data.list
        console.log('teacher请求到的tableData---', this.tableData)
        console.log('一页的数据', res.data.pageSize);
        console.log('当前页', res.data.pageNum);
        console.log('总数据', res.data.total);
      })
    },
    // 切换页码
    handleCurrentChange(currentPage){
      // 修改页码值为当前选中页码值
      this.pagination.currentPage = currentPage
      // 执行查询
      this.getAll()
    }
  },
  mounted() {
    // this.showData();
    this.getAll()
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.headertop {
  display: flex;
  justify-content: space-around;
}
.header {
  display: flex;
  justify-content: space-around;
  .el-button {
    margin-top: 40px;
    height: 45px;
  }
}
i{
  margin-left: 30px;
  width: 200px;
}
.el-input {
  margin: 40px;
  margin-left: 30px;
  width: 200px;
}
.el-table {
  margin-top: 30px;
}
.pagination-container{
  display: flex;
  justify-content: space-between;
}
.el-pagination{
  margin-top: 10px;
  margin-right: 20px;
}
</style>