// Template for User (profile data)
class Users {
  constructor(firstName, email, avatar) {
    this.firstName = firstName;
    this.email = email;
    this.avatar = avatar;
  }
}
//api call to get json Response
function getResponse(page = 1) {
  const url = `https://reqres.in/api/users?page=${page}&`;
  $.ajax({
    type: "GET",
    dataType: "json",
    timeout: 5000,
    url: url + Math.random(2),
  })
    .done(function (jsonResponse, textStatus, jqXHR) {
      console.log(jsonResponse);
      if (textStatus === "success") {
        createUserProfle(jsonResponse);
        afterContentLoaded();
      } else {
        showContentError();
      }
    })
    .fail(function (jqXHR, textStatus, err) {
      console.log(err);
      showContentError();
    })
    .always(function (jqXHR, textStatus, err) {
      // callback => while the response is resolved or rejected
      $(".loading").hide();
    });
}
getResponse();
// btn-functionalities
$("#page-btn-1").click(() => {
  $(".all-profiles").html("");
  $("#page-btn-1, #page-btn-2").hide();
  $(".loading").show();
  getResponse(1);
});
$("#page-btn-2").click(() => {
  $(".all-profiles").html("");
  $("#page-btn-1, #page-btn-2").hide();
  $(".loading").show();
  getResponse(2);
});

function afterContentLoaded() {
  $("#page-btn-1, #page-btn-2").show();
  $(".status-msg").text("Welcome");
}

// function to handle errors
function showContentError() {
  $(".loading").hide();
  $(".status-msg").animate({ fontSize: 24 });
  $(".status-msg").css("color", "grey");
  $("#page-btn-1").hide();
  $("#page-btn-2").hide();
  // to check internet connectivity
  if (navigator.onLine) {
    $(".status-msg").html(`Something went wrong, try again later...`);
  } else {
    $(".status-msg").html(`No Internet!<br>
    Try: <br>
    Checking the network cables, modem, and router,<br>
    Reconnecting to Wi-Fi,<br>
    Running Windows Network Diagnostics `);
  }
}
function createUserProfle(response) {
  const responseArr = response.data;
  responseArr.forEach((data) => {
    const user = new Users(data.first_name, data.email, data.avatar);
    addHtmlContent(user.firstName, user.email, user.avatar);
    console.log(user.firstName);
  });
}

function addHtmlContent(firstName, email, avatar) {
  const html = `
     <div class="profile">
       <p class="first-name">${firstName}</p>
       <p class="email">${email}</p>
       <img
         class="profile-img"
         src="${avatar}"
         alt=""/>
     </div>`;
  $(".all-profiles").append(html);
}
