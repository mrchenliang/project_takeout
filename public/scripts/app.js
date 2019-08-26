$(document).ready(function() {

  // INITIAL LANDING OF THE INDEX PAGE
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

  // INITAL LANDING PAGE FOR CLIENTS
  $.ajax('/clients', { method: 'GET' })
  .done(function(value) {
    renderClientsLandingPage(value);
  });

// ON CLICK LISTENER AND RENDER ORDERS PAGE
  $('.orders-list').on('click', () => {
    $.ajax('/clients/:client_id/orders', { method: 'GET' })
      .done(function(value) {
      renderClientsOrdersPage(value);
      });
  });









});
