// Détails cartes
document.querySelectorAll('.btn-details').forEach(btn => {
  console.log('btn trouvé', btn); 
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('aria-controls');
    if (!id) return;
    
    const details = document.getElementById(id);
    if (!details) return;

    const isOpen = !details.hasAttribute('hidden');


    if (isOpen) {
      // FERMER
      details.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Détails';
    } else {
      // OUVRIR
      details.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = '↑ Fermer';
    }
  });
});

// Carrousel témoignages
const temoignages = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let index = 0;

function majCarrousel() {
  temoignages.forEach((t, i) => {
    t.classList.toggle('actif', i === index);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % temoignages.length;
    majCarrousel();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    index = (index - 1 + temoignages.length) % temoignages.length;
    majCarrousel();
  });
}

// Footer burger
const burger = document.querySelector('.footer-burger');
const footerNav = document.querySelector('.footer-nav');

burger?.addEventListener('click', () => {
  const ouvert = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!ouvert));
  footerNav.classList.toggle('ouvert', !ouvert);
});
