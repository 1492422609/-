<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 10px">
      <el-card shadow="hover" style="margin-left: 20px; width: 540px">
        <div class="user">
          <img :src="images.userImg" />
          <div class="userinfo">
            <h4 class="student">教师信息</h4>
            <p class="name">姓名：{{teach_name}}</p>
          </div>
          <i></i>
        </div>
        <div class="login-info">
          <p>学院：<span>{{teach_campus}}</span></p>
          <!-- <p>办公室：<span>A128</span></p> -->
        </div>
      </el-card>
      <el-card
        shadow="hover"
        style="margin-top: 10px; margin-left: 20px; height: 78px; width: 540px"
      >
        <div class="middle">
          <i></i>
          <img :src="images.clockImg" />
          <span class="time">现在时间是：{{ nowTime }}</span>
          <i></i>
        </div>
      </el-card>
      <el-card
        shadow="hover"
        style="margin-top: 10px; margin-left: 20px; width: 540px"
      >
        <div>
          <h2>{{ changeTime() }}</h2>
          <h3>欢迎来到皇家理工大学教务处</h3>
        </div>
      </el-card>
    </el-col>
    <el-col style="margin-top: 10px" :span="16">
      <el-card class="calendar" shadow="hover">
        <!-- <img :src="images.calendarImg" /> -->
        <el-calendar v-model="nowdate">
          <template v-slot:dateCell="{ data }">
            <div>
              <!-- 显示图片 -->
              <div v-for="item in arr" :key="item.day">
                <div v-if="data.day.slice(-2) == item.day">
                  <img :src="item.icon" style="width: 40px; height: 40px" />
                </div>
              </div>
              <!-- 获取到当前日：01、02 ... 31 -->
              <div class="spandate">{{ data.day.slice(-2) }}</div>
            </div>
          </template>
        </el-calendar>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      images: {
        userImg: require("@/assets/images/user.png"),
        calendarImg: require("@/assets/images/calendar.png"),
        clockImg: require("@/assets/images/clock.png"),
      },
      // 存放图片
      arr: [],
      // 获取当前的时间
      nowdate: new Date(),
      // time: '',
      // 实时时间
      nowTime: "",
      teach_name: "",
      teach_campus: ""
    };
  },
  created(){
    this.getData()
  },
  methods: {
    getData(){
      const result = localStorage.getItem('teacher')
      const res = JSON.parse(result)
      this.teach_name = res.teacher_name
      this.teach_campus = res.teacher_campus
      // this.stu_class = res.stu_class
      // this.teach_name = JSON.parse(localStorage.getItem('teacher').teacher_name)
    },
    showTime() {
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let second = date.getSeconds();
      let newHour = hour < 10 ? "0" + hour : hour;
      let newMinutes = minutes < 10 ? "0" + minutes : minutes;
      let newSecond = second < 10 ? "0" + second : second;
      let nowtime = `${newHour}：${newMinutes}：${newSecond}`;
      this.nowTime = nowtime;
    },
    changeTime() {
      let timer = new Date();
      let hour = timer.getHours();
      if (hour < 12) {
        return "Good Morning";
      } else if (hour > 12 && hour < 19) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
  },
  mounted() {
    setInterval(this.showTime);
    this.arr = [
      {
        day: this.nowdate.getDate(),
        icon: "https://img1.baidu.com/it/u=2605666904,1430073496&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      },
    ];
    console.log(this.nowdate.getDate());
  },
  beforeDestroyed() {
    clearInterval(this.showTime);
  },
};
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
  color: #79bbff;
  font-size: 40px;
}
h3 {
  text-align: center;
  color: #a0cfff;
  font-size: 30px;
}
.el-row {
  height: 100%;
  width: 100%;
}
.user {
  display: flex;
  justify-content: space-between;
}
.login-info p {
  margin-left: 200px;
  color: #999;
}
.name,
.time {
  color: #999;
}
.middle {
  display: flex;
  justify-content: space-around;
  .time {
    margin-top: 10px;
  }
}
.student {
  color: skyblue;
}
.login-info span {
  margin-left: 10px;
}
.calendar {
  margin-left: 160px;
  width: 700px;
}
.el-calendar {
  height: 520px;
}
</style>
