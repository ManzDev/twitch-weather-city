import "./BuildingCity.js";
import "./CloudCity.js";
import "./RainCity.js";
import "./RainbowCity.js";
import "./BatmanSignal.js";
import "./CowAbduction.js";
import "./StreetLight.js";

const sounds = {
  ambulance: new Audio("sounds/ambulance.mp3"),
  police: new Audio("sounds/police.mp3")
};

const DAY_MOMENT = [
  "dawn", "day", "sunset", "night"
];

const BUILDINGS_NUMBER = 6;
const TIME_TO_CHANGE_STAGE = 10000; // 10000;
const CLOUDS_NUMBER = 10;
const BATSIGNAL_PROBABILITY = 5;
const COWABDUCTION_PROBABILITY = 10;
const SIREN_PROBABILITY = 5;
const TIME_TO_RANDOM_EVENTS = 6000;

class WeatherCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentMoment = 1;
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        width: 100%;
        height: 75%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        background: var(--bgcolor);
        transition: background 1.5s;
        position: relative;
        overflow: hidden;
      }

      :host(.night),
      :host(.sunset) {
        --bgcolor: #0f0c20;
        --window-turnoff-color: #000;
        --window-color: #d3a50f;
        --shine-color: gold;
      }

      :host(.sunset) {
        --bgcolor: #af5328;
      }

      :host(.day),
      :host(.dawn) {
        --bgcolor: #1588b6;
        --window-turnoff-color: #1c1d1dff;
        --window-color: #d3a50f22;
        --shine-color: transparent;
      }

      :host(.dawn) {
        --bgcolor: #b962b5;
      }

      /* Moon & Sun */

      .sun,
      .moon {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: absolute;
        top: 30px;
        transition: transform 4s ease-in-out;
        z-index: 2;
      }

      .sun {
        --size: 80px;

        background: #e0a911;
        box-shadow: 0 0 25px 12px #e7af16;
        left: 30px;
      }

      .moon {
        --size: 50px;

        background: #fff;
        box-shadow: 0 0 10px #fff;
        right: 30px;
        background-image:
          radial-gradient(circle 25px at 25% 25%, #eee 0 25%, transparent 28%),
          radial-gradient(circle 30px at 75% 75%, #eee 0 30%, transparent 32%),
          radial-gradient(circle 15px at 45% 75%, #eaeaea 0 30%, transparent 32%);
      }

      :host(.night) .moon,
      :host(.sunset) .moon,
      :host(.day) .sun,
      :host(.dawn) .sun {
        transform: translate(0, 0);
      }

      :host(.day) .moon,
      :host(.dawn) .moon,
      :host(.night) .sun,
      :host(.sunset) .sun {
        transform: translate(0, 500px);
      }

      .clouds {
        width: 100%;
        height: 250px;
        position: absolute;
        top: 0;
        z-index: 5;
      }

      :host(.night) .clouds {
        --opacity-factor: 0.1;
      }

      :host(.sunset) .clouds {
        --opacity-factor: 0.25;
      }

      .sirens {
        width: 100%;
        height: 30px;
        position: absolute;
        z-index: 11;
      }

      .sirens .siren.police {
        --color-1: #f00a;
        --color-2: #00fa;
      }

      .sirens .siren.ambulance {
        --color-1: #ff4d00;
        --color-2: #ffb700;
      }

      .sirens .siren {
        width: 200px;
        height: 200%;
        background: linear-gradient(to right, transparent, var(--color-1), var(--color-2), transparent);
        background-repeat: no-repeat;
        animation:
          siren-spin 1s steps(1, end) infinite,
          move-siren 5s 1 linear forwards;
        -webkit-mask-image: linear-gradient(to bottom, transparent 10%, black, transparent 90%);
      }

      .sirens .siren.reverse {
        animation:
          siren-spin 1s steps(1, end) infinite,
          move-siren 5s 1 linear forwards reverse;
      }

      @keyframes siren-spin {
        0%, 100% { transform: rotateY(25deg); }
        50% { transform: rotateY(150deg); }
      }

      @keyframes move-siren {
        0% { translate: -300px 0; }
        100% { translate: 550px 0; }
      }

      .street {
        width: 100%;
        height: 60px;
        position: absolute;
        z-index: 10;

        display: flex;
        justify-content: space-evenly;
      }

      .buildings {
        width: 100%;
        height: 75%;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        position: relative;
        z-index: 10;
      }
    `;
  }

  connectedCallback() {
    this.render();
    setInterval(() => this.changeStage(), TIME_TO_CHANGE_STAGE);
    setInterval(() => this.enableRandomEvents(), TIME_TO_RANDOM_EVENTS);

    this.addEventListener("STOP_RAIN", () => this.currentMoment < 2 && this.showRainbow());
  }

  enableRandomEvents() {
    const batProbability = Math.floor(Math.random() * BATSIGNAL_PROBABILITY);
    batProbability && this.currentMoment === 3 && this.showBatmanSignal();

    const cowProbability = Math.floor(Math.random() * COWABDUCTION_PROBABILITY);
    cowProbability === 0 && this.showCowAbduction();

    const sirenProbability = Math.floor(Math.random() * SIREN_PROBABILITY);
    sirenProbability === 0 && this.enableSiren();
  }

  generateBuildings() {
    return "<building-city></building-city>".repeat(BUILDINGS_NUMBER);
  }

  generateStreetLight() {
    const number = 2 + Math.floor(Math.random() * 3);
    return "<street-light></street-light>".repeat(number);
  }

  generateClouds() {
    return "<cloud-city></cloud-city>".repeat(CLOUDS_NUMBER);
  }

  showRainbow() {
    const rainbowCity = document.createElement("rainbow-city");
    this.shadowRoot.querySelector(".clouds").appendChild(rainbowCity);
  }

  showBatmanSignal() {
    const batmanSignal = document.createElement("batman-signal");
    const clouds = this.shadowRoot.querySelector(".clouds");
    clouds.insertAdjacentElement("afterend", batmanSignal);
  }

  showCowAbduction() {
    const cowAbduction = document.createElement("cow-abduction");
    const sun = this.shadowRoot.querySelector(".sun");
    sun.insertAdjacentElement("beforebegin", cowAbduction);
  }

  enableSiren() {
    const sirens = this.shadowRoot.querySelector(".sirens");
    const isSirenEnabled = sirens.querySelector(".siren");

    if (isSirenEnabled) return;

    const siren = document.createElement("div");
    const n = Math.floor(Math.random() * 2);
    const i = Math.floor(Math.random() * 2);
    const type = ["ambulance", "police"][n];
    siren.classList.add("siren", type);
    i === 0 && siren.classList.add("reverse");
    sirens.appendChild(siren);

    sounds[type].currentTime = 0;
    sounds[type].play();
    setTimeout(() => this.disableSiren(), 6000);
  }

  disableSiren() {
    const siren = this.shadowRoot.querySelector(".sirens .siren");
    siren && siren.remove();
  }

  changeStage() {
    this.classList.remove(DAY_MOMENT[this.currentMoment]);
    this.currentMoment = (this.currentMoment + 1) % DAY_MOMENT.length;
    this.classList.add(DAY_MOMENT[this.currentMoment]);

    const event = new CustomEvent("DAY_MOMENT_CHANGE", {
      detail: DAY_MOMENT[this.currentMoment],
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${WeatherCity.styles}</style>
    <div class="container">
      <rain-city></rain-city>
      <div class="sun"></div>
      <div class="moon"></div>
      <div class="clouds">
        ${this.generateClouds()}
      </div>
      <div class="buildings">
        ${this.generateBuildings()}
      </div>
      <div class="sirens">
      </div>
      <div class="street">
        ${this.generateStreetLight()}
      </div>
    </div>`;
  }
}

customElements.define("weather-city", WeatherCity);
