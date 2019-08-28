const generateAllOrders = function() {
  $('#lisfOfOrders').empty();

  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');
  const userId = splitCookie[2];

  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/allOrders',
  }).done(function(value) {
    console.log(value);
  //   const orderTempString = `
  //   <div class='orderTitle' data-orderHistoryId=${}>
  //     <h3>ORDER ID : ${}</h3>
  //     <p>TOTAL : ${}</p>
  //     <p>Order status : ${}</p>
  //   </div>
  //   `;
  //   $('#listOfOrders').append(orderTempString);
  //   $('i[data-icon="' + count + '"').on('click', () => {
  //     const clickedElement = $(event.target);
  //     console.log(clickedElement);
  // });
};

const generateSingleOrder = function (order_id) {
  $('#singleOrderDetails').empty();
  $.ajax({
    method : 'GET',
    url: '/users/' + order_id + '/allOrders',
  }).done(function(value) {
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
        <tbody class='summBody'>
        </tbody>
      </table>
    </div>`;
    $('#singleOrderDetails').append(tempString);
  });
};
