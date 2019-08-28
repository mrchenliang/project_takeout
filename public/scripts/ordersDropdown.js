const generateAllOrders = function() {
  $('#lisfOfOrders').empty();

  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');

  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/allOrders',
  }).done(function(value) {
    console.log(value);
    value.forEach(element => {
      const orderTempString = `
      <div class='orderTitle' data-orderHistoryId=${element.order_id}>
        <h3>ORDER ID : ${element.order_id}</h3>
        <p>TOTAL : $${element.total / 100}. \u00A0\u00A0\u00A0\u00A0 Order status : ${element.status}</p>
      </div>
      `;
      $('#listOfOrders').append(orderTempString);
      $('div[data-orderHistoryId="' + element.order_id + '"').on('click', () => {
        const clickedElement = $(event.target);
        const orderId = clickedElement[0].dataset.orderhistoryid;
        generateSingleOrder(orderId);
      });
    });
});
}

const generateSingleOrder = function (order_id) {

  $('#singleOrderDetails').empty();
  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');


  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/orders/' + order_id,
  }).done(function(value) {
    console.log(value);
    const tempString = `
    <div id='mainOrderDiv'>
      <h1></h1>
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
    </div>`;
    $('#singleOrderDetails').append(tempString);

    value.forEach((element) => {
      const name = element.menu_item_name;
      const qty = element.quantity;
      const price = element.price;
      const notes = element.notes;
      const tempStringDet = `
        <tr>
          <td>${name}<p>${notes}</p></td>
          <td>${qty}</td>
          <td>$${price / 100}</td>
        </tr>
      `;
      $('.summBodyHist').append(tempStringDet);

  });
})
}

