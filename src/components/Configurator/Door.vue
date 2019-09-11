<template>
  <div id="door" class="door-wrapper">
    <div class="top-dim-wrapper">
      <div class="top-dim">
        <div class="top-dim__dim">{{topDim}}</div>
      </div>
    </div>
    <div class="door-frame" v-for="index in doorType">
      <div class="door-beam-wrapper">
        <div class="door-beam" v-for="index in doorBeams"></div>
      </div>
      <div class="door-post-wrapper">
        <div class="door-post" v-for="index in doorPosts"></div>
      </div>
      <div class="vertical-dim-wrapper" v-if="index === 1">
        <div class="vertical-dim">
          <div class="vertical-dim__dim">{{doorHeight}}</div>
        </div>
      </div>
      <div class="bottom-dim-wrapper">
        <div class="bottom-dim">
          <div class="bottom-dim__dim">{{doorWidth}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "door",
  data() {
    return {
      maxWidth: 160,
      maxHeight: 300
      // ^^ obadaj gdzie to dac i wyciagnij w doorSize
    };
  },
  methods: {
    updateDimentions() {
      const frames = document.querySelectorAll(".door-frame");
      for (let frame of frames) {
        frame.style.width = this.doorWidth + "px";
        frame.style.height = this.doorHeight + "px";
      }
    },
    setColor() {
      let rootDoc = document.documentElement;
      rootDoc.style.setProperty("--doorCol", this.doorColor);
    },
    setThickness() {
      const beams = document.querySelectorAll(".door-beam");
      const posts = document.querySelectorAll(".door-post");
      for (let beam of beams) {
        beam.style.height = this.divThickness + "px";
      }
      for (let post of posts) {
        post.style.width = this.divThickness + "px";
      }
    }
  },
  computed: {
    doorWidth() {
      return this.$store.state.door.width;
    },
    doorHeight() {
      return this.$store.state.door.height;
    },
    doorType() {
      return this.$store.state.door.type;
    },
    doorBeams() {
      return this.$store.state.door.beams;
    },
    doorPosts() {
      return this.$store.state.door.posts;
    },
    topDim() {
      let dim = this.doorWidth * this.doorType;
      return dim;
    },
    doorColor() {
      return this.$store.state.door.color;
    },
    divThickness() {
      return this.$store.state.door.divThickness;
    }
  },
  watch: {
    doorWidth() {
      this.updateDimentions();
    },
    doorHeight() {
      this.updateDimentions();
    },
    doorColor() {
      this.setColor();
    },
    divThickness() {
      this.setThickness();
    }
  },
  mounted() {
    this.updateDimentions();
    this.setColor();
    this.setThickness();
  },
  updated() {
    this.updateDimentions();
    this.setColor();
    this.setThickness();
  }
};
</script>

<style scoped>
.door-wrapper {
  display: flex;
  justify-content: space-around;
  position: relative;
}

.door-frame {
  width: 15px;
  height: 30px;
  box-sizing: border-box;
  border: 6px solid var(--doorCol);
  position: relative;
  margin-right: 1px;
  max-height: 300px;
  max-width: 160px;
  min-width: 100px;
  min-height: 220px;
}

.door-beam-wrapper,
.door-post-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
}

.door-beam-wrapper {
  flex-direction: column;
}

.door-beam {
  width: 100%;
  background: var(--doorCol);
}

.door-post {
  height: 100%;
  background: var(--doorCol);
}

.vertical-dim-wrapper {
  position: absolute;
  top: -3px;
  left: -36px;
  height: calc(100% + 6px);
}

.top-dim,
.bottom-dim,
.vertical-dim {
  background: #848c93;
  position: relative;
}

.vertical-dim {
  width: 1px;
  height: 100%;
}

.top-dim__dim,
.bottom-dim__dim,
.vertical-dim__dim {
  background: red;
  position: absolute;
  transform: translate(-50%, -50%);
  color: #848c93;
  background: #fff;
  border: 1px solid #848c93;
  font-size: 12px;
  line-height: 14px;
  padding: 1px 8px;
}

.vertical-dim__dim {
  top: 50%;
  left: 0;
}

.vertical-dim:before,
.vertical-dim:after {
  content: "";
  display: block;
  position: relative;
  width: 18px;
  height: 1px;
  background: #848c93;
  left: 0;
  transform: translateX(-50%);
}

.vertical-dim:before {
  top: 0;
}

.vertical-dim:after {
  top: calc(100% - 2px);
}

.bottom-dim-wrapper {
  position: absolute;
  width: calc(100% + 6px);
}

.top-dim-wrapper {
  position: absolute;
  width: 100%;
}

.bottom-dim-wrapper {
  bottom: -30px;
  left: -3px;
}

.top-dim-wrapper {
  top: calc(-30px + 3px);
}

.top-dim-wrapper .top-dim,
.bottom-dim {
  height: 1px;
  width: 100%;
}

.top-dim:before,
.top-dim:after,
.bottom-dim:before,
.bottom-dim:after {
  content: "";
  display: inline-block;
  position: relative;
  width: 1px;
  height: 18px;
  background: #848c93;
  top: 0;
  transform: translateY(-50%);
}

.top-dim:before,
.bottom-dim:before {
  left: 0;
}

.top-dim:after,
.bottom-dim:after {
  left: calc(100% - 2px);
}

.top-dim__dim,
.bottom-dim__dim {
  left: 50%;
  top: 0;
}
</style>
