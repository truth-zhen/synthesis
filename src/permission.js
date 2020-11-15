import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"]; //没有重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  //确定用户是否已经登录
  const hasToken = getToken();

  if (hasToken) {
    //如果已登录，则重定向到主页
    if (to.path === "/login") {
      //如果已登录，则重定向到主页
      next({ path: "/" });
      NProgress.done();
    } else {
      //确定用户是否通过getInfo获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          //获取用户信息
          //注意:角色必须是一个对象数组!例如:['admin']或['developer'，'editor']
          const { roles } = await store.dispatch("user/getInfo");
          //根据角色生成可访问路由图
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          //动态添加可访问路由
          router.addRoutes(accessRoutes);
          //hack方法，以确保addRoutes是完整的
          //设置replace: true，这样导航将不会留下历史记录
          // console.log({ ...to, replace: true })
          next({ ...to, replace: true });
        } catch (error) {
          Message.error(error || 'Has Error')
          NProgress.done()
        }
      }
    }
  } else {
    /*没有token*/
    if (whiteList.indexOf(to.path) !== -1) {
      //在免费登录白名单中，直接登录
      next();
    } else {
      //其他没有访问权限的页面被重定向到登录页面。
      next(`/login`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  //完成进度条
  NProgress.done()
})