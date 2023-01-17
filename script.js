"use strict";

const allProfiles = document.querySelector(".all-profiles");
const statusMsg = document.querySelector(".status-msg");
const page1_btn = document.getElementById("page-btn-1");
const page2_btn = document.getElementById("page-btn-2");
const loading = document.querySelector(".loading");

// Template for User (profile data)
class Users {
  constructor(firstName, email, avatar) {
    this.firstName = firstName;
    this.email = email;
    this.avatar = avatar;
  }
}

// func for extracting the data from response as an object
function userData(request) {
  const responseData = request.responseText;
  const jsonResponse = JSON.parse(responseData);
  return jsonResponse.data;
}

function createUserProfle(responseData) {
  responseData.forEach((data) => {
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
  allProfiles.insertAdjacentHTML("beforeend", html);
}

function getResponse() {
  const url = `https://reqres.in/api/users?per_page=12&` + Math.random(2);
  const req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function () {
    const resultingData = userData(req);
    createUserProfle(resultingData);
  };
  req.onreadystatechange = function () {
    if (req.readyState === 1 || req.readyState === 2 || req.readyState === 3) {
      showLoading();
    } else if (req.readyState === 4) {
      if (req.status === 200) {
        statusMsg.textContent = "Welcome";
        loading.classList.add("hidden");
        page1_btn.classList.remove("hidden");
        page2_btn.classList.remove("hidden");
      } else {
        statusMsg.classList.add("red");
        loading.classList.add("hidden");
        statusMsg.textContent = `Something went wrong, Check your internet or try again later :(`;
      }
    }
  };
  req.send();
}

// function displayProfile() {
//   // loops over the nameList array and uses its index to access other list's elements
//   // nameList.forEach((firstName, i) => {
//   //   const html =
//   //   allProfiles.insertAdjacentHTML("beforeend", html);
//   // });
// }
getResponse();

//TODO: btn functionality
function showLoading() {
  page1_btn.classList.add("hidden");
  page2_btn.classList.add("hidden");
  loading.classList.remove("hidden");
}
