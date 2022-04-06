import "./SphericCow.js";

class CowAbduction extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --light-color: #fffb00b2;

        display: flex;
        justify-content: center;
        width: 100%;
        height: 300px;
        position: absolute;
        z-index: 3;
        top: 0;
        transform: translateX(var(--x));
        animation: disappear 1s linear 1 8s forwards;
      }

      .signal {
        width: 80px;
        height: 100%;
        background: var(--light-color);
        box-shadow: 0 0 15px var(--light-color);
        z-index: 5;
      }

      spheric-cow {
        display: inline-block;
        animation: up 8s linear 1 forwards;
      }

      @keyframes up {
        from {
          transform: translate(0, 250px);
        }

        to {
          transform: translate(0, -175px);
        }
      }

      @keyframes disappear {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
  }

  connectedCallback() {
    this.setX();
    this.render();
    setTimeout(() => this.destroy(), 9000);
  }

  setX() {
    const x = -60 + Math.random() * 350;
    this.style.setProperty("--x", `${x}px`);
  }

  destroy() {
    this.remove();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CowAbduction.styles}</style>
    <div class="signal"></div>
    <spheric-cow></spheric-cow>
    `;
  }
}

customElements.define("cow-abduction", CowAbduction);
