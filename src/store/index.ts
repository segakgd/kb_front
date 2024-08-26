import { createStore } from 'vuex';
import errorModule from "@/store/error";

export interface RootState {
  // other states
}

export default createStore<RootState>({
  modules: {
    error: errorModule,
  },
});
