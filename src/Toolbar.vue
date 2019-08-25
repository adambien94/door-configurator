<template>
  <div id="toolbar" class="bar">
    <img src="./assets/Logo.png" class="logo" />
    <div class="tools">
      <!-- <form> -->
      <label for="language" class="tools__select-label">Select language:</label>
      <select name="language" class="tools__select">
        <option value="language" v-for="language in languages">{{ language }}</option>
      </select>
      <!-- </form> -->
      <div class="tools__my-organization" @click="organizationShow = !organizationShow; get()">
        My organization
        <transition name="organization-transition">
          <organization v-if="organizationShow"></organization>
        </transition>
      </div>
      <button @click="test">hehe</button>
      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Organization from "./Organization.vue";
import i18n from "./main";
import translation from "./translation";

export default {
  name: "toolbar",
  components: {
    organization: Organization
  },
  data() {
    return {
      languages: ["Polish", "English"],
      organizationShow: false,
      langs: Object.keys(translation)
    };
  },
  methods: {
    test() {
      $i18n.locale = "en";
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    token() {
      return this.$store.state.token;
    }
  },
  watch: {
    loggedIn() {
      const organizationBtn = document.querySelector(".tools__my-organization");
      if (this.loggedIn) {
        organizationBtn.style.visibility = "visible";
      } else {
        organizationBtn.style.visibility = "hidden";
      }
    }
  }
};
</script>

<style scoped>
.bar {
  background: #fff;
  height: 80px;
  width: 100%;
  box-shadow: 0px 3px 12px #c9c9c9;
  position: relative;
}

.logo {
  width: 47px;
  height: 47px;
  position: absolute;
  left: 107px;
  top: 18px;
}

.tools {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.tools__select {
  border: 1px solid #909090;
  border-radius: 3px;
  padding: 7px 50px 6px 16px;
  margin: 0 19px;
  color: var(--main-font);
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
}

.tools__select::-ms-expand {
  display: none;
}

.tools__my-organization {
  background: yellow;
  margin-right: 64px;
  padding: 5px 8px 6px 8px;
  background: #77779d;
  border-radius: 3px;
  text-decoration: none;
  color: #ffffff;
  border: none;
  cursor: pointer;
  position: relative;
  visibility: hidden;
}

@keyframes rollDown {
  0% {
    opacity: 0;
    transform: translateY(calc(-50% - 25px)) scaleY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

.organization-transition-enter-active {
  animation: rollDown 0.25s ease-out;
}

.organization-transition-leave-active {
  animation: rollDown 0.15s ease-out reverse;
  animation-delay: 0.075s;
}
</style>