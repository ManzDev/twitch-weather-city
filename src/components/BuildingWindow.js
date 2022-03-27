class BuildingWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        background: var(--window-turnoff-color);
        transition:
          background 0.5s,
          box-shadow 1s;
      }

      :host(.on) {
        background: var(--window-color);
        box-shadow: 0 0 10px var(--shine-color);
      }
    `;
  }

  connectedCallback() {
    this.render();

    this.setEvent();
  }

  turnOn() {
    this.classList.add("on");
  }

  turnOff() {
    this.classList.remove("off");
  }

  toggle() {
    this.classList.toggle("on");
    this.setEvent();
  }

  setEvent() {
    const ocurrs = Math.floor(Math.random() * 35);
    if (ocurrs !== 0) return;

    const time = 2000 + Math.floor(Math.random() * 10000);
    setTimeout(() => this.toggle(), time);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BuildingWindow.styles}</style>
    `;
  }
}

customElements.define("building-window", BuildingWindow);
