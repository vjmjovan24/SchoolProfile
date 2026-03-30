function toggleNav() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navDropdown').classList.toggle('open');
}


const labelMap = {
  'kegiatan': { text: 'Kegiatan', cls: 'label-kegiatan' },
  'acara': { text: 'Acara', cls: 'label-acara' },
  'pengumuman': { text: 'Pengumuman', cls: 'label-pengumuman' },
};

const container = document.getElementById("newsContainer");
const noResult = document.getElementById("noResult");
const searchInput = document.getElementById("searchInput");

function renderNews(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    noResult.style.display = "block";
    return;
  }

  noResult.style.display = "none";

  data.forEach(item => {
    const label = labelMap[item.kategori];
    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="news-content">
        <h3>${item.title}</h3>
        <p class="news-date">${item.date}</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `detail.html?id=${item.id}`;
    };

    container.appendChild(card);
  });
}

renderNews([...newsData].reverse());

searchInput.addEventListener("input", applyFilter);
document.getElementById('filterSelect').addEventListener("change", applyFilter);

function applyFilter() {
  const kat = document.getElementById('filterSelect').value;
  const q = document.getElementById('searchInput').value.toLowerCase();

  const filtered = newsData.filter(item => {
    const matchKat = kat === 'semua' || item.kategori === kat;
    const matchQ = q === '' || item.title.toLowerCase().includes(q);
    return matchKat && matchQ;
  });

  renderNews([...filtered].reverse()); // 
}
