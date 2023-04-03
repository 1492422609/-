<template>
  <div>
    <header>
      <div class="l-content">
        <!-- 顶部菜单按钮 -->
        <el-button
          plain
          icon="el-icon-menu"
          size="mini"
          @click="handleMenu"
        ></el-button>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{path: item.path}"
          >{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
      <div class="m-content">
        <h3>校训：严谨、勤奋、求实、创新</h3>
      </div>
      <div class="r-content">
        <el-dropdown trigger="click" size="mini">
          <span>
            <img class="user" :src="userImg" />
          </span>
          <!-- 下拉框 -->
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "CommonHeader",
  data() {
    return {
      activeIndex: "1",
      userImg: require("@/assets/images/user.png"),
      menu: [
        {
          label: "自主选课",
        },
        {
          label: "信息查询",
          children: [
            {
              label: "课程查询",
            },
            {
              label: "成绩查询",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // vuex：给菜单添加点击事件，并调用vuex的 collapseMenu方法（折叠/不折叠）
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut(){
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed:{
    // 面包屑数据
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  },
  mounted(){
    
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb{
  margin-left: 20px;
}
// 重写面包屑字体颜色
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: lightblue !important;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
}
.el-menu {
  background: #545c64;
  // width: 103.32%;
  margin-top: -2px;
  margin-left: -30px;
  padding: 0;
}
div {
  text-align: center;
  color: #fff;
}

</style>
