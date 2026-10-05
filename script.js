const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const slug = n => n.toLowerCase().replace(/\s+/g, '-');

/* ===== Data karakter: ganti nama, warna, foto, biodata sesuai temamu ===== */
const C = [
  { n:'Fiony', c:'#ff4f9a', img:'img/HHTts_PasAAUKzG.jpg', bio:[['Nama','Fiony'],['Peran','Penyihir pendukung'],['Elemen','Air'],['Asal','Kota Karang Dalam'],['Tinggi','165 cm'],['Hobi','Mengumpulkan kerang'],['Senjata','Tongkat mutiara'],['Motto','Arus selalu membawa kita pulang.']] },
  { n:'Anindya', c:'#ff8fb8', img:'img/HNL1fXBbwAAAe04.jpg', bio:[['Nama','Anindya'],['Peran','Penjaga garis depan'],['Elemen','Bumi'],['Asal','Taman Karang Merah'],['Tinggi','178 cm'],['Hobi','Berkebun karang'],['Senjata','Perisai koral'],['Motto','Berdiri teguh, tumbuh bersama.']] },
  { n:'Aurellia', c:'#c06bff', img:'img/HTCcIBUb0AAvZrB.jpg', bio:[['Nama','Aurellia'],['Peran','Pemburu jarak jauh'],['Elemen','Angin'],['Asal','Menara Spiral'],['Tinggi','170 cm'],['Hobi','Membaca peta bintang'],['Senjata','Busur cangkang'],['Motto','Setiap putaran membawa arah baru.']] },
  { n:'Alana', c:'#ff6b6b', img:'img/HATyue5bEAA34Qd.jpg', bio:[['Nama','Alana'],['Peran','Pengendali medan'],['Elemen','Suara'],['Asal','Teluk Senandung'],['Tinggi','168 cm'],['Hobi','Bernyanyi saat fajar'],['Senjata','Harpa gelombang'],['Motto','Dengarkan, lalu ikuti nadanya.']] },
  { n:'Elin', c:'#f2a5c0', img:'img/HQkxCb2a8AA69p4.jpg', bio:[['Nama','Elin'],['Peran','Pelindung tim'],['Elemen','Cahaya'],['Asal','Gua Mutiara'],['Tinggi','172 cm'],['Hobi','Menyusun kalung mutiara'],['Senjata','Lentera kristal'],['Motto','Cahaya kecil pun cukup untuk pulang.']] },
  { n:'Cynthia', c:'#e0559a', img:'img/HTMgRRxbQAAZYDy.jpg', bio:[['Nama','Cynthia'],['Peran','Penyerbu garis depan'],['Elemen','Badai'],['Asal','Palung Gelap'],['Tinggi','190 cm'],['Hobi','Menantang ombak besar'],['Senjata','Tentakel baja'],['Motto','Semakin gelap, semakin kuat.']] },
  { n:'Fritzy', c:'#ff9ecb', img:'img/HPIj3xwbQAApodb.jpg', bio:[['Nama','Fritzy'],['Peran','Penyembuh'],['Elemen','Cahaya bintang'],['Asal','Taman Ubur-ubur'],['Tinggi','160 cm'],['Hobi','Merawat ubur-ubur bercahaya'],['Senjata','Tongkat embun'],['Motto','Setiap luka punya jalan untuk pulih.']] },
  { n:'Gracie', c:'#9b5de5', img:'img/HTIwfuNbYAAUnSN.jpg', bio:[['Nama','Gracie'],['Peran','Pemanggil makhluk laut'],['Elemen','Bayangan'],['Asal','Palung Sunyi'],['Tinggi','175 cm'],['Hobi','Bermain dengan paus kecil'],['Senjata','Terompet cangkang'],['Motto','Yang dalam selalu menjawab.']] },
  { n:'Hillary', c:'#ff7a9c', img:'img/HTPVX7fbMAAFoJ_.jpg', bio:[['Nama','Hillary'],['Peran','Penyerang cepat'],['Elemen','Kabut'],['Asal','Pelabuhan Berkabut'],['Tinggi','167 cm'],['Hobi','Balapan perahu layar'],['Senjata','Belati layar'],['Motto','Cepat itu soal arah, bukan tenaga.']] },
  { n:'Indah', c:'#e0559a', img:'img/HNEYJyKaAAAyT9h.jpg', bio:[['Nama','Indah'],['Peran','Penyerbu garis depan'],['Elemen','Badai'],['Asal','Palung Gelap'],['Tinggi','190 cm'],['Hobi','Menantang ombak besar'],['Senjata','Tentakel baja'],['Motto','Semakin gelap, semakin kuat.']] },
  { n:'Trisha', c:'#ff9ecb', img:'img/HK7wyDFboAAaHPD.jpg', bio:[['Nama','Trisha'],['Peran','Penyembuh'],['Elemen','Cahaya bintang'],['Asal','Taman Ubur-ubur'],['Tinggi','160 cm'],['Hobi','Merawat ubur-ubur bercahaya'],['Senjata','Tongkat embun'],['Motto','Setiap luka punya jalan untuk pulih.']] },
  { n:'Michie', c:'#9b5de5', img:'img/HQtDe1UbEAAv4uq.jpg', bio:[['Nama','Michie'],['Peran','Pemanggil makhluk laut'],['Elemen','Bayangan'],['Asal','Palung Sunyi'],['Tinggi','175 cm'],['Hobi','Bermain dengan paus kecil'],['Senjata','Terompet cangkang'],['Motto','Yang dalam selalu menjawab.']] },
  { n:'Suji', c:'#ff7a9c', img:'img/HSu94s9agAA_yEA.jpg', bio:[['Nama','Suji'],['Peran','Penyerang cepat'],['Elemen','Kabut'],['Asal','Pelabuhan Berkabut'],['Tinggi','167 cm'],['Hobi','Balapan perahu layar'],['Senjata','Belati layar'],['Motto','Cepat itu soal arah, bukan tenaga.']] }
];
const role = c => c.bio.find(r => r[0] === 'Peran')[1];
const bgOf = c => `url(${c.img}) center/cover,linear-gradient(160deg,${c.c},#7a0b3d 95%)`;

