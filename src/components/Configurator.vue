<template>
  <div id="configurator">
    <config-navigator></config-navigator>
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
          <button class="configurations__share" v-if="configStep === 3">share</button>
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

export default {
  name: "configurator",
  components: {
    demoWindow: DemoWindow,
    doorType: DoorType,
    doorSize: DoorSize,
    doorDivision: DoorDivision,
    doorColor: DoorColor,
    configNavigator: ConfigNavigator,
    colorPicker: ColorPicker
  },
  data() {
    return {};
  },
  methods: {
    step(val) {
      this.$store.commit("configStepChange", val);
    }
  },
  computed: {
    configStep() {
      return this.$store.state.configStep;
    }
  },
  created() {
    this.$store.commit("logged", true);
  }
};
</script>

<style scoped>
.configurator-container {
  width: 900px;
  margin: 19px auto 0 auto;
  display: flex;
  justify-content: flex-start;
  padding-left: 128px;
  margin-bottom: 120px;
}

.configurations {
  width: 100%;
  margin-left: 29px;
  margin-top: 15px;
  position: relative;
}

.configurations__share {
  font-size: 8px;
  line-height: 10px;
  text-transform: uppercase;
  padding: 6px 19px;
  background: #c2cfd8;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  position: absolute;
  bottom: 59px;
  cursor: pointer;
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

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(3px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.test-transition-enter-active {
  animation: slideIn 0.2s ease-in-out;
}

.test-transition-leave-active {
  animation: none;
}
</style>
