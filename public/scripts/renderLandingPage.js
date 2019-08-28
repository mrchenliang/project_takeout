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
        <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
      </div>
      <div class="content">
        <a class="header">Step 1: Browse & Order</a>
      </div>
    </div>
  </div>
  <div class="instruction column">
    <div class="ui card">
      <div class="image">
        <img src="https://images.unsplash.com/photo-1475818413317-9367409f204a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80">
      </div>
      <div class="content">
        <a class="header">Step 2: Confirm & Wait</a>
      </div>
    </div>
  </div>
  <div class="instruction column">
    <div class="ui card">
      <div class="image">
        <img src="https://images.unsplash.com/photo-1559144490-8328294facd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80">
      </div>
      <div class="content">
        <a class="header">Step 3: Pickup & Enjoy</a>
      </div>
    </div>
</div>
</div>

  <div id='landingRestaurants'>
  <div id='restaurant-selector'>
  <div class="ui people shape">
  <div class="sides">
    <div class="active side">
      <div class="ui card">
        <div class="image">
          <img src="/images/avatar/large/steve.jpg">
        </div>
        <div class="content">
          <div class="header">Steve Jobes</div>
          <div class="meta">
            <a>Acquaintances</a>
          </div>
          <div class="description">
            Steve Jobes is a fictional character designed to resemble someone familiar to readers.
          </div>
        </div>
        <div class="extra content">
          <span class="right floated">
            Joined in 2014
          </span>
          <span>
            <i class="user icon"></i>
            151 Friends
          </span>
        </div>
      </div>
    </div>
    <div class="side">
      <div class="ui card">
        <div class="image">
          <img src="/images/avatar/large/stevie.jpg">
        </div>
        <div class="content">
          <a class="header">Stevie Feliciano</a>
          <div class="meta">
            <span class="date">Joined in 2014</span>
          </div>
          <div class="description">
            Stevie Feliciano is a library scientist living in New York City. She likes to spend her time reading, running, and writing.
          </div>
        </div>
        <div class="extra content">
          <a>
            <i class="user icon"></i>
            22 Friends
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
  <div class="ui ignored icon direction buttons" id="restaurant-selector-button-container">
      <div class="ui button" data-animation="flip" data-direction="left" title="Flip Left"><i class="left long arrow icon"></i></div>
      <div class="ui icon button" data-animation="flip" data-direction="right" title="Flip Right"><i class="right long arrow icon"></i></div>
  </div>
    <div id='restaurant-button'>
      <button class="ui secondary button restaurants-link">RESTAURANTS</button>
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
    $('#order-progress').text("You're logged in as:  " + userName);
  }

  $('.restaurants-link').on('click', () => {
    $.ajax('/restaurants', { method: 'GET' })
      .done(function(value) {
        renderRestaurantsPage(value);
      });
  });
};
