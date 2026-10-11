// ===== Small helpers =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
};

// ===== Translations (English lives in the HTML, Italian here) =====
const IT = {
  "nav.about": "Chi sono",
  "nav.education": "Formazione",
  "nav.experience": "Esperienze",
  "nav.skills": "Competenze",
  "nav.contact": "Contatti",
  "hero.eyebrow": "📍 Milano → ora a Varsavia 🇵🇱",
  "hero.lead": "Studente della Laurea Magistrale in Banking &amp; Finance all'<strong>Università Cattolica di Milano</strong>, in Erasmus alla <strong>Kozminski University</strong>. Appassionato di investment banking, mercati dei capitali e di tutto ciò che un buon modello può spiegare.",
  "hero.cta1": "Contattami",
  "chart.name": "Lorenzo Ferraioli S.p.A. · Borsa della Vita",
  "chart.hint": "Passa sui punti per vedere le tappe 👆",
  "stats.cities": "città in cui ho studiato: Roma, Milano, Varsavia",
  "stats.bsc": "voto di laurea triennale, con lode",
  "stats.fs": "bilanci analizzati per la CFA Challenge",
  "stats.scout": "anni da scout ⛺",
  "about.title": "Chi sono",
  "about.p1": "Sono uno studente della Laurea Magistrale in Finanza all'<strong>Università Cattolica del Sacro Cuore</strong> di Milano e sto frequentando un semestre di scambio alla <strong>Kozminski University</strong> di Varsavia. Mi interessano molto l'<strong>investment banking e i mercati dei capitali</strong>.",
  "about.p2": "Ho sviluppato solide competenze in modellazione finanziaria, analisi quantitativa e valutazione del rischio, con un approccio basato sui dati. Parlo fluentemente italiano e inglese, mi trovo a mio agio in ambienti dinamici e multiculturali e sono pronto a crescere nel settore finanziario.",
  "about.p3": "Nel tempo libero smanetto con il codice: HTML, CSS e JavaScript (proprio questo sito 👋), più R e Python per i dati.",
  "edu.title": "Formazione",
  "edu.k.date": "Autunno 2026 · Varsavia 🇵🇱",
  "edu.k.role": "Semestre di scambio — #24 al mondo e #1 in Europa centro-orientale (FT 2026)",
  "edu.k.desc": "Percorso CFA: Portfolio Management, Alternative Investments, M&amp;A e Advanced Risk Management.",
  "edu.u.date": "2025 – 2027 · Milano 🇮🇹",
  "edu.u.role": "Laurea Magistrale in Banking and Finance",
  "edu.s.date": "2022 – 2025 · Roma 🇮🇹",
  "edu.s.role": "Laurea Triennale in Banca, Assicurazioni e Mercati Finanziari · 110/110 e lode",
  "edu.s.thesis": "🎓 Tesi: <em>“The role of Catastrophe Bonds in Disaster Risk Financing and Capital Markets”</em>",
  "exp.title": "Esperienze",
  "exp.cfa.desc": "Equity research approfondita su <strong>Industrie De Nora S.p.A.</strong>, quotata alla Borsa Italiana.",
  "exp.cfa.l1": "Analizzati oltre 10 bilanci, trend di settore e posizionamento competitivo",
  "exp.cfa.l2": "Valutazione con DCF, multipli di mercato e transazioni comparabili",
  "exp.cfa.l3": "Report di equity research consegnato in team, con scadenze strette",
  "exp.rge.title": "Stagista in Amministrazione e Contabilità",
  "exp.rge.role": "RGE Associated · Agenzia assicurativa",
  "exp.rge.l1": "Gestione della documentazione contabile, fatture e riconciliazioni",
  "exp.rge.l2": "Supporto nella preparazione dei report finanziari e nelle attività quotidiane",
  "exp.rge.l3": "Rispetto dei principi contabili e della normativa assicurativa",
  "skills.title": "Competenze",
  "skills.fin": "📈 Finanza",
  "skills.tech": "💻 Tecnologia",
  "skills.lang": "🗣️ Lingue",
  "skills.native": "Madrelingua",
  "skills.elem": "Base",
  "int.title": "Lontano dai fogli Excel",
  "int.scout": "Scout",
  "int.football": "Calcio",
  "int.travel": "Viaggi",
  "int.cooking": "Cucina",
  "int.hint": "Tocca una card per una curiosità 👆",
  "int.f1": "⛺ 14 anni nell'AGESCI: so montare una tenda sotto la pioggia e un DCF sotto scadenza.",
  "int.f2": "⚽ Il calcio mi ha insegnato che anche le migliori strategie hanno bisogno di gioco di squadra.",
  "int.f3": "✈️ Roma, Milano, Varsavia… il mio portafoglio di città è ben diversificato.",
  "int.f4": "🍝 Da buon campano: la pasta non si spezza. Mai. È un vincolo di bilancio non negoziabile.",
  "contact.title": "Parliamo di finanza (o di pasta) 🤝",
  "contact.text": "Aperto a stage, progetti e a una bella chiacchierata sui mercati.",
  "footer": "Fatto a mano con HTML, CSS e JS — nessun falco è stato maltrattato.",
};

