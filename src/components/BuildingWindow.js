import "./PeopleCity.js";

const TIME_TO_TOGGLE_WINDOW = 8000;

const WINDOW_PROBABILITIES = {
  dawn: 60,
  day: 75,
  sunset: 50,
  night: 5
};

class BuildingWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.probability = 100;
  }

  static get styles() {
    return /* css */`
      :host {
        display: flex;
        align-items: flex-end;

        background: var(--window-turnoff-color);
        transition:
          background 0.5s,
          box-shadow 1s;
        overflow: hidden;
      }

      :host(.on) {
        background: var(--window-color);
        box-shadow: 0 0 10px var(--shine-color);
      }

      :host(:not(.on)) people-city {
        opacity: 0.25;
      }
    `;
  }

  connectedCallback() {
    this.render();

    document.addEventListener("DAY_MOMENT_CHANGE", (ev) => this.onDayMomentChange(ev.detail));
  }

  onDayMomentChange(moment) {
    this.probability = WINDOW_PROBABILITIES[moment];

    if (moment === "dawn") {
      const time = 1000 + Math.floor(Math.random() * 750);
      setTimeout(() => this.classList.contains("on") && this.toggle(), time);
    }

    this.setEvent();
  }

  toggle() {
    this.classList.toggle("on");
    this.setEvent();
  }

  setEvent() {
    const ocurrs = Math.floor(Math.random() * this.probability);
    if (ocurrs !== 0) return;

    const time = 2000 + Math.floor(Math.random() * TIME_TO_TOGGLE_WINDOW);
    setTimeout(() => this.toggle(), time);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BuildingWindow.styles}</style>
    <people-city></people-city>
    `;
  }
}

customElements.define("building-window", BuildingWindow);
