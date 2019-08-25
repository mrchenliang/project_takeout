const renderRestaurantsPage = function(data) {
  $('#rootContainer').empty();

  let newTemplateString = ``;

  data.forEach((element) => {

    const newRestaurant = `
    <div class='restaurant-card-wrap'>
      <div class='restaurant-card' data-restaurant-id='${element.id}' style='background-image: url("${element.cover_photo_url}")'>
      </div>
      <div class='restaurant-placeholder'>
        <h1>${element.name}</h1>
        <div class='restaurant-description'>
          ${element.description}
          <br>
          <br>
          <br>
          <p>Address: ${element.address}</p>
          <p>Phone Number: ${element.phone}</p>
        </div>
      </div>
    </div>
    `;
    newTemplateString += newRestaurant;

  });

  $('#rootContainer').append(newTemplateString);

};
