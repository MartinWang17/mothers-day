/* lily.js — draws the animated purple lily and sparkle canvas */

(function () {

  // ── Lily SVG ──────────────────────────────────────────────
  const container = document.getElementById('lilyContainer');

  container.innerHTML = `
  <svg class="lily-svg" viewBox="0 0 200 400" width="200" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#4a1060"/>
        <stop offset="100%" stop-color="#6b2f8a"/>
      </linearGradient>
      <linearGradient id="petalGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c084fc"/>
        <stop offset="100%" stop-color="#7b2fa0"/>
      </linearGradient>
      <linearGradient id="petalGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d8b4fe"/>
        <stop offset="100%" stop-color="#9333ea"/>
      </linearGradient>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3d0d5c"/>
        <stop offset="100%" stop-color="#5b1a80"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- Stem -->
    <path class="lily-stem"
      d="M100 400 C100 380 98 340 102 300 C104 270 100 240 100 210"
      fill="none" stroke="url(#stemGrad)" stroke-width="4" stroke-linecap="round"/>

    <!-- Leaf 1 (left) -->
    <path class="lily-leaf lily-leaf-1"
      d="M99 320 C80 305 55 295 50 278 C65 278 88 290 99 308"
      fill="url(#leafGrad)" stroke="rgba(123,47,160,0.4)" stroke-width="0.5"/>

    <!-- Leaf 2 (right) -->
    <path class="lily-leaf lily-leaf-2"
      d="M101 290 C122 272 148 265 155 248 C138 250 116 262 101 282"
      fill="url(#leafGrad)" stroke="rgba(123,47,160,0.4)" stroke-width="0.5"/>

    <!-- Petals (6 petals radiating from center ~100,180) -->
    <!-- Back row petals -->
    <path class="lily-petal lily-petal-1"
      d="M100 200 C88 185 78 155 82 128 C88 142 96 170 100 185"
      fill="url(#petalGrad1)" stroke="rgba(192,132,252,0.3)" stroke-width="0.5"
      filter="url(#glow)" style="--r:0deg; transform-origin:100px 200px;"/>

    <path class="lily-petal lily-petal-2"
      d="M100 200 C115 188 135 162 138 134 C128 148 112 172 100 188"
      fill="url(#petalGrad1)" stroke="rgba(192,132,252,0.3)" stroke-width="0.5"
      filter="url(#glow)" style="--r:0deg; transform-origin:100px 200px;"/>

    <path class="lily-petal lily-petal-3"
      d="M100 200 C80 195 52 193 36 178 C52 172 80 182 98 196"
      fill="url(#petalGrad2)" stroke="rgba(216,180,254,0.3)" stroke-width="0.5"
      filter="url(#glow)" style="transform-origin:100px 200px;"/>

    <!-- Front row petals -->
    <path class="lily-petal lily-petal-4"
      d="M100 200 C92 218 78 242 66 255 C74 240 90 220 99 205"
      fill="url(#petalGrad2)" stroke="rgba(216,180,254,0.3)" stroke-width="0.5"
      filter="url(#glow)" style="transform-origin:100px 200px;"/>

    <path class="lily-petal lily-petal-5"
      d="M100 200 C108 218 122 240 135 253 C124 238 108 218 101 205"
      fill="url(#petalGrad1)" stroke="rgba(192,132,252,0.3)" stroke-width="0.5"
      filter="url(#glow)" style="transform-origin:100px 200px;"/>

    <path class="lily-petal lily-petal-6"
      d="M100 200 C120 196 148 196 164 182 C148 176 120 185 102 197"
      fill="url(#petalGrad2)" stroke="rgba(216,180,254,0.3)" stroke-width="0.5"
      filter="url(#glow)" style="transform-origin:100px 200px;"/>

    <!-- Stamens -->
    <g class="lily-stamen" filter="url(#glow)">
      <circle cx="100" cy="196" r="5" fill="#e8c97a"/>
      <line x1="100" y1="191" x2="96"  y2="178" stroke="#c084fc" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="96"  cy="177" r="2.2" fill="#e8c97a"/>
      <line x1="100" y1="191" x2="104" y2="178" stroke="#c084fc" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="104" cy="177" r="2.2" fill="#e8c97a"/>
      <line x1="100" y1="191" x2="100" y2="177" stroke="#c084fc" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="100" cy="176" r="2.2" fill="#e8c97a"/>
      <line x1="100" y1="191" x2="93"  y2="182" stroke="#c084fc" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="92"  cy="181" r="2"   fill="#d8b4fe"/>
      <line x1="100" y1="191" x2="107" y2="183" stroke="#c084fc" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="108" cy="182" r="2"   fill="#d8b4fe"/>
    </g>
  </svg>`;

  // Trigger home text fade-in
  setTimeout(() => {
    document.getElementById('homeText').classList.add('visible');
  }, 100);


  // ── Sparkle / Firework Canvas ─────────────────────────────
  const canvas  = document.getElementById('sparkleCanvas');
  const ctx     = canvas.getContext('2d');
  let W, H;
  let particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor(x, y, burst) {
      this.x  = x;
      this.y  = y;
      this.burst = burst;
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? (1 + Math.random() * 3.5) : (0.2 + Math.random() * 0.8);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - (burst ? 0 : 0.4);
      this.life = 1;
      this.decay = burst ? (0.012 + Math.random() * 0.018) : (0.004 + Math.random() * 0.008);
      this.size  = burst ? (1.5 + Math.random() * 2.5) : (0.8 + Math.random() * 1.2);
      // Purple / gold palette
      const colors = ['#d8b4fe','#c084fc','#a855f7','#e8c97a','#f3e8ff','#b57bee'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (!this.burst) this.vy += 0.01;
      this.life -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Ambient floating sparkles
  function spawnAmbient() {
    if (document.getElementById('tab-home').classList.contains('active')) {
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(
          Math.random() * W,
          H * (0.3 + Math.random() * 0.7),
          false
        ));
      }
    }
  }

  // Burst firework
  function spawnBurst(x, y) {
    for (let i = 0; i < 55; i++) {
      particles.push(new Particle(x, y, true));
    }
  }

  // Auto bursts every few seconds on home tab
  let burstInterval = null;

  function startBursts() {
    spawnBurst(W * (0.3 + Math.random() * 0.4), H * (0.2 + Math.random() * 0.4));
    burstInterval = setInterval(() => {
      if (document.getElementById('tab-home').classList.contains('active')) {
        spawnBurst(W * (0.2 + Math.random() * 0.6), H * (0.15 + Math.random() * 0.5));
      }
    }, 2800);
  }

  // Kick off first burst after lily blooms
  setTimeout(startBursts, 2200);

  // Click to burst
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    spawnBurst(e.clientX - rect.left, e.clientY - rect.top);
  });

  setInterval(spawnAmbient, 120);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Expose for tab switch
  window._burstCanvas = { spawnBurst, getWH: () => ({ W, H }) };

})();
