import { loginApi, getInfoApi } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(), //默认为空
  roles: [],
  name: "",
  avatar: "",
  introduction: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  }
};

const actions = {
  loginStore({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      loginApi({ username, password })
        .then(res => {
          const { data } = res;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoApi(state.token)
        .then(({ data }) => {
          if (!data) {
            reject("验证失败，请重新登录");
          }

          const { roles, name, avatar, introduction } = data;
          //角色必须是非空数组
          if (!roles || roles.length <= 0) {
            reject("角色必须是非空数组");
          }
          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
