<template>
  <div id="processing">
    <div class="processing-bg"></div>
    <span class="info">Processing...</span>
    <div class="process-bar">
      <span class="process-bar__percent">{{percent}}%</span>
      <div class="progress-bar__progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "processing",
  data() {
    return {
      percent: 60
    };
  },
  methods: {
    loading() {
      let percentage = 10;
      const progressBar = document.querySelector(".progress-bar__progress");
      let load = setInterval(() => {
        progressBar.style.width = percentage + "%";
        percentage += Math.random() * 2 + 3;
        this.percent = Math.floor(percentage);
        if (percentage >= 98) {
          clearInterval(load);
          this.$store.commit("processing", false);
          // this.processFinish();
        }
      }, 100);
    }
    // processFinish() {
    //   location.replace(this.configuratorPath);
    //   this.$store.commit("logged", true);
    //   this.$store.commit("processing", false);
    // }
  },

  mounted() {
    this.loading();
  },
  computed: {
    configuratorPath() {
      return this.$store.state.configuratorPath;
    }
  }
};
</script>

<style scoped>
#processing {
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 10;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.processing-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #adb2b5;
  opacity: 0.75;
  z-index: -1;
}

.info {
  font-size: 24px;
  line-height: 32px;
  color: #fff;
  display: block;
  margin-top: 40vh;
}

.process-bar {
  width: 500px;
  border: 1px solid #fff;
  border-radius: 40px;
  height: 32px;
  margin-top: 47px;
  position: relative;
}

.process-bar__percent {
  color: #fff;
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translate(0, -50%);
}

.progress-bar__progress {
  position: absolute;
  background: #fff;
  height: 18px;
  left: 7px;
  top: 50%;
  width: 0%;
  transform: translate(0, -50%);
  border-radius: 40px;
  transition: width 0.2s;
}
</style>
