<template>
  <div id="door-color">
    <span class="configurator-heading">Choose color</span>
    <form action class="color-form">
      <fieldset class="color-form__field" v-for="(color, colorName,index) in colors">
        <div class="color-form__color" :style="'background-color:' + color"></div>
        <input
          type="radio"
          name="color-rd"
          :id="'col-' + index"
          class="radio"
          :value="color"
          v-model="myCol"
          @click="storeColor(color)"
        />
        <label :for="'col-' + index" class="color-form__radio">{{colorName}}</label>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "door-color",
  data() {
    return {
      doorWidth: 0,
      doorHeight: 0,
      colors: {
        black: "#191919",
        gray: "#5A5858",
        white: "#F4F2F2",
        blue: "#6991B2",
        green: "seagreen",
        gold: "gold",
        coral: "coral"
      },
      myCol: null
    };
  },
  methods: {
    storeColor(col) {
      this.$store.commit("storeColor", col);
    }
  },
  computed: {
    doorColor() {
      return this.$store.state.door.color;
    }
  },
  created() {
    this.myCol = this.doorColor;
  }
};
</script>

<style scoped>
.color-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 230px;
  padding-top: 15px;
}
.color-form__field {
  width: calc(100% / 3);
  border: none;
  margin-bottom: 15px;
}

.color-form__color {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: lightgrey;
  margin-left: 6px;
}

.color-form__radio {
  display: inline-block;
  color: #848c93;
  position: relative;
  cursor: default;
  left: 19px;
  margin-top: 6px;
}

.color-form__radio:before,
.color-form__radio:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translateY(calc(-50% - 1px));
}

.color-form__radio:before {
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 3px solid #cddbe5;
  right: calc(100% + 4.5px);
}

.color-form__radio:after {
  background: #6991b2;
  width: 7px;
  height: 7px;
  right: calc(100% + 8.5px);
  opacity: 0;
  /* transition: opacity 0.05s; */
}

.radio:checked + .color-form__radio:after {
  opacity: 1;
}
</style>
