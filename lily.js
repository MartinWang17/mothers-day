/* lily.js — water lily SVG with sparkle light effect */

(function () {

  const container = document.getElementById('lilyContainer');
  const cx = 120, cy = 112;

  /* ── SVG helpers ─────────────────────────────────────────── */

  // Symmetric teardrop petal: base at local origin (0,0), tip at (0, -len)
  function petalPath(len, w) {
    const c1x = w * 0.55,  c1y = -len * 0.10;
    const c2x = w * 0.58,  c2y = -len * 0.62;
    return `M 0 0 C ${c1x} ${c1y}, ${c2x} ${c2y}, 0 ${-len}` +
           ` C ${-c2x} ${c2y}, ${-c1x} ${c1y}, 0 0`;
  }

  // 4-pointed star at (x, y) with outer radius r
  function star4(x, y, r) {
    const s = r * 0.22;
    return `M ${x} ${y - r} L ${x + s} ${y - s} L ${x + r} ${y}` +
           ` L ${x + s} ${y + s} L ${x} ${y + r}` +
           ` L ${x - s} ${y + s} L ${x - r} ${y}` +
           ` L ${x - s} ${y - s} Z`;
  }

  /* ── Petal rings ─────────────────────────────────────────── */
  // Outer ring starts at 0.6s, each petal 0.22s apart → last outer petal ~3.0s
  // Mid ring starts at 2.8s, each petal 0.18s apart
  // Inner ring starts at 4.6s, each petal 0.18s apart
  const rings = [
    { count: 12, len: 60, w: 21, grad: 'outerPG', delay: 0.6,  step: 0.22 },
    { count: 10, len: 44, w: 15, grad: 'midPG',   delay: 2.8,  step: 0.18, offset: 15 },
    { count: 6,  len: 26, w: 11, grad: 'innerPG', delay: 4.6,  step: 0.18, offset: 5 },
  ];

  let petalSVG = '';
  rings.forEach(ring => {
    const off = ring.offset || 0;
    for (let i = 0; i < ring.count; i++) {
      const angle = i * (360 / ring.count) + off;
      const delay = (ring.delay + i * ring.step).toFixed(2);
      petalSVG += `<path d="${petalPath(ring.len, ring.w)}"
        transform="translate(${cx},${cy}) rotate(${angle.toFixed(1)})"
        fill="url(#${ring.grad})" stroke="rgba(240,210,255,0.18)" stroke-width="0.4"
        class="lily-petal" style="animation-delay:${delay}s"/>`;
    }
  });

  /* ── Sparkle stars at outer petal tips ───────────────────── */
  let starSVG = '';
  [0, 60, 120, 180, 240, 300].forEach((deg, i) => {
    const rad  = (deg - 90) * Math.PI / 180;
    const tipX = cx + Math.cos(rad) * 61;
    const tipY = cy + Math.sin(rad) * 61;
    const del1 = (6.8 + i * 0.18).toFixed(2);
    starSVG += `<path d="${star4(tipX, tipY, 4.2)}"
      fill="white" class="lily-star" style="animation-delay:${del1}s"/>`;
    // smaller secondary star between primary tips
    const rad2 = (deg + 30 - 90) * Math.PI / 180;
    const sx2  = cx + Math.cos(rad2) * 48;
    const sy2  = cy + Math.sin(rad2) * 48;
    const del2 = (7.1 + i * 0.18).toFixed(2);
    starSVG += `<path d="${star4(sx2, sy2, 2.4)}"
      fill="rgba(255,240,255,0.85)" class="lily-star" style="animation-delay:${del2}s"/>`;
  });

  /* ── Stamens ─────────────────────────────────────────────── */
  let stamenSVG = '';
  for (let i = 0; i < 16; i++) {
    const a  = (i * 22.5) * Math.PI / 180;
    const r1 = 11, r2 = 20;
    const x1 = (cx + Math.cos(a) * r1).toFixed(1);
    const y1 = (cy + Math.sin(a) * r1).toFixed(1);
    const x2 = (cx + Math.cos(a) * r2).toFixed(1);
    const y2 = (cy + Math.sin(a) * r2).toFixed(1);
    stamenSVG += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
      stroke="#c080e8" stroke-width="0.75" stroke-linecap="round"/>
    <circle cx="${x2}" cy="${y2}" r="1.7" fill="#f0c860"/>`;
  }

  /* ── Light rays (blurred, behind everything) ─────────────── */
  const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
    const rad = (deg - 90) * Math.PI / 180;
    const ex  = (cx + Math.cos(rad) * 115).toFixed(1);
    const ey  = (cy + Math.sin(rad) * 115).toFixed(1);
    return `<line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}"
      stroke="rgba(255,235,255,0.55)" stroke-width="2.8"/>`;
  }).join('');

  /* ── Build SVG ───────────────────────────────────────────── */
  container.innerHTML = `
  <svg class="lily-svg" viewBox="0 0 240 228"
       width="270" height="256" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Ambient halo -->
      <radialGradient id="lilyHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="#9040d0" stop-opacity="0.5"/>
        <stop offset="55%"  stop-color="#5010a0" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#200050" stop-opacity="0"/>
      </radialGradient>

      <!-- Outer petals: pale lavender tip → deep purple base -->
      <linearGradient id="outerPG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#f0e0ff"/>
        <stop offset="40%"  stop-color="#cc98ec"/>
        <stop offset="100%" stop-color="#6e2488"/>
      </linearGradient>

      <!-- Mid petals: soft pink-purple -->
      <linearGradient id="midPG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#ddb0f5"/>
        <stop offset="50%"  stop-color="#a860d4"/>
        <stop offset="100%" stop-color="#501478"/>
      </linearGradient>

      <!-- Inner petals: deeper purple -->
      <linearGradient id="innerPG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#c88ae0"/>
        <stop offset="100%" stop-color="#3a0c58"/>
      </linearGradient>

      <!-- Center disc -->
      <radialGradient id="centerG" cx="38%" cy="32%" r="62%">
        <stop offset="0%"   stop-color="#fff8cc"/>
        <stop offset="50%"  stop-color="#f0c040"/>
        <stop offset="100%" stop-color="#b87810"/>
      </radialGradient>

      <!-- Warm center glow -->
      <radialGradient id="centerGlowG" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="#e8a0ff" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#8820c0" stop-opacity="0"/>
      </radialGradient>

      <!-- Glow filter for center -->
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Soft petal filter -->
      <filter id="softPetal" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur stdDeviation="1.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Ray blur -->
      <filter id="rayBlur" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="11"/>
      </filter>
    </defs>

    <!-- Halo behind lily -->
    <ellipse cx="${cx}" cy="${cy}" rx="96" ry="86"
      fill="url(#lilyHalo)" class="lily-halo"/>

    <!-- Blurred light rays -->
    <g filter="url(#rayBlur)" class="lily-rays">
      ${rays}
    </g>

    <!-- Petals -->
    ${petalSVG}

    <!-- Inner center glow (warm purple) -->
    <circle cx="${cx}" cy="${cy}" r="26"
      fill="url(#centerGlowG)" class="lily-center-glow"/>

    <!-- Stamens -->
    <g class="lily-stamen" filter="url(#glow)">
      ${stamenSVG}
    </g>

    <!-- Center disc -->
    <circle cx="${cx}" cy="${cy}" r="13"
      fill="url(#centerG)" filter="url(#glow)" class="lily-center"/>

    <!-- Specular highlight on centre -->
    <circle cx="${cx - 4}" cy="${cy - 4}" r="5"
      fill="rgba(255,255,230,0.52)" class="lily-shine"/>

    <!-- Sparkle stars at petal tips -->
    <g class="lily-stars">
      ${starSVG}
    </g>
  </svg>`;

  // Trigger home text fade-in — delayed to let lily finish glowing in
  setTimeout(() => {
    document.getElementById('homeText').classList.add('visible');
  }, 6800);


  /* ── Sparkle canvas — ambient only, no fireworks ─────────── */
  const canvas = document.getElementById('sparkleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H;
  let particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      // Spawn in a halo around the lily
      const angle = Math.random() * Math.PI * 2;
      const dist  = 15 + Math.random() * 105;
      const lilyX = W / 2;
      const lilyY = H * 0.35;
      this.x = lilyX + Math.cos(angle) * dist;
      this.y = lilyY + Math.sin(angle) * dist * 0.72;
      const spd = 0.08 + Math.random() * 0.28;
      const dir = Math.random() * Math.PI * 2;
      this.vx   = Math.cos(dir) * spd;
      this.vy   = Math.sin(dir) * spd - 0.1;
      this.life  = 0.55 + Math.random() * 0.45;
      this.decay = 0.003 + Math.random() * 0.005;
      this.size  = 0.5 + Math.random() * 1.6;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkle = Math.random() > 0.45;
      const palette = ['#f5eaff','#e8d0f8','#d8b4fe','#c084fc',
                       '#f0c860','#ffffff','#e8c0ff','#fff0f0'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x  += this.vx;
      this.y  += this.vy;
      this.life -= this.decay;
      this.twinklePhase += 0.13;
    }
    draw() {
      let a = Math.max(0, this.life) * 0.88;
      if (this.twinkle) a *= 0.5 + 0.5 * Math.sin(this.twinklePhase);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle   = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 8;
      if (this.size > 1.1) {
        // 4-pointed star shape
        const s = this.size, sm = s * 0.22;
        ctx.beginPath();
        ctx.moveTo(this.x,      this.y - s);
        ctx.lineTo(this.x + sm, this.y - sm);
        ctx.lineTo(this.x + s,  this.y);
        ctx.lineTo(this.x + sm, this.y + sm);
        ctx.lineTo(this.x,      this.y + s);
        ctx.lineTo(this.x - sm, this.y + sm);
        ctx.lineTo(this.x - s,  this.y);
        ctx.lineTo(this.x - sm, this.y - sm);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function spawnAmbient() {
    if (document.getElementById('tab-home').classList.contains('active')) {
      if (Math.random() < 0.62) particles.push(new Particle());
    }
  }

  setInterval(spawnAmbient, 85);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

})();
