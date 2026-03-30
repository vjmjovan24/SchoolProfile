function toggleNav() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navDropdown').classList.toggle('open');
}

// Label display per kategori
const labelMap = {
  'akademik': { text: 'Akademik', cls: 'label-akademik' },
  'non-akademik': { text: 'Non Akademik', cls: 'label-non-akademik' },
  'olahraga': { text: 'Olahraga', cls: 'label-olahraga' },
};

function renderCards(data) {
  const grid = document.getElementById('prestasiGrid');
  const noResult = document.getElementById('noResult');

  // hapus semua card lama (bukan noResult)
  grid.querySelectorAll('.prestasi-card').forEach(c => c.remove());

  if (data.length === 0) {
    noResult.style.display = 'block';
    return;
  }
  noResult.style.display = 'none';

  data.forEach(item => {
    const label = labelMap[item.kategori];
    const imgEl = item.foto
      ? `<img class="card-img" src="${item.foto}" alt="${item.judul}">`
      : `<div class="card-img-placeholder" style="background: ${item.warnaBg};"></div>`;

    const card = document.createElement('div');
    card.className = 'prestasi-card';
    card.innerHTML = `
        ${imgEl}
        <div class="card-body">
          <span class="card-label ${label.cls}">${label.text}</span>
          <p class="card-title">${item.judul}</p>
          <div class="card-divider"></div>
          <p class="card-desc">${item.deskripsi}</p>
          <button class="btn-detail">Lihat Detail</button>
        </div>
      `;
    card.onclick = () => {
      window.location.href = `prestasidetail.html?id=${item.id}`;
    };
    grid.insertBefore(card, noResult);
  });
}

function applyFilter() {
  const kat = document.getElementById('filterSelect').value;
  const q = document.getElementById('searchInput').value.toLowerCase();

  const filtered = dataPrestasi.filter(item => {
    const matchKat = kat === 'semua' || item.kategori === kat;
    const matchQ = q === '' || item.judul.toLowerCase().includes(q);
    return matchKat && matchQ;
  });

  renderCards([...filtered].reverse());
}

// render pertama kali
renderCards([...dataPrestasi].reverse()); 
