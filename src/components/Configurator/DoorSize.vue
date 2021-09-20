<template>
  <div id="doorSize">
    <span class="configurator-heading">{{$t("message.doorSize") }}</span>
    <form action class="size-form">
      <fieldset class="size-form__field">
        {{$t("message.width") + ""}}:
        <input
          type="number"
          class="size-form__input"
          v-model="width"
          min="100"
          max="160"
        />
      </fieldset>
      <fieldset class="size-form__field">
        {{$t("message.height")}}:
        <input
          type="number"
          class="size-form__input"
          v-model="height"
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
  props: ['configWidth', 'configHeight'],
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  mounted() {
    this.setDimensions();
  },
  watch: {
    width() {
      this.$store.commit("setDoorWidth", this.width);
    },
    height() {
      this.$store.commit("setDoorHeight", this.height);
    }
  },
  methods: {
    setDimensions() {
      this.width = this.configWidth;
      this.height = this.configHeight;
    }
  }
};
</script>

<style scoped>
.size-form {
  padding-top: 15px;
}

.size-form__field {
  color: #b7bbc8;
  margin-bottom: 9px;
  position: relative;
  width: 154px;
  height: 26px;
  line-height: 26px;
  border: none;
}

.size-form__input {
  width: 30px;
  font-size: 15px;
  line-height: 16px;
  color: #b7bbc8;
  padding: 3px 0px 3px 4px;
  width: 45px;
  position: absolute;
  right: 30px;
  background: transparent;
  border-radius: 5px;
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
