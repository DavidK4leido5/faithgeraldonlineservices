// Measure the rendered phone footprint vs the card gutters, to verify that
// no card ever overlaps the device. Usage: node tools/overlap.js <wsUrl> <w> <h>
const WS = process.argv[2];
const W = parseInt(process.argv[3], 10);
const H = parseInt(process.argv[4], 10);

const ws = new WebSocket(WS);
let id = 0;
const pending = new Map();
const send = (m, q) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: q })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };

ws.onopen = async () => {
  await send("Page.enable", {});
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: W < 800 });
  await send("Page.navigate", { url: "http://127.0.0.1:5599/" });
  await new Promise((r) => setTimeout(r, 2600));

  const expr = `(() => {
    const stage = document.querySelector(".hero__cards");
    const s = stage.getBoundingClientRect();
    const phoneW = parseFloat(getComputedStyle(stage).getPropertyValue("--phone-w")) || 0;

    // Derive the reserved phone band in stage coordinates.
    const bandLeft = s.left + (s.width - phoneW) / 2;
    const bandRight = bandLeft + phoneW;

    const cards = Array.from(document.querySelectorAll(".hero-card")).map((el) => {
      const r = el.getBoundingClientRect();
      const overlaps = r.right > bandLeft + 1 && r.left < bandRight - 1;
      return {
        cls: el.className.replace("hero-card ", ""),
        left: Math.round(r.left - s.left),
        right: Math.round(r.right - s.left),
        width: Math.round(r.width),
        clippedText: Array.from(el.querySelectorAll(".hero-card__title,.hero-card__meta"))
          .some((t) => t.scrollWidth > t.clientWidth + 1),
        overlapsPhone: overlaps
      };
    });

    return JSON.stringify({
      viewport: window.innerWidth,
      stage: { left: Math.round(s.left), width: Math.round(s.width) },
      phoneBand: { left: Math.round(bandLeft - s.left), right: Math.round(bandRight - s.left), w: Math.round(phoneW) },
      cards,
      anyOverlap: cards.some((c) => c.overlapsPhone),
      anyClipped: cards.some((c) => c.clippedText)
    }, null, 1);
  })()`;

  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  console.log(r.result.result.value);
  ws.close();
  process.exit(0);
};
ws.onerror = (e) => { console.error("ws error", e.message || e); process.exit(1); };
