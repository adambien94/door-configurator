<template>
  <div id="errorbar" class="bar">
    <div class="bar-container">
      <span class="error-msg">{{ msg }}</span>
      <div class="close" @click="barToggle()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "errorbar",
  data() {
    return {};
  },
  methods: {
    barToggle() {
      this.$store.commit("errorBar", false);
      console.log(this.$store.state.errorBarShow);
    }
  },
  computed: {
    msg() {
      return this.$store.state.error;
    }
  }
};
</script>

<style scoped>
.bar {
  position: absolute;
  width: 100%;
  height: 80px;
  background: #f24e33;
  z-index: 1;
  top: 0;
}

.bar-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-msg {
  font-size: 16px;
  line-height: 21px;
  color: #fff;
}

.close {
  position: absolute;
  right: 31px;
  width: 14px;
  height: 14px;
  background: url("./assets/close.png");
  background-size: cover;
  cursor: pointer;
}
</style>
