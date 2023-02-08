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

let currentPage = 1;
let pages;

//api call to get json Response
function getResponse(page = 1) {
  $(".all-profiles").empty();
  const url = `https://reqres.in/api/users?page=${page}&`;
  $.ajax({
    type: "GET",
    dataType: "json",
    timeout: 5000,
    url: url + Math.random(2),
  })
    .done(function (jsonResponse, textStatus, jqXHR) {
      console.log(jsonResponse);

      // if (jsonResponse.data.length === 0) {
      //   noContentErr();
      // } else {
      //   afterContentLoaded();
      // }
      //FIXME
      afterContentLoaded();

      if (textStatus === "success") {
        createUserProfle(jsonResponse);
        // $(".page-switchers").empty();
        //FIXME change count later as jsonResponse.total
        countPages(jsonResponse.total);
        if (page === "start") {
          paginate(pages, "start");
        }
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
getResponse("start");
$(".loading").show();
isFirstPage();
isLastpage();

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
        <p>Content not available, Click to go back to Home</p>
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
  // $(".page-switchers").hide();
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

//  a common functionality for all buttons
function commonBtnOnClick(value) {
  $(".pagination").empty();
  $(".all-profiles").empty();
  $(".loading").show();
  // console.log(currentPage);
  if (Number.isInteger(value)) {
    currentPage = value;
    console.log(currentPage);
  } else if (value === "previous") {
    console.log("prev");
    if (currentPage > 1) currentPage--;
    console.log(currentPage);
  } else if (value === "next") {
    if (currentPage < pages) currentPage++;
    console.log(currentPage);
  }
  getResponse(currentPage);
  paginate(currentPage);
  isLastpage();
  isFirstPage();
}

function isFirstPage() {
  if (currentPage === 1) {
    $("#previous-page-btn").hide();
  } else {
    $("#previous-page-btn").show();
  }
}
function isLastpage() {
  if (currentPage === pages) {
    $("#next-page-btn").hide();
  } else {
    $("#next-page-btn").show();
  }
}

function refreshPage() {
  location.reload();
}

function countPages(totalItemCount) {
  if (totalItemCount > 6) {
    pages = Math.ceil(totalItemCount / 6);
  } else {
    pages = 1;
  }
}

function paginate(selectedValue, start) {
  $(".pagination").empty();
  // TODO check pageno not equal to zero
  if (pages <= 5) {
    for (i = 1; i < pages + 1; i++) {
      // console.log(i, "one");
      $(`.pagination`).append(returnPageBtnHtmlContent(i));
    }
  } else {
    // console.log(1);
    if (start === "start") {
      if (selectedValue !== 1) {
        $(`.pagination`).append(returnPageBtnHtmlContent(1));
        if (selectedValue !== 2) {
          $(`.pagination`).append(returnPageBtnHtmlContent(2));
          $(`.pagination`).append(ellipsis());
        }
      }
    } else {
      if (selectedValue !== 1) {
        $(`.pagination`).append(returnPageBtnHtmlContent(1));
        if (selectedValue !== 2) {
          $(`.pagination`).append(ellipsis());
        }
      }
    }

    if (selectedValue <= pages - 3) {
      for (
        i = selectedValue > 3 ? selectedValue - 1 : selectedValue;
        i < selectedValue + 3;
        i++
      ) {
        console.log(i, "k");
        $(`.pagination`).append(returnPageBtnHtmlContent(i));
      }

      $(`.pagination`).append(ellipsis());

      // console.log(pageNo);
      $(`.pagination`).append(returnPageBtnHtmlContent(pages));
    } else {
      for (i = pages - 3; i < pages; i++) {
        // console.log(i, "f");
        $(`.pagination`).append(returnPageBtnHtmlContent(i));
      }
      // console.log(pageNo);
      $(`.pagination`).append(returnPageBtnHtmlContent(pages));
    }
  }
}

// FIXME replace these later
// countPages(14);
// paginate(6);

// 1,2,3,4,..6
// 1,4,5,6,...8
// 1,5,6,7,8

function ellipsis() {
  const ellipsisHtmlContent = `
        <div class="ellipsis">
        &hellip;
        </div>`;
  return ellipsisHtmlContent;
}

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
