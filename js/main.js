/* ==========================================================================
   FAITH GERALD ONLINE SERVICES — main.js
   Vanilla JS, no dependencies. Modules: config, header, nav, reveal,
   accordion, proof gallery, lightbox.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     SITE CONFIG — edit business details here.

     Two values MUST be replaced before this site goes live:
       siteUrl  — currently the placeholder https://example.com/
       contact  — currently empty (no contact details have been invented)

     checkConfig() below warns in the console while anything is unset, so a
     placeholder domain or a missing contact link cannot ship unnoticed.
     Nothing is faked to silence it.
     ------------------------------------------------------------------ */
  var SITE = {
    // CONFIGURE: production domain, used for canonical + Open Graph + JSON-LD.
    siteUrl: "https://example.com/",
    // CONFIGURE: brand / Open Graph image.
    ogImage: "https://example.com/assets/og/fg-online-services-cover.png",

    // CONFIGURE: real contact details. Leave a value as "" to hide that
    // button entirely rather than publishing a fake link.
    contact: {
      // e.g. "639171234567" (international format, digits only)
      whatsapp: "",
      // e.g. "09171234567"
      phone: "",
      // e.g. "faithgeraldonlineservices@gmail.com"
      email: "",
      // e.g. "https://m.me/yourpagehandle"
      messenger: "",
      // e.g. "https://www.facebook.com/yourpagehandle"
      facebook: ""
    },

    // Labels for each contact channel (button text)
    labels: {
      whatsapp: "Message Us",
      phone: "Call Us",
      email: "Email Us",
      messenger: "Message Us",
      facebook: "Visit Our Page"
    }
  };

  /* Reports unfinished configuration. Never throws and never blocks render:
     the page stays usable, it just says plainly what is still a placeholder. */
  function checkConfig() {
    var pending = [];

    if (/example\.com/.test(SITE.siteUrl)) {
      pending.push("siteUrl is still the placeholder https://example.com/ (canonical, Open Graph and JSON-LD all point at it)");
    }

    var channels = Object.keys(SITE.contact).filter(function (k) { return SITE.contact[k]; });
    if (!channels.length) {
      pending.push("no contact channel is set, so the Contact Us and Message Us buttons stay as in-page links");
    }

    if (pending.length && window.console && console.warn) {
      console.warn(
        "[Faith Gerald Online Services] Not ready to publish:\n - " +
        pending.join("\n - ") +
        "\nEdit SITE in js/main.js to resolve this."
      );
    }

    return pending;
  }

  var CONFIG_PENDING = checkConfig();

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ==================================================================
     1. HEADER — subtle shadow once the page scrolls
     ================================================================== */
  var header = $("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ==================================================================
     2. MOBILE NAV — accessible disclosure menu
     ================================================================== */
  (function mobileNav() {
    var toggle = $("#nav-toggle");
    var menu = $("#primary-menu");
    if (!toggle || !menu) return;

    var open = false;

    function setOpen(next) {
      open = next;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      menu.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () { setOpen(!open); });

    // Close after any in-page navigation so anchors are not covered.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Escape closes and returns focus to the toggle.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Click outside closes.
    document.addEventListener("click", function (event) {
      if (!open) return;
      if (!menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });

    // Leaving the mobile breakpoint resets state (prevents stuck menus).
    var mq = window.matchMedia("(min-width: 881px)");
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);

    // Resize while open must not shift layout: the menu is absolutely
    // positioned, so it never participates in page flow.
    window.addEventListener("resize", function () {
      if (open && window.innerWidth > 880) setOpen(false);
    });
  })();

  /* ==================================================================
     3. SCROLL REVEAL — one shared observer, motion-safe by CSS
     ================================================================== */
  (function reveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(el) { el.classList.add("is-visible"); }
    function showAll() { items.forEach(show); }

    // Anything already on screen must never wait for an observer callback.
    function showInView() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      items.forEach(function (el) {
        if (el.classList.contains("is-visible")) return;
        var box = el.getBoundingClientRect();
        if (box.top < vh && box.bottom > 0) show(el);
      });
    }

    if (reduced || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    // Opt in to the hidden-until-revealed styles only now that the observer
    // exists. Without this class the content simply renders normally.
    document.documentElement.classList.add("reveal-ready");

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });

    // Reveal is decoration, never a gate on content. These safety nets make
    // sure nothing can stay hidden if the observer is delayed or never fires.
    showInView();
    window.addEventListener("load", function () {
      showInView();
      window.setTimeout(showInView, 400);
    });
    window.addEventListener("resize", showInView);
    document.addEventListener("visibilitychange", showInView);

    // Last resort: after a few seconds, reveal everything still hidden so the
    // page can never present blank sections.
    window.setTimeout(showAll, 3000);
  })();

  /* ==================================================================
     4. ACCORDION — supported transactions (one panel open at a time)
     ================================================================== */
  (function accordion() {
    var root = $("[data-accordion]");
    if (!root) return;

    var buttons = $$(".acc-item__btn", root);

    function setPanel(btn, open) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(open));
      if (panel) panel.hidden = !open;
    }

    buttons.forEach(function (btn) {
      setPanel(btn, btn.getAttribute("aria-expanded") === "true");

      btn.addEventListener("click", function () {
        var willOpen = btn.getAttribute("aria-expanded") !== "true";
        buttons.forEach(function (other) { setPanel(other, false); });
        setPanel(btn, willOpen);
      });
    });

    // Arrow-key roving between headers, matching WAI-ARIA accordion pattern.
    root.addEventListener("keydown", function (event) {
      var index = buttons.indexOf(document.activeElement);
      if (index === -1) return;
      var next = null;

      if (event.key === "ArrowDown") next = buttons[(index + 1) % buttons.length];
      else if (event.key === "ArrowUp") next = buttons[(index - 1 + buttons.length) % buttons.length];
      else if (event.key === "Home") next = buttons[0];
      else if (event.key === "End") next = buttons[buttons.length - 1];

      if (next) {
        event.preventDefault();
        next.focus();
      }
    });
  })();

  /* ==================================================================
     5. FAQ — close other panels when one opens (progressive: <details>)
     ================================================================== */
  (function faq() {
    var items = $$(".faq__item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  })();

  /* ==================================================================
     6. PROOF GALLERY — honest placeholder + collapse/expand
     ================================================================== */
  (function proofs() {
    var grid = $("#proof-grid");
    if (!grid) return;

    var cards = $$(".proof-card", grid);
    var toggle = $("#proofs-toggle");
    var toggleLabel = $("#proofs-toggle-label");
    var VISIBLE_WHEN_COLLAPSED = 4;

    // If a proof image is missing, swap in a clearly labelled placeholder
    // instead of a broken image. Real receipt images drop into
    // assets/proofs/proof-NN.png with no code change.
    cards.forEach(function (card) {
      var img = $(".proof-card__img", card);
      var ph = $(".proof-ph", card);
      if (!img || !ph) return;

      var missing = false;

      var showPlaceholder = function () {
        if (missing) return; // already applied
        missing = true;
        img.hidden = true;
        ph.hidden = false;
        // The trigger has nothing to open, so take it out of the tab order.
        var trigger = $("[data-lightbox-trigger]", card);
        if (trigger) trigger.disabled = true;
      };

      img.addEventListener("error", showPlaceholder);

      // The image may already have failed before this script ran, in which
      // case no error event will ever fire. Check the settled state directly.
      var check = function () {
        if (img.complete && img.naturalWidth === 0) showPlaceholder();
      };
      check();
      if (!img.complete) img.addEventListener("load", check);

      // Last resort for a stalled request.
      window.setTimeout(check, 2500);

      ph.setAttribute("aria-hidden", "true");
    });

    if (!toggle) return;

    // Only offer "View More" when there is actually more to show.
    if (cards.length <= VISIBLE_WHEN_COLLAPSED) {
      grid.removeAttribute("data-collapsed");
      return;
    }

    var expanded = false;
    toggle.hidden = false;

    toggle.addEventListener("click", function () {
      expanded = !expanded;
      if (expanded) grid.removeAttribute("data-collapsed");
      else grid.setAttribute("data-collapsed", "");
      toggle.setAttribute("aria-expanded", String(expanded));
      if (toggleLabel) toggleLabel.textContent = expanded ? "Show Fewer Proofs" : "View More Proofs";
    });
  })();

  /* ==================================================================
     7. LIGHTBOX — accessible dialog with focus trap + scroll lock
     ================================================================== */
  (function lightbox() {
    var root = $("#lightbox");
    var img = $("#lightbox-img");
    var caption = $("#lightbox-caption");
    var title = $("#lightbox-title");
    var closeBtn = $("#lightbox-close");
    if (!root || !img || !closeBtn) return;

    var lastFocused = null;
    var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function isOpen() { return !root.hidden; }

    function open(trigger) {
      var card = trigger.closest(".proof-card");
      var source = card ? $(".proof-card__img", card) : null;
      var label = card ? ($(".proof-card__title", card) || {}).textContent : "";

      // Nothing real to show yet: never open an empty dialog.
      if (!source || source.hidden || !source.naturalWidth) return;

      img.src = source.currentSrc || source.src;
      img.alt = source.alt;
      if (title) title.textContent = label || "Transaction Proof";
      if (caption) caption.textContent = "Tap outside the image or press Escape to close.";

      lastFocused = trigger;
      root.hidden = false;

      // Force a frame so the transition runs from the initial state.
      requestAnimationFrame(function () { root.classList.add("is-open"); });

      document.body.classList.add("no-scroll");
      closeBtn.focus();
    }

    // 1x1 transparent GIF. Keeps the <img> valid before any proof is opened,
    // so the markup is never a src-less image.
    var BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    function close() {
      if (!isOpen()) return;
      root.classList.remove("is-open");
      document.body.classList.remove("no-scroll");

      var finish = function () {
        root.hidden = true;
        img.src = BLANK;
        img.alt = "";
        if (lastFocused) lastFocused.focus();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
      else window.setTimeout(finish, 200);
    }

    $$("[data-lightbox-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () { open(trigger); });
    });

    closeBtn.addEventListener("click", close);

    // Click outside the dialog closes.
    root.addEventListener("mousedown", function (event) {
      if (!event.target.closest(".lightbox__dialog")) close();
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      // Trap focus inside the dialog.
      if (event.key === "Tab") {
        var nodes = $$(FOCUSABLE, root).filter(function (el) { return el.offsetParent !== null; });
        if (!nodes.length) return;
        var first = nodes[0];
        var last = nodes[nodes.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  })();

  /* ==================================================================
     8. CONTACT CHANNELS — build links from SITE.contact, never fake data
     ================================================================== */
  (function contactChannels() {
    var c = SITE.contact;

    var links = [];
    if (c.whatsapp) {
      links.push({ href: "https://wa.me/" + c.whatsapp.replace(/\D/g, ""), label: SITE.labels.whatsapp });
    }
    if (c.messenger) {
      links.push({ href: c.messenger, label: SITE.labels.messenger });
    }
    if (c.phone) {
      links.push({ href: "tel:" + c.phone.replace(/\s/g, ""), label: SITE.labels.phone });
    }
    if (c.email) {
      links.push({ href: "mailto:" + c.email, label: SITE.labels.email });
    }
    if (c.facebook) {
      links.push({ href: c.facebook, label: SITE.labels.facebook });
    }

    var mounts = $$("[data-contact-actions]");
    if (!mounts.length || !links.length) return;

    mounts.forEach(function (mount) {
      mount.innerHTML = "";
      links.forEach(function (link, index) {
        var a = document.createElement("a");
        a.className = index === 0 ? "btn btn--onDark" : "btn btn--onDarkOutline";
        a.href = link.href;
        if (/^https?:/.test(link.href)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        a.textContent = link.label;
        mount.appendChild(a);
      });
    });
  })();

  /* ==================================================================
     9. SYNC CONFIG INTO HEAD — canonical, OG/Twitter URLs, JSON-LD
     ================================================================== */
  (function syncConfig() {
    var url = SITE.siteUrl;
    var ogImage = SITE.ogImage;

    var canonical = $('link[rel="canonical"]');
    if (canonical) canonical.href = url;

    var mapping = {
      'meta[property="og:url"]': url,
      'meta[property="og:image"]': ogImage,
      'meta[name="twitter:image"]': ogImage
    };

    Object.keys(mapping).forEach(function (selector) {
      var node = $(selector);
      if (!node) return;
      var value = mapping[selector];
      node.setAttribute("content", value);
      // Keep the social tags in sync with the canonical origin.
      $$('script[type="application/ld+json"]').forEach(function (script) {
        try {
          script.textContent = script.textContent
            .split('"https://example.com/').join('"' + url)
            .split("https://example.com/").join(url);
        } catch (err) {
          /* JSON-LD sync is best-effort; markup stays valid if it fails. */
        }
      });
    });
  })();

  /* ==================================================================
     10. FOOTER YEAR
     ================================================================== */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
