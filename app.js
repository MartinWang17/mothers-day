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
