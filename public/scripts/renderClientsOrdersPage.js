const renderClientsOrdersPage = function(data) {
  $("#clientsLeftContainer").empty();

  let newTemplateString = ``;
  console.log(data);

  data.forEach(element => {
    const newOrder = `

    <div class="ui raised very padded text container segment">
  <h2 class="ui header order-card-wrap" >Order ID: ${element.id} </h2>
  <div class='orders-usersID'>
  <h1>${element.user_id}</h1>
  </div>
  <div class='orders-placed_at'>
  Order Placed At: ${element.placed_at}
  </div>
  <div class='total'>
  Total: $${element.placed_at}
  </div>
  <div id='confirm'>
  <button class="ui secondary button">Confirm</button>
</div>
<div id='pickup'>
<button class="ui secondary button">Picked Up</button>
</div>
</div>
</div>
    `;
    newTemplateString += newOrder;
  });
  console.log(newTemplateString);

  $("#clientsLeftContainer").append(newTemplateString);

  // $('.restaurant-card-wrap').on('click', function() {
  //   const orderId = $(this).data().orderId;
  //   const queryString = `/restaurants/${restId}`;


  //   $.ajax(queryString, { method: 'GET' })
  //     .done(function(value) {
  //       renderOrdersDetail(value);
  //     });
  // });
};
