const renderLandingPage = function(data) {
  $("#rootContainer").empty();

  const newTemplateString = `
  <div id='landingHeader'>
    <h2 id='landing-text'>ORDERING MADE EASY</h2>
  </div>
  <div id='landingInstructions'>
  <div class="instruction column">
    <div class="ui card">
      <div class="image">
        <img class="instruction-img" src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
      </div>
      <div class="content">
        <a class="header">Step 1: Browse & Order</a>
      </div>
    </div>
  </div>
  <div class="instruction column">
    <div class="ui card">
      <div class="image">
        <img class="instruction-img" src="https://images.unsplash.com/photo-1475818413317-9367409f204a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80">
      </div>
      <div class="content">
        <a class="header">Step 2: Confirm & Wait</a>
      </div>
    </div>
  </div>
  <div class="instruction column">
    <div class="ui card">
      <div class="image">
        <img class="instruction-img" src="https://images.unsplash.com/photo-1559144490-8328294facd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80">
      </div>
      <div class="content">
        <a class="header">Step 3: Pickup & Enjoy</a>
      </div>
    </div>
</div>
</div>

  <div id='landingRestaurants'>
    <div id="map"></div>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAllv7wgbOCoIcy0VZdFz-um0CgJS7hX4k&callback=initMap">
    </script>
    <div id='restaurant-button'>
      <button class="ui large secondary button restaurants-link">RESTAURANTS</button>
    </div>
  </div>
  `;
  $("#rootContainer").append(newTemplateString);

  if (document.cookie.split('=')[2]) {
    const allCookies = document.cookie;
    const splitCookie = allCookies.split('=');
    const userName = splitCookie[2];
    $('#login').css('display', 'none');
    $('#signup').css('display', 'none');
    $('#logout').css('display', 'inline-block');
    $('#order-progress').text("You're logged in as:  " + userName + '   . Click to view your orders.');
    $('#order-progress').on('click', () => {
      generateAllOrders();
      $('#orderHistoryModal')
        .modal('show')
      ;
    });
  }

  $('.restaurants-link').on('click', () => {
    $.ajax('/restaurants', { method: 'GET' })
      .done(function(value) {
        renderRestaurantsPage(value);
      });
  });

  $('#flip-left').on('click', () => {
    $('.shape').shape('flip left');
  });

  $('#flip-right').on('click', () => {
    $('.shape').shape('flip right');
  });
};
