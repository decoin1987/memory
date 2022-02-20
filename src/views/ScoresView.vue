<template>
  <div>
    <div class="head-wrapper">
      <h1>Таблица лучших из лучших</h1>
    </div>
    <div class="setting-wrapper">
      <table v-if="sortedResultScore.length > 0">
        <thead>
          <td>Имя</td>
          <td>Очки</td>
          <td>Время</td>
          <td>Сложность</td>
        </thead>
        <tr v-for="(item, index) in sortedResultScore" :key="index" class="">
          <td>{{ item.name }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.dif }}</td>
        </tr>
      </table>
      <p v-else>Никто еще не поиграл, поиграйте и станьте лучшим</p>
    </div>
    <div class="action-wrapper">
      <p class="game-link game-link__start" @click="clearResult()">Почистить</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoresView",
  components: {},
  async beforeMount() {
    this.getLocalStorageResults();
  },
  data() {
    return {
      userScores: [],
    };
  },
  computed: {
    sortedResultScore() {
      let score = this.userScores;
      return score.sort(function (a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });
    },
  },
  methods: {
    getLocalStorageResults() {
      if (localStorage.getItem("user_scores")) {
        try {
          this.userScores = JSON.parse(localStorage.getItem("user_scores"));
        } catch (e) {
          localStorage.removeItem("user_scores");
        }
      } else {
        this.userScores = [];
      }
    },
    clearResult() {
      if (localStorage.getItem("user_scores")) {
        try {
          localStorage.removeItem("user_scores");
        } catch (e) {
          alert(e);
        }
      }
      this.getLocalStorageResults();
    },
  },
};
</script>
