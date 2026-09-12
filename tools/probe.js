// Overflow + a11y probe via Chrome DevTools Protocol.
// Usage: node tools/probe.js <wsUrl> <width> <height>
const WS = process.argv[2];
const W = parseInt(process.argv[3] || "390", 10);
const H = parseInt(process.argv[4] || "844", 10);
const URL = process.argv[5] || "http://127.0.0.1:5599/";

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
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};

ws.onopen = async () => {
  await send("Page.enable", {});
  await send("Runtime.enable", {});
  await send("Emulation.setDeviceMetricsOverride", {
    width: W, height: H, deviceScaleFactor: 1, mobile: W < 800
  });
  await send("Page.navigate", { url: URL });
  await new Promise((r) => setTimeout(r, 4000));

  const expr = `(() => {
    const w = window.innerWidth;
    const bad = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.right > w + 1 || r.left < -1) {
        const cls = el.className && el.className.toString ? el.className.toString().slice(0, 60) : "";
        bad.push(el.tagName + "." + cls + " [L" + Math.round(r.left) + " R" + Math.round(r.right) + "]");
      }
    });
    const hidden = [];
    document.querySelectorAll(".reveal").forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        const cls = el.className.toString().slice(0, 40);
        hidden.push(cls);
      }
    });
    return JSON.stringify({
      innerW: w,
      docScrollW: document.documentElement.scrollWidth,
      h1Count: document.querySelectorAll("h1").length,
      h2Count: document.querySelectorAll("h2").length,
      imgNoAlt: Array.from(document.images).filter((i) => !i.hasAttribute("alt")).length,
      imgNoDims: Array.from(document.images).filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).length,
      brokenImgs: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0 && !i.hidden).map((i) => i.getAttribute("src")),
      revealNotVisible: hidden,
      overflow: bad.slice(0, 20)
    }, null, 1);
  })()`;

  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  const val = r.result && r.result.result ? r.result.result.value : JSON.stringify(r);
  console.log(val);

  // Collect console errors
  ws.close();
  process.exit(0);
};

ws.onerror = (e) => {
  console.error("ws error", e.message || e);
  process.exit(1);
};
