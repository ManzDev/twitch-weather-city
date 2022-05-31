const ee=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function r(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerpolicy&&(u.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?u.credentials="include":o.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(o){if(o.ep)return;o.ep=!0;const u=r(o);fetch(o.href,u)}};ee();const j=["#dfa06d","#fdddca","#6d5d48","#d18d4d","#e4ad65"],Q=["darkred","darkblue","#86a007","darkgreen","tomato"];class H extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render();const c=~~(Math.random()*j.length);this.style.setProperty("--skin-color",j[c]);const r=~~(Math.random()*Q.length);this.style.setProperty("--shirt-color",Q[r]),~~(Math.random()*2)===0&&this.classList.add("to-left"),this.setAppears()}setAppears(){const c=5e3+~~(Math.random()*1e3*200);setTimeout(()=>this.classList.add("move"),c),setTimeout(()=>this.classList.remove("move"),c+4e3),setTimeout(()=>this.setAppears(),c+8e3)}render(){this.shadowRoot.innerHTML=`
    <style>${H.styles}</style>
    <div class="container"></div>`}}customElements.define("people-city",H);const te=8e3,ne={dawn:60,day:75,sunset:50,night:5};class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.probability=100}static get styles(){return`
      :host {
        display: flex;
        align-items: flex-end;

        background: var(--window-turnoff-color);
        transition:
          background 0.5s,
          box-shadow 1s;
        overflow: hidden;
      }

      :host(.on) {
        background: var(--window-color);
        box-shadow: 0 0 10px var(--shine-color);
      }

      :host(:not(.on)) people-city {
        opacity: 0.25;
      }
    `}connectedCallback(){this.render(),document.addEventListener("DAY_MOMENT_CHANGE",c=>this.onDayMomentChange(c.detail))}onDayMomentChange(c){if(this.probability=ne[c],c==="dawn"){const r=1e3+Math.floor(Math.random()*750);setTimeout(()=>this.classList.contains("on")&&this.toggle(),r)}this.setEvent()}toggle(){this.classList.toggle("on"),this.setEvent()}setEvent(){if(Math.floor(Math.random()*this.probability)!==0)return;const r=2e3+Math.floor(Math.random()*te);setTimeout(()=>this.toggle(),r)}render(){this.shadowRoot.innerHTML=`
    <style>${P.styles}</style>
    <people-city></people-city>
    `}}customElements.define("building-window",P);const re=40,Z=["#333333","#3a3a3a","#444444","#4a4a4a"];class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}init(){const c=Math.floor(Math.random()*25)+50,r=Math.floor(Math.random()*50)+50,s=Math.floor(Math.random()*Z.length);this.style.setProperty("--building-width",`${c}%`),this.style.setProperty("--building-height",`${r}%`),this.style.setProperty("--building-color",`${Z[s]}`)}get height(){return parseInt(this.style.getPropertyValue("height"))}connectedCallback(){this.init(),this.render()}generateWindows(){let c="";for(let r=0;r<re;r++)c+=`
      <building-window></building-window>`;return c}render(){this.shadowRoot.innerHTML=`
    <style>${R.styles}</style>
    ${this.generateWindows()}
    `}}customElements.define("building-city",R);class B extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.x=Math.floor(Math.random()*600),this.setY()}static get styles(){return`
    :host {
      display: inline-block;
      width: var(--width);
      height: var(--height);
      border-radius: 50px;
      opacity: calc(var(--opacity) + var(--opacity-factor, 0.5));
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(0.75px);
      transform: translate(var(--x, -200px), var(--y));
      transition: opacity 0.5s;
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
    `}setY(){this.y=Math.floor(Math.random()*300)}move(){setInterval(()=>{const c=this.x>500;this.x+=1,c&&(this.x=-200,this.setY()),this.style.setProperty("--x",`${this.x}px`)},30)}connectedCallback(){this.render(),this.move();const c=Math.floor(Math.random()*50)+100;this.style.setProperty("--width",`${c}px`);const r=Math.floor(Math.random()*50)+25;this.style.setProperty("--height",`${r}px`),this.style.setProperty("--y",`${this.y}px`);const s=Math.floor(Math.random()*4)/10;this.style.setProperty("--opacity",s);const o=20+Math.floor(Math.random()*20);this.style.setProperty("--cloud-speed",`${o}s`)}render(){this.shadowRoot.innerHTML=`
    <style>${B.styles}</style>
    <div class="container">
    </div>`}}customElements.define("cloud-city",B);var M=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},K={};/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(x){(function(){var c=function(){this.init()};c.prototype={init:function(){var e=this||r;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator=typeof window!="undefined"&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var t=this||r;if(e=parseFloat(e),t.ctx||b(),typeof e!="undefined"&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,r.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var a=t._howls[n]._getSoundIds(),l=0;l<a.length;l++){var d=t._howls[n]._soundById(a[l]);d&&d._node&&(d._node.volume=d._volume*e)}return t}return t._volume},mute:function(e){var t=this||r;t.ctx||b(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,r.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var a=t._howls[n]._getSoundIds(),l=0;l<a.length;l++){var d=t._howls[n]._soundById(a[l]);d&&d._node&&(d._node.muted=e?!0:d._muted)}return t},stop:function(){for(var e=this||r,t=0;t<e._howls.length;t++)e._howls[t].stop();return e},unload:function(){for(var e=this||r,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&typeof e.ctx.close!="undefined"&&(e.ctx.close(),e.ctx=null,b()),e},codecs:function(e){return(this||r)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||r;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if(typeof Audio!="undefined")try{var t=new Audio;typeof t.oncanplaythrough=="undefined"&&(e._canPlayEvent="canplay")}catch{e.noAudio=!0}else e.noAudio=!0;try{var t=new Audio;t.muted&&(e.noAudio=!0)}catch{}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||r,t=null;try{t=typeof Audio!="undefined"?new Audio:null}catch{return e}if(!t||typeof t.canPlayType!="function")return e;var n=t.canPlayType("audio/mpeg;").replace(/^no$/,""),a=e._navigator?e._navigator.userAgent:"",l=a.match(/OPR\/([0-6].)/g),d=l&&parseInt(l[0].split("/")[1],10)<33,i=a.indexOf("Safari")!==-1&&a.indexOf("Chrome")===-1,_=a.match(/Version\/(.*?) /),m=i&&_&&parseInt(_[1],10)<15;return e._codecs={mp3:!!(!d&&(n||t.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!n,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(t.canPlayType('audio/wav; codecs="1"')||t.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(t.canPlayType("audio/x-m4b;")||t.canPlayType("audio/m4b;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!m&&t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!m&&t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||r;if(!(e._audioUnlocked||!e.ctx)){e._audioUnlocked=!1,e.autoUnlock=!1,!e._mobileUnloaded&&e.ctx.sampleRate!==44100&&(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var t=function(n){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var a=new Audio;a._unlocked=!0,e._releaseHtml5Audio(a)}catch{e.noAudio=!0;break}for(var l=0;l<e._howls.length;l++)if(!e._howls[l]._webAudio)for(var d=e._howls[l]._getSoundIds(),i=0;i<d.length;i++){var _=e._howls[l]._soundById(d[i]);_&&_._node&&!_._node._unlocked&&(_._node._unlocked=!0,_._node.load())}e._autoResume();var m=e.ctx.createBufferSource();m.buffer=e._scratchBuffer,m.connect(e.ctx.destination),typeof m.start=="undefined"?m.noteOn(0):m.start(0),typeof e.ctx.resume=="function"&&e.ctx.resume(),m.onended=function(){m.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("click",t,!0),document.removeEventListener("keydown",t,!0);for(var y=0;y<e._howls.length;y++)e._howls[y]._emit("unlock")}};return document.addEventListener("touchstart",t,!0),document.addEventListener("touchend",t,!0),document.addEventListener("click",t,!0),document.addEventListener("keydown",t,!0),e}},_obtainHtml5Audio:function(){var e=this||r;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var t=new Audio().play();return t&&typeof Promise!="undefined"&&(t instanceof Promise||typeof t.then=="function")&&t.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(e){var t=this||r;return e._unlocked&&t._html5AudioPool.push(e),t},_autoSuspend:function(){var e=this;if(!(!e.autoSuspend||!e.ctx||typeof e.ctx.suspend=="undefined"||!r.usingWebAudio)){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio){for(var n=0;n<e._howls[t]._sounds.length;n++)if(!e._howls[t]._sounds[n]._paused)return e}return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){if(!!e.autoSuspend){e._suspendTimer=null,e.state="suspending";var a=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(a,a)}},3e4),e}},_autoResume:function(){var e=this;if(!(!e.ctx||typeof e.ctx.resume=="undefined"||!r.usingWebAudio))return e.state==="running"&&e.ctx.state!=="interrupted"&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):e.state==="suspended"||e.state==="running"&&e.ctx.state==="interrupted"?(e.ctx.resume().then(function(){e.state="running";for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):e.state==="suspending"&&(e._resumeAfterSuspend=!0),e}};var r=new c,s=function(e){var t=this;if(!e.src||e.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}t.init(e)};s.prototype={init:function(e){var t=this;return r.ctx||b(),t._autoplay=e.autoplay||!1,t._format=typeof e.format!="string"?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload=typeof e.preload=="boolean"||e.preload==="metadata"?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src=typeof e.src!="string"?e.src:[e.src],t._volume=e.volume!==void 0?e.volume:1,t._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:e.xhr&&e.xhr.withCredentials?e.xhr.withCredentials:!1},t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onunlock=e.onunlock?[{fn:e.onunlock}]:[],t._onresume=[],t._webAudio=r.usingWebAudio&&!t._html5,typeof r.ctx!="undefined"&&r.ctx&&r.autoUnlock&&r._unlockAudio(),r._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&t._preload!=="none"&&t.load(),t},load:function(){var e=this,t=null;if(r.noAudio){e._emit("loaderror",null,"No audio support.");return}typeof e._src=="string"&&(e._src=[e._src]);for(var n=0;n<e._src.length;n++){var a,l;if(e._format&&e._format[n])a=e._format[n];else{if(l=e._src[n],typeof l!="string"){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}a=/^data:audio\/([^;,]+);/i.exec(l),a||(a=/\.([^.]+)$/.exec(l.split("?",1)[0])),a&&(a=a[1].toLowerCase())}if(a||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),a&&r.codecs(a)){t=e._src[n];break}}if(!t){e._emit("loaderror",null,"No codec support for selected audio sources.");return}return e._src=t,e._state="loading",window.location.protocol==="https:"&&t.slice(0,5)==="http:"&&(e._html5=!0,e._webAudio=!1),new o(e),e._webAudio&&p(e),e},play:function(e,t){var n=this,a=null;if(typeof e=="number")a=e,e=null;else{if(typeof e=="string"&&n._state==="loaded"&&!n._sprite[e])return null;if(typeof e=="undefined"&&(e="__default",!n._playLock)){for(var l=0,d=0;d<n._sounds.length;d++)n._sounds[d]._paused&&!n._sounds[d]._ended&&(l++,a=n._sounds[d]._id);l===1?e=null:a=null}}var i=a?n._soundById(a):n._inactiveSound();if(!i)return null;if(a&&!e&&(e=i._sprite||"__default"),n._state!=="loaded"){i._sprite=e,i._ended=!1;var _=i._id;return n._queue.push({event:"play",action:function(){n.play(_)}}),_}if(a&&!i._paused)return t||n._loadQueue("play"),i._id;n._webAudio&&r._autoResume();var m=Math.max(0,i._seek>0?i._seek:n._sprite[e][0]/1e3),y=Math.max(0,(n._sprite[e][0]+n._sprite[e][1])/1e3-m),w=y*1e3/Math.abs(i._rate),A=n._sprite[e][0]/1e3,S=(n._sprite[e][0]+n._sprite[e][1])/1e3;i._sprite=e,i._ended=!1;var L=function(){i._paused=!1,i._seek=m,i._start=A,i._stop=S,i._loop=!!(i._loop||n._sprite[e][2])};if(m>=S){n._ended(i);return}var v=i._node;if(n._webAudio){var X=function(){n._playLock=!1,L(),n._refreshBuffer(i);var T=i._muted||n._muted?0:i._volume;v.gain.setValueAtTime(T,r.ctx.currentTime),i._playStart=r.ctx.currentTime,typeof v.bufferSource.start=="undefined"?i._loop?v.bufferSource.noteGrainOn(0,m,86400):v.bufferSource.noteGrainOn(0,m,y):i._loop?v.bufferSource.start(0,m,86400):v.bufferSource.start(0,m,y),w!==1/0&&(n._endTimers[i._id]=setTimeout(n._ended.bind(n,i),w)),t||setTimeout(function(){n._emit("play",i._id),n._loadQueue()},0)};r.state==="running"&&r.ctx.state!=="interrupted"?X():(n._playLock=!0,n.once("resume",X),n._clearTimer(i._id))}else{var Y=function(){v.currentTime=m,v.muted=i._muted||n._muted||r._muted||v.muted,v.volume=i._volume*r.volume(),v.playbackRate=i._rate;try{var T=v.play();if(T&&typeof Promise!="undefined"&&(T instanceof Promise||typeof T.then=="function")?(n._playLock=!0,L(),T.then(function(){n._playLock=!1,v._unlocked=!0,t?n._loadQueue():n._emit("play",i._id)}).catch(function(){n._playLock=!1,n._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),i._ended=!0,i._paused=!0})):t||(n._playLock=!1,L(),n._emit("play",i._id)),v.playbackRate=i._rate,v.paused){n._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}e!=="__default"||i._loop?n._endTimers[i._id]=setTimeout(n._ended.bind(n,i),w):(n._endTimers[i._id]=function(){n._ended(i),v.removeEventListener("ended",n._endTimers[i._id],!1)},v.addEventListener("ended",n._endTimers[i._id],!1))}catch(J){n._emit("playerror",i._id,J)}};v.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(v.src=n._src,v.load());var U=window&&window.ejecta||!v.readyState&&r._navigator.isCocoonJS;if(v.readyState>=3||U)Y();else{n._playLock=!0,n._state="loading";var W=function(){n._state="loaded",Y(),v.removeEventListener(r._canPlayEvent,W,!1)};v.addEventListener(r._canPlayEvent,W,!1),n._clearTimer(i._id)}}return i._id},pause:function(e){var t=this;if(t._state!=="loaded"||t._playLock)return t._queue.push({event:"pause",action:function(){t.pause(e)}}),t;for(var n=t._getSoundIds(e),a=0;a<n.length;a++){t._clearTimer(n[a]);var l=t._soundById(n[a]);if(l&&!l._paused&&(l._seek=t.seek(n[a]),l._rateSeek=0,l._paused=!0,t._stopFade(n[a]),l._node))if(t._webAudio){if(!l._node.bufferSource)continue;typeof l._node.bufferSource.stop=="undefined"?l._node.bufferSource.noteOff(0):l._node.bufferSource.stop(0),t._cleanBuffer(l._node)}else(!isNaN(l._node.duration)||l._node.duration===1/0)&&l._node.pause();arguments[1]||t._emit("pause",l?l._id:null)}return t},stop:function(e,t){var n=this;if(n._state!=="loaded"||n._playLock)return n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var a=n._getSoundIds(e),l=0;l<a.length;l++){n._clearTimer(a[l]);var d=n._soundById(a[l]);d&&(d._seek=d._start||0,d._rateSeek=0,d._paused=!0,d._ended=!0,n._stopFade(a[l]),d._node&&(n._webAudio?d._node.bufferSource&&(typeof d._node.bufferSource.stop=="undefined"?d._node.bufferSource.noteOff(0):d._node.bufferSource.stop(0),n._cleanBuffer(d._node)):(!isNaN(d._node.duration)||d._node.duration===1/0)&&(d._node.currentTime=d._start||0,d._node.pause(),d._node.duration===1/0&&n._clearSound(d._node))),t||n._emit("stop",d._id))}return n},mute:function(e,t){var n=this;if(n._state!=="loaded"||n._playLock)return n._queue.push({event:"mute",action:function(){n.mute(e,t)}}),n;if(typeof t=="undefined")if(typeof e=="boolean")n._muted=e;else return n._muted;for(var a=n._getSoundIds(t),l=0;l<a.length;l++){var d=n._soundById(a[l]);d&&(d._muted=e,d._interval&&n._stopFade(d._id),n._webAudio&&d._node?d._node.gain.setValueAtTime(e?0:d._volume,r.ctx.currentTime):d._node&&(d._node.muted=r._muted?!0:e),n._emit("mute",d._id))}return n},volume:function(){var e=this,t=arguments,n,a;if(t.length===0)return e._volume;if(t.length===1||t.length===2&&typeof t[1]=="undefined"){var l=e._getSoundIds(),d=l.indexOf(t[0]);d>=0?a=parseInt(t[0],10):n=parseFloat(t[0])}else t.length>=2&&(n=parseFloat(t[0]),a=parseInt(t[1],10));var i;if(typeof n!="undefined"&&n>=0&&n<=1){if(e._state!=="loaded"||e._playLock)return e._queue.push({event:"volume",action:function(){e.volume.apply(e,t)}}),e;typeof a=="undefined"&&(e._volume=n),a=e._getSoundIds(a);for(var _=0;_<a.length;_++)i=e._soundById(a[_]),i&&(i._volume=n,t[2]||e._stopFade(a[_]),e._webAudio&&i._node&&!i._muted?i._node.gain.setValueAtTime(n,r.ctx.currentTime):i._node&&!i._muted&&(i._node.volume=n*r.volume()),e._emit("volume",i._id))}else return i=a?e._soundById(a):e._sounds[0],i?i._volume:0;return e},fade:function(e,t,n,a){var l=this;if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"fade",action:function(){l.fade(e,t,n,a)}}),l;e=Math.min(Math.max(0,parseFloat(e)),1),t=Math.min(Math.max(0,parseFloat(t)),1),n=parseFloat(n),l.volume(e,a);for(var d=l._getSoundIds(a),i=0;i<d.length;i++){var _=l._soundById(d[i]);if(_){if(a||l._stopFade(d[i]),l._webAudio&&!_._muted){var m=r.ctx.currentTime,y=m+n/1e3;_._volume=e,_._node.gain.setValueAtTime(e,m),_._node.gain.linearRampToValueAtTime(t,y)}l._startFadeInterval(_,e,t,n,d[i],typeof a=="undefined")}}return l},_startFadeInterval:function(e,t,n,a,l,d){var i=this,_=t,m=n-t,y=Math.abs(m/.01),w=Math.max(4,y>0?a/y:a),A=Date.now();e._fadeTo=n,e._interval=setInterval(function(){var S=(Date.now()-A)/a;A=Date.now(),_+=m*S,_=Math.round(_*100)/100,m<0?_=Math.max(n,_):_=Math.min(n,_),i._webAudio?e._volume=_:i.volume(_,e._id,!0),d&&(i._volume=_),(n<t&&_<=n||n>t&&_>=n)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,i.volume(n,e._id),i._emit("fade",e._id))},w)},_stopFade:function(e){var t=this,n=t._soundById(e);return n&&n._interval&&(t._webAudio&&n._node.gain.cancelScheduledValues(r.ctx.currentTime),clearInterval(n._interval),n._interval=null,t.volume(n._fadeTo,e),n._fadeTo=null,t._emit("fade",e)),t},loop:function(){var e=this,t=arguments,n,a,l;if(t.length===0)return e._loop;if(t.length===1)if(typeof t[0]=="boolean")n=t[0],e._loop=n;else return l=e._soundById(parseInt(t[0],10)),l?l._loop:!1;else t.length===2&&(n=t[0],a=parseInt(t[1],10));for(var d=e._getSoundIds(a),i=0;i<d.length;i++)l=e._soundById(d[i]),l&&(l._loop=n,e._webAudio&&l._node&&l._node.bufferSource&&(l._node.bufferSource.loop=n,n&&(l._node.bufferSource.loopStart=l._start||0,l._node.bufferSource.loopEnd=l._stop,e.playing(d[i])&&(e.pause(d[i],!0),e.play(d[i],!0)))));return e},rate:function(){var e=this,t=arguments,n,a;if(t.length===0)a=e._sounds[0]._id;else if(t.length===1){var l=e._getSoundIds(),d=l.indexOf(t[0]);d>=0?a=parseInt(t[0],10):n=parseFloat(t[0])}else t.length===2&&(n=parseFloat(t[0]),a=parseInt(t[1],10));var i;if(typeof n=="number"){if(e._state!=="loaded"||e._playLock)return e._queue.push({event:"rate",action:function(){e.rate.apply(e,t)}}),e;typeof a=="undefined"&&(e._rate=n),a=e._getSoundIds(a);for(var _=0;_<a.length;_++)if(i=e._soundById(a[_]),i){e.playing(a[_])&&(i._rateSeek=e.seek(a[_]),i._playStart=e._webAudio?r.ctx.currentTime:i._playStart),i._rate=n,e._webAudio&&i._node&&i._node.bufferSource?i._node.bufferSource.playbackRate.setValueAtTime(n,r.ctx.currentTime):i._node&&(i._node.playbackRate=n);var m=e.seek(a[_]),y=(e._sprite[i._sprite][0]+e._sprite[i._sprite][1])/1e3-m,w=y*1e3/Math.abs(i._rate);(e._endTimers[a[_]]||!i._paused)&&(e._clearTimer(a[_]),e._endTimers[a[_]]=setTimeout(e._ended.bind(e,i),w)),e._emit("rate",i._id)}}else return i=e._soundById(a),i?i._rate:e._rate;return e},seek:function(){var e=this,t=arguments,n,a;if(t.length===0)e._sounds.length&&(a=e._sounds[0]._id);else if(t.length===1){var l=e._getSoundIds(),d=l.indexOf(t[0]);d>=0?a=parseInt(t[0],10):e._sounds.length&&(a=e._sounds[0]._id,n=parseFloat(t[0]))}else t.length===2&&(n=parseFloat(t[0]),a=parseInt(t[1],10));if(typeof a=="undefined")return 0;if(typeof n=="number"&&(e._state!=="loaded"||e._playLock))return e._queue.push({event:"seek",action:function(){e.seek.apply(e,t)}}),e;var i=e._soundById(a);if(i)if(typeof n=="number"&&n>=0){var _=e.playing(a);_&&e.pause(a,!0),i._seek=n,i._ended=!1,e._clearTimer(a),!e._webAudio&&i._node&&!isNaN(i._node.duration)&&(i._node.currentTime=n);var m=function(){_&&e.play(a,!0),e._emit("seek",a)};if(_&&!e._webAudio){var y=function(){e._playLock?setTimeout(y,0):m()};setTimeout(y,0)}else m()}else if(e._webAudio){var w=e.playing(a)?r.ctx.currentTime-i._playStart:0,A=i._rateSeek?i._rateSeek-i._seek:0;return i._seek+(A+w*Math.abs(i._rate))}else return i._node.currentTime;return e},playing:function(e){var t=this;if(typeof e=="number"){var n=t._soundById(e);return n?!n._paused:!1}for(var a=0;a<t._sounds.length;a++)if(!t._sounds[a]._paused)return!0;return!1},duration:function(e){var t=this,n=t._duration,a=t._soundById(e);return a&&(n=t._sprite[a._sprite][1]/1e3),n},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,n=0;n<t.length;n++)t[n]._paused||e.stop(t[n]._id),e._webAudio||(e._clearSound(t[n]._node),t[n]._node.removeEventListener("error",t[n]._errorFn,!1),t[n]._node.removeEventListener(r._canPlayEvent,t[n]._loadFn,!1),t[n]._node.removeEventListener("ended",t[n]._endFn,!1),r._releaseHtml5Audio(t[n]._node)),delete t[n]._node,e._clearTimer(t[n]._id);var a=r._howls.indexOf(e);a>=0&&r._howls.splice(a,1);var l=!0;for(n=0;n<r._howls.length;n++)if(r._howls[n]._src===e._src||e._src.indexOf(r._howls[n]._src)>=0){l=!1;break}return u&&l&&delete u[e._src],r.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,t,n,a){var l=this,d=l["_on"+e];return typeof t=="function"&&d.push(a?{id:n,fn:t,once:a}:{id:n,fn:t}),l},off:function(e,t,n){var a=this,l=a["_on"+e],d=0;if(typeof t=="number"&&(n=t,t=null),t||n)for(d=0;d<l.length;d++){var i=n===l[d].id;if(t===l[d].fn&&i||!t&&i){l.splice(d,1);break}}else if(e)a["_on"+e]=[];else{var _=Object.keys(a);for(d=0;d<_.length;d++)_[d].indexOf("_on")===0&&Array.isArray(a[_[d]])&&(a[_[d]]=[])}return a},once:function(e,t,n){var a=this;return a.on(e,t,n,1),a},_emit:function(e,t,n){for(var a=this,l=a["_on"+e],d=l.length-1;d>=0;d--)(!l[d].id||l[d].id===t||e==="load")&&(setTimeout(function(i){i.call(this,t,n)}.bind(a,l[d].fn),0),l[d].once&&a.off(e,l[d].fn,l[d].id));return a._loadQueue(e),a},_loadQueue:function(e){var t=this;if(t._queue.length>0){var n=t._queue[0];n.event===e&&(t._queue.shift(),t._loadQueue()),e||n.action()}return t},_ended:function(e){var t=this,n=e._sprite;if(!t._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(t._ended.bind(t,e),100),t;var a=!!(e._loop||t._sprite[n][2]);if(t._emit("end",e._id),!t._webAudio&&a&&t.stop(e._id,!0).play(e._id),t._webAudio&&a){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=r.ctx.currentTime;var l=(e._stop-e._start)*1e3/Math.abs(e._rate);t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),l)}return t._webAudio&&!a&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),r._autoSuspend()),!t._webAudio&&!a&&t.stop(e._id,!0),t},_clearTimer:function(e){var t=this;if(t._endTimers[e]){if(typeof t._endTimers[e]!="function")clearTimeout(t._endTimers[e]);else{var n=t._soundById(e);n&&n._node&&n._node.removeEventListener("ended",t._endTimers[e],!1)}delete t._endTimers[e]}return t},_soundById:function(e){for(var t=this,n=0;n<t._sounds.length;n++)if(e===t._sounds[n]._id)return t._sounds[n];return null},_inactiveSound:function(){var e=this;e._drain();for(var t=0;t<e._sounds.length;t++)if(e._sounds[t]._ended)return e._sounds[t].reset();return new o(e)},_drain:function(){var e=this,t=e._pool,n=0,a=0;if(!(e._sounds.length<t)){for(a=0;a<e._sounds.length;a++)e._sounds[a]._ended&&n++;for(a=e._sounds.length-1;a>=0;a--){if(n<=t)return;e._sounds[a]._ended&&(e._webAudio&&e._sounds[a]._node&&e._sounds[a]._node.disconnect(0),e._sounds.splice(a,1),n--)}}},_getSoundIds:function(e){var t=this;if(typeof e=="undefined"){for(var n=[],a=0;a<t._sounds.length;a++)n.push(t._sounds[a]._id);return n}else return[e]},_refreshBuffer:function(e){var t=this;return e._node.bufferSource=r.ctx.createBufferSource(),e._node.bufferSource.buffer=u[t._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,r.ctx.currentTime),t},_cleanBuffer:function(e){var t=this,n=r._navigator&&r._navigator.vendor.indexOf("Apple")>=0;if(r._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),n))try{e.bufferSource.buffer=r._scratchBuffer}catch{}return e.bufferSource=null,t},_clearSound:function(e){var t=/MSIE |Trident\//.test(r._navigator&&r._navigator.userAgent);t||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var o=function(e){this._parent=e,this.init()};o.prototype={init:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++r._counter,t._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,n=r._muted||e._muted||e._parent._muted?0:e._volume;return t._webAudio?(e._node=typeof r.ctx.createGain=="undefined"?r.ctx.createGainNode():r.ctx.createGain(),e._node.gain.setValueAtTime(n,r.ctx.currentTime),e._node.paused=!0,e._node.connect(r.masterGain)):r.noAudio||(e._node=r._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(r._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=t._src,e._node.preload=t._preload===!0?"auto":t._preload,e._node.volume=n*r.volume(),e._node.load()),e},reset:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++r._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,t=e._parent;t._duration=Math.ceil(e._node.duration*10)/10,Object.keys(t._sprite).length===0&&(t._sprite={__default:[0,t._duration*1e3]}),t._state!=="loaded"&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(r._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,t=e._parent;t._duration===1/0&&(t._duration=Math.ceil(e._node.duration*10)/10,t._sprite.__default[1]===1/0&&(t._sprite.__default[1]=t._duration*1e3),t._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var u={},p=function(e){var t=e._src;if(u[t]){e._duration=u[t].duration,f(e);return}if(/^data:[^;]+;base64,/.test(t)){for(var n=atob(t.split(",")[1]),a=new Uint8Array(n.length),l=0;l<n.length;++l)a[l]=n.charCodeAt(l);h(a.buffer,e)}else{var d=new XMLHttpRequest;d.open(e._xhr.method,t,!0),d.withCredentials=e._xhr.withCredentials,d.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach(function(i){d.setRequestHeader(i,e._xhr.headers[i])}),d.onload=function(){var i=(d.status+"")[0];if(i!=="0"&&i!=="2"&&i!=="3"){e._emit("loaderror",null,"Failed loading audio file with status: "+d.status+".");return}h(d.response,e)},d.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete u[t],e.load())},g(d)}},g=function(e){try{e.send()}catch{e.onerror()}},h=function(e,t){var n=function(){t._emit("loaderror",null,"Decoding audio data failed.")},a=function(l){l&&t._sounds.length>0?(u[t._src]=l,f(t,l)):n()};typeof Promise!="undefined"&&r.ctx.decodeAudioData.length===1?r.ctx.decodeAudioData(e).then(a).catch(n):r.ctx.decodeAudioData(e,a,n)},f=function(e,t){t&&!e._duration&&(e._duration=t.duration),Object.keys(e._sprite).length===0&&(e._sprite={__default:[0,e._duration*1e3]}),e._state!=="loaded"&&(e._state="loaded",e._emit("load"),e._loadQueue())},b=function(){if(!!r.usingWebAudio){try{typeof AudioContext!="undefined"?r.ctx=new AudioContext:typeof webkitAudioContext!="undefined"?r.ctx=new webkitAudioContext:r.usingWebAudio=!1}catch{r.usingWebAudio=!1}r.ctx||(r.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(r._navigator&&r._navigator.platform),t=r._navigator&&r._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),n=t?parseInt(t[1],10):null;if(e&&n&&n<9){var a=/safari/.test(r._navigator&&r._navigator.userAgent.toLowerCase());r._navigator&&!a&&(r.usingWebAudio=!1)}r.usingWebAudio&&(r.masterGain=typeof r.ctx.createGain=="undefined"?r.ctx.createGainNode():r.ctx.createGain(),r.masterGain.gain.setValueAtTime(r._muted?0:r._volume,r.ctx.currentTime),r.masterGain.connect(r.ctx.destination)),r._setup()}};x.Howler=r,x.Howl=s,typeof M!="undefined"?(M.HowlerGlobal=c,M.Howler=r,M.Howl=s,M.Sound=o):typeof window!="undefined"&&(window.HowlerGlobal=c,window.Howler=r,window.Howl=s,window.Sound=o)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(r){var s=this;if(!s.ctx||!s.ctx.listener)return s;for(var o=s._howls.length-1;o>=0;o--)s._howls[o].stereo(r);return s},HowlerGlobal.prototype.pos=function(r,s,o){var u=this;if(!u.ctx||!u.ctx.listener)return u;if(s=typeof s!="number"?u._pos[1]:s,o=typeof o!="number"?u._pos[2]:o,typeof r=="number")u._pos=[r,s,o],typeof u.ctx.listener.positionX!="undefined"?(u.ctx.listener.positionX.setTargetAtTime(u._pos[0],Howler.ctx.currentTime,.1),u.ctx.listener.positionY.setTargetAtTime(u._pos[1],Howler.ctx.currentTime,.1),u.ctx.listener.positionZ.setTargetAtTime(u._pos[2],Howler.ctx.currentTime,.1)):u.ctx.listener.setPosition(u._pos[0],u._pos[1],u._pos[2]);else return u._pos;return u},HowlerGlobal.prototype.orientation=function(r,s,o,u,p,g){var h=this;if(!h.ctx||!h.ctx.listener)return h;var f=h._orientation;if(s=typeof s!="number"?f[1]:s,o=typeof o!="number"?f[2]:o,u=typeof u!="number"?f[3]:u,p=typeof p!="number"?f[4]:p,g=typeof g!="number"?f[5]:g,typeof r=="number")h._orientation=[r,s,o,u,p,g],typeof h.ctx.listener.forwardX!="undefined"?(h.ctx.listener.forwardX.setTargetAtTime(r,Howler.ctx.currentTime,.1),h.ctx.listener.forwardY.setTargetAtTime(s,Howler.ctx.currentTime,.1),h.ctx.listener.forwardZ.setTargetAtTime(o,Howler.ctx.currentTime,.1),h.ctx.listener.upX.setTargetAtTime(u,Howler.ctx.currentTime,.1),h.ctx.listener.upY.setTargetAtTime(p,Howler.ctx.currentTime,.1),h.ctx.listener.upZ.setTargetAtTime(g,Howler.ctx.currentTime,.1)):h.ctx.listener.setOrientation(r,s,o,u,p,g);else return f;return h},Howl.prototype.init=function(r){return function(s){var o=this;return o._orientation=s.orientation||[1,0,0],o._stereo=s.stereo||null,o._pos=s.pos||null,o._pannerAttr={coneInnerAngle:typeof s.coneInnerAngle!="undefined"?s.coneInnerAngle:360,coneOuterAngle:typeof s.coneOuterAngle!="undefined"?s.coneOuterAngle:360,coneOuterGain:typeof s.coneOuterGain!="undefined"?s.coneOuterGain:0,distanceModel:typeof s.distanceModel!="undefined"?s.distanceModel:"inverse",maxDistance:typeof s.maxDistance!="undefined"?s.maxDistance:1e4,panningModel:typeof s.panningModel!="undefined"?s.panningModel:"HRTF",refDistance:typeof s.refDistance!="undefined"?s.refDistance:1,rolloffFactor:typeof s.rolloffFactor!="undefined"?s.rolloffFactor:1},o._onstereo=s.onstereo?[{fn:s.onstereo}]:[],o._onpos=s.onpos?[{fn:s.onpos}]:[],o._onorientation=s.onorientation?[{fn:s.onorientation}]:[],r.call(this,s)}}(Howl.prototype.init),Howl.prototype.stereo=function(r,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"stereo",action:function(){o.stereo(r,s)}}),o;var u=typeof Howler.ctx.createStereoPanner=="undefined"?"spatial":"stereo";if(typeof s=="undefined")if(typeof r=="number")o._stereo=r,o._pos=[r,0,0];else return o._stereo;for(var p=o._getSoundIds(s),g=0;g<p.length;g++){var h=o._soundById(p[g]);if(h)if(typeof r=="number")h._stereo=r,h._pos=[r,0,0],h._node&&(h._pannerAttr.panningModel="equalpower",(!h._panner||!h._panner.pan)&&c(h,u),u==="spatial"?typeof h._panner.positionX!="undefined"?(h._panner.positionX.setValueAtTime(r,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):h._panner.setPosition(r,0,0):h._panner.pan.setValueAtTime(r,Howler.ctx.currentTime)),o._emit("stereo",h._id);else return h._stereo}return o},Howl.prototype.pos=function(r,s,o,u){var p=this;if(!p._webAudio)return p;if(p._state!=="loaded")return p._queue.push({event:"pos",action:function(){p.pos(r,s,o,u)}}),p;if(s=typeof s!="number"?0:s,o=typeof o!="number"?-.5:o,typeof u=="undefined")if(typeof r=="number")p._pos=[r,s,o];else return p._pos;for(var g=p._getSoundIds(u),h=0;h<g.length;h++){var f=p._soundById(g[h]);if(f)if(typeof r=="number")f._pos=[r,s,o],f._node&&((!f._panner||f._panner.pan)&&c(f,"spatial"),typeof f._panner.positionX!="undefined"?(f._panner.positionX.setValueAtTime(r,Howler.ctx.currentTime),f._panner.positionY.setValueAtTime(s,Howler.ctx.currentTime),f._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):f._panner.setPosition(r,s,o)),p._emit("pos",f._id);else return f._pos}return p},Howl.prototype.orientation=function(r,s,o,u){var p=this;if(!p._webAudio)return p;if(p._state!=="loaded")return p._queue.push({event:"orientation",action:function(){p.orientation(r,s,o,u)}}),p;if(s=typeof s!="number"?p._orientation[1]:s,o=typeof o!="number"?p._orientation[2]:o,typeof u=="undefined")if(typeof r=="number")p._orientation=[r,s,o];else return p._orientation;for(var g=p._getSoundIds(u),h=0;h<g.length;h++){var f=p._soundById(g[h]);if(f)if(typeof r=="number")f._orientation=[r,s,o],f._node&&(f._panner||(f._pos||(f._pos=p._pos||[0,0,-.5]),c(f,"spatial")),typeof f._panner.orientationX!="undefined"?(f._panner.orientationX.setValueAtTime(r,Howler.ctx.currentTime),f._panner.orientationY.setValueAtTime(s,Howler.ctx.currentTime),f._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):f._panner.setOrientation(r,s,o)),p._emit("orientation",f._id);else return f._orientation}return p},Howl.prototype.pannerAttr=function(){var r=this,s=arguments,o,u,p;if(!r._webAudio)return r;if(s.length===0)return r._pannerAttr;if(s.length===1)if(typeof s[0]=="object")o=s[0],typeof u=="undefined"&&(o.pannerAttr||(o.pannerAttr={coneInnerAngle:o.coneInnerAngle,coneOuterAngle:o.coneOuterAngle,coneOuterGain:o.coneOuterGain,distanceModel:o.distanceModel,maxDistance:o.maxDistance,refDistance:o.refDistance,rolloffFactor:o.rolloffFactor,panningModel:o.panningModel}),r._pannerAttr={coneInnerAngle:typeof o.pannerAttr.coneInnerAngle!="undefined"?o.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:typeof o.pannerAttr.coneOuterAngle!="undefined"?o.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:typeof o.pannerAttr.coneOuterGain!="undefined"?o.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:typeof o.pannerAttr.distanceModel!="undefined"?o.pannerAttr.distanceModel:r._distanceModel,maxDistance:typeof o.pannerAttr.maxDistance!="undefined"?o.pannerAttr.maxDistance:r._maxDistance,refDistance:typeof o.pannerAttr.refDistance!="undefined"?o.pannerAttr.refDistance:r._refDistance,rolloffFactor:typeof o.pannerAttr.rolloffFactor!="undefined"?o.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:typeof o.pannerAttr.panningModel!="undefined"?o.pannerAttr.panningModel:r._panningModel});else return p=r._soundById(parseInt(s[0],10)),p?p._pannerAttr:r._pannerAttr;else s.length===2&&(o=s[0],u=parseInt(s[1],10));for(var g=r._getSoundIds(u),h=0;h<g.length;h++)if(p=r._soundById(g[h]),p){var f=p._pannerAttr;f={coneInnerAngle:typeof o.coneInnerAngle!="undefined"?o.coneInnerAngle:f.coneInnerAngle,coneOuterAngle:typeof o.coneOuterAngle!="undefined"?o.coneOuterAngle:f.coneOuterAngle,coneOuterGain:typeof o.coneOuterGain!="undefined"?o.coneOuterGain:f.coneOuterGain,distanceModel:typeof o.distanceModel!="undefined"?o.distanceModel:f.distanceModel,maxDistance:typeof o.maxDistance!="undefined"?o.maxDistance:f.maxDistance,refDistance:typeof o.refDistance!="undefined"?o.refDistance:f.refDistance,rolloffFactor:typeof o.rolloffFactor!="undefined"?o.rolloffFactor:f.rolloffFactor,panningModel:typeof o.panningModel!="undefined"?o.panningModel:f.panningModel};var b=p._panner;b?(b.coneInnerAngle=f.coneInnerAngle,b.coneOuterAngle=f.coneOuterAngle,b.coneOuterGain=f.coneOuterGain,b.distanceModel=f.distanceModel,b.maxDistance=f.maxDistance,b.refDistance=f.refDistance,b.rolloffFactor=f.rolloffFactor,b.panningModel=f.panningModel):(p._pos||(p._pos=r._pos||[0,0,-.5]),c(p,"spatial"))}return r},Sound.prototype.init=function(r){return function(){var s=this,o=s._parent;s._orientation=o._orientation,s._stereo=o._stereo,s._pos=o._pos,s._pannerAttr=o._pannerAttr,r.call(this),s._stereo?o.stereo(s._stereo):s._pos&&o.pos(s._pos[0],s._pos[1],s._pos[2],s._id)}}(Sound.prototype.init),Sound.prototype.reset=function(r){return function(){var s=this,o=s._parent;return s._orientation=o._orientation,s._stereo=o._stereo,s._pos=o._pos,s._pannerAttr=o._pannerAttr,s._stereo?o.stereo(s._stereo):s._pos?o.pos(s._pos[0],s._pos[1],s._pos[2],s._id):s._panner&&(s._panner.disconnect(0),s._panner=void 0,o._refreshBuffer(s)),r.call(this)}}(Sound.prototype.reset);var c=function(r,s){s=s||"spatial",s==="spatial"?(r._panner=Howler.ctx.createPanner(),r._panner.coneInnerAngle=r._pannerAttr.coneInnerAngle,r._panner.coneOuterAngle=r._pannerAttr.coneOuterAngle,r._panner.coneOuterGain=r._pannerAttr.coneOuterGain,r._panner.distanceModel=r._pannerAttr.distanceModel,r._panner.maxDistance=r._pannerAttr.maxDistance,r._panner.refDistance=r._pannerAttr.refDistance,r._panner.rolloffFactor=r._pannerAttr.rolloffFactor,r._panner.panningModel=r._pannerAttr.panningModel,typeof r._panner.positionX!="undefined"?(r._panner.positionX.setValueAtTime(r._pos[0],Howler.ctx.currentTime),r._panner.positionY.setValueAtTime(r._pos[1],Howler.ctx.currentTime),r._panner.positionZ.setValueAtTime(r._pos[2],Howler.ctx.currentTime)):r._panner.setPosition(r._pos[0],r._pos[1],r._pos[2]),typeof r._panner.orientationX!="undefined"?(r._panner.orientationX.setValueAtTime(r._orientation[0],Howler.ctx.currentTime),r._panner.orientationY.setValueAtTime(r._orientation[1],Howler.ctx.currentTime),r._panner.orientationZ.setValueAtTime(r._orientation[2],Howler.ctx.currentTime)):r._panner.setOrientation(r._orientation[0],r._orientation[1],r._orientation[2])):(r._panner=Howler.ctx.createStereoPanner(),r._panner.pan.setValueAtTime(r._stereo,Howler.ctx.currentTime)),r._panner.connect(r._node),r._paused||r._parent.pause(r._id,!0).play(r._id,!0)}})()})(K);const ae=1e3,k=-65*(Math.PI/180),oe=1e3,I=new K.Howl({src:["sounds/rain-sound.mp3"],loop:!0});class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.rainEnabled=!1}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.canvas=this.shadowRoot.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=parseInt(window.getComputedStyle(this).width)*2,this.canvas.height=parseInt(window.getComputedStyle(this).height)*2;const c=1e4+Math.floor(Math.random()*6e3);setTimeout(()=>this.toggle(),c)}toggle(){if(!this.rainEnabled&&this.init(),this.rainEnabled=!this.rainEnabled,!this.rainEnabled){this.stopSound();const c=new CustomEvent("STOP_RAIN",{bubbles:!0,composed:!0});this.dispatchEvent(c)}}playSound(){setTimeout(()=>{I.play(),I.fade(0,1,2e3)},3e3)}stopSound(){I.fade(1,0,3e3),setTimeout(()=>I.stop(),3e3)}init(){this.playSound();const c=new CustomEvent("START_RAIN",{bubbles:!0,composed:!0});this.dispatchEvent(c),this.drops=[];for(let r=0;r<ae;r++){const s=Math.floor(Math.random()*15)+15;this.drops.push({x:Math.floor(Math.random()*this.canvas.width)+this.canvas.width,y:Math.floor(Math.random()*this.canvas.height)-this.canvas.height,size:Math.floor(Math.random()*15)+7,speed:s,color:`rgba(255, 255, 255, ${s/20})`})}clearInterval(this.timer),this.timer=setInterval(()=>this.loop(),50)}update(){this.drops.forEach(c=>{c.x-=c.speed*Math.cos(k),c.y-=c.speed*Math.sin(k);const r=c.x<0,s=c.y>this.canvas.height&&this.rainEnabled;r&&(c.x=this.canvas.width),s&&(c.y=0,c.x=Math.floor(Math.random()*this.canvas.width))})}loop(){this.update(),this.ctx.lineWidth=1,this.ctx.lineCap="round",this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drops.forEach(r=>{this.ctx.strokeStyle=r.color,this.ctx.beginPath(),this.ctx.moveTo(r.x,r.y);const s=r.x+r.size*Math.cos(k),o=r.y+r.size*Math.sin(k);this.ctx.lineTo(s,o),this.ctx.stroke()}),Math.floor(Math.random()*oe)===0&&this.toggle()}render(){this.shadowRoot.innerHTML=`
    <style>${z.styles}</style>
    <canvas></canvas>
    `}}customElements.define("rain-city",z);class C extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.style.setProperty("--offset",~~(Math.random()*2)===0?1:-1),setTimeout(()=>this.classList.add("visible"),1e3),setTimeout(()=>this.destroy(),4e3)}destroy(){this.classList.remove("visible"),setTimeout(()=>this.remove(),3e3)}render(){this.shadowRoot.innerHTML=`
    <style>${C.styles}</style>
    <div class="container"></div>`}}customElements.define("rainbow-city",C);class D extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${D.styles}</style>
    <div class="container">
      <div class="bat">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="bottom"></div>
      </div>
    </div>`}}customElements.define("batmaxi-logo",D);class F extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){if(this.render(),Math.floor(Math.random()*2)===0)this.shadowRoot.querySelector(".logo").classList.add("batmanz");else{const r=document.createElement("batmaxi-logo");this.shadowRoot.querySelector(".logo").appendChild(r)}setTimeout(()=>this.destroy(),6e3)}destroy(){this.remove()}render(){this.shadowRoot.innerHTML=`
    <style>${F.styles}</style>
    <div class="signal">
      <div class="logo">
      </div>
      <div class="batman-trail"></div>
    </div>`}}customElements.define("batman-signal",F);class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${G.styles}</style>
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
    </div>`}}customElements.define("spheric-cow",G);class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.setX(),this.render(),setTimeout(()=>this.destroy(),9e3)}setX(){const c=-60+Math.random()*350;this.style.setProperty("--x",`${c}px`)}destroy(){this.remove()}render(){this.shadowRoot.innerHTML=`
    <style>${N.styles}</style>
    <div class="signal"></div>
    <spheric-cow></spheric-cow>
    `}}customElements.define("cow-abduction",N);const E=["dawn","day","sunset","night"],ie=6,se=1e4,le=10,de=5,ce=10,ue=6e3;class $ extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.currentMoment=1}static get styles(){return`
      :host {
      }

      .container {
        width: 100%;
        height: 75%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        background: var(--bgcolor);
        transition: background 1.5s;
        position: relative;
        overflow: hidden;
      }

      :host(.night),
      :host(.sunset) {
        --bgcolor: #0f0c20;
        --window-turnoff-color: #000;
        --window-color: #d3a50f;
        --shine-color: gold;
      }

      :host(.sunset) {
        --bgcolor: #af5328;
      }

      :host(.day),
      :host(.dawn) {
        --bgcolor: #1588b6;
        --window-turnoff-color: #1c1d1dff;
        --window-color: #d3a50f22;
        --shine-color: transparent;
      }

      :host(.dawn) {
        --bgcolor: #b962b5;
      }

      /* Moon & Sun */

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
      :host(.sunset) .moon,
      :host(.day) .sun,
      :host(.dawn) .sun {
        transform: translate(0, 0);
      }

      :host(.day) .moon,
      :host(.dawn) .moon,
      :host(.night) .sun,
      :host(.sunset) .sun {
        transform: translate(0, 500px);
      }

      .clouds {
        width: 100%;
        height: 250px;
        position: absolute;
        top: 0;
        z-index: 5;
      }

      :host(.night) .clouds {
        --opacity-factor: 0.1;
      }

      :host(.sunset) .clouds {
        --opacity-factor: 0.25;
      }

      .buildings {
        width: 100%;
        height: 75%;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        position: relative;
        z-index: 10;
      }
    `}connectedCallback(){this.render(),setInterval(()=>this.changeStage(),se),setInterval(()=>this.enableRandomEvents(),ue),this.addEventListener("STOP_RAIN",()=>this.currentMoment<2&&this.showRainbow())}enableRandomEvents(){Math.floor(Math.random()*de)&&this.currentMoment===3&&this.showBatmanSignal(),Math.floor(Math.random()*ce)===0&&this.showCowAbduction()}generateBuildings(){return"<building-city></building-city>".repeat(ie)}generateClouds(){return"<cloud-city></cloud-city>".repeat(le)}showRainbow(){const c=document.createElement("rainbow-city");this.shadowRoot.querySelector(".clouds").appendChild(c)}showBatmanSignal(){const c=document.createElement("batman-signal");this.shadowRoot.querySelector(".clouds").insertAdjacentElement("afterend",c)}showCowAbduction(){const c=document.createElement("cow-abduction");this.shadowRoot.querySelector(".sun").insertAdjacentElement("beforebegin",c)}changeStage(){this.classList.remove(E[this.currentMoment]),this.currentMoment=(this.currentMoment+1)%E.length,this.classList.add(E[this.currentMoment]);const c=new CustomEvent("DAY_MOMENT_CHANGE",{detail:E[this.currentMoment],bubbles:!0,composed:!0});this.dispatchEvent(c)}render(){this.shadowRoot.innerHTML=`
    <style>${$.styles}</style>
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
    </div>`}}customElements.define("weather-city",$);class V extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.image=this.getAttribute("image")||"manzdev.png",this.text=this.getAttribute("text")||"Default text.",this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${V.styles}</style>
    <div class="container">
      <img src="${this.image}" alt="Manz.dev">
      <div class="text">
        <h2>Manz.dev</h2>
        <p>${this.text}</p>
      </div>
    </div>`}}customElements.define("manzdev-status",V);const O=[{image:"manzdev.png",description:""},{image:"manz-streamer.png",description:""},{image:"rainmanz.png",description:""}];class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.currentManz=0}static get styles(){return`
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
        overflow: hidden;
      }

      manzdev-status {
        transform: translateY(165px);
        transition: transform 1s;
        display: flex;

      }

      .hide {
        transform: translateY(340px);
      }
    `}toggle(){this.currentManz=(this.currentManz+1)%O.length,this.querySelector(".zone img").src=O[this.currentManz].image,this.querySelector(".zone .text p").textContent=O[this.currentManz].description}connectedCallback(){this.render(),this.addEventListener("START_RAIN",()=>this.onStartRain()),this.addEventListener("STOP_RAIN",()=>this.onStopRain()),this.onStopRain()}onStartRain(){this.shadowRoot.querySelector(".rain").classList.remove("hide"),this.shadowRoot.querySelector(".normal").classList.add("hide")}onStopRain(){this.shadowRoot.querySelector(".rain").classList.add("hide"),this.shadowRoot.querySelector(".normal").classList.remove("hide")}render(){this.shadowRoot.innerHTML=`
    <style>${q.styles}</style>
    <div class="container">
      <weather-city class="day"></weather-city>
      <manzdev-status class="normal" image="manzdev.png" text="\xA1Qu\xE9 buen d\xEDa se ha quedado! Preparar\xE9 mis cosas para dar un paseo..."></manzdev-status>
      <manzdev-status class="rain hide" image="rainmanz.png" text="Bueno, mejor sigo en stream un rato hasta que pare de llover..."></manzdev-status>
    </div>`}}customElements.define("weather-card",q);const fe=x=>{const c={dawn:"#6767b4",day:"#4c4c9b",sunset:" #3d3d61",night:"#3b4f5e"};document.documentElement.style.setProperty("--bgcolor",c[x])};addEventListener("DAY_MOMENT_CHANGE",x=>fe(x.detail));
