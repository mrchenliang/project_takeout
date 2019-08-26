const renderClientsLandingPage = function(data) {
  $('#clientsRootContainer').empty();

  const newTemplateString = `
  <div id='clientsLanding'>
    <h2 id='clients-landing-text'>WELCOME TO TAKEOUT</h2>
  </div>
  `;
  $("#clientsRootContainer").append(newTemplateString);
};
