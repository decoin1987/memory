<template>
  <div class="game-difficulty-wrapper">
    <label
      v-for="card in CARD_SHIRT_SETTING"
      :key="card.id"
      class="game-cards-view"
      :class="CARD_SHIRT.id === card.id ? 'game-cards-view__checked' : ''"
    >
      <input type="radio" @click="selectCardShirt(card)" :value="card.id"/>
      <img :src="require(`@/assets/static/image/cards/${card.img}`)" />
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "GameCardsSetter",
  computed: {
    ...mapGetters(["CARD_SHIRT_SETTING", "CARD_SHIRT"]),
  },
  methods: {
    ...mapActions(["selectCardShirt"]),
  },
};
</script>

<style scoped></style>
