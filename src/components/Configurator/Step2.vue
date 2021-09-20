<template>
  <div>
    <door-division 
      :config-beams-num="doorConfig.beams"
      :config-posts-num="doorConfig.posts"
      :config-div-thickness="doorConfig.divThickness"
    />
  </div>
</template>

<script>
import DoorDivision from './DoorDivision';

export default {
  components: {
    DoorDivision
  },
  props: ['doorConfig']
}
</script>