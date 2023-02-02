// Template for User (profile data)
class Users {
  constructor(firstName, email, avatar) {
    this.firstName = firstName;
    this.email = email;
    this.avatar = avatar;
  }
}

//to show error if internet is unavailable(without jquery)
if (!navigator.onLine) {
  document.querySelector(".status-msg").innerHTML = `No Internet!<br>
  Try: <br>
  Checking the network cables, modem, and router,<br>
  Reconnecting to Wi-Fi,<br>
  Running Windows Network Diagnostics `;
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
    .always(function (resolved, textStatus, err) {
      // callback => while the response is resolved or rejected
      $(".loading").hide();
      // to check if data is available
      // FIXME;
      // resolved.data.length === 0 ? showContentError() : null;
    });
}
getResponse();

// btn-functionalities
// $("#page-btn-1").click(() => {
//   $(".all-profiles").html("");
//   $("#page-btn-1, #page-btn-2").hide();
//   $(".loading").show();
//   getResponse(1);
// });
// $("#page-btn-2").click(() => {
//   $(".all-profiles").html("");
//   $("#page-btn-1, #page-btn-2").hide();
//   $(".loading").show();
//   getResponse(2);
// });

function afterContentLoaded() {
  $(".page-switchers").show();
  $(".status-msg").text("Welcome");
}

// function to handle errors
function showContentError() {
  $(".loading").hide();
  $(".status-msg").animate({ fontSize: 24 });
  $(".status-msg").css("color", "grey");
  $(".page-switchers").hide();
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

function createPageSwitchers(totalItemCount) {
  let pages;
  if (totalItemCount !== 6) {
    pages = Math.ceil(totalItemCount / 6);
  } else {
    pages = 1;
  }
  // console.log(pages);

  // TODO  pagination logic,

  // 1.if theres 10 pages, show all the buttons until 10
  // 2.show next and previous buttons
  // 3.if theres more than 10 pages, then :
  // pageno starts with 1 ,then ellipsis, then last 9 buttons

  // case 1
  if (pages <= 10) {
    for (i = 1; i <= pages; i++) {
      // console.log(i);
      $(".page-switchers").append(`
        <input
          class="page-switch-btn"
          id="page-btn-${i}"
          type="button"
          value="${i}"
          onclick="commonBtnOnClick(${i})"
        />
      `);
    }
  }
}

// FIXME use this function when the api call is "done"
createPageSwitchers(60);

//  a common functionality for all buttons
function commonBtnOnClick(pageNum) {
  $(".all-profiles").html("");
  $(".loading").show();
  getResponse(pageNum);
}
// totalItemCount % 6 === 0 ? totalItemCount / 6 : totalItemCount / 6 + 1;

// logic that was applied before
// create pages according to the page no.
//1. if pages count is greater than 6, add first two buttons(1,2),
//  add ..., last no at the end
// 2. if pages are less than 4, add all 4 buttons

// else {
//   for (i = 1; i <= 2; i++) {
//     $(".page-switchers").append(`
//         <input
//           class="page-switch-btn"
//           id="page-btn-${i}"
//           type="button"
//           value="${i}"
//           onclick="commonBtnOnClick(${i})"
//         />
//       `);
//   }
//   $(".page-switchers").append(`
//     <div class="ellipsis">
//       &hellip;
//     </div>
//       `);
//   for (i = pages - 2; i <= pages; i++) {
//     $(".page-switchers").append(`
//         <input
//           class="page-switch-btn"
//           id="page-btn-${i}"
//           type="button"
//           value="${i}"
//           onclick="commonBtnOnClick(${i})"
//         />
//       `);
//   }
// }
