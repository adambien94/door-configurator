<template>
  <div id="toolbar" class="bar">
    <img src="https://cpwebassets.codepen.io/assets/packs/vue-logo-7acfd91310ad2aa8593915dd904cf269.svg" class="logo" />
    <div class="tools">
      <label for="language" class="tools__select-label">{{ $t("message.selectLanguage")}}</label>
      <div
        class="tools__select"
        :class="{'tools__select--opened' : selectShow}"
        @click="selectShow = !selectShow"
      >
        {{ $t("languages."+ $i18n.locale) }}
        <transition name="select-transition">
          <ul class="select__list" v-if="selectShow">
            <li
              v-for="(lang, index) in langs"
              class="select__item"
              :class="{ 'select__item--active' : lang === $i18n.locale}"
              @click="setLanguage(lang)"
              :key="index"
            >{{ $t("languages." + lang)}}</li>
          </ul>
        </transition>
      </div>
      <div class="btn-wrapper">
        <div
          class="tools__my-organization"
          ref="organizationBtn"
          @click="organizationShow = !organizationShow"
        >{{ $t("message.myOrganization")}}</div>
        <transition name="organization-transition">
          <organization v-if="organizationShow"></organization>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Organization from "../ui/Organization.vue";
import translation from "../../translation";

export default {
  name: "toolbar",
  components: {
    organization: Organization
  },
  data() {
    return {
      organizationShow: false,
      langs: Object.keys(translation),
      selectShow: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getIsUserLogged;
    },
    token() {
      return this.$store.getters.getToken;
    }
  },
  watch: {
    isLoggedIn() {
      const { organizationBtn } = this.$refs;
      organizationBtn.style.visibility = this.isLoggedIn ? "visible" : "hidden";
    }
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>

<style scoped>
.bar {
  background: #2d303a;
  padding: 10px 0;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 47px;
  height: 47px;
  position: absolute;
  left: 107px;
  top: 9px;
}

.tools {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.tools__my-organization {
  background: yellow;
  margin-right: 10px;
  padding: 13px 0;
  background: #444857;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  border: none;
  cursor: pointer;
  position: relative;
  visibility: hidden;
  width: 150px;
  text-align: center;
  font-size: 15px;
}

.btn-wrapper {
  width: auto;
  position: relative;
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
  animation: rollDown 0.125s ease-out reverse;
  animation-delay: 0.05s;
}

.tools__select {
  position: relative;
  /* border: 1px solid #909090; */
  background: #47cf73;
  border-radius: 4px;
  padding: 13px 0 13px 16px;
  margin: 0 10px;
  color: #000;
  cursor: pointer;
  width: 96px;
  font-size: 15px;
}

.tools__select:after {
  content: "";
  display: block;
  width: 7px;
  height: 7px;
  border-bottom: 2px solid #000;
  border-left: 2px solid #000;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(calc(-50% - 2px)) rotate(-45deg);
  transition: transform 0.2s ease-in-out;
  transition-delay: 0.15s;
}

.tools__select--opened:after {
  transition: transform 0.2s ease-in-out;
  transition-delay: 0s;
  transform: translateY(calc(-50% + 2px)) rotate(135deg);
}

.select__list {
  position: absolute;
  background: #fff;
  top: 100%;
  list-style: none;
  width: 100%;
  left: -1px;
  border-radius: 4px;
  overflow: hidden;
  color: #000;
  box-shadow: 0px 23px 33px rgba(0, 0, 0, 0.9);
  /* display: none; */
}

.select__item {
  padding: 7px 0px 7px 16px;
  position: relative;
  /* background: #f4f4f4; */
}

.select__item--active:after {
  content: "";
  position: absolute;
  right: 12px;
  width: 4px;
  height: 9px;
  top: 8px;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(45deg);
}

@keyframes selectRollDown {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 200%;
  }
}

.select-transition-enter-active {
  animation: selectRollDown 0.2s;
}

.select-transition-leave-active {
  animation: selectRollDown 0.15s reverse;
  animation-delay: 0.15s;
}
</style>