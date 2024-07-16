import {defineStore} from "pinia";

export const useWatchStore = defineStore("Watch", {
  state: () => ({
    datastate:false
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
  }
});
