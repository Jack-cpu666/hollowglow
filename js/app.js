(() => {
"use strict";
const S = window.STORE, P = S.product;
const $ = (s, r = document) => r.querySelector(s);
const money = n => "$" + Number(n).toFixed(2);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const KEY = "hollowglow_cart_v1";
const maxQty = S.checkout.maxQty;
const ICONS = {
  ghost: '<path d="M5 21V10a7 7 0 0 1 14 0v11l-2.5-2-2.3 2-2.2-2-2.2 2-2.3-2z"/><circle cx="9.5" cy="10" r="1" fill="currentColor"/><circle cx="14.5" cy="10" r="1" fill="currentColor"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  battery: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4M7 10v4M11 10v4"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  switch: '<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="16" cy="12" r="2.2" fill="currentColor"/>',
  feather: '<path d="M20 4c-8 0-14 5-14 12v4M20 4c0 8-5 13-12 13M6 20l9-9"/>'
};

/* ---------- state ---------- */
let variant = P.variants[0], qty = 1, imgIdx = 0, cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY) || "[]").filter(l => P.variants.some(v => v.id === l.id)); } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
const totalQty = () => cart.reduce((a, l) => a + l.qty, 0);
const vById = id => P.variants.find(v => v.id === id);

/* ---------- render ---------- */
function picture(img) {
  return `<picture><source srcset="${img.src}" type="image/webp"><img src="${img.fallback}" alt="${esc(img.alt)}" width="800" height="800" loading="lazy" decoding="async"></picture>`;
}
function burstPoints(n, ro, ri) { let pts = []; for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n - Math.PI / 2, r = i % 2 ? ri : ro; pts.push((50 + r * Math.cos(a)).toFixed(1) + "," + (50 + r * Math.sin(a)).toFixed(1)); } return pts.join(" "); }
function tapeHTML(items) { const one = items.map(t => `<span>${esc(t)}</span>`).join(""); return one + one + one + one; }
function renderPage() {
  const sh = S.shipping;
  $("#topTrack").innerHTML = tapeHTML([sh.headline, "5 ghosts on one string", "30 colorful LEDs", "Secure checkout"]) + tapeHTML([sh.headline, "5 ghosts on one string", "30 colorful LEDs", "Secure checkout"]);
  $("#heroTag").textContent = S.hero.tag;
  $("#heroHead").innerHTML = `${esc(S.hero.headline)} <span>${esc(S.hero.accent)}</span>`;
  $("#burstSvg").innerHTML = `<polygon points="${burstPoints(13, 49, 38)}" fill="#c9ff3d" stroke="#140a1f" stroke-width="3" stroke-linejoin="round"/>`;
  $("#burstPrice").innerHTML = `<small>only</small>${money(P.price)}`;
  $("#shipSticker").textContent = sh.cost ? "Ships from the USA" : "Free 2-day shipping";
  $("#freeship").hidden = !!sh.cost;
  $("#crumbTitle") && ($("#crumbTitle").textContent = P.title);
  $("#title").textContent = P.title; $("#subtitle").textContent = P.subtitle; $("#short").textContent = P.short;
  $("#stock").textContent = P.inventory != null && P.inventory <= 10 && P.inventory > 0 ? `Only ${P.inventory} left` : P.availability;
  $("#shipHead").textContent = "🚚 " + sh.headline;
  $("#shipEst").textContent = sh.deliveryEstimate; $("#shipNote").textContent = sh.deliveryNote;
  $("#photoNote").textContent = P.photoNote || "";
  $("#thumbs").innerHTML = P.images.map((im, i) => `<button class="thumb" data-i="${i}" aria-label="Show photo ${i + 1}"><img src="${im.thumb}" alt="" width="80" height="80" loading="lazy"></button>`).join("");
  $("#features").innerHTML = P.features.map(f => `<div class="card reveal"><div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[f.icon] || ICONS.ghost}</svg></div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join("");
  $("#steps").innerHTML = P.steps.map((st, i) => `<div class="step reveal"><div class="n">${i + 1}</div><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></div>`).join("");
  const hw = P.banner.headline.split(". "); $("#bannerH").innerHTML = hw.length > 1 ? `${esc(hw[0])}.<br><span>${esc(hw.slice(1).join(". "))}</span>` : esc(P.banner.headline);
  $("#bannerP").textContent = P.banner.text;
  const cta = `${P.banner.cta} · ${money(P.price)}`; $("#bannerBtn").textContent = cta; $("#finalBtn").textContent = cta; $("#finalP").textContent = P.closing;
  const tapeItems = [sh.headline, ...P.features.map(f => f.title)];
  $("#tapeA").innerHTML = tapeHTML(tapeItems) + tapeHTML(tapeItems); $("#tapeB").innerHTML = tapeHTML([...tapeItems].reverse()) + tapeHTML([...tapeItems].reverse());
  $("#inAction").innerHTML = P.inAction.map(a => `<figure class="shot reveal">${picture(P.images[a.image])}<figcaption><b>${esc(a.caption)}</b><span>${esc(a.text)}</span></figcaption></figure>`).join("");
  $("#specs").innerHTML = P.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  $("#included").innerHTML = `<h3>What's in the box</h3><ul>${P.included.map(i => `<li>${esc(i)}</li>`).join("")}</ul><p class="warn">⚠️ ${esc(P.notIncluded)}</p><p class="care">${esc(P.care)}</p>`;
  $("#faqList").innerHTML = P.faq.map(f => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
  $("#fBrand").textContent = S.brand; $("#fTag").textContent = S.tagline;
  $("#fHelp").innerHTML = (S.supportEmail ? `Questions? <a href="mailto:${esc(S.supportEmail)}">${esc(S.supportEmail)}</a><br>` : "Questions? Reply to your order confirmation email.<br>") + `Returns: ${esc((P.faq.find(f => /return/i.test(f.q)) || {}).a || "")}`;
  $("#fCopy").textContent = `© ${new Date().getFullYear()} ${S.brand}. All rights reserved.`;
  if (P.variants.length > 1) { $("#variantField").hidden = false; $("#variants").innerHTML = P.variants.map(v => `<button class="chip" data-v="${v.id}" aria-pressed="${v.id === variant.id}">${esc(v.label)}</button>`).join(""); }
  structuredData();
}
function structuredData() {
  const base = S.siteUrl || location.origin + location.pathname.replace(/[^/]*$/, "");
  const ld = { "@context": "https://schema.org", "@type": "Product", name: P.title, description: P.short, sku: P.sku,
    image: P.images.map(i => new URL(i.fallback, base).href), brand: { "@type": "Brand", name: S.brand },
    offers: { "@type": "Offer", url: base, priceCurrency: S.currency, price: variant.price.toFixed(2), availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition",
      shippingDetails: { "@type": "OfferShippingDetails", shippingRate: { "@type": "MonetaryAmount", value: S.shipping.cost, currency: S.currency }, shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" } } } };
  const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
}

/* ---------- gallery ---------- */
const mainImg = $("#mainImg"), stage = $("#stage");
function showImg(i, instant) {
  imgIdx = (i + P.images.length) % P.images.length; const im = P.images[imgIdx];
  mainImg.style.opacity = instant ? 1 : 0;
  const swap = () => { mainImg.src = im.src; mainImg.alt = im.alt; mainImg.onerror = () => { mainImg.onerror = null; mainImg.src = im.fallback; }; mainImg.style.opacity = 1; };
  instant ? swap() : setTimeout(swap, 120);
  document.querySelectorAll(".thumb").forEach((t, k) => t.setAttribute("aria-current", k === imgIdx));
}
$("#thumbs").addEventListener("click", e => { const t = e.target.closest(".thumb"); if (t) showImg(+t.dataset.i); });
$("#prev").onclick = e => { e.stopPropagation(); showImg(imgIdx - 1); };
$("#next").onclick = e => { e.stopPropagation(); showImg(imgIdx + 1); };
stage.addEventListener("mousemove", e => { if (!matchMedia("(hover:hover)").matches) return; const r = stage.getBoundingClientRect(); mainImg.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; stage.classList.add("zoom"); });
stage.addEventListener("mouseleave", () => stage.classList.remove("zoom"));
function swipe(el, onL, onR) { let x0 = null, y0 = null; el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? onL : onR)(); x0 = null; }, { passive: true }); }
swipe(stage, () => showImg(imgIdx + 1), () => showImg(imgIdx - 1));
const lb = $("#lb"), lbImg = $("#lbImg");
function lbShow(i) { imgIdx = (i + P.images.length) % P.images.length; const im = P.images[imgIdx]; lbImg.src = im.src; lbImg.alt = im.alt; $("#lbCount").textContent = `${imgIdx + 1} / ${P.images.length}`; }
function lbOpen() { lbShow(imgIdx); lb.classList.add("on"); document.body.style.overflow = "hidden"; $("#lbClose").focus(); }
function lbClose() { lb.classList.remove("on"); document.body.style.overflow = ""; showImg(imgIdx, true); }
stage.addEventListener("click", lbOpen); stage.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen(); } });
$("#lbClose").onclick = lbClose; $("#lbPrev").onclick = () => lbShow(imgIdx - 1); $("#lbNext").onclick = () => lbShow(imgIdx + 1);
lb.addEventListener("click", e => { if (e.target === lb) lbClose(); }); swipe(lb, () => lbShow(imgIdx + 1), () => lbShow(imgIdx - 1));
addEventListener("keydown", e => { if (lb.classList.contains("on")) { if (e.key === "Escape") lbClose(); if (e.key === "ArrowLeft") lbShow(imgIdx - 1); if (e.key === "ArrowRight") lbShow(imgIdx + 1); } else if (drawer.classList.contains("on") && e.key === "Escape") closeCart(); });