const EN_FACTS = {
  "int.f1": "⛺ 14 years in AGESCI: I can pitch a tent in the rain and a DCF under a deadline.",
  "int.f2": "⚽ Football taught me that even the best strategy needs teamwork.",
  "int.f3": "✈️ Rome, Milan, Warsaw… my portfolio of cities is well diversified.",
  "int.f4": "🍝 Proudly from Campania: never break the spaghetti. It's a hard budget constraint.",
};

const original = new Map($$("[data-i18n]").map((el) => [el, el.innerHTML]));
let lang = store.get("lang") === "it" ? "it" : "en";

function t(key) {
  if (lang === "it" && IT[key]) return IT[key];
  return EN_FACTS[key] ?? null;
}

function applyLang() {
  document.documentElement.lang = lang;
  for (const [el, html] of original) {
    el.innerHTML = lang === "it" && IT[el.dataset.i18n] ? IT[el.dataset.i18n] : html;
  }
  $("#lang").textContent = lang === "it" ? "EN" : "IT";
  activeMilestone = null;
}

$("#lang").addEventListener("click", () => {
  lang = lang === "it" ? "en" : "it";
  store.set("lang", lang);
  applyLang();
});

// ===== Theme =====
const themeBtn = $("#theme");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "light" ? "🌙" : "☀️";
  store.set("theme", theme);
}
setTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
themeBtn.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));

// ===== Ticker tape =====
const tickers = [
  ["UCSC", "MSC", "+banking & finance", "up"],
  ["SAPZ", "110L", "+10%", "up"],
  ["DCF", "✓", "+value", "up"],
  ["CATB", "BOND", "+thesis", "up"],
  ["WAW", "🇵🇱", "+exchange", "up"],
  ["COFFEE", "∞", "+42%", "up"],
  ["SLEEP", "6.5h", "-1.2%", "down"],
  ["PASTA", "100g", "+al dente", "up"],
  ["DENORA", "BUY?", "+research", "up"],
  ["SCOUT", "14Y", "+estote parati", "up"],
];
const tickerHtml = tickers
  .map(([sym, px, chg, dir]) => `<span>${sym} ${px}<b class="${dir}">${dir === "up" ? "▲" : "▼"} ${chg}</b></span>`)
  .join("");
$("#ticker").innerHTML = tickerHtml + tickerHtml; // duplicated for a seamless loop

// ===== Career chart =====
const milestones = [
  { x: 0, y: 20, en: "<b>2020</b> · Joined GitHub as LoryTheHawk 🦅", it: "<b>2020</b> · Mi iscrivo a GitHub come LoryTheHawk 🦅" },
  { x: 1, y: 38, en: "<b>Sep 2022</b> · Start B.Sc. at Sapienza + internship at RGE Associated", it: "<b>Set 2022</b> · Inizio triennale alla Sapienza + stage in RGE Associated" },
  { x: 2, y: 52, en: "<b>Nov 2024</b> · CFA Research Challenge on De Nora", it: "<b>Nov 2024</b> · CFA Research Challenge su De Nora" },
  { x: 3, y: 74, en: "<b>Sep 2025</b> · B.Sc. 110/110 cum laude 🎓 + start M.Sc. at UCSC", it: "<b>Set 2025</b> · Laurea 110/110 e lode 🎓 + inizio magistrale in Cattolica" },
  { x: 4, y: 88, en: "<b>Sep 2026</b> · Exchange semester at Kozminski, Warsaw 🇵🇱", it: "<b>Set 2026</b> · Semestre di scambio alla Kozminski, Varsavia 🇵🇱" },
  { x: 5, y: 100, en: "<b>Next</b> · Investment banking & capital markets? 🚀", it: "<b>Prossimamente</b> · Investment banking e mercati dei capitali? 🚀" },
];
let activeMilestone = null;

