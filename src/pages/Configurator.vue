<template>
  <div id="configurator" class="configurator">
    <config-navigator :config-step="configStep" />
    <saved-configs />
    <div class="configurator-container">
      <demo-window />
      <div class="configurations" :key="configIncrementKey">
        <transition name="fade-transition" mode="out-in">
          <keep-alive>
            <component 
              :is="`Step${configStep}`"
              :door-config="doorConfig"
              @saveConfigurations="saveConfigurations"
              @resetConfigurations="resetConfigurations"
            />
          </keep-alive>
        </transition>

        <nav class="configurations__nav">
          <button
            class="configurations__nav__btn configurations__nav__btn--back"
            v-if="configStep > 1"
            @click="changeStep(-1)"
          >{{ $t("message.back")}}</button>
          <button
            class="configurations__nav__btn"
            :disabled="configStep === 3"
            @click="changeStep(1)"
          >{{ $t("message.nextStep")}}</button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigNavigator from "../components/configurator/ConfigNavigator";
import DemoWindow from "../components/configurator/DemoWindow";
import SavedConfigs from "../components/configurator/SavedConfigs";
import Step1 from "../components/configurator/Step1";
import Step2 from "../components/configurator/Step2";
import Step3 from "../components/configurator/Step3";
import { mapGetters } from 'vuex';

export default {
  name: "configurator",
  components: {
    DemoWindow,
    Step1,
    Step2,
    Step3,
    ConfigNavigator,
    SavedConfigs
  },
  data() {
    return {
      configIncrementKey: 0
    };
  },
  computed: {
    ...mapGetters({
      configStep: 'getConfigStep',
      doorConfig: 'getDoorConfig',
      defaultConfig: 'getDefaultConfig',
      pickerPosition: 'getPickerPosition',
      savedConfigs: 'getSavedConfigs',
      doorIndex: 'getDoorIndex',
    })
  },
  created() {
    this.$store.commit("logged", true);
  },
  watch: {
    doorIndex() {
      this.configIncrementKey++;
    }
  },
  methods: {
    changeStep(val) {
      this.$store.commit("configStepChange", val);
    },
    saveConfigurations() {
      this.$store.commit("addConfig", { ...this.doorConfig });
      this.$store.commit("setInfoBarMessage", {
        message: "Added to your list 👌",
        type: "saveInfo"
      });
      this.infoBarToggle();
    },
    infoBarToggle() {
      this.$store.commit("toggleInfoBar", true);
      this.$store.dispatch("closeInfoBar", 1600);
    },
    resetConfigurations() {
      localStorage.setItem("myDoor", null);
      this.$store.commit("resetConfig");
    }
  }
};
</script>

<style scoped>
.configurator {
  position: relative;
  padding-bottom: 120px;
}
.configurator-container {
  width: 900px;
  margin: 19px auto 0 auto;
  display: flex;
  justify-content: flex-start;
  padding-left: 128px;
}

.configurations {
  width: 100%;
  margin-left: 29px;
  margin-top: 15px;
  position: relative;
}

.configurations__nav {
  position: absolute;
  bottom: 0;
  left: 0;
}

.configurations__nav__btn {
  font-size: 15px;
  line-height: 19px;
  text-transform: uppercase;
  font-family: "Rubik", sans-serif;
  color: #000;
  border: 3px solid #b7bbc8;
  background: #b7bbc8;
  cursor: pointer;
  padding: 6px 27px;
  margin-right: 13px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.9);
}

.configurations__nav__btn--back {
  background: transparent;
  color: #b7bbc8;
}

.configurations__nav__btn:disabled {
  opacity: 0.2;
  cursor: default;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-transition-enter-active {
  animation: appear 0.225s ease-out;
}

.fade-transition-leave-active {
  animation: appear 0s ease-out reverse;
}
</style>
