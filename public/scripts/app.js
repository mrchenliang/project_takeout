$(document).ready(function() {

  // INITIAL LOADING OF THE INDEX PAGE
  $.ajax('/restaurants', { method: 'GET' })
    .done(function(value) {
      renderLandingPage(value);
    });

  // ON CLICK LISTENER AND RENDER RESTAURANTS PAGE
  $('.restaurants-link').on('click', () => {
    $.ajax('/restaurants', { method: 'GET' })
      .done(function(value) {
        renderRestaurantsPage(value);
      });
  });

  $.ajax('/clients', { method: 'GET' })
  .done(function(value) {
    renderClientsLandingPage(value);
  });









});
