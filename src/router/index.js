import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import ScoresView from "../views/ScoresView.vue";
import GameView from "../views/GameView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
  {
    path: "/scores",
    name: "scores",
    component: ScoresView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
