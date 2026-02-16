//A enlever lorsque deploiement sur OVH (problème de fetch des partials)
// Templates HTML pour header et footer (fallback pour GitHub Pages)
const headerTemplate = `
<header class="header">
    <div class="header-content">
        <div class="logo">
            <img src="public/images/logo.png"
                 alt="Logo Envie de sens - Bilan de compétences et orientation" 
                 width="50" height="50">
            <span class="logo-text">Envie de Sens</span>
        </div>
        <nav class="nav" aria-label="Navigation principale">
            <ul>
                <li><a href="index.html#presentation">Présentation</a></li>
                <li><a href="index.html#qui">Qui je suis</a></li>
                <li><a href="index.html#offres">Offres</a></li>
                <li><a href="index.html#temoignages">Témoignages</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
        </nav>
        <button class="burger" aria-label="Menu" aria-expanded="false">☰</button>
    </div>
</header>
`;

const footerTemplate = `
<footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
        <div class="footer-left">
            <div class="footer-brand">
                <img src="public/images/logo.png"
                     alt="Envie de sens - Bilan de compétences et orientation">
                <div class="footer-title">
                    <span class="marque">Envie de sens</span>
                    <span class="baseline">Bilan de compétences & orientation</span>
                </div>
            </div>
            <nav class="footer-nav" aria-label="Liens utiles">
                <a href="index.html#contact">Me contacter</a>
                <a href="https://www.linkedin.com/in/virginie-porez-b0b18561/"
                   target="_blank" rel="noreferrer">
                    Suivez-moi sur LinkedIn
                </a>
                <a href="cadre-legal-reglementaire.html">Cadre légal & règlementaire du bilan de compétences</a>
                <a href="mentions-legales-confidentialite.html">
                    Mentions légales &amp; confidentialité
                </a>
                <a href="public/others/flyer.png" target="_blank">Flyer Envie de Sens</a>
            </nav>
        </div>
        <div class="footer-certifs">
            <div class="footer-qualiopi">
                <img src="public/images/Bilan-de-comptences-qualiopi-1024x399.png"
                     alt="Qualiopi - processus certifié pour les actions de formation">
            </div>
            <p>
                Virginie Porez, titulaire d'un CAPE, 
                dont l'activité économique de Bilan de compétences et d'accompagnement individuel à l'orientation professionnelle l'accompagnement et conseil en transition professionnelle, 
                est hébergée juridiquement par la société Crealead, SCAE SCOP SA à capital variable, Hôtel de la Coopération 55 rue Saint Cléophas -34070 Montpellier- N° SIRET : 4380762000023, n° TVA intracommunautaire : FR56438076200.
                Déclaration d'activité enregistrée sous 91-34-04871-34, cet enregistrement ne vaut pas agrément de l'État.
            </p>
        </div>
        <p class="footer-copy">
            &copy; 2026 Envie de sens – Tous droits réservés.
        </p>
    </div>
</footer>
`;

//Utilisation du header/footer pour les pages
document.addEventListener("DOMContentLoaded", () => {
  //à remettre lorsque deploiement sur OVH
  // function loadPartial(url, placeholderId) {
  //   fetch(url)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Erreur de chargement : " + url);
  //       }
  //       return response.text();
  //     })
  //     .then(data => {
  //       document.getElementById(placeholderId).innerHTML = data;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  // loadPartial("/partials/header.html", "header-placeholder");
  // loadPartial("/partials/footer.html", "footer-placeholder");

  loadPartial("partials/header.html", "header-placeholder", headerTemplate);
  loadPartial("partials/footer.html", "footer-placeholder", footerTemplate);


});

/**
 * Charge un partial HTML depuis un fichier
 * Avec fallback sur un template si le fetch échoue (pour GitHub Pages)
 */
//à enlever lorsque deploiement sur OVH 
function loadPartial(url, placeholderId, fallbackTemplate) {
  const placeholder = document.getElementById(placeholderId);
  
  if (!placeholder) {
    console.warn(`Placeholder ${placeholderId} introuvable`);
    return;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur ${response.status} lors du chargement de ${url}`);
      }
      return response.text();
    })
    .then(data => {
      placeholder.innerHTML = data;
      // Initialiser les événements après injection
      if (placeholderId === "header-placeholder") {
        initBurgerMenu();
      }
    })
    .catch(error => {
      console.warn(`Impossible de charger ${url}, utilisation du fallback`, error);
      // Utiliser le template en fallback (pour GitHub Pages)
      placeholder.innerHTML = fallbackTemplate;
      // Initialiser les événements après injection
      if (placeholderId === "header-placeholder") {
        initBurgerMenu();
      }
    });
}

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

// Footer burger
const burger = document.querySelector('.footer-burger');
const footerNav = document.querySelector('.footer-nav');

burger?.addEventListener('click', () => {
  const ouvert = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!ouvert));
  footerNav.classList.toggle('ouvert', !ouvert);
});

// Gestion du formulaire de contact
// document.addEventListener("DOMContentLoaded", () => {
//   const contactForm = document.querySelector(".contact-form");

//   if (contactForm) {
//     contactForm.addEventListener("submit", (e) => {
//       e.preventDefault();
      
//       // Ici vous pourrez ajouter l'envoi du formulaire plus tard
//       // Pour l'instant, juste un message
//       alert("Merci pour votre message ! Nous vous recontacterons rapidement.");
//       contactForm.reset();
//     });
//   }
// });
