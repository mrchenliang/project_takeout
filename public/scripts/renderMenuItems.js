const renderMenuItems = function(data) {
  $("#rootContainer").empty();

  const generateCategories = (categories) => {
    const categoryArray = [];
    let categoryTemplateString = '';

    categories.forEach(element => {
      if (!categoryArray.includes(element.category_name)) {
        categoryArray.push(element.category_name);
        categoryTemplateString += `
        <div class='menuItemsCategory' data-category='${element.category_name}'>
        <h1>${element.category_name}</h1>
        </div>
        `;
      }
    });
    $('.menuItems').append(categoryTemplateString);
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
  <div class='ui grid'>
    <div class='leftSideBar four wide column'>
      <div class='restImage' style='background-image: url("${data.restaurant_image_url}")'>
      </div>
      <div class='restInfo'>
      </div>
    </div>
    <div class='menuItems eight wide column'>
    </div>
    <div class='rightSideBar four wide column'>
      <div class='menuItemsCategories'>
      </div>
    </div>
  </div>
  `;
  $("#rootContainer").append(newTemplateString);
  generateCategories(data);
  generateMenuItems(data);

};
