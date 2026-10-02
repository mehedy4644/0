void(function(){
var S="eyJnZXRrZXlfaW5pdGlhdGVkX2F0IjoxNzg5Mzc2Mzc1NDQxLCJnZXRrZXlfY29tcGxldGVkIjpmYWxzZSwiYmFubmVkIjpmYWxzZX0%3D.m27QGejM%2Fe1p1g6eksDF6XfcPxFbVEsWWDmUbQFjxaM";
if(document.cookie.indexOf("__session=")===-1){document.cookie="__session="+S+"; path=/; max-age=86400; SameSite=Lax";}
function getExpiryBD(){var d=new Date(Date.now()+86400000);return d.toLocaleString("en-US",{timeZone:"Asia/Dhaka",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true})}
var overlay=document.createElement("div");
overlay.style.cssText="position:fixed;inset:0;width:100%;height:100%;box-sizing:border-box;background:rgba(0,0,0,.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;padding:22px;opacity:0;transition:opacity .28s ease";
var style=document.createElement("style");
style.textContent="*{box-sizing:border-box}.ak-shell{width:100%;max-width:430px;border-radius:30px;padding:1px;background:linear-gradient(145deg,#3b3b3b,#111 35%,#050505 70%,#353535);box-shadow:0 24px 70px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.18);overflow:hidden}.ak-card{position:relative;border-radius:29px;padding:28px 24px 22px;background:linear-gradient(160deg,#171717 0%,#0b0b0b 48%,#030303 100%);overflow:hidden}.ak-card:before{content:'';position:absolute;left:7%;right:7%;top:0;height:90px;background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,0));border-radius:0 0 50% 50%;pointer-events:none}.ak-top{position:relative;text-align:center;margin-bottom:24px}.ak-icon{width:58px;height:58px;margin:0 auto 13px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#252525,#090909);border:1px solid rgba(255,255,255,.12);box-shadow:inset 0 2px 8px rgba(255,255,255,.12),0 8px 24px rgba(0,0,0,.45);font-size:25px}.ak-title{margin:0;color:#fff;font-size:21px;font-weight:700;letter-spacing:.2px}.ak-sub{margin:7px 0 0;color:#888;font-size:12px;letter-spacing:.4px}.ak-info{position:relative;background:linear-gradient(145deg,#151515,#080808);border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:15px;margin-bottom:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}.ak-label{margin:0 0 7px;color:#777;font-size:10px;text-transform:uppercase;letter-spacing:1.5px}.ak-value{margin:0;color:#f2f2f2;font-family:monospace;font-size:13px;line-height:1.55;word-break:break-all}.ak-exp{position:relative;margin-bottom:18px;padding:12px 14px;border-radius:15px;text-align:center;background:linear-gradient(145deg,#181818,#090909);border:1px solid rgba(255,255,255,.08);color:#aaa;font-size:11px}.ak-exp b{color:#e8e8e8;font-weight:600}.ak-btn{position:relative;width:100%;height:62px;margin-top:11px;padding:0 18px;border:1px solid #353535;border-radius:22px;background:linear-gradient(180deg,#3b3b3b 0%,#242424 26%,#0c0c0c 72%,#050505 100%);color:#f5f5f5;font-size:15px;font-weight:600;letter-spacing:.2px;cursor:pointer;box-shadow:inset 0 2px 0 rgba(255,255,255,.20),inset 0 -2px 5px rgba(0,0,0,.65),0 7px 16px rgba(0,0,0,.45);transition:background .18s ease,border-color .18s ease,transform .12s ease,box-shadow .18s ease}.ak-btn:before{content:'';position:absolute;left:9%;right:9%;top:5px;height:24px;border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,0));pointer-events:none}.ak-btn:active{transform:translateY(1px)}.ak-btn.ak-active{border-color:#ff7a18;background:linear-gradient(180deg,#ffad62 0%,#ff7a18 28%,#ff4b00 72%,#e63800 100%);box-shadow:inset 0 2px 0 rgba(255,255,255,.42),inset 0 -3px 7px rgba(130,25,0,.45),0 8px 22px rgba(255,82,0,.24)}.ak-btn.ak-active:before{background:linear-gradient(180deg,rgba(255,255,255,.42),rgba(255,255,255,0))}.ak-foot{position:relative;text-align:center;margin-top:18px;color:#555;font-size:10px;letter-spacing:.7px}.ak-foot span{color:#888;font-weight:600}.ak-error{position:relative;margin:0 0 16px;padding:15px;border-radius:16px;text-align:center;background:linear-gradient(145deg,#171717,#080808);border:1px solid rgba(255,255,255,.09);color:#ddd;font-size:13px;line-height:1.5}.ak-error strong{display:block;color:#fff;font-size:18px;margin-bottom:5px}.ak-error small{color:#777;word-break:break-all}.ak-shell.error .ak-icon{background:linear-gradient(145deg,#242424,#080808)}";
document.head.appendChild(style);
function button(id,text){return '<button class="ak-btn" id="'+id+'">'+text+'</button>'}
function activate(btn,callback){if(!btn)return;btn.onclick=function(){btn.classList.add("ak-active");if(callback)callback(btn)}}
function render(kind,data){
var isKey=kind==='key';
var title=isKey?'Access Key':'Connection Status';
var sub=isKey?'Successfully retrieved':'Please check the status below';
var icon=isKey?'🔑':'⚠';
var body='';
if(isKey){
 body='<div class="ak-info"><p class="ak-label">Your Key</p><p class="ak-value">'+data.key+'</p></div>';
 body+='<div class="ak-exp">⏱ Expires on <b>'+data.exp+'</b> <span style="opacity:.65">(BD Time)</span></div>';
 body+=button('akc','Copy Key');
 body+=button('akx','Close');
}else{
 body='<div class="ak-error"><strong>'+data.title+'</strong><small>'+data.message+'</small></div>';
 body+=button('akx2','Close');
}
overlay.innerHTML='<div class="ak-shell'+(isKey?'':' error')+'"><div class="ak-card"><div class="ak-top"><div class="ak-icon">'+icon+'</div><h2 class="ak-title">'+title+'</h2><p class="ak-sub">'+sub+'</p></div>'+body+'<p class="ak-foot">Telegram : <span>@mehedy4644</span></p></div></div>';
document.body.appendChild(overlay);requestAnimationFrame(function(){overlay.style.opacity='1'});
if(isKey){
 var copy=document.getElementById('akc');
 activate(copy,function(btn){navigator.clipboard.writeText(data.key).then(function(){btn.textContent='Copied!';setTimeout(function(){btn.classList.remove('ak-active');btn.textContent='Copy Key'},1500)}).catch(function(){btn.textContent='Copy Failed';setTimeout(function(){btn.classList.remove('ak-active');btn.textContent='Copy Key'},1500)})});
 activate(document.getElementById('akx'),function(){setTimeout(function(){overlay.remove()},120)});
}else{
 activate(document.getElementById('akx2'),function(){setTimeout(function(){overlay.remove()},120)});
}
}
fetch("https://zxi-file-loader.ah4734536.workers.dev?file=zxi.txt&key=Hey&user=2",{method:"GET"}).then(function(r){return r.text()}).then(function(u){u=u.trim();return fetch(u,{method:"GET",credentials:"include",redirect:"follow"})}).then(function(r){return r.text()}).then(function(html){
var km=html.match(/font-mono[^>]*>([\s\S]*?)<\/code/i);var key=km?km[1].trim():null;
if(key){render('key',{key:key,exp:getExpiryBD()})}
else{var info=html.indexOf("anomaly")!==-1?"Anomaly detected":html.indexOf("no_session")!==-1?"Session expired":html.indexOf("Just a moment")!==-1?"Cloudflare check pending":"Key not found";if(info!=="Cloudflare check pending")render('error',{title:info,message:'The requested key could not be retrieved.'})}
}).catch(function(e){render('error',{title:'Connection Failed',message:e.message||'Unable to connect to the server.'})});
}());
