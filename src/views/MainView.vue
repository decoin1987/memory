<template>
  <div>
    <div class="head-wrapper">
      <h1>Начните играть прямо сейчас, без регистраци и СМС</h1>
    </div>
    <div class="setting-wrapper">
      <h2>Выберите сложность игры</h2>
      <GameDifficultySetter />
      <h2>Выберите вид карточек</h2>
      <GameCardsSetter />
      <div class="action-wrapper">
        <router-link class="game-link game-link__start" to="/game">
          ИГРАТЬ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import GameDifficultySetter from "@/components/GameDifficultySetter";
import GameCardsSetter from "@/components/GameCardsSetter";
export default {
  name: "MainView",
  components: { GameCardsSetter, GameDifficultySetter },
  data() {
    return {};
  },
};
</script>
