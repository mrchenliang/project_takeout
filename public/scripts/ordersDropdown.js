const generateAllOrders = function() {

  $('#listOfOrders').empty();

  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');

  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/allOrders',
  }).done(function(value) {
    value.forEach(element => {
      const orderTempString = `
      <div class='orderTitle' data-orderHistoryId=${element.order_id}>
        <h3>ORDER ID: ${element.order_id}</h3>
        <p>TOTAL: $${(element.total / 100).toFixed(2)} \u00A0\u00A0\u00A0\u00A0</p>
        <p class="status"> Order status : ${element.status}</p>
      </div>
      `;
      $('#listOfOrders').append(orderTempString);
      $('div[data-orderHistoryId="' + element.order_id + '"').on('click', () => {
        const clickedElement = $(event.target).closest('div');
        const orderId = clickedElement[0].dataset.orderhistoryid;
        generateSingleOrder(orderId);
      });
    });
  });
};

const generateSingleOrder = function(orderId) {

  $('#singleOrderDetails').empty();

  const tempString = `
  <div id='mainOrderDiv'>
    <h1 id='mainRestaurantTitle'></h1>
    <h4 id='orderPlacedAtHist'></h4>
  <table class='ui celled table'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody class='summBodyHist'>
    </tbody>
  </table>
    h2 id='totalOrderHistPrice'></h2>
  </div>`;
  $('#singleOrderDetails').append(tempString);

  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');

  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/orders/' + orderId,
  }).done(function(value) {
    $('.summBodyHist').empty();
    $('#mainRestaurantTitle').text(value[0].restaurant_name);
    const time = `This order has been placed at: ${value[0].placed_at.slice(11, 16)}, ${value[0].placed_at.slice(0, 10)}`;
    $('#orderPlacedAtHist').text(time);
    let sum = 0;
    value.forEach((element) => {
      const name = element.menu_item_name;
      const qty = element.quantity;
      const price = element.price;
      const notes = element.notes;
      sum += price * qty / 100;
      const tempStringDet = `
        <tr>
          <td>${name}<p id='orderHistoryNotesP'>${notes}</p></td>
          <td>${qty}</td>
          <td>$${price / 100}</td>
        </tr>
      `;
      $('.summBodyHist').append(tempStringDet);

    });
    const priceString = `Total of your order was: $${sum.toFixed(2)}`;
    $('#totalOrderHistPrice').text(priceString);
  });
};



