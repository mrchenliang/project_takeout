const renderRestaurantsPage = function(data) {
  $('#rootContainer').empty();

  let newTemplateString = ``;

  data.forEach((element) => {

    const newRestaurant = `
    <div class='restaurant-card-wrap' data-restaurantId='${element.id}'>
      <div class='restaurant-card' style='background-image: url("${element.cover_photo_url}")'>
      </div>
      <div class='restaurant-placeholder'>
        <h1>${element.name}</h1>
        <div class='restaurant-description'>
          ${element.description}
          <br>
          <br>
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

  $('.restaurant-card-wrap').on('click', function() {
    const restId = $(this).data().restaurantid;
    const queryString = `/restaurants/${restId}`;


    $.ajax(queryString, { method: 'GET' })
      .done(function(value) {
        renderMenuItems(value);
      });
  });

};
