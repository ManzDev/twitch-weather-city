const ne=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function n(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerpolicy&&(u.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?u.credentials="include":o.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function i(o){if(o.ep)return;o.ep=!0;const u=n(o);fetch(o.href,u)}};ne();const Q=["#dfa06d","#fdddca","#6d5d48","#d18d4d","#e4ad65"],Z=["darkred","darkblue","#86a007","darkgreen","tomato"];class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render();const c=~~(Math.random()*Q.length);this.style.setProperty("--skin-color",Q[c]);const n=~~(Math.random()*Z.length);this.style.setProperty("--shirt-color",Z[n]),~~(Math.random()*2)===0&&this.classList.add("to-left"),this.setAppears()}setAppears(){const c=5e3+~~(Math.random()*1e3*200);setTimeout(()=>this.classList.add("move"),c),setTimeout(()=>this.classList.remove("move"),c+4e3),setTimeout(()=>this.setAppears(),c+8e3)}render(){this.shadowRoot.innerHTML=`
    <style>${P.styles}</style>
    <div class="container"></div>`}}customElements.define("people-city",P);const re=8e3,ae={dawn:60,day:75,sunset:50,night:5};class H extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.probability=100}static get styles(){return`
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
    `}connectedCallback(){this.render(),document.addEventListener("DAY_MOMENT_CHANGE",c=>this.onDayMomentChange(c.detail))}onDayMomentChange(c){if(this.probability=ae[c],c==="dawn"){const n=1e3+Math.floor(Math.random()*750);setTimeout(()=>this.classList.contains("on")&&this.toggle(),n)}this.setEvent()}toggle(){this.classList.toggle("on"),this.setEvent()}setEvent(){if(Math.floor(Math.random()*this.probability)!==0)return;const n=2e3+Math.floor(Math.random()*re);setTimeout(()=>this.toggle(),n)}render(){this.shadowRoot.innerHTML=`
    <style>${H.styles}</style>
    <people-city></people-city>
    `}}customElements.define("building-window",H);const oe=40,K=["#333333","#3a3a3a","#444444","#4a4a4a"];class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}init(){const c=Math.floor(Math.random()*25)+50,n=Math.floor(Math.random()*50)+50,i=Math.floor(Math.random()*K.length);this.style.setProperty("--building-width",`${c}%`),this.style.setProperty("--building-height",`${n}%`),this.style.setProperty("--building-color",`${K[i]}`)}get height(){return parseInt(this.style.getPropertyValue("height"))}connectedCallback(){this.init(),this.render()}generateWindows(){let c="";for(let n=0;n<oe;n++)c+=`
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
    `}setY(){this.y=Math.floor(Math.random()*300)}move(){setInterval(()=>{const c=this.x>500;this.x+=1,c&&(this.x=-200,this.setY()),this.style.setProperty("--x",`${this.x}px`)},30)}connectedCallback(){this.render(),this.move();const c=Math.floor(Math.random()*50)+100;this.style.setProperty("--width",`${c}px`);const n=Math.floor(Math.random()*50)+25;this.style.setProperty("--height",`${n}px`),this.style.setProperty("--y",`${this.y}px`);const i=Math.floor(Math.random()*4)/10;this.style.setProperty("--opacity",i);const o=20+Math.floor(Math.random()*20);this.style.setProperty("--cloud-speed",`${o}s`)}render(){this.shadowRoot.innerHTML=`
    <style>${B.styles}</style>
    <div class="container">
    </div>`}}customElements.define("cloud-city",B);var M=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},J={};/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(x){(function(){var c=function(){this.init()};c.prototype={init:function(){var e=this||n;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator=typeof window!="undefined"&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var t=this||n;if(e=parseFloat(e),t.ctx||b(),typeof e!="undefined"&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,n.ctx.currentTime);for(var r=0;r<t._howls.length;r++)if(!t._howls[r]._webAudio)for(var a=t._howls[r]._getSoundIds(),l=0;l<a.length;l++){var d=t._howls[r]._soundById(a[l]);d&&d._node&&(d._node.volume=d._volume*e)}return t}return t._volume},mute:function(e){var t=this||n;t.ctx||b(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,n.ctx.currentTime);for(var r=0;r<t._howls.length;r++)if(!t._howls[r]._webAudio)for(var a=t._howls[r]._getSoundIds(),l=0;l<a.length;l++){var d=t._howls[r]._soundById(a[l]);d&&d._node&&(d._node.muted=e?!0:d._muted)}return t},stop:function(){for(var e=this||n,t=0;t<e._howls.length;t++)e._howls[t].stop();return e},unload:function(){for(var e=this||n,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&typeof e.ctx.close!="undefined"&&(e.ctx.close(),e.ctx=null,b()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if(typeof Audio!="undefined")try{var t=new Audio;typeof t.oncanplaythrough=="undefined"&&(e._canPlayEvent="canplay")}catch{e.noAudio=!0}else e.noAudio=!0;try{var t=new Audio;t.muted&&(e.noAudio=!0)}catch{}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,t=null;try{t=typeof Audio!="undefined"?new Audio:null}catch{return e}if(!t||typeof t.canPlayType!="function")return e;var r=t.canPlayType("audio/mpeg;").replace(/^no$/,""),a=e._navigator?e._navigator.userAgent:"",l=a.match(/OPR\/([0-6].)/g),d=l&&parseInt(l[0].split("/")[1],10)<33,s=a.indexOf("Safari")!==-1&&a.indexOf("Chrome")===-1,h=a.match(/Version\/(.*?) /),m=s&&h&&parseInt(h[1],10)<15;return e._codecs={mp3:!!(!d&&(r||t.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!r,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(t.canPlayType('audio/wav; codecs="1"')||t.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(t.canPlayType("audio/x-m4b;")||t.canPlayType("audio/m4b;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!m&&t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!m&&t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||n;if(!(e._audioUnlocked||!e.ctx)){e._audioUnlocked=!1,e.autoUnlock=!1,!e._mobileUnloaded&&e.ctx.sampleRate!==44100&&(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var t=function(r){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var a=new Audio;a._unlocked=!0,e._releaseHtml5Audio(a)}catch{e.noAudio=!0;break}for(var l=0;l<e._howls.length;l++)if(!e._howls[l]._webAudio)for(var d=e._howls[l]._getSoundIds(),s=0;s<d.length;s++){var h=e._howls[l]._soundById(d[s]);h&&h._node&&!h._node._unlocked&&(h._node._unlocked=!0,h._node.load())}e._autoResume();var m=e.ctx.createBufferSource();m.buffer=e._scratchBuffer,m.connect(e.ctx.destination),typeof m.start=="undefined"?m.noteOn(0):m.start(0),typeof e.ctx.resume=="function"&&e.ctx.resume(),m.onended=function(){m.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("click",t,!0),document.removeEventListener("keydown",t,!0);for(var y=0;y<e._howls.length;y++)e._howls[y]._emit("unlock")}};return document.addEventListener("touchstart",t,!0),document.addEventListener("touchend",t,!0),document.addEventListener("click",t,!0),document.addEventListener("keydown",t,!0),e}},_obtainHtml5Audio:function(){var e=this||n;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var t=new Audio().play();return t&&typeof Promise!="undefined"&&(t instanceof Promise||typeof t.then=="function")&&t.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(e){var t=this||n;return e._unlocked&&t._html5AudioPool.push(e),t},_autoSuspend:function(){var e=this;if(!(!e.autoSuspend||!e.ctx||typeof e.ctx.suspend=="undefined"||!n.usingWebAudio)){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio){for(var r=0;r<e._howls[t]._sounds.length;r++)if(!e._howls[t]._sounds[r]._paused)return e}return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){if(!!e.autoSuspend){e._suspendTimer=null,e.state="suspending";var a=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(a,a)}},3e4),e}},_autoResume:function(){var e=this;if(!(!e.ctx||typeof e.ctx.resume=="undefined"||!n.usingWebAudio))return e.state==="running"&&e.ctx.state!=="interrupted"&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):e.state==="suspended"||e.state==="running"&&e.ctx.state==="interrupted"?(e.ctx.resume().then(function(){e.state="running";for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):e.state==="suspending"&&(e._resumeAfterSuspend=!0),e}};var n=new c,i=function(e){var t=this;if(!e.src||e.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}t.init(e)};i.prototype={init:function(e){var t=this;return n.ctx||b(),t._autoplay=e.autoplay||!1,t._format=typeof e.format!="string"?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload=typeof e.preload=="boolean"||e.preload==="metadata"?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src=typeof e.src!="string"?e.src:[e.src],t._volume=e.volume!==void 0?e.volume:1,t._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:e.xhr&&e.xhr.withCredentials?e.xhr.withCredentials:!1},t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onunlock=e.onunlock?[{fn:e.onunlock}]:[],t._onresume=[],t._webAudio=n.usingWebAudio&&!t._html5,typeof n.ctx!="undefined"&&n.ctx&&n.autoUnlock&&n._unlockAudio(),n._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&t._preload!=="none"&&t.load(),t},load:function(){var e=this,t=null;if(n.noAudio){e._emit("loaderror",null,"No audio support.");return}typeof e._src=="string"&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var a,l;if(e._format&&e._format[r])a=e._format[r];else{if(l=e._src[r],typeof l!="string"){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}a=/^data:audio\/([^;,]+);/i.exec(l),a||(a=/\.([^.]+)$/.exec(l.split("?",1)[0])),a&&(a=a[1].toLowerCase())}if(a||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),a&&n.codecs(a)){t=e._src[r];break}}if(!t){e._emit("loaderror",null,"No codec support for selected audio sources.");return}return e._src=t,e._state="loading",window.location.protocol==="https:"&&t.slice(0,5)==="http:"&&(e._html5=!0,e._webAudio=!1),new o(e),e._webAudio&&f(e),e},play:function(e,t){var r=this,a=null;if(typeof e=="number")a=e,e=null;else{if(typeof e=="string"&&r._state==="loaded"&&!r._sprite[e])return null;if(typeof e=="undefined"&&(e="__default",!r._playLock)){for(var l=0,d=0;d<r._sounds.length;d++)r._sounds[d]._paused&&!r._sounds[d]._ended&&(l++,a=r._sounds[d]._id);l===1?e=null:a=null}}var s=a?r._soundById(a):r._inactiveSound();if(!s)return null;if(a&&!e&&(e=s._sprite||"__default"),r._state!=="loaded"){s._sprite=e,s._ended=!1;var h=s._id;return r._queue.push({event:"play",action:function(){r.play(h)}}),h}if(a&&!s._paused)return t||r._loadQueue("play"),s._id;r._webAudio&&n._autoResume();var m=Math.max(0,s._seek>0?s._seek:r._sprite[e][0]/1e3),y=Math.max(0,(r._sprite[e][0]+r._sprite[e][1])/1e3-m),w=y*1e3/Math.abs(s._rate),A=r._sprite[e][0]/1e3,k=(r._sprite[e][0]+r._sprite[e][1])/1e3;s._sprite=e,s._ended=!1;var L=function(){s._paused=!1,s._seek=m,s._start=A,s._stop=k,s._loop=!!(s._loop||r._sprite[e][2])};if(m>=k){r._ended(s);return}var v=s._node;if(r._webAudio){var X=function(){r._playLock=!1,L(),r._refreshBuffer(s);var T=s._muted||r._muted?0:s._volume;v.gain.setValueAtTime(T,n.ctx.currentTime),s._playStart=n.ctx.currentTime,typeof v.bufferSource.start=="undefined"?s._loop?v.bufferSource.noteGrainOn(0,m,86400):v.bufferSource.noteGrainOn(0,m,y):s._loop?v.bufferSource.start(0,m,86400):v.bufferSource.start(0,m,y),w!==1/0&&(r._endTimers[s._id]=setTimeout(r._ended.bind(r,s),w)),t||setTimeout(function(){r._emit("play",s._id),r._loadQueue()},0)};n.state==="running"&&n.ctx.state!=="interrupted"?X():(r._playLock=!0,r.once("resume",X),r._clearTimer(s._id))}else{var W=function(){v.currentTime=m,v.muted=s._muted||r._muted||n._muted||v.muted,v.volume=s._volume*n.volume(),v.playbackRate=s._rate;try{var T=v.play();if(T&&typeof Promise!="undefined"&&(T instanceof Promise||typeof T.then=="function")?(r._playLock=!0,L(),T.then(function(){r._playLock=!1,v._unlocked=!0,t?r._loadQueue():r._emit("play",s._id)}).catch(function(){r._playLock=!1,r._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),s._ended=!0,s._paused=!0})):t||(r._playLock=!1,L(),r._emit("play",s._id)),v.playbackRate=s._rate,v.paused){r._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}e!=="__default"||s._loop?r._endTimers[s._id]=setTimeout(r._ended.bind(r,s),w):(r._endTimers[s._id]=function(){r._ended(s),v.removeEventListener("ended",r._endTimers[s._id],!1)},v.addEventListener("ended",r._endTimers[s._id],!1))}catch(te){r._emit("playerror",s._id,te)}};v.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(v.src=r._src,v.load());var ee=window&&window.ejecta||!v.readyState&&n._navigator.isCocoonJS;if(v.readyState>=3||ee)W();else{r._playLock=!0,r._state="loading";var j=function(){r._state="loaded",W(),v.removeEventListener(n._canPlayEvent,j,!1)};v.addEventListener(n._canPlayEvent,j,!1),r._clearTimer(s._id)}}return s._id},pause:function(e){var t=this;if(t._state!=="loaded"||t._playLock)return t._queue.push({event:"pause",action:function(){t.pause(e)}}),t;for(var r=t._getSoundIds(e),a=0;a<r.length;a++){t._clearTimer(r[a]);var l=t._soundById(r[a]);if(l&&!l._paused&&(l._seek=t.seek(r[a]),l._rateSeek=0,l._paused=!0,t._stopFade(r[a]),l._node))if(t._webAudio){if(!l._node.bufferSource)continue;typeof l._node.bufferSource.stop=="undefined"?l._node.bufferSource.noteOff(0):l._node.bufferSource.stop(0),t._cleanBuffer(l._node)}else(!isNaN(l._node.duration)||l._node.duration===1/0)&&l._node.pause();arguments[1]||t._emit("pause",l?l._id:null)}return t},stop:function(e,t){var r=this;if(r._state!=="loaded"||r._playLock)return r._queue.push({event:"stop",action:function(){r.stop(e)}}),r;for(var a=r._getSoundIds(e),l=0;l<a.length;l++){r._clearTimer(a[l]);var d=r._soundById(a[l]);d&&(d._seek=d._start||0,d._rateSeek=0,d._paused=!0,d._ended=!0,r._stopFade(a[l]),d._node&&(r._webAudio?d._node.bufferSource&&(typeof d._node.bufferSource.stop=="undefined"?d._node.bufferSource.noteOff(0):d._node.bufferSource.stop(0),r._cleanBuffer(d._node)):(!isNaN(d._node.duration)||d._node.duration===1/0)&&(d._node.currentTime=d._start||0,d._node.pause(),d._node.duration===1/0&&r._clearSound(d._node))),t||r._emit("stop",d._id))}return r},mute:function(e,t){var r=this;if(r._state!=="loaded"||r._playLock)return r._queue.push({event:"mute",action:function(){r.mute(e,t)}}),r;if(typeof t=="undefined")if(typeof e=="boolean")r._muted=e;else return r._muted;for(var a=r._getSoundIds(t),l=0;l<a.length;l++){var d=r._soundById(a[l]);d&&(d._muted=e,d._interval&&r._stopFade(d._id),r._webAudio&&d._node?d._node.gain.setValueAtTime(e?0:d._volume,n.ctx.currentTime):d._node&&(d._node.muted=n._muted?!0:e),r._emit("mute",d._id))}return r},volume:function(){var e=this,t=arguments,r,a;if(t.length===0)return e._volume;if(t.length===1||t.length===2&&typeof t[1]=="undefined"){var l=e._getSoundIds(),d=l.indexOf(t[0]);d>=0?a=parseInt(t[0],10):r=parseFloat(t[0])}else t.length>=2&&(r=parseFloat(t[0]),a=parseInt(t[1],10));var s;if(typeof r!="undefined"&&r>=0&&r<=1){if(e._state!=="loaded"||e._playLock)return e._queue.push({event:"volume",action:function(){e.volume.apply(e,t)}}),e;typeof a=="undefined"&&(e._volume=r),a=e._getSoundIds(a);for(var h=0;h<a.length;h++)s=e._soundById(a[h]),s&&(s._volume=r,t[2]||e._stopFade(a[h]),e._webAudio&&s._node&&!s._muted?s._node.gain.setValueAtTime(r,n.ctx.currentTime):s._node&&!s._muted&&(s._node.volume=r*n.volume()),e._emit("volume",s._id))}else return s=a?e._soundById(a):e._sounds[0],s?s._volume:0;return e},fade:function(e,t,r,a){var l=this;if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"fade",action:function(){l.fade(e,t,r,a)}}),l;e=Math.min(Math.max(0,parseFloat(e)),1),t=Math.min(Math.max(0,parseFloat(t)),1),r=parseFloat(r),l.volume(e,a);for(var d=l._getSoundIds(a),s=0;s<d.length;s++){var h=l._soundById(d[s]);if(h){if(a||l._stopFade(d[s]),l._webAudio&&!h._muted){var m=n.ctx.currentTime,y=m+r/1e3;h._volume=e,h._node.gain.setValueAtTime(e,m),h._node.gain.linearRampToValueAtTime(t,y)}l._startFadeInterval(h,e,t,r,d[s],typeof a=="undefined")}}return l},_startFadeInterval:function(e,t,r,a,l,d){var s=this,h=t,m=r-t,y=Math.abs(m/.01),w=Math.max(4,y>0?a/y:a),A=Date.now();e._fadeTo=r,e._interval=setInterval(function(){var k=(Date.now()-A)/a;A=Date.now(),h+=m*k,h=Math.round(h*100)/100,m<0?h=Math.max(r,h):h=Math.min(r,h),s._webAudio?e._volume=h:s.volume(h,e._id,!0),d&&(s._volume=h),(r<t&&h<=r||r>t&&h>=r)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,s.volume(r,e._id),s._emit("fade",e._id))},w)},_stopFade:function(e){var t=this,r=t._soundById(e);return r&&r._interval&&(t._webAudio&&r._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(r._interval),r._interval=null,t.volume(r._fadeTo,e),r._fadeTo=null,t._emit("fade",e)),t},loop:function(){var e=this,t=arguments,r,a,l;if(t.length===0)return e._loop;if(t.length===1)if(typeof t[0]=="boolean")r=t[0],e._loop=r;else return l=e._soundById(parseInt(t[0],10)),l?l._loop:!1;else t.length===2&&(r=t[0],a=parseInt(t[1],10));for(var d=e._getSoundIds(a),s=0;s<d.length;s++)l=e._soundById(d[s]),l&&(l._loop=r,e._webAudio&&l._node&&l._node.bufferSource&&(l._node.bufferSource.loop=r,r&&(l._node.bufferSource.loopStart=l._start||0,l._node.bufferSource.loopEnd=l._stop,e.playing(d[s])&&(e.pause(d[s],!0),e.play(d[s],!0)))));return e},rate:function(){var e=this,t=arguments,r,a;if(t.length===0)a=e._sounds[0]._id;else if(t.length===1){var l=e._getSoundIds(),d=l.indexOf(t[0]);d>=0?a=parseInt(t[0],10):r=parseFloat(t[0])}else t.length===2&&(r=parseFloat(t[0]),a=parseInt(t[1],10));var s;if(typeof r=="number"){if(e._state!=="loaded"||e._playLock)return e._queue.push({event:"rate",action:function(){e.rate.apply(e,t)}}),e;typeof a=="undefined"&&(e._rate=r),a=e._getSoundIds(a);for(var h=0;h<a.length;h++)if(s=e._soundById(a[h]),s){e.playing(a[h])&&(s._rateSeek=e.seek(a[h]),s._playStart=e._webAudio?n.ctx.currentTime:s._playStart),s._rate=r,e._webAudio&&s._node&&s._node.bufferSource?s._node.bufferSource.playbackRate.setValueAtTime(r,n.ctx.currentTime):s._node&&(s._node.playbackRate=r);var m=e.seek(a[h]),y=(e._sprite[s._sprite][0]+e._sprite[s._sprite][1])/1e3-m,w=y*1e3/Math.abs(s._rate);(e._endTimers[a[h]]||!s._paused)&&(e._clearTimer(a[h]),e._endTimers[a[h]]=setTimeout(e._ended.bind(e,s),w)),e._emit("rate",s._id)}}else return s=e._soundById(a),s?s._rate:e._rate;return e},seek:function(){var e=this,t=arguments,r,a;if(t.length===0)e._sounds.length&&(a=e._sounds[0]._id);else if(t.length===1){var l=e._getSoundIds(),d=l.indexOf(t[0]);d>=0?a=parseInt(t[0],10):e._sounds.length&&(a=e._sounds[0]._id,r=parseFloat(t[0]))}else t.length===2&&(r=parseFloat(t[0]),a=parseInt(t[1],10));if(typeof a=="undefined")return 0;if(typeof r=="number"&&(e._state!=="loaded"||e._playLock))return e._queue.push({event:"seek",action:function(){e.seek.apply(e,t)}}),e;var s=e._soundById(a);if(s)if(typeof r=="number"&&r>=0){var h=e.playing(a);h&&e.pause(a,!0),s._seek=r,s._ended=!1,e._clearTimer(a),!e._webAudio&&s._node&&!isNaN(s._node.duration)&&(s._node.currentTime=r);var m=function(){h&&e.play(a,!0),e._emit("seek",a)};if(h&&!e._webAudio){var y=function(){e._playLock?setTimeout(y,0):m()};setTimeout(y,0)}else m()}else if(e._webAudio){var w=e.playing(a)?n.ctx.currentTime-s._playStart:0,A=s._rateSeek?s._rateSeek-s._seek:0;return s._seek+(A+w*Math.abs(s._rate))}else return s._node.currentTime;return e},playing:function(e){var t=this;if(typeof e=="number"){var r=t._soundById(e);return r?!r._paused:!1}for(var a=0;a<t._sounds.length;a++)if(!t._sounds[a]._paused)return!0;return!1},duration:function(e){var t=this,r=t._duration,a=t._soundById(e);return a&&(r=t._sprite[a._sprite][1]/1e3),r},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,r=0;r<t.length;r++)t[r]._paused||e.stop(t[r]._id),e._webAudio||(e._clearSound(t[r]._node),t[r]._node.removeEventListener("error",t[r]._errorFn,!1),t[r]._node.removeEventListener(n._canPlayEvent,t[r]._loadFn,!1),t[r]._node.removeEventListener("ended",t[r]._endFn,!1),n._releaseHtml5Audio(t[r]._node)),delete t[r]._node,e._clearTimer(t[r]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1);var l=!0;for(r=0;r<n._howls.length;r++)if(n._howls[r]._src===e._src||e._src.indexOf(n._howls[r]._src)>=0){l=!1;break}return u&&l&&delete u[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,t,r,a){var l=this,d=l["_on"+e];return typeof t=="function"&&d.push(a?{id:r,fn:t,once:a}:{id:r,fn:t}),l},off:function(e,t,r){var a=this,l=a["_on"+e],d=0;if(typeof t=="number"&&(r=t,t=null),t||r)for(d=0;d<l.length;d++){var s=r===l[d].id;if(t===l[d].fn&&s||!t&&s){l.splice(d,1);break}}else if(e)a["_on"+e]=[];else{var h=Object.keys(a);for(d=0;d<h.length;d++)h[d].indexOf("_on")===0&&Array.isArray(a[h[d]])&&(a[h[d]]=[])}return a},once:function(e,t,r){var a=this;return a.on(e,t,r,1),a},_emit:function(e,t,r){for(var a=this,l=a["_on"+e],d=l.length-1;d>=0;d--)(!l[d].id||l[d].id===t||e==="load")&&(setTimeout(function(s){s.call(this,t,r)}.bind(a,l[d].fn),0),l[d].once&&a.off(e,l[d].fn,l[d].id));return a._loadQueue(e),a},_loadQueue:function(e){var t=this;if(t._queue.length>0){var r=t._queue[0];r.event===e&&(t._queue.shift(),t._loadQueue()),e||r.action()}return t},_ended:function(e){var t=this,r=e._sprite;if(!t._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(t._ended.bind(t,e),100),t;var a=!!(e._loop||t._sprite[r][2]);if(t._emit("end",e._id),!t._webAudio&&a&&t.stop(e._id,!0).play(e._id),t._webAudio&&a){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var l=(e._stop-e._start)*1e3/Math.abs(e._rate);t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),l)}return t._webAudio&&!a&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),n._autoSuspend()),!t._webAudio&&!a&&t.stop(e._id,!0),t},_clearTimer:function(e){var t=this;if(t._endTimers[e]){if(typeof t._endTimers[e]!="function")clearTimeout(t._endTimers[e]);else{var r=t._soundById(e);r&&r._node&&r._node.removeEventListener("ended",t._endTimers[e],!1)}delete t._endTimers[e]}return t},_soundById:function(e){for(var t=this,r=0;r<t._sounds.length;r++)if(e===t._sounds[r]._id)return t._sounds[r];return null},_inactiveSound:function(){var e=this;e._drain();for(var t=0;t<e._sounds.length;t++)if(e._sounds[t]._ended)return e._sounds[t].reset();return new o(e)},_drain:function(){var e=this,t=e._pool,r=0,a=0;if(!(e._sounds.length<t)){for(a=0;a<e._sounds.length;a++)e._sounds[a]._ended&&r++;for(a=e._sounds.length-1;a>=0;a--){if(r<=t)return;e._sounds[a]._ended&&(e._webAudio&&e._sounds[a]._node&&e._sounds[a]._node.disconnect(0),e._sounds.splice(a,1),r--)}}},_getSoundIds:function(e){var t=this;if(typeof e=="undefined"){for(var r=[],a=0;a<t._sounds.length;a++)r.push(t._sounds[a]._id);return r}else return[e]},_refreshBuffer:function(e){var t=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=u[t._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,n.ctx.currentTime),t},_cleanBuffer:function(e){var t=this,r=n._navigator&&n._navigator.vendor.indexOf("Apple")>=0;if(n._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),r))try{e.bufferSource.buffer=n._scratchBuffer}catch{}return e.bufferSource=null,t},_clearSound:function(e){var t=/MSIE |Trident\//.test(n._navigator&&n._navigator.userAgent);t||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var o=function(e){this._parent=e,this.init()};o.prototype={init:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,t._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,r=n._muted||e._muted||e._parent._muted?0:e._volume;return t._webAudio?(e._node=typeof n.ctx.createGain=="undefined"?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(r,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):n.noAudio||(e._node=n._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=t._src,e._node.preload=t._preload===!0?"auto":t._preload,e._node.volume=r*n.volume(),e._node.load()),e},reset:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,t=e._parent;t._duration=Math.ceil(e._node.duration*10)/10,Object.keys(t._sprite).length===0&&(t._sprite={__default:[0,t._duration*1e3]}),t._state!=="loaded"&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,t=e._parent;t._duration===1/0&&(t._duration=Math.ceil(e._node.duration*10)/10,t._sprite.__default[1]===1/0&&(t._sprite.__default[1]=t._duration*1e3),t._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var u={},f=function(e){var t=e._src;if(u[t]){e._duration=u[t].duration,p(e);return}if(/^data:[^;]+;base64,/.test(t)){for(var r=atob(t.split(",")[1]),a=new Uint8Array(r.length),l=0;l<r.length;++l)a[l]=r.charCodeAt(l);_(a.buffer,e)}else{var d=new XMLHttpRequest;d.open(e._xhr.method,t,!0),d.withCredentials=e._xhr.withCredentials,d.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach(function(s){d.setRequestHeader(s,e._xhr.headers[s])}),d.onload=function(){var s=(d.status+"")[0];if(s!=="0"&&s!=="2"&&s!=="3"){e._emit("loaderror",null,"Failed loading audio file with status: "+d.status+".");return}_(d.response,e)},d.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete u[t],e.load())},g(d)}},g=function(e){try{e.send()}catch{e.onerror()}},_=function(e,t){var r=function(){t._emit("loaderror",null,"Decoding audio data failed.")},a=function(l){l&&t._sounds.length>0?(u[t._src]=l,p(t,l)):r()};typeof Promise!="undefined"&&n.ctx.decodeAudioData.length===1?n.ctx.decodeAudioData(e).then(a).catch(r):n.ctx.decodeAudioData(e,a,r)},p=function(e,t){t&&!e._duration&&(e._duration=t.duration),Object.keys(e._sprite).length===0&&(e._sprite={__default:[0,e._duration*1e3]}),e._state!=="loaded"&&(e._state="loaded",e._emit("load"),e._loadQueue())},b=function(){if(!!n.usingWebAudio){try{typeof AudioContext!="undefined"?n.ctx=new AudioContext:typeof webkitAudioContext!="undefined"?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch{n.usingWebAudio=!1}n.ctx||(n.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),t=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),r=t?parseInt(t[1],10):null;if(e&&r&&r<9){var a=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());n._navigator&&!a&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=typeof n.ctx.createGain=="undefined"?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.setValueAtTime(n._muted?0:n._volume,n.ctx.currentTime),n.masterGain.connect(n.ctx.destination)),n._setup()}};x.Howler=n,x.Howl=i,typeof M!="undefined"?(M.HowlerGlobal=c,M.Howler=n,M.Howl=i,M.Sound=o):typeof window!="undefined"&&(window.HowlerGlobal=c,window.Howler=n,window.Howl=i,window.Sound=o)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(n){var i=this;if(!i.ctx||!i.ctx.listener)return i;for(var o=i._howls.length-1;o>=0;o--)i._howls[o].stereo(n);return i},HowlerGlobal.prototype.pos=function(n,i,o){var u=this;if(!u.ctx||!u.ctx.listener)return u;if(i=typeof i!="number"?u._pos[1]:i,o=typeof o!="number"?u._pos[2]:o,typeof n=="number")u._pos=[n,i,o],typeof u.ctx.listener.positionX!="undefined"?(u.ctx.listener.positionX.setTargetAtTime(u._pos[0],Howler.ctx.currentTime,.1),u.ctx.listener.positionY.setTargetAtTime(u._pos[1],Howler.ctx.currentTime,.1),u.ctx.listener.positionZ.setTargetAtTime(u._pos[2],Howler.ctx.currentTime,.1)):u.ctx.listener.setPosition(u._pos[0],u._pos[1],u._pos[2]);else return u._pos;return u},HowlerGlobal.prototype.orientation=function(n,i,o,u,f,g){var _=this;if(!_.ctx||!_.ctx.listener)return _;var p=_._orientation;if(i=typeof i!="number"?p[1]:i,o=typeof o!="number"?p[2]:o,u=typeof u!="number"?p[3]:u,f=typeof f!="number"?p[4]:f,g=typeof g!="number"?p[5]:g,typeof n=="number")_._orientation=[n,i,o,u,f,g],typeof _.ctx.listener.forwardX!="undefined"?(_.ctx.listener.forwardX.setTargetAtTime(n,Howler.ctx.currentTime,.1),_.ctx.listener.forwardY.setTargetAtTime(i,Howler.ctx.currentTime,.1),_.ctx.listener.forwardZ.setTargetAtTime(o,Howler.ctx.currentTime,.1),_.ctx.listener.upX.setTargetAtTime(u,Howler.ctx.currentTime,.1),_.ctx.listener.upY.setTargetAtTime(f,Howler.ctx.currentTime,.1),_.ctx.listener.upZ.setTargetAtTime(g,Howler.ctx.currentTime,.1)):_.ctx.listener.setOrientation(n,i,o,u,f,g);else return p;return _},Howl.prototype.init=function(n){return function(i){var o=this;return o._orientation=i.orientation||[1,0,0],o._stereo=i.stereo||null,o._pos=i.pos||null,o._pannerAttr={coneInnerAngle:typeof i.coneInnerAngle!="undefined"?i.coneInnerAngle:360,coneOuterAngle:typeof i.coneOuterAngle!="undefined"?i.coneOuterAngle:360,coneOuterGain:typeof i.coneOuterGain!="undefined"?i.coneOuterGain:0,distanceModel:typeof i.distanceModel!="undefined"?i.distanceModel:"inverse",maxDistance:typeof i.maxDistance!="undefined"?i.maxDistance:1e4,panningModel:typeof i.panningModel!="undefined"?i.panningModel:"HRTF",refDistance:typeof i.refDistance!="undefined"?i.refDistance:1,rolloffFactor:typeof i.rolloffFactor!="undefined"?i.rolloffFactor:1},o._onstereo=i.onstereo?[{fn:i.onstereo}]:[],o._onpos=i.onpos?[{fn:i.onpos}]:[],o._onorientation=i.onorientation?[{fn:i.onorientation}]:[],n.call(this,i)}}(Howl.prototype.init),Howl.prototype.stereo=function(n,i){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"stereo",action:function(){o.stereo(n,i)}}),o;var u=typeof Howler.ctx.createStereoPanner=="undefined"?"spatial":"stereo";if(typeof i=="undefined")if(typeof n=="number")o._stereo=n,o._pos=[n,0,0];else return o._stereo;for(var f=o._getSoundIds(i),g=0;g<f.length;g++){var _=o._soundById(f[g]);if(_)if(typeof n=="number")_._stereo=n,_._pos=[n,0,0],_._node&&(_._pannerAttr.panningModel="equalpower",(!_._panner||!_._panner.pan)&&c(_,u),u==="spatial"?typeof _._panner.positionX!="undefined"?(_._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),_._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),_._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):_._panner.setPosition(n,0,0):_._panner.pan.setValueAtTime(n,Howler.ctx.currentTime)),o._emit("stereo",_._id);else return _._stereo}return o},Howl.prototype.pos=function(n,i,o,u){var f=this;if(!f._webAudio)return f;if(f._state!=="loaded")return f._queue.push({event:"pos",action:function(){f.pos(n,i,o,u)}}),f;if(i=typeof i!="number"?0:i,o=typeof o!="number"?-.5:o,typeof u=="undefined")if(typeof n=="number")f._pos=[n,i,o];else return f._pos;for(var g=f._getSoundIds(u),_=0;_<g.length;_++){var p=f._soundById(g[_]);if(p)if(typeof n=="number")p._pos=[n,i,o],p._node&&((!p._panner||p._panner.pan)&&c(p,"spatial"),typeof p._panner.positionX!="undefined"?(p._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),p._panner.positionY.setValueAtTime(i,Howler.ctx.currentTime),p._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):p._panner.setPosition(n,i,o)),f._emit("pos",p._id);else return p._pos}return f},Howl.prototype.orientation=function(n,i,o,u){var f=this;if(!f._webAudio)return f;if(f._state!=="loaded")return f._queue.push({event:"orientation",action:function(){f.orientation(n,i,o,u)}}),f;if(i=typeof i!="number"?f._orientation[1]:i,o=typeof o!="number"?f._orientation[2]:o,typeof u=="undefined")if(typeof n=="number")f._orientation=[n,i,o];else return f._orientation;for(var g=f._getSoundIds(u),_=0;_<g.length;_++){var p=f._soundById(g[_]);if(p)if(typeof n=="number")p._orientation=[n,i,o],p._node&&(p._panner||(p._pos||(p._pos=f._pos||[0,0,-.5]),c(p,"spatial")),typeof p._panner.orientationX!="undefined"?(p._panner.orientationX.setValueAtTime(n,Howler.ctx.currentTime),p._panner.orientationY.setValueAtTime(i,Howler.ctx.currentTime),p._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):p._panner.setOrientation(n,i,o)),f._emit("orientation",p._id);else return p._orientation}return f},Howl.prototype.pannerAttr=function(){var n=this,i=arguments,o,u,f;if(!n._webAudio)return n;if(i.length===0)return n._pannerAttr;if(i.length===1)if(typeof i[0]=="object")o=i[0],typeof u=="undefined"&&(o.pannerAttr||(o.pannerAttr={coneInnerAngle:o.coneInnerAngle,coneOuterAngle:o.coneOuterAngle,coneOuterGain:o.coneOuterGain,distanceModel:o.distanceModel,maxDistance:o.maxDistance,refDistance:o.refDistance,rolloffFactor:o.rolloffFactor,panningModel:o.panningModel}),n._pannerAttr={coneInnerAngle:typeof o.pannerAttr.coneInnerAngle!="undefined"?o.pannerAttr.coneInnerAngle:n._coneInnerAngle,coneOuterAngle:typeof o.pannerAttr.coneOuterAngle!="undefined"?o.pannerAttr.coneOuterAngle:n._coneOuterAngle,coneOuterGain:typeof o.pannerAttr.coneOuterGain!="undefined"?o.pannerAttr.coneOuterGain:n._coneOuterGain,distanceModel:typeof o.pannerAttr.distanceModel!="undefined"?o.pannerAttr.distanceModel:n._distanceModel,maxDistance:typeof o.pannerAttr.maxDistance!="undefined"?o.pannerAttr.maxDistance:n._maxDistance,refDistance:typeof o.pannerAttr.refDistance!="undefined"?o.pannerAttr.refDistance:n._refDistance,rolloffFactor:typeof o.pannerAttr.rolloffFactor!="undefined"?o.pannerAttr.rolloffFactor:n._rolloffFactor,panningModel:typeof o.pannerAttr.panningModel!="undefined"?o.pannerAttr.panningModel:n._panningModel});else return f=n._soundById(parseInt(i[0],10)),f?f._pannerAttr:n._pannerAttr;else i.length===2&&(o=i[0],u=parseInt(i[1],10));for(var g=n._getSoundIds(u),_=0;_<g.length;_++)if(f=n._soundById(g[_]),f){var p=f._pannerAttr;p={coneInnerAngle:typeof o.coneInnerAngle!="undefined"?o.coneInnerAngle:p.coneInnerAngle,coneOuterAngle:typeof o.coneOuterAngle!="undefined"?o.coneOuterAngle:p.coneOuterAngle,coneOuterGain:typeof o.coneOuterGain!="undefined"?o.coneOuterGain:p.coneOuterGain,distanceModel:typeof o.distanceModel!="undefined"?o.distanceModel:p.distanceModel,maxDistance:typeof o.maxDistance!="undefined"?o.maxDistance:p.maxDistance,refDistance:typeof o.refDistance!="undefined"?o.refDistance:p.refDistance,rolloffFactor:typeof o.rolloffFactor!="undefined"?o.rolloffFactor:p.rolloffFactor,panningModel:typeof o.panningModel!="undefined"?o.panningModel:p.panningModel};var b=f._panner;b?(b.coneInnerAngle=p.coneInnerAngle,b.coneOuterAngle=p.coneOuterAngle,b.coneOuterGain=p.coneOuterGain,b.distanceModel=p.distanceModel,b.maxDistance=p.maxDistance,b.refDistance=p.refDistance,b.rolloffFactor=p.rolloffFactor,b.panningModel=p.panningModel):(f._pos||(f._pos=n._pos||[0,0,-.5]),c(f,"spatial"))}return n},Sound.prototype.init=function(n){return function(){var i=this,o=i._parent;i._orientation=o._orientation,i._stereo=o._stereo,i._pos=o._pos,i._pannerAttr=o._pannerAttr,n.call(this),i._stereo?o.stereo(i._stereo):i._pos&&o.pos(i._pos[0],i._pos[1],i._pos[2],i._id)}}(Sound.prototype.init),Sound.prototype.reset=function(n){return function(){var i=this,o=i._parent;return i._orientation=o._orientation,i._stereo=o._stereo,i._pos=o._pos,i._pannerAttr=o._pannerAttr,i._stereo?o.stereo(i._stereo):i._pos?o.pos(i._pos[0],i._pos[1],i._pos[2],i._id):i._panner&&(i._panner.disconnect(0),i._panner=void 0,o._refreshBuffer(i)),n.call(this)}}(Sound.prototype.reset);var c=function(n,i){i=i||"spatial",i==="spatial"?(n._panner=Howler.ctx.createPanner(),n._panner.coneInnerAngle=n._pannerAttr.coneInnerAngle,n._panner.coneOuterAngle=n._pannerAttr.coneOuterAngle,n._panner.coneOuterGain=n._pannerAttr.coneOuterGain,n._panner.distanceModel=n._pannerAttr.distanceModel,n._panner.maxDistance=n._pannerAttr.maxDistance,n._panner.refDistance=n._pannerAttr.refDistance,n._panner.rolloffFactor=n._pannerAttr.rolloffFactor,n._panner.panningModel=n._pannerAttr.panningModel,typeof n._panner.positionX!="undefined"?(n._panner.positionX.setValueAtTime(n._pos[0],Howler.ctx.currentTime),n._panner.positionY.setValueAtTime(n._pos[1],Howler.ctx.currentTime),n._panner.positionZ.setValueAtTime(n._pos[2],Howler.ctx.currentTime)):n._panner.setPosition(n._pos[0],n._pos[1],n._pos[2]),typeof n._panner.orientationX!="undefined"?(n._panner.orientationX.setValueAtTime(n._orientation[0],Howler.ctx.currentTime),n._panner.orientationY.setValueAtTime(n._orientation[1],Howler.ctx.currentTime),n._panner.orientationZ.setValueAtTime(n._orientation[2],Howler.ctx.currentTime)):n._panner.setOrientation(n._orientation[0],n._orientation[1],n._orientation[2])):(n._panner=Howler.ctx.createStereoPanner(),n._panner.pan.setValueAtTime(n._stereo,Howler.ctx.currentTime)),n._panner.connect(n._node),n._paused||n._parent.pause(n._id,!0).play(n._id,!0)}})()})(J);const ie=1e3,S=-65*(Math.PI/180),se=1e3,I=new J.Howl({src:["sounds/rain-sound.mp3"],loop:!0});class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.rainEnabled=!1}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.canvas=this.shadowRoot.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=parseInt(window.getComputedStyle(this).width)*2,this.canvas.height=parseInt(window.getComputedStyle(this).height)*2;const c=1e4+Math.floor(Math.random()*6e3);setTimeout(()=>this.toggle(),c)}toggle(){if(!this.rainEnabled&&this.init(),this.rainEnabled=!this.rainEnabled,!this.rainEnabled){this.stopSound();const c=new CustomEvent("STOP_RAIN",{bubbles:!0,composed:!0});this.dispatchEvent(c)}}playSound(){setTimeout(()=>{I.play(),I.fade(0,1,2e3)},3e3)}stopSound(){I.fade(1,0,3e3),setTimeout(()=>I.stop(),3e3)}init(){this.playSound();const c=new CustomEvent("START_RAIN",{bubbles:!0,composed:!0});this.dispatchEvent(c),this.drops=[];for(let n=0;n<ie;n++){const i=Math.floor(Math.random()*15)+15;this.drops.push({x:Math.floor(Math.random()*this.canvas.width)+this.canvas.width,y:Math.floor(Math.random()*this.canvas.height)-this.canvas.height,size:Math.floor(Math.random()*15)+7,speed:i,color:`rgba(255, 255, 255, ${i/20})`})}clearInterval(this.timer),this.timer=setInterval(()=>this.loop(),50)}update(){this.drops.forEach(c=>{c.x-=c.speed*Math.cos(S),c.y-=c.speed*Math.sin(S);const n=c.x<0,i=c.y>this.canvas.height&&this.rainEnabled;n&&(c.x=this.canvas.width),i&&(c.y=0,c.x=Math.floor(Math.random()*this.canvas.width))})}loop(){this.update(),this.ctx.lineWidth=1,this.ctx.lineCap="round",this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drops.forEach(n=>{this.ctx.strokeStyle=n.color,this.ctx.beginPath(),this.ctx.moveTo(n.x,n.y);const i=n.x+n.size*Math.cos(S),o=n.y+n.size*Math.sin(S);this.ctx.lineTo(i,o),this.ctx.stroke()}),Math.floor(Math.random()*se)===0&&this.toggle()}render(){this.shadowRoot.innerHTML=`
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
    </div>`}}customElements.define("batmaxi-logo",D);class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){if(this.render(),Math.floor(Math.random()*2)===0)this.shadowRoot.querySelector(".logo").classList.add("batmanz");else{const n=document.createElement("batmaxi-logo");this.shadowRoot.querySelector(".logo").appendChild(n)}setTimeout(()=>this.destroy(),6e3)}destroy(){this.remove()}render(){this.shadowRoot.innerHTML=`
    <style>${G.styles}</style>
    <div class="signal">
      <div class="logo">
      </div>
      <div class="batman-trail"></div>
    </div>`}}customElements.define("batman-signal",G);class F extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${F.styles}</style>
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
    </div>`}}customElements.define("spheric-cow",F);class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}}customElements.define("cow-abduction",N);class $ extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {

      }

      .container {
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      }

      :host(.on) .light {
        background: linear-gradient(to bottom, #ffd70099, #ffd70011);
        width: 100%;
        height: 100%;
        position: absolute;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        z-index: 1;
        opacity: 1;
      }

      .stick {
        width: 6px;
        height: 100%;
        background: black;
        position: relative;
      }

      .light-ball {
        background: #aaa;
        width: 20px;
        height: 12px;
        border-radius: 25% 25% 50% 50%;
        position: absolute;
        z-index: 3;
        border-top: 8px solid #000;
      }

      .light {
        transition: var(--time, 1.5s) opacity;
        opacity: 0;
      }

      :host(.on) .light-ball {
        background: #fbffad;
      }

      :host(.on.blink) .light {
        animation: blink 2s infinite alternate;
      }

      @keyframes blink {
        0%, 24% { opacity: 1; }
        25% { opacity: 0.75; }
        27%, 36% { opacity: 1; }
        38% { opacity: 0.6; }
        39%, 49% { opacity: 1; }
        50% { opacity: 0.75; }
        55%, 64% { opacity: 1; }
        66% { opacity: 0.3; }
        69%, 75% { opacity: 1; }
        75% { opacity: 0.75; }
        76%, 100% { opacity: 1; }
      }
    `}turnOn(){const c=.25+Math.floor(Math.random()*3*100)/100;this.style.setProperty("--time",`${c}s`),this.classList.add("on")}turnOff(){this.classList.remove("on")}handleMoment(c){const n=c==="sunset",i=c==="dawn";n&&this.turnOn(),i&&this.turnOff()}blink(){const c=this.classList.contains("on"),n=2500+Math.floor(Math.random()*5e3);c&&this.classList.toggle("blink"),setTimeout(()=>this.blink(),n)}connectedCallback(){this.render(),setTimeout(()=>this.blink(),3500),addEventListener("DAY_MOMENT_CHANGE",c=>this.handleMoment(c.detail))}render(){this.shadowRoot.innerHTML=`
    <style>${$.styles}</style>
    <div class="container">
      <div class="light"></div>
      <div class="light-ball"></div>
      <div class="stick"></div>
    </div>`}}customElements.define("street-light",$);const U={ambulance:new Audio("sounds/ambulance.mp3"),police:new Audio("sounds/police.mp3")},E=["dawn","day","sunset","night"],le=6,de=1e4,ce=10,ue=5,fe=10,pe=5,he=6e3;class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.currentMoment=1}static get styles(){return`
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

      .sirens {
        width: 100%;
        height: 30px;
        position: absolute;
        z-index: 11;
      }

      .sirens .siren.police {
        --color-1: #f00a;
        --color-2: #00fa;
      }

      .sirens .siren.ambulance {
        --color-1: #ff4d00;
        --color-2: #ffb700;
      }

      .sirens .siren {
        width: 200px;
        height: 200%;
        background: linear-gradient(to right, transparent, var(--color-1), var(--color-2), transparent);
        background-repeat: no-repeat;
        animation:
          siren-spin 1s steps(1, end) infinite,
          move-siren 5s 1 linear forwards;
        -webkit-mask-image: linear-gradient(to bottom, transparent 10%, black, transparent 90%);
      }

      .sirens .siren.reverse {
        animation:
          siren-spin 1s steps(1, end) infinite,
          move-siren 5s 1 linear forwards reverse;
      }

      @keyframes siren-spin {
        0%, 100% { transform: rotateY(25deg); }
        50% { transform: rotateY(150deg); }
      }

      @keyframes move-siren {
        0% { translate: -300px 0; }
        100% { translate: 550px 0; }
      }

      .street {
        width: 100%;
        height: 60px;
        position: absolute;
        z-index: 10;

        display: flex;
        justify-content: space-evenly;
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
    `}connectedCallback(){this.render(),setInterval(()=>this.changeStage(),de),setInterval(()=>this.enableRandomEvents(),he),this.addEventListener("STOP_RAIN",()=>this.currentMoment<2&&this.showRainbow())}enableRandomEvents(){Math.floor(Math.random()*ue)&&this.currentMoment===3&&this.showBatmanSignal(),Math.floor(Math.random()*fe)===0&&this.showCowAbduction(),Math.floor(Math.random()*pe)===0&&this.enableSiren()}generateBuildings(){return"<building-city></building-city>".repeat(le)}generateStreetLight(){const c=2+Math.floor(Math.random()*3);return"<street-light></street-light>".repeat(c)}generateClouds(){return"<cloud-city></cloud-city>".repeat(ce)}showRainbow(){const c=document.createElement("rainbow-city");this.shadowRoot.querySelector(".clouds").appendChild(c)}showBatmanSignal(){const c=document.createElement("batman-signal");this.shadowRoot.querySelector(".clouds").insertAdjacentElement("afterend",c)}showCowAbduction(){const c=document.createElement("cow-abduction");this.shadowRoot.querySelector(".sun").insertAdjacentElement("beforebegin",c)}enableSiren(){const c=this.shadowRoot.querySelector(".sirens");if(c.querySelector(".siren"))return;const i=document.createElement("div"),o=Math.floor(Math.random()*2),u=Math.floor(Math.random()*2),f=["ambulance","police"][o];i.classList.add("siren",f),u===0&&i.classList.add("reverse"),c.appendChild(i),U[f].currentTime=0,U[f].play(),setTimeout(()=>this.disableSiren(),6e3)}disableSiren(){const c=this.shadowRoot.querySelector(".sirens .siren");c&&c.remove()}changeStage(){this.classList.remove(E[this.currentMoment]),this.currentMoment=(this.currentMoment+1)%E.length,this.classList.add(E[this.currentMoment]);const c=new CustomEvent("DAY_MOMENT_CHANGE",{detail:E[this.currentMoment],bubbles:!0,composed:!0});this.dispatchEvent(c)}render(){this.shadowRoot.innerHTML=`
    <style>${q.styles}</style>
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
      <div class="sirens">
      </div>
      <div class="street">
        ${this.generateStreetLight()}
      </div>
    </div>`}}customElements.define("weather-city",q);class V extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    </div>`}}customElements.define("manzdev-status",V);const O=[{image:"manzdev.png",description:""},{image:"manz-streamer.png",description:""},{image:"rainmanz.png",description:""}];class Y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.currentManz=0}static get styles(){return`
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
    <style>${Y.styles}</style>
    <div class="container">
      <weather-city class="day"></weather-city>
      <manzdev-status class="normal" image="manzdev.png" text="\xA1Qu\xE9 buen d\xEDa se ha quedado! Preparar\xE9 mis cosas para dar un paseo..."></manzdev-status>
      <manzdev-status class="rain hide" image="rainmanz.png" text="Bueno, mejor sigo en stream un rato hasta que pare de llover..."></manzdev-status>
    </div>`}}customElements.define("weather-card",Y);const _e=x=>{const c={dawn:"#6767b4",day:"#4c4c9b",sunset:" #3d3d61",night:"#3b4f5e"};document.documentElement.style.setProperty("--bgcolor",c[x])};addEventListener("DAY_MOMENT_CHANGE",x=>_e(x.detail));
