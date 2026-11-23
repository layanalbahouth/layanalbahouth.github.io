/* Packets & Tickets — network puzzle games. No dependencies. */
(function () {
  var CSS = `
.pz{--gbg:#0F1720;--gpn:#1B2836;--gin:#F6F3EC;--gdim:#B9C4CF;--gln:#3A4E63;--ok:#3DDC84;--bad:#FF5C4D;--gold:#FFC247;
 font:17px/1.5 "Source Sans 3",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--gin);background:radial-gradient(120% 90% at 15% 0%,#1F3245 0%,#0F1720 62%);border-radius:20px;padding:16px 14px 14px;margin:1.2rem 0 1.6rem;position:relative;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.22)}
.pz *{box-sizing:border-box;min-width:0}
.pz-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.pz-k{margin:0;font-weight:700;font-size:14px;color:var(--gold)}
.pz-t{margin:2px 0 0;font:700 25px/1.12 "Source Sans 3",system-ui,sans-serif;color:var(--gin);border:0;padding:0}
.pz-hud{display:flex;align-items:center;gap:8px;font-weight:700}
.pz-hearts{white-space:nowrap}
.pz-hearts b{color:var(--bad);font-size:24px;margin-right:2px;display:inline-block;transition:all .3s}
.pz-hearts b.off{color:var(--gln);transform:scale(.75)}
.pz-clock{font:700 19px ui-monospace,Menlo,Consolas,monospace;background:var(--gpn);border-radius:10px;padding:5px 10px;min-width:4.2em;text-align:center}
.pz-clock.low{color:var(--bad);animation:pzpulse .5s infinite alternate}
.pz-mute{background:var(--gpn);border:0;border-radius:10px;width:44px;height:38px;font-size:18px;cursor:pointer;color:var(--gin)}
.pz-tbar{height:7px;background:var(--gpn);border-radius:9px;margin:12px 0 10px;overflow:hidden}
.pz-tbar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,var(--ok),var(--gold));border-radius:9px}
.pz-tbar.low i{background:var(--bad)}
.pz-stage{position:relative;border-radius:14px;background:rgba(255,255,255,.035);padding:6px;min-height:230px}
.pz-stage.hit{animation:pzhit .4s}
.pz-svg{display:block;width:100%;height:auto;touch-action:manipulation;user-select:none;-webkit-user-select:none}
.pz-svg text{font-family:"Source Sans 3",system-ui,sans-serif}
.pz .lbl{font-size:18px;font-weight:700;text-anchor:middle;pointer-events:none;fill:var(--gin)}
.pz .sub{font:700 13px ui-monospace,Menlo,Consolas,monospace;text-anchor:middle;pointer-events:none;fill:var(--gdim)}
.pz .wire{stroke:var(--gln);stroke-width:4;stroke-linecap:round}
.pz-dev{cursor:pointer;transform-box:fill-box;transform-origin:center}
.pz-dev:focus{outline:none}
.pz-dev rect{fill:var(--gpn);stroke:#7B90A6;stroke-width:2;transition:stroke .2s,fill .2s}
.pz-dev:hover rect,.pz-dev:focus-visible rect{stroke:var(--gin);stroke-width:3}
.pz-dev.ok rect{stroke:var(--ok);stroke-width:3.5;fill:#16352A}
.pz-dev.no{animation:pzshake .4s}
.pz-dev.no rect{stroke:var(--bad)}
.pz-dev.gold rect{stroke:var(--gold);stroke-width:3.5}
.pz-pkt{pointer-events:none}
.pz-pkt text{font:800 12px "Source Sans 3",system-ui,sans-serif;fill:#10161D;text-anchor:middle}
.pz-x{font-size:34px;font-weight:800;fill:var(--bad);text-anchor:middle;opacity:0;pointer-events:none}
.pz-x.on{opacity:1;animation:pzpop .35s}
.pz-msg{margin:2px 2px 10px;font-size:18px;font-weight:700;min-height:1.6em;color:var(--gin)}
.pz-msg.ok{color:var(--ok)}.pz-msg.bad{color:#FF8D80}
.pz-term{background:#070B10;border:1px solid var(--gln);border-radius:12px;padding:10px 14px;font:16px/1.9 ui-monospace,"SF Mono",Menlo,Consolas,monospace;margin-top:8px;color:var(--gin);overflow-x:auto;white-space:nowrap}
.pz-term .pr{color:var(--gdim)}
.pz-slot{display:inline-block;min-width:12ch;border-bottom:2px dashed var(--gln);color:var(--gold);font-weight:700}
.pz-slot.blink::after{content:"▍";animation:pzblink 1s steps(1) infinite}
.pz-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.pz-chip{font:700 15px ui-monospace,"SF Mono",Menlo,Consolas,monospace;border:2px solid var(--gln);background:var(--gpn);color:var(--gin);border-radius:10px;padding:9px 12px;min-height:44px;cursor:pointer;transition:transform .15s,opacity .2s,border-color .2s}
.pz-chip:hover,.pz-chip:focus-visible{transform:translateY(-2px);border-color:var(--gold);outline:none}
.pz-chip.used{opacity:.2;pointer-events:none}
.pz-chip.flash{border-color:var(--bad);animation:pzshake .35s}
.pz-clues{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 2px}
.pz-clue{font:700 15px "Source Sans 3",system-ui,sans-serif;border:2px solid var(--gln);background:var(--gpn);color:var(--gin);border-radius:999px;padding:8px 14px;min-height:44px;cursor:pointer}
.pz-clue small{color:var(--gold);font-weight:800;margin-left:6px}
.pz-clue[aria-pressed=true]{border-color:var(--gold)}
.pz-clue:disabled{cursor:default}
.pz-cluebox{animation:pzin .4s}
.pz-cluebox[hidden]{display:none}
.pz-cluebox{margin-top:8px}.pz-cluebox [hidden]{display:none}
.pz-need{border-color:var(--gold);color:var(--gold);animation:pzpop .45s}
.pz-legend{font-size:15px;color:var(--gdim);margin:8px 4px 0}
.pz-legend b{color:var(--gin)}
.pz-link{cursor:pointer}
.pz-link .hit{stroke:transparent;stroke-width:26}
.pz-link .v{stroke:#7B90A6;stroke-width:4;stroke-linecap:round;transition:stroke .25s}
.pz-link:hover .v,.pz-link:focus-visible .v{stroke:var(--gold);stroke-width:6}
.pz-link:focus{outline:none}
.pz-link.found .v{stroke:var(--ok);stroke-width:6;stroke-dasharray:8 6;animation:pzdash .8s linear infinite}
.pz-ok-badge{pointer-events:none;animation:pzpop .4s}
.pz-link.fixed .v{stroke:var(--ok);stroke-width:5;stroke-dasharray:none}
.pz-link.glow .v{stroke:var(--ok);stroke-width:5}
.pz-link.no .v{stroke:var(--bad)}
.pz-ov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;background:rgba(9,14,20,.88);border-radius:14px;padding:16px;z-index:3;animation:pzin .25s}
.pz-ov h3{margin:0;font:800 28px/1.15 "Source Sans 3",system-ui,sans-serif;color:var(--gin);border:0;padding:0}
.pz-ov p{margin:0;font-size:18px;color:var(--gin);max-width:30ch}
.pz-ov .pz-tip{font-size:16px;color:var(--gold);font-weight:700}
.pz-ov .meta{font-size:15px;color:var(--gdim)}
.pz-go{font:800 21px "Source Sans 3",system-ui,sans-serif;background:var(--gold);color:#10161D;border:0;border-radius:999px;padding:12px 34px;min-height:52px;cursor:pointer;animation:pzpulse .8s infinite alternate}
.pz-cd{font:800 96px/1 "Source Sans 3",system-ui,sans-serif;color:var(--gold);animation:pzpop .45s}
.pz-stars span{font-size:46px;color:var(--gln);display:inline-block;margin:0 3px}
.pz-stars span.on{color:var(--gold);animation:pzpop .4s}
.pz-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.pz-btn{font:800 16px "Source Sans 3",system-ui,sans-serif;border:2px solid var(--gold);background:var(--gold);color:#10161D;border-radius:999px;padding:10px 20px;min-height:46px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center}
.pz-btn.ghost{background:none;color:var(--gin);border-color:var(--gln)}
.pz-foot{display:flex;justify-content:flex-end;margin-top:6px}
.pz-skip{font:700 15px "Source Sans 3",system-ui,sans-serif;background:none;border:none;color:var(--gdim);cursor:pointer;text-decoration:underline;text-underline-offset:4px;min-height:40px}
.pz-float{position:absolute;right:16px;top:58px;font:800 20px "Source Sans 3",system-ui,sans-serif;color:var(--bad);animation:pzup .9s forwards;pointer-events:none;z-index:4}
.pz-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:5}
.pz-confetti i{position:absolute;width:9px;height:13px;top:45%;left:50%;border-radius:2px;animation:pzfly 1.2s ease-out forwards}
.pz-mini{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;font:600 1rem "Source Sans 3",system-ui,sans-serif;border:1.5px dashed var(--line,#D8D3C9);border-radius:12px;padding:.6rem .95rem;margin:1rem 0 1.4rem;color:var(--ink,#1C1B19)}
.pz-mini button,.pz-mini a{font:inherit;background:none;border:none;color:var(--ink,#1C1B19);text-decoration:underline;text-underline-offset:4px;cursor:pointer;padding:0}
@keyframes pzshake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes pzpop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.2);opacity:1}100%{transform:scale(1)}}
@keyframes pzblink{50%{opacity:0}}
@keyframes pzdash{to{stroke-dashoffset:-28}}
@keyframes pzpulse{to{transform:scale(1.06)}}
@keyframes pzin{from{opacity:0}}
@keyframes pzhit{0%,100%{box-shadow:none}30%{box-shadow:inset 0 0 0 3px var(--bad),0 0 24px rgba(255,92,77,.35)}}
@keyframes pzup{to{transform:translateY(-30px);opacity:0}}
@keyframes pzfly{0%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(var(--x),var(--y)) rotate(540deg);opacity:0}}
.pz-ask,.pz-wait,.pz-pill{--gpn:#1B2836;--gin:#F6F3EC;--gdim:#B9C4CF;--gln:#3A4E63;--gold:#FFC247;--ok:#3DDC84;font:17px/1.5 "Source Sans 3",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--gin)}
.pz-ask{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);width:min(440px,calc(100vw - 24px));background:radial-gradient(120% 120% at 10% 0%,#22374C,#0F1720 70%);border-radius:20px;padding:18px 18px 16px;box-shadow:0 18px 50px rgba(0,0,0,.4);z-index:50;animation:pzrise .45s cubic-bezier(.2,1.3,.4,1)}
.pz-ask h3,.pz-wait h3{margin:0;font:800 21px/1.2 "Source Sans 3",system-ui,sans-serif;color:var(--gin);border:0;padding:0}
.pz-ask p,.pz-wait p{margin:4px 0 0;color:var(--gdim);font-size:16px}
.pz-ask .top{display:flex;gap:14px;align-items:center}
.pz-joy{font-size:38px;line-height:1;display:inline-block;animation:pzbob 1.1s ease-in-out infinite}
.pz-ask .pz-row,.pz-wait .pz-row{justify-content:flex-start;margin-top:14px}
.pz-x-btn{position:absolute;top:8px;right:10px;background:none;border:0;color:var(--gdim);font-size:22px;width:40px;height:40px;cursor:pointer}
.pz-wait{position:relative;overflow:hidden;background:radial-gradient(120% 120% at 10% 0%,#22374C,#0F1720 70%);border-radius:20px;padding:20px 20px 30px;margin:2rem 0 1rem}
.pz-wait .top{display:flex;gap:14px;align-items:center;position:relative;z-index:1}
.pz-wait .pz-row{position:relative;z-index:1}
.pz-track{position:absolute;left:0;right:0;bottom:12px;height:2px;background:var(--gln)}
.pz-track i{position:absolute;top:-4px;width:10px;height:10px;border-radius:50%;background:var(--gold);animation:pzrun 3.2s linear infinite}
.pz-track i:nth-child(2){animation-delay:-1.1s;background:var(--ok)}.pz-track i:nth-child(3){animation-delay:-2.2s}
.pz-pill{position:fixed;right:16px;bottom:16px;z-index:40;display:flex;align-items:center;gap:6px;background:#0F1720;border:2px solid var(--gold);border-radius:999px;padding:6px 6px 6px 14px;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:pzbob 1.6s ease-in-out infinite}
.pz-pill button{font:800 15px "Source Sans 3",system-ui,sans-serif;background:none;border:0;color:var(--gin);cursor:pointer;min-height:36px}
.pz-pill .x{color:var(--gdim);font-size:18px;width:32px}
.pz-pill.hide{display:none}
@keyframes pzrise{from{transform:translate(-50%,120%);opacity:0}}
@keyframes pzbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pzrun{from{left:-12px}to{left:100%}}
@media (prefers-reduced-motion:reduce){.pz-ask,.pz-wait *,.pz-pill,.pz-joy{animation:none!important}}
@media (prefers-reduced-motion:reduce){.pz *{animation:none!important;transition:none!important}}
`;
  var NS = 'http://www.w3.org/2000/svg';
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function addCss() { if (document.getElementById('pz-css')) return; var e = document.createElement('style'); e.id = 'pz-css'; e.textContent = CSS; document.head.appendChild(e); }
  function h(tag, a, kids) { var e = document.createElement(tag); for (var k in (a || {})) { if (k === 'class') e.className = a[k]; else if (k === 'text') e.textContent = a[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), a[k]); else e.setAttribute(k, a[k]); } (kids || []).forEach(function (c) { if (c != null) e.append(c); }); return e; }
  function s(tag, a, kids) { var e = document.createElementNS(NS, tag); for (var k in (a || {})) e.setAttribute(k, a[k]); (kids || []).forEach(function (c) { e.append(c); }); return e; }
  function st(tag, a, txt) { var e = s(tag, a); e.textContent = txt; return e; }
  /* counts a game start or win as a visit to a tiny hidden page, so it shows in Cloudflare Web Analytics */
  function track(id, ev) { if (location.hostname !== 'bylayann.com') return; try { var f = document.createElement('iframe'); f.src = '/puzzles/t/' + id + '-' + ev + '/'; f.title = ''; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1; f.style.cssText = 'position:absolute;width:1px;height:1px;border:0;left:-9999px'; document.body.append(f); setTimeout(function () { f.remove(); }, 8000); } catch (e) {} }
  var visit = { get: function (k) { try { return sessionStorage.getItem('pz:' + k); } catch (e) { return null; } }, set: function (k, v) { try { sessionStorage.setItem('pz:' + k, v); } catch (e) {} } };
  var store = { get: function (k) { try { return localStorage.getItem('pz:' + k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem('pz:' + k, v); } catch (e) {} } };
  function wait(ms) { return new Promise(function (r) { setTimeout(r, REDUCED ? Math.min(ms, 60) : ms); }); }
  function tween(ms, fn) { return new Promise(function (res) { if (REDUCED) { fn(1); return res(); } var t0 = Date.now(); (function f() { var p = Math.min(1, (Date.now() - t0) / ms), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; fn(e); if (p < 1) setTimeout(f, 16); else res(); })(); }); }
  function at(g, x, y) { g.setAttribute('transform', 'translate(' + x + ',' + y + ')'); }
  async function move(g, pts, ms) { for (var i = 0; i < pts.length - 1; i++) { var a = pts[i], b = pts[i + 1]; await tween(ms, function (p) { at(g, a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p); }); } }
  function shake(el) { el.classList.remove('no'); el.getBoundingClientRect(); el.classList.add('no'); setTimeout(function () { el.classList.remove('no'); }, 450); }
  function confetti(card) { if (REDUCED) return; var c = h('div', { class: 'pz-confetti' }), cols = ['#3DDC84', '#FFC247', '#FF5C4D', '#5DB2FF', '#F6F3EC']; for (var i = 0; i < 46; i++) { var a = Math.random() * Math.PI * 2, d = 100 + Math.random() * 200, p = h('i'); p.style.background = cols[i % cols.length]; p.style.setProperty('--x', Math.cos(a) * d + 'px'); p.style.setProperty('--y', Math.sin(a) * d - 50 + 'px'); p.style.animationDelay = Math.random() * .15 + 's'; c.append(p); } card.append(c); setTimeout(function () { c.remove(); }, 1600); }
  function device(x, y, w, label, sub) { var g = s('g', { class: 'pz-dev', tabindex: '0', role: 'button', 'aria-label': label }); g.append(s('rect', { x: x - w / 2, y: y - 24, width: w, height: 48, rx: 11 }), st('text', { class: 'lbl', x: x, y: sub ? y - 1 : y + 6 }, label)); if (sub) { g.sub = st('text', { class: 'sub', x: x, y: y + 16 }, sub); g.append(g.sub); } return g; }
  function packet(txt, col) { var g = s('g', { class: 'pz-pkt', transform: 'translate(-99,-99)' }); g.append(s('circle', { r: 13, fill: col || '#FFC247' }), st('text', { y: 4 }, txt)); return g; }
  function face(x, y, happy) { var g = s('g', { transform: 'translate(' + x + ',' + y + ')' }), c = s('circle', { r: 13, fill: 'none', 'stroke-width': 2.5 }), m = s('path', { fill: 'none', 'stroke-width': 2.5, 'stroke-linecap': 'round' }); g.append(c, s('circle', { cx: -4.5, cy: -3, r: 2, fill: '#F6F3EC' }), s('circle', { cx: 4.5, cy: -3, r: 2, fill: '#F6F3EC' }), m); g.set = function (ok) { var col = ok ? '#3DDC84' : '#FF5C4D'; c.setAttribute('stroke', col); m.setAttribute('stroke', col); m.setAttribute('d', ok ? 'M-6,4 Q0,10 6,4' : 'M-6,8 Q0,2 6,8'); }; g.set(happy); return g; }
  function burst(svg, x, y) { var g = s('g', { transform: 'translate(' + x + ',' + y + ')' }); for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4; g.append(s('line', { x1: Math.cos(a) * 6, y1: Math.sin(a) * 6, x2: Math.cos(a) * 18, y2: Math.sin(a) * 18, stroke: '#FF5C4D', 'stroke-width': 3, 'stroke-linecap': 'round' })); } svg.append(g); tween(400, function (p) { g.setAttribute('opacity', 1 - p); g.setAttribute('transform', 'translate(' + x + ',' + y + ') scale(' + (.6 + p * .9) + ')'); }).then(function () { g.remove(); }); }
  function onTap(el, fn) { el.addEventListener('click', fn); el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } }); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* sound: tiny beeps, only after the player presses Play */
  var AC = null, muted = store.get('mute') === '1';
  function beep(f, d, type, v, delay) { if (muted || !AC) return; try { var t = AC.currentTime + (delay || 0), o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'triangle'; o.frequency.setValueAtTime(f, t); g.gain.setValueAtTime(v || .12, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d + .02); } catch (e) {} }
  var SFX = {
    good: function () { beep(660, .1); beep(990, .16, 'triangle', .12, .09); },
    bad: function () { beep(170, .25, 'sawtooth', .08); },
    tick: function () { beep(1250, .04, 'square', .035); },
    key: function () { beep(1400 + Math.random() * 400, .02, 'square', .018); },
    boom: function () { beep(110, .12, 'sawtooth', .05); },
    go: function () { beep(880, .12, 'square', .06); },
    win: function () { [523, 659, 784, 1047].forEach(function (f, i) { beep(f, .2, 'triangle', .13, i * .11); }); },
    lose: function () { [392, 330, 262].forEach(function (f, i) { beep(f, .28, 'sawtooth', .07, i * .17); }); }
  };

  /* ---------- 1. DHCP ---------- */
  function dhcp(stage, api) {
    var svg = s('svg', { class: 'pz-svg', viewBox: '0 0 480 250', role: 'img', 'aria-label': 'Three PCs, a switch, a router and a DHCP server' });
    var Y = 125, PY = [42, 125, 208], X = { pc: 70, sw: 205, r: 315, srv: 425 };
    PY.forEach(function (y) { svg.append(s('line', { class: 'wire', x1: X.pc + 55, y1: y, x2: X.sw - 40, y2: Y })); });
    svg.append(s('line', { class: 'wire', x1: X.sw, y1: Y, x2: X.srv, y2: Y }));
    var pcs = PY.map(function (y, i) { var g = s('g', { class: 'pz-dev', tabindex: '0', role: 'button', 'aria-label': 'PC' + (i + 1) }); g.append(s('rect', { x: X.pc - 55, y: y - 24, width: 110, height: 48, rx: 11 })); g.f = face(X.pc - 28, y, false); g.append(g.f, st('text', { class: 'lbl', x: X.pc + 18, y: y + 6 }, 'PC' + (i + 1))); svg.append(g); g.ip = st('text', { class: 'sub', x: X.pc, y: y + 40 }, '169.254.' + [55, 12, 201][i] + '.' + [39, 7, 88][i]); g.ip.style.fill = '#FF8D80'; svg.append(g.ip); return g; });
    var sw = device(X.sw, Y, 80, 'Switch'), r = device(X.r, Y, 100, 'Router', 'G0/0 · G0/1'), srv = device(X.srv, Y, 100, 'DHCP', 'server');
    [sw, r, srv].forEach(function (d) { svg.append(d); });
    var x = st('text', { class: 'pz-x', x: X.r - 52, y: Y - 34 }, '✕'); svg.append(x);
    stage.append(svg);
    api.clues([['Where?', 'Switches pass broadcasts on. Routers don’t.'], ['The fix', 'Use the port facing the PCs (G0/0) and point it at the server: 192.168.20.10.']]);
    var looping = true, layer = s('g'); svg.append(layer);
    function spawn(i) { var p = packet('?'); layer.append(p); var y = PY[i]; return move(p, [[X.pc + 55, y], [X.sw - 40, Y], [X.r - 52, Y]], 520).then(function () { p.remove(); if (!looping) return; burst(svg, X.r - 52, Y); x.classList.remove('on'); x.getBoundingClientRect(); x.classList.add('on'); if (api.live()) SFX.boom(); }); }
    (async function loop() { var i = 0; while (looping && api.alive()) { spawn(i % 3); i++; await wait(560); } layer.remove(); })();
    var stage2 = false;
    function wrong(d, t) { if (!api.live() || stage2) return; api.miss(t, d); }
    pcs.forEach(function (p) { onTap(p, function () { wrong(p, 'The request leaves the PC fine. Follow the ? ball.'); }); });
    onTap(sw, function () { wrong(sw, 'The switch passes it on. Keep following.'); });
    onTap(srv, function () { wrong(srv, 'It never reaches the server!'); });
    onTap(r, function () {
      if (!api.live() || stage2) return; stage2 = true; looping = false; r.classList.add('ok'); x.classList.remove('on');
      api.good('Found it! Routers drop broadcasts. Now give the router the fix:'); setTimeout(fix, REDUCED ? 0 : 450);
    });
    function fix() {
      var slots = [h('span', { class: 'pz-slot blink' }), h('span', { class: 'pz-slot' })];
      var term = h('div', { class: 'pz-term' }, [h('span', { class: 'pr', text: 'R1(config)# ' }), slots[0], h('br'), h('span', { class: 'pr', text: 'R1(config-if)# ' }), slots[1]]);
      var want = ['interface g0/0', 'ip helper-address 192.168.20.10'], n = 0, busy = false, chips = h('div', { class: 'pz-chips' });
      shuffle(['interface g0/1', 'ip helper-address 192.168.20.10', 'ip dhcp pool LAN10', 'interface g0/0', 'ip helper-address 192.168.10.1', 'no shutdown']).forEach(function (o) {
        var c = h('button', { class: 'pz-chip', type: 'button', text: o }); chips.append(c);
        onTap(c, function () {
          if (!api.live() || busy || n > 1) return;
          if (o !== want[n]) { c.classList.add('flash'); setTimeout(function () { c.classList.remove('flash'); }, 400); api.miss(n === 0 ? 'Pick the port the PCs are on (G0/0).' : 'Point it at the DHCP server: 192.168.20.10.'); return; }
          busy = true; c.classList.add('used'); var slot = slots[n], i = 0; slot.textContent = '';
          (function t() { slot.textContent = o.slice(0, ++i); SFX.key(); if (i < o.length) setTimeout(t, REDUCED ? 0 : 28); else { slot.classList.remove('blink'); busy = false; n++; if (n === 1) { slots[1].classList.add('blink'); api.good('Good. One more line.'); } else win(); } })();
        });
      });
      stage.append(term, chips);
    }
    async function win() {
      api.win(3200, 'Fixed! The router now relays every request to the server.');
      for (var i = 0; i < 3; i++) (function (i, y) {
        setTimeout(async function () {
          var p = packet('D'); svg.append(p); await move(p, [[X.pc + 55, y], [X.sw - 40, Y], [X.r, Y], [X.srv - 50, Y]], 330); srv.classList.add('ok'); p.remove();
          var b = packet('IP', '#3DDC84'); svg.append(b); await move(b, [[X.srv - 50, Y], [X.r, Y], [X.sw - 40, Y], [X.pc + 55, y]], 300); b.remove();
          pcs[i].classList.add('ok'); pcs[i].f.set(true); pcs[i].ip.textContent = '192.168.10.' + (100 + i); pcs[i].ip.style.fill = '#3DDC84'; SFX.good();
        }, i * 380);
      })(i, PY[i]);
    }
  }

  /* ---------- 2. Routes: gatekeeper, 5 rounds ---------- */
  function routes(stage, api) {
    var svg = s('svg', { class: 'pz-svg', viewBox: '0 0 480 250', role: 'img', 'aria-label': 'Two routes slide toward the routing table' });
    svg.append(s('rect', { x: 372, y: 14, width: 100, height: 226, rx: 14, fill: 'rgba(255,255,255,.04)', stroke: '#7B90A6', 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
    var tl = st('text', { class: 'lbl', x: 422, y: 42 }, 'Routing'); tl.style.fontSize = '15px'; var tl2 = st('text', { class: 'lbl', x: 422, y: 60 }, 'table'); tl2.style.fontSize = '15px';
    var rl = st('text', { class: 'lbl', x: 10, y: 28 }, ''); rl.style.textAnchor = 'start'; rl.style.fill = '#FFC247';
    svg.append(tl, tl2, rl);
    stage.append(svg, h('p', { class: 'pz-legend', html: '' }));
    stage.lastChild.innerHTML = '<b>S</b> static · <b>O</b> OSPF · <b>D</b> EIGRP · <b>R</b> RIP · <b>B</b> BGP';
    var R = [
      ['192.168.11.0/24', ['S', '1/0'], ['O', '110/2']],
      ['10.20.0.0/16', ['O', '110/20'], ['R', '120/1']],
      ['172.16.5.0/24', ['D', '90/3072'], ['O', '110/2']],
      ['10.50.0.0/16', ['B', '20/0'], ['D', '90/2816']],
      ['192.168.30.0/24', ['S', '1/0'], ['B', '200/0']]
    ];
    api.clues([['Which wins?', 'The first number in [ ] is the distance. Lower means more trusted.']]);
    var speed = [7.5, 6.5, 5.5, 4.8, 4.2], entries = 0;
    function pill(code, net, ad, y) {
      var o = s('g'), g = s('g', { class: 'pz-dev', tabindex: '0', role: 'button', 'aria-label': code + ' route, ' + ad });
      g.append(s('rect', { x: 0, y: -30, width: 196, height: 60, rx: 30 }));
      var t1 = st('text', { class: 'lbl', x: 98, y: -4 }, code + '  ' + net); t1.style.fontSize = '17px';
      var t2 = st('text', { class: 'sub', x: 98, y: 19 }, '[' + ad + ']'); t2.style.fill = '#FFC247'; t2.style.fontSize = '16px';
      g.append(t1, t2); o.append(g); at(o, -200, y); svg.append(o); return { o: o, g: g, code: code, ad: ad, y: y, x: -200 };
    }
    function adOf(p) { return parseInt(p.ad, 10); }
    (async function main() {
      while (!api.live()) { if (!api.alive()) return; await wait(80); }
      for (var k = 0; k < R.length; k++) {
        if (!api.live()) return;
        rl.textContent = 'Round ' + (k + 1) + ' / 5';
        var lanes = shuffle([70, 170]), a = pill(R[k][1][0], R[k][0], R[k][1][1], lanes[0]), b = pill(R[k][2][0], R[k][0], R[k][2][1], lanes[1]);
        var best = adOf(a) < adOf(b) ? a : b, other = best === a ? b : a, picked = null, t0 = Date.now(), dur = speed[k] * 1000;
        [a, b].forEach(function (p) { onTap(p.g, function () { if (!picked && api.live()) picked = p; }); });
        await new Promise(function (res) {
          (function f() {
            if (!api.alive()) return res();
            var q = Math.min(1, (Date.now() - t0) / dur); [a, b].forEach(function (p) { p.x = -200 + q * 374; at(p.o, p.x, p.y + Math.sin(Date.now() / 260 + p.y) * 3); });
            if (picked || q >= 1 || !api.live()) return res(); setTimeout(f, 20);
          })();
        });
        if (!api.live()) return;
        if (picked === best) api.good(best.ad.split('/')[0] + ' beats ' + other.ad.split('/')[0] + '. Lower wins! ✓');
        else { shake((picked || other).g); api.miss(picked ? 'Compare the first number in [ ]. The lower one wins.' : 'Too slow! Tap before they reach the table.'); if (!api.live()) return; }
        var bx = best.x, ox = other.x;
        best.g.classList.add('ok');
        await tween(500, function (p) { at(best.o, bx + (376 - bx) * p, best.y + (90 + entries * 30 - best.y) * p); best.o.setAttribute('opacity', 1 - p * .9); at(other.o, ox - p * 30, other.y + p * 70); other.o.setAttribute('opacity', 1 - p); });
        best.o.remove(); other.o.remove();
        var e = st('text', { class: 'sub', x: 422, y: 96 + entries * 30 }, best.code + ' [' + best.ad.split('/')[0] + ']'); e.style.fill = '#3DDC84'; e.style.fontSize = '15px'; svg.append(e); entries++;
        await wait(600);
      }
      if (api.live()) api.win(600, 'All 5 routes sorted. Lowest administrative distance wins.');
    })();
  }

  /* ---------- 3. Campus ---------- */
  function campus(stage, api) {
    var svg = s('svg', { class: 'pz-svg', viewBox: '0 0 480 250', role: 'img', 'aria-label': 'Three buildings: access switches, distribution switches and a core switch' });
    var A = { 1: [60, 40], 2: [60, 125], 3: [60, 210] }, D = { 1: [255, 40], 2: [255, 125], 3: [255, 210] }, C = [425, 125];
    var links = [['a1', [110, 40], [207, 40], true], ['a2', [110, 125], [207, 125], false], ['a3', [110, 210], [207, 210], true], ['d1', [303, 40], [380, 115], false], ['d2', [303, 125], [380, 125], false], ['d3', [303, 210], [380, 135], false]];
    var L = {}, found = 0, done = false, stpOn = false;
    links.forEach(function (k) {
      var g = s('g', { class: 'pz-link', tabindex: '0', role: 'button', 'aria-label': 'Link ' + k[0] });
      var v = s('line', { class: 'v', x1: k[1][0], y1: k[1][1], x2: k[2][0], y2: k[2][1] }); g.append(s('line', { class: 'hit', x1: k[1][0], y1: k[1][1], x2: k[2][0], y2: k[2][1] }), v); svg.append(g);
      L[k[0]] = { g: g, bad: k[3], p: [k[1][0], k[1][1], k[2][0], k[2][1]], hit: false };
      onTap(g, function () {
        var l = L[k[0]]; if (!api.live() || done || l.hit) return;
        if (!l.bad) { api.miss(k[0] === 'a2' ? 'B2 is online, so its link works.' : 'That link is fine. Try a clue!'); g.classList.add('no'); setTimeout(function () { g.classList.remove('no'); }, 500); return; }
        l.hit = true; g.classList.add('found'); found++;
        var mx = (l.p[0] + l.p[2]) / 2, my = l.p[1], m = s('g', { class: 'pz-ok-badge', transform: 'translate(' + mx + ',' + my + ')' });
        m.append(s('circle', { r: 15, fill: '#3DDC84' }), s('path', { d: 'M-7,0 L-2,6 L8,-6', fill: 'none', stroke: '#10161D', 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); svg.append(m); l.m = m;
        if (found < 2) api.good('✓ Correct! You found 1 of the 2 broken links.'); else win();
      });
    });
    var faces = {};
    [1, 2, 3].forEach(function (i) {
      var g = s('g', { class: 'pz-dev' }); g.style.cursor = 'default'; g.append(s('rect', { x: 10, y: A[i][1] - 24, width: 100, height: 48, rx: 11 })); faces[i] = face(33, A[i][1], i === 2); g.append(faces[i], st('text', { class: 'lbl', x: 76, y: A[i][1] - 1 }, 'B' + i), st('text', { class: 'sub', x: 76, y: A[i][1] + 16 }, 'access')); svg.append(g);
      var d = device(D[i][0], D[i][1], 96, 'B' + i, 'dist'); d.style.cursor = 'default'; d.removeAttribute('tabindex'); d.removeAttribute('role'); svg.append(d); D[i].g = d;
    });
    var core = device(C[0], C[1], 90, 'Core'); core.style.cursor = 'default'; core.removeAttribute('tabindex'); core.removeAttribute('role'); svg.append(core);
    var dots = [];
    Object.keys(L).forEach(function (k, i) { for (var j = 0; j < 2; j++) { var c = s('circle', { r: 5, fill: '#FFC247' }); c.style.pointerEvents = 'none'; svg.append(c); dots.push({ c: c, k: k, t: (i * .17 + j * .5) % 1 }); } });
    var last = Date.now();
    stage.append(svg);
    (function f() { if (!api.alive() || !svg.isConnected) return; var t = Date.now(), dt = Math.min(60, t - last) / 1000; last = t; dots.forEach(function (d) { var l = L[d.k], p = l.p, stop = stpOn && l.bad && !done ? .45 : 1; d.t += dt * .5; if (stop < 1) { if (d.t > stop + .35) d.t = 0; } else if (d.t > 1) d.t = 0; var tt = Math.min(d.t, stop); d.c.setAttribute('cx', p[0] + (p[2] - p[0]) * tt); d.c.setAttribute('cy', p[1] + (p[3] - p[1]) * tt); d.c.setAttribute('fill', done ? '#3DDC84' : (stop < 1 && d.t >= stop ? '#FF5C4D' : '#FFC247')); }); if (!REDUCED) setTimeout(f, 33); })();
    api.clues([
      ['OSPF', 'Core# show ip ospf neighbor → all 3 FULL ✓', function () { ['d1', 'd2', 'd3'].forEach(function (k) { L[k].g.classList.add('glow'); }); }],
      ['Routes', 'Core has no routes to the B1 and B3 VLANs', function () { D[1].g.classList.add('gold'); D[3].g.classList.add('gold'); }],
      ['STP', 'B1 and B3 ports blocked: type inconsistent', function () { stpOn = true; }]
    ]);
    function win() {
      done = true; api.win(2000, 'Trunk on one end, access on the other, so STP blocked it.');
      setTimeout(function () { ['a1', 'a3'].forEach(function (k) { L[k].g.classList.remove('found'); L[k].g.classList.add('fixed'); }); faces[1].set(true); faces[3].set(true); SFX.good(); }, REDUCED ? 0 : 500);
    }
  }

  var PUZZLES = {
    dhcp: { title: 'No address for you', goal: 'Three users have no IP address. Tap the device where their requests die.', time: 60, run: dhcp, lab: '/labs/dhcp-relay/', lesson: 'ip helper-address relays DHCP across the router.' },
    routes: { title: 'Gatekeeper', goal: 'The router hears 2 routes to the same network but keeps only 1. Tap the one it trusts before they reach the table.', time: 60, run: routes, lab: '/labs/static-vs-ospf/', lesson: 'Lower administrative distance wins.' },
    campus: { title: 'Two buildings went dark', goal: 'B1 and B3 lost the network. Tap the 2 broken links.', time: 75, run: campus, lab: '/labs/campus-ospf-bgp/', lesson: 'A trunk/access mismatch makes STP block the port.' }
  };

  function play(el, id, onLab, auto) {
    var P = PUZZLES[id]; if (el._g) el._g.alive = false;
    var G = { t: P.time, hearts: 3, go: false, over: false, alive: true, el: 0, later: [] }; el._g = G;
    el.className = 'pz'; el.replaceChildren();
    var hearts = h('span', { class: 'pz-hearts', 'aria-label': 'Lives' }), clock = h('span', { class: 'pz-clock' }), tbar = h('div', { class: 'pz-tbar' }, [h('i')]);
    var mute = h('button', { class: 'pz-mute', type: 'button', 'aria-label': 'Sound on or off', text: muted ? '🔇' : '🔊' });
    mute.onclick = function () { muted = !muted; mute.textContent = muted ? '🔇' : '🔊'; store.set('mute', muted ? '1' : '0'); };
    var clueArea = h('div', { class: 'pz-cluebox', hidden: '' }), stage = h('div', { class: 'pz-stage' }), msg = h('p', { class: 'pz-msg', text: P.goal }), foot = h('div', { class: 'pz-foot' });
    el.append(h('div', { class: 'pz-head' }, [h('div', {}, [h('p', { class: 'pz-k', text: '🧩 ' + (onLab ? 'Solve it before you read' : 'Network puzzle') }), h('h2', { class: 'pz-t', text: P.title })]), h('div', { class: 'pz-hud' }, [hearts, clock, mute])]), tbar, msg, stage, clueArea, foot);
    if (onLab) foot.append(h('button', { class: 'pz-skip', type: 'button', text: 'Skip, take me to the lab ↓', onclick: function () { G.alive = false; visit.set(id, 'skipped'); mini(el, id); } }));
    function drawHearts() { hearts.replaceChildren.apply(hearts, [0, 1, 2].map(function (i) { return h('b', { class: i < G.hearts ? '' : 'off', text: '♥' }); })); }
    function drawClock() { var t = Math.max(0, Math.ceil(G.t)); clock.textContent = '⏱ ' + Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2); tbar.firstChild.style.width = Math.max(0, G.t / P.time * 100) + '%'; var low = G.t <= 10; clock.classList.toggle('low', low); tbar.classList.toggle('low', low); }
    drawHearts(); drawClock();
    function say(t, c) { msg.textContent = t; msg.className = 'pz-msg' + (c ? ' ' + c : ''); }
    function ov(kids) { var o = h('div', { class: 'pz-ov' }, kids); stage.append(o); return o; }
    var timer = setInterval(function () {
      if (!G.alive || !el.isConnected) return clearInterval(timer);
      if (!G.go || G.over) return; var before = Math.ceil(G.t); G.t -= .1; G.el += .1; drawClock();
      G.later = G.later.filter(function (x) { if (G.el >= x[0]) { x[1](); return false; } return true; });
      if (Math.ceil(G.t) < before && G.t <= 5 && G.t > 0) SFX.tick();
      if (G.t <= 0) lose('Time’s up!');
    }, 100);
    function lose(why) {
      if (G.over) return; G.over = true; SFX.lose(); say('The network is still down.', 'bad');
      setTimeout(function () { if (!G.alive) return; ov([h('h3', { text: '😵 ' + why }), h('p', { text: 'The network is still down.' }), h('div', { class: 'pz-row' }, [h('button', { class: 'pz-go', type: 'button', text: '↻ Try again', onclick: function () { play(el, id, onLab, true); } })])]); }, 700);
    }
    var api = {
      alive: function () { return G.alive && el.isConnected; },
      live: function () { return G.alive && G.go && !G.over; },
      good: function (t) { SFX.good(); if (t) say(t, 'ok'); },
      miss: function (t, node) { if (node) shake(node); SFX.bad(); stage.classList.remove('hit'); stage.getBoundingClientRect(); stage.classList.add('hit'); G.hearts--; drawHearts(); if (t) say(t, 'bad'); if (G.hearts <= 0) lose('Out of lives!'); },
      after: function (sec, fn) { G.later.push([sec, fn]); },
      clues: function (list) {
        var out = h('div', { class: 'pz-term', text: '> Each clue costs 10 seconds.' }), bar = h('div', { class: 'pz-clues' });
        list.forEach(function (c) { var b = h('button', { class: 'pz-clue', type: 'button', 'aria-pressed': 'false' }, ['💡 ' + c[0], h('small', { text: '−10s' })]); onTap(b, function () { if (!api.live()) return; if (b.getAttribute('aria-pressed') !== 'true') { b.setAttribute('aria-pressed', 'true'); b.lastChild.textContent = '✓'; api.penalty(10); c[2] && c[2](); } out.textContent = '> ' + c[1]; }); bar.append(b); });
        var open = h('button', { class: 'pz-clue pz-need', type: 'button', text: '💡 Need a clue?' }), panel = h('div', { hidden: '' }, [bar, out]);
        onTap(open, function () { if (!api.live()) return; open.remove(); panel.hidden = false; });
        clueArea.replaceChildren(open, panel);
        api.after(10, function () { if (G.over) return; clueArea.hidden = false; SFX.go(); });
      },
      penalty: function (sec) { G.t = Math.max(1, G.t - sec); drawClock(); var f = h('span', { class: 'pz-float', text: '−' + sec + 's' }); el.append(f); setTimeout(function () { f.remove(); }, 950); },
      win: function (delay, t) {
        if (G.over) return; G.over = true; if (t) say(t, 'ok'); var used = Math.round(P.time - G.t), stars = G.hearts;
        store.set(id, 'solved'); track(id, 'win'); var best = +(store.get(id + ':stars') || 0); if (stars > best) store.set(id + ':stars', stars);
        setTimeout(function () {
          if (!G.alive) return; SFX.win(); confetti(el);
          var sr = h('div', { class: 'pz-stars', 'aria-label': stars + ' of 3 stars' }, [0, 1, 2].map(function () { return h('span', { text: '★' }); }));
          sr.childNodes.forEach(function (n, i) { if (i < stars) setTimeout(function () { n.classList.add('on'); beep(700 + i * 200, .12); }, 250 + i * 280); });
          var read = onLab ? h('button', { class: 'pz-btn', type: 'button', text: 'Read the lab ↓', onclick: function () { G.alive = false; mini(el, id); } }) : h('a', { class: 'pz-btn', href: P.lab, text: 'Read the lab →' });
          ov([h('h3', { text: 'Network fixed!' }), sr, h('p', { class: 'meta', text: 'Solved in ' + used + 's' }), h('p', { text: P.lesson }),
            h('div', { class: 'pz-row' }, [read, h('button', { class: 'pz-btn ghost', type: 'button', text: '↻ Play again', onclick: function () { play(el, id, onLab, true); } }),
              h('a', { class: 'pz-btn ghost', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent('https://bylayann.com/puzzles/'), target: '_blank', rel: 'noopener noreferrer', text: 'Share' })])]);
        }, REDUCED ? 0 : delay);
      }
    };
    P.run(stage, api);
    async function countdown(o) {
      try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) {}
      for (var n = 3; n > 0; n--) { o.replaceChildren(h('div', { class: 'pz-cd', text: String(n) })); beep(520, .09, 'square', .05); await wait(550); if (!G.alive) return; }
      o.remove(); SFX.go(); G.go = true; say(P.goal); track(id, 'start');
    }
    var o = ov([h('h3', { text: P.title }), h('p', { text: P.goal }), P.tip ? h('p', { class: 'pz-tip', text: '💡 ' + P.tip }) : null, h('p', { class: 'meta', text: P.time + ' seconds · 3 lives' + (id === 'routes' ? ' · 5 rounds' : '') }), h('button', { class: 'pz-go', type: 'button', text: '▶ Play', onclick: function () { o.style.background = 'rgba(9,14,20,.55)'; countdown(o); } })]);
    if (auto) { o.style.background = 'rgba(9,14,20,.55)'; countdown(o); }
  }
  function mini(el, id) {
    var solved = store.get(id) === 'solved';
    el.className = 'pz-mini'; el.replaceChildren('🧩 ' + (solved ? 'Puzzle solved ' + '★'.repeat(+(store.get(id + ':stars') || 0)) : 'This lab has a puzzle'),
      h('button', { type: 'button', text: solved ? 'Play again' : 'Try it', onclick: function () { play(el, id, true, true); } }), h('a', { href: '/puzzles/', text: 'All puzzles' }));
  }
  function scrollTo(el) { try { el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); } catch (e) { el.scrollIntoView(); } }
  function later(el, id) {
    var P = PUZZLES[id]; el.className = ''; el.replaceChildren();
    var anchor = document.querySelector('.fbline') || document.querySelector('footer');
    var box = document.getElementById('pz-wait-' + id);
    if (!box) {
      box = h('div', { class: 'pz-wait', id: 'pz-wait-' + id });
      if (anchor) anchor.parentNode.insertBefore(box, anchor); else el.parentNode.append(box);
    }
    box.className = 'pz-wait';
    box.replaceChildren(h('div', { class: 'top' }, [h('span', { class: 'pz-joy', text: '🎮' }), h('div', {}, [h('h3', { text: 'Your game is waiting' }), h('p', { text: P.title + ' · about 1 minute' })])]),
      h('div', { class: 'pz-row' }, [h('button', { class: 'pz-btn', type: 'button', text: '▶ Play now', onclick: function () { pill.remove(); play(box, id, true, true); scrollTo(box); } })]),
      h('div', { class: 'pz-track' }, [h('i'), h('i'), h('i')]));
    var old = document.querySelector('.pz-pill'); if (old) old.remove();
    var pill = h('div', { class: 'pz-pill' }, [h('button', { type: 'button', text: '🎮 Your game is waiting ↓', onclick: function () { scrollTo(box); } }), h('button', { class: 'x', type: 'button', 'aria-label': 'Hide', text: '✕', onclick: function () { pill.remove(); } })]);
    document.body.append(pill);
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { pill.classList.toggle('hide', es[0].isIntersecting); }); io.observe(box); }
  }
  function ask(el, id) {
    var P = PUZZLES[id];
    var card = h('div', { class: 'pz-ask', role: 'dialog', 'aria-label': 'Play a short game?' });
    function close() { card.remove(); }
    card.append(h('button', { class: 'pz-x-btn', type: 'button', 'aria-label': 'Close', text: '✕', onclick: function () { close(); visit.set(id, 'skipped'); mini(el, id); } }),
      h('div', { class: 'top' }, [h('span', { class: 'pz-joy', text: '🎮' }), h('div', {}, [h('h3', { text: 'This lab has a 1-minute game!' }), h('p', { text: 'Can you fix the network yourself? Play before you read, or after.' })])]),
      h('div', { class: 'pz-row' }, [h('button', { class: 'pz-btn', type: 'button', text: '▶ Play first', onclick: function () { close(); play(el, id, true, true); scrollTo(el); } }),
        h('button', { class: 'pz-btn ghost', type: 'button', text: 'After reading', onclick: function () { close(); visit.set(id, 'later'); later(el, id); } })]));
    document.body.append(card);
  }
  function mount(el) {
    var id = el.getAttribute('data-puzzle'); if (!PUZZLES[id]) return;
    if (!el.hasAttribute('data-lab')) return play(el, id, false);
    var v = visit.get(id);
    if (store.get(id) === 'solved' || v === 'skipped') mini(el, id); else if (v === 'later') later(el, id); else setTimeout(function () { ask(el, id); }, REDUCED ? 0 : 900);
  }
  function init() { addCss(); document.querySelectorAll('[data-puzzle]').forEach(mount); }
  window.PZ = { list: PUZZLES };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
