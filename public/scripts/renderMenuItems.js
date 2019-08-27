const renderMenuItems = function(data) {
  $("#rootContainer").empty();

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
      console.log(element);
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
      console.log(selector);
      $('div[data-category="' + selector + '"').append(menuItemTemplateString);
    });

  };

  const newTemplateString = `
  <div>
    <div class='leftSideBar'>
      <div class='restImage' style='background-image: url("${data[0].restaurant_image_url}")'>
      </div>
      <div class='restInfo'>
        <p>${data[0].restaurant_name}</p>
        <p>${data[0].restaurant_phone}</p>
        <p>${data[0].restaurant_website}</p>
        <p>${data[0].restaurant_address}</p>
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
      console.log($(this));

      event.preventDefault();
      const formData = $(this).serialize();
      console.log(formData);

      $.ajax({
        method : 'POST',
        url: $(this).attr('action'),
        data : formData
      }).done(function(value) {
        if (value.error == 'Error') {
          console.log(value);
        } else {
          // console.log(value);
        }
        $('.ui.modal').modal('hide');
      })
    });

    $('#orderModal').modal('show');
  });
};
