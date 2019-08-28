const generateAllOrders = function() {
  const allCookies = document.cookie;
  const splitCookie = allCookies.split('=');
  const userId = splitCookie[2];

  $.ajax({
    method : 'GET',
    url: '/users/' + splitCookie[1][0] + '/orders',
  }).done(function(value) {

    const orderTempString = `
    <div class='orderTitle' data-orderHistoryId=${}>
      <h3>ORDER ID : ${}</h3>
      <p>TOTAL : ${}</p>
      <p>Order status : ${}</p>
    </div>
    `;
    $('#listOfOrders').append(orderTempString);
    $('i[data-icon="' + count + '"').on('click', () => {
      const clickedElement = $(event.target);
      console.log(clickedElement);
  });
}
