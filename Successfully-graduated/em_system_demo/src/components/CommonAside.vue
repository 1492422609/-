<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="skyblue"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <!-- 根据isCollapse的值来判断显示的内容 -->
    <h3>{{ isCollapse ? "..." : "高校实习管理系统" }}</h3>
    <!-- 一级菜单 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <!-- 有了插槽，折叠以后就会隐藏文字内容 -->
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 二级菜单 -->
    <el-submenu
      v-for="item in hasChildren" :index="item.name + ''" :key="item.name"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <!-- 有了插槽，折叠以后就会隐藏文字内容 -->
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      // 侧边栏要展示的信息
      menu: [
        {
          // 这里的path用于添加面包屑后的侧边栏高亮显示
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          // url: 'Home/Home',
        },
        {
          path: '/course',
          name: 'course',
          label: '岗位信息查询',
          icon: 'notebook-2',
          // url: 'Course/Course'
        },
        {
          name: 'information',
          label: '信息查询',
          icon: 'notebook-1',
          children: [
            {
                path: '/searchCourse',
                name: 'searchCourse',
                label: '查询个人信息',
                // url: 'SearchCourse/SearchCourse'
            },
            {
                path: '/searchMessage',
                name: 'searchMessage',
                label: '选课名单查询',
                // url: 'SearchMessage/SearchMessage'
            },
            {
                path: '/searchSchdule',
                name: 'searchSchdule',
                label: '学生课表查询',
                // url: 'SearchSchdule/SearchSchdule'
            },
            {
                path: '/searchExam',
                name: 'searchExam',
                label: '考试信息查询',
                // url: 'SearchExam/SearchExam'
            },
            {
                path: '/searchScore',
                name: 'searchScore',
                label: '学生成绩查询',
                // url: 'SearchScore/SearchScore'
            },
            
          ],
        },
        {
          path: '/thome',
          name: 'thome',
          label: '首页',
          icon: 's-home',
        },
        {
          path: '/tcourse',
          name: 'tcourse',
          label: '课程信息',
          icon: 'document',
        },
        {
          path: '/tscore',
          name: 'tscore',
          label: '成绩录入',
          icon: 'files',
        },
        {
          path: '/acourse',
          name: 'acourse',
          label: '课程管理',
          icon: 'files',
        },
        /* {
          path: '/ahome',
          name: 'ahome',
          label: '首页',
          icon: 'files',
        }, */
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击侧边栏菜单进行路由跳转
    clickMenu(item){
      this.$router.push({
        name: item.name
      })
      // console.log(item.name);
      this.$store.commit('selectMenu', item)
    },
  },
  computed: {
    // 返回没有孩子的子数据
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    // 返回有孩子的子数据
    hasChildren(){
      return this.menu.filter((item) => item.children);
    },
    // vuex：根据isCollapse的值判断是否折叠
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  // width: auto; 设置width会卡顿
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
