import { Renderer, Camera, Transform, Plane } from "ogl";
import NormalizeWheel from "normalize-wheel";
import { Media } from "./media.js";

export class Scene {
  constructor() {
    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0,
    };

    this.speed = 1;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGallery();

    this.onResize();

    this.createGeometry();
    this.createMedias();

    this.update();

    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
    });

    this.gl = this.renderer.gl;
    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 50;
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createMedias() {
    this.mediaElements = document.querySelectorAll(".imgFigure");
    this.medias = Array.from(this.mediaElements).map((element) => {
      let media = new Media({
        element,
        geometry: this.planeGeometry,
        height: this.galleryHeight,
        gl: this.gl,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
      });

      return media;
    });
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl);
  }

  createGallery() {
    this.gallery = document.querySelector(".gallery");
  }

  onWheel(event) {
    const normalized = NormalizeWheel(event);
    const speed = normalized.pixelY;

    this.scroll.target += speed * 0.5;
  }

  onResize() {
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = {
      width,
      height,
    };

    this.galleryBounds = this.gallery.getBoundingClientRect();
    this.galleryHeight =
      (this.viewport.height * this.galleryBounds.height * 2) /
      this.screen.height;

    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({
          height: this.galleryHeight,
          screen: this.screen,
          viewport: this.viewport,
        })
      );
    }
  }

  onTouchDown(event) {
    this.isDown = true;

    this.scroll.position = this.scroll.current;
    this.start = event.touches ? event.touches[0].clientY : event.clientY;
  }

  onTouchMove(event) {
    if (!this.isDown) return;

    const y = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = (this.start - y) * 2;

    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(event) {
    this.isDown = false;
  }

  update() {
    this.scroll.target += this.speed;
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    if (this.scroll.current > this.scroll.last) {
      this.direction = "down";
      this.speed = 1;
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = "up";
      this.speed = -1;
    }

    if (this.medias) {
      this.medias.forEach((media) =>
        media.update(this.scroll.current, this.direction)
      );
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.scroll.last = this.scroll.current;

    window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousewheel", this.onWheel.bind(this));
    window.addEventListener("wheel", this.onWheel.bind(this));

    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));
  }
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}
