import { defineStore } from 'pinia';
import axios from 'axios';

export const useQuestionsStore = defineStore({
  id: 'questions',
  state: () => ({
    questions: []
  }),
  actions: {
    async loadQuestions() {
      await axios
        .get('/api/questions')
        .then((response) => (this.questions = response.data))
        .catch((error) => []);
    },
    async saveQuestion(question) {
      const result = await axios
        .post('/api/questions', question)
        .then((response) => console.log(question))
        .catch((error) => console.log(error));

      return !!result;
    }
  }
});
