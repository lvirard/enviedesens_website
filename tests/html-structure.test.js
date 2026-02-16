const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Liste des fichiers HTML à tester
const HTML_FILES = [
  'index.html',
  'cadre-legal-reglementaire.html',
  'mentions-legales-confidentialite.html'
];

describe('Tests de structure HTML', () => {
  
  HTML_FILES.forEach(file => {
    describe(`Fichier: ${file}`, () => {
      let dom;
      let document;
      let htmlContent;

      beforeAll(() => {
        const filePath = path.join(process.cwd(), file);
        htmlContent = fs.readFileSync(filePath, 'utf-8');
        dom = new JSDOM(htmlContent);
        document = dom.window.document;
      });

      test('Le fichier HTML existe', () => {
        expect(htmlContent).toBeTruthy();
        expect(htmlContent.length).toBeGreaterThan(0);
      });

      test('DOCTYPE est présent', () => {
        expect(htmlContent.trim()).toMatch(/^<!DOCTYPE html>/i);
      });

      test('Balise <html> présente avec attribut lang="fr"', () => {
        const html = document.querySelector('html');
        expect(html).toBeTruthy();
        expect(html.getAttribute('lang')).toBe('fr');
      });

      test('Balise <head> présente', () => {
        const head = document.querySelector('head');
        expect(head).toBeTruthy();
      });

      test('Balise <meta charset> présente', () => {
        const metaCharset = document.querySelector('meta[charset]');
        expect(metaCharset).toBeTruthy();
        expect(metaCharset.getAttribute('charset')).toBe('utf-8');
      });

      test('Balise <title> présente et non vide', () => {
        const title = document.querySelector('title');
        expect(title).toBeTruthy();
        expect(title.textContent.trim()).not.toBe('');
      });

      test('Balise <meta name="viewport"> présente', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
      });

      test('Balise <body> présente', () => {
        const body = document.querySelector('body');
        expect(body).toBeTruthy();
      });

      test('Balise <main> présente avec id="main"', () => {
        const main = document.querySelector('main#main');
        expect(main).toBeTruthy();
      });

      test('Au moins une balise <section> présente', () => {
        const sections = document.querySelectorAll('section');
        expect(sections.length).toBeGreaterThan(0);
      });

      test('Toutes les balises ouvrantes ont leur balise fermante', () => {
        // Vérification que JSDOM a pu parser sans erreur
        expect(document.querySelector('html')).toBeTruthy();
        
        // Vérification manuelle des balises auto-fermantes courantes
        const selfClosingTags = ['area','base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];
        const openingTags = htmlContent.match(/<(\w+)(?:\s|>)/g) || [];
        const closingTags = htmlContent.match(/<\/(\w+)>/g) || [];
        
        const openedTags = openingTags
          .map(tag => tag.match(/<(\w+)/)[1].toLowerCase())
          .filter(tag => !selfClosingTags.includes(tag));
        
        const closedTags = closingTags
          .map(tag => tag.match(/<\/(\w+)>/)[1].toLowerCase());

        // Compter les occurrences
        const tagCounts = {};
        openedTags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        closedTags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) - 1;
        });

        // Vérifier que tout est équilibré
        const unbalanced = Object.entries(tagCounts)
          .filter(([tag, count]) => count !== 0)
          .map(([tag, count]) => `${tag} (${count > 0 ? '+' : ''}${count})`);

        expect(unbalanced).toEqual([]);
      });

      test('Pas de balises <script> ou <link> cassées', () => {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          expect(script.getAttribute('src')).toBeTruthy();
          expect(script.getAttribute('src')).not.toBe('');
        });

        const links = document.querySelectorAll('link[href]');
        links.forEach(link => {
          expect(link.getAttribute('href')).toBeTruthy();
          expect(link.getAttribute('href')).not.toBe('');
        });
      });
    });
  });

  describe('Tests spécifiques index.html', () => {
    let document;

    beforeAll(() => {
      const htmlContent = fs.readFileSync('index.html', 'utf-8');
      const dom = new JSDOM(htmlContent);
      document = dom.window.document;
    });

    test('Section #presentation existe', () => {
      expect(document.querySelector('section#presentation')).toBeTruthy();
    });

    test('Section #qui existe', () => {
      expect(document.querySelector('section#qui')).toBeTruthy();
    });

    test('Section #offres existe', () => {
      expect(document.querySelector('section#offres')).toBeTruthy();
    });

    test('Section #temoignages existe', () => {
      expect(document.querySelector('section#temoignages')).toBeTruthy();
    });

    test('Section #contact existe', () => {
      expect(document.querySelector('section#contact')).toBeTruthy();
    });

    test('Div #header-placeholder existe', () => {
      expect(document.querySelector('div#header-placeholder')).toBeTruthy();
    });

    test('Div #footer-placeholder existe', () => {
      expect(document.querySelector('div#footer-placeholder')).toBeTruthy();
    });

    test('Toutes les cartes d\'offres ont les détails cachés', () => {
      const detailsCards = document.querySelectorAll('[id^="detail-"]');
      expect(detailsCards.length).toBeGreaterThan(0);
      
      detailsCards.forEach(card => {
        expect(card.hasAttribute('hidden')).toBe(true);
      });
    });

    test('Le formulaire de contact existe', () => {
      const form = document.querySelector('form.contact-form');
      expect(form).toBeTruthy();
    });
  });

  describe('Tests spécifiques pages légales', () => {
    ['cadre-legal-reglementaire.html', 'mentions-legales-confidentialite.html'].forEach(file => {
      describe(`Page: ${file}`, () => {
        let document;

        beforeAll(() => {
          const htmlContent = fs.readFileSync(file, 'utf-8');
          const dom = new JSDOM(htmlContent);
          document = dom.window.document;
        });

        test('Section #presentation existe', () => {
          expect(document.querySelector('section#presentation')).toBeTruthy();
        });

        test('Au moins une section avec classe "section--legal"', () => {
          const legalSections = document.querySelectorAll('section.section--legal');
          expect(legalSections.length).toBeGreaterThan(0);
        });

        test('CSS pages-legales.css est chargé', () => {
          const legalCss = document.querySelector('link[href="public/css/pages-legales.css"]');
          expect(legalCss).toBeTruthy();
        });
      });
    });
  });

  describe('Tests de cohérence globale', () => {
    test('Tous les fichiers utilisent la même feuille de style principale', () => {
      HTML_FILES.forEach(file => {
        const htmlContent = fs.readFileSync(file, 'utf-8');
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        
        const mainCss = document.querySelector('link[href="public/css/styles.css"]');
        expect(mainCss).toBeTruthy();
      });
    });

    test('Tous les fichiers chargent le même fichier JS', () => {
      HTML_FILES.forEach(file => {
        const htmlContent = fs.readFileSync(file, 'utf-8');
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        
        const mainJs = document.querySelector('script[src="public/js/main.js"]');
        expect(mainJs).toBeTruthy();
      });
    });

    test('Tous les fichiers ont les éléments décoratifs', () => {
      HTML_FILES.forEach(file => {
        const htmlContent = fs.readFileSync(file, 'utf-8');
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        
        expect(document.querySelector('.decor-top')).toBeTruthy();
        expect(document.querySelector('.decor-bottom')).toBeTruthy();
      });
    });

    test('Tous les fichiers ont un lien d\'accessibilité "Aller au contenu"', () => {
      HTML_FILES.forEach(file => {
        const htmlContent = fs.readFileSync(file, 'utf-8');
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        
        const skipLink = document.querySelector('a.skip-link[href="#main"]');
        expect(skipLink).toBeTruthy();
      });
    });
  });
});