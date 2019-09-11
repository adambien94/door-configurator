<template>
  <div id="demoWindow">
    <div class="window">
      <door-3d v-if="(mode === 0)"></door-3d>
      <door v-if="(mode === 1)"></door>
      <demo-mode></demo-mode>
    </div>
  </div>
</template>

<script>
import Door from "./Door.vue";
import Door3d from "./Door3d.vue";
import DemoMode from "./DemoMode.vue";
import { PointsMaterial } from "three";

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
      return this.$store.state.demoMode;
    }
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
