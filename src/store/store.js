import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isInfoBarShown: false,
    infoBarMessage: {
      message: "",
      type: "error"
    },
    isProcessingShown: false,
    configuratorPath: "configurator",
    isUserLogged: false,
    token: "",
    isInfoModalShown: false,
    configStep: 1,
    demoMode: 1,
    shouldRememberUser: false || JSON.parse(localStorage.getItem("shouldRememberUser")),
    customColor: null,
    pickerPosition: JSON.parse(localStorage.getItem("pickerPosition")) || {
      x: 50,
      y: 38
    },
    doorConfig: JSON.parse(localStorage.getItem("myDoor")) || {
      width: 120,
      height: 250,
      type: 1,
      beams: 0,
      posts: 0,
      color: "#c6bbdd",
      divThickness: 6,
      frameThickness: 6
    },
    doorIndex: 0,
    defaultDoorConfig: {
      width: 120,
      height: 250,
      type: 1,
      beams: 0,
      posts: 0,
      color: "#c6bbdd",
      divThickness: 6,
      frameThickness: 6
    },
    savedConfigs: JSON.parse(localStorage.getItem("savedConfigs")) || []
  },
  getters: {
    getDoorConfig: state => state.doorConfig,
    getDoorIndex: state => state.doorIndex,
    getDefaultConfig: state => state.defaultDoorConfig,
    getInfoBarMessage: state => state.infoBarMessage,
    getIsInfoBarShown: state => state.isInfoBarShown,
    getIsProcessingShown: state => state.isProcessingShown,
    getIsUserLogged: state => state.isUserLogged,
    getIsInfoModalShown: state => state.isInfoModalShown,
    getConfigStep: state => state.configStep,
    getDemoMode: state => state.demoMode,
    getShouldRememberUser: state => state.shouldRememberUser,
    getCustomColor: state => state.customColor,
    getPickerPosition: state => state.pickerPosition,
    getSavedConfigs: state => state.savedConfigs,
  },
  actions: {
    closeInfoBar: (context, time) => {
      setTimeout(() => {
        context.commit("toggleInfoBar", false);
      }, time);
    }
  },
  mutations: {
    toggleInfoBar: (state, payload) => {
      state.isInfoBarShown = payload;
    },
    toggleInfoModal: (state, payload) => {
      state.isInfoModalShown = payload;
    },
    setInfoBarMessage: (state, payload) => {
      state.infoBarMessage = {
        message: payload.message,
        type: payload.type
      };
    },
    processing: (state, payload) => {
      state.isProcessingShown = payload;
    },
    validSucces: (state, payload) => {
      state.valid = payload;
    },
    logged: (state, payload) => {
      state.isUserLogged = payload;
    },
    storeToken: (state, payload) => {
      state.token = payload;
    },
    setDoorWidth: (state, payload) => {
      state.doorConfig.width = payload;
    },
    setDoorHeight: (state, payload) => {
      state.doorConfig.height = payload;
    },
    setDoorType: (state, payload) => {
      state.doorConfig.type = payload;
    },
    storeBeams: (state, payload) => {
      state.doorConfig.beams = payload;
    },
    storePosts: (state, payload) => {
      state.doorConfig.posts = payload;
    },
    storeColor: (state, payload) => {
      state.doorConfig.color = payload;
    },
    storeDivThickness: (state, payload) => {
      state.doorConfig.divThickness = payload;
    },
    configStepChange: (state, payload) => {
      state.configStep += payload;
    },
    storeDemoMode: (state, payload) => {
      state.demoMode = payload;
    },
    storeCustomColor: (state, payload) => {
      state.customColor = payload;
    },
    setDoorIndex: (state, payload) => {
      state.doorIndex = payload;
    },
    storePickerPos: (state, payload) => {
      state.pickerPosition.x = payload.x;
      state.pickerPosition.y = payload.y;
    },
    resetConfig: state => {
      state.doorConfig = {
        width: 120,
        height: 250,
        type: 1,
        beams: 0,
        posts: 0,
        color: "#5A5858",
        divThickness: 6
      };
    },
    setConfig: (state, payload) => {
      state.doorConfig = payload;
    },
    addConfig: (state, payload) => {
      state.savedConfigs.push(payload);
    },
    clearSavedConfigs: state => {
      state.savedConfigs = [];
    }
  }
});
