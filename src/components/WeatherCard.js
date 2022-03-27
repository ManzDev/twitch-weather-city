import "./WeatherCity.js";

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
      }

      .zone {
        position: absolute;
        bottom: 0;
        overflow: hidden;
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        align-items: flex-end;
        padding: 20px;
        padding-bottom: 0;
      }

      .zone .text {
        position: relative;
      }

      .zone h2 {
        font-family: "Bebas Neue";
        font-size: 32px;
        margin: 0;
        border-bottom: 2px solid red;
        margin-bottom: 15px;
      }

      .zone p {
        font-family: EnterCommand;
        font-size: 30px;
        margin: 0;
        margin-bottom: 0.75em;
        line-height: 70%;
        letter-spacing: -0.5px;
        text-shadow: 0 0 2px #0004;
      }

      .zone img {
        max-width: 160px;
        transform: translateY(15px) rotate(-5deg);
        filter: drop-shadow(0 0 5px #0008);
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
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${WeatherCard.styles}</style>
    <div class="container">
      <weather-city class="day"></weather-city>
      <div class="zone">
        <img src="manzdev.png" alt="Manz.dev">
        <div class="text">
          <h2>Manz.dev</h2>
          <p>En cuanto deje de llover, cierro stream. Seguro que no se alarga.</p>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("weather-card", WeatherCard);
