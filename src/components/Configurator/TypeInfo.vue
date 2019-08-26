<template>
  <div id="type-info" class="info-container">
    <div class="info">
      <h1 class="info__heading">{{ $t("message.hello") }}</h1>
      <div @click="closeInfoWindow" class="info__close"></div>
      <div class="info__box-wrapper">
        <div class="info__type-box" v-for="val in types">
          <span class="info__type-box__type">{{ val }}</span>
          <div class="info__type-box__illustration"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "type-info",
  data() {
    return {
      types: ["Single", "Double", "Triple"]
    };
  },
  methods: {
    closeInfoWindow() {
      this.$store.commit("typeInfo", false);
    }
  },
  computed: {
    typeInfoShow() {
      return this.$store.state.typeInfoShow;
    }
  }
};
</script>

<style scoped>
.info-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  top: 0;
  left: 0;
}

.info {
  width: 813px;
  height: 432px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #7998b0;
  padding: 29px;
  position: relative;
}

.info__heading {
  font-size: 24px;
  line-height: 32px;
  color: #6f91aa;
  font-weight: normal;
  padding-bottom: 7px;
  border-bottom: 1px solid #6f91aa;
}

.info__box-wrapper {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.info__type-box {
  width: 187px;
}

.info__type-box__type {
  display: block;
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  color: #6f91aa;
  padding: 20px 0;
}

.info__type-box__illustration {
  width: 100%;
  height: 229px;
  background: #d8d8d8;
}

.info__close {
  position: absolute;
  top: 16px;
  right: 40px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  transform: rotate(45deg);
  transition: transform 0.05s;
}

.info__close:hover {
  transform: rotate(45deg) scale(1.1);
}

.info__close:after,
.info__close:before {
  content: "";
  display: block;
  position: absolute;
  background: #6f91aa;
}

.info__close:after {
  left: 50%;
  width: 2px;
  height: 100%;
  transform: translate(-50%);
}

.info__close:before {
  top: 50%;
  height: 2px;
  width: 100%;
  transform: translate(0, -50%);
}
</style>
