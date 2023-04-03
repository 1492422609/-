<template>
  <div>
    <div class="manage-header">
      <el-button type="primary" @click="addStudent">+ 新增</el-button>
      <el-input
        placeholder="输入课程编号查询..."
        v-model="course.class_id"
      ></el-input>
      <el-input
        placeholder="输入课程名查询..."
        v-model="course.class_name"
      ></el-input>
      <el-input
        placeholder="输入学院名查询..."
        v-model="course.class_campus"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      width="70%"
      class="dialog"
      :title="operateType === 'add' ? '新增信息' : '更改信息'"
      :visible.sync="isShow"
    >
      <el-form ref="form" label-width="70px" :model="form" :inline="true">
        <el-form-item
          v-for="item in formLabel"
          :key="item.label"
          :label="item.label"
        >
          <el-input
            :disabled="true"
            v-if="item.prop === 'class_id'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_id"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_name'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_name"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_address'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_address"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_time1'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_time1"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_time2'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_time2"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_time3'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_time3"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_time4'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_time4"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_time5'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_time5"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_testtime'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_testtime"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_week'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_week"
          >
          </el-input>
          <el-input
            v-if="item.prop === 'class_campus'"
            :placeholder="'请输入' + item.label"
            v-model="form.class_campus"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%">
      <!-- :label：绑定首行数据 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in formLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteClass(scope.row)"
            >删除</el-button
          >
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
  name: "Course",
  data() {
    return {
      show: true,
      operateType: "add",
      isShow: false,
      course: {
        class_id: "",
        class_name: "",
        class_campus: "",
      },
      form: {
        class_id: "",
        class_name: "",
        class_address: "",
        class_time1: "",
        class_time2: "",
        class_time3: "",
        class_time4: "",
        class_time5: "",
        class_testtime: "",
        class_week: "",
        class_campus: "",
      },
      formLabel: [
        {
          prop: "class_id",
          label: "课程编号",
          type: "input",
        },
        {
          prop: "class_name",
          label: "课程名称",
        },
        {
          prop: "class_time1",
          label: "周一",
          width: 110,
        },
        {
          prop: "class_time2",
          label: "周二",
          width: 110,
        },
        {
          prop: "class_time3",
          label: "周三",
          width: 110,
        },
        {
          prop: "class_time4",
          label: "周四",
          width: 110,
        },
        {
          prop: "class_time5",
          label: "周五",
          width: 110,
        },
        {
          prop: "class_address",
          label: "上课地点",
        },
        {
          prop: "class_testtime",
          label: "考试时间",
        },
        {
          prop: "class_week",
          label: "始末周",
        },
        {
          prop: "class_campus",
          label: "开设学院",
        },
      ],
      tableData: [
        {
          class_id: "1",
          class_name: "JavaEE",
          class_time1: "周一",
          class_time2: "周二",
          class_time3: "周三",
          class_time4: "周四",
          class_time5: "周五",
          class_address: "B404",
          class_testtime: "06.28",
          class_week: "1-14周",
          class_campus: "信控学院",
        },
      ],
      // 分页相关模型数据
      pagination: {
        currentPage: 1, //当前页
        pageSize: 3, //每页显示的记录数
        total: 8, //总记录数
      },
    };
  },
  methods: {
    // 新增
    addStudent() {
      this.isShow = true;
      this.operateType = "add";
      this.form = {
        class_id: "",
        class_name: "",
        class_time1: "",
        class_time2: "",
        class_time3: "",
        class_time4: "",
        class_time5: "",
        class_address: "",
        class_testtime: "",
        class_week: "",
        class_campus: "",
      };
    },
    // 查询
    search() {
      if (
        this.course.class_id === "" &&
        this.course.class_name === "" &&
        this.course.class_campus === ""
      ) {
        this.$message.warning("用户框内容不能全为空");
      }else{
      let param = [
        { class_id: this.course.class_id },
        { class_name: this.course.class_name },
        { class_campus: this.course.class_campus },
      ];
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/queryCourseM",
        data: param,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        this.tableData = resp.data;
        this.show = false;
        this.$message.success("查询成功");
        console.log("课程管理请求到的tableData---", this.tableData);
      });
      }
    },
    // 弹出框的确认按钮
    confirm() {
      // 当点击的是新增的确定，调用新增方法
      if(this.operateType === 'add'){
        this.add()
        this.isShow = false;
        // 当点击的是编辑的确定时
      }else if(this.operateType === "edit"){
         axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/updateCourse",
        // data: param,
        data: this.form
      }).then((res) => {
        console.log(res);
        if (res.data) {
          this.$message.info("修改成功！");
        } else {
          this.$message.info("修改失败！");
        }
        this.isShow = false;
        this.getAll();
      });
      }
      
    },
    // 编辑
    handleEdit(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.form = row;

    },
    // 添加课程
    add() {
      /* let param = {
        class_name: this.form.class_name,
        class_address: this.form.class_address,
        class_time1: this.form.class_time1,
        class_time2: this.form.class_time2,
        class_time3: this.form.class_time3,
        class_time4: this.form.class_time4,
        class_time5: this.form.class_time5,
        class_testtime: this.form.class_testtime,
        class_week: this.form.class_week,
        class_campus: this.form.class_campus,
      }; */
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/addCourse",
        // data: param,
        data: this.form
      }).then((res) => {
        console.log(res);
        if (res.data) {
          this.$message.info("添加成功！");
        } else {
          this.$message.info("添加失败！");
        }
        this.getAll();
      });
    },
    // 删除课程
    delete(row) {
      axios({
        method: "post",
        url: "http://localhost:8080/pro_qst/deleteCourseM/" + row.class_id,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          this.$message.success("删除成功！");
        } else {
          this.$message.info("删除失败！");
        }
        this.getAll();
      });
    },
    deleteClass(row) {
      this.delete(row);
    },
    // 分页查询
    getAll() {
      axios
        .post(
          "http://localhost:8080/pro_qst/queryAll/" +
            this.pagination.currentPage +
            "/" +
            this.pagination.pageSize
        )
        .then((res) => {
          this.pagination.pageSize = res.data.pageSize;
          this.pagination.currentPage = res.data.pageNum;
          this.pagination.total = res.data.total;

          this.tableData = res.data.list;
          console.log("teacher请求到的tableData---", this.tableData);
          console.log("一页的数据", res.data.pageSize);
          console.log("当前页", res.data.pageNum);
          console.log("总数据", res.data.total);
        });
    },
    // 切换页码
    handleCurrentChange(currentPage) {
      // 修改页码值为当前选中页码值
      this.pagination.currentPage = currentPage;
      // 执行查询
      this.getAll();
    },
  },
  mounted() {
    // this.showData();
    this.getAll()
  },
};

</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  .el-button {
    margin: 40px;
    height: 45px;
  }
  .el-input {
    margin-top: 40px;
    margin-left: 40px;
    width: 200px;
  }
}

.dialog {
  .el-input {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.pagination-container {
  display: flex;
  justify-content: space-between;
}
.el-pagination {
  margin-top: 10px;
  margin-right: 20px;
}
</style>
