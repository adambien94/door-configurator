<template>
  <div id="doorSize">
    <span class="configurator-heading">{{$t("message.doorSize")}}</span>
    <form action class="size-form">
      <fieldset class="size-form__field">
        {{$t("message.width")}}:
        <input
          type="number"
          class="size-form__input"
          v-model="doorWidth"
          min="100"
          max="160"
        />
      </fieldset>
      <fieldset class="size-form__field">
        {{$t("message.height")}}:
        <input
          type="number"
          class="size-form__input"
          v-model="doorHeight"
          min="220"
          max="300"
        />
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "doorSize",
  data() {
    return {
      doorWidth: 0,
      doorHeight: 0
    };
  },
  computed: {
    myWidth() {
      return this.$store.state.door.width;
    },
    myHeight() {
      return this.$store.state.door.height;
    }
  },
  created() {
    this.doorWidth = this.myWidth;
    this.doorHeight = this.myHeight;
  },
  watch: {
    doorWidth() {
      this.$store.commit("storeWidth", this.doorWidth);
    },
    doorHeight() {
      this.$store.commit("storeHeight", this.doorHeight);
    }
  }
};
</script>

<style scoped>
.size-form {
  padding-top: 15px;
}

.size-form__field {
  color: #848c93;
  margin-bottom: 9px;
  position: relative;
  width: 154px;
  height: 26px;
  line-height: 26px;
  border: none;
}

.size-form__input {
  width: 30px;
  font-size: 12px;
  line-height: 16px;
  color: #848c93;
  padding: 3px 0px 3px 4px;
  width: 40px;
  position: absolute;
  right: 30px;
}

.size-form__field:after {
  content: "cm";
  display: block;
  position: absolute;
  width: 30px;
  height: 100%;
  top: 0;
  right: 0;
  text-align: center;
}
</style>
