const renderClientsOrdersPage = function(data) {
  $('#clientsRootContainer').empty();

  let newTemplateString = ``;

  data.forEach((element) => {

    const newOrder = `
    <div class='order-card-wrap' data-ordersID='${element.id}'>
      <div class='orders-usersID'>
        <h1>${element.id}</h1>
        <h1>${element.user_id}</h1>
        <div class='orders-placed_at'>
          ${element.placed_at}
          <br>
          <br>
          <br>
          <br>
          <br>
        </div>
      </div>
    </div>
    `;
    newTemplateString += newOrder;

  });

  $('#clientsRootContainer').append(newTemplateString);

  $('.restaurant-card-wrap').on('click', function() {
    const restId = $(this).data().restaurantid;
    const queryString = `/restaurants/${restId}`;


    $.ajax(queryString, { method: 'GET' })
      .done(function(value) {
        renderMenuItems(value);
      });
  });

};


<div class="ui segment">
  <div class="ui two column very relaxed grid">
    <div class="column">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="column">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
  <div class="ui vertical divider">
    and
  </div>
</div>
