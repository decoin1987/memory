<template>
  <div class="game-difficulty-wrapper">
    <label
      v-for="item in gameDifficultySetting"
      :key="item.difficulty"
      class="game-difficulty-radio"
      :class="
        gameDifficulty === item.difficulty
          ? 'game-difficulty-radio__checked'
          : ''
      "
    >
      <input type="radio" :value="item.difficulty" v-model="gameDifficulty" />
      <p>{{ item.name }}</p>
      <img
        :src="require(`@/assets/static/image/${item.img}`)"
        alt="easy game image"
      />
      <p>(поле {{ item.areaSize }} &times; {{ item.areaSize }})</p>
    </label>
  </div>
</template>

<script>
export default {
  name: "GameDifficultySetter",
  data() {
    return {
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
      gameDifficulty: "",
    };
  },
};
</script>

<style scoped></style>
