import { AuthService } from "@/services/api";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

const getters = {
  isAuthenticated: state => !!state.token
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) =>
    new Promise((resolve, reject) => {
      AuthService.auth(user)
        .then(response => {
          commit(AUTH_SUCCESS, response.data.token);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    }),
  [AUTH_LOGOUT]: ({ commit }) =>
    new Promise(resolve => {
      commit(AUTH_LOGOUT);
      resolve();
    })
};

const mutations = {
  [AUTH_SUCCESS]: (state, token) => {
    state.token = token;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};

const state = {
  token: ""
};

export default {
  state,
  getters,
  actions,
  mutations
};
