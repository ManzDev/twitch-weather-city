class BatmaxiLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        --size: 75px;
        height: var(--size);
        width: var(--size);
        border-radius: 50%;
        background: #fff6;
        display: grid;
        place-items: center;
      }

      .bat {
        --bat-color: #222;
        --bat-size: calc(.9 * var(--size));
        height: var(--bat-size);
        width: var(--bat-size);
        border-radius: 50%;
        position: relative;
        background: linear-gradient(transparent 40%, var(--bat-color) 40% 60%, transparent 60%);
        box-shadow: inset calc(.3 * var(--bat-size)) 0 0 calc(-.15 * var(--bat-size)) var(--bat-color), inset calc(-.3 * var(--bat-size)) 0 0 calc(-.15 * var(--bat-size)) var(--bat-color);
      }

      .bat::after {
        content: "";
        width: 20%;
        height: 40%;
        background: var(--bat-color);
        position: absolute;
        -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
                clip-path: polygon(0 0, 50% 100%, 100% 0);
        top: 52%;
        left: 50%;
        transform: translatex(-50%);
      }

      .bat .top {
        --head-size: calc(.15* var(--bat-size));
        height: var(--head-size);
        width: var(--head-size);
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 12%;
        transform: translatex(-50%);
        box-shadow: 0 calc(0.2 * var(--head-size)) var(--bat-color), 0 calc(0.3 * var(--head-size)) var(--bat-color), 0 calc(0.4 * var(--head-size)) var(--bat-color), 0 calc(0.5 * var(--head-size)) var(--bat-color), 0 calc(0.6 * var(--head-size)) var(--bat-color), 0 calc(0.7 * var(--head-size)) var(--bat-color), 0 calc(0.8 * var(--head-size)) var(--bat-color), 0 calc(0.9 * var(--head-size)) var(--bat-color), 0 calc(1 * var(--head-size)) var(--bat-color), 0 calc(1.1 * var(--head-size)) var(--bat-color), 0 calc(1.2 * var(--head-size)) var(--bat-color), 0 calc(1.3 * var(--head-size)) var(--bat-color);
      }

      .bat .top::after, .bat .top::before {
        content: "";
        width: 200%;
        height: 200%;
        position: absolute;
        border-radius: 50%;
        top: -18%;
        right: 40%;
        box-shadow: calc(-.5 * var(--head-size)) calc(.7 * var(--head-size)) var(--bat-color);
      }

      .bat .top::after {
        left: 40%;
        box-shadow: calc(.5 * var(--head-size)) calc(.6 * var(--head-size)) var(--bat-color);
      }

      .bat .bottom {
        height: calc(.35* var(--bat-size));
        width: calc(.3 * var(--bat-size));
        border-radius: 50%;
        position: absolute;
        right: 22%;
        bottom: 5%;
        box-shadow: calc(.17* var(--bat-size)) calc(-.15* var(--bat-size)) var(--bat-color);
      }

      .bat .bottom:nth-child(2) {
        left: 22%;
        box-shadow: calc(-.17* var(--bat-size)) calc(-.15* var(--bat-size)) var(--bat-color);
      }

      .bat .bottom::after {
        content: "";
        width: 20%;
        height: 40%;
        background: var(--bat-color);
        position: absolute;
        -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
                clip-path: polygon(0 0, 50% 100%, 100% 0);
        top: -5%;
        left: 50%;
        transform: translatex(-50%);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BatmaxiLogo.styles}</style>
    <div class="container">
      <div class="bat">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="bottom"></div>
      </div>
    </div>`;
  }
}

customElements.define("batmaxi-logo", BatmaxiLogo);
