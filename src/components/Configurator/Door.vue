<template>
  <div id="door" class="door-wrapper">
    <div class="top-dim-wrapper" v-if="!infoMode">
      <div class="top-dim">
        <div class="top-dim__dim">{{topDim}}</div>
      </div>
    </div>
    <div class="door-frame" v-for="index in doorType" ref="doorFrames">
      <div class="door-beam-wrapper">
        <div class="door-beam" v-for="index in doorBeams" ref="doorBeam"></div>
      </div>
      <div class="door-post-wrapper">
        <div class="door-post" v-for="index in doorPosts" ref="doorPost"></div>
      </div>
      <div class="vertical-dim-wrapper" v-if="index === 1 && !infoMode">
        <div class="vertical-dim">
          <div class="vertical-dim__dim">{{doorHeight}}</div>
        </div>
      </div>
      <div class="bottom-dim-wrapper" v-if="!infoMode">
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
  props: {
    infoDemoIndex: Number
  },
  data() {
    return {
      maxWidth: 160,
      maxHeight: 300
      // ^^ obadaj gdzie to dac i wyciagnij w doorSize
    };
  },
  computed: {
    infoMode() {
      let infoMode = false;
      if (this.infoDemoIndex !== undefined && this.infoDemoIndex !== null) {
        infoMode = true;
      }
      return infoMode;
    },
    doorConfig() {
      let door;
      if (this.infoMode) {
        door = this.$store.getters.getSavedConfigs[this.infoDemoIndex - 1];
      } else {
        door = this.$store.getters.getDoorConfig;
      }
      return door;
    },
    doorWidth() {
      return this.doorConfig.width;
    },
    doorHeight() {
      return this.doorConfig.height;
    },
    doorType() {
      return this.doorConfig.type;
    },
    doorBeams() {
      return this.doorConfig.beams;
    },
    doorPosts() {
      return this.doorConfig.posts;
    },
    topDim() {
      let dim = this.doorWidth * this.doorType;
      return dim;
    },
    doorColor() {
      return this.doorConfig.color;
    },
    divThickness() {
      return this.doorConfig.divThickness;
    },
    frameThickness() {
      return this.doorConfig.frameThickness;
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
  },
  methods: {
    updateDimentions() {
      let doorFrames = this.$refs.doorFrames;
      for (let frame of doorFrames) {
        frame.style.width = this.doorWidth + "px";
        frame.style.height = this.doorHeight + "px";
        frame.style.borderWidth = this.frameThickness + "px";
      }
    },
    setColor() {
      let doorBeam = this.$refs.doorBeam;
      if (doorBeam) {
        for (let element of doorBeam) {
          element.style.background = this.doorColor;
        }
      }
      let doorPost = this.$refs.doorPost;
      if (doorPost) {
        for (let element of doorPost) {
          element.style.background = this.doorColor;
        }
      }
      let doorFrames = this.$refs.doorFrames;
      for (let frame of doorFrames) {
        frame.style.borderColor = this.doorColor;
      }
    },
    setThickness() {
      let doorBeam = this.$refs.doorBeam;
      let doorPost = this.$refs.doorPost;
      if (doorBeam) {
        for (let beam of doorBeam) {
          beam.style.height = this.divThickness + "px";
        }
      }
      if (doorPost) {
        for (let post of doorPost) {
          post.style.width = this.divThickness + "px";
        }
      }
    }
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
  /* min-width: 100px;
  min-height: 220px; */
}

.door-beam-wrapper,
.door-post-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: space-evenly;
}

.door-beam-wrapper {
  flex-direction: column;
  top: 0;
  left: -1px;
}

.door-post-wrapper {
  top: -1px;
  left: 0;
}

.door-beam {
  width: calc(100% + 2px);
  background: var(--doorCol);
}

.door-post {
  height: calc(100% + 2px);
  background: var(--doorCol);
}

.vertical-dim-wrapper {
  position: absolute;
  top: -6px;
  left: -42px;
  height: calc(100% + 12px);
}

.top-dim,
.bottom-dim,
.vertical-dim {
  background: #848c93;
  position: relative;
}

.vertical-dim {
  width: 3px;
  height: 100%;
}

.top-dim__dim,
.bottom-dim__dim,
.vertical-dim__dim {
  background: red;
  position: absolute;
  transform: translate(-50%, -50%);
  color: #fff;
  background: #2d303a;
  border: 3px solid #2d303a;
  font-size: 15px;
  font-weight: bold;
  line-height: 14px;
  padding: 3px 8px;
  /* border-radius: 5px; */
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
  height: 3px;
  background: #848c93;
  left: 0;
  transform: translateX(-50%);
}

.vertical-dim:before {
  top: 0;
}

.vertical-dim:after {
  top: calc(100% - 6px);
}

.bottom-dim-wrapper {
  position: absolute;
  width: calc(100% + 12px);
}

.top-dim-wrapper {
  position: absolute;
  width: 100%;
}

.bottom-dim-wrapper {
  bottom: -35px;
  left: -6px;
}

.top-dim-wrapper {
  top: calc(-30px + 3px);
}

.top-dim-wrapper .top-dim,
.bottom-dim {
  height: 3px;
  width: 100%;
}

.top-dim:before,
.top-dim:after,
.bottom-dim:before,
.bottom-dim:after {
  content: "";
  display: inline-block;
  position: relative;
  width: 3px;
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
  left: calc(100% - 6px);
}

.top-dim__dim,
.bottom-dim__dim {
  left: 50%;
  top: 0;
}
</style>
