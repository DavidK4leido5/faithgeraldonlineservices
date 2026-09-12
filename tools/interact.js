// Interaction tests: mobile menu, accordion, FAQ, lightbox, reduced motion.
// Usage: node tools/interact.js <wsUrl>
const WS = process.argv[2];
const URL = process.argv[3] || "http://127.0.0.1:5599/";

const ws = new WebSocket(WS);
let id = 0;
const pending = new Map();
const consoleErrors = [];

function send(method, params) {
  return new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
}
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    consoleErrors.push((m.params.args || []).map((a) => a.value || a.description || "").join(" "));
  }
  if (m.method === "Runtime.exceptionThrown") {
    consoleErrors.push("EXCEPTION: " + (m.params.exceptionDetails.text || ""));
  }
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};

async function evaluate(expression) {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (r.result && r.result.exceptionDetails) {
    return { error: r.result.exceptionDetails.text };
  }
  return r.result && r.result.result ? r.result.result.value : null;
}

ws.onopen = async () => {
  await send("Page.enable", {});
  await send("Runtime.enable", {});

  const out = {};

  /* ---------- A. Mobile menu (390px) ---------- */
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: URL });
  await new Promise((r) => setTimeout(r, 2500));

  out.menuClosedInitially = await evaluate(`(() => {
    const t = document.querySelector("#nav-toggle");
    const m = document.querySelector("#primary-menu");
    return t.getAttribute("aria-expanded") === "false" && !m.classList.contains("is-open");
  })()`);

  out.menuOpens = await evaluate(`(() => {
    document.querySelector("#nav-toggle").click();
    const t = document.querySelector("#nav-toggle");
    const m = document.querySelector("#primary-menu");
    return t.getAttribute("aria-expanded") === "true" && m.classList.contains("is-open");
  })()`);

  out.menuClosesOnNavClick = await evaluate(`(() => {
    document.querySelector('#primary-menu a[href="#services"]').click();
    const t = document.querySelector("#nav-toggle");
    return t.getAttribute("aria-expanded") === "false";
  })()`);

  out.menuEscapeCloses = await evaluate(`(() => {
    const t = document.querySelector("#nav-toggle");
    t.click();
    const opened = t.getAttribute("aria-expanded") === "true";
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    return opened && t.getAttribute("aria-expanded") === "false";
  })()`);

  /* ---------- B. Accordion ---------- */
  out.accordionWorks = await evaluate(`(() => {
    const btn = document.querySelector("#acc-btn-1");
    const panel = document.querySelector("#acc-panel-1");
    const before = panel.hidden;
    btn.click();
    const afterOpen = panel.hidden === false && btn.getAttribute("aria-expanded") === "true";
    // opening a second one closes the first
    document.querySelector("#acc-btn-2").click();
    const firstClosed = panel.hidden === true;
    const secondOpen = document.querySelector("#acc-panel-2").hidden === false;
    // collapse again
    document.querySelector("#acc-btn-2").click();
    const secondClosed = document.querySelector("#acc-panel-2").hidden === true;
    return before && afterOpen && firstClosed && secondOpen && secondClosed;
  })()`);

  /* ---------- C. FAQ (details) ---------- */
  out.faqWorks = await evaluate(`(() => {
    const items = document.querySelectorAll(".faq__item");
    items[0].open = true;
    return items[0].open === true;
  })()`);

  out.faqExclusive = await evaluate(`(() => {
    const items = document.querySelectorAll(".faq__item");
    items[1].open = true;
    items[1].dispatchEvent(new Event("toggle"));
    return new Promise((res) => setTimeout(() => res(items[0].open === false && items[1].open === true), 60));
  })()`);

  /* ---------- D. Lightbox with no proof images present ---------- */
  out.lightboxStaysClosedWithoutImage = await evaluate(`(() => {
    const trigger = document.querySelector("[data-lightbox-trigger]");
    trigger.click();
    const lb = document.querySelector("#lightbox");
    return lb.hidden === true;
  })()`);

  /* ---------- E. Lightbox with a simulated real proof image ---------- */
  out.lightboxOpensWithImage = await evaluate(`(() => {
    // Simulate a supplied proof: reveal the img and give it a real source.
    const card = document.querySelector(".proof-card");
    const img = card.querySelector(".proof-card__img");
    img.hidden = false;
    card.querySelector(".proof-ph").hidden = true;
    img.src = "assets/brand/fg-mark.png";
    const trigger = card.querySelector("[data-lightbox-trigger]");
    trigger.click();
    const lb = document.querySelector("#lightbox");
    const lbImg = document.querySelector("#lightbox-img");
    return lb.hidden === false && lb.classList.contains("is-open")
      && lbImg.getAttribute("src").indexOf("fg-mark.png") > -1
      && document.body.classList.contains("no-scroll");
  })()`);

  out.lightboxFocusMovedInside = await evaluate(`(() => {
    const lb = document.querySelector("#lightbox");
    return lb.contains(document.activeElement);
  })()`);

  out.lightboxEscapeCloses = await evaluate(`(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    return new Promise((res) => setTimeout(() => {
      const lb = document.querySelector("#lightbox");
      res(lb.hidden === true && !document.body.classList.contains("no-scroll"));
    }, 320));
  })()`);

  /* ---------- F. Reduced motion ---------- */
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.navigate", { url: URL });
  await new Promise((r) => setTimeout(r, 2000));
  out.reducedMotionShowsAllContent = await evaluate(`(() => {
    const total = document.querySelectorAll(".reveal").length;
    const visible = document.querySelectorAll(".reveal.is-visible").length;
    return { total, visible, allVisible: total === visible };
  })()`);

  /* ---------- G. Console errors ---------- */
  out.consoleErrors = consoleErrors;

  console.log(JSON.stringify(out, null, 1));
  ws.close();
  process.exit(0);
};
ws.onerror = (e) => { console.error("ws error", e.message || e); process.exit(1); };
