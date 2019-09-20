<template>
  <div id="configurator" class="configurator">
    <config-navigator></config-navigator>
    <transition name="config-list-transition">
      <saved-configs v-if="savedConfigs.length > 0"></saved-configs>
    </transition>
    <div class="configurator-container">
      <demo-window></demo-window>
      <div class="configurations">
        <transition name="test-transition" mode="out-in">
          <div class="step-wrapper" v-if="configStep === 1">
            <door-type></door-type>
            <door-size></door-size>
          </div>
          <door-division v-if="configStep === 2"></door-division>
          <div class="step-wrapper" v-if="configStep === 3">
            <door-color></door-color>
            <color-picker></color-picker>
          </div>
        </transition>
        <transition name="test-transition">
          <button
            class="configurations__btn configurations__btn--primary"
            v-if="configStep === 3"
            @click="saveConfigurations"
          >aad</button>
        </transition>
        <transition name="test-transition">
          <button
            class="configurations__btn configurations__btn--danger"
            v-if="configStep === 3"
            @click="resetConfigurations"
          >reset</button>
        </transition>

        <nav class="configurations__nav">
          <button
            class="configurations__nav__btn configurations__nav__btn--back"
            v-if="configStep > 1"
            @click="step(-1)"
          >{{ $t("message.back")}}</button>
          <button
            class="configurations__nav__btn"
            :disabled="configStep === 3"
            @click="step(1)"
          >{{ $t("message.nextStep")}}</button>
        </nav>
      </div>
    </div>
  </div>
</template>



<script>
import ConfigNavigator from "./Configurator/ConfigNavigator.vue";
import DemoWindow from "./Configurator/DemoWindow.vue";
import DoorType from "./Configurator/DoorType.vue";
import DoorSize from "./Configurator/DoorSize.vue";
import DoorDivision from "./Configurator/DoorDivision.vue";
import DoorColor from "./Configurator/DoorColor.vue";
import TypeInfo from "./Configurator/TypeInfo.vue";
import ColorPicker from "./Configurator/ColorPicker.vue";
import SavedConfigs from "./Configurator/SavedConfigs.vue";

export default {
  name: "configurator",
  components: {
    demoWindow: DemoWindow,
    doorType: DoorType,
    doorSize: DoorSize,
    doorDivision: DoorDivision,
    doorColor: DoorColor,
    configNavigator: ConfigNavigator,
    colorPicker: ColorPicker,
    SavedConfigs: SavedConfigs
  },
  data() {
    return {
      saveMsg: "Your configs are saved 👍",
      initialSave: true
    };
  },
  methods: {
    step(val) {
      this.$store.commit("configStepChange", val);
    },
    saveConfigurations() {
      let saveInfo = {
        message: this.saveMsg,
        type: "saveInfo"
      };
      this.$store.commit("setInfo", saveInfo);
      this.infoBarToggle();
      this.$store.commit("addConfig", { ...this.door });
      this.initialSave = false;
    },
    addToSavedConfigs() {},
    infoBarToggle() {
      this.$store.commit("errorBar", true);
      this.$store.dispatch("closeInfoBar", 1900);
    },
    resetConfigurations() {
      localStorage.setItem("myDoor", null);
      this.$store.commit("resetConfig");
    }
  },
  computed: {
    configStep() {
      return this.$store.state.configStep;
    },
    door() {
      return this.$store.state.door;
    },
    defaultConfig() {
      return this.$store.state.defaultConfig;
    },
    pickerPos() {
      return this.$store.state.pickerPos;
    },
    savedConfigs() {
      return this.$store.state.savedConfigs;
    }
  },
  created() {
    this.$store.commit("logged", true);
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

.configurations__btn {
  font-size: 8px;
  line-height: 10px;
  text-transform: uppercase;
  padding: 6px 19px;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  position: absolute;
  bottom: 59px;
  cursor: pointer;
}

.configurations__btn--primary {
  background: #6f91aa;
}

.configurations__btn--danger {
  left: 70px;
  background: #e07b87;
}

.configurations__nav {
  position: absolute;
  bottom: 0;
  left: 0;
}

.configurations__nav__btn {
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: #fff;
  border: 2px solid #6f91aa;
  background: #6f91aa;
  cursor: pointer;
  padding: 6px 27px;
  margin-right: 13px;
}

.configurations__nav__btn--back {
  background: transparent;
  color: #6f91aa;
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

.test-transition-enter-active {
  animation: appear 0.225s ease-out;
}

.test-transition-leave-active {
  animation: appear 0s ease-out reverse;
}

@keyframes test {
  0% {
    transform: translatex(-100%);
  }
  70% {
    transform: translatex(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.config-list-transition-enter-active {
  animation: test 1.2s ease-in-out;
}

.config-list-transition-leave-active {
  animation: test 1.2s ease-in-out reverse;
}
</style>
