<template>
  <div id="app">
    <transition name="vh-transition">
      <processing v-if="isProcessingShown" />
    </transition>
    <transition name="typeInfo-transition">
      <type-info v-if="isInfoModalShown" />
    </transition>
    <transition name="error-bar-transition">
      <info-bar v-if="isInfoBarShown" />
    </transition>

    <div class="content-wrapper" ref="contentWrapper">
      <toolbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Toolbar from "./components/layout/Toolbar";
import InfoBar from "./components/layout/InfoBar.vue";
import Processing from "./components/layout/Processing.vue";
import TypeInfo from "./components/configurator/TypeInfo.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    InfoBar,
    Processing,
    TypeInfo
  },
  data() {
    return {
    };
  },
  computed: {
    isInfoBarShown() {
      return this.$store.getters.getIsInfoBarShown;
    },
    isProcessingShown() {
      return this.$store.getters.getIsProcessingShown;
    },
    isInfoModalShown() {
      return this.$store.getters.getIsInfoModalShown;
    },
    shouldContentBlur() {
      return this.isProcessingShown || this.isInfoModalShown;
    }
  },
  watch: {
    shouldContentBlur(shouldBlur) {
      shouldBlur ? this.blurIn() : this.blurOut();
    }
  },
  methods: {
    blurIn() {
      const { contentWrapper } = this.$refs;
      contentWrapper.style.filter = "blur(5px)";
    },
    blurOut() {
      const { contentWrapper } = this.$refs;
      contentWrapper.style.filter = "blur(0px)";
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

:root {
  --main-font: #b7bbc8;
  --doorCol: #c6bbdd;
}

button,
input,
input:focus,
select,
select:focus {
  outline: none;
}

body {
  font-family: "Rubik", sans-serif;
  font-size: 15px;
  color: var(--main-font);
  line-height: 19px;
  background: #1e1f26;
}

/* .test {
  background: linear-gradient(130deg,#ff7a18,#af002d 41.07%,#319197 76.05%);
  opacity: 0;
  height: 60vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  clip-path: polygon(100% 0,0 0,0 77.5%,1% 77.4%,2% 77.1%,3% 76.6%,4% 75.9%,5% 75.05%,6% 74.05%,7% 72.95%,8% 71.75%,9% 70.55%,10% 69.3%,11% 68.05%,12% 66.9%,13% 65.8%,14% 64.8%,15% 64%,16% 63.35%,17% 62.85%,18% 62.6%,19% 62.5%,20% 62.65%,21% 63%,22% 63.5%,23% 64.2%,24% 65.1%,25% 66.1%,26% 67.2%,27% 68.4%,28% 69.65%,29% 70.9%,30% 72.15%,31% 73.3%,32% 74.35%,33% 75.3%,34% 76.1%,35% 76.75%,36% 77.2%,37% 77.45%,38% 77.5%,39% 77.3%,40% 76.95%,41% 76.4%,42% 75.65%,43% 74.75%,44% 73.75%,45% 72.6%,46% 71.4%,47% 70.15%,48% 68.9%,49% 67.7%,50% 66.55%,51% 65.5%,52% 64.55%,53% 63.75%,54% 63.15%,55% 62.75%,56% 62.55%,57% 62.5%,58% 62.7%,59% 63.1%,60% 63.7%,61% 64.45%,62% 65.4%,63% 66.45%,64% 67.6%,65% 68.8%,66% 70.05%,67% 71.3%,68% 72.5%,69% 73.6%,70% 74.65%,71% 75.55%,72% 76.35%,73% 76.9%,74% 77.3%,75% 77.5%,76% 77.45%,77% 77.25%,78% 76.8%,79% 76.2%,80% 75.4%,81% 74.45%,82% 73.4%,83% 72.25%,84% 71.05%,85% 69.8%,86% 68.55%,87% 67.35%,88% 66.2%,89% 65.2%,90% 64.3%,91% 63.55%,92% 63%,93% 62.65%,94% 62.5%,95% 62.55%,96% 62.8%,97% 63.3%,98% 63.9%,99% 64.75%,100% 65.7%);
} */

.content-wrapper {
  padding-top: 70px;
  position: relative;
  overflow: hidden;
}

input[type="radio"] {
  display: none;
}

.configurator-heading {
  display: inline-block;
  line-height: 19px;
  color: #fff;
  position: relative;
  padding-bottom: 7px;
  border-bottom: 3px solid #ffdd40;
  font-size: 19px;
  font-weight: bold;
}

.error-bar-transition-enter-active {
  animation: dropDown 0.25s ease-out;
}

.error-bar-transition-leave-active {
  animation: dropDown 0.15s ease-out reverse;
}

.vh-transition-enter-active {
  animation: fadeIn 1s ease-out;
}

.vh-transition-leave-active {
  animation: fadeIn 0.075s ease-out reverse;
}

.typeInfo-transition-enter-active {
  animation: fadeInPop 0.2s;
}

.typeInfo-transition-leave-active {
  animation: fadeInPop 0.2s reverse;
}

@keyframes fadeInPop {
  0% {
    opacity: 0;
    padding-top: 20px;
  }
  100% {
    opacity: 1;
    padding-top: 0px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dropDown {
  0% {
    transform: translateY(-110%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
