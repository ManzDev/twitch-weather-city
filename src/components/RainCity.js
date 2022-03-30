import { Howl } from "howler";

const RAIN_DROPS_NUMBER = 1000;
const ANGLE = -65 * (Math.PI / 180);
const RAIN_PROBABILITY = 1000;

const rain = new Howl({
  src: ["sounds/rain-sound.mp3"],
  loop: true,
});

class RainCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.rainEnabled = false;
  }

  static get styles() {
    return /* css */`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 20;
      }

      canvas {
        width: 100%;
        height: 100%;
        transform: scaleX(-1);
        filter: blur(0.25px);
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.canvas = this.shadowRoot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = parseInt(window.getComputedStyle(this).width) * 2;
    this.canvas.height = parseInt(window.getComputedStyle(this).height) * 2;

    const time = 10000 + Math.floor(Math.random() * 6000);
    setTimeout(() => this.toggle(), time);
  }

  toggle() {
    !this.rainEnabled && this.init();
    this.rainEnabled = !this.rainEnabled;
    if (!this.rainEnabled) {
      this.stopSound();
      const event = new CustomEvent("STOP_RAIN", { bubbles: true, composed: true });
      this.dispatchEvent(event);
    }
  }

  playSound() {
    setTimeout(() => {
      rain.play();
      rain.fade(0, 1, 2000);
    }, 3000);
  }

  stopSound() {
    rain.fade(1, 0, 3000);
    setTimeout(() => rain.stop(), 3000);
  }

  init() {
    this.playSound();
    const event = new CustomEvent("START_RAIN", { bubbles: true, composed: true });
    this.dispatchEvent(event);

    this.drops = [];
    for (let i = 0; i < RAIN_DROPS_NUMBER; i++) {
      const speed = Math.floor(Math.random() * 15) + 15;
      this.drops.push({
        x: Math.floor(Math.random() * this.canvas.width) + this.canvas.width,
        y: Math.floor(Math.random() * this.canvas.height) - this.canvas.height,
        size: Math.floor(Math.random() * 15) + 7,
        speed,
        color: `rgba(255, 255, 255, ${speed / 20})`,
      });
    }

    clearInterval(this.timer);
    this.timer = setInterval(() => this.loop(), 50);
  }

  update() {
    this.drops.forEach(drop => {
      drop.x -= drop.speed * Math.cos(ANGLE);
      drop.y -= drop.speed * Math.sin(ANGLE);

      const isXOutside = drop.x < 0;
      const isYOutside = drop.y > this.canvas.height && this.rainEnabled;

      if (isXOutside) {
        drop.x = this.canvas.width;
      }
      if (isYOutside) {
        drop.y = 0;
        drop.x = Math.floor(Math.random() * this.canvas.width);
      }
    });
  }

  loop() {
    this.update();
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drops.forEach(drop => {
      this.ctx.strokeStyle = drop.color;
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      const x2 = drop.x + (drop.size * Math.cos(ANGLE));
      const y2 = drop.y + (drop.size * Math.sin(ANGLE));
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    });

    const rainProbability = Math.floor(Math.random() * RAIN_PROBABILITY);
    if (rainProbability === 0) {
      this.toggle();
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${RainCity.styles}</style>
    <canvas></canvas>
    `;
  }
}

customElements.define("rain-city", RainCity);
