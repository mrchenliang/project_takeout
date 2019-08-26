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
      let menuItemTemplateString = `
      <div class='singleMenuItem'>
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
    const title = $(this).children('.menuItemDescription').children('h2')[0].innerHTML;
    const description = $(this).children('.menuItemDescription').children('p')[0].innerHTML;
    const price = $(this).children('.menuItemDescription').children('h3')[0].innerHTML.match(/[\d]+[.][\d]+$/gm);
    const image = $(this).children('.menuItemImage').css("background-image");
    let quantity = 1;

    const modal =
      `<div class="ui modal">
        <div class="header">
          <h1>Add to Order</h1>
        </div>
        <div class="image content">
          <div class="modalImage" style='background-image: ${image}'></div>
        </div>
        <div class="modalTitle">
          <h2>${title}</h2>
        </div>
        <div class="modalDescription">
          ${description}
        </div>
        <div class="modalPrice">
          <h2>$ ${price}</h2>
        </div>
        <form class="ui form" id="addItemForm">
          <table>
            <div class="field">
              <label>Notes (optional):</label>
              <input type="text" name="notes" placeholder="Make it blessed.">
            </div>
            <div class="field">
              <button class="positive ui button" id="addQuantity">Add</button>
              <button class="negative ui button" id="removeQuantity">Remove</button>
              <h2>1 x </h2><input type="text" name="quantity" readonly style="border:none"><h3 id="quantity">${quantity}</h3>
            </div>
            <div class="field">
              <h3 id=totalPrice>Total: $${quantity*price}</h3>
            </div>
            <div class="actions">
              <div class="ui large buttons">
                <button class="ui button active">Keep Browsing</button>
                <div class="or"></div>
                <button class="ui button">Checkout</button>
              </div>
            </div>
          </table>
        </form>
      </div>`;

    $("#rootContainer").append(modal);

    $('#addQuantity').on('click', function() {
      event.preventDefault();
      quantity++;
      $('#quantity')[0].innerHTML = `${quantity}`;
      $('#totalPrice')[0].innerHTML = `Total: $${(quantity*price).toFixed(2)}`;
      let count = $("#quantity")[0].innerHTML;
      $('#addItemForm input[name=quantity]').val(count);
      console.log(count);
      console.log($('#addItemForm input[name=quantity]').val());
    });

    $('#removeQuantity').on('click', function() {
      event.preventDefault();
      if (quantity > 1) {
        quantity--;
        $('#quantity')[0].innerHTML = `${quantity}`;
        $('#totalPrice')[0].innerHTML = `Total: $${(quantity*price).toFixed(2)}`;
      };
    });

    $('.ui.modal').modal('show');
  });
};
