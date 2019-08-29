const renderOrdersDetail = function(data) {
  $("#clientsRightContainer").empty();

let info =
`<h1>Customer: ${data[0].user_name}</h1>
<h1>Order ID: ${data[0].order_id}</h1>`;

let total = 0;
data.forEach(element => {
  let orderTotal=element.price * element.quantity / 100;
  total += orderTotal;
})

let totalMenu =
`<h1>Total: $ ${total.toFixed(2)}</h1>`;

let newTemplateString = `
<table class="ui celled padded table">
<thead>
  <tr>
  <th>Menu Item</th>
  <th>Comments</th>
  <th>Quantity</th>
  <th>Unit Price</th>
  <th>Total Price</th>
</tr></thead>`;

data.forEach(element => {
  const newItem = `

  <tbody>
    <tr>
      <td class="single line">
        <h2 class="ui center aligned header">${element.menu_item_name}</h2>
      </td>
      <td>${(element.notes != '') ? element.notes : '' }</td>
      <td class="single line">
      ${element.quantity}
      </td>
      <td class="single line">
      $ ${element.price / 100}
      </td>
      <td class="single line">
      $ ${element.price * element.quantity / 100}
      </td>

    </tr>
  `;
  newTemplateString += newItem;
})


  $("#clientsRightContainer").append(info);
  $("#clientsRightContainer").append(newTemplateString);
  $("#clientsRightContainer").append(totalMenu);


};
