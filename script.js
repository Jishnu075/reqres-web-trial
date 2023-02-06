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

      if (jsonResponse.data.length === 0) {
        noContentErr();
      } else {
        afterContentLoaded();
      }
      if (textStatus === "success") {
        createUserProfle(jsonResponse);
        $(".page-switchers").empty();
        createPageSwitchers(jsonResponse.total);
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
    });
}
getResponse();
$(".loading").show();

function afterContentLoaded() {
  $(".page-switchers").show();
  $(".status-msg").text("Welcome");
}

function noContentErr() {
  $(".loading").hide();
  $(".status-msg").animate({ fontSize: 24 });
  $(".status-msg").css("color", "grey");
  $(".page-switchers").hide();
  $(".status-msg").html(`
      <div class="go-home">
        <p>Content not available, Click to go back to homepage</p>
        <input
        class="next-prev-btn"
        id="go-home"
        type="button"
        value="/\"
        onclick="refreshPage()"
      />
      </div>`);
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

let currentPage = 1;
function createPageSwitchers(totalItemCount) {
  let pages;
  if (totalItemCount > 6) {
    pages = Math.ceil(totalItemCount / 6);
  } else {
    pages = 1;
  }

  //   pagination logic,
  // 1.if theres 10 pages, show all the buttons until 10
  // 2.show next and previous buttons
  // 3.if theres more than 10 pages, then :
  // pageno starts with 1 ,then ellipsis, then last  buttons

  //func for repeated pagebtn html content
  function returnPageBtnHtmlContent(pageNum) {
    const html = `
    <input
      class="page-switch-btn"
      id="page-btn-${pageNum}"
      type="button"
      value="${pageNum}"
      onclick="commonBtnOnClick(${pageNum})"/>`;
    return html;
  }
  // case 1
  if (pages <= 10) {
    for (i = 1; i <= pages; i++) {
      $(".page-switchers").append(returnPageBtnHtmlContent(i));
    }
  } else {
    $(".page-switchers").append(returnPageBtnHtmlContent(1));
    $(".page-switchers").append(returnPageBtnHtmlContent(2));

    $(".page-switchers").append(`
         <div class="ellipsis">
           &hellip;
         </div>
           `);
    for (i = pages - 3; i <= pages; i++) {
      $(".page-switchers").append(returnPageBtnHtmlContent(i));
    }
  }

  // previous and next btn
  $(".page-switchers").prepend(`
      <input
        class="next-prev-btn"
        id="page-btn-${i * 0}"
        type="button"
        value="<"
        onclick="commonBtnOnClick(currentPage-1)"

      />
   `);
  $(".page-switchers").append(`
      <input
        class="next-prev-btn"
        id="page-btn-${i}"
        type="button"
        value=">"
        onclick="commonBtnOnClick(currentPage+1)"

      />`);
}

//  a common functionality for all buttons
function commonBtnOnClick(value) {
  if (Number.isInteger(value)) {
    currentPage = value;
    $(".all-profiles").html("");
    $(".loading").show();
    getResponse(value);
  }
}

function refreshPage() {
  location.reload();
}
