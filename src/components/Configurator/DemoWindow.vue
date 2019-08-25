<template>
  <div id="demoWindow">
    <div class="window">
      <door></door>
      <demo-mode></demo-mode>
    </div>
  </div>
</template>

<script>
import Door from "./Door.vue";
import DemoMode from "./DemoMode.vue";

export default {
  name: "demoWindow",
  components: {
    door: Door,
    demoMode: DemoMode
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.window {
  width: 590px;
  height: 472px;
  border: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
