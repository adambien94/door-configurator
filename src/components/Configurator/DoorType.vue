<template>
  <div id="doorType">
    <div class="heading-wrapper">
      <span class="configurator-heading">{{ $t("message.doorType") }}</span>
      <button class="info-btn" @click="toggleInfoModal">i</button>
    </div>
    <form action class="type-form">
      <fieldset v-for="(val, index) in types" :key="'field' + index">
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
  props: {
    configType: {
      type: Number
    }
  },
  data() {
    return {
      type: 1,
      types: ["singleDoor", "doubleDoor", "tripleDoor"]
    };
  },
  mounted() {
    this.type = this.configType;
  },
  watch: {
    type() {
      this.$store.commit("setDoorType", this.type);
    }
  },
  methods: {
    toggleInfoModal() {
      this.$store.commit("toggleInfoModal", true);
    }
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
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: url("../../assets/img/info.svg");
  background-size: cover;
  border: none;
  right: -20px;
  top: 2px;
  cursor: pointer;
  font-size: 11px;
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
  margin-left: 24px;
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
  border: 3px solid #b7bbc8;
  right: calc(100% + 8.5px);
}

.type-form__radio:after {
  background: #b7bbc8;
  width: 7px;
  height: 7px;
  right: calc(100% + 12.5px);
  visibility: hidden;
}

.radio:checked + .type-form__radio:after {
  visibility: visible;
}
</style>