/* ===== Daftar karakter + pratinjau pigura yang mengikuti kursor ===== */
const peek = $('#peek');
$('#cnt').textContent = C.length;
$('#rows').innerHTML = C.map((c, i) =>
  `<a class="row" href="#karakter-${slug(c.n)}" data-i="${i}" data-cur="Lihat"><span class="no">0${i + 1}</span><h3>${c.n}</h3><span class="tg">${role(c)} · ${c.bio[2][1]}</span></a>`).join('');
$$('.row').forEach(r => {
  r.addEventListener('mouseenter', () => { peek.style.background = bgOf(C[r.dataset.i]); peek.classList.add('on'); });
  r.addEventListener('mouseleave', () => peek.classList.remove('on'));
});

/* ===== Preloader: hitungan 0 -> 100% lalu tirai terbuka ===== */
const pct = $('#pct'), t0 = performance.now();
(function tick(t) {
  const x = Math.min(1, (t - t0) / 1900), p = 100 * (1 - Math.pow(1 - x, 2));
  pct.textContent = Math.floor(p);
  x < 1 ? requestAnimationFrame(tick) : setTimeout(() => {
    document.body.classList.add('ready');
    setTimeout(() => $('.hero').classList.add('go'), 500);
  }, 250);
})(t0);

/* ===== Observer: teks muncul saat terlihat ===== */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting && document.body.classList.contains('ready')) { e.target.classList.add('go'); io.unobserve(e.target); }
}), { threshold: .25 });
$$('[data-go]').forEach(el => { if (!el.classList.contains('hero')) io.observe(el); });

