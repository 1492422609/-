<template>
  <div>
    <header class="header">
      <el-input
        placeholder="输入课程名查询..."
        v-model.trim="course.class_name"
      ></el-input>
      <el-input
        placeholder="输入学院名查询..."
        v-model.trim="course.class_campus"
      ></el-input>
      <el-input
        placeholder="输入教师名查询..."
        v-model.trim="course.teachname"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </header>
    <el-table :data="tableData" stripe style="width: 100%">
    <!-- <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    > -->
      <!-- :label：绑定首行数据 -->
      <el-table-column
        show-overflow-tooltip
        v-for="(item) in tableLabel"
        :key="item.prop"
        :label="item.label"
        width="160"  
      >
        <template slot-scope="scope">
          <span>{{
            item.prop === "teacherList"
              ? scope.row[item.prop].map((item) => item.teacher_name).join(",")
              : scope.row[item.prop]
          }}</span>
        </template>
      </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="success" size="mini" @click="chooseClass(scope.row)"
            >选课</el-button
          >
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
      show: true,
      course: {
        class_name: "",
        class_campus: "",
        teachname: "",
      },
       courseList: {
        class_id: "",
        class_name: "",
        teacherList: "",
        class_time: "",
        class_address: "",
        class_week: "",
        class_campus: "",
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
          prop: "teacherList",
          label: "任课教师",
        },
        {
          prop: "class_time",
          label: "上课时间",
        },
        {
          prop: "class_address",
          label: "上课地点",
        },
        {
          prop: "class_week",
          label: "起始结束周",
        },
        {
          prop: "class_campus",
          label: "开设学院",
        },
      ],
      tableData: [  
        {
          class_id: 1,
          class_name: "Java",
          class_time: "周一3-4节",
          class_address: "b404",
          class_week: "1-16周",
          class_campus: "信控学院",
          teacherList: [
            { 
              teacher_name: "xxx",
              teacher_id: "01",
            },
          ],
        },
      ],
      // 分页相关模型数据
      pagination: {
        currentPage: 1, //当前页
        pageSize: 5,  //每页显示的记录数
        total: 1 //总记录数
       }
    };
  },
  methods: {
    /*showData() {
      axios({
        method: "post", 
        url: "http://localhost:8080/pro_qst/queryAll/" + this.pagination.currentPage + "/" + this.pagination.pageSize,
      }).then((resp) => {
        this.tableData = resp.data.list;
        console.log('student请求到的tableData---', this.tableData)
      });
      // console.log('student请求到的tableData---', this.tableData)
    },*/
    getData(){
      const result = localStorage.getItem('student')
      const res = JSON.parse(result)
      console.log("getData=",res);
      this.stu_id = res.stu_id
      console.log("getData.stu_name=",this.stu_id);
    },
    search() {
      if (
        this.course.class_name === "" &&
        this.course.class_campus === "" &&
        this.course.teachname === ""
      ) {
        this.$message.warning('用户框内容不能全为空')
      }
      let param = [
        { class_name: this.course.class_name },
        { class_campus: this.course.class_campus },
        { teachname: this.course.teachname },
      ];
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/queryCourse/"+this.stu_id,
        data: param,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        this.tableData = resp.data; 
        console.log('student请求到的tableData---', this.tableData)
        this.show = false;
      });
      
    },
     // 选课
    chooseClass(row) {
      // this.showName = false;
      let param = 
         {
          elec_stuid: this.stu_id,
          elec_classid: row.class_id,
         };
      console.log(param);
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/insertClass",
        data: param, //传给后端的数据
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((res) => {
        console.log(res);
        this.$message.success("选课成功");
        // 传入数据后，重新调用一下分页
        this.getAll();
      });
    },
    
    // 分页查询
    getAll(){
      
      axios.get("http://localhost:8080/pro_qst/queryAll2/" + this.pagination.currentPage + "/" + this.pagination.pageSize+"/"+this.stu_id).then((res)=>{
        this.pagination.pageSize = res.data.pageSize
        this.pagination.currentPage = res.data.pageNum
        this.pagination.total = res.data.total
        this.tableData = res.data.list; 
      
        console.log("分页：this.pagination.pageSize=",this.pagination.pageSize);
        console.log("分页：this.pagination.currentPage =",this.pagination.currentPage);
        console.log("分页：this.pagination.total=",this.pagination.total);
        console.log("分页：",this.tableData);
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
    this.getAll();
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
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
