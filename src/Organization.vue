<template>
  <div id="organization" class="organization">
    <div class="content">
      <p>
        organization
        <br />name: Legros, Bahringer and Waters email: tysonabernathy@cainryan.co phone_number: 436.155.3176 address_line_1: 3744 Willow Ferry address_line_2: Suite 289
        <br />city: New Krisbury
        <br />postal_code: 93851-0290
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "organization",

  data() {
    return {};
  }
};
</script>

<style scoped>
.organization {
  width: 300px;
  background: #fff;
  position: absolute;
  top: calc(100% + 32px);
  right: 65px;
  z-index: 5;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.organization:before {
  content: "";
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  background: #fff;
  right: 40px;
  transform: translate(0, -50%) rotate(45deg);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.organization:after {
  content: "";
  display: block;
  position: absolute;
  width: 40px;
  height: 25px;
  background: #fff;
  right: 34px;
  top: 0;
}

/* ^^^^ OGARNIJ TU Z-INDEX ^^^^ */

.content {
  width: 100%;
  height: 100%;
}

p {
  color: #7e7e7e;
  padding: 30px 35px;
}
</style>
