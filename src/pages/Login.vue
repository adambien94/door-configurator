<template>
  <div id="login">
    <h1 class="title">{{ $t("message.loginTitle") }}</h1>
    <form action class="log-form">
      <input
        type="email"
        class="log-form__input"
        :placeholder="$t('message.email') "
        v-model="email"
      />
      <input
        type="password"
        class="log-form__input"
        :placeholder="$t('message.password') "
        v-model="password"
      />
      <input type="checkbox" id="keep-me" v-model="shouldKeepUserLogged" />
      <label for="keep-me" class="log-form__checkbox">{{ $t("message.remember") }}</label>
      <input
        type="submit"
        class="log-form__submit"
        :value="$t('message.login')"
        @click.prevent="post()"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "login@applover.pl",
      password: "password123",
      serverResponse: "",
      shouldKeepUserLogged: false,
      configuratorPath: "configurator"
    };
  },
  computed: {
    isProcessingShown() {
      return this.$store.getters.getIsProcessingShown;
    },
    token() {
      return this.$store.getters.getToken;
    },
    shouldRememberUser() {
      return this.$store.getters.getShouldRememberUser;
    }
  },
  watch: {
    isProcessingShown(isShown) {
      if (!isShown) {
        this.validation();
      }
    },
    shouldKeepUserLogged() {
      localStorage.setItem("shouldRememberUser", JSON.stringify(this.shouldKeepUserLogged));
    }
  },
  // DO ZMIANY
  created() {
    if (this.shouldRememberUser) {
      this.$router.push(this.configuratorPath);
    }
  },
  methods: {
    post() {
      this.$store.commit("toggleInfoBar", false);
      this.$store.commit("processing", true);
      this.$http
        .post("https://bench-api.applover.pl/api/v1/login", {
          email: this.email,
          password: this.password
        })
        .then(data => {
          this.serverResponse = data.body.status;
          this.$store.commit("storeToken", data.body.token);
        });
    },
    validation() {
      if (this.serverResponse === "200 OK") {
        this.onValidationSuccess();
      } else {
        this.onValidationError();
      }
    },
    onValidationSuccess() {
      this.$store.commit("toggleInfoBar", false);
      this.$router.push(this.configuratorPath);
    },
    onValidationError() {
      this.$store.commit("setInfoBarMessage", {
        message: this.$t("message.loginError"),
        type: "error"
      });
      this.$store.commit("toggleInfoBar", true);
      this.$store.dispatch("closeErrorBar", 3000);
    }
  }
};
</script>

<style scoped>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-top: 69px;
  font-size: 24px;
  line-height: 32px;
  color: #727272;
  font-weight: normal;
}

.log-form {
  width: 397px;
  padding-top: 39px;
}

.log-form__input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 18px;
  padding: 12px 23px 12px 23px;
  color: #a5a1a1;
  border-radius: 6px;
  border: 1px solid #c9c6c6;
  margin-top: 34px;
}

.log-form__input::placeholder {
  color: #a5a1a1;
}

#keep-me {
  display: none;
}

.log-form__checkbox {
  display: block;
  position: relative;
  left: 45px;
  font-size: 16px;
  color: #a5a1a1;
  line-height: 21px;
  margin-top: 22px;
  position: relative;
  cursor: pointer;
}

.log-form__checkbox:after {
  content: "";
  display: block;
  position: absolute;
  width: 28px;
  height: 25px;
  border: 1px solid #a5a1a1;
  top: -3px;
  right: calc(100% + 15px);
  z-index: 1;
  transition: background 0.15s;
}

.log-form__checkbox:before {
  content: "✔";
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 29px;
  height: 26px;
  top: -3px;
  right: calc(100% + 15px);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.15s;
}

#keep-me:checked + .log-form__checkbox:after {
  background: #f2fff8;
}

#keep-me:checked + .log-form__checkbox:before {
  opacity: 1;
}

.log-form__submit {
  background: #1de278;
  box-sizing: border-box;
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  color: #fff;
  padding: 12px 0;
  border-radius: 6px;
  border: none;
  margin-top: 31px;
  cursor: pointer;
}

.log-form__submit:hover {
  opacity: 0.8;
}
</style>
