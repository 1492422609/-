<template>
  <div>
    <p class="headertop">
      <i></i>
      <i></i>
      <i></i>
      <el-button type="success" @click="msgOut">导出信息</el-button>
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
        width="222"  
      >
        <template slot-scope="scope">
          <span>{{
            item.prop === "list"
              ? scope.row[item.prop].map((item) => item.class_id).join(",")
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
  
  name: "Course",
  data() {
    return {
      show:true,
      course: {
        class_id: '',
        
      },
      tableLabel: [
        {
          prop: "class_id",
          label: "课程编号",
        },
        {
          prop: "class_name",
          label: "课程名称",
        },
        {
          prop: "class_address",
          label: "上课地点",
        },
        {
          prop: "class_time",
          label: "上课时间",
        },
        {
          prop: "class_testtime",
          label: "考试时间",
        },
        {
          prop: "class_campus",
          label: "学院",
        },
      ],
      tableData: [],
      // 分页相关模型数据
      pagination: {
        currentPage: 1, //当前页
        pageSize: 3,  //每页显示的记录数
        total: 8 //总记录数
       },
      teach_id: 0
    };
  },
  created(){
    this.getAll(),
    this.getData()
  },
  methods: {
    // showData() {
    //   axios({
    //     method: "post", 
    //     url: "http://localhost:8088/pro_qst/teacher/",
    //   }).then((resp) => {
    //     this.tableData = resp.data;
    //   });
    // },
    msgOut(){
      // location.href = "http://localhost:8088/pro_qst/excelExport/" + this.teach_id;
      axios.post("http://localhost:8080/pro_qst/excelExport/" + this.teach_id).then((res)=>{
        // this.tableData = res.data.list
        console.log(res);
        console.log('teacher请求到的tableData---', this.tableData)
        this.$message.success("已生成完成！");
      })
    },
    search() {
      let param = [
        { class_id: this.course.class_id },
      ];
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/searchthecourse"+ "/" + this.teach_id+"/"+this.course.class_id,
        data: param,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        this.tableData = resp.data; 
        this.show = false;
        console.log('teacher请求到的tableData---', this.tableData)
      });
    },
    // 获取本地存储数据session
    getData(){
      const result = localStorage.getItem('teacher')
      const res = JSON.parse(result)
      this.teach_id = res.teacher_id
      // this.teach_name = JSON.parse(localStorage.getItem('teacher').teacher_name)
    },
    // 分页查询
    getAll(){
      axios.post("http://localhost:8080/pro_qst/teacher/" + this.pagination.currentPage + "/" + this.pagination.pageSize + "/" + this.teach_id).then((res)=>{
        this.pagination.pageSize = res.data.pageSize
        this.pagination.currentPage = res.data.pageNum
        this.pagination.total = res.data.total
        
        this.tableData = res.data.list
        console.log('teachers请求到的tableData---', this.tableData)
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

