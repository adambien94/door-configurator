<template>
  <div id="demoWindow">
    <div class="window">
      <door-3d v-if="(mode === 0)"></door-3d>
      <door v-if="(mode === 1)"></door>
      <demo-mode />
    </div>
  </div>
</template>

<script>
import Door from "./Door.vue";
import Door3d from "./Door3d.vue";
import DemoMode from "./DemoMode.vue";

export default {
  name: "demoWindow",
  components: {
    door: Door,
    door3d: Door3d,
    demoMode: DemoMode
  },
  data() {
    return {};
  },
  computed: {
    mode() {
      return this.$store.getters.getDemoMode;
    }
  }
};
</script>

<style scoped>
.window {
  width: 590px;
  height: 472px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #2d303a;
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.13);
  transform: scale(1);
}
</style>
