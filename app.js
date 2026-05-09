/* app.js — tab navigation, photo collage, floating petals */

(function () {

  // ── Tab Navigation ────────────────────────────────────────
  const tabs    = document.querySelectorAll('.tab-section');
  const links   = document.querySelectorAll('.nav-link');
  const burger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function activateTab(name) {
    tabs.forEach(t => t.classList.remove('active'));
    links.forEach(l => {
      l.classList.toggle('active', l.dataset.tab === name);
    });
    const target = document.getElementById('tab-' + name);
    if (target) target.classList.add('active');

    // Spawn a couple welcome bursts when switching to home
    if (name === 'home' && window._burstCanvas) {
      const { W, H } = window._burstCanvas.getWH();
      setTimeout(() => window._burstCanvas.spawnBurst(W * 0.5, H * 0.4), 200);
    }

    // Spawn floating petals on message tab
    if (name === 'message') spawnPetals();

    mobileMenu.classList.remove('open');
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      activateTab(link.dataset.tab);
    });
  });

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });


  // ── Floating Petals (message tab) ────────────────────────
  function spawnPetals() {
    const container = document.getElementById('floatingPetals');
    container.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal-float';
      petal.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-duration: ${6 + Math.random() * 8}s;
        animation-delay: ${Math.random() * 6}s;
        width: ${6 + Math.random() * 8}px;
        height: ${10 + Math.random() * 10}px;
        opacity: ${0.15 + Math.random() * 0.3};
        background: rgba(${Math.random() > 0.5 ? '181,123,238' : '216,180,254'}, ${0.2 + Math.random() * 0.25});
      `;
      container.appendChild(petal);
    }
  }


  // ── Photo Collage ─────────────────────────────────────────
  const grid      = document.getElementById('photoGrid');
  const uploadZone = document.getElementById('uploadZone');
  const photoInput = document.getElementById('photoInput');

  // Load permanent photos from photos.js
  if (typeof PHOTOS !== 'undefined' && PHOTOS.length > 0) {
    PHOTOS.forEach((src, i) => {
      addPhotoCard(src, i * 60);
    });
    // Hide upload zone if permanent photos exist
    // (keep it so user can still add more on the fly)
  }

  // Click to open file picker
  uploadZone.addEventListener('click', () => photoInput.click());

  // File picker change
  photoInput.addEventListener('change', e => {
    handleFiles(e.target.files);
  });

  // Drag & drop
  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
  });

  function handleFiles(files) {
    Array.from(files).forEach((file, i) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ev => addPhotoCard(ev.target.result, i * 80);
      reader.readAsDataURL(file);
    });
  }

  function addPhotoCard(src, delay = 0) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = delay + 'ms';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Memory with Mom';
    img.loading = 'lazy';

    card.appendChild(img);
    grid.appendChild(card);
  }

})();
