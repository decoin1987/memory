import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    cardShirtSetting: [
      { id: 1, img: "1.jpg" },
      { id: 2, img: "2.jpg" },
      { id: 3, img: "3.jpg" },
      { id: 4, img: "4.jpg" },
    ],
    cardShirt: [],
    gameDifficultySetting: [
      {
        name: "Легко",
        difficulty: "easy",
        areaSize: 2,
        img: "easy.webp",
      },
      {
        name: "Нормально",
        difficulty: "normal",
        areaSize: 4,
        img: "normal.webp",
      },
      {
        name: "Сложно",
        difficulty: "hard",
        areaSize: 6,
        img: "hard.webp",
      },
    ],
    gameDifficulty: [],
  },
  getters: {
    DIFFICULTY_SETTING(state) {
      return state.gameDifficultySetting;
    },
    GAME_DIFFICULTY(state) {
      return state.gameDifficulty;
    },
    IMAGES_FOR_GAME(state) {
      return state.images;
    },
    CARD_SHIRT_SETTING(state) {
      return state.cardShirtSetting;
    },
    CARD_SHIRT(state) {
      return state.cardShirt;
    },
  },
  mutations: {
    loadImagesForGame(state, images) {
      state.images = images;
    },
    setGameDifficulty(state, item) {
      state.gameDifficulty = item;
    },
    setCardShirt(state, item) {
      state.cardShirt = item;
    },
    setStateAPILoading() {},
  },
  actions: {
    async getImage(ctx, num) {
      // Если картинок нет или не хватает загружаем
      if (this.state.images.length < num) {
        const resp = await fetch(
          `https://api.pexels.com/v1/curated?page=1&per_page=${num}`,
          {
            headers: {
              Authorization:
                "563492ad6f9170000100000104617248f24b4eb3b3e84088fe613b13",
            },
          }
        );
        const images = await resp.json();
        // console.log("Загружено картинок: " + images.photos.length);
        ctx.commit("loadImagesForGame", images.photos);
      }
    },
    setDefaultGameDifficulty(ctx) {
      if (this.state.gameDifficulty.length < 1) {
        ctx.commit("setGameDifficulty", this.state.gameDifficultySetting[1]);
      }
    },
    selectGameDifficulty(ctx, item) {
      if (item !== this.state.gameDifficulty) {
        ctx.commit("setGameDifficulty", item);
      }
    },
    setDefaultCardShirt(ctx) {
      if (this.state.cardShirt.length < 1) {
        ctx.commit("setCardShirt", this.state.cardShirtSetting[0]);
      }
    },
    selectCardShirt(ctx, item) {
      if (item !== this.state.cardShirt) {
        ctx.commit("setCardShirt", item);
      }
    },
  },
  modules: {},
});
