// Sweep all target breakpoints and report overflow / layout defects.
// Usage: node tools/sweep.js <wsUrl>
const WS = process.argv[2];
const URL = process.argv[3] || "http://127.0.0.1:5599/";
const SIZES = [
  [320, 720], [375, 812], [390, 844], [430, 932],
  [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]
];

const ws = new WebSocket(WS);
let id = 0;
const pending = new Map();
function send(method, params) {
  return new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
}
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};

ws.onopen = async () => {
  await send("Page.enable", {});
  await send("Runtime.enable", {});

  const results = [];
  for (const [w, h] of SIZES) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: 1, mobile: w < 800
    });
    await send("Page.navigate", { url: URL });
    await new Promise((r) => setTimeout(r, 2500));

    const expr = `(() => {
      const vw = window.innerWidth;
      const bad = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        if (r.right > vw + 1 || r.left < -1) {
          const cls = el.className && el.className.toString ? el.className.toString().slice(0, 50) : "";
          bad.push(el.tagName + "." + cls + " [R" + Math.round(r.right) + "]");
        }
      });
      // Any heading whose text is clipped by its own box
      const clipped = [];
      document.querySelectorAll("h1,h2,h3").forEach((el) => {
        if (el.closest(".visually-hidden") || el.classList.contains("visually-hidden")) return;
        if (el.scrollWidth > el.clientWidth + 2) clipped.push(el.tagName + ":" + el.textContent.trim().slice(0, 30));
      });
      return JSON.stringify({
        vw,
        scrollW: document.documentElement.scrollWidth,
        overflowCount: bad.length,
        overflow: bad.slice(0, 8),
        clippedHeadings: clipped.slice(0, 6),
        hiddenReveal: document.querySelectorAll(".reveal:not(.is-visible)").length,
        navToggleVisible: (() => {
          const t = document.querySelector(".nav__toggle");
          return t ? getComputedStyle(t).display !== "none" : null;
        })()
      });
    })()`;

    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
    const v = JSON.parse(r.result.result.value);
    results.push({ size: w + "x" + h, ...v });
  }

  console.log(JSON.stringify(results, null, 1));
  ws.close();
  process.exit(0);
};
ws.onerror = (e) => { console.error("ws error", e.message || e); process.exit(1); };
