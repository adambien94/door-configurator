<template>
  <div id="type-info" class="info-container">
    <div class="info">
      <h1 class="info__heading">{{ $t("message.doorType") }}</h1>
      <div @click="closeInfoWindow" class="info__close"></div>
      <div class="info__box-wrapper">
        <div class="info__type-box" v-for="(type, index) in types" :key="'type' + index">
          <span class="info__type-box__type">{{ $t("message." + type) }}</span>
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
      types: ["singleDoor", "doubleDoor", "tripleDoor"]
    };
  },
  methods: {
    closeInfoWindow() {
      this.$store.commit("toggleInfoModal", false);
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
  background: #2d303a;
  border-radius: 11px;
  box-sizing: border-box;
  padding: 29px;
  position: relative;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.13);
}

.info__heading {
  font-size: 24px;
  line-height: 32px;
  font-weight: normal;
  padding-bottom: 7px;
  border-bottom: 3px solid #f7dd3f;
  color: #fff;
  font-weight: bold;
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
  padding: 20px 0;
}

.info__type-box__illustration {
  width: 100%;
  height: 229px;
  background: #fff;
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
  background: #aaaebc;
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
