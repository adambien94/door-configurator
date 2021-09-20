<template>
  <div>
    <door-color :config-color="doorConfig.color" />
    <color-picker />
    <div class="controls">
      <button
        class="controls__btn controls__btn--primary"
        @click="$emit('saveConfigurations')"
      >
        Add config
      </button>
      <button
        class="controls__btn controls__btn--danger"
        @click="$emit('resetConfigurations')"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import DoorColor from './DoorColor';
import ColorPicker from './ColorPicker';

export default {
  components: {
    DoorColor,
    ColorPicker
  },
  props: ['doorConfig']
}
</script>

<style scoped>
.controls__btn {
  font-size: 15px;
  line-height: 10px;
  padding: 13px 19px;
  font-family: "Rubik", sans-serif;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  bottom: 45px;
  cursor: pointer;
  margin-right: 10px;
}

.controls__btn--primary {
  background: #3a69ff;
}

.controls__btn--danger {
  left: 125px;
  background: #ffdd40;
  color: #000
}
</style>