function drawChart() {
  const W = 400, H = 200, padL = 8, padR = 12, padT = 14, padB = 22;
  const maxX = milestones.length - 1;
  const px = (x) => padL + (x / maxX) * (W - padL - padR);
  const py = (y) => H - padB - (y / 100) * (H - padT - padB);

  // Add some deterministic "market noise" between milestones
  const pts = [];
  milestones.forEach((m, i) => {
    pts.push([px(m.x), py(m.y)]);
    const next = milestones[i + 1];
    if (!next) return;
    for (let s = 1; s < 6; s++) {
      const f = s / 6;
      const noise = Math.sin((i + 1) * 7.3 + s * 2.1) * 6;
      pts.push([px(m.x + f), py(m.y + (next.y - m.y) * f + noise)]);
    }
  });

  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const line = $("#line");
  line.setAttribute("d", d);
  line.style.setProperty("--len", Math.ceil(line.getTotalLength()));
  $("#area").setAttribute("d", `${d} L${px(maxX)},${H - padB} L${px(0)},${H - padB} Z`);

  const years = ["2020", "2022", "2024", "2025", "2026", "→"];
  $("#grid").innerHTML = [25, 50, 75]
    .map((y) => `<line x1="0" x2="${W}" y1="${py(y)}" y2="${py(y)}" />`)
    .join("") + years.map((yr, i) => `<text x="${px(i)}" y="${H - 4}" text-anchor="middle">${yr}</text>`).join("");

  $("#dots").innerHTML = milestones
    .map((m, i) => `<circle class="dot" tabindex="0" r="5.5" cx="${px(m.x)}" cy="${py(m.y)}" data-i="${i}" style="animation-delay:${0.4 + i * 0.35}s" />`)
    .join("");

  $$(".dot").forEach((dot) => {
    const show = () => {
      activeMilestone = Number(dot.dataset.i);
      $("#tip").innerHTML = milestones[activeMilestone][lang];
    };
    dot.addEventListener("mouseenter", show);
    dot.addEventListener("focus", show);
    dot.addEventListener("click", show);
  });
}
drawChart();

// Animated "share price"
let price = 0;
const target = 110.0;
const priceEl = $("#price");
const tick = setInterval(() => {
  price += (target - price) * 0.08 + Math.random() * 0.6;
  if (price >= target - 0.5) { price = target; clearInterval(tick); }
  priceEl.textContent = price.toFixed(2);
}, 40);

// ===== Count-up stats & skill bars on scroll =====
function countUp(el) {
  const end = parseFloat(el.dataset.count);
  const dec = Number(el.dataset.dec || 0);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1400, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (end * eased).toFixed(dec) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

$$(".section, .stats").forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const el = entry.target;
    el.classList.add("is-visible");
    $$("[data-count]", el).forEach(countUp);
    $$(".bar", el).forEach((bar) => bar.querySelector("i").style.setProperty("--w", bar.dataset.level + "%"));
    io.unobserve(el);
  }
}, { threshold: 0.15 });
$$(".reveal").forEach((el) => io.observe(el));

// ===== Interests fun facts =====
$$(".interest").forEach((card) => {
  card.addEventListener("click", () => {
    $$(".interest").forEach((c) => c.classList.toggle("is-active", c === card));
    $("#fact").textContent = t(card.dataset.fact);
  });
});

// ===== Easter egg: click the logo and the hawk flies =====
$("#hawk").addEventListener("click", (e) => {
  e.preventDefault();
  const flyer = $("#flyer");
  flyer.classList.remove("is-flying");
  void flyer.offsetWidth; // restart the animation
  flyer.classList.add("is-flying");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("#year").textContent = new Date().getFullYear();
applyLang();
