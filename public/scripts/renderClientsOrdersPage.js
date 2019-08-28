const renderClientsOrdersPage = function(data) {
  $("#clients-landing").empty();
  $("#clientsLeftContainer").empty();

  let refresh = ` <button class="ui secondary button refresh"> <i class="redo alternate icon"></i> Refresh </button>`;
  let newTemplateString = ``;

  data.forEach(element => {
    const newOrder = `
    <div class = "order-card-wrap" data-orderID='${element.order_id}'>
    <div class="ui raised very padded text container segment status-${
      element.order_status
    }">
  <h2 class="ui header" >Order ID: ${element.order_id} </h2>
  <div class='orders-usersID'>
  Customer Name: ${element.name}
  </div>
  <div class='orders-placed_at'>
  Order Placed At: ${moment(element.placed_at).format(
    "MMMM Do YYYY, h:mm:ss a"
  )}
  </div>
  <div class='total'>
  Total: $ ${(element.total_price / 100).toFixed(2)}
  </div>
  <div class='status'>
  Status: ${element.order_status}
  </div>
  <form class='confirm-completed' data-id='${element.order_id}'>
  ${
    element.order_status == "submitted"
      ? `<div class="ui mini icon input">
  <input type="text" placeholder="Wait Time" id="waittime-${element.order_id}">
  </div>
  <button class="ui secondary button"> Confirm </button>`
      : `<button class="ui secondary button"> Pick Up </button>`
  }
</form>
</div>
</div>
</div>
    `;
    newTemplateString += newOrder;
  });

  $("#clientsLeftContainer").append(refresh);
  $("#clientsLeftContainer").append(newTemplateString);

  $(".order-card-wrap").on("click", function() {
    const orderId = $(this).data().orderid;
    const queryString = `/clients/2/orders/${orderId}`;

    $.ajax(queryString, { method: "GET" }).done(function(value) {
      console.log(value);
      renderOrdersDetail(value);
    });
  });

  $(".confirm-completed").on("submit", function(evt) {
    evt.preventDefault();
    const orderId = $(this).data().id;
    const queryString = `/clients/2/orders/${orderId}`;
    const waitTime = $(`#waittime-${orderId}`).val();
    $.ajax({
      url: queryString,
      type: "POST",
      data: { est_time: waitTime }
    }).done(value => {
      $.ajax("/clients/2/orders", { method: "GET" }).done(function(value) {
        renderClientsOrdersPage(value);
      });
    });
  });

  $(".refresh").on("click", () => {
    $.ajax("/clients/2/orders", { method: "GET" }).done(function(value) {
      renderClientsOrdersPage(value);
    });
  });
};
