const renderMenuItems = function(data) {
  $("#rootContainer").empty();

  const generateMenuItems = (menuItems) => {
    const menuItems = ``;
    menuItems.forEach(element => {

    });

  };

  const newTemplateString = `
  <div class='leftSideBar three wide column'>
    <div class='restImage'>
    </div>
    <div class='restInfo'>
    </div>
  </div>
  <div class='menuItems ten wide column'>` + generateMenuItems(data) +
  `</div>
  <div class='rightSideBar three wide column'>
    <div class='menuItemsCategories'>` + generateCategories() +
    `</div>
  </div>
  `;
  $("#rootContainer").append(newTemplateString);
};
