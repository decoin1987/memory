<template>
  <nav class="nav">
    <div class="nav__container">
      <img src="@/assets/static/image/logo.png" alt="memory game logo" />
      <div class="nav__link-block">
        <router-link class="nav__link" to="/">Главная</router-link>
        <router-link class="nav__link" to="/game">Играть</router-link>
        <router-link class="nav__link" to="/scores"> Результаты </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "gameNavigation",
};
</script>

<style scoped></style>
