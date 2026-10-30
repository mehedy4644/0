void(function(){
  "use strict";

  var API_URL = "https://zxi-file-loader.ah4734536.workers.dev?file=zxi.txt&key=Hey&user=0";
  var DURATION = 90;

  var style = document.createElement("style");
  style.textContent = `
  #ak-wait-overlay,#ak-wait-overlay *{box-sizing:border-box}
  #ak-wait-overlay{
    position:fixed;inset:0;z-index:2147483647;display:flex;
    align-items:center;justify-content:center;padding:22px;
    overflow:hidden;color:#f7f7ff;
    background:
      radial-gradient(ellipse at 18% 18%,rgba(91,67,190,.26),transparent 42%),
      radial-gradient(ellipse at 85% 82%,rgba(20,166,190,.16),transparent 40%),
      #080a16;
    font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
    isolation:isolate;
  }
  #ak-wait-overlay:before,#ak-wait-overlay:after{
    content:"";position:absolute;width:260px;height:260px;border-radius:50%;
    border:1px solid rgba(160,145,255,.12);pointer-events:none;z-index:-1;
    animation:ak-drift 12s ease-in-out infinite alternate;
  }
  #ak-wait-overlay:before{top:-115px;left:-90px;box-shadow:0 0 90px rgba(110,83,255,.12)}
  #ak-wait-overlay:after{right:-130px;bottom:-120px;width:330px;height:330px;animation-delay:-5s}
  #ak-wait-card{
    position:relative;width:100%;max-width:390px;padding:30px 25px 24px;
    overflow:hidden;text-align:center;border-radius:30px;
    border:1px solid rgba(190,185,255,.19);
    background:linear-gradient(145deg,rgba(30,31,59,.94),rgba(13,16,34,.97) 68%);
    box-shadow:0 28px 90px rgba(0,0,0,.58),inset 0 1px 0 rgba(255,255,255,.09);
    animation:ak-card-in .7s cubic-bezier(.2,.8,.2,1) both;
  }
  #ak-wait-card:before{
    content:"";position:absolute;left:12%;right:12%;top:0;height:1px;
    background:linear-gradient(90deg,transparent,#9e91ff,transparent);opacity:.8;
  }
  #ak-wait-brand{
    display:flex;align-items:center;justify-content:center;gap:8px;
    color:#aaa6d8;font-size:10px;font-weight:800;letter-spacing:3px;
  }
  #ak-wait-brand-dot{
    width:6px;height:6px;border-radius:50%;background:#a99aff;
    box-shadow:0 0 12px #a99aff;
  }
  #ak-wait-orbit{
    position:relative;width:116px;height:116px;margin:25px auto 20px;
    display:grid;place-items:center;border-radius:50%;
    background:radial-gradient(circle,rgba(117,94,255,.23),rgba(117,94,255,.035) 65%,transparent 68%);
  }
  #ak-wait-orbit:before,#ak-wait-orbit:after{
    content:"";position:absolute;inset:5px;border:1px solid rgba(166,151,255,.28);
    border-radius:50%;animation:ak-spin 9s linear infinite;
  }
  #ak-wait-orbit:after{
    inset:15px;border-color:rgba(87,213,232,.32);
    border-style:dashed;animation:ak-spin 14s linear infinite reverse;
  }
  #ak-wait-orbit-core{
    position:relative;z-index:1;width:66px;height:66px;border-radius:22px;
    display:grid;place-items:center;font-size:29px;color:#fff;
    background:linear-gradient(145deg,#8e7bff,#5143b7 58%,#28245e);
    box-shadow:0 8px 30px rgba(111,89,255,.42),inset 0 1px 0 rgba(255,255,255,.4);
    animation:ak-float 3s ease-in-out infinite;
  }
  #ak-wait-title{margin:0;font-size:27px;line-height:1.15;font-weight:850;letter-spacing:1.5px}
  #ak-wait-sub{margin:10px 0 24px;color:#a5a6c3;font-size:12px;line-height:1.7;letter-spacing:1.15px}
  #ak-wait-enter{
    position:relative;display:flex;align-items:center;justify-content:center;gap:10px;
    width:100%;height:58px;margin:0;padding:0 18px;overflow:hidden;
    border:1px solid rgba(255,255,255,.25);border-radius:17px;
    color:#fff;font-size:13px;font-weight:850;letter-spacing:1.8px;
    background:linear-gradient(105deg,#7865f6,#5747d1 52%,#397fc9);
    box-shadow:0 10px 28px rgba(91,76,218,.32),inset 0 1px 0 rgba(255,255,255,.3);
    cursor:pointer;transition:transform .2s ease,filter .2s ease,box-shadow .2s ease;
    -webkit-tap-highlight-color:transparent;
  }
  #ak-wait-enter:before{
    content:"";position:absolute;top:-80%;left:-45%;width:35%;height:260%;
    transform:rotate(25deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);
    animation:ak-shimmer 3.5s ease-in-out infinite;pointer-events:none;
  }
  #ak-wait-enter:active{transform:scale(.975)}
  #ak-wait-enter:hover{filter:brightness(1.12);box-shadow:0 12px 34px rgba(104,88,245,.46)}
  #ak-wait-enter.ak-processing{
    border-color:rgba(111,220,255,.5);
    background:linear-gradient(105deg,#267fae,#4265ce 52%,#6652d9);
    box-shadow:0 8px 30px rgba(58,151,220,.25),inset 0 1px 0 rgba(255,255,255,.25);
  }
  #ak-wait-enter:disabled{opacity:1;cursor:default}
  #ak-wait-arrow{font-size:17px;line-height:1}
  #ak-wait-progress-wrap{height:5px;margin:19px 2px 0;overflow:hidden;border-radius:10px;background:rgba(255,255,255,.09)}
  #ak-wait-progress{
    width:0%;height:100%;border-radius:10px;
    background:linear-gradient(90deg,#55d7e9,#8d7cff,#c3a4ff);
    box-shadow:0 0 13px rgba(117,158,255,.65);
    transition:width .08s linear;
  }
  #ak-wait-status{
    display:flex;justify-content:space-between;gap:10px;margin:9px 2px 0;
    color:#777d9e;font-size:10px;font-weight:700;letter-spacing:1px;
  }
  #ak-wait-error{display:none;margin:15px 0 0;padding:10px 12px;border:1px solid rgba(255,117,117,.25);border-radius:12px;background:rgba(150,40,55,.12);color:#ffaaaF;font-size:11px;line-height:1.5;overflow-wrap:anywhere}
  #ak-wait-foot{margin:22px 0 0;color:#777b9b;font-size:10px;letter-spacing:.6px}
  #ak-wait-foot span{color:#aaa1ff}
  #ak-wait-overlay.ak-busy #ak-wait-orbit:before{animation-duration:2s;border-color:rgba(105,220,255,.65)}
  #ak-wait-overlay.ak-busy #ak-wait-orbit-core{animation-duration:.8s;box-shadow:0 0 34px rgba(77,199,255,.55),inset 0 1px 0 rgba(255,255,255,.4)}
  @keyframes ak-spin{to{transform:rotate(360deg)}}
  @keyframes ak-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  @keyframes ak-shimmer{0%,35%{left:-45%}75%,100%{left:125%}}
  @keyframes ak-card-in{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes ak-drift{from{transform:translate(0,0) scale(1)}to{transform:translate(28px,24px) scale(1.12)}}
  @media(prefers-reduced-motion:reduce){
    #ak-wait-overlay *,#ak-wait-overlay:before,#ak-wait-overlay:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important}
  }
  `;
  (document.head || document.documentElement).appendChild(style);

  var overlay = document.createElement("div");
  overlay.id = "ak-wait-overlay";
  overlay.innerHTML = `
    <main id="ak-wait-card">
      <div id="ak-wait-brand"><i id="ak-wait-brand-dot"></i> XTEAM ACCESS</div>
      <div id="ak-wait-orbit"><div id="ak-wait-orbit-core">✦</div></div>
      <h2 id="ak-wait-title">XTEAM</h2>
      <p id="ak-wait-sub">AINCRAD KEY BYPASS<br>SECURE ACCESS GATEWAY</p>
      <button id="ak-wait-enter" type="button">
        <span id="ak-wait-button-label">GET KEY</span><span id="ak-wait-arrow">↗</span>
      </button>
      <div id="ak-wait-progress-wrap"><div id="ak-wait-progress"></div></div>
      <div id="ak-wait-status"><span id="ak-wait-status-text">READY WHEN YOU ARE</span><span id="ak-wait-percent">0%</span></div>
      <p id="ak-wait-error"></p>
      <p id="ak-wait-foot">TELEGRAM <span>@mehedy4644</span></p>
    </main>
  `;
  (document.body || document.documentElement).appendChild(overlay);

  var enter = overlay.querySelector("#ak-wait-enter");
  var buttonLabel = overlay.querySelector("#ak-wait-button-label");
  var arrow = overlay.querySelector("#ak-wait-arrow");
  var errorBox = overlay.querySelector("#ak-wait-error");
  var progress = overlay.querySelector("#ak-wait-progress");
  var percent = overlay.querySelector("#ak-wait-percent");
  var statusText = overlay.querySelector("#ak-wait-status-text");
  var started = false;
  var startTime = 0;

  function showError(message) {
    errorBox.textContent = "Redirect failed: " + message;
    errorBox.style.display = "block";
    buttonLabel.textContent = "TRY AGAIN";
    arrow.textContent = "↻";
    enter.classList.remove("ak-processing");
    enter.disabled = false;
    overlay.classList.remove("ak-busy");
    statusText.textContent = "CONNECTION INTERRUPTED";
    started = false;
  }

  function getRedirectUrl() {
    return fetch(API_URL, {
      method: "GET",
      cache: "no-store",
      redirect: "follow"
    }).then(function(response) {
      if (!response.ok) throw new Error("API request failed (" + response.status + ")");
      return response.text();
    }).then(function(value) {
      var url = value.trim().replace(/^["']|["']$/g, "");
      if (!/^https?:\/\/[^\s"'<>]+$/i.test(url)) {
        throw new Error("API did not return a valid direct URL.");
      }
      return url;
    });
  }

  function animate(now) {
    if (!started) return;
    if (!startTime) startTime = now;

    var elapsed = Math.min((now - startTime) / 1000, DURATION);
    var pct = Math.min(100, (elapsed / DURATION) * 100);
    progress.style.width = pct.toFixed(2) + "%";
    percent.textContent = Math.floor(pct) + "%";

    if (elapsed >= DURATION) {
      started = false;
      buttonLabel.textContent = "CONNECTING...";
      arrow.textContent = "◌";
      statusText.textContent = "CONTACTING SECURE API";
      progress.style.width = "100%";

      getRedirectUrl().then(function(url) {
        buttonLabel.textContent = "REDIRECTING...";
        statusText.textContent = "ACCESS GRANTED";
        window.location.assign(url);
      }).catch(function(error) {
        showError(error && error.message ? error.message : "Unable to retrieve redirect URL.");
      });
      return;
    }

    requestAnimationFrame(animate);
  }

  enter.addEventListener("click", function() {
    if (started) return;
    started = true;
    enter.disabled = true;
    enter.classList.add("ak-processing");
    overlay.classList.add("ak-busy");
    buttonLabel.textContent = "PROCESSING";
    arrow.textContent = "◌";
    errorBox.style.display = "none";
    statusText.textContent = "PREPARING SECURE ACCESS";
    progress.style.width = "0%";
    percent.textContent = "0%";
    startTime = 0;
    requestAnimationFrame(animate);
  });
}());
