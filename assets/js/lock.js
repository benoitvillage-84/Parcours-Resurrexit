document.addEventListener('DOMContentLoaded', function() {
  // Date actuelle (sans heure)
  var now = new Date();
  now.setHours(0, 0, 0, 0);

  // Recupere la date de debut du parcours
  var startEl = document.querySelector('[data-parcours-start]');
  if (!startEl) return;
  var startStr = startEl.dataset.parcoursStart;
  if (!startStr) return;
  var start = new Date(startStr + 'T00:00:00');

  // --- Verrouillage page jour ---
  var article = document.querySelector('.jour-page');
  if (article) {
    var jour = parseInt(article.dataset.jour, 10);
    if (jour) {
      var jourDate = new Date(start);
      jourDate.setDate(jourDate.getDate() + jour - 1);

      if (now < jourDate) {
        var content = document.querySelector('.jour-content');
        var locked = document.querySelector('.jour-locked');
        var lockedDateEl = document.querySelector('.locked-date');

        if (content) content.style.display = 'none';
        if (locked) {
          locked.style.display = 'block';
          if (lockedDateEl) {
            var options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            lockedDateEl.textContent = jourDate.toLocaleDateString('fr-FR', options);
          }
        }
      }
    }
  }

  // --- Verrouillage dans l'index ---
  var jourLinks = document.querySelectorAll('.jour-list li a');
  jourLinks.forEach(function(link) {
    var match = link.getAttribute('href').match(/jour-(\d+)/);
    if (match) {
      var n = parseInt(match[1], 10);
      var d = new Date(start);
      d.setDate(d.getDate() + n - 1);
      if (now < d) {
        link.classList.add('locked');
        link.addEventListener('click', function(e) { e.preventDefault(); });
      }
    }
  });
});
