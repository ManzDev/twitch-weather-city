class RainbowCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        --size: 15px;

        width: 100%;
        height: 400px;
        border-radius: 50%;
        transform: translate(calc(var(--offset, 1) * 50%), 20%);
        opacity: 0;
        filter: blur(1px);

        transition: opacity 1s;
        z-index: 0;

        box-shadow:
          inset 0 0 0 calc(var(--size) * 1) #ea3237,
          inset 0 0 0 calc(var(--size) * 2) #f48533,
          inset 0 0 0 calc(var(--size) * 3) #fff112,
          inset 0 0 0 calc(var(--size) * 4) #00a85a,
          inset 0 0 0 calc(var(--size) * 5) #00afeb,
          inset 0 0 0 calc(var(--size) * 6) #3e3f95,
          inset 0 0 0 calc(var(--size) * 7) #805aa3;
      }

      :host(.visible) .container {
        opacity: 0.5;
      }
    `;
  }

  connectedCallback() {
    this.render();

    this.style.setProperty("--offset", (~~(Math.random() * 2) === 0) ? 1 : -1);
    setTimeout(() => this.classList.add("visible"), 1000);
    setTimeout(() => this.destroy(), 4000);
  }

  destroy() {
    this.classList.remove("visible");
    setTimeout(() => this.remove(), 3000);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${RainbowCity.styles}</style>
    <div class="container"></div>`;
  }
}

customElements.define("rainbow-city", RainbowCity);
