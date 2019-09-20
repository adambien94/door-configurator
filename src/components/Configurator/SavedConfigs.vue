<template>
  <div id="saved-configs" class="saved-configs" ref="configs">
    <div class="saved-configs__toggle" @click="configsToggle()"></div>
    <span class="saved-configs__heading">Your Configs:</span>
    <ul class="saved-configs__list">
      <li
        class="saved-configs__item"
        v-for="(config, index) in configs"
        @click="changeConfigs(configs[index])"
      >
        Config {{index + 1}}
        <span class="saved-configs__delete-item" @click="deleteItem(config)">x</span>
      </li>
    </ul>
    <button class="saved-configs__btn">save my doors</button>
  </div>
</template>

<script>
export default {
  name: "saved-configs",
  data() {
    return {
      configs: null,
      configsShow: true
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
    deleteItem(config) {
      // this.$store.commit("deleteConfig", config);
      // ??????????????????????????????
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
  width: 100%;
  padding-left: 10px;
  position: relative;
}

.saved-configs__delete-item {
  position: absolute;
  right: 0px;
  display: none;
  width: 19px;
}
.saved-configs__item:hover .saved-configs__delete-item {
  display: inline-block;
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
</style>
