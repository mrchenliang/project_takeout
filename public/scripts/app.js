// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });


$(document).ready(function() {

  $.ajax('/restaurants', { method: 'GET' })
    .done(function(value) {
      renderLoadingPage(value);
    });





});
