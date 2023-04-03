<template>
  <div>
    学生课表查询
    <p class="headertop">
      <i></i>
      <i></i>
      <i></i>
      <el-button type="success" @click="msgOut">导出课程表</el-button>
    </p>
    <el-table :data="tableData" style="width: 81%" row-key="id" border>
      <el-table-column prop="day1" label="周一" width="220"> </el-table-column>
      <el-table-column prop="day2" label="周二" width="220"> </el-table-column>
      <el-table-column prop="day3" label="周三" width="220"> </el-table-column>
      <el-table-column prop="day4" label="周四" width="220"> </el-table-column>
      <el-table-column prop="day5" label="周五" width="200"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "searchSchdule",
  data() {
    return {
      tableData: [
        {
          day1: "日语",
          day2: "JavaScript",
          day3: "Java",
          day4: "离散数学",
          day5: "高等数学",
        },
        {
          date1: "日语",
          date2: "JavaScript",
          date3: "Java",
          date4: "离散数学",
          date5: "高等数学",
        },
        {
          date1: "日语",
          date2: "JavaScript",
          date3: "Java",
          date4: "离散数学",
          date5: "高等数学",
        },
        {
          date1: "日语",
          date2: "JavaScript",
          date3: "Java",
          date4: "离散数学",
          date5: "高等数学",
        },
      ],
    };
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      const result = localStorage.getItem('student')
      const res = JSON.parse(result)
      console.log("getData=",res);
      this.stu_id = res.stu_id
      console.log("getData.stu_name=",this.stu_id);
    },
    // 导出信息
     msgOut(){
      // location.href = "http://localhost:8080/pro_qst/exportPdf/" + this.stu_id;
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/exportCoursePdf/" + this.stu_id,
        }).then((res)=>{
        // this.tableData = res.data.list
        console.log(res);
        console.log('searchMessage导出请求到的tableData---', this.tableData)
        this.$message.success("已生成完成！");
      }).catch(err=>{console.log('抛出错误', err)})
    },
    showData(){
      console.log("Schdule的ShowData执行了");
      axios({
        method: "post", 
        url: "http://localhost:8080/pro_qst/queryCourseTable/"+this.stu_id,
      }).then((resp) => {
        console.log('学生课表请求到的resp---', resp.data)
        this.tableData = resp.data;
        console.log('学生课表请求到的tableData---', this.tableData)
      }).catch(err=>{console.log('抛出错误', err)});
    }
    
  },
  mounted(){
    this.showData()
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-left: 100px;
}
.headertop {
  display: flex;
  justify-content: space-around;
}
</style>
