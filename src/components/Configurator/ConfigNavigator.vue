<template>
  <div id="configNavigator">
    <nav action class="steps">
      <div v-for="(step, index) in steps">
        <input
          type="radio"
          name="step"
          :id="'step' + index + 1"
          class="rd"
          :checked="index + 1 === configStep"
          disabled
        />
        <label :for="'step' + index + 1" class="steps__option">
          {{ $t("message.step")}} {{index + 1}}
          <br />
          {{ $t("message." + step)}}
        </label>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "configNavigator",
  data() {
    return {
      steps: ["chooseDoor", "chooseDivision", "chooseColor"]
    };
  },
  computed: {
    configStep() {
      return this.$store.state.configStep;
    }
  }
};
</script>

<style scoped>
.steps {
  margin: 22px auto 0 auto;
  width: 379px;
  display: flex;
  justify-content: space-between;
  list-style: none;
  position: relative;
}

.steps:after {
  content: "";
  display: block;
  position: absolute;
  width: 80%;
  height: 2px;
  background: #ebf7ff;
  left: 10%;
  top: 22px;
  z-index: -1;
}

.rd {
  display: none;
}

.steps__option {
  display: inline-block;
  position: relative;
  font-size: 10px;
  line-height: 13px;
  text-transform: uppercase;
  color: #848c93;
  text-align: center;
  font-weight: 500;
  padding-top: 57px;
}

.steps__option:before {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #cddbe5;
  transition: 0.175s;
}

.steps__option:after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: calc(46px / 2 - 6px / 2);
  transform: translate(-50%, 0);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6991b2;
  transition: 0.15s;
}

.rd:checked + .steps__option:before {
  background: #95a3ad;
}

.rd:checked + .steps__option:after {
  background: #ffffff;
}
</style>
