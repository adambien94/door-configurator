<template>
  <div id="app">
    <transition name="vh-transition">
      <processing v-if="processingShow"></processing>
    </transition>
    <transition name="typeInfo-transition">
      <type-info v-if="typeInfoShow"></type-info>
    </transition>
    <!-- ^^ zrób elegancko type info window^^ -->

    <div class="blur">
      <toolbar></toolbar>
      <transition name="error-bar-transition">
        <errorbar v-if="errorBarShow"></errorbar>
      </transition>
      <router-view />
    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Errorbar from "./Errorbar.vue";
import Processing from "./Processing.vue";
import TypeInfo from "./components/Configurator/TypeInfo.vue";

export default {
  name: "App",
  components: {
    toolbar: Toolbar,
    errorbar: Errorbar,
    processing: Processing,
    typeInfo: TypeInfo
  },
  data() {
    return {
      process: false
    };
  },
  methods: {
    blur() {
      const blur = document.querySelector(".blur");
      if (this.processingShow || this.typeInfoShow) {
        blur.style.filter = "blur(5px)";
      } else {
        blur.style.filter = "blur(0px)";
      }
    }
  },
  computed: {
    errorBarShow() {
      return this.$store.state.errorBarShow;
    },
    processingShow() {
      return this.$store.state.processingShow;
    },
    typeInfoShow() {
      return this.$store.state.typeInfoShow;
    }
  },
  watch: {
    processingShow() {
      this.blur();
    },
    typeInfoShow() {
      this.blur();
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
  --main-font: #7e7e7e;
  --doorCol: red;
}

button,
input,
input:focus,
select,
select:focus {
  outline: none;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: var(--main-font);
  line-height: 19px;
}

input[type="radio"] {
  display: none;
}

.configurator-heading {
  display: inline-block;
  font-size: 14px;
  line-height: 19px;
  color: #848c93;
  position: relative;
  padding-bottom: 7px;
  border-bottom: 1px solid #f7f7f7;
}

.blur {
  transition: filter 0.15s;
}

@keyframes dropDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.error-bar-transition-enter-active {
  animation: dropDown 0.25s ease-out;
}

.error-bar-transition-leave-active {
  animation: dropDown 0.15s ease-out reverse;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.vh-transition-enter-active {
  animation: fadeIn 1s ease-out;
}

.vh-transition-leave-active {
  animation: fadeIn 0.075s ease-out reverse;
}

.typeInfo-transition-enter-active {
  animation: fadeIn 0.15s;
}

.typeInfo-transition-leave-active {
  animation: fadeIn 0.1s reverse;
}
</style>
