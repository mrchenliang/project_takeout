$(document).ready(function() {

  // INITIAL LOADING OF THE INDEX PAGE
  $.ajax('/restaurants', { method: 'GET' })
    .done(function(value) {
      renderLoadingPage(value);
    });

  // ON CLICK LISTENER AND RENDER RESTAURANTS PAGE
  $('.restaurants-link').on('click', () => {
    $.ajax('/restaurants', { method: 'GET' })
      .done(function(value) {
        renderRestaurantsPage(value);
      });
  });

  $('#login').on('click', () => {
    $('#loginModal').modal('show');
  });

  $('#signup').on('click', () => {
    $('#registerModal').modal('show');
  });

  $("#mainLoginForm").submit(function() {
    event.preventDefault();
    const formArray = $('#mainLoginForm').serializeArray();
    $.ajax('/users/login', { method : 'POST', data : {
      email: formArray[0].value,
      password: formArray[1].value,
    } }).done(function(value) {
      if (value.error == 'Error') {
        $('.loginHeader').text('Login failed. Please check your credentials.');
      } else {
        document.cookie = 'userId=' + value.id;
        $('#loginModal').modal('hide');
        $('#login').css('display', 'none');
        $('#signup').css('display', 'none');
        $('#logout').css('display', 'inline-block');
        $('#order-progress').text("You're logged in as:  " + value.name);
      }
    })
  });

  $('#logout').on('click', () => {
    $('#login').css('display', 'inline-block');
    $('#signup').css('display', 'inline-block');
    $('#logout').css('display', 'none');
    $('#order-progress').text('');
    document.cookie = 'userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  });

  $("#mainRegisterForm").submit(function() {
    event.preventDefault();
    const formArray = $('#mainRegisterForm').serializeArray();
    console.log(formArray);
    $.ajax('/users', { method : 'POST', data : {
      name: formArray[0].value,
      email: formArray[1].value,
      phone: formArray[2].value,
      password: formArray[3].value,
    } });
    $('#login').css('display', 'none');
    $('#signup').css('display', 'none');
    $('#logout').css('display', 'inline-block');
    $('#order-progress').text("You're logged in as:  " + formArray[0].value);
    document.cookie = 'userId=' + value.id;
    $('#registerModal').modal('hide');
  });

  $('.exitL').on('click', () => {
    $('#loginModal').modal('hide');
  });

  $('.exitR').on('click', () => {
    $('#registerModal').modal('hide');
  });



















});
