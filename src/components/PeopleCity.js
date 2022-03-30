const SKINS = [
  "#dfa06d", "#fdddca", "#6d5d48", "#d18d4d", "#e4ad65"
];

const SHIRTS = [
  "darkred", "darkblue", "#86a007", "darkgreen", "tomato"
];

class PeopleCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 4px;
        --height: 10px;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background: linear-gradient(to bottom, var(--skin-color, #dfa06d) 0 4px, var(--shirt-color, darkred) 5px);

        transform: translateX(-4px);
        animation: move 3s linear 1 paused;
      }

      @keyframes move {
        to {
          transform: translateX(15px);
        }
      }

      :host(.to-left) .container {
        animation: move 3s linear 1 reverse paused;
      }

      :host(.move) .container {
        animation-play-state: running;
      }
    `;
  }

  connectedCallback() {
    this.render();

    const n = ~~(Math.random() * SKINS.length);
    this.style.setProperty("--skin-color", SKINS[n]);

    const s = ~~(Math.random() * SHIRTS.length);
    this.style.setProperty("--shirt-color", SHIRTS[s]);

    const d = ~~(Math.random() * 2);
    if (d === 0) {
      this.classList.add("to-left");
    }

    // const appears = ~~(Math.random() * 35);
    // if (appears === 0) { this.classList.add("move"); }
    this.setAppears();
  }

  setAppears() {
    const time = 5000 + ~~(Math.random() * 1000 * 200);
    setTimeout(() => this.classList.add("move"), time);
    setTimeout(() => this.classList.remove("move"), time + 4000);
    setTimeout(() => this.setAppears(), time + 8000);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PeopleCity.styles}</style>
    <div class="container"></div>`;
  }
}

customElements.define("people-city", PeopleCity);
