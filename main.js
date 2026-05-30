/* ═══════════════════════════════════════════════
   FORMA & MADEIRA — Scripts
   main.js
═══════════════════════════════════════════════ */

/* ── CURSOR PERSONALIZADO ── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 60);
});

/* ── NAV: EFEITO SCROLL ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('up'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── SLIDER DE DEPOIMENTOS ── */
let depIdx = 0;
const depTrack = document.getElementById('depTrack');
const depCards = depTrack.querySelectorAll('.dep-card');
const CARD_WIDTH = 340; // px — deve bater com min-width do .dep-card no CSS
const CARD_GAP   = 16;  // px — deve bater com gap do .dep-track no CSS

function slideDep(dir) {
  depIdx = Math.max(0, Math.min(depCards.length - 2, depIdx + dir));
  depTrack.style.transform = `translateX(calc(-${depIdx} * (${CARD_WIDTH}px + ${CARD_GAP}px)))`;
}

document.getElementById('depNext').addEventListener('click', () => slideDep(1));
document.getElementById('depPrev').addEventListener('click', () => slideDep(-1));

/* ── FILTRO DE PORTFÓLIO ── */
function filterPort(btn, cat) {
  // Atualiza botão ativo
  document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filtra cards
  document.querySelectorAll('.pc').forEach(card => {
    const show = cat === 'todos' || card.dataset.cat === cat;
    card.style.opacity    = show ? '1'       : '.25';
    card.style.transform  = show ? ''        : 'scale(.97)';
    card.style.transition = 'opacity .35s, transform .35s';
  });
}

// Expõe globalmente para os atributos onclick inline no HTML
window.filterPort = filterPort;