/* ===== Teks terisi saat scroll ===== */
const ab = $('#ab');
ab.innerHTML = ab.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
const W = $$('.w');
function words() {
  const r = ab.getBoundingClientRect(), h = innerHeight;
  const p = Math.min(1, Math.max(0, (h * .85 - r.top) / (r.height + h * .3)));
  W.forEach((w, i) => w.classList.toggle('on', i / W.length < p));
}
addEventListener('scroll', words, { passive: true }); words();

/* ===== Menu layar penuh ===== */
const menu = $('#menu'), mb = $('#mb');
function setMenu(o) { menu.classList.toggle('open', o); document.body.classList.toggle('mopen', o); mb.textContent = o ? 'Tutup' : 'Menu'; }
mb.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ===== Tombol magnetik + paralaks judul ===== */
$$('.mag').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .3}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});
const h1 = $('#h1');
addEventListener('mousemove', e => {
  h1.style.transform = `translate(${(e.clientX / innerWidth - .5) * -24}px,${(e.clientY / innerHeight - .5) * -12}px)`;
});

/* ===== Kursor, pratinjau, marquee (kecepatan ikut scroll) ===== */
const cd = $('#cd'), cr = $('#cr'), mqi = $('#mqi');
mqi.innerHTML = mqi.innerHTML.repeat(6);
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, px = mx, py = my, ls = scrollY, sv = 0, qx = 0;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.addEventListener('mouseover', e => {
  const t = e.target.closest('[data-cur]');
  cr.classList.toggle('big', !!t); cr.textContent = t ? t.dataset.cur : '';
});
(function loop() {
  rx += (mx - rx) * .18; ry += (my - ry) * .18;
  cd.style.transform = `translate(${mx}px,${my}px)`;
  cr.style.transform = `translate(${rx}px,${ry}px)`;
  px += (mx - px) * .12; py += (my - py) * .12;
  const tilt = Math.max(-8, Math.min(8, (mx - px) * .06));
  peek.style.transform = `translate(${px + 30}px,${py - 140}px) rotate(${tilt}deg)`;
  sv += (scrollY - ls - sv) * .1; ls = scrollY;
  qx -= 1.3 + Math.abs(sv) * .6;
  const one = mqi.scrollWidth / 6;
  if (one) qx = -((-qx) % one);
  mqi.style.transform = `translateX(${qx}px)`;
  requestAnimationFrame(loop);
})();

