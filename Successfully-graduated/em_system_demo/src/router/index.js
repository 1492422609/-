import Vue from "vue";
import VueRouter from "vue-router";
import Slogin from "@/views/Slogin";
import Login from "@/views/Login";
import Home from "@/views/Students/Home";
import Course from "@/views/Students/Course";
import SearchCourse from "@/views/Students/Information/searchCourse";
import SearchMessage from "@/views/Students/Information/searchMessage";
import SearchSchdule from "@/views/Students/Information/searchSchdule";
import SearchScore from "@/views/Students/Information/searchScore";
import SearchExam from "@/views/Students/Information/searchExam";
import Thome from "@/views/Teachers/Home";
import Tcourse from "@/views/Teachers/Course";
import Tscore from "@/views/Teachers/Scoreentry";
import ACourse from "@/views/Admin/Course";
import AHome from "@/views/Admin/Home";
import Main from "@/views/Main";

Vue.use(VueRouter);

// 修改路由不可重复点击问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [{
        path: "/",
        name: "Main",
        component: Main,
        redirect: "/Slogin",
        children: [
            // 学生
            {
                path: "home",
                name: "home",
                component: Home,
            },
            {
                path: "course",
                name: "course",
                component: Course,
            },

            {
                path: "/searchCourse",
                name: "searchCourse",
                component: SearchCourse,
            },
            {
                path: "/searchMessage",
                name: "searchMessage",
                component: SearchMessage,
            },
            {
                path: "/searchSchdule",
                name: "searchSchdule",
                component: SearchSchdule,
            },
            {
                path: "/searchExam",
                name: "searchExam",
                component: SearchExam,
            },
            {
                path: "/searchScore",
                name: "searchScore",
                component: SearchScore,
            },

            // 教师
            {
                path: "thome",
                name: "thome",
                component: Thome,
            },
            {
                path: "tcourse",
                name: "tcourse",
                component: Tcourse,
            },
            {
                path: "tscore",
                name: "tscore",
                component: Tscore,
            },
            // 管理员
            {
                path: "acourse",
                name: "acourse",
                component: ACourse,
            },
            {
                path: "ahome",
                name: "ahome",
                component: AHome,
            }
        ],
    },
    {
        path: "/slogin",
        name: "slogin",
        component: Slogin,
    },
    // 登录
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/* router.beforeEach((to, from, next) => {
    console.log(to, from);
    if (
        to.name === "home" ||
        to.name === "course" ||
        to.name === "searchCourse" ||
        to.name === "searchMessage" ||
        to.name === "searchSchdule" ||
        to.name === "searchExam" ||
        to.name === "searchScore" ||
        to.name === "acourse"
    ) {
        if (localStorage.getItem("teacher") === '') {
            next();
        } else {
            alert('抱歉，您无权查看此内容！')

        }
    } else {
        next();
    }
    if (
        to.name === "thome" ||
        to.name === "tcourse" ||
        to.name === "tscore" ||
        to.name === "acourse"
    ) {
        if (localStorage.getItem("student") === '') {
            next();
        } else {
            alert('抱歉，您无权查看此内容！')
            return
        }
    } else {
        next();
    }

}); */

/* router.beforeEach((to, from, next) => {
    console.log(to, from);
    if (
        to.name === "thome" ||
        to.name === "tcourse" ||
        to.name === "tscore" ||
        to.name === "acourse"
    ) {
        if (localStorage.getItem("student") === '') {
            next();
        } else {
            alert('抱歉，您无权查看此内容！')
            return
        }
    } else {
        next();
    }
}); */

export default router;