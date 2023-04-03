<template>
  <!--status-icon: 在输入框中显示校验结果反馈图标 -->
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="@/assets/images/login.png" />
      </div>
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
          prop="teachId"
          class="teachId"
        >
          <!-- autocomplete：表单是否启用自动完成功能。自动完成允许浏览器对字段的输入，是基于之前输入过的值。 -->
          <el-input
            type="input"
            v-model="form.teachId"
            prefix-icon="el-icon-user"
            autocomplete="off"
            placeholder="请输入账号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="teachPwd">
          <el-input
            type="password"
            v-model="form.teachPwd"
            prefix-icon="el-icon-thumb"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
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
      form: {
        teachId: "",
        teachPwd: "",
      },
      // 表单校验的定义
      rules: {
        teachId: [
          // 用户名校验：必需、没有输入会有提示、失去焦点触发
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        // 密码校验：必需、提示、失去焦点触发
        teachPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      tableData: [],
    };
  },

  methods: {
    getData() {
      axios.post("" + this.teachId + "/" + this.teachPwd).then((res) => {
        this.form.teachId = res.data.teachId;
        this.form.teachPwd = res.data.teachPwd;

        this.tableData = res.data.xxx;
        console.log("teacher请求到的getData---", this.tableData);
        console.log("教师的用户名", res.data.teachId);
        console.log("教师的密码", res.data.teachPwd);
      });
    },
    login() {
      if (this.form.teachId === "" || this.form.teachPwd === "") {
        this.$message.warning("用户名和密码不能为空");
      } else if (
        this.form.teachId === "xiaohong" &&
        this.form.teachPwd === "xiaohong"
      ) {
        this.$message.success("登录成功，欢迎小宏同学");
        this.$router.replace("/home");
      } else if (this.form.teachId === "liu" && this.form.teachPwd === "liu") {
        this.$message.success("登录成功，欢迎刘老师");
        this.$router.replace("/thome");
      } else {
        this.$message.error("用户名或密码错误");
      }
    },
    reset() {
      this.form.teachId = "";
      this.form.teachPwd = "";
      this.$message.info("已重置");
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url(../../assets/images/bgLogin.png);
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
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

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_in {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
