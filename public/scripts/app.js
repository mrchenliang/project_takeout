// Initialize and add the map
function initMap() {
  // The location of lighthouse labs
  var lhl = {lat: 43.644, lng: -79.402};

  //Define the style for the map (without POIs)
  var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
  ];

  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), {
        zoom: 16,
        center: lhl,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: myStyles
  });

  let geocoder = new google.maps.Geocoder();
  let infowindow = null;

  if (geocoder) {
    $.ajax('/restaurants', { method: 'GET' })
    .done(function(result) {
      for (restaurant of result){
        let name = restaurant.name;
        let address = restaurant.address;

        geocoder.geocode( { 'address': restaurant.address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              infowindow = new google.maps.InfoWindow({
                content: address,
                size: new google.maps.Size(150,50)
              });

              var marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  label: {
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    text: name
                  }
              });

              google.maps.event.addListener(marker, 'click', function() {
                if (infowindow) {
                  infowindow.close();
                }
                infowindow.open(map,marker);
              });
            }
          }
        });
      }
    });
  }
}

$(document).ready(function() {

  if (sessionStorage.getItem('restId')) {
    $("#client-login").css("display", "none");
    $("#client-logout").css("display", "inline-block");
    $("#client-loginlogout").text(sessionStorage.getItem('restName'));
    $.ajax(`/clients/${sessionStorage.getItem("restId")}/orders`, {
      method: "GET"
    }).done(function(value) {
      renderClientsOrdersPage(value);
    });
  };

  // INITIAL LANDING OF THE INDEX PAGE
  $.ajax("/restaurants", { method: "GET" }).done(function(value) {
    renderLandingPage(value);
  });

  // ON CLICK LISTENER AND RENDER RESTAURANTS PAGE
  $(".restaurants-link").on("click", () => {
    $.ajax("/restaurants", { method: "GET" }).done(function(value) {
      renderRestaurantsPage(value);
    });
  });

  // ON CLICK LISTENER AND RENDER RESTAURANTS PAGE
  $("#logo").on("click", () => {
    renderLandingPage("data");
  });

  // INITAL LANDING PAGE FOR CLIENTS
  $.ajax("/clients", { method: "GET" }).done(function(value) {
    renderClientsLandingPage(value);
  });

  // ON CLICK LISTENER AND RENDER ORDERS PAGE
  $(".orders-list").on("click", () => {
    if (sessionStorage.getItem("restId")!=null) {
      $.ajax(`/clients/${sessionStorage.getItem("restId")}/orders`, {
        method: "GET"
      }).done(function(value) {
        renderClientsOrdersPage(value);
      });
    }
  });

  // ON CLICK LISTENER AND RENDER ORDERS HISTORY PAGE
  $(".orders-history").on("click", () => {
    if (sessionStorage.getItem("restId")!=null) {
      $.ajax(`/clients/${sessionStorage.getItem("restId")}/history`, {
        method: "GET"
      }).done(function(value) {
        renderClientsHistoryPage(value);
      });
    }
  });

  // ON CLICK LISTENER AND RENDER HOME PAGE
  $(".home-page").on("click", () => {
    $.ajax("/clients", { method: "GET" }).done(function(value) {
      renderClientsLandingPage(value);
    });
  });

  $(".exitCL").on("click", () => {
    $("#clientLoginModal").modal("hide");
  });

  $("#client-login").on("click", () => {
    $("#clientLoginModal").modal("show");
    $("#client-login").css("display", "inline-block");
    $("#client-logout").css("display", "none");
    $("#client-loginlogout").text(sessionStorage.getItem('restName'));
    sessionStorage.setItem("restId", value.id);
    sessionStorage.setItem("restName", value.name);
  });

  $("#clientLoginForm").submit(function() {
    event.preventDefault();
    const formArray = $("#clientLoginForm").serializeArray();
    $.ajax("/clients/login", {
      method: "POST",
      data: {
        clientId: formArray[0].value,
        clientPassword: formArray[1].value
      }
    }).done(function(value) {
      if (value.error == "Error") {
        $(".loginHeader").text("Login failed. Please check your credentials.");
      } else {
        sessionStorage.setItem("restId", value.id);
        sessionStorage.setItem("restName", value.name);
        $("#clientLoginModal").modal("hide");
        $("#client-login").css("display", "none");
        $("#client-logout").css("display", "inline-block");
        $("#client-loginlogout").text(sessionStorage.getItem('restName'));
        $.ajax(`/clients/${sessionStorage.getItem("restId")}/orders`, {
          method: "GET"
        }).done(function(value) {
          renderClientsOrdersPage(value);
        });
      }
    });
  });

  $("#client-logout").on("click", () => {
    $("#client-login").css("display", "inline-block");
    $("#client-logout").css("display", "none");
    $("#client-loginlogout").text("");
    sessionStorage.removeItem("restId");
    sessionStorage.removeItem("restName");
    $.ajax("/clients", { method: "GET" }).done(function(value) {
      renderClientsLandingPage(value);
    });
  });

  $("#login").on("click", () => {
    $("#loginModal").modal("show");
  });

  $("#signup").on("click", () => {
    $("#registerModal").modal("show");
  });

  $("#mainLoginForm").submit(function() {
    event.preventDefault();
    const formArray = $("#mainLoginForm").serializeArray();
    $.ajax("/users/login", {
      method: "POST",
      data: {
        email: formArray[0].value,
        password: formArray[1].value
      }
    }).done(function(value) {
      if (value.error == "Error") {
        $(".loginHeader").text("Login failed. Please check your credentials.");
      } else {
        console.log(value);
        document.cookie = "userId=" + value.id;
        document.cookie = "userName=" + value.name;
        $("#loginModal").modal("hide");
        $("#login").css("display", "none");
        $("#signup").css("display", "none");
        $("#logout").css("display", "inline-block");
        $("#order-progress").text(
          "You're logged in as:  " + value.name + ". Click to view your orders."
        );
        $("#order-progress").on("click", () => {
          generateAllOrders();
          $('#orderHistoryModal')
            .modal('show');
        });
      }
    });
  });

  $("#logout").on("click", () => {
    $("#login").css("display", "inline-block");
    $("#signup").css("display", "inline-block");
    $("#logout").css("display", "none");
    $(".cartPopup").removeClass("showCart");
    $("#order-progress").text("");
    document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    $(".cartTotals").empty();
  });

  $("#mainRegisterForm").submit(function() {
    event.preventDefault();
    const formArray = $("#mainRegisterForm").serializeArray();
    console.log(formArray);
    $.ajax("/users", {
      method: "POST",
      data: {
        name: formArray[0].value,
        email: formArray[1].value,
        phone: formArray[2].value,
        password: formArray[3].value
      }
    }).done(value => {
      document.cookie = "userId=" + value.id;
      document.cookie = "userName=" + value.name;
    });
    $("#login").css("display", "none");
    $("#signup").css("display", "none");
    $("#logout").css("display", "inline-block");
    $("#order-progress").text(
      "You're logged in as:  " +
        formArray[0].value +
        ". Click to view your orders."
    );
    $("#order-progress").on("click", () => {
      generateAllOrders();
      $('#orderHistoryModal')
        .modal('show');
      ;
    });
    $("#registerModal").modal("hide");
  });

  $(".exitL").on("click", () => {
    $("#loginModal").modal("hide");
  });

  $(".exitR").on("click", () => {
    $("#registerModal").modal("hide");
  });

  $('#orderHistoryExit1').click(function() {
    drawChart();
  });

});
