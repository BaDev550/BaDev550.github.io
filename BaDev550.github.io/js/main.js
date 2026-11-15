(function () {
  "use strict";
  var P = window.PORTFOLIO || { projects: [], skills: [] };
  var KIND = { game: "Game", engine: "Engine / graphics", web: "Web" };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- basic fields ---------- */
  var loc = document.getElementById("loc");
  if (loc && P.location) loc.textContent = P.location;
  var studio = document.getElementById("studio");
  if (studio && P.studio) studio.textContent = P.studio;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- projects ---------- */
  var grid = document.getElementById("projects");
  P.projects.forEach(function (p) {
    var card = el("article", "card reveal");
    card.dataset.kind = p.kind;

    var top = el("div", "card-top");
    top.appendChild(el("span", "kind", KIND[p.kind] || p.kind));
    top.appendChild(el("span", "status", p.year ? p.status + " · " + p.year : p.status));
    card.appendChild(top);

    card.appendChild(el("h3", null, p.title));
    card.appendChild(el("p", null, p.blurb));

    if (p.points && p.points.length) {
      var ul = el("ul");
      p.points.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      card.appendChild(ul);
    }

    var tags = el("div", "tags");
    (p.tags || []).forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
    card.appendChild(tags);

    var links = (p.links || []).filter(function (l) { return l.url; });
    if (links.length) {
      var row = el("div", "card-links");
      links.forEach(function (l) {
        var a = el("a", null, l.label + " ↗");
        a.href = l.url; a.target = "_blank"; a.rel = "noopener";
        row.appendChild(a);
      });
      card.appendChild(row);
    }
    grid.appendChild(card);
  });

  /* ---------- filters ---------- */
  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var f = chip.dataset.filter;
      grid.querySelectorAll(".card").forEach(function (c) {
        c.classList.toggle("hide", f !== "all" && c.dataset.kind !== f);
      });
    });
  });

  /* ---------- skills ---------- */
  var sg = document.getElementById("skill-groups");
  P.skills.forEach(function (g) {
    var box = el("div", "skill-group reveal");
    box.appendChild(el("h3", null, g.group));
    var ul = el("ul");
    g.items.forEach(function (i) { ul.appendChild(el("li", null, i)); });
    box.appendChild(ul);
    sg.appendChild(box);
  });

  /* ---------- contact ---------- */
  var cl = document.getElementById("contact-links");
  [["GitHub", P.github], ["Steam", P.steam], ["itch.io", P.itch], ["Email", P.email ? "mailto:" + P.email : ""]]
    .forEach(function (x, i) {
      if (!x[1]) return;
      var a = el("a", "btn" + (i === 0 ? " primary" : ""), x[0]);
      a.href = x[1];
      if (x[1].indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
      cl.appendChild(a);
    });

  /* ---------- architecture tabs ---------- */
  var tabs = document.querySelectorAll(".arch-tabs button");
  function select(name) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", t.dataset.tab === name ? "true" : "false"); });
    document.querySelectorAll(".panel").forEach(function (p) { p.hidden = p.id !== "tab-" + name; });
    document.querySelectorAll(".arch-flow .node").forEach(function (n) { n.classList.toggle("on", n.dataset.node === name); });
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { select(t.dataset.tab); }); });
  select("reflection");

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  } else {
    items.forEach(function (i) { i.classList.add("in"); });
  }

  /* ---------- hero: rotating wireframe (a tiny software renderer) ---------- */
  var cv = document.getElementById("wire");
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W, H, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  // torus mesh
  var R = 1.0, r = 0.42, U = 28, V = 14, verts = [], edges = [];
  for (var i = 0; i < U; i++) {
    for (var j = 0; j < V; j++) {
      var u = (i / U) * Math.PI * 2, v = (j / V) * Math.PI * 2;
      verts.push([(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)]);
      var a = i * V + j, b = i * V + (j + 1) % V, c = ((i + 1) % U) * V + j;
      edges.push([a, b], [a, c]);
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    var ax = t * 0.00018 + 0.9, ay = t * 0.00027;
    var cx = W * 0.72, cy = H * 0.5, s = Math.min(W, H) * 0.34;
    var sx = Math.sin(ax), cxr = Math.cos(ax), sy = Math.sin(ay), cyr = Math.cos(ay);
    var pts = verts.map(function (p) {
      var x = p[0], y = p[1] * cxr - p[2] * sx, z = p[1] * sx + p[2] * cxr;
      var x2 = x * cyr + z * sy, z2 = -x * sy + z * cyr;
      var k = 3.2 / (3.2 + z2);
      return [cx + x2 * s * k, cy + y * s * k, z2];
    });
    ctx.lineWidth = 1;
    edges.forEach(function (e) {
      var p = pts[e[0]], q = pts[e[1]];
      var d = (p[2] + q[2]) / 2;
      var a = 0.12 + 0.5 * (1 - (d + 1.5) / 3);
      ctx.strokeStyle = "rgba(255,179,71," + Math.max(0.05, Math.min(0.7, a)).toFixed(3) + ")";
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
    });
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
