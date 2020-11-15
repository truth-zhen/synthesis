import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/Layout/index.vue";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/Login")
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "首页",
        component: () => import("@/views/Homes/index"),
        meta: {
          title: "首页",
          icon: "homes"
        }
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    name: "权限管理",
    redirect: '/permission/directive',
    meta: {
      title: "权限管理",
      icon: "homes",
      roles: ["admin", "editor"]
    },
    children: [
      {
        path: "directive",
        name: "设置权限",
        component: () => import("@/views/permission/directive.vue"),
        meta: {
          title: "权限设置"
          //如果不设置角色，则表示:此页面不需要权限
        }
      },
      {
        path: "admins",
        name: "超级管理",
        component: () => import("@/views/permission/admins"),
        meta: {
          title: "超级 管理",
          roles: ["admin"]
        }
      },
      {
        path: "editors",
        name: "编辑管理",
        component: () => import("@/views/permission/editors"),
        meta: {
          title: "编辑 管理",
          roles: ["editor"]
        }
      }
    ]
  }
];
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    // mode: "history"
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
