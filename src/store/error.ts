import { Module } from 'vuex';
import { RootState } from '../index';

export interface ErrorState {
  errorMessage: string;
  hasError: boolean;
}

const errorModule: Module<ErrorState, RootState> = {
  namespaced: true,
  state: {
    errorMessage: '',
    hasError: false,
  },
  mutations: {
    setError(state, message: string) {
      state.errorMessage = message;
      state.hasError = true;
    },
    clearError(state) {
      state.errorMessage = '';
      state.hasError = false;
    },
  },
  actions: {
    triggerError({ commit }, message: string) {
      commit('setError', message);
    },
    resetError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    errorMessage: (state) => state.errorMessage,
    hasError: (state) => state.hasError,
  },
};

export default errorModule;
