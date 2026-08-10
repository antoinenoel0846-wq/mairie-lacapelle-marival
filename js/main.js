(function () {
  'use strict';

  /* Menu mobile */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
    });
  }

  /* Onglets des services (pattern WAI-ARIA tabs) */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));

  function selectTab(tab) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (event) {
      var newIndex = null;
      if (event.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') newIndex = 0;
      if (event.key === 'End') newIndex = tabs.length - 1;
      if (newIndex !== null) {
        event.preventDefault();
        tabs[newIndex].focus();
        selectTab(tabs[newIndex]);
      }
    });
  });

  /* Carrousel équipe municipale */
  var teamTrack = document.getElementById('team-track');
  var teamPrev = document.getElementById('team-prev');
  var teamNext = document.getElementById('team-next');
  if (teamTrack && teamPrev && teamNext) {
    var scrollAmount = function () {
      var card = teamTrack.querySelector('.team-card');
      return card ? card.getBoundingClientRect().width + 24 : 280;
    };
    teamPrev.addEventListener('click', function () {
      teamTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    teamNext.addEventListener('click', function () {
      teamTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  }

  /* Retour en haut */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
