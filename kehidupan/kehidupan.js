function toggleNav() {
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('navDropdown').classList.toggle('open');
}

// ── Events Swiper — full width, 1 slide at a time
new Swiper('.events-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 700,
    grabCursor: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
    nextEl: '.events-swiper .swiper-button-next',
    prevEl: '.events-swiper .swiper-button-prev',
    },
    autoplay: {
    delay: 7000, 
    disableOnInteraction: false, 
    },
    pagination: {
    el: '.events-swiper .swiper-pagination',
    clickable: true,
    },
});

// ── Ekskul Swipers (one per tab, init all on load)
const ekskulSwiperConfig = {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: false,
    grabCursor: true,
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    },
    breakpoints: {
    580: { slidesPerView: 2.2, spaceBetween: 20 },
    900: { slidesPerView: 3.2, spaceBetween: 24 },
    }
};

const swiperAcademic = new Swiper('.ekskul-swiper-academic', ekskulSwiperConfig);
const swiperArts     = new Swiper('.ekskul-swiper-arts',     ekskulSwiperConfig);
const swiperSports   = new Swiper('.ekskul-swiper-sports',   ekskulSwiperConfig);

// ── Ekskul Tabs
const tabs = document.querySelectorAll('.ekskul-tab');
const panels = document.querySelectorAll('.ekskul-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    // update swiper after display change
    [swiperAcademic, swiperArts, swiperSports].forEach(s => s.update());
    });
});

// ── Testimonials
const testimonials = [
    {
    quote: 'Sekolah St.Kristoforus menerapkan nilai nilai <em>kejujuran dan kepemimpinan</em> yang baik melalui berbagai program sekolah baik dalam pelajaran sehari hari, ekstrakurikuler, maupun interaksi dengan pihak pihak yang terkait.',
    name: 'Yessylia Violin A',
    role: 'ROASTERY MANAGER',
    avatar: 'alumni/6.jpg'
    },
    {
    quote: 'Di Kristoforus, saya belajar tentang <em>disiplin diri</em>. Hal itu sangat berguna bagi kehidupan dan pekerjaan saya sekarang ini. Dalam penerbangan saya harus selalu on time. Tidak boleh delay. Karena akan berdampak bagi banyak orang dan penerbangan selanjutnya. Kalau delay karena cuaca atau masalah teknis itu di luar kendali kita. Nilai kedisiplinan inilah yang saya rasakan paling kuat sampai saat ini.  Para gurunya <em>disiplin dan tegas</em> terhadap para muridnya, tidak pandang bulu.',
    name: 'Kevin',
    role: 'PILOT',
    avatar: 'alumni/5.jpg'
    },
    {
    quote: 'Di sekolah Kristoforus saya belajar nilai-nilai kehidupan seperti <em>kejujuran, disiplin, kerjasama, dan tanggung jawab</em> yang sangat berguna bagi kehidupan saya sehari-hari secara khusus dalam menjalani profesi saya sebagai Advokat/Lawyer.',
    name: 'Stervins',
    role: 'ADVOKAT – LAWYER',
    avatar: 'alumni/4.jpg'
    },
    {
    quote: 'Saya senang karena saat belajar di Sekolah Kristoforus saya telah belajar banyak hal yang sampai saat ini bisa saya gunakan antara lain <em>relasi dengan teman-teman</em> sekolah dulu yang tetap terjaga dengan baik dan juga <em>kedisiplinan yang tinggi</em>. Mengelola bisnis seperti yang sedang saya jalani saat ini sangat dibutuhkan kedisiplinan. Kita harus disiplin dalam mengelola waktu, tenaga dan lain sebagainya.',
    name: 'Denny Sung, BA, MA, MDs, ACP, ACE',
    role: 'PENDIRI SMK MULTIMEDIA, SMK MONDIAL',
    avatar: 'alumni/3.jpg'
    },
    {
    quote: 'Saya senang bersekolah di Kristoforus. Di Kristoforus kami belajar banyak hal, selain pelajaran-pelajaran akademis, kami juga belajar hal-hal lain yang bercorak non akademis seperti <em>rasa kekeluargaan yang tinggi, gotong royong dan saling menghargai</em>. Di samping itu melalui berbagai kegiatan kami juga dilatih dan diarahkan untuk bisa <em>bersaing dan berjuang, tidak gampang menyerah</em>. Kuatnya <em>rasa kekeluargaan</em> melatih kami untuk bisa hidup dan bergaul dengan siapa saja terlebih pekerjaan sebagai dokter kami berjumpa dan bertemu dengan banyak orang dengan berbagai latar belakang dan karakter.',
    name: 'Caesar Rio',
    role: 'DOKTER',
    avatar: 'alumni/2.jpg'
    }
];

let tCurrent = 0;
const tText = document.getElementById('testimony-text');
const tName = document.getElementById('testimony-name');
const tRole = document.getElementById('testimony-role');
const tAvatar = document.getElementById('testimony-avatar');
const tDotsWrap = document.getElementById('testimony-dots');

// Build dots
testimonials.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'testimony-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTestimony(i));
    tDotsWrap.appendChild(d);
});

function goTestimony(index) {
    tCurrent = (index + testimonials.length) % testimonials.length;
    const t = testimonials[tCurrent];
    tText.innerHTML = `"${t.quote}"`;
    tName.textContent = t.name;
    tRole.textContent = t.role;
    tAvatar.src = t.avatar;
    tDotsWrap.querySelectorAll('.testimony-dot').forEach((d, i) => {
    d.classList.toggle('active', i === tCurrent);
    });
}

document.getElementById('tNext').addEventListener('click', () => goTestimony(tCurrent + 1));
document.getElementById('tPrev').addEventListener('click', () => goTestimony(tCurrent - 1));