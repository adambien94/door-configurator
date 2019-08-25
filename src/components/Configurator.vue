<template>
  <div id="configurator">
    <config-navigator></config-navigator>
    <div class="configurator-container">
      <demo-window></demo-window>
      <div class="configurations">
        <div id="step-1" v-if="configStep === 1">
          <door-type></door-type>
          <door-size></door-size>
        </div>

        <div id="step-2" v-if="configStep === 2">
          <door-division></door-division>
        </div>
        <div id="step-3" v-if="configStep === 3">
          <door-color></door-color>
        </div>

        <button class="configurations__share" v-if="configStep === 3">share</button>
        <nav class="configurations__nav">
          <button
            class="configurations__nav__btn configurations__nav__btn--back"
            v-if="configStep > 1"
            @click="step(-1)"
          >Back</button>
          <button
            class="configurations__nav__btn"
            :disabled="configStep === 3"
            @click="step(1)"
          >Next Step</button>
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

export default {
  name: "configurator",
  components: {
    demoWindow: DemoWindow,
    doorType: DoorType,
    doorSize: DoorSize,
    doorDivision: DoorDivision,
    doorColor: DoorColor,
    configNavigator: ConfigNavigator
  },
  props: {
    width: {
      default: 120
    },
    height: {
      default: 250
    }
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
    doorWidth() {
      return this.$store.state.door.width;
    },
    doorHeight() {
      return this.$store.state.door.height;
    },
    configStep() {
      return this.$store.state.configStep;
    }
  },
  created() {
    this.$store.commit("storeWidth", this.width);
    this.$store.commit("storeHeight", this.height);
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
}
</style>
