<template>
  <!--status-icon: 在输入框中显示校验结果反馈图标 -->
  <div class="login_container">
    <div class="login_box">
      <!-- <div class="avatar_box">
        <img src="@/assets/images/login.png" />
      </div> -->
      <p class="title">高校实习管理系统</p>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="0px"
        class="login_in"
      >
        <!-- <h3 class="login_title">系统登录</h3> -->
        <!-- prop：定义在form中对应的字段 -->
        <el-form-item
          label="用户名"
          label-width="80px"
          prop="stu_id"
          class="stu_id"
        >
          <!-- autocomplete：表单是否启用自动完成功能。自动完成允许浏览器对字段的输入，是基于之前输入过的值。 -->
          <el-input
            type="input"
            v-model="form.stu_id"
            prefix-icon="el-icon-user"
            autocomplete="off"
            placeholder="请输入账号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="stu_pwd">
          <el-input
            type="password"
            v-model="form.stu_pwd"
            prefix-icon="el-icon-thumb"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="80px" prop="stu_pwd">
          <el-radio-group v-model="radio">
            <el-radio :label="1" style="color:white">学生</el-radio>
            <el-radio :label="2"  style="color:white">企业</el-radio>
            <el-radio :label="3"  style="color:white">老师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="btns">
          <div class="footer">
            <el-button type="success" @click="Tlogin">注册</el-button>
            <i></i><i></i><i></i><i></i><i></i>
            <el-button type="primary" @click="login">登录</el-button>
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
        radio: 3,
      form: {
        stu_id: "",
        stu_pwd: null,
      },
      // 表单校验的定义
      rules: {
        stu_id: [
          // 用户名校验：必需、没有输入会有提示、失去焦点触发       
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        // 密码校验：必需、提示、失去焦点触发
        stu_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      tableData: null,
    };
  },

  methods: {
    Tlogin() {
      this.$router.replace("/login");
    },
    getData(){
      const result = localStorage.getItem('student')
      const res = JSON.parse(result)
      console.log("getData=",res);
      this.stu_id = res.data.stu_id
      console.log("getData.stu_name=",this.stu_id);
    },
    login() {
      let param = [
        { stu_id: this.form.stu_id },
        { stu_pwd: this.form.stu_pwd },
      ];
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/StuLogin/" + this.form.stu_id + "/" + this.form.stu_pwd,
        data: param,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((res) => {
        console.log(res.data)
        this.tableData = res.data;
        console.log("this.tableData=",this.tableData);
        this.stu_name = res.data.stu_name;
        console.log("学生姓名：", this.stu_name);
        localStorage.setItem('student', JSON.stringify(res.data));
        if (this.form.stu_id === "" || this.form.stu_pwd === "") {
        this.$message.warning("用户名和密码不能为空");
      } else if (
        this.form.stu_id === "xiaohong" &&
        this.form.stu_pwd === "xiaohong"
      ) {
        this.$message.success("登录成功，欢迎你");
        this.$router.replace("/home");
      } else if (this.tableData) {
        console.log(this.tableData);
        this.$message.success(`登录成功，欢迎${this.stu_name}`);
        this.$router.replace("/home");
      }else {
        this.$message.error("用户名或密码错误");
      }
      });
      
    },
    reset() {
      this.form.stu_id = "";
      this.form.stu_pwd = "";
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
  height: 350px;
  background-color: rgb(77, 111, 142);
  border-radius: 8%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

/* .btns {
  display: flex;
  justify-content: space-between;
} */

.login_in {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.footer{
  display: flex;
  justify-content: space-between;
}
/deep/.login_in .el-form-item__label{
  color: #fff;
}

</style>
