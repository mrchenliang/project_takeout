const renderClientLandingPage = function(data) {
  $('#clientsRootContainer').empty();

  const newTemplateString = `
  <div id='clientsLanding'>
    <h2 id='landing-text'>WELCOME TO TAKE OUT</h2>
  </div>
  `;
  $("#clientsRootContainer").append(newTemplateString);
};
