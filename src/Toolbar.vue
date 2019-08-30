<template>
  <div id="toolbar" class="bar">
    <img src="./assets/Logo.png" class="logo" />
    <div class="tools">
      <label for="language" class="tools__select-label">{{ $t("message.selectLanguage")}}:</label>
      <div
        class="tools__select"
        :class="{'tools__select--opened' : selectShow}"
        @click="selectShow = !selectShow"
      >
        {{ $t("languages."+ $i18n.locale) }}
        <transition name="select-transition">
          <ul class="select__list" v-if="selectShow">
            <li
              v-for="(lang, i) in langs"
              class="select__item"
              :class="{ 'select__item--active' : lang === $i18n.locale}"
              @click="setLanguage(lang)"
            >{{ $t("languages." + lang)}}</li>
          </ul>
        </transition>
      </div>
      <div class="btn-wrapper">
        <div
          class="tools__my-organization"
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
      organizationShow: false,
      langs: Object.keys(translation),
      selectShow: false
    };
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
    }
  },
  get() {
    // this.$http
    //   .post("http://127.0.0.1:8000/api/address/store", address_data, {
    //     headers: { Authorization: "Bearer " + this.$auth.getToken() }
    //   })
    //   .then(
    //     response => {},
    //     response => {
    //       if (response.status == 422) {
    //         console.log("hello");
    //         console.log(response);
    //       }
    //     }
    //   );
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
  z-index: 2;
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
  border: 1px solid #909090;
  border-radius: 3px;
  padding: 5px 0 4px 16px;
  margin: 0 19px;
  color: var(--main-font);
  cursor: pointer;
  width: 96px;
}

.tools__select:after {
  content: "";
  display: block;
  width: 7px;
  height: 7px;
  border-bottom: 2px solid #909090;
  border-left: 2px solid #909090;
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
  border: 1px solid #909090;
  border-radius: 3px;
  overflow: hidden;
  /* display: none; */
}

.select__item {
  padding: 5px 0px 4px 16px;
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
  border-right: 2px solid #909090;
  border-bottom: 2px solid #909090;
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