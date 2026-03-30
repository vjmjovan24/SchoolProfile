function toggleNav() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navDropdown').classList.toggle('open');
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const data = dataPrestasi.find(item => item.id === id);

if (data) {

  // HERO
  document.getElementById("namaLomba").textContent = data.judul;
  document.getElementById("juara").textContent = data.juara;
  document.getElementById("penyelenggara").textContent = data.penyelenggara;

  // INFO
  document.getElementById("tanggal").textContent = data.tanggal;
  document.getElementById("tahun").textContent = data.tahun;
  document.getElementById("lokasi").textContent = data.lokasi;
  document.getElementById("bidang").textContent = data.bidang;
  document.getElementById("kategori").textContent = data.kategori;

  // LEVEL STYLE
  const tingkatEl = document.getElementById("tingkat");
  tingkatEl.textContent = data.tingkat;

  tingkatEl.classList.add(
    data.tingkat === "nasional" ? "level-nasional" :
      data.tingkat === "internasional" ? "level-internasional" :
        "level-provinsi"
  );

  // DESKRIPSI
  document.getElementById("deskripsi").innerHTML = data.detail;

  // HERO IMAGE
  const heroImg = document.getElementById("heroImg");
  const placeholder = document.getElementById("heroPlaceholder");

  if (data.foto) {
    heroImg.src = data.foto;
    heroImg.style.display = "block";
    placeholder.style.display = "none";
  }

  // SISWA
  const siswaList = document.getElementById("siswaList");

  data.siswa.forEach(s => {
    siswaList.innerHTML += `
      <div class="siswa-chip">
        <div class="siswa-av">${s.nama.charAt(0)}</div>
        <div>
          <div class="siswa-name">${s.nama}</div>
          <div class="siswa-kelas">${s.kelas}</div>
        </div>
      </div>
    `;
  });

  // GALLERY
  const gallery = document.getElementById("gallery");
  const gallerySection = document.getElementById("gallerySection");

  if (data.gallery && data.gallery.length > 0) {
    gallerySection.style.display = "block";

    data.gallery.forEach((img, i) => {
      gallery.innerHTML += `
        <div class="gal-item">
          <img src="${img}">
          <div class="gal-num">${i + 1}</div>
        </div>
      `;
    });
  } else {
    gallerySection.style.display = "none";
  }
}