<template>
  <div id="app">
    <GameNavigation />
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import GameNavigation from "@/components/GameNavigation";
import { mapActions } from "vuex";
export default {
  components: { GameNavigation },
  async beforeMount() {
    this.setDefaultGameDifficulty();
    this.setDefaultCardShirt();
  },
  methods: {
    ...mapActions(["setDefaultGameDifficulty", "setDefaultCardShirt"]),
  },
};
</script>

<style lang="scss"></style>
