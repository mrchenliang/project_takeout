const renderClientsHistoryPage = function(data) {
  $("#clients-landing").empty();
  $("#clientsLeftContainer").empty();


  let refresh = ` <button class="ui secondary button refresh-history"> <i class="redo alternate icon"></i> Refresh </button>`;
  let newTemplateString = ``;

  data.forEach(element => {
    const newOrder = `
    <div class = "order-card-wrap-history" id="order-card-wrap" data-orderID='${element.order_id}'>
    <div class="ui raised very padded text container segment status-${element.order_status}" id="order-card-wrap">
  <h2 class="ui header" >Order ID: ${element.order_id} </h2>
  <div class='orders-usersID'>
  Customer Name: ${element.name}
  </div>
  <div class='orders-placed_at'>
  Order Placed At: ${moment(element.placed_at).format('MMMM Do YYYY, h:mm:ss a')}
  </div>
  <div class='total'>
  Total: $ ${(element.total_price / 100).toFixed(2)}
  </div>
  <div class='status'>
  Status: ${element.order_status}
  </div>
</div>
</div>
</div>
    `;
    newTemplateString += newOrder;
  });

  $("#clientsLeftContainer").append(refresh);
  $("#clientsLeftContainer").append(newTemplateString);

  $(".order-card-wrap-history").on("click", function() {
    const orderId = $(this).data().orderid;
    const queryString = `/clients/${sessionStorage.getItem('restId')}/history/${orderId}`;

    $.ajax(queryString, { method: "GET" }).done(function(value) {
      renderHistoryDetail(value);
    });
  });

  $('.refresh-history').on('click', () => {
    $.ajax(`/clients/${sessionStorage.getItem('restId')}/history`, { method: 'GET' })
      .done(function(value) {
        renderClientsHistoryPage(value);
      });
  });
};
