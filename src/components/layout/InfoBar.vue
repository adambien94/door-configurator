<template>
  <div id="info-bar" class="bar" ref="infoBar">
    <div class="bar-container">
      <span class="error-msg">{{ infoBarMessage.message }}</span>
      <div class="close" @click="barToggle()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info-bar",
  data() {
    return {
      errorCol: "#f24e33",
      infoCol: "#1de278"
    };
  },
  computed: {
    infoBarMessage() {
      return this.$store.getters.getInfoBarMessage;
    }
  },
  mounted() {
    this.setBarColor();
  },
  methods: {
    barToggle() {
      this.$store.commit("toggleInfoBar", false);
    },
    setBarColor() {
      let bar = this.$refs.infoBar;
      if (this.infoBarMessage.type === "error") {
        bar.style.background = this.errorCol;
      } else {
        bar.style.background = this.infoCol;
      }
    }
  }
};
</script>

<style scoped>
.bar {
  position: fixed;
  width: 100%;
  height: 80px;
  /* background: #f24e33; */
  z-index: 3;
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
  background: url("../../assets/img/close.png");
  background-size: cover;
  cursor: pointer;
}
</style>
