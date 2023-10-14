import { defineStore } from 'pinia';
import axios from 'axios';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    user: {}
  }),
  getters: {
    isAuth: (state) => state.user.email?.length > 0
  },
  actions: {
    async registerUser(user) {
      const result = await axios
        .post('/api/auth/login', user)
        .then((response) => (this.user = response.data))
        .catch((error) => this.resetUser());

      return !!result;
    },
    resetUser() {
      this.user = {};
    }
  }
});
