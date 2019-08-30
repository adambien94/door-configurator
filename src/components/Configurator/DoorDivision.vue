<template>
  <div id="door-division">
    <span class="configurator-heading">{{$t("message.doorDivision")}}</span>
    <form v-on:submit.prevent class="division-form">
      <fieldset class="division-form__field">
        <label for class="division-form__label">{{$t("message.numberOfBeams")}}:</label>
        <input type="number" class="division-form__input" v-model="beamsNum" />
        <button
          class="division-form__btn"
          :disabled=" beamsNum === 4"
          @click="beamsNum < 4 ? beamsNum++ : beamsNum"
        >+</button>
        <button
          class="division-form__btn"
          :disabled=" beamsNum === 0"
          @click="beamsNum > 0 ? beamsNum-- : beamsNum"
        >-</button>
      </fieldset>
      <fieldset class="division-form__field">
        <label for class="division-form__label">{{$t("message.numberOfPosts")}}:</label>
        <input type="number" class="division-form__input" v-model="postsNum" />
        <button
          class="division-form__btn"
          :disabled=" postsNum === 4"
          @click="postsNum < 4 ? postsNum++ : postsNum"
        >+</button>
        <button
          class="division-form__btn"
          :disabled=" postsNum === 0"
          @click="postsNum > 0 ? postsNum-- : postsNum"
        >-</button>
      </fieldset>
      <fieldset class="division-form__field">
        <label for class="division-form__label">{{$t("message.thickness")}} [cm]:</label>
        <input type="number" class="division-form__input" v-model="thickness" />
        <button
          class="division-form__btn"
          :disabled=" thickness === 6"
          @click="thickness < 6 ? thickness+=2 : thickness"
        >+</button>
        <button
          class="division-form__btn"
          :disabled=" thickness === 2"
          @click="thickness > 2 ? thickness-=2 : thickness"
        >-</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "door-division",
  data() {
    return {
      beamsNum: null,
      postsNum: null,
      thickness: null
    };
  },
  methods: {},
  computed: {
    beams() {
      return this.$store.state.door.beams;
    },
    posts() {
      return this.$store.state.door.posts;
    },
    divThickness() {
      return this.$store.state.door.divThickness;
    }
  },
  watch: {
    postsNum() {
      this.$store.commit("storePosts", this.postsNum);
    },
    beamsNum() {
      this.$store.commit("storeBeams", this.beamsNum);
    },
    thickness() {
      this.$store.commit("storeDivThickness", this.thickness);
    }
  },
  created() {
    this.beamsNum = this.beams;
    this.postsNum = this.posts;
    this.thickness = this.divThickness;
  }
};
</script>

<style scoped>
.division-form {
  padding-top: 15px;
  width: 219px;
}

.division-form__field {
  color: #848c93;
  margin-bottom: 9px;
  position: relative;
  height: 26px;
  line-height: 26px;
  border: none;
  text-align: right;
}

.division-form__input {
  width: 24px;
  height: 24px;
  border: 1px solid #a8a5a5;
  font-size: 12px;
  color: #848c93;
  text-align: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.division-form__btn {
  width: 25px;
  height: 25px;
  text-align: center;
  background: #cddbe5;
  color: #848c93;
  border: none;
  margin-left: 4px;
  cursor: pointer;
  transition: opacity 0.1s;
}

.division-form__label {
  float: left;
}

.division-form__btn:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
