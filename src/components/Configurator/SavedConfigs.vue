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
    </div>
    <button class="saved-configs__btn">save my doors</button>
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
      infoConfigs: {
        width: 120,
        height: 250,
        type: 1,
        beams: 0,
        posts: 0,
        color: "#5A5858",
        divThickness: 6
      },
      index: null
    };
  },
  methods: {
    changeConfigs(config) {
      this.$store.commit("setConfig", config);
    },
    configsToggle() {
      let configs = this.$refs.configs;
      configs.classList.toggle("saved-configs--closed");
    },
    displayInfo(index) {
      let configItem = this.$refs.configItem[index];
      let configItemOffsetTop = configItem.getBoundingClientRect().top;
      let info = this.$refs.configInfo;
      let infoColor = this.$refs.infoColor;
      infoColor.style.background = this.savedConfigs[index].color + "";
      info.style.display = "block";
      info.style.top = configItemOffsetTop - 88 + "px";
      this.infoConfigs = { ...this.savedConfigs[index] };
      this.index = index + 1;
    },
    hideInfo(index) {
      let info = this.$refs.configInfo;
      info.style.display = "none";
    }
  },
  computed: {
    savedConfigs() {
      return this.$store.state.savedConfigs;
    },
    test() {
      return this.$store.state.savedConfigs.length;
    }
  },
  watch: {
    test() {
      this.configs = this.savedConfigs;
    }
  },
  created() {
    console.log(this.test);
    this.configs = this.savedConfigs;
  }
};
</script>

<style scoped>
.saved-configs {
  min-width: 170px;
  width: 12%;
  position: absolute;
  left: 0;
  top: -22px;
  min-height: calc(100% + 22px);
  height: calc(100vh - 80px);
  background: #f6f6f6;
  border-right: 1px solid #e6e6e6;
  box-shadow: 0px 3px 6px #c9c9c9;
  box-sizing: border-box;
  padding: 35px 25px;
  transition: transform 0.2s ease-in-out;
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
  margin-bottom: 10px;
  width: 60%;
  padding-left: 10px;
  position: relative;
}

.saved-configs__btn {
  display: block;
  margin-left: 10px;
  font-size: 8px;
  line-height: 10px;
  text-transform: uppercase;
  padding: 6px 19px;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #6f91aa;
}

.config-info {
  position: absolute;
  width: 200px;
  background: #fcfcfc;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: none;
  left: 88%;
  padding: 20px;
  box-sizing: border-box;
  z-index: 5;
}

.config-info:before {
  content: "";
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  background: #fcfcfc;
  top: 0;
  left: 0;
  transform: translate(-50%, 5px) rotate(45deg);
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.16);
}

.config-info:after {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 40px;
  top: 0;
  left: 0;
  background: #fcfcfc;
}

.config-info__name {
  color: #6f91aa;
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
