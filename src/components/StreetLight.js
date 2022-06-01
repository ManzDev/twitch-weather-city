class StreetLight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      }

      :host(.on) .light {
        background: linear-gradient(to bottom, #ffd70099, #ffd70011);
        width: 100%;
        height: 100%;
        position: absolute;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        z-index: 1;
        opacity: 1;
      }

      .stick {
        width: 6px;
        height: 100%;
        background: black;
        position: relative;
      }

      .light-ball {
        background: #aaa;
        width: 20px;
        height: 12px;
        border-radius: 25% 25% 50% 50%;
        position: absolute;
        z-index: 3;
        border-top: 8px solid #000;
      }

      .light {
        transition: var(--time, 1.5s) opacity;
        opacity: 0;
      }

      :host(.on) .light-ball {
        background: #fbffad;
      }

      :host(.on.blink) .light {
        animation: blink 2s infinite alternate;
      }

      @keyframes blink {
        0%, 24% { opacity: 1; }
        25% { opacity: 0.75; }
        27%, 36% { opacity: 1; }
        38% { opacity: 0.6; }
        39%, 49% { opacity: 1; }
        50% { opacity: 0.75; }
        55%, 64% { opacity: 1; }
        66% { opacity: 0.3; }
        69%, 75% { opacity: 1; }
        75% { opacity: 0.75; }
        76%, 100% { opacity: 1; }
      }
    `;
  }

  turnOn() {
    const time = 0.25 + (Math.floor((Math.random() * 3) * 100) / 100);
    this.style.setProperty("--time", `${time}s`);
    this.classList.add("on");
  }

  turnOff() {
    this.classList.remove("on");
  }

  handleMoment(moment) {
    const isSunset = moment === "sunset";
    const isDawn = moment === "dawn";

    isSunset && this.turnOn();
    isDawn && this.turnOff();
  }

  blink() {
    const isTurnOn = this.classList.contains("on");
    const time = 2500 + Math.floor(Math.random() * 5000);

    isTurnOn && this.classList.toggle("blink");
    setTimeout(() => this.blink(), time);
  }

  connectedCallback() {
    this.render();
    setTimeout(() => this.blink(), 3500);
    addEventListener("DAY_MOMENT_CHANGE", (ev) => this.handleMoment(ev.detail));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${StreetLight.styles}</style>
    <div class="container">
      <div class="light"></div>
      <div class="light-ball"></div>
      <div class="stick"></div>
    </div>`;
  }
}

customElements.define("street-light", StreetLight);
