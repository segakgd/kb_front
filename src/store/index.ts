import { createStore } from 'vuex';

export default createStore({
  state: {
    authToken: null,
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setAuthToken', token);
    },
    logout({ commit }) {
      commit('clearAuthToken');
    },
  },
  getters: {
    isAuthenticated: state => !!state.authToken,
    authToken: state => state.authToken,
  },
});
