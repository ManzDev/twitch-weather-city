class SphericCow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
    :host {
    }

    .cow-container {
      width: 225px;
      height: 250px;
      transform: scale(0.25) translateX(-615px);
    }

    .ovni.on .cow-abducted {
        animation: abducted-cow 5s linear 10s 1 forwards;
    }

    .cow {
        z-index: -2;
        width: 225px;
        height: 250px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        position: absolute;
        animation: spin-cow 2s ease-in-out 2 alternate, spin-cow-full 2.5s ease-in-out 4s infinite alternate;
    }

    .cow .cow-head-container {
        filter: drop-shadow(0 0 5px #0008);
        width: 125px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: -30px;
        animation: spin-cow-face 2.5s ease-in-out infinite alternate;
    }

    .cow .cow-head-container .ears {
        width: 125px;
        height: 40px;
        display: flex;
        justify-content: space-between;
    }

    .cow .cow-head-container .cow-ear {
        --x: 5px;
        width: 38px;
        height: 24px;
        background: #FBABA9;
        border: 6px solid #fff;
        border-radius: 50% 30% / 80% 20%;
        transform: rotate(15deg) translateX(var(--x)) translateY(45px);
        z-index: -1;
    }

    .cow .cow-head-container .cow-ear.right {
        --x: 20px;
        border-color: #111;
    }

    .cow .cow-head {
        width: 100px;
        height: 80px;
        background: #fff;
        border-radius: 50% 50% 0 0;
    }

    .cow .cow-head .horns {
        position: relative;
    }

    .cow .cow-head .cow-horn {
        width: 20px;
        height: 40px;
        border-radius: 20%;
        background: gold;
        transform: rotate(10deg) translate(10px, -1px);
        position: absolute;
        z-index: -1;
    }

    .cow .cow-head .cow-horn.right {
        transform: rotate(-10deg) translate(-10px, -1px);
        position: absolute;
        right: 0;
    }

    .cow .cow-head .eyes {
        width: 80%;
        margin: auto;
        height: 40px;
        transform: translate(0, 30px);
        display: flex;
        justify-content: space-around;
    }

    .cow .cow-head .eyes .eye {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #111;
    }

    .cow .mouth {
        width: 115px;
        height: 50px;
        border-radius: 30px;
        background: #FBABA9;
        transform: translate(0, -15px);
    }

    .cow .body {
        background: #fff;
        background-image: radial-gradient(ellipse at 0 25%, #000 30%, transparent 31%), radial-gradient(circle at 50% 0%, #000 20%, transparent 21%), radial-gradient(circle at 80% 75%, #000 0% 19%, transparent 20%), radial-gradient(ellipse at 20% 100%, #000 0% 24%, transparent 25%), radial-gradient(circle at 60% 70%, #000 0% 14%, transparent 15%), radial-gradient(circle at 100% 20%, #000 0% 14%, transparent 15%);
        width: 175px;
        height: 175px;
        border: 5px solid #fff;
        align-self: center;
        border-radius: 50%;
        position: relative;
        left: -25px;
        z-index: -2;
    }

    @keyframes spin-cow-face {
        0% {
            transform: rotate(120deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @keyframes spin-cow {
        0% {
            transform: rotate(240deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes spin-cow-full {
        0% {
            transform: rotate(240deg);
        }
        100% {
            transform: rotate(480deg);
        }
    }

    @keyframes move-cow {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(200px);
        }
    }

    @keyframes abducted-cow {
        0% {
            transform: translate(0, 0px) scale(1);
        }
        100% {
            transform: translate(0, -120px) scale(0.7);
        }
    }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SphericCow.styles}</style>
    <div class="cow-container">
      <div class="cow">
        <div class="cow-head-container">
          <div class="ears">
            <div class="cow-ear left"></div>
            <div class="cow-ear right"></div>
          </div>
          <div class="cow-head">
            <div class="horns">
              <div class="cow-horn left"></div>
              <div class="cow-horn right"></div>
            </div>
            <div class="eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
          </div>
          <div class="mouth"></div>
        </div>
        <div class="body"></div>
      </div>
    </div>`;
  }
}

customElements.define("spheric-cow", SphericCow);
