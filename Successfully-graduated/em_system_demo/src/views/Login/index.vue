<template>
  <!--status-icon: 在输入框中显示校验结果反馈图标 -->
  <div class="login_container">
    <div class="login_box">
      <p class="title">高校实习管理系统</p>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="0px"
        class="login_in"
      >
        <div v-if="radio=='学生'?true:false" >
          <el-form-item
          label="用户名"
          label-width="80px"
          prop="teachId"
        >
          <!-- autocomplete：表单是否启用自动完成功能。自动完成允许浏览器对字段的输入，是基于之前输入过的值。 -->
          <el-input
            type="input"
            v-model="form.teachId"
            autocomplete="off"
            placeholder="请输入账号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="teachPwd" height:30px>
          <el-input
            type="password"
            v-model="form.teachPwd"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="80px" prop="teachAdress">
          <el-input
            type="input"
            v-model="form.teachAdress"
            autocomplete="off"
            placeholder="例：山东青岛"
          ></el-input>
        </el-form-item>
        <el-form-item label="学院" label-width="80px" prop="teachXueyuan">
          <el-input
            type="input"
            v-model="form.teachXueyuan"
            autocomplete="off"
            placeholder="例：信控学院"
          ></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="80px" prop="class">
          <el-input
            type="input"
            v-model="form.class"
            autocomplete="off"
            placeholder="例：软件194"
          ></el-input>
        </el-form-item>
        <el-form-item label="学科" label-width="80px" prop="project">
          <el-input
            type="input"
            v-model="form.project"
            autocomplete="off"
            placeholder="例：软件工程"
          ></el-input>
        </el-form-item>
        <el-form-item label="学校" label-width="80px"  prop="school">
          <el-input
            type="input"
            v-model="form.school"
            autocomplete="off"
            placeholder="例：青岛理工大学"
          ></el-input>
        </el-form-item>
        </div>
        <div v-if="radio=='企业'?true:false" >
          <el-form :model="form1" ref="form1" label-width="100px" class="login_in">
          <el-form-item
            v-for="(domain) in form1"
            :label="domain.name"
            :key="domain.key"
            :prop="domain.name"
            label-width="80px" 
          >
          <el-input
            type="input"
            v-model="domain.value"
            autocomplete="off"
            :placeholder=domain.placeholder
          ></el-input>
          </el-form-item>
          </el-form>
        </div>
        
        <el-form-item class="btns">
          <div class="footer">
            <div>
              <el-radio-group v-model="radio">
                <el-radio-button label="学生"></el-radio-button>
                <el-radio-button label="企业"></el-radio-button>
              </el-radio-group>
            </div>
            <i></i><i></i><i></i><i></i><i></i>
            <el-button type="primary" @click="login">注册</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      radio: '学生',
      form: {
        teachId: "",
        teachPwd: null,
        teachAdress:"",
        teachXueyuan:"",
        class:"",
        project:"",
        school:""
      },
      form1:[{
        teachId1: "",
        name:"企业名称",
        value:"",
        placeholder:''
      },{
        teachId2: "",
        name:"企业邮箱",
        value:"",
        placeholder:''
      }],
      // 表单校验的定义
      rules: {
        teachId: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {min: 3,message: "用户名长度不能小于3位",trigger: "blur",
          },],
        teachPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        teachAdress: [{ required: true, message: "请输入地址", trigger: "blur" }],
        teachXueyuan: [{ required: true, message: "请输入学院", trigger: "blur" }],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        project: [{ required: true, message: "请输入专业", trigger: "blur" }],
        school: [{ required: true, message: "请输入学校", trigger: "blur" }],
      },
      tableData: null,
      teach_name: '',
    };
  },

  methods: {
    getData(){
      const result = localStorage.getItem('teacher')
      const res = JSON.parse(result)
      this.teach_name = res.teacher_name
    },
    
    login() {
      if(this.radio == "学生"){
          let param = [
            { teachId: this.form.teachId },
            { teachPwd: this.form.teachPwd },
          ];
          axios({
            method: "post",
            url: "http://localhost:8080/pro_qst/teachlogin/" + this.form.teachId + "/" + this.form.teachPwd,
            data: param,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }).then((resp) => {
            this.tableData = resp.data; 
            this.teach_name = resp.data.teacher_name;
            localStorage.setItem('teacher', JSON.stringify(resp.data));

            console.log('student请求到的tableData---', this.tableData)
            console.log(typeof this.tableData);
            console.log(resp.data);
            if (this.tableData) {
                 this.$message.success(`注册成功，欢迎${this.teach_name}`);
                 this.$router.replace("/thome");
            } else {
                 this.$message.error("注册错误");
                 this.$router.replace("/Slogin");
            }
          }).catch((error)=>{
            //this.$router.replace("/Slogin");
          });
      }else{


      }
    },
    reset() {
      this.form.teachId = "";
      this.form.teachPwd = "";
      this.$message.info("已重置");
    },
  },
  created() {
    // this.getData();
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url(../../assets/images/bg1.webp);
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100%;
   .title{
    height: 100%;
    display: block;
    color: #fff;
    font-weight: 700;
    font-size: 30px;
    margin-left: 100px;
  }
}

.login_box {
  opacity: 0.8;
  width: 450px;
  overflow:hidden;
  //height: 625px;
  background-color: rgb(77, 111, 142);
  border-radius: 8%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_in {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 0 50px 0 10px;
  box-sizing: border-box;
}
.footer {
  display: flex;
  justify-content: space-between;
}
/deep/.login_in .el-form-item__label{
  color: #fff;
}
</style>