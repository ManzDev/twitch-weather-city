import{h as f}from"./vendor.de3d24ee.js";const m=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}};m();class h extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.setEvent()}turnOn(){this.classList.add("on")}turnOff(){this.classList.remove("off")}toggle(){this.classList.toggle("on"),this.setEvent()}setEvent(){if(Math.floor(Math.random()*35)!==0)return;const e=2e3+Math.floor(Math.random()*1e4);setTimeout(()=>this.toggle(),e)}render(){this.shadowRoot.innerHTML=`
    <style>${h.styles}</style>
    `}}customElements.define("building-window",h);const y=40,g=["#333333","#3a3a3a","#444444","#4a4a4a"];class d extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --building-width: 100%;

        display: grid;
        grid-template-columns: repeat(2, 15px);
        grid-template-rows: repeat(auto-fill, 15px);
        justify-content: center;
        padding-top: 20px;
        gap: 15px;

        width: var(--building-width);
        height: var(--building-height);
        background: var(--building-color, #444);

        box-shadow: 0 0 5px #0006 inset;
      }
    `}init(){const t=Math.floor(Math.random()*25)+50,e=Math.floor(Math.random()*50)+50,o=Math.floor(Math.random()*g.length);this.style.setProperty("--building-width",`${t}%`),this.style.setProperty("--building-height",`${e}%`),this.style.setProperty("--building-color",`${g[o]}`)}get height(){return parseInt(this.style.getPropertyValue("height"))}connectedCallback(){this.init(),this.render()}generateWindows(){let t="";for(let e=0;e<y;e++)t+=`
      <building-window></building-window>`;return t}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    ${this.generateWindows()}
    `}}customElements.define("building-city",d);class l extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.x=Math.floor(Math.random()*600),this.setY()}static get styles(){return`
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
    `}setY(){this.y=Math.floor(Math.random()*300)}move(){setInterval(()=>{const t=this.x>500;this.x+=1,t&&(this.x=-200,this.setY()),this.style.setProperty("--x",`${this.x}px`)},30)}connectedCallback(){this.render(),this.move();const t=Math.floor(Math.random()*50)+100;this.style.setProperty("--width",`${t}px`);const e=Math.floor(Math.random()*50)+25;this.style.setProperty("--height",`${e}px`),this.style.setProperty("--y",`${this.y}px`);const o=Math.floor(Math.random()*5)/10+.5;this.style.setProperty("--opacity",o);const s=20+Math.floor(Math.random()*20);this.style.setProperty("--cloud-speed",`${s}s`)}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="container">
    </div>`}}customElements.define("cloud-city",l);const x=1e3,n=-65*(Math.PI/180),w=new f.Howl({src:["sounds/rain-sound.mp3"],loop:!0});class c extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.rainEnabled=!0}static get styles(){return`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 20;
      }

      canvas {
        width: 100%;
        height: 100%;
        transform: scaleX(-1);
        filter: blur(0.25px);
      }
    `}connectedCallback(){this.render(),this.canvas=this.shadowRoot.querySelector("canvas"),this.init()}init(){this.ctx=this.canvas.getContext("2d"),this.canvas.width=parseInt(window.getComputedStyle(this).width)*2,this.canvas.height=parseInt(window.getComputedStyle(this).height)*2,w.play(),this.drops=[];for(let t=0;t<x;t++){const e=Math.floor(Math.random()*15)+15;this.drops.push({x:Math.floor(Math.random()*this.canvas.width),y:Math.floor(Math.random()*this.canvas.height),size:Math.floor(Math.random()*15)+7,speed:e,color:`rgba(255, 255, 255, ${e/20})`})}setInterval(()=>this.loop(),50)}update(){this.drops.forEach(t=>{t.x-=t.speed*Math.cos(n),t.y-=t.speed*Math.sin(n);const e=t.x<0,o=t.y>this.canvas.height;e&&(t.x=this.canvas.width),o&&(t.y=0,t.x=Math.floor(Math.random()*this.canvas.width))})}loop(){this.update(),this.ctx.lineWidth=1,this.ctx.lineCap="round",this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drops.forEach(t=>{this.ctx.strokeStyle=this.rainEnabled?t.color:"transparent",this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y);const e=t.x+t.size*Math.cos(n),o=t.y+t.size*Math.sin(n);this.ctx.lineTo(e,o),this.ctx.stroke()})}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
    <canvas></canvas>
    `}}customElements.define("rain-city",c);const b=6,v=1e4,M=10;class u extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
      }

      .container {
        width: 100%;
        height: 75%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        transition: background 1.5s;
        position: relative;
        overflow: hidden;
      }

      :host(.night) .container {
        background: #0f0c20;
      }

      :host(.day) .container {
        background: #1588b6;
      }

      :host(.night) {
        --window-turnoff-color: #000;
        --window-color: #d3a50f;
        --shine-color: gold;
      }

      :host(.day) {
        --window-turnoff-color: #1c1d1dff;
        --window-color: #d3a50f22;
        --shine-color: transparent;
      }

      .sun,
      .moon {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: absolute;
        top: 30px;
        transition: transform 4s ease-in-out;
        z-index: 2;
      }

      .sun {
        --size: 80px;

        background: #e0a911;
        box-shadow: 0 0 25px 12px #e7af16;
        left: 30px;
      }

      .moon {
        --size: 50px;

        background: #fff;
        box-shadow: 0 0 10px #fff;
        right: 30px;
        background-image:
          radial-gradient(circle 25px at 25% 25%, #eee 0 25%, transparent 28%),
          radial-gradient(circle 30px at 75% 75%, #eee 0 30%, transparent 32%),
          radial-gradient(circle 15px at 45% 75%, #eaeaea 0 30%, transparent 32%);
      }

      :host(.night) .moon,
      :host(.day) .sun {
        transform: translate(0, 0);
      }

      :host(.day) .moon,
      :host(.night) .sun {
        transform: translate(0, 500px);
      }

      .clouds {
        width: 100%;
        height: 250px;
        position: absolute;
        top: 0;
        z-index: 5;
      }

      .buildings {
        width: 100%;
        height: 75%;

        display: flex;
        align-items: flex-end;

        position: relative;
        z-index: 10;
      }
    `}connectedCallback(){this.render(),setInterval(()=>this.changeStage(),v)}generateBuildings(){return"<building-city></building-city>".repeat(b)}generateClouds(){return"<cloud-city></cloud-city>".repeat(M)}changeStage(){this.classList.toggle("night"),this.classList.toggle("day")}render(){this.shadowRoot.innerHTML=`
    <style>${u.styles}</style>
    <div class="container">
      <rain-city></rain-city>
      <div class="sun"></div>
      <div class="moon"></div>
      <div class="clouds">
        ${this.generateClouds()}
      </div>
      <div class="buildings">
        ${this.generateBuildings()}
      </div>
    </div>`}}customElements.define("weather-city",u);const r=[{image:"manzdev.png",description:""},{image:"manz-streamer.png",description:""},{image:"rainmanz.png",description:""}];class p extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.currentManz=0}static get styles(){return`
      :host {
        --width: 450px;
        --height: 650px;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background: #fff;
        box-shadow: 0 0 25px 5px #0008;
        position: relative;
      }

      .zone {
        position: absolute;
        bottom: 0;
        overflow: hidden;
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        align-items: flex-end;
        padding: 20px;
        padding-bottom: 0;
      }

      .zone .text {
        position: relative;
      }

      .zone h2 {
        font-family: "Bebas Neue";
        font-size: 32px;
        margin: 0;
        border-bottom: 2px solid red;
        margin-bottom: 15px;
      }

      .zone p {
        font-family: EnterCommand;
        font-size: 30px;
        margin: 0;
        margin-bottom: 0.75em;
        line-height: 70%;
        letter-spacing: -0.5px;
        text-shadow: 0 0 2px #0004;
      }

      .zone img {
        max-width: 160px;
        transform: translateY(15px) rotate(-5deg);
        filter: drop-shadow(0 0 5px #0008);
      }
    `}toggle(){this.currentManz=(this.currentManz+1)%r.length,this.querySelector(".zone img").src=r[this.currentManz].image,this.querySelector(".zone .text p").textContent=r[this.currentManz].description}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">
      <weather-city class="day"></weather-city>
      <div class="zone">
        <img src="manzdev.png" alt="Manz.dev">
        <div class="text">
          <h2>Manz.dev</h2>
          <p>En cuanto deje de llover, cierro stream. Seguro que no se alarga.</p>
        </div>
      </div>
    </div>`}}customElements.define("weather-card",p);