/* ===== Profil karakter + pindah halaman dengan tirai (tab yang sama) ===== */
const pf = $('#pf'), wipe = $('#wipe');
let view = null;
const find = () => { const m = location.hash.match(/^#karakter-(.+)$/); return m && C.find(c => slug(c.n) === m[1]); };

function fill(c) {
  const i = C.indexOf(c), n = C.length, pv = C[(i + n - 1) % n], nx = C[(i + 1) % n];
  $('#pn').textContent = $('#ph').textContent = $('#pc').textContent = c.n;
  $('#pt').textContent = role(c);
  $('#photo').style.backgroundImage = `url(${c.img}),linear-gradient(160deg,${c.c},#7a0b3d)`;
  $('#bio').innerHTML = c.bio.map(([k, v], j) => `<tr style="--i:${j}"><th>${k}</th><td>${v}</td></tr>`).join('');
  $('#pPrev').href = '#karakter-' + slug(pv.n); $('#pPrev').textContent = '← ' + pv.n;
  $('#pNext').href = '#karakter-' + slug(nx.n); $('#pNext').textContent = nx.n + ' →';
}
function apply(c) {
  document.body.classList.toggle('inpf', !!c);
  if (c) {
    fill(c); scrollTo({ top: 0, behavior: 'instant' });
    pf.classList.remove('go'); void pf.offsetWidth; setTimeout(() => pf.classList.add('go'), 60);
  } else {
    const t = location.hash && $(location.hash);
    t ? t.scrollIntoView({ behavior: 'instant' }) : scrollTo({ top: 0, behavior: 'instant' });
    words();
  }
}
function route(first) {
  const c = find(), key = c ? c.n : 'home';
  if (key === view) return;               // anchor biasa di halaman utama: biarkan browser menggulung
  view = key;
  if (first) { apply(c); return; }
  wipe.classList.add('in');
  setTimeout(() => {
    apply(c); wipe.classList.remove('in'); wipe.classList.add('out');
    setTimeout(() => wipe.classList.remove('out'), 700);
  }, 650);
}
addEventListener('hashchange', () => route(false));
route(true);

/* ===== Kupu-kupu ===== */
(function butterflies() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Bentuk kupu-kupu (SVG): sayap kiri, sayap kanan, badan, antena
  const shape = `
  <svg viewBox="0 0 100 80">
    <g class="wing">
      <path d="M50 40 C30 5, 2 8, 8 32 C12 48, 34 50, 50 40Z"/>
      <path class="low" d="M50 42 C32 50, 14 56, 22 70 C30 80, 46 62, 50 42Z"/>
      <circle class="dot" cx="22" cy="26" r="4"/><circle class="dot" cx="30" cy="62" r="3"/>
    </g>
    <g class="wing">
      <path d="M50 40 C70 5, 98 8, 92 32 C88 48, 66 50, 50 40Z"/>
      <path class="low" d="M50 42 C68 50, 86 56, 78 70 C70 80, 54 62, 50 42Z"/>
      <circle class="dot" cx="78" cy="26" r="4"/><circle class="dot" cx="70" cy="62" r="3"/>
    </g>
    <ellipse class="bd" cx="50" cy="44" rx="2.4" ry="15"/>
    <path class="an" d="M49 30 C46 20, 42 16, 38 14 M51 30 C54 20, 58 16, 62 14"/>
  </svg>`;

  const colors = ['#ff4f9a', '#ff8fb8', '#c06bff', '#ffd1e3', '#c2185b'];
  const count = innerWidth < 700 ? 35 : 35 ;      // jumlah kupu-kupu
  const list = [];

  for (let i = 0; i < count; i++) {
    const size = 28 + Math.random() * 26;       // ukuran (px)
    const el = document.createElement('div');
    el.className = 'bf';
    el.innerHTML = shape;
    el.style.width = size + 'px';
    el.style.marginLeft = -size / 2 + 'px';
    el.style.marginTop = -size * .4 + 'px';
    el.style.setProperty('--wc', colors[i % colors.length]);
    el.style.setProperty('--fs', (.22 + Math.random() * .18) + 's');   // kecepatan kepakan
    document.body.appendChild(el);
    list.push({
      el, size,
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      a: Math.random() * Math.PI * 2,           // arah terbang
      s: .8 + Math.random() * .8,               // kecepatan
      t: Math.random() * 100
    });
  }

  let cx = -999, cy = -999;
  addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

  (function loop() {
    list.forEach(b => {
      b.t += .02;
      // Melayang berkelok-kelok
      b.a += Math.sin(b.t * 1.3 + b.size) * .07 + Math.sin(b.t * .4) * .03;

      // Menghindar kalau kursor dekat
      const dx = b.x - cx, dy = b.y - cy, d = Math.hypot(dx, dy);
      if (d < 160) {
        const away = Math.atan2(dy, dx);
        const diff = Math.atan2(Math.sin(away - b.a), Math.cos(away - b.a));
        b.a += diff * .08;
        b.s = Math.min(3.2, b.s + .06);
      } else {
        b.s += (1.1 - b.s) * .02;
      }

      b.x += Math.cos(b.a) * b.s;
      b.y += Math.sin(b.a) * b.s * .8 + Math.sin(b.t * 3) * .5;   // naik-turun halus

      // Muncul lagi dari sisi seberang kalau keluar layar
      const m = 80;
      if (b.x < -m) b.x = innerWidth + m;
      if (b.x > innerWidth + m) b.x = -m;
      if (b.y < -m) b.y = innerHeight + m;
      if (b.y > innerHeight + m) b.y = -m;

      // Kepala kupu-kupu menghadap arah terbang
      b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.a * 180 / Math.PI + 90}deg)`;
    });
    requestAnimationFrame(loop);
  })();
})();