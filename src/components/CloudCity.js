class CloudCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.x = Math.floor(Math.random() * 600);
    this.setY();
  }

  static get styles() {
    return /* css */`
      :host {
        display: inline-block;
        width: var(--width);
        height: var(--height);
        border-radius: 50px;
        opacity: var(--opacity);
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        filter: blur(0.75px);
        transform: translate(var(--x, -200px), var(--y));
      }

      :host::before {
        content: "";
        display: inline-block;
        width: 40%;
        height: 50%;
        background: #fff;
        border-radius: 50px;
        position: absolute;
        transform: translate(50%, -50%);

      }

      :host::after {
        content: "";
        display: inline-block;
        width: 40%;
        height: 70%;
        background: #fff;
        border-radius: 50px;
        transform: translate(10%, -50%);
        position: absolute;
        top: 0;
        right: 25px;
      }
    `;
  }

  setY() {
    this.y = Math.floor(Math.random() * 300);
  }

  move() {
    setInterval(() => {
      const isOutside = this.x > 500;
      this.x += 1;

      if (isOutside) {
        this.x = -200;
        this.setY();
      }

      this.style.setProperty("--x", `${this.x}px`);
    }, 30);
  }

  connectedCallback() {
    this.render();
    this.move();

    const width = Math.floor(Math.random() * 50) + 100;
    this.style.setProperty("--width", `${width}px`);
    const height = Math.floor(Math.random() * 50) + 25;
    this.style.setProperty("--height", `${height}px`);

    this.style.setProperty("--y", `${this.y}px`);

    const opacity = (Math.floor(Math.random() * 5) / 10) + 0.5;
    this.style.setProperty("--opacity", opacity);

    const cloudSpeed = 20 + Math.floor(Math.random() * 20);
    this.style.setProperty("--cloud-speed", `${cloudSpeed}s`);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CloudCity.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("cloud-city", CloudCity);
