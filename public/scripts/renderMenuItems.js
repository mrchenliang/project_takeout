const renderMenuItems = function(data) {
  $("#rootContainer").empty();

  const generateCartPopup = function() {
    const popupTemplateString = `
    <div class='cartDetails'>
      <div class='cartDetailsTitle'>
      </div>
      <div class='cartDetailsContent'>
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
      </div>
      <div class='cartTotals'>
      </div>
    </div>
    <div class='cartPopup'>
      <p>YOUR ORDER</p>
    </div>`;
    $('#rootContainer').append(popupTemplateString);

    $('.cartPopup').on('click', () => {
      generateCartPopupDetails();
      $('.cartDetails').toggleClass('showCart');
    })
  }

  const generateCartPopupDetails = function() {
    $(`.summBody`).empty();
    $(`.cartDetailsTitle`).empty();

    const allCookies = document.cookie;
    const splitCookie = allCookies.split('=');
    const userId = splitCookie[2];
    if (userId) {
      $.ajax({
        method : 'GET',
        url: '/users/' + splitCookie[1][0] + '/orders',
      }).done(function(value) {
        $('.cartDetailsTitle').append(`<h3>${value[0].restaurant_name}</h3>`);
        let total = 0;
        value.forEach((element) => {
          const name = element.menu_item_name;
          const qty = element.quantity;
          const price = element.price;
          const notes = element.notes;
          const tempString = `
            <tr>
              <td>${name}<p>${notes}</p></td>
              <td>${qty}</td>
              <td>$${price / 100}</td>
            </tr>
          `;
          $('.summBody').append(tempString);
          total += (qty * price);
        });
        const tempStringTotals = `
        <div class='cartTotalsSum'>
          <h2>Your total : $${(total) / 100}</h2>
        </p>
        `;
        $('.cartTotals').append(tempStringTotals);
      });
    }
  };

  const generateCategories = (categories) => {
    const categoryArray = [];
    let categoryTemplateString = '';
    let categoryList = '';

    categories.forEach(element => {
      if (!categoryArray.includes(element.category_name)) {
        categoryArray.push(element.category_name);
        categoryTemplateString += `
        <div class='menuItemsCategory' data-category='${element.category_name}'>
        <h1>${element.category_name}</h1>
        </div>
        `;
        categoryList += `
        <h2>${element.category_name}</h2>
        `;
      }
    });

    $('.menuItems').append(categoryTemplateString);
    $('.menuItemsCategories').append(categoryList);

    let baseElement = document.querySelector('.menuItemsCategories');

    const h2s = baseElement.querySelectorAll('h2');

    h2s.forEach(function(element)  {
      element.addEventListener('click', () => {
        const slct = element.textContent;
        $('html, body').animate({
          scrollTop: ($('div[data-category="' + slct + '"').first().offset().top)
        },500);
      });
    });


  };

  const generateMenuItems = (menuItems) => {

    menuItems.forEach(element => {
      let menuItemTemplateString = `
      <div class='singleMenuItem' data-itemId="${element.id}">
        <div class='menuItemDescription'>
          <h2>${element.name}</h2>
          <p>${element.description}</p>
          <h3>Price: $${element.price / 100}</h3>
        </div>
        <div class='menuItemImage' style='background-image: url("${element.image_url}")'>
        </div>
      </div>
      `;
      const selector = element.category_name;
      $('div[data-category="' + selector + '"').append(menuItemTemplateString);
    });

  };


  const newTemplateString = `
  <div>
    <div class='leftSideBar'>
      <div class='restImage' style='background-image: url("${data[0].restaurant_image_url}")'>
      <div class='restInfo'>
        <p>${data[0].restaurant_name}</p>
        <p>${data[0].restaurant_phone}</p>
        <p>${data[0].restaurant_website}</p>
        <p>${data[0].restaurant_address}</p>
      </div>
      </div>
    </div>
    <div class='menuItems'>
    </div>
    <div id='rightSideBar'>
      <div class='menuItemsCategories'>
      </div>
    </div>
  </div>
  `;
  $("#rootContainer").append(newTemplateString);
  generateCategories(data);
  generateMenuItems(data);
  generateCartPopup();


  // ON CLICK LISTENER AND RENDER ADD TO CART MODAL
  $('.singleMenuItem').on('click', function() {
    const slct = $(this).attr('data-itemId');

    const title = $('div[data-itemId="' + slct + '"').children('.menuItemDescription').children('h2')[0].innerHTML;
    const description = $('div[data-itemId="' + slct + '"').children('.menuItemDescription').children('p')[0].innerHTML;
    const itemId = $('div[data-itemId="' + slct + '"').attr('data-itemId');
    const price = $('div[data-itemId="' + slct + '"').children('.menuItemDescription').children('h3')[0].innerHTML.match(/[\d]+[.][\d]+$/gm);
    const image = $('div[data-itemId="' + slct + '"').children('.menuItemImage').css("background-image");

    // let description = $(this).children('.menuItemDescription').children('p')[0].innerHTML;
    // let itemId = $(this).attr('data-itemId');
    // let price = $(this).children('.menuItemDescription').children('h3')[0].innerHTML.match(/[\d]+[.][\d]+$/gm);
    // let image = $(this).children('.menuItemImage').css("background-image");
    let quantity = 1;

    const orderModal =
      `<div class="ui modal" id="orderModal">
        <div class="header">
          <h1>Add to Order</h1>
        </div>
        <div class="image content">
          <div class="modalImage" style='background-image: ${image}'></div>
        </div>
        <div class="modalTitle">
          <h2>${title}</h2>
          <p>${description}</p>
          <h3>$ ${price}</h3>
        </div>
        <form class="ui form" id="addItemForm-${itemId}" action="/users/1/orders" method="POST">
          <h4>Notes (optional):</h4>
          <input type="text" name="notes" placeholder="Make it blessed.">
          <div class="quantityInput field">
            <button class="positive ui button" id="addQuantity">Add</button>
            <button class="negative ui button" id="removeQuantity">Remove</button>
            <input type="text" name="quantity" id="quantity" readonly value=${quantity} style="border:none">
            <p>x $${price}</p>
            <p id=totalPrice>Total: $${quantity*price}</p>
            <input type=text name="menu_item_id" style="display: none" value="${itemId}">
          </div>
          <div class="actions">
            <div class="ui large buttons">
              <button class="ui button" id="addToOrder">Add to Order</button>
            </div>
          </div>
        </form>
      </div>`;

    $("#rootContainer").append(orderModal);

    $('#orderModal #addQuantity').on('click', function() {
      event.preventDefault();
      quantity++;
      let quantityElement = $('#orderModal #quantity');
      quantityElement.prop('readonly',false);
      quantityElement.val(`${quantity}`);
      quantityElement.prop('readonly',true);
      $(this).siblings('#totalPrice')[0].innerHTML = `Total: $${(quantity*price).toFixed(2)}`;
    });

    $('#orderModal #removeQuantity').on('click', function() {
      event.preventDefault();
      if (quantity > 1) {
        quantity--;
        let quantityElement = $('#orderModal #quantity');
        quantityElement.prop('readonly',false);
        quantityElement.val(`${quantity}`);
        quantityElement.prop('readonly',true);
        $(this).siblings('#totalPrice')[0].innerHTML = `Total: $${(quantity*price).toFixed(2)}`;
      };
    });

    $(`#addItemForm-${itemId}`).on('submit', function() {

      event.preventDefault();
      const formData = $(this).serialize();

      $.ajax({
        method : 'POST',
        url: $(this).attr('action'),
        data : formData
      }).done(function(value) {
        if (value.error == 'Error') {
        } else {
          // console.log(value);
        }
        $('.ui.modal').modal('hide');
      })
    });

    $('#orderModal').modal('show');
  });
};
