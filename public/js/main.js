// Détails cartes
document.querySelectorAll('.btn-details').forEach(btn => {
  console.log('btn trouvé', btn); 
  
  btn.addEventListener('click', () => {
    const card = btn.closest('.offre-card');
    const id = btn.getAttribute('aria-controls');
    if (!id) return;
    
    const details = document.getElementById(id);
    if (!details) return;
    
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    
    if (isOpen) {
      // FERMER
      card.classList.remove('is-expanded');
      details.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Détails';
    } else {
      // OUVRIR
      card.classList.add('is-expanded');
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

// ---- BURGER MENU (header mobile) ----
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger?.addEventListener('click', () => {
  const ouvert = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!ouvert));
  nav.classList.toggle('ouvert', !ouvert);
});

// Fermer au clic sur un lien du menu
nav?.querySelectorAll('a').forEach(lien => {
  lien.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('ouvert');
  });
});

// Formulaire de contact
emailjs.init("xM8ejh55iZpK1RgyW"); // clé publique dans ton compte EmailJS

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Vérification honeypot
  if (document.getElementById("honeypot").value !== "") return;

  const templateParams = {
    nom: this.nom.value,
    prenom: this.prenom.value,
    email: this.email.value,
    telephone: this.telephone.value,
    message: this.message.value,
    time: new Date().toLocaleString("fr-FR"),
  };

  emailjs.send("service_bsw4pwe", "template_xtrmys1", templateParams) 
    .then(() => {
      alert("Message envoyé !");
      this.reset();
    })
    .catch((err) => {
      console.error("Erreur EmailJS :", err);
      alert("Une erreur est survenue, réessayez plus tard.");
    });
});