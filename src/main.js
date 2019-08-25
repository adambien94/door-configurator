// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { store } from "./store/store";
import VueResource from "vue-resource";
import VueI18n from "vue-i18n";

import translation from "./translation";

Vue.use(VueI18n);
Vue.use(VueResource);
Vue.config.productionTip = false;

// Ready translated locale messages

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: "ja", // set locale
  messages: translation // set locale messages
});

new Vue({
  store: store,
  el: "#app",
  router,
  i18n,
  components: { App },
  template: "<App/>"
});
