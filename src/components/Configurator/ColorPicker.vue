<template>
  <div class="color-picker">
    <canvas ref="canvas" class="canvas" width="100" height="100"></canvas>
  </div>
</template>

<script>
export default {
  name: "color-picker",
  data() {
    return {
      canvas: null,
      ctx: null,
      mouseOver: false,
      mousePressed: false,
      canvasOffsetX: null,
      canvasOffsetY: null,
      pickerX: null,
      pickerY: null,
      pickerRadius: 5,
      img: null,
      imageData: null,
      pickedColor: null
    };
  },
  methods: {
    draw(x, y) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawImg();
      this.ctx.strokeStyle =
        "rgb(" +
        2 * this.pickerY +
        ", " +
        2 * this.pickerY +
        ", " +
        2 * this.pickerY +
        ")";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x - 2, y - 2, this.pickerRadius, 0, 2 * Math.PI);
      this.ctx.stroke();
    },
    setPickerPos(e) {
      this.canvasOffsetX = this.canvas.getBoundingClientRect().left;
      this.canvasOffsetY = this.canvas.getBoundingClientRect().top;
      this.pickerX = e.clientX - this.canvasOffsetX;
      this.pickerY = e.clientY - this.canvasOffsetY;
      let newPickerPos = {
        x: this.pickerX,
        y: this.pickerY
      };
      this.$store.commit("storePickerPos", newPickerPos);
    },
    drawImg() {
      let path = require("../.././assets/palette.png");
      this.img = new Image();
      this.img.src = path;
      this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    },
    getColor(x, y) {
      this.imageData = this.ctx.getImageData(x, y, 1, 1);
      let red = this.imageData.data[0];
      let green = this.imageData.data[1];
      let blue = this.imageData.data[2];
      this.pickedColor = "rgb(" + red + "," + green + "," + blue + ")";
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.pickerX = this.pickerPos.x;
    this.pickerY = this.pickerPos.y;

    // this.drawImg();
    // OCCOOCOCOSAODOSAODOSAODOSAODOSA ??????? nie rysuje sie odrazu
    this.draw(this.pickerX, this.pickerY);
    this.getColor(this.pickerX, this.pickerY);

    this.canvas.addEventListener("mouseover", () => {
      this.mouseOver = true;
    });

    this.canvas.addEventListener("mouseout", () => {
      this.mouseOver = false;
      this.mousePressed = false;
    });

    this.canvas.addEventListener("mousedown", e => {
      this.mousePressed = true;
      this.setPickerPos(e);
      this.draw(this.pickerX, this.pickerY);
      this.getColor(this.pickerX, this.pickerY);
    });

    this.canvas.addEventListener("mouseup", () => {
      this.mousePressed = false;
    });

    this.canvas.addEventListener("mousemove", e => {
      if (this.mouseOver && this.mousePressed) {
        this.setPickerPos(e);
        this.draw(this.pickerX, this.pickerY);
        this.getColor(this.pickerX, this.pickerY);
      }
    });
  },
  computed: {
    pickerPos() {
      return this.$store.state.pickerPos;
    }
  },
  watch: {
    pickedColor() {
      this.$store.commit("storeCustomColor", this.pickedColor);
    }
  }
};
</script>

<style scoped>
.canvas {
  border: 1px solid #e6e6e6;
  cursor: default;
  border-radius: 100px;
  position: relative;
  top: -5px;
}
</style>
