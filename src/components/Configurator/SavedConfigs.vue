<template>
  <div id="saved-configs" class="saved-configs" ref="configs">
    <div class="configs-wrapper">
      <div class="saved-configs__toggle" @click="configsToggle()"></div>
      <span class="saved-configs__heading">Your Configs:</span>
      <ul class="saved-configs__list">
        <li
          class="saved-configs__item"
          v-for="(config, index) in configs"
          @click="changeConfigs(index)"
          @mouseover="displayInfo(index)"
          @mouseleave="hideInfo(index)"
          ref="configItem"
          :key="'item' + index"
        >Config {{index + 1}}</li>
      </ul>
    </div>
    <div class="config-info" ref="configInfo">
      <div class="config-info__pointer" ref="infoPointer"></div>
      <span class="config-info__name">Config {{index}}</span>
      <ul class="config-info__list">
        <li class="config-info__item">
          Width:
          <span class="config-info__value">{{infoConfigs.width}}</span>
        </li>
        <li class="config-info__item">
          Height:
          <span class="config-info__value">{{infoConfigs.height}}</span>
        </li>
        <li class="config-info__item">
          Doors num:
          <span class="config-info__value">{{infoConfigs.type}}</span>
        </li>
        <li class="config-info__item">
          Beams num:
          <span class="config-info__value">{{infoConfigs.beams}}</span>
        </li>
        <li class="config-info__item">
          Posts num:
          <span class="config-info__value">{{infoConfigs.posts}}</span>
        </li>
        <li class="config-info__item">
          Color:
          <span class="config-info__color" ref="infoColor"></span>
        </li>
        <li class="config-info__item">
          Divs Thickness:
          <span class="config-info__value">{{infoConfigs.divThickness}}</span>
        </li>
      </ul>
      <door :infoDemoIndex="index"></door>
    </div>
    <div class="saved-configs__btn-wrapper">
      <button
        class="saved-configs__btn saved-configs__btn--primary"
        @click="saveSession()"
      >Save configs</button>
      <button class="saved-configs__btn saved-configs__btn--danger" @click="clearSession()">Clear</button>
    </div>
  </div>
</template>

<script>
import Door from "./Door.vue";

export default {
  name: "saved-configs",
  components: {
    door: Door
  },
  data() {
    return {
      configs: null,
      configsShow: true,
      infoConfigs: {},
      index: null,
      infoProperties: [
        "width",
        "height",
        "doors num",
        "beams num",
        "posts num",
        "color",
        "divs thickness"
      ]
    };
  },
  computed: {
    savedConfigs() {
      return this.$store.getters.getSavedConfigs;
    },
    savedConfigsLength() {
      return this.$store.getters.getSavedConfigs.length;
    },
    doorConfig() {
      return this.$store.getters.getDoorConfig;
    },
    pickerPosition() {
      return this.$store.getters.getPickerPosition;
    }
  },
  watch: {
    savedConfigsLength() {
      this.configs = this.savedConfigs;
    }
  },
  created() {
    this.configs = this.savedConfigs;
  },
  methods: {
    changeConfigs(index) {
      this.$store.commit("setDoorIndex", index);
      this.$store.commit("setConfig", this.configs[index]);
    },
    configsToggle() {
      let configs = this.$refs.configs;
      configs.classList.toggle("saved-configs--closed");
    },
    displayInfo(index) {
      this.index = index + 1;
      let infoColor = this.$refs.infoColor;
      infoColor.style.background = this.savedConfigs[index].color + "";
      let info = this.$refs.configInfo;
      info.style.display = "block";
      let infoPointer = this.$refs.infoPointer;
      infoPointer.style.top = 58 + 29 * (this.index - 1) + "px";
      this.infoConfigs = { ...this.savedConfigs[index] };
    },
    hideInfo() {
      let info = this.$refs.configInfo;
      info.style.display = "none";
    },
    saveSession() {
      localStorage.setItem("myDoor", JSON.stringify(this.doorConfig));
      localStorage.setItem("pickerPosition", JSON.stringify(this.pickerPosition));
      localStorage.setItem("savedConfigs", JSON.stringify(this.savedConfigs));
      let saveSession = {
        message: "Your session is saved 🔒",
        type: "info"
      };
      this.$store.commit("setInfoBarMessage", saveSession);
      this.infoBarToggle();
    },
    clearSession() {
      localStorage.setItem("savedConfigs", JSON.stringify(""));
      localStorage.setItem("myDoor", JSON.stringify(""));
      this.$store.commit("clearSavedConfigs");
    },
    infoBarToggle() {
      this.$store.commit("toggleInfoBar", true);
      this.$store.dispatch("closeInfoBar", 2200);
    }
  }
};
</script>

