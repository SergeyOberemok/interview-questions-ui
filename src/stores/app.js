import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    user: {}
  }),
  getters: {
    isAuth: (state) => state.user.email?.length > 0
  },
  actions: {
    resetUser() {
      this.user = {};
    }
  }
});
