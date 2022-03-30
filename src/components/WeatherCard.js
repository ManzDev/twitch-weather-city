import "./WeatherCity.js";
import "./ManzdevStatus.js";

const OPTIONS = [
  {
    image: "manzdev.png",
    description: ""
  },
  {
    image: "manz-streamer.png",
    description: ""
  },
  {
    image: "rainmanz.png",
    description: ""
  }
];

class WeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentManz = 0;
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 450px;
        --height: 650px;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background: #fff;
        box-shadow: 0 0 25px 5px #0008;
        position: relative;
        overflow: hidden;
      }

      manzdev-status {
        transform: translateY(165px);
        transition: transform 1s;
        display: flex;

      }

      .hide {
        transform: translateY(340px);
      }
    `;
  }

  toggle() {
    this.currentManz = (this.currentManz + 1) % OPTIONS.length;
    this.querySelector(".zone img").src = OPTIONS[this.currentManz].image;
    this.querySelector(".zone .text p").textContent = OPTIONS[this.currentManz].description;
  }

  connectedCallback() {
    this.render();

    this.addEventListener("START_RAIN", () => this.onStartRain());
    this.addEventListener("STOP_RAIN", () => this.onStopRain());
    this.onStopRain();
  }

  onStartRain() {
    this.shadowRoot.querySelector(".rain").classList.remove("hide");
    this.shadowRoot.querySelector(".normal").classList.add("hide");
  }

  onStopRain() {
    this.shadowRoot.querySelector(".rain").classList.add("hide");
    this.shadowRoot.querySelector(".normal").classList.remove("hide");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${WeatherCard.styles}</style>
    <div class="container">
      <weather-city class="day"></weather-city>
      <manzdev-status class="normal" image="manzdev.png" text="¡Qué buen día se ha quedado! Prepararé mis cosas para dar un paseo..."></manzdev-status>
      <manzdev-status class="rain hide" image="rainmanz.png" text="Bueno, mejor sigo en stream un rato hasta que pare de llover..."></manzdev-status>
    </div>`;
  }
}

customElements.define("weather-card", WeatherCard);
