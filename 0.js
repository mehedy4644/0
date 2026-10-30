void(function(){
  "use strict";

  var API_URL = "https://zxi-file-loader.ah4734536.workers.dev?file=zxi.txt&key=Hey&user=2";
  var DURATION = 10;

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
    width:100%;height:58px;border:1px solid #555;border-radius:17px;
    color:white;font-size:15px;font-weight:700;letter-spacing:1px;
    background:linear-gradient(180deg,#454545,#111);
    box-shadow:inset 0 1px #ffffff30,0 8px 20px #0008;cursor:pointer;
  }
  #ak-wait-enter:active{transform:scale(.99)}
  #ak-wait-progress-wrap{display:none;margin-top:25px;text-align:left}
  #ak-wait-status{display:flex;justify-content:space-between;gap:10px;
    color:#bbb;font-size:12px;margin-bottom:10px}
  #ak-wait-track{height:10px;border-radius:20px;overflow:hidden;
    background:#292929;border:1px solid #414141}
  #ak-wait-bar{height:100%;width:0%;border-radius:20px;
    background:linear-gradient(90deg,#ff7a18,#ffc078);
    box-shadow:0 0 14px #ff7a1866;transition:width .15s linear}
  #ak-wait-count{margin:20px 0 0;font-size:38px;font-weight:800;
    font-variant-numeric:tabular-nums;letter-spacing:1px}
  #ak-wait-note{margin:8px 0 0;color:#777;font-size:11px}
  #ak-wait-foot{margin:24px 0 0;color:#666;font-size:10px;letter-spacing:.7px}
  #ak-wait-error{display:none;margin-top:16px;color:#ffb3a8;font-size:12px;line-height:1.5}
  `;
  (document.head || document.documentElement).appendChild(style);

  var overlay = document.createElement("div");
  overlay.id = "ak-wait-overlay";
  overlay.innerHTML = `
    <main id="ak-wait-card">
      <div id="ak-wait-icon">✦</div>
      <h2 id="ak-wait-title">WELCOME</h2>
      <p id="ak-wait-sub">Press ENTER to begin. Please keep this page open until the timer finishes.</p>
      <button id="ak-wait-enter" type="button">ENTER</button>
      <section id="ak-wait-progress-wrap">
        <div id="ak-wait-status"><span id="ak-wait-label">Preparing…</span><strong id="ak-wait-percent">0%</strong></div>
        <div id="ak-wait-track"><div id="ak-wait-bar"></div></div>
        <div id="ak-wait-count">${DURATION}</div>
        <p id="ak-wait-note">Please wait while the countdown completes</p>
        <p id="ak-wait-error"></p>
      </section>
      <p id="ak-wait-foot">PLEASE DO NOT CLOSE THIS PAGE</p>
    </main>
  `;
  (document.body || document.documentElement).appendChild(overlay);

  var enter = overlay.querySelector("#ak-wait-enter");
  var progressWrap = overlay.querySelector("#ak-wait-progress-wrap");
  var bar = overlay.querySelector("#ak-wait-bar");
  var percent = overlay.querySelector("#ak-wait-percent");
  var count = overlay.querySelector("#ak-wait-count");
  var label = overlay.querySelector("#ak-wait-label");
  var errorBox = overlay.querySelector("#ak-wait-error");
  var started = false;
  var startTime = 0;

  function showError(message) {
    label.textContent = "Redirect failed";
    errorBox.textContent = message;
    errorBox.style.display = "block";
    enter.textContent = "RETRY";
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
    var remaining = Math.max(0, Math.ceil(DURATION - elapsed));
    var pct = Math.min(100, (elapsed / DURATION) * 100);

    bar.style.width = pct.toFixed(2) + "%";
    percent.textContent = Math.floor(pct) + "%";
    count.textContent = remaining;
    label.textContent = remaining ? "Please wait…" : "Complete";

    if (elapsed >= DURATION) {
      started = false;
      count.textContent = "100%";
      label.textContent = "Connecting to API…";

      getRedirectUrl().then(function(url) {
        label.textContent = "Redirecting…";
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
    enter.style.display = "none";
    errorBox.style.display = "none";
    progressWrap.style.display = "block";
    overlay.querySelector("#ak-wait-title").textContent = "PROCESSING";
    overlay.querySelector("#ak-wait-sub").textContent =
      "Your countdown has started. The page will continue automatically when it finishes.";
    count.textContent = DURATION;
    bar.style.width = "0%";
    percent.textContent = "0%";
    startTime = 0;
    requestAnimationFrame(animate);
  });
}());