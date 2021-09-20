<template>
  <div id="step1">
    <door-type 
      :config-type="doorConfig.type" 
    />
    <door-size
      :config-width="doorConfig.width"
      :config-height="doorConfig.height" 
    />
  </div>
</template>

<script>
import DoorType from './DoorType';
import DoorSize from './DoorSize';

export default {
  components: {
    DoorType,
    DoorSize
  },
  props: {
    doorConfig: {
      type: Object
    }
  }
}
</script>