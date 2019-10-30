<template>
  <div id="saved-configs" class="saved-configs" ref="configs">
    <div class="saved-configs__toggle" @click="configsToggle()"></div>
    <span class="saved-configs__heading">Your Configs:</span>
    <ul class="saved-configs__list">
      <li
        class="saved-configs__item"
        v-for="(config, index) in configs"
        @click="changeConfigs(configs[index])"
        @mouseover="displayInfo(index)"
        @mouseleave="hideInfo(index)"
        ref="configItem"
      >Config {{index + 1}}</li>
    </ul>
    <div class="config-info" ref="configInfo">
      <div class="config-info__pointer" ref="infoPointer"></div>
      <span class="config-info__name">Config {{index}}</span>
      <ul class="config-info__list">
        <!-- <li v-for="(val, key, index) in infoConfigs" class="config-info__item">
          {{infoProperties[index]}}:
          <span class="config-info__value" ref="heh">{{val}}</span>
        </li>-->
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
    <button
      class="saved-configs__btn saved-configs__btn--primary"
      @click="saveSession()"
    >save configs</button>
    <button class="saved-configs__btn saved-configs__btn--danger" @click="clearSession()">clear</button>
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
  methods: {
    changeConfigs(config) {
      this.$store.commit("setConfig", config);
      // this.hideInfo();
    },
    configsToggle() {
      let configs = this.$refs.configs;
      configs.classList.toggle("saved-configs--closed");
    },
    displayInfo(index) {
      this.index = index + 1;
      let configItem = this.$refs.configItem[index];
      let configItemOffsetTop = configItem.getBoundingClientRect().top;
      let infoColor = this.$refs.infoColor;
      infoColor.style.background = this.savedConfigs[index].color + "";
      let info = this.$refs.configInfo;
      info.style.display = "block";
      info.style.top =
        configItemOffsetTop + pageYOffset - 88 - 24 * (this.index - 1) + "px";
      let infoPointer = this.$refs.infoPointer;
      infoPointer.style.top = 24 * (this.index - 1) + "px";
      this.infoConfigs = { ...this.savedConfigs[index] };
    },
    hideInfo() {
      let info = this.$refs.configInfo;
      info.style.display = "none";
    },
    saveSession() {
      localStorage.setItem("myDoor", JSON.stringify(this.door));
      localStorage.setItem("pickerPos", JSON.stringify(this.pickerPos));
      localStorage.setItem("savedConfigs", JSON.stringify(this.savedConfigs));
      let saveSession = {
        message: "Your session is saved 🔒",
        type: "info"
      };
      this.$store.commit("setInfo", saveSession);
      this.infoBarToggle();
    },
    clearSession() {
      localStorage.setItem("savedConfigs", JSON.stringify(""));
      localStorage.setItem("myDoor", JSON.stringify(""));
      this.$store.commit("clearSavedConfigs");
    },
    infoBarToggle() {
      this.$store.commit("errorBar", true);
      this.$store.dispatch("closeInfoBar", 2200);
    }
  },
  computed: {
    savedConfigs() {
      return this.$store.state.savedConfigs;
    },
    test() {
      return this.$store.state.savedConfigs.length;
    },
    door() {
      return this.$store.state.door;
    },
    pickerPos() {
      return this.$store.state.pickerPos;
    }
  },
  watch: {
    test() {
      this.configs = this.savedConfigs;
    }
  },
  created() {
    this.configs = this.savedConfigs;
  }
};
</script>

<style scoped>
.saved-configs {
  min-width: 170px;
  width: 12%;
  position: absolute;
  z-index: 1;
  left: 0;
  top: -22px;
  min-height: calc(100% + 22px);
  height: calc(100vh - 80px);
  background: #f6f6f6;
  border-right: 1px solid #e6e6e6;
  box-shadow: 0px 3px 6px #c9c9c9;
  box-sizing: border-box;
  padding: 35px 25px;
  transition: transform 0.15s ease-in-out;
}

.saved-configs--closed {
  transform: translateX(calc(-100% + 30px));
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
  width: 12px;
  height: 2px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #c9c9c9;
  transition: transform 0.2s ease-in-out;
}

.saved-configs__toggle:before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.saved-configs--closed .saved-configs__toggle:before {
  width: 8px;
  transform: translate(-50%, calc(-50% - 2px)) rotate(45deg);
}

.saved-configs--closed .saved-configs__toggle:after {
  width: 8px;
  transform: translate(-50%, calc(-50% + 2px)) rotate(-45deg);
}

.saved-configs__toggle:after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.saved-configs__heading {
  display: inline-block;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #848c93;
  width: 100%;
  padding-bottom: 7px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.saved-configs__list {
  list-style: none;
  color: #6f91aa;
  margin: 30px 0;
}

.saved-configs__item {
  cursor: pointer;
  font-size: 14px;
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
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 8px;
  line-height: 10px;
  text-transform: uppercase;
  padding: 6px 19px;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  width: 100px;
}

.saved-configs__btn--primary {
  background: #6f91aa;
}

.saved-configs__btn--danger {
  background: #e07b87;
}

.config-info {
  position: absolute;
  min-width: 190px;
  background: #f9fcff;
  /* box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); */
  display: none;
  left: 160px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 5;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.16));
}

.config-info__pointer {
  position: absolute;
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
  width: 25px;
  height: 25px;
  background: #f9fcff;
  top: 0;
  left: 0;
  transform: translate(-50%, 5px) rotate(45deg);
}

.config-info__name {
  color: #6f91aa;
  text-decoration: underline;
}

.config-info__list {
  list-style: none;
  margin: 15px;
}

.config-info__item {
  margin-bottom: 4px;
  font-size: 13px;
}

.config-info__value {
  color: #6f91aa;
  padding-left: 2px;
  font-weight: 500;
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
