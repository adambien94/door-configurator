import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/Login.vue";
import Configurator from "@/pages/configurator.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/configurator/",
      name: "configurator",
      component: Configurator
    }
    // {
    //   path: "/configurator/:width/:height",
    //   name: "configurator",
    //   props: true,
    //   component: Configurator
    // }
  ]
});
