import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    errorBarShow: false,
    info: {
      message: "",
      type: "error"
    },
    processingShow: false,
    configuratorPath: "configurator",
    loggedIn: false,
    remember: false,
    token: "",
    typeInfoShow: false,
    configStep: 1,
    demoMode: 1,
    rememberMe: false || JSON.parse(localStorage.getItem("rememberMe")),
    customColor: null,
    pickerPos: JSON.parse(localStorage.getItem("pickerPos")) || {
      x: 50,
      y: 38
    },
    door: JSON.parse(localStorage.getItem("myDoor")) || {
      width: 120,
      height: 250,
      type: 1,
      beams: 0,
      posts: 0,
      color: "#5A5858",
      divThickness: 6
    },
    defaultConfig: {
      width: 120,
      height: 250,
      type: 1,
      beams: 0,
      posts: 0,
      color: "#5A5858",
      divThickness: 6
    }
    // czemu sie kasuje w resetConfig^^^
  },
  actions: {
    closeInfoBar: context => {
      setTimeout(() => {
        context.commit("errorBar", false);
      }, 3000);
    }
  },
  mutations: {
    errorBar: (state, bool) => {
      state.errorBarShow = bool;
    },
    typeInfo: (state, bool) => {
      state.typeInfoShow = bool;
    },
    setInfo: (state, information) => {
      state.info = {
        message: information.message,
        type: information.type
      };
    },
    processing: (state, bool) => {
      state.processingShow = bool;
    },
    validSucces: (state, bool) => {
      state.valid = bool;
    },
    logged: (state, bool) => {
      state.loggedIn = bool;
    },

    storeToken: (state, token) => {
      state.token = token;
    },
    storeWidth: (state, width) => {
      state.door.width = width;
    },
    storeHeight: (state, height) => {
      state.door.height = height;
    },
    storeType: (state, type) => {
      state.door.type = type;
    },
    storeBeams: (state, num) => {
      state.door.beams = num;
    },
    storePosts: (state, num) => {
      state.door.posts = num;
    },
    storeColor: (state, color) => {
      state.door.color = color;
    },
    storeDivThickness: (state, val) => {
      state.door.divThickness = val;
    },
    configStepChange: (state, val) => {
      state.configStep += val;
    },
    storeDemoMode: (state, num) => {
      state.demoMode = num;
    },
    storeCustomColor: (state, col) => {
      state.customColor = col;
    },
    storePickerPos: (state, newPos) => {
      state.pickerPos.x = newPos.x;
      state.pickerPos.y = newPos.y;
    },
    resetConfig: state => {
      state.door = {
        width: 120,
        height: 250,
        type: 1,
        beams: 0,
        posts: 0,
        color: "#5A5858",
        divThickness: 6
      };
    }
    // storeHeight: (state, height) => {
    //   state.width = height;
    // },
    // updateConfiguratorPath: (state, width, height) => {
    //   state.configuratorPath =
    //     "http://localhost:8080/?#/configurator/" + width + "/" + height;
    // }
  }
});
