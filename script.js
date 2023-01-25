// "use strict";

// const allProfiles = document.querySelector(".all-profiles");
// const statusMsg = document.querySelector(".status-msg");
// const page1_btn = document.getElementById("page-btn-1");
// const page2_btn = document.getElementById("page-btn-2");
// const loading = document.querySelector(".loading");

// Template for User (profile data)
class Users {
  constructor(firstName, email, avatar) {
    this.firstName = firstName;
    this.email = email;
    this.avatar = avatar;
  }
}

// // func for extracting the data from response as an object
// function userData(request) {
//   const responseData = request.responseText;
//   const jsonResponse = JSON.parse(responseData);
//   return jsonResponse.data;
// }

// function emptyPage() {
//   $(".all-profiles").html = "";
// }

// // to check whether the data have recieved or not
// function createUserProfle(responseData) {
//   responseData.forEach((data) => {
//     const user = new Users(data.first_name, data.email, data.avatar);
//     addHtmlContent(user.firstName, user.email, user.avatar);
//   });
// }
// function addHtmlContent(firstName, email, avatar) {
//   const html = `
//      <div class="profile">
//        <p class="first-name">${firstName}</p>
//        <p class="email">${email}</p>
//        <img
//          class="profile-img"
//          src="${avatar}"
//          alt=""/>
//      </div>`;
//   allProfiles.insertAdjacentHTML("beforeend", html);
// }

// // response handler
// function getResponse(page = 1) {
//   const url = `https://reqres.in/api/users?page=${page}&` + Math.random(2);
//   const req = new XMLHttpRequest();
//   req.open("GET", url);
//   req.onload = function () {
//     const resultingData = userData(req);
//     createUserProfle(resultingData);
//   };
//   req.onreadystatechange = () => {
//     statusHandler(req);
//   };
//   req.send();
// }
// getResponse();

// //error handler
// function statusHandler(request) {
//   if (
//     request.readyState === 1 ||
//     request.readyState === 2 ||
//     request.readyState === 3
//   ) {
//     showLoading();
//   } else if (request.readyState === 4) {
//     if (request.status === 200) {
//       statusMsg.textContent = "Welcome";
//       loading.classList.add("hidden");
//       page1_btn.classList.remove("hidden");
//       page2_btn.classList.remove("hidden");
//     } else {
//       statusMsg.classList.add("red");
//       loading.classList.add("hidden");
//       statusMsg.textContent = `Something went wrong, Check your internet or try again later :(`;
//     }
//   }
// }

// //btn functionality
// page1_btn.addEventListener("click", function () {
//   onClickPageBtn(1);
// });
// page2_btn.addEventListener("click", function () {
//   onClickPageBtn(2);
// });

// function onClickPageBtn(pageNum) {
//   emptyPage();
//   showLoading();
//   getResponse(pageNum);
// }

// function showLoading() {
//   page1_btn.classList.add("hidden");
//   page2_btn.classList.add("hidden");
//   loading.classList.remove("hidden");
// }
function getResponse() {
  const url = `xhttps://reqres.in/api/users?page=2&`;
  $.ajax({
    type: "GET",
    dataType: "json",
    timeout: 5000,
    url: url + Math.random(2),
  })
    .done(function (jsonResponse, textStatus, jqXHR) {
      createUserProfle(jsonResponse);
    })
    .fail(function (jqXHR, textStatus, err) {
      isContentError();
    })
    .always(function (jqXHR, textStatus, err) {
      // callback => while the response is completed
      isContentLoaded();
    });
  function isContentLoaded() {
    $(".loading").hide();
  }

  function isContentError() {
    $(".loading").hide();
    if (navigator.onLine) {
      $(".status-msg").html(`No Internet!<br>
        Try: <br>
        Checking the network cables, modem, and router,<br>
      Reconnecting to Wi-Fi,<br>
      Running Windows Network Diagnostics `);
    } else {
      $(".status-msg").html(`No Internet!<br>
    Try: <br>
    Checking the network cables, modem, and router,<br>
  Reconnecting to Wi-Fi,<br>
  Running Windows Network Diagnostics `);
    }
    $(".status-msg").animate({ fontSize: 20 });
    $(".status-msg").css("color", "grey");
    $("#page-btn-1").hide();
    $("#page-btn-2").hide();
  }
  function createUserProfle(response) {
    const responseArr = response.data;
    responseArr.forEach((data) => {
      const user = new Users(data.first_name, data.email, data.avatar);
      addHtmlContent(user.firstName, user.email, user.avatar);
      console.log(user.firstName);
    });
  }
}
getResponse();

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
