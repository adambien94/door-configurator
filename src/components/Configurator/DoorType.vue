<template>
  <div id="doorType">
    <div class="heading-wrapper">
      <div class="heading-wrapper">
        <span class="configurator-heading">{{ $t("message.doorType") }}</span>
        <button class="info-btn" @click="typeInfo()">i</button>
      </div>
    </div>
    <form action class="type-form">
      <fieldset v-for="(val, index) in types">
        <input
          type="radio"
          name="type"
          :id="'type' + index + 1"
          class="radio"
          :value="index + 1"
          v-model="type"
        />
        <label :for="'type' + index + 1" class="type-form__radio">{{$t("message." + val)}}</label>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "doorType",
  data() {
    return {
      type: null,
      types: ["singleDoor", "doubleDoor", "tripleDoor"]
    };
  },
  methods: {
    typeInfo() {
      this.$store.commit("typeInfo", true);
    }
  },
  computed: {
    typeInfoShow() {
      return this.$store.state.typeInfoShow;
    },
    doorType() {
      return this.$store.state.door.type;
    }
  },
  watch: {
    type() {
      this.$store.commit("storeType", this.type);
    }
  },
  created() {
    this.type = this.doorType;
  }
};
</script>

<style scoped>
fieldset {
  border: none;
}

.heading-wrapper {
  position: relative;
  display: inline-block;
  width: auto;
}

.info-btn {
  display: block;
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: url("../../assets/info.svg");
  background-size: cover;
  border: none;
  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ?? sciezka do img */
  right: -14px;
  top: -3px;
  cursor: pointer;
  font-size: 8px;
  color: #fff;
}

.type-form {
  margin-top: 15px;
  padding-bottom: 34px;
}

.type-form__radio {
  cursor: default;
  display: block;
  position: relative;
  margin-left: 20px;
  margin-top: 8px;
}

.type-form__radio:before,
.type-form__radio:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translateY(calc(-50% - 1px));
}

.type-form__radio:before {
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 3px solid #cddbe5;
  right: calc(100% + 4.5px);
}

.type-form__radio:after {
  background: #6991b2;
  width: 7px;
  height: 7px;
  right: calc(100% + 8.5px);
  opacity: 0;
  /* transition: opacity 0.05s; */
}

.radio:checked + .type-form__radio:after {
  opacity: 1;
}
</style>
