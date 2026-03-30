function toggleNav() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navDropdown').classList.toggle('open');
}

// ── Collect all facility data from grid
const cards = Array.from(document.querySelectorAll('.fac-card'));
const facilities = [
  {
    name: "Ruang Kelas",
    images: [
      "foto fasilitas/RuangKelas1.jpg",
      "foto fasilitas/RuangKelas2.jpg",
      "foto fasilitas/RuangKelas3.jpg"
    ]
  },
  {
    name: "Perpustakaan",
    images: [
      "foto fasilitas/Perpustakaan1.jpg",
      "foto fasilitas/Perpustakaan2.jpg",
      "foto fasilitas/Perpustakaan3.jpg",
      "foto fasilitas/Perpustakaan4.jpg",
    ]
  },
  {
    name: "Laboratorium Komputer",
    images: [
      "foto fasilitas/LabKomputer1.webp",
      "foto fasilitas/LabKomputer2.webp"
    ]
  },
  {
    name: "Laboratorium IPA",
    images: [
      "foto fasilitas/lab6.jpeg",
      "foto fasilitas/lab1.jpeg",
      "foto fasilitas/lab2.jpeg",
      "foto fasilitas/lab3.jpeg",
      "foto fasilitas/lab4.jpeg",
      "foto fasilitas/lab7.jpeg",
      "foto fasilitas/lab8.jpeg",
      "foto fasilitas/lab9.jpeg",
      "foto fasilitas/lab10.jpeg",
      "foto fasilitas/lab11.jpeg",
      "foto fasilitas/lab12.jpeg",
    ]
  },
  {
    name: "Ruang Musik",
    images: [
      "foto fasilitas/RuangBand1.jpg"
    ]
  },
  {
    name: "Ruang Olahraga",
    images: [
      "foto fasilitas/ruangor.jpeg",
      "foto fasilitas/ruangor2.jpeg"
    ]
  },
  {
    name: "Lapangan Basket",
    images: [
      "foto fasilitas/lapanganbasket1.jpeg",
      "foto fasilitas/lapanganbasket2.jpeg",
      "foto fasilitas/lapanganbasket3.jpeg"
    ]
  },
  {
    name: "Lapangan Badminton",
    images: [
      "foto fasilitas/lapangan.jpeg",
      "foto fasilitas/lapangan1.jpeg",
      "foto fasilitas/lapangan2.jpeg"
    ]
  },
  {
    name: "Aula",
    images: [
      "foto fasilitas/aula.jpeg",
      "foto fasilitas/aula1.jpeg"
    ]
  },
  {
    name: "Gereja",
    images: [
      "foto fasilitas/gereja1.jpeg",
      "foto fasilitas/gereja2.jpeg",
      "foto fasilitas/gereja3.jpeg"
    ]
  },
  {
    name: "Ruang Guru",
    images: [
      "foto fasilitas/ruangguru.jpeg"
    ]
  },
  {
    name: "Ruang BK",
    images: [
      "foto fasilitas/ruangbk.jpeg"
    ]
  },
  {
    name: "Ruang Tata Usaha",
    images: [
      "foto fasilitas/ruangtu.jpeg",
      "foto fasilitas/RuangTataUsaha1.jpg",
      "foto fasilitas/RuangTataUsaha2.jpg",
      "foto fasilitas/RuangTataUsaha3.jpg",
    ]
  },
  {
    name: "Pos Satpam",
    images: [
      "foto fasilitas/LabKomputer1.webp",
      "foto fasilitas/LabKomputer2.webp"
    ]
  },
  {
    name: "Tempat Parkir",
    images: [
      "foto fasilitas/parkiran1.jpeg",
      "foto fasilitas/parkiran2.jpeg"
    ]
  },
  {
    name: "Kamar Mandi",
    images: [
      "foto fasilitas/Toilet1.webp",
      "foto fasilitas/Toilet3.webp"
    ]
  },
];

const TOTAL = facilities.length;

// ── Lightbox elements
const lightbox = document.getElementById('lightbox');
const lbImgWrap = document.getElementById('lbImgWrap');
const lbTitle = document.getElementById('lbTitle');
const lbCounter = document.getElementById('lbCounter');
const lbDots = document.getElementById('lbDots');
const lbCaption = document.getElementById('lbCaption');

let isAnimating = false;
let currentFacility = 0;
let currentImage = 0;

// ── Build images inside lightbox
function renderImages() {
  lbImgWrap.querySelectorAll('.lightbox-img').forEach(img => img.remove());

  facilities[currentFacility].images.forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'lightbox-img' + (i === 0 ? ' active' : '');
    img.src = src;
    lbImgWrap.appendChild(img);
  });

  currentImage = 0;

  lbDots.innerHTML = '';

  facilities[currentFacility].images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'lightbox-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    lbDots.appendChild(dot);
  });
}

// ── Build dots

function getImgs() { return Array.from(lbImgWrap.querySelectorAll('.lightbox-img')); }

function updateUI() {
  const total = facilities[currentFacility].images.length;

  lbTitle.textContent = facilities[currentFacility].name;
  lbCounter.textContent = `${currentImage + 1} / ${total}`;

  lbDots.querySelectorAll('.lightbox-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentImage);
  });
}

function goTo(index) {
  const imgs = getImgs();
  const total = imgs.length;

  const prev = currentImage;
  currentImage = ((index % total) + total) % total;

  imgs[prev].classList.remove('active');
  imgs[currentImage].classList.add('active');

  updateUI();
}

function openLightbox(index) {
  currentFacility = index;

  renderImages();
  updateUI();

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Card click
cards.forEach((card, i) => {
  card.addEventListener('click', () => openLightbox(i));
});

// ── Nav buttons
document.getElementById('lbNext').addEventListener('click', () => goTo(currentImage + 1));
document.getElementById('lbPrev').addEventListener('click', () => goTo(currentImage - 1));
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);

// ── Keyboard
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') goTo(currentImage + 1);
  if (e.key === 'ArrowLeft') goTo(currentImage - 1);
  if (e.key === 'Escape') closeLightbox();
});

// ── Touch/swipe support
let touchStartX = 0;
lbImgWrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lbImgWrap.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    goTo(diff > 0 ? currentImage + 1 : currentImage - 1);
  }
});