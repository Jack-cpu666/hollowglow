/* =====================================================================
   PRODUCT & STORE CONFIG  —  edit everything about the store HERE.
   (title, price, photos, copy, specs, shipping, variants, checkout)
   ===================================================================== */
window.STORE = {
  brand: "Hollowglow",
  hero: { tag: "New for Halloween", headline: "Five ghosts. One string.", accent: "Zero effort." },
  tagline: "Haunted-house glow for any porch, mantel or window.",
  siteUrl: "https://hollowglow.onrender.com",
  supportEmail: "",                  // shown in footer/FAQ when filled in, e.g. "hello@yourdomain.com"
  currency: "USD",

  /* ---------- Shipping / promos (edit to match what you can truly deliver) ---------- */
  shipping: {
    cost: 0,                                   // 0 = free shipping
    headline: "Free 2-day shipping",
    deliveryEstimate: "Ships from the USA · arrives in about 2 business days",   // edit if your carrier timing changes
    deliveryNote: "US orders only. You'll get a tracking number by email as soon as your order ships.",
    announcement: "Free 2-day shipping within the USA · Secure checkout powered by Stripe"
  },

  /* ---------- Checkout (Stripe Payment Links). One link per quantity 1..4 ----------
     Create these in Stripe → Payment Links, then paste the URLs below. */
  checkout: {
    maxQty: 999,
    paymentLink: "https://buy.stripe.com/cNi3cufJL4FHfEsg5jcIE02"
  },

  /* ---------- The product ---------- */
  product: {
    id: "wizard-ghost-string-lights",
    title: "Wizard Hat Ghost String Lights",
    subtitle: "5 hanging LED ghosts in wizard hats · 3 m string · battery powered",
    price: 9.99,
    compareAtPrice: null,            // e.g. 14.99 to show a sale price
    inventory: null,                 // null = don't show stock; or a number
    availability: "In stock",
    sku: "WGSL-5",
    short: "Five little ghosts in wizard hats, strung along one 3-meter line and lit with 30 colorful LEDs. Hang them from a porch, mantel, doorway or tree and let them glow after dark.",

    /* Variants. With one variant the selector is hidden. Add more to show a picker. */
    variants: [
      { id: "5-ghost-string", label: "5 Ghosts · 3 m string", price: 9.99, image: 0 }
    ],

    /* Photos (first = main). thumb is a small preview. */
    images: [
      { src: "images/ghosts-night.webp",  fallback: "images/ghosts-night.jpg",  thumb: "images/ghosts-night-thumb.webp",  alt: "Wizard hat ghost lights glowing orange and white in a dark Halloween garden" },
      { src: "images/mantel-glow.webp",   fallback: "images/mantel-glow.jpg",   thumb: "images/mantel-glow-thumb.webp",   alt: "Row of five hanging wizard hat ghosts lit with colorful LEDs above a fireplace" },
      { src: "images/flat-lay.webp",      fallback: "images/flat-lay.jpg",      thumb: "images/flat-lay-thumb.webp",      alt: "Ghost string lights laid flat next to the open battery box" },
      { src: "images/dimensions.webp",    fallback: "images/dimensions.jpg",    thumb: "images/dimensions-thumb.webp",    alt: "Size diagram: ghost 20 cm wide and 45 cm tall, 3 m string with 30 LEDs" }
    ],

    /* Section A — Why you'll love it (icons are emoji so no extra files) */
    features: [
      { icon: "ghost", title: "Five ghosts, one string",  text: "Five fabric ghosts in pointed wizard hats hang from a single 3 m line — instant spooky scenery in one go." },
      { icon: "bulb", title: "30 colorful LEDs",         text: "Multicolor lights glow through the fabric, so the ghosts light up like tiny lanterns after dark." },
      { icon: "battery", title: "Battery powered",          text: "Runs on 3 × AA batteries (not included). No outlet needed, so you can hang them wherever they look best." },
      { icon: "drop", title: "Waterproof battery box",   text: "The battery box is waterproof, which makes porches, patios and covered outdoor spots fair game." },
      { icon: "switch", title: "Simple manual switch",     text: "Flip the switch on the battery box to turn them on and pick your light setting. No app, no remote to lose." },
      { icon: "feather", title: "Lightweight fabric",       text: "Soft, light ghosts hang easily from hooks, branches, curtain rods, railings and door frames." }
    ],

    /* Section B — See it in action: indexes into images[] */
    inAction: [
      { image: 0, caption: "Garden & porch", text: "Hang them from a tree branch or porch beam for a glow you can see from the street." },
      { image: 1, caption: "Mantel & doorway", text: "String them across a fireplace, doorway or window for an easy indoor Halloween scene." },
      { image: 2, caption: "Easy setup", text: "Five ghosts on one string with the battery box at the end. That's the whole setup." }
    ],

    /* How it works (3 steps) and the full-width banner + closing call-to-action */
    steps: [
      { title: "Hang", text: "Drape the 3 m string over a porch beam, mantel, doorway or tree branch. The ghosts hang down on their own." },
      { title: "Power up", text: "Pop 3 AA batteries (not included) into the waterproof battery box at the end of the string." },
      { title: "Haunt", text: "Flip the switch and the ghosts glow in colorful light as soon as it gets dark." }
    ],
    banner: { headline: "Lights out. Ghosts on.", text: "Five wizard hat ghosts, thirty colorful LEDs and about thirty seconds of setup.", cta: "Get yours" },
    closing: "Free 2-day shipping within the USA, secure checkout with Stripe.",

    /* Section C — verified specs (from the supplier listing). Edit if you confirm different values. */
    specs: [
      ["Product",            "LED wizard hat ghost string lights"],
      ["Ghosts per string",  "5"],
      ["LEDs",               "30, multicolor"],
      ["String length",      "3 m (9.8 ft) with 0.5 m (1.6 ft) lead to the battery box"],
      ["Ghost size",         "About 20 cm wide × 45 cm tall (7.9 × 17.7 in)"],
      ["Material",           "Fabric"],
      ["Power",              "3 × AA batteries (not included)"],
      ["Battery box",        "Waterproof, with manual switch"],
      ["Occasion",           "Halloween decoration"],
      ["Packaged weight",    "About 0.22 kg (0.5 lb)"],
      ["Package size",       "14 × 6 × 6 cm (5.5 × 2.4 × 2.4 in)"]
    ],

    /* Section D — what's included */
    included: [
      "1 × string of 5 wizard hat ghosts (3 m, 30 LEDs)",
      "1 × waterproof battery box with manual switch"
    ],
    notIncluded: "3 × AA batteries are not included.",
    photoNote: "Lifestyle photos show props and extra decor. Your set includes the items listed under What's included.",

    faq: [
      { q: "Do I need batteries?", a: "Yes. The lights run on 3 × AA batteries, which are not included in the package." },
      { q: "Can I use them outdoors?", a: "The battery box is waterproof, so they work well on porches, patios and under cover. For best results, keep the ghosts out of heavy rain and strong wind and take them down in storms." },
      { q: "How long is the string and how big are the ghosts?", a: "The string is 3 m (9.8 ft) with an extra 0.5 m lead to the battery box. Each ghost is roughly 20 cm wide and 45 cm tall." },
      { q: "How do I turn them on?", a: "Use the manual switch on the battery box. There's no app or remote." },
      { q: "How fast is shipping?", a: "Shipping is free and orders ship from the USA. Most orders arrive in about 2 business days. You'll receive tracking by email as soon as your order ships." },
      { q: "Do you ship outside the US?", a: "Not yet. We currently ship to addresses in the United States only." },
      { q: "What is your return policy?", a: "If your order arrives damaged, defective or not as described, contact us within 30 days of delivery and we'll make it right with a replacement or refund." },
      { q: "Is checkout secure?", a: "Yes. Payment is handled by Stripe. Your card details go directly to Stripe and never touch this site." }
    ],

    care: "Care: Remove the batteries when storing. Wipe the ghosts gently with a damp cloth if needed and let them dry completely before packing away."
  },

  seo: {
    title: "Wizard Hat Ghost String Lights – 5 LED Halloween Ghosts | Hollowglow",
    description: "Hang 5 glowing wizard hat ghosts on one 3 m string with 30 colorful LEDs. Battery powered with a waterproof battery box. $9.99 with free 2-day US shipping."
  }
};
