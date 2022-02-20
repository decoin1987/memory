<template>
  <div class="game-difficulty-wrapper">
    <label
      v-for="item in DIFFICULTY_SETTING"
      :key="item.difficulty"
      class="game-difficulty-radio"
      :class="
        GAME_DIFFICULTY.difficulty === item.difficulty
          ? 'game-difficulty-radio__checked'
          : ''
      "
    >
      <input @click="selectGameDifficulty(item)" type="radio" :value="item" />
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GameDifficultySetter",
  computed: {
    ...mapGetters(["DIFFICULTY_SETTING", "GAME_DIFFICULTY"]),
  },
  methods: {
    ...mapActions(["selectGameDifficulty"]),
  },
};
</script>

<style scoped></style>
