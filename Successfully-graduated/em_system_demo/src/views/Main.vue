<template>
  <el-container style="hight: 100%">

    <!-- 侧边栏 -->
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>

    <el-container>

      <!-- 头部 -->
      <el-header>
        <common-header></common-header>
      </el-header>
      <!-- tag栏 -->
        <common-tag/>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import CommonAside from "@/components/CommonAside";
import CommonTag from "@/components/CommonTag";
export default {
  name: "Home",
  components: {
    CommonHeader,
    CommonAside,
    CommonTag
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding: 0;
}
</style>
