<template>
  <div class="game-container">
    <div v-if="loading === true || cardsLeft === 0" class="overlay-loading">
      <LoadingIcon v-if="loading === true" />
      <div v-else class="">
        <div class="head-wrapper">
          <h1>УРА ВЫ ПРОШЛИ ИГРУ!</h1>
          <h2>Круче вас теперь только Чак Норрис!</h2>
        </div>
        <div class="score-wrapper">
          <p>Ваше время: {{ time }}</p>
          <p>Вы набрали: {{ scores }}</p>
          <p>Введите ваше имя:</p>
          <input
            v-model="username"
            type="text"
            class="usermane-input"
            @keydown.enter="addUserState()"
          />
          <p class="game-link game-link__start" @click="addUserState()">
            Записать результаты
          </p>
          <h3>Кстати вы знали что: {{ randomChakie }}</h3>
        </div>
      </div>
    </div>
    <div class="head-wrapper">
      <h1>
        {{
          currentTime !== 0
            ? "Запомните карточки" + currentTime
            : "Стартуем! Ваши Очки:" + scores + "Время:" + time
        }}
      </h1>
    </div>
    <div id="boardWrapper" class="board-wrapper">
      <div
        class="card-board"
        :style="`grid-template-columns: repeat(${GAME_DIFFICULTY.areaSize}, 65px)`"
      >
        <div
          @click="carryStateCard(card)"
          v-for="card in cards"
          :key="card.id"
          :ref="card.id"
          class="card"
        >
          <div class="front">
            <img
              :src="require(`@/assets/static/image/cards/${CARD_SHIRT.img}`)"
              alt=""
            />
          </div>
          <div class="back">
            <div class="overlay" />
            <img :src="card.sideImg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="action-wrapper">
      <p class="game-link game-link__start" @click="startGameFunc()">Заново</p>
      <router-link class="game-link game-link__stop" to="/">
        Наигрался
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoadingIcon from "@/assets/static/icon/LoadingIcon";
export default {
  name: "GameView",
  components: { LoadingIcon },
  data() {
    return {
      username: null,
      chackNorrisMemes: [
        "Чак Норрис досчитал до бесконечности. Дважды",
        "Когда Чак Норрис режет лук, лук плачет",
        "Чак Норрис — единственный человек, который обыграл стену в теннис",
        "Нет никакой теории эволюции — просто список существ, которых Чак Норрис пощадил",
        "Чак Норрис выиграл в „Counter-Strike“, играя за заложников",
        "Единственная вещь, способная порезать Чака Норриса, — это Чак Норрис",
        "Чак Норрис никогда не читает книги. Он смотрит на них в упор, пока не получает всю необходимую ему информацию",
        "Чак Норрис подхватил коронавирус. Теперь коронавирус на самоизоляции",
        "Чак Норрис может майнить биткоины без видеокарты в уме",
        "Чак Норрис может удалить Корзину",
        'Чак Норрис смог намазать "Спасибо" на хлеб сантехнику',
        "Чак Норрис бегает настолько быстро, что может толкнуть себя в спину",
        "Чак Норрис может остановить бензопилу голыми руками и это не шутка!",
        "Чак Норрис на столько умело играет в баскетбол, что забрасывает кольцо в мяч.",
        "Чак Норрис собрал всех покемонов по городскому телефону",
        "Чак - лох. Если бы он на самом деле был такой крутой, то просто зашёл бы ко мне домой и начал стучать моим лицом по клавитпцшажфут ити ит е4",
        "Чак Норрис берет баллончик слезоточивого газа, чтобы поперчить свой бифштекс",
        "Чак Норрис вчера играл на гитаре. И выиграл",
      ],
      showCardTimer: null,
      currentShowCardTime: 5,
      cardForFlippedId: null,
      globalTimer: null,
      globalTime: 0,
      currentTime: 5,
      timer: null,
      scores: 0,
      cards: [],
      cardComparsion: [],
      loading: true,
      cardsLeft: null,
    };
  },
  computed: {
    ...mapGetters(["GAME_DIFFICULTY", "CARD_SHIRT", "IMAGES_FOR_GAME"]),
    time() {
      let hours = Math.floor(this.globalTime / 60 / 60);
      let minutes = Math.floor(this.globalTime / 60) - hours * 60;
      let seconds = this.globalTime % 60;
      let time = [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");
      return time;
    },
    randomChakie() {
      const min = 0;
      const max = this.chackNorrisMemes.length;
      const index = Math.floor(Math.random() * (max - min)) + min;
      return this.chackNorrisMemes[index];
    },
  },
  watch: {
    cardsLeft(cards) {
      if (cards === 0) {
        this.stopGlobalTimer();
      }
    },
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
        this.hideCards();
        this.startGlobalTimer();
        this.canvasUnBlocked();
      }
    },
    currentShowCardTime(time) {
      if (time === 0) {
        this.cardFlipper(this.cardForFlippedId, false);
        this.cardForFlippedId = null;
        this.cardComparsion = [];
        this.stopShowCardTimer();
      }
    },
  },
  mounted() {
    this.startGameFunc();
  },
  destroyed() {
    this.stopTimer();
    this.stopGlobalTimer();
    this.stopShowCardTimer();
  },
  methods: {
    ...mapActions(["getImage"]),
    compareCard(first, second) {
      const COMPARE = first === second;
      return COMPARE;
    },
    async carryStateCard(card) {
      // Функция написана по принципу каррирования
      // принимает значения пока в ней не будет 2 значения
      this.cardComparsion.push(card);
      this.cardFlipper(card.id);
      // Как только массив карточек для сравнения стал больше одного
      // сравниваем значения в массиве this.compareCard()
      // не запускаем функцию из блока if что бы она запустилась только один раз
      if (this.cardComparsion.length > 1) {
        const FIRST_CARD = this.cardComparsion[0].id;
        const SECOND_CARD = this.cardComparsion[1].id;
        const COMPARE = this.compareCard(
          this.cardComparsion[0].ref,
          this.cardComparsion[1].ref
        );
        // Удаляем таймер переворота карточки
        this.stopShowCardTimer();
        if (COMPARE) {
          // Если ref у обоих карточек одинаков блокируем поле для игры
          this.canvasBlocked();
          setTimeout(() => {
            // Анимируем карточки
            this.cardSuccess(FIRST_CARD);
            this.cardSuccess(SECOND_CARD);
            // Изменяем значение оставшихся в игре карточек
            this.cardsLeft = this.cardsLeft - this.cardComparsion.length;
            // Прибавляем очки
            this.scores++;
            // Обнуляем массив карточек для сравнения
            this.cardComparsion = [];
            // Разблокируем поле для игры
            this.canvasUnBlocked();
          }, 300);
        } else if (!COMPARE) {
          // Если ref у карточек раный также блокируем поле для игры
          this.canvasBlocked();
          setTimeout(() => {
            // Анимируем карточки
            this.cardError(FIRST_CARD);
            this.cardError(SECOND_CARD);
          }, 700);
          setTimeout(() => {
            // Переворачиваем карточки с флагом таймера false
            // Что бы таймер не срабатывал
            this.cardFlipper(FIRST_CARD, false);
            this.cardFlipper(SECOND_CARD, false);
            // Обнуляем массив карточек для сравнения
            this.cardComparsion = [];
            // Разблокируем поле для игры
            this.canvasUnBlocked();
          }, 900);
          // Забираем очки
          this.scores--;
        }
      }
    },
    async startGameFunc() {
      // Удаляем предыдущий глобальный таймер и таймер обратного отсчета
      this.stopTimer();
      this.stopGlobalTimer();
      // Обнуляем текущие значения игры
      this.scores = 0;
      this.globalTime = 0;
      this.currentTime = 5;
      // Запускаем генерацию карточек
      await this.arrayGenerator();
      // Устанавливаем количество карточек в игре
      this.cardsLeft = this.GAME_DIFFICULTY.areaSize ** 2;
      // После загрузки карточек блокируем поле и показываем карточки 5 сек.
      this.canvasBlocked();
      this.startTimer();
      this.showCards();
    },
    async arrayGenerator() {
      // Определяем общее количество карточек
      const totalCards = this.GAME_DIFFICULTY.areaSize ** 2;
      const totalRefNum = totalCards / 2;
      // Если картинок для карточек нет в сторе или их количество меньше загружаем картинки
      if (this.IMAGES_FOR_GAME.length < totalRefNum) {
        // console.log("Картинок не хватает");
        // console.log("Нужно картинок", totalRefNum);
        this.loading = true;
        await this.getImage(totalRefNum);
        this.loading = false;
      }
      // Генерируем массив для присвоения карточкам ref атрибута
      const refArray = this.generateCardsRef(totalRefNum);
      // Создаем массив карточек
      let cards = [];
      // Пушим в массив карточки, пока массив не будет нужной длины
      // ref = Число из массива refArray
      // id = Порядковый номер итерации
      // sideImg - Картинка из загруженного массива, так как за основу взят refArray
      // все картинки будут повторятся 2 раза, у одинаковых ref будут одинаковые картинки
      for (let i = 0; i < totalCards; ++i) {
        let ref = refArray[i];
        let id = i + 1;
        let sideImg = this.IMAGES_FOR_GAME[refArray[i] - 1].src.tiny;
        cards.push({
          id,
          ref,
          sideImg,
        });
      }
      this.cards = cards;
      this.loading = false;
    },
    // Анимации карточек
    // анимация построена на передаче порядкового номера карточки
    // и последующим обращением к нужному элементу DOM через имя атрибута ref
    // ref при построении DOM :22 и ref в массиве cards разные сущности
    // я не придумал как назвать по другому ^_^
    // ну и решение через обращение к $refs мне кажется быстрее
    // чем присвоение data-attribute и последующий поиск по нему
    cardFlipper(id, timer = true) {
      // Блокируем карточку, карточка переворачивается одной функцией
      // поэтому если происходит поворт 2 раза карточка не будет заблокирована
      // а переворот один раз избавляет от логики блокирования совпавших карточек
      this.cardBlocked(id);
      // Если для карточки уже задан таймер удаляем его,
      if (this.showCardTimer !== null && timer === true) {
        this.stopShowCardTimer();
      }
      // флаг timer для управления запуском таймера по дефолту true
      if (timer === true) {
        this.startShowCardTimer();
        this.cardForFlippedId = id;
      }
      this.$refs[id][0].classList.toggle("flipped");
    },
    cardBlocked(id) {
      this.$refs[id][0].classList.toggle("blocked");
    },
    cardError(id) {
      this.$refs[id][0].classList.toggle("shake");
      setTimeout(() => {
        this.$refs[id][0].classList.toggle("shake");
      }, 500);
    },
    // Анимация совпавших карточек не содержит переворачивания
    // поэтому таймер срабатывания реализован внутри функции
    cardSuccess(id) {
      setTimeout(() => {
        this.$refs[id][0].classList.toggle("success");
      }, 300);
    },
    // Массовый поворот карточек: пробегаем по всем индексам массива $this.refs
    // переопределяем класс
    showCards() {
      for (let i in this.cards) {
        i++;
        this.$refs[i][0].className = "card flipped";
      }
    },
    hideCards() {
      for (let i in this.cards) {
        i++;
        this.$refs[i][0].className = "card";
      }
    },
    // Обращаемся к полю для игры через id
    // что бы массив $refs состоял только из карточек
    canvasBlocked() {
      document.getElementById("boardWrapper").className =
        "board-wrapper blocked";
    },
    canvasUnBlocked() {
      document.getElementById("boardWrapper").className = "board-wrapper";
    },
    // Генератор ref атрибута для карточки, два раза генерируем
    // массив случайных чисел
    generateCardsRef(total) {
      const cardsRef = this.generateArrayRandomNumber(total).concat(
        this.generateArrayRandomNumber(total)
      );
      return cardsRef;
    },
    // Генератор массива случайных чисел от 1
    // Последнее число получаем из половинны всех карточек :180
    generateArrayRandomNumber(total) {
      // Код честно взят из интернета (прошу простить)
      let array = [];
      for (let i = 1; i <= total; ++i) {
        array.push(i);
      }
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    // Таймеры
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    startGlobalTimer() {
      this.globalTimer = setInterval(() => {
        this.globalTime++;
      }, 1000);
    },
    stopGlobalTimer() {
      clearTimeout(this.globalTimer);
    },
    startShowCardTimer() {
      this.showCardTimer = setInterval(() => {
        this.currentShowCardTime--;
      }, 1000);
      // console.log("StartCardTimer: ", this.showCardTimer);
    },
    stopShowCardTimer() {
      if (this.showCardTimer !== null) {
        clearTimeout(this.showCardTimer);
        // console.log("StopCardTimer: ", this.showCardTimer);
      }
    },
    // Запись результатов в таблицу
    getLocalStorageResults() {
      if (localStorage.getItem("user_scores")) {
        try {
          const scores = JSON.parse(localStorage.getItem("user_scores"));
          return scores;
        } catch (e) {
          localStorage.removeItem("user_scores");
        }
      } else {
        return [];
      }
    },
    addUserState() {
      const scoresTable = this.getLocalStorageResults();
      console.log(scoresTable);
      let scores = [];
      if (this.username !== null && this.username !== "") {
        scores = {
          name: this.username,
          time: this.time,
          score: this.scores,
          dif: this.GAME_DIFFICULTY.difficulty,
        };
      } else {
        scores = {
          name: "Анонимус",
          time: this.time,
          score: this.scores,
          dif: this.GAME_DIFFICULTY.difficulty,
        };
      }
      console.log("Очки", scores);
      scoresTable.unshift(scores);
      this.saveUserState(scoresTable);
      this.$router.push("/scores");
    },
    saveUserState(scores) {
      const parsed = JSON.stringify(scores);
      localStorage.setItem("user_scores", parsed);
    },
  },
};
</script>
