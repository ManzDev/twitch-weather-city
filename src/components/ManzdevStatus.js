class ManzdevStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        position: absolute;
        bottom: 0;
        overflow: hidden;
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        align-items: flex-end;
        padding: 20px;
        padding-bottom: 0;
      }

      .container .text {
        position: relative;
      }

      .container h2 {
        font-family: "Bebas Neue";
        font-size: 32px;
        margin: 0;
        border-bottom: 2px solid red;
        margin-bottom: 15px;
      }

      .container p {
        font-family: EnterCommand;
        font-size: 30px;
        margin: 0;
        margin-bottom: 0.75em;
        line-height: 70%;
        letter-spacing: -0.5px;
        text-shadow: 0 0 2px #0004;
      }

      .container img {
        max-width: 160px;
        transform: translateY(15px) rotate(-5deg);
        filter: drop-shadow(0 0 5px #0008);
      }
    `;
  }

  connectedCallback() {
    this.image = this.getAttribute("image") || "manzdev.png";
    this.text = this.getAttribute("text") || "Default text.";
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzdevStatus.styles}</style>
    <div class="container">
      <img src="${this.image}" alt="Manz.dev">
      <div class="text">
        <h2>Manz.dev</h2>
        <p>${this.text}</p>
      </div>
    </div>`;
  }
}

customElements.define("manzdev-status", ManzdevStatus);
