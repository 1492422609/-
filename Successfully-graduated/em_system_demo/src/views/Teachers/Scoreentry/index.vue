<template>
  <div>
    <!-- <p class="headertop">
      <i></i>
      <i></i>
      <i></i>
      <el-button type="success" @click="upload">文件上传</el-button>
      <el-button type="success" @click="outMsg">导出信息</el-button>
    </p> -->
    <div class="manage-header">
      <div>
        <!-- <el-button type="primary" @click="addStudent">+ 新增</el-button> -->
        <!-- <el-button type="primary" @click="multipleImport">+ 批量导入</el-button> -->
        <!-- <el-upload
          name="file"
          accept="application/vnd.ms-excel"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
          >
          <div class="el-upload__tip">
            <el-button size="small" type="primary" @click="someImport()">+ 批量录入</el-button>
            <div slot="tip" class="upload">只能上传xls文件</div>
          </div>
          
        </el-upload> -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          @on-change="handleChange"
          :http-request="getFile"
        >
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
        <el-button size="small" type="success" @click="upload">确认上传</el-button>
        <!-- 单文件上传 -->
      <!-- <form action="http://localhost:8088/pro_qst/exceladdstuscore" method="post" enctype="multipart/form-data">
        <input type="file" name="f1"/>
        <input type="submit"/>
      </form> -->
      </div>
      <div>
        <el-input
          placeholder="输入学号查询..."
          v-model.trim="course.elec_stuid"
          clearable
        ></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <!-- dialog弹出框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增信息' : '更改信息'"
      :visible.sync="isShow"
    >
      <el-form ref="form" label-width="70px" :model="form" :inline="true">
        <el-form-item
          v-for="item in formLabel"
          :key="item.label"
          :label="item.label"
        >
          <!-- <el-input
            v-if="item.type === 'input'"
            :placeholder="'请输入' + item.label"
            v-model="form[item.model]"
          >
          </el-input> -->
          <el-input
          :disabled="true"
            v-if="item.model === 'elec_classid'"
            :placeholder="'请输入' + item.label"
            v-model="form.elec_classid"
          >
          </el-input>
          <el-input
          :disabled="true"
            v-if="item.model === 'class_name'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_name"
          >
          </el-input>
          <el-input
          :disabled="true"
            v-if="item.model === 'elec_stuid'"
            :placeholder="'请输入' + item.label"
            v-model="form.elec_stuid"
          >
          </el-input>
          <el-input
          :disabled="true"
            v-if="item.model === 'student_name'"
            :placeholder="'请输入' + item.label"
            v-model="form.student_name"
          >
          </el-input>
          <el-input
            v-if="item.model === 'elec_score'"
            :placeholder="'请输入' + item.label"
            v-model="form.elec_score"
          >
          </el-input>
        </el-form-item>
          
          
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- :label：绑定首行数据 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in formLabel"
        :key="item.model"
        :label="item.label"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[item.model] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button> -->
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
  name: "Scoreentry",
  data() {
    return {
      show : true,
      file: {},
      fileList: [],
      operateType: "add",
      isShow: false,
      course: {
        elec_stuid: "",
      },
      formLabel: [
        {
          model: "elec_classid",
          label: "课程编号",
          type: "input"
        },
        {
          model: "class_name",
          label: "课程名",
          type: "input",
        },
        {
          model: "elec_stuid",
          label: "学号",
          type: "input",
        },
        {
          model: "student_name",
          label: "学生姓名",
          type: "input",
        },
        {
          model: "elec_score",
          label: "学生成绩",
          type: "input",
        },
      ],
      form: {
        elec_classid: "",
        class_name: "",
        elec_stuid: "",
        student_name: "",
        elec_score: "",
      },
      tableData: [
        {
          elec_classid: "1901",
          class_name: "AJAX",
          elec_stuid: "20191101",
          student_name: "小宏",
          elec_score: "96",
        },
      ],
      // 分页相关模型数据
      pagination: {
        currentPage: 1, //当前页
        pageSize: 3,  //每页显示的记录数
        total: 8 //总记录数
       },
      teach_id: 0,
      flag: null,
    };
  },
  created(){
    this.getAll(),
    this.getData()
  },
  methods: {
    /* handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleSuccess(){
       axios({
        method: "post",
        url: "http://localhost:8088/pro_qst/exceladdstuscore",
        // data: param,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((resp) => {
        this.tableData = resp.data; 
        console.log('文件请求到的tableData---', this.tableData)
      });
      console.log('上传成功');
    },
    handleError(){
      console.log('上传失败');
    }, */
    handleChange(){

    },
    getFile(item) {
      console.log(item.file)
      this.file = item.file
    },
    upload() {
      const fd = new FormData()
      fd.append('filename', this.file)
      const config = { headers: { 'Content-Type': 'multipart/form-data' }}
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/exceladdstuscore",
        fd,
        config,
        // data: param,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((resp) => {
        this.$message.success('上传成功')
        this.tableData = resp.data; 
        console.log('文件请求到的tableData---', this.tableData)
      }).catch(err=>{
        this.$message.error('上传失败', err)
      })
      
    },
    outMsg(){

    },
    addStudent() {
      this.isShow = true;
      this.operateType = "add"
      this.form = {
        elec_classid: "",
        class_name: "",
        elec_stuid: "",
        student_name: "",
        elec_score: "",
      };
    },
    someImport(){
        /*  axios({
        method: "post",
        url: "http://localhost:8088/pro_qst/exceladdstuscore",
        // data: param,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((resp) => {
        this.tableData = resp.data; 
        console.log('teacher请求到的tableData---', this.tableData)
      }); */
    },
    handleEdit(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.form = row
    },
    handleDelete() {},
    showData() {},
    search() {
      let param = [
        { elec_stuid: this.course.elec_stuid },
        { elec_stuid: this.form.elec_stuid },
      ];
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/searchScoreById"+ "/" + this.course.elec_stuid+"/"+this.teach_id,
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
    confirm() {
      this.isShow = false;
      let param = [
        
        { elec_score: this.form.elec_score },
      ];
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/updateScore"+ "/" + this.form.elec_stuid+"/"+this.form.elec_classid+"/"+this.form.elec_score,
        data: param,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        this.flag = resp.data; 
        if(this.flag == true){
          this.$message.success('操作成功')
        }else{
          this.$message.error('操作失败')
        }
        this.getAll()
        console.log('分数请求到的tableData---', this.tableData)
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
      axios.post("http://localhost:8080/pro_qst/searchAllStuScore/" + this.pagination.currentPage + "/" + this.pagination.pageSize + "/" + this.teach_id).then((res)=>{
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
    this.getAll();
  },
};
</script>

<style lang="less" scoped>
.headertop {
  display: flex;
  justify-content: space-around;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  .el-button {
    margin: 40px;
    height: 45px;
  }
}
i {
  margin-left: 30px;
  width: 200px;
}
.el-input {
  margin-left: 10px;
  width: 250px;
}
.el-table {
  margin-top: 30px;
}
.el-upload__tip{
  display: flex;
  justify-content: space-between;
}
.upload{
  margin-top: 55px;
}
</style>
