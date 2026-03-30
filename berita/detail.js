function toggleNav() {
      document.getElementById('hamburger').classList.toggle('open');
      document.getElementById('navDropdown').classList.toggle('open');
    }

    
// ambil ID dari URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// cari berita
const berita = newsData.find(item => item.id == id);

// kalau gak ketemu
if (!berita) {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>Berita tidak ditemukan</h2>";
}

// =======================
// MAIN CONTENT
// =======================
document.getElementById("title").innerText = berita.title;
document.getElementById("date").innerText = berita.date;
document.getElementById("image").src = berita.image;
document.getElementById("content").innerHTML = berita.content;

// category (uppercase style udah di CSS)
document.getElementById("category").innerText = berita.kategori.toUpperCase();

// optional author (kalau ada)
document.getElementById("author").innerText = berita.author || "Admin";

// =======================
// GALERI
// =======================
const galleryContainer = document.getElementById("gallery");
const gallerySection = document.getElementById("gallerySection");

if (!berita.gallery || berita.gallery.length === 0) {
  gallerySection.style.display = "none";
} else {
  gallerySection.style.display = "block";

  berita.gallery.forEach(img => {
    const el = document.createElement("img");
    el.src = img;

    // klik = popup fullscreen
    el.onclick = () => {
      const popup = document.createElement("div");
      popup.style = `
        position:fixed;
        top:0; left:0;
        width:100%; height:100%;
        background:rgba(0,0,0,0.85);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:999;
      `;

      popup.innerHTML = `<img src="${img}" style="max-width:90%; max-height:90%; border-radius:8px;">`;

      popup.onclick = () => popup.remove();

      document.body.appendChild(popup);
    };

    galleryContainer.appendChild(el);
  });
}

// =======================
// LATEST NEWS (SIDEBAR)
// =======================
const latestContainer = document.getElementById("latestNews");

// ambil 5 berita selain yang sedang dibuka
const latest = [...newsData]
  .filter(item => item.id != id)
  .reverse()
  .slice(0, 5);

latest.forEach(item => {
  const el = document.createElement("div");
  el.classList.add("latest-item");

  el.innerHTML = `
    <img src="${item.image}" class="latest-thumb">
    <div class="latest-info">
      <div class="latest-title">${item.title}</div>
      <div class="latest-date">${item.date}</div>
    </div>
  `;

  el.onclick = () => {
    window.location.href = `detail.html?id=${item.id}`;
  };

  latestContainer.appendChild(el);
});

