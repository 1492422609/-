<template>
  <div>
    查询个人信息

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="card">
          <span>天道酬勤</span>
          <span>自强不息</span>
        </div>
      </div>
      <div class="text item">
        <div class="showMsg">
          <p>学号：{{ this.tableData.stu_id }}</p>
          <p class="goodword">积跬步至千里，积小流成江海</p>
        </div>
        <div class="showMsg">
          <p>姓名：{{ this.tableData.stu_name }}</p>
          <p class="goodword">世上无难事，只要肯攀登</p>
        </div>
        <div class="showMsg">
          <p>籍贯：{{ this.tableData.stu_adress }}</p>
          <p class="goodword">吃得苦中苦，方为人上人</p>
        </div>
        <div class="showMsg">
          <p>学院：{{ this.tableData.stu_campus }}</p>
          <p class="goodword">莫等闲，白了少年头，空悲切</p>
        </div>
        <div class="showMsg">
          <p>班级：{{ this.tableData.stu_class }}</p>
          <p class="goodword">花开堪折直须折，莫待无花空折枝</p>
        </div>
        <div class="showMsg">
          <p>专业：{{ this.tableData.stu_pro }}</p>
          <p class="goodword">天生我材必有用，千金散尽还复来</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "searchMessage",
  data() {
    return {
      course: {
        stu_id: 201911002,
      },
      tableData: 
        {
          stu_id: 201911002,
          stu_name: "张三",
          stu_adress: "山东青岛",
          stu_campus: "信控学院",
          stu_pro: "英语",
          stu_class: "软件194班",
        },
    };
  },
  methods: {
    showData() {
      axios({
        method: "post", 
        url: "http://localhost:8080/pro_qst/queryStuInfo/"+this.stu_id,
      }).then((resp) => {
        this.tableData = resp.data;
        console.log('学生信息请求到的tableData---', this.tableData)
      });
    },
    getData(){
      const result = localStorage.getItem('student')
      const res = JSON.parse(result)
      console.log("getData=",res);
      this.stu_id = res.stu_id
      console.log("getData.stu_name=",this.stu_id);
    },
  },
  mounted() {
    this.showData();
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 16px;
}

/* .item {
  margin-bottom: 18px;
} */

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 80px;
  margin-left: 170px;
  height: 400px;
  width: 1000px;
}
.card {
  display: flex;
  font-size: 20px;
  color: rgb(244, 80, 129);
  justify-content: space-around;
}
.showMsg {
  display: flex;
  justify-content: space-between;
}
.goodword{
  color: skyblue;
}
</style>
