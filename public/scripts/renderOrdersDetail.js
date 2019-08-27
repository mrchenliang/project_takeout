const renderOrdersDetail = function(data) {
  console.log(data)
  $("#clientsRightContainer").empty();

let newTemplateString = ``;

data.forEach(element => {
  const newItem = `
  <div class = "display-order'>
  <div class="ui raised very padded text container segment" >
<h2 class="ui header order-card-wrap" >Order ID: ${element.order_id} </h2>
<div class='orders-usersID'>
<h1>${element.name}</h1>
</div>
<div class='orders-placed_at'>
Order Placed At: ${element.placed_at}
</div>
<div class='total'>
Total: $ ${element.total_price / 100}
</div>
<div class='status'>
Status: ${element.order_status}
</div>
<div id='confirm-copmpleted'>
<button class="ui secondary button">
${(element.order_status == 'submitted') ? 'Confirm' : 'Pick Up'}</button>
</div>
</div>
</div>
  `;

    newTemplateString += newItem;

  $("#clientsRightContainer").append(newTemplateString);

};
