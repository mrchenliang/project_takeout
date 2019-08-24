const renderLoadingPage = function(data) {
  $('#rootContainer').empty();

  const newTemplateString = `
  <div id='landingHeader'>
    <h2>ORDERING MADE EASY</h2>
  </div>
  <div id='landingInstructions'>
    <div class="ui card">
      <div class="image">
        <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
      </div>
      <div class="content">
        <p class="header">STEP 1</p>
      </div>
    </div>
    <div class="ui card">
      <div class="image" >
        <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
      </div>
      <div class="content">
        <p class="header">STEP 2</p>
      </div>
    </div>
    <div class="ui card">
      <div class="image" >
        <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
      </div>
      <div class="content">
        <p class="header">STEP 3</p>
      </div>
    </div>
  </div>
  <div id='landingRestaurants'>
    <button class="ui secondary button">RESTAURANTS</button>
  </div>
  `;
  $('#rootContainer').append(newTemplateString);

};


