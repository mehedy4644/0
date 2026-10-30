void(function(){
  "use strict";

  var API_URL = "https://zxi-file-loader.ah4734536.workers.dev?file=zxi.txt&key=Hey&user=2";
  var DURATION = 90;

  var style = document.createElement("style");
  style.textContent = `
  #ak-wait-overlay,*{box-sizing:border-box}
  #ak-wait-overlay{
    position:fixed;inset:0;z-index:2147483647;display:flex;
    align-items:center;justify-content:center;padding:22px;
    background:rgba(0,0,0,.96);backdrop-filter:blur(14px);
    font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#fff;
  }
  #ak-wait-card{
    width:100%;max-width:430px;padding:30px 24px 24px;
    border:1px solid #333;border-radius:28px;text-align:center;
    background:linear-gradient(155deg,#1b1b1b,#070707 75%);
    box-shadow:0 24px 70px #000b,inset 0 1px #ffffff20;
  }
  #ak-wait-icon{
    width:62px;height:62px;margin:0 auto 16px;border-radius:19px;
    display:grid;place-items:center;font-size:27px;
    background:linear-gradient(145deg,#303030,#090909);
    border:1px solid #ffffff20;
  }
  #ak-wait-title{margin:0;font-size:23px;font-weight:750}
  #ak-wait-sub{margin:9px 0 25px;color:#999;font-size:13px;line-height:1.6}
  #ak-wait-enter{
    position:relative;overflow:hidden;
    width:100%;height:78px;margin-top:11px;padding:0 18px;
    border:1px solid #555;border-radius:22px;
    color:#f5f5f5;font-size:15px;font-weight:700;letter-spacing:.3px;
    background:linear-gradient(180deg,#454545 0%,#292929 35%,#111 78%,#080808 100%);
    box-shadow:inset 0 2px 0 rgba(255,255,255,.20),
      inset 0 -2px 5px rgba(0,0,0,.65),0 7px 16px rgba(0,0,0,.45);
    cursor:pointer;
    transition:transform .12s ease,filter .18s ease,
      border-color .18s ease,box-shadow .18s ease;
    background-size:100% 100%;
  }
  #ak-wait-enter:before{
    content:'';position:absolute;left:9%;right:9%;top:5px;height:24px;
    border-radius:18px;
    background:linear-gradient(180deg,rgba(255,255,255,.24),rgba(255,255,255,0));
    pointer-events:none;
  }
  #ak-wait-enter:hover{filter:brightness(1.12)}
  #ak-wait-enter:active{transform:translateY(1px)}
  #ak-wait-enter.ak-active{
    border-color:#ff7a18;
    background:linear-gradient(180deg,#ffad62 0%,#ff7a18 28%,#ff4b00 72%,#e63800 100%);
    box-shadow:inset 0 2px 0 rgba(255,255,255,.42),
      inset 0 -3px 7px rgba(130,25,0,.45),0 8px 22px rgba(255,82,0,.24);
  }
  #ak-wait-enter.ak-active:before{
    background:linear-gradient(180deg,rgba(255,255,255,.42),rgba(255,255,255,0));
  }
  #ak-wait-enter:disabled{opacity:1;cursor:default}
  #ak-wait-error{display:none;margin-top:16px;color:#ffb3a8;font-size:12px;line-height:1.5}
  `;
  (document.head || document.documentElement).appendChild(style);

  var overlay = document.createElement("div");
  overlay.id = "ak-wait-overlay";
  overlay.innerHTML = `
    <main id="ak-wait-card">
      <div id="ak-wait-icon">✦</div>
      <h2 id="ak-wait-title">XTEAM</h2>
      <p id="ak-wait-sub">Press ENTER to begin. Please keep this page open until the timer finishes.</p>
      <button id="ak-wait-enter" type="button">ENTER</button>
      <p id="ak-wait-error"></p>
      <p id="ak-wait-foot">telegram : @mehedy4644</p>
    </main>
  `;
  (document.body || document.documentElement).appendChild(overlay);

  var enter = overlay.querySelector("#ak-wait-enter");
  var errorBox = overlay.querySelector("#ak-wait-error");
  var started = false;
  var startTime = 0;

  function showError(message) {
    errorBox.textContent = "Redirect failed: " + message;
    errorBox.style.display = "block";
    enter.textContent = "RETRY";
    enter.classList.remove("ak-active");
    enter.style.background = "";
    enter.disabled = false;
    enter.style.display = "block";
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

    var filled = pct.toFixed(2) + "%";
    enter.style.background =
      "linear-gradient(90deg,#ffad62 0%,#ff7a18 55%,#e63800 100%) 0 0 / " +
      filled + " 100% no-repeat, linear-gradient(180deg,#454545 0%,#292929 35%,#111 78%,#080808 100%)";
    enter.textContent = "PROCESSING  ·  " + Math.floor(pct) + "%";

    if (elapsed >= DURATION) {
      started = false;
      enter.textContent = "CONNECTING TO API…";
      enter.style.background =
        "linear-gradient(90deg,#ffad62 0%,#ff7a18 48%,#e63800 100%)";

      getRedirectUrl().then(function(url) {
        enter.textContent = "REDIRECTING…";
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
    enter.classList.add("ak-active");
    enter.textContent = "PROCESSING  ·  0%";
    enter.style.display = "block";
    enter.style.background =
      "linear-gradient(90deg,#ffad62 0%,#ff7a18 0%,#292929 0%,#080808 100%)";
    errorBox.style.display = "none";
    overlay.querySelector("#ak-wait-title").textContent = "XTEAM";
    overlay.querySelector("#ak-wait-sub").textContent =
      "Your countdown has started. The page will continue automatically when it finishes.";
    startTime = 0;
    requestAnimationFrame(animate);
  });
}());