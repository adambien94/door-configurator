<template>
  <div id="door-color">
    <span class="configurator-heading">{{ $t('message.chooseColor')}}</span>
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
        <label :for="'col-' + index" class="color-form__radio">{{$t('colors.' + colorName)}}</label>
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
      test: false,
      colors: {
        black: "#191919",
        gray: "#5A5858",
        white: "#F4F2F2",
        blue: "#6991B2",
        green: "seagreen",
        gold: "gold",
        coral: "coral",
        custom: null
      },
      myCol: null
    };
  },
  methods: {
    storeColor(col) {
      this.$store.commit("storeColor", col);
    },
    setCustomColor() {
      this.colors.custom = this.customColor;
    }
  },
  computed: {
    door() {
      return this.$store.getters.getDoors;
    },
    doorColor() {
      return this.door.color;
    },
    customColor() {
      return this.$store.getters.getCustomColor;
    }
  },
  watch: {
    customColor() {
      if (this.test) {
        this.setCustomColor();
        this.storeColor(this.customColor);
        this.myCol = this.customColor;
      }
    },
    doorColor() {
      this.myCol = this.doorColor;
    }
  },
  created() {
    this.myCol = this.doorColor;
    this.setCustomColor();
  },
  mounted() {
    this.test = true;
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
  padding-left: 19px;
  margin-top: 6px;
}

.color-form__radio:before,
.color-form__radio:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 0;
  transform: translateY(calc(-50% - 1px));
}

.color-form__radio:before {
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 3px solid #cddbe5;
}

.color-form__radio:after {
  background: #6991b2;
  width: 7px;
  height: 7px;
  left: 4px;
  opacity: 0;
}

.radio:checked + .color-form__radio:after {
  opacity: 1;
}
</style>
