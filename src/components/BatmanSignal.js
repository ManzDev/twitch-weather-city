import "./BatmaxiLogo.js";

class BatmanSignal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 300px;
        position: absolute;
        top: 0;
        transition: opacity 1s;
        animation: appears 5.5s ease 1 forwards;
      }

      @keyframes appears {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
      }

      .signal {
        width: 125px;
        height: 100%;

        display: grid;
        justify-items: center;
        opacity: 0.4;
      }

      .logo {
        width: 75px;
        height: 75px;
        background: #fff;
        border-radius: 50%;
        transform: translateY(15px);
        position: relative;
        z-index: 2;
      }

      .batmanz.logo {
        background-image: url(batmanz.png);
        background-size: calc(18px * 4);
        image-rendering: pixelated;
        background-position: 5px 10px;
        background-repeat: no-repeat;
        background-blend-mode: luminosity;
      }

      .batman-trail {
        width: 75px;
        height: 300px;
        background: #fff;
        opacity: 0.5;
        transform: translateY(-25px);
        clip-path: polygon(0 0, 100% 0, 55% 100%, 45% 100%);
      }
    `;
  }

  connectedCallback() {
    this.render();

    const r = Math.floor(Math.random() * 2);

    if (r === 0) {
      this.shadowRoot.querySelector(".logo").classList.add("batmanz");
    } else {
      const batmaxiLogo = document.createElement("batmaxi-logo");
      this.shadowRoot.querySelector(".logo").appendChild(batmaxiLogo);
    }

    setTimeout(() => this.destroy(), 6000);
  }

  destroy() {
    this.remove();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BatmanSignal.styles}</style>
    <div class="signal">
      <div class="logo">
      </div>
      <div class="batman-trail"></div>
    </div>`;
  }
}

customElements.define("batman-signal", BatmanSignal);
