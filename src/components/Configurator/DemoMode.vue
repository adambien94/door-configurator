<template>
  <div id="demo-mode">
    <div class="mode" v-for="(mode, index) in modes">
      <input
        type="radio"
        name="mode-rd"
        class="radio"
        :id="'mode' + index"
        :value="mode"
        v-model="demoMode"
        @click="switchMode(index)"
      />
      <label :for="'mode' + index" class="mode__radio">{{mode}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-mode",
  data() {
    return {
      modes: ["3D", "2D"],
      demoMode: "2D"
    };
  },
  methods: {
    switchMode(mode) {
      this.$store.commit("storeDemoMode", mode);
      console.log(this.$store.getters.getDemoMode);
    }
  }
};
</script>

<style scoped>
#demo-mode {
  position: absolute;
  top: 20px;
  right: 35px;
  border: 3px solid #ae63e4;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
}

.mode {
  border: none;
}

.mode__radio {
  display: block;
  padding: 3px 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  color: #fff;
}

.radio:checked + .mode__radio {
  background: #ae63e4;
}
</style>
