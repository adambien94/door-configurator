import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import Configurator from "@/components/Configurator.vue";

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
