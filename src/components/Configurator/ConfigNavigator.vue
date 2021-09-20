<template>
  <div id="configNavigator">
    <nav action class="steps">
      <div v-for="(step, index) in steps" :key="`step${index + 1}`">
        <input
          type="radio"
          name="step"
          :id="`step${index + 1}`"
          class="rd"
          :checked="index === configStep - 1"
          disabled
        />
        <label :for="`step${index + 1}`" class="steps__option">
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
  props: {
    configStep: Number
  },
  data() {
    return {
      steps: ["chooseDoor", "chooseDivision", "chooseColor"]
    };
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

.rd {
  display: none;
}

.steps__option {
  display: inline-block;
  position: relative;
  font-size: 11px;
  line-height: 13px;
  text-transform: uppercase;
  color: #fff;
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
  background: rgba(255, 255, 255, 0.05);
  transition: 0.175s;
}

.rd:checked + .steps__option:before {
  background: #47cf73;
}
</style>
