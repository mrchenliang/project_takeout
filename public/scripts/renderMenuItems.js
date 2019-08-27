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

};
