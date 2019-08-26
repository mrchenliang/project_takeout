const renderClientsOrdersPage = function(data) {
  $("#clientsRootContainer").empty();

  let newTemplateString = ``;

  data.forEach(element => {
    const newOrder = `
    <div class='order-card-wrap' data-orderID='${element.id}'>
      <div class='orders-usersID'>
      <h1>${element.id}</h1>
      <h1>${element.user_id}</h1>
      <div class='orders-placed_at'>
         ${element.placed_at}
      </div>
      </div>
    </div>
    `;
    newTemplateString += newOrder;
  });

  $("#clientsRootContainer").append(newTemplateString);
};