/* ---------- price / qty / variants ---------- */
function updatePrice() {
  $("#price").textContent = money(variant.price);
  const cmp = P.compareAtPrice, onSale = cmp && cmp > variant.price;
  $("#compare").hidden = $("#save").hidden = !onSale;
  if (onSale) { $("#compare").textContent = money(cmp); $("#save").textContent = `Save ${Math.round((1 - variant.price / cmp) * 100)}%`; }
  $("#addPrice").textContent = money(variant.price * qty); $("#qVal").textContent = qty;
  $("#qMinus").disabled = qty <= 1; $("#qPlus").disabled = qty >= maxQty;
  $("#stickyPrice").textContent = money(variant.price); $("#stickySmall").textContent = S.shipping.cost ? "+ shipping" : "Free 2-day shipping";
}
$("#qMinus").onclick = () => { qty = Math.max(1, qty - 1); updatePrice(); };
$("#qPlus").onclick = () => { qty = Math.min(maxQty, qty + 1); updatePrice(); };
$("#variants").addEventListener("click", e => { const c = e.target.closest(".chip"); if (!c) return; variant = vById(c.dataset.v); document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === c)); if (variant.image != null) showImg(variant.image); updatePrice(); });

/* ---------- cart ---------- */
const drawer = $("#drawer"), scrim = $("#scrim");
function openCart() { renderCart(); drawer.classList.add("on"); scrim.classList.add("on"); drawer.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; $("#closeCart").focus(); }
function closeCart() { drawer.classList.remove("on"); scrim.classList.remove("on"); drawer.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 2800); }
function addToCart(id, n) {
  const room = maxQty - totalQty();
  if (room <= 0) { toast(`Maximum ${maxQty} per order`); return false; }
  n = Math.min(n, room); const l = cart.find(x => x.id === id); l ? l.qty += n : cart.push({ id, qty: n }); save(); updateBadge(); return true;
}
function updateBadge() { const n = totalQty(), c = $("#cartCount"), changed = c.textContent !== String(n); c.textContent = n; c.dataset.n = n; if (changed) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); } }
function checkoutUrl() { const n = Math.min(totalQty(), maxQty); return (S.checkout.paymentLink || "").trim(); }
function goCheckout() {
  if (!totalQty()) return;
  const url = checkoutUrl();
  if (!url) { toast("Checkout isn't connected yet. Add the Stripe Payment Links in js/product.js."); return; }
  location.href = url;
}
function renderCart() {
  const body = $("#dBody"), foot = $("#dFoot");
  if (!cart.length) { body.innerHTML = `<div class="empty"><div class="big">🎃</div><p>Your cart is empty.</p></div>`; foot.innerHTML = `<button class="btn btn-primary" style="width:100%" id="contBtn">Keep shopping</button>`; $("#contBtn").onclick = closeCart; return; }
  body.innerHTML = cart.map(l => { const v = vById(l.id), im = P.images[v.image || 0];
    return `<div class="line"><img src="${im.thumb}" alt="${esc(im.alt)}" width="82" height="82"><div><h3>${esc(P.title)}</h3><small>${esc(v.label)} · ${money(v.price)}</small><div class="qty"><button data-a="dec" data-id="${l.id}" aria-label="Decrease">−</button><output>${l.qty}</output><button data-a="inc" data-id="${l.id}" aria-label="Increase" ${totalQty() >= maxQty ? "disabled" : ""}>+</button></div><button class="rm" data-a="rm" data-id="${l.id}">Remove</button></div><strong>${money(v.price * l.qty)}</strong></div>`; }).join("");
  const sub = cart.reduce((a, l) => a + vById(l.id).price * l.qty, 0), ship = S.shipping.cost;
  foot.innerHTML = `<div class="sum"><span>Subtotal</span><span>${money(sub)}</span></div><div class="sum"><span>Shipping</span><span>${ship ? money(ship) : "Free"}</span></div><div class="sum total"><span>Total</span><span>${money(sub + ship)}</span></div><button class="btn btn-primary" style="width:100%" id="coBtn">Checkout securely</button><p class="secure">🔒 Secure payment by Stripe · ${esc(S.shipping.deliveryEstimate)}</p>`;
  $("#coBtn").onclick = goCheckout;
}
$("#dBody").addEventListener("click", e => { const b = e.target.closest("[data-a]"); if (!b) return; const l = cart.find(x => x.id === b.dataset.id); if (!l) return;
  if (b.dataset.a === "inc" && totalQty() < maxQty) l.qty++; if (b.dataset.a === "dec") l.qty--; if (b.dataset.a === "rm") l.qty = 0;
  cart = cart.filter(x => x.qty > 0); save(); updateBadge(); renderCart(); });
$("#openCart").onclick = openCart; $("#closeCart").onclick = closeCart; scrim.onclick = closeCart;
$("#addBtn").onclick = () => { if (addToCart(variant.id, qty)) { toast("Added to cart 👻"); openCart(); } };
$("#stickyAdd").onclick = () => $("#addBtn").click();
$("#buyBtn").onclick = () => { cart = [{ id: variant.id, qty }]; save(); updateBadge(); goCheckout(); };
const toBuy = () => $("#buy").scrollIntoView({ behavior: "smooth", block: "center" });
$("#bannerBtn").onclick = toBuy; $("#finalBtn").onclick = toBuy;

/* ---------- sticky bar + reveal ---------- */
new IntersectionObserver(es => es.forEach(e => $("#sticky").classList.toggle("on", !e.isIntersecting && e.boundingClientRect.top < 0)), { threshold: 0 }).observe($("#cta"));
const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }), { threshold: .12 });

renderPage(); showImg(0, true); updatePrice(); updateBadge();
document.querySelectorAll(".reveal").forEach(el => ro.observe(el));
})();
