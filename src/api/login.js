import request from "@/utils/request";

//登录
export const loginApi = data => {
  return request.post("/vue-element-admin/user/login", data);
};
//获取用户信息
export const getInfoApi = token => {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token }
  });
};
