"use strict";

// for collection of names, emails, avatar links from api
const nameList = [];
const emailList = [];
const avatarList = [];

const allProfiles = document.querySelector(".all-profiles");
const statusMsg = document.querySelector(".status-msg");
const page1_btn = document.getElementById("page-btn-1");
const page2_btn = document.getElementById("page-btn-2");
const loading = document.querySelector(".loading");

function getResponse(page = "per_page=6") {
  // to empty all arrays
  nameList.length = 0;
  emailList.length = 0;
  avatarList.length = 0;
  allProfiles.innerHTML = "";
  const url = `https://reqres.in/api/users?${page}&` + Math.random(2);
  const req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function () {
    const responseData = req.responseText;
    const jsonResponse = JSON.parse(responseData);
    const resultingData = jsonResponse.data;
    resultingData.forEach(function (element) {
      nameList.push(element.first_name);
      emailList.push(element.email);
      avatarList.push(element.avatar);
    });
    displayProfile();
  };
  req.send();

  // func for handling if it was not able to connect to the network
  req.onreadystatechange = function () {
    if (req.readyState === 1 || req.readyState === 2 || req.readyState === 3) {
      loadingTime();
    } else if (req.readyState === 4) {
      if (req.status === 200) {
        statusMsg.textContent = "Welcome";
        loading.classList.add("hidden");
        page1_btn.classList.remove("hidden");
        page2_btn.classList.remove("hidden");
      } else {
        statusMsg.classList.add("red");
        loading.classList.add("hidden");
        statusMsg.textContent = `Something went wrong, Try again later:(`;
      }
    }
  };
}

function displayProfile() {
  // loops over the nameList array and uses its index to access other list's elements
  nameList.forEach((firstName, i) => {
    const html = `
    <div class="profile">
      <p class="first-name">${firstName}</p>
      <p class="email">${emailList[i]}</p>
      <img
        class="profile-img"
        src="${avatarList[i]}"
        alt=""/>
    </div>`;
    allProfiles.insertAdjacentHTML("beforeend", html);
  });
}
getResponse();

page1_btn.addEventListener("click", function () {
  loadingTime();
  getResponse("page=1");
});
page2_btn.addEventListener("click", function () {
  loadingTime();
  getResponse("page=2");
});

function loadingTime() {
  page1_btn.classList.add("hidden");
  page2_btn.classList.add("hidden");
  loading.classList.remove("hidden");
}
