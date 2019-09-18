AA<template>
  <div id="door-3d">
    <div class="container" id="canvas-window">
      <span class="controls">
        Move: W,A,S,D
        <br />Camera: ⬅ ➡
      </span>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
export default {
  name: "door-3d",
  data() {
    return {
      doors: {},
      winWidth: null,
      scene: null,
      camera: null,
      player: { height: 3.9, speed: 0.1, turnSpeed: Math.PI * 0.01 },
      renderer: null,
      meshFloor: null,
      meshWall: null,
      meshBackground: null,
      meshWallFrontRight: null,
      meshWallFrontLeft: null,
      meshSilling: null,
      meshWallLeft: null,
      meshWallRight: null,
      ambientLight: null,
      light: null,
      lightOutside: null,
      keyboard: {},
      canvasWindow: null,
      doorNum: null,
      doorWidth: null,
      doorHeight: null,
      beamsNum: null,
      postsNum: null,
      doorPosX: 5,
      doorColor: null,
      doorDivDepth: null,
      scale: 0.03
    };
  },
  methods: {
    setCanvas() {
      this.canvasWindow = document.getElementById("canvas-window");

      this.winWidth = this.canvasWindow.getBoundingClientRect().width;
      this.winHeight = this.canvasWindow.getBoundingClientRect().height;

      window.addEventListener("keydown", this.keyDown);
      window.addEventListener("keyup", this.keyUp);

      window.addEventListener("resize", () => {
        this.renderer.setSize(this.winWidth, this.winHeight);
      });

      this.init();
      this.drawWalls();
    },
    keyDown(event) {
      this.keyboard[event.keyCode] = true;
    },
    keyUp(event) {
      this.keyboard[event.keyCode] = false;
    },
    init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        90,
        this.winWidth / this.winHeight,
        0.1,
        1000
      );

      this.camera.position.set(0, this.player.height, -3.55);
      this.camera.lookAt(new THREE.Vector3(0, this.player.height, 0));

      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(this.ambientLight);

      this.light = new THREE.PointLight(0xffffff, 0.6, 90);
      this.light.position.set(-3, 7, -5);
      this.light.castShadow = true;
      this.light.shadow.camera.near = 0.1;
      this.light.shadow.camera.far = 25;
      this.scene.add(this.light);

      this.lightOutside = new THREE.PointLight(0xffffff, 0.4, 100);
      this.lightOutside.position.set(-3, 20, 11);
      this.lightOutside.castShadow = true;
      this.lightOutside.shadow.camera.near = 0.1;
      this.lightOutside.shadow.camera.far = 25;
      this.scene.add(this.lightOutside);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.winWidth, this.winHeight);

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.BasicShadowMap;

      this.canvasWindow.appendChild(this.renderer.domElement);

      this.animate();
    },
    drawWalls() {
      let path = require("../.././assets/floor.png");
      let texture = new THREE.TextureLoader().load(path);
      this.meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 10, 10),
        new THREE.MeshPhongMaterial({
          color: 0xfce2ba,
          map: texture
        })
      );
      this.meshFloor.rotation.x -= Math.PI / 2;
      this.meshFloor.position.z = -5;
      this.meshFloor.receiveShadow = true;
      this.scene.add(this.meshFloor);

      this.meshSilling = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 10, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee
        })
      );
      this.meshSilling.position.y = 10;
      this.meshSilling.position.z = -5;
      this.meshSilling.rotation.x += Math.PI / 2;
      this.meshSilling.receiveShadow = true;
      this.meshSilling.castShadow = true;

      this.scene.add(this.meshSilling);

      this.meshWallFrontRight = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          wireframe: false
        })
      );
      this.meshWallFrontRight.position.set(
        -10 - ((this.doorWidth + this.doorDepth / 2) * this.doorNum) / 2 + 0.05,
        5,
        5
      );
      this.meshWallFrontRight.rotation.x -= Math.PI;
      this.meshWallFrontRight.receiveShadow = true;
      this.meshWallFrontRight.castShadow = true;
      this.scene.add(this.meshWallFrontRight);

      this.meshWallFrontLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          wireframe: false
        })
      );
      this.meshWallFrontLeft.position.set(
        10 + ((this.doorWidth + this.doorDepth) * this.doorNum) / 2,
        5,
        5
      );
      this.meshWallFrontLeft.rotation.x -= Math.PI;
      this.meshWallFrontLeft.receiveShadow = true;
      this.meshWallFrontLeft.castShadow = true;
      this.scene.add(this.meshWallFrontLeft);

      this.meshWall = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          wireframe: false
        })
      );
      this.meshWall.position.set(0, this.doorHeight + 5, 5);
      this.meshWall.rotation.x -= Math.PI;
      this.meshWall.receiveShadow = true;
      this.meshWall.castShadow = true;
      this.scene.add(this.meshWall);

      this.meshBackground = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400),
        new THREE.MeshPhongMaterial({
          // map: texture
          color: 0xafdfed,
          wireframe: false
        })
      );
      this.meshBackground.position.set(0, 0, 35);
      this.meshBackground.rotation.x -= Math.PI;
      this.scene.add(this.meshBackground);

      this.meshWallBack = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          wireframe: false
        })
      );
      this.meshWallBack.position.set(0, 5, -15);
      this.meshWallBack.rotation.x += Math.PI * 2;
      this.meshWallBack.receiveShadow = true;
      this.meshWallBack.castShadow = true;
      this.scene.add(this.meshWallBack);

      this.meshWallLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          wireframe: false
        })
      );
      this.meshWallLeft.position.set(10, 5, -5);
      this.meshWallLeft.rotation.y -= Math.PI / 2;
      this.meshWallLeft.receiveShadow = true;
      this.meshWallLeft.castShadow = true;
      this.scene.add(this.meshWallLeft);

      this.meshWallRight = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          wireframe: false
        })
      );
      this.meshWallRight.position.set(-10, 5, -5);
      this.meshWallRight.rotation.y += Math.PI / 2;
      this.meshWallRight.receiveShadow = true;
      this.meshWallRight.castShadow = true;
      this.scene.add(this.meshWallRight);
    },
    clearDoorMesh() {
      for (let i = 0; i < this.doorNum; i++) {
        for (let key in this.doors[i].verticalObj) {
          this.doors[i].verticalObj[key].geometry.dispose();
          this.doors[i].verticalObj[key].material.dispose();
          this.scene.remove(this.doors[i].verticalObj[key]);
        }

        for (let key in this.doors[i].horizontalObj) {
          this.doors[i].horizontalObj[key].geometry.dispose();
          this.doors[i].horizontalObj[key].material.dispose();
          this.scene.remove(this.doors[i].horizontalObj[key]);
        }

        for (let key of this.doors[i].beams) {
          key.geometry.dispose();
          key.material.dispose();
          this.scene.remove(key);
        }

        for (let key of this.doors[i].posts) {
          key.geometry.dispose();
          key.material.dispose();
          this.scene.remove(key);
        }

        this.doors[i].doorBackground.geometry.dispose();
        this.doors[i].doorBackground.material.dispose();
        this.scene.remove(this.doors[i].doorBackground);
      }
    },
    clearWallsMesh() {
      this.meshWallFrontRight.geometry.dispose();
      this.meshWallFrontRight.material.dispose();
      this.scene.remove(this.meshWallFrontRight);
      this.meshWallFrontLeft.geometry.dispose();
      this.meshWallFrontLeft.material.dispose();
      this.scene.remove(this.meshWallFrontLeft);
      this.meshWall.geometry.dispose();
      this.meshWall.material.dispose();
      this.scene.remove(this.meshWall);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);

      if (this.keyboard[87]) {
        // W
        this.camera.position.x -=
          Math.sin(this.camera.rotation.y) * this.player.speed;

        this.camera.position.z -=
          -Math.cos(this.camera.rotation.y) * this.player.speed;

        this.moveLimit();
      }

      if (this.keyboard[83]) {
        // S
        this.camera.position.x +=
          Math.sin(this.camera.rotation.y) * this.player.speed;
        this.camera.position.z +=
          -Math.cos(this.camera.rotation.y) * this.player.speed;
        this.moveLimit();
      }

      if (this.keyboard[65]) {
        // A
        this.camera.position.x +=
          Math.sin(this.camera.rotation.y + Math.PI / 2) * this.player.speed;
        this.camera.position.z +=
          -Math.cos(this.camera.rotation.y + Math.PI / 2) * this.player.speed;
        this.moveLimit();
      }

      if (this.keyboard[68]) {
        // D
        this.camera.position.x +=
          Math.sin(this.camera.rotation.y - Math.PI / 2) * this.player.speed;
        this.camera.position.z +=
          -Math.cos(this.camera.rotation.y - Math.PI / 2) * this.player.speed;
        this.moveLimit();
      }

      if (this.keyboard[37]) {
        this.camera.rotation.y -= this.player.turnSpeed;
      }
      if (this.keyboard[39]) {
        this.camera.rotation.y += this.player.turnSpeed;
        this.moveLimit();
      }
    },
    moveLimit() {
      if (this.camera.position.x > 8) {
        this.camera.position.x = 8;
      } else if (this.camera.position.x < -8) {
        this.camera.position.x = -8;
      }
      if (this.camera.position.z > 4) {
        this.camera.position.z = 4;
      } else if (this.camera.position.z < -11) {
        this.camera.position.z = -11;
      }
    },
    drawDoor() {
      let doorBeam;
      let doorPost;
      this.doorWidth = this.door.width * this.scale;
      this.doorHeight = this.door.height * this.scale;
      this.doorDepth = 6 * this.scale;
      this.beamsNum = this.door.beams;
      this.postNum = this.door.posts;
      this.doorNum = this.door.type;
      this.doorPosX =
        (this.doorWidth / 2) * this.doorNum +
        (this.doorDepth / 2) * this.doorNum;
      this.doorColor = this.door.color;
      this.doorDivDepth = this.door.divThickness * this.scale;

      for (let i = 0; i < this.doorNum; i++) {
        this.doors[i] = {
          verticalObj: {
            frameLeft: null,
            frameRight: null
          },
          horizontalObj: {
            frameTop: null,
            frameBottom: null
          },
          doorBackground: null,
          beams: [],
          posts: []
        };

        this.doors[i].verticalObj.frameLeft = new THREE.Mesh(
          new THREE.BoxGeometry(
            this.doorDepth,
            this.doorHeight,
            this.doorDepth
          ),
          new THREE.MeshPhongMaterial({
            color: this.doorColor,
            wireframe: false
          })
        );
        this.doors[i].verticalObj.frameLeft.position.set(
          this.doorPosX,
          this.doorHeight / 2 + 0.1,
          5 - 0.1
        );
        this.doors[i].verticalObj.frameLeft.receiveShadow = true;
        this.doors[i].verticalObj.frameLeft.castShadow = true;
        this.scene.add(this.doors[i].verticalObj.frameLeft);

        this.doors[i].verticalObj.frameRight = new THREE.Mesh(
          new THREE.BoxGeometry(
            this.doorDepth,
            this.doorHeight,
            this.doorDepth
          ),
          new THREE.MeshPhongMaterial({
            color: this.doorColor,
            wireframe: false
          })
        );
        this.doors[i].verticalObj.frameRight.position.set(
          this.doorPosX - this.doorWidth,
          this.doorHeight / 2 + 0.1,
          5 - 0.1
        );
        this.doors[i].verticalObj.frameRight.receiveShadow = true;
        this.doors[i].verticalObj.frameRight.castShadow = true;
        this.scene.add(this.doors[i].verticalObj.frameRight);

        this.doors[i].horizontalObj.frameTop = new THREE.Mesh(
          new THREE.BoxGeometry(
            this.doorWidth + this.doorDepth,
            this.doorDepth,
            this.doorDepth
          ),
          new THREE.MeshPhongMaterial({
            color: this.doorColor,
            wireframe: false
          })
        );
        this.doors[i].horizontalObj.frameTop.position.set(
          this.doorPosX - this.doorWidth / 2,
          this.doorHeight + 0.1,
          5 - 0.1
        );
        this.doors[i].horizontalObj.frameTop.receiveShadow = true;
        this.doors[i].horizontalObj.frameTop.castShadow = true;
        this.scene.add(this.doors[i].horizontalObj.frameTop);

        this.doors[i].horizontalObj.frameBottom = new THREE.Mesh(
          new THREE.BoxGeometry(
            this.doorWidth + this.doorDepth,
            this.doorDepth,
            this.doorDepth
          ),
          new THREE.MeshPhongMaterial({
            color: this.doorColor,
            wireframe: false
          })
        );
        this.doors[i].horizontalObj.frameBottom.position.set(
          this.doorPosX - this.doorWidth / 2,
          0 + 0.1,
          5 - 0.1
        );
        this.doors[i].horizontalObj.frameBottom.receiveShadow = true;
        this.doors[i].horizontalObj.frameBottom.castShadow = true;
        this.scene.add(this.doors[i].horizontalObj.frameBottom);

        for (let j = 0; j < this.beamsNum; j++) {
          doorBeam = new THREE.Mesh(
            new THREE.BoxGeometry(
              this.doorWidth,
              this.doorDivDepth,
              this.doorDivDepth
            ),
            new THREE.MeshPhongMaterial({
              color: this.doorColor,
              wireframe: false
            })
          );
          doorBeam.position.set(
            this.doorPosX - this.doorWidth / 2,
            0.1 + (j + 1) * (this.doorHeight / (this.beamsNum + 1)),
            5 - 0.075
          );
          doorBeam.receiveShadow = true;
          doorBeam.castShadow = true;
          this.scene.add(doorBeam);
          this.doors[i].beams.push(doorBeam);
        }

        for (let j = 0; j < this.postNum; j++) {
          doorPost = new THREE.Mesh(
            new THREE.BoxGeometry(
              this.doorDivDepth,
              this.doorHeight,
              this.doorDivDepth
            ),
            new THREE.MeshPhongMaterial({
              color: this.doorColor,
              wireframe: false
            })
          );
          doorPost.position.set(
            this.doorPosX - (j + 1) * (this.doorWidth / (this.postNum + 1)),
            this.doorHeight / 2 + 0.1,
            5 - 0.075
          );
          doorPost.receiveShadow = true;
          doorPost.castShadow = true;
          this.scene.add(doorPost);
          this.doors[i].posts.push(doorPost);
        }

        this.doors[i].doorBackground = new THREE.Mesh(
          new THREE.PlaneGeometry(this.doorWidth, this.doorHeight),
          new THREE.MeshPhongMaterial({
            color: 0xb5d7ff,
            wireframe: false,
            transparent: true,
            opacity: 0.35
          })
        );
        this.doors[i].doorBackground.position.set(
          this.doorPosX - this.doorWidth / 2,
          this.doorHeight / 2 + 0.1,
          5 - 0.01
        );
        this.doors[i].doorBackground.rotation.x -= Math.PI;
        this.doors[i].doorBackground.rotation.z -= Math.PI;
        this.doors[i].doorBackground.receiveShadow = true;
        // this.doors[i].doorBackground.castShadow = true;
        this.scene.add(this.doors[i].doorBackground);
        this.doorPosX -= this.doorWidth + this.doorDepth + 0.025;
      }
    },
    updateDoor() {
      this.clearDoorMesh();
      this.clearWallsMesh();
      this.drawDoor();
      this.drawWalls();
    }
  },
  computed: {
    door() {
      return this.$store.state.door;
    },
    type() {
      return this.$store.state.door.type;
    },
    width() {
      return this.$store.state.door.width;
    },
    height() {
      return this.$store.state.door.height;
    },
    beams() {
      return this.$store.state.door.beams;
    },
    posts() {
      return this.$store.state.door.posts;
    },
    divThickness() {
      return this.$store.state.door.divThickness;
    },
    color() {
      return this.$store.state.door.color;
    }
  },
  watch: {
    type() {
      this.updateDoor();
    },
    width() {
      this.updateDoor();
    },
    height() {
      this.updateDoor();
    },
    beams() {
      this.updateDoor();
    },
    posts() {
      this.updateDoor();
    },
    divThickness() {
      this.updateDoor();
    },
    color() {
      this.updateDoor();
    }
  },
  created() {
    this.doorWidth = this.door.width * this.scale;
    this.doorHeight = this.door.height * this.scale;
    this.doorDepth = 6 * this.scale;
    this.doorNum = this.door.type;
  },
  mounted() {
    this.setCanvas();
    this.drawDoor();
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
}

.controls {
  position: absolute;
  top: 15px;
  left: 30px;
  color: #444444;
  font-size: 13px;
  font-weight: 500;
}
</style>
