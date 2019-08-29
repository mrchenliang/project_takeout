$(document).ready(function() {
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

  $("#client-login").on("click", () => {
    $("#clientLoginModal").modal("show");
  });

  $(".exitCL").on("click", () => {
    $("#clientLoginModal").modal("hide");
  });

  $("#client-login").on("click", () => {
    $("#login").css("display", "inline-block");
    $("#signup").css("display", "inline-block");
    $("#logout").css("display", "none");
    $(".cartPopup").removeClass("showCart");
    $("#order-progress").text("");
    document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    $(".cartTotals").empty();
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
        $("#client-loginlogout").text(value.name);
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
          console.log("clicked");
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
      console.log("clicked");
    });
    $("#registerModal").modal("hide");
  });

  $(".exitL").on("click", () => {
    $("#loginModal").modal("hide");
  });

  $(".exitR").on("click", () => {
    $("#registerModal").modal("hide");
  });
});
