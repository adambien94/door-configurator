<template>
  <div id="demo-mode">
    <div class="mode" v-for="(mode, index) in modes">
      <input
        type="radio"
        name="mode-rd"
        class="radio"
        :id="'mode' + index"
        :value="mode"
        v-model="demoMode"
      />
      <label :for="'mode' + index" class="mode__radio">{{mode}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-mode",
  data() {
    return {
      modes: ["3D", "2D"],
      demoMode: "2D"
    };
  }
};
</script>

<style scoped>
#demo-mode {
  position: absolute;
  top: 20px;
  right: 35px;
  border: 1px solid #6f91aa;
  display: flex;
  background: #d8d8d8;
}

.mode {
  border: none;
  border-right: 1px solid #6f91aa;
}

.mode:last-child {
  border-right: none;
}

.mode__radio {
  display: block;
  padding: 3px 8px;
  color: #6f91aa;
  cursor: pointer;
  position: relative;
}

.mode__radio:after {
}

.radio:checked + .mode__radio:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border: 1px solid #6f91aa;
}

.radio:checked + .mode__radio {
  background: #fff;
}
</style>
