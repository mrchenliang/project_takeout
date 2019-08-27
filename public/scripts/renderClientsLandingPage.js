const renderClientsLandingPage = function(data) {
  $('#clientsLeftContainer').empty();

  const newTemplateString = `
  <div id='clientsLanding'>
    <h2 id='clients-landing-text'>WELCOME TO TAKEOUT</h2>
  </div>
  `;
  $("#clientsLeftContainer").append(newTemplateString);
};