<style scoped>
.saved-configs {
  min-width: 170px;
  width: 200px;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 65px;
  height: calc(100vh - 60px);
  background: #131417;
  box-sizing: border-box;
  padding: 35px 25px 5px 25px;
  transition: all 0.35s ease-in-out;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.configs-wrapper {
  flex: 1;
}

.saved-configs--closed {
  transform: translateX(calc(-100% + 40px));
  padding-left: 0;
  padding-right: 50px;
}

.saved-configs__toggle {
  width: 16px;
  height: 16px;
  position: absolute;
  text-align: center;
  cursor: pointer;
  right: 6px;
  top: 25px;
}

.saved-configs__toggle:before,
.saved-configs__toggle:after {
  content: "";
  display: block;
  width: 15px;
  height: 3px;
  position: absolute;
  left: 10%;
  top: 50%;
  background: #aaaebc;
  transition: transform 0.2s ease-in-out;
}

.saved-configs__toggle:before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.saved-configs--closed .saved-configs__toggle:before {
  width: 10px;
  transform: translate(-50%, calc(-50% - 3px)) rotate(45deg);
}

.saved-configs--closed .saved-configs__toggle:after {
  width: 10px;
  transform: translate(-50%, calc(-50% + 2px)) rotate(-45deg);
}

.saved-configs__toggle:after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.saved-configs__heading {
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  width: 100%;
  padding-bottom: 7px;
  border-bottom: 3px solid #f7dd3f;
  font-size: 19px;
}

.saved-configs__list {
  list-style: none;
  margin: 20px 0;
}

.saved-configs__item {
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 0px;
  width: 60%;
  padding: 0 0 10px 10px;
  position: relative;
}

.saved-configs__item:hover {
  opacity: 0.6;
}

.saved-configs__btn {
  display: block;
  font-family: "Rubik", sans-serif;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 10px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 13px 0;
}

.saved-configs__btn--primary {
  background: transparent;
  border: 3px solid #76daff;
  color: #fff;
}

.saved-configs__btn--danger {
  color: #76daff;
  background: transparent;
}

.config-info {
  position: fixed;
  top: 90px;
  min-width: 190px;
  background:#fff;
  display: none;
  border-radius: 11px;
  left: 160px;
  padding: 20px;
  box-sizing: border-box;
  color: #000;
  z-index: 5;
  /* filter: drop-shadow(0px 23px 33px rgba(0, 0, 0, 0.9)); */
  box-shadow: 0px 23px 33px rgba(0, 0, 0, 0.9);
}

.config-info__pointer {
  position: absolute;
  /* border-radius: 11px; */
  width: 11px;
  height: 11px;
  background: #fff;
  top: 0;
  left: 0;
  transform: translate(-50%, 5px) rotate(45deg);
  /* box-shadow: 0 2px 7px rgba(0, 0, 0, 0.9); */
}

.config-info__name {
  /* color: #e62e74; */
  font-weight: 600;
}

.config-info__list {
  list-style: none;
  margin: 15px;
}

.config-info__item {
  margin-bottom: 4px;
  font-size: 15px;
}

.config-info__value {
  padding-left: 2px;
  font-weight: bold;
}

.config-info__color {
  background: red;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
  top: 3px;
  left: 3px;
}
</style>
