import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    errorBarShow: false,
    error: "",
    processingShow: false,
    configuratorPath: "configurator/120/250",
    loggedIn: false,
    token: "",
    typeInfoShow: false,
    configStep: 1,
    door: {
      width: 100,
      height: 200,
      type: 1,
      beams: 0,
      posts: 0,
      color: "#5A5858",
      divThickness: 6
    }
  },
  mutations: {
    errorBar: (state, bool) => {
      state.errorBarShow = bool;
    },
    typeInfo: (state, bool) => {
      state.typeInfoShow = bool;
    },
    errorMsg: (state, msg) => {
      state.error = msg;
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
