// import Cookie from 'js-cookie'
export default {
  state: {
    // 是否折叠菜单
    isCollapse: false,
    //面包屑：定义初始数据（首页）
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    // 选中的菜单显示高亮
    // currentMenu: null,
  },
  mutations: {
    // 折叠/不折叠
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 为被点击的菜单配置tabsList
    selectMenu(state, val){
        // 当前点击的不是home页
        if(val.name !== 'home'){
            // state.currentMenu = val
            console.log('val',val); // val是tabsList里面的数据
            // 点击的菜单不是home主页->result为-1
            const result = state.tabsList.findIndex(item => item.name === val.name)
            // 点击的不是主页，在tabsList 中存放被点击到的信息
            if(result === -1){
                state.tabsList.push(val)
            }
        }else{
            // 如果选中的菜单是首页，对菜单重置
            // state.currentMenu = null
        }
    },
    // 删除tag
    closeTag(state, val){
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    }
  },
};
