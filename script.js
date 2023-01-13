"use strict";

// ############
// for collection of names, emails, avatar links from api
const nameList = [];
const emailList = [];
const avatarList = [];
const allProfiles = document.querySelector(".all-profiles");
const errMsg = document.querySelector(".err-msg");
function getResponse() {
  const url = "https://reqres.in/api/users?per_page=12&" + Math.random(2);
  const req = new XMLHttpRequest();
  req.open("GET", url);
  req.send();
  req.onload = function () {
    const responseData = req.responseText;
    const jsonResponse = JSON.parse(responseData);
    // console.log(jsonResponse.data);
    const resultingData = jsonResponse.data;
    resultingData.forEach(function (element) {
      //console.log(nameList);
      nameList.push(element.first_name);
      emailList.push(element.email);
      avatarList.push(element.avatar);
    });
    displayProfile();
  };

  // func for handling if it was not able to connect to the network
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        errMsg.textContent = "Welcome";
      } else {
        errMsg.classList.add("red");
        errMsg.textContent = `Something went wrong, Try again later:(`;
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

// IGNORE COMMENTS BELOW
//displayProfile();
// async function getResponseData() {
//   const fetchData = await fetch(url);
//   const jsonResponse = await fetchData.json().then((a) => {
//     responseData.push(a.data[0].first_name);
//   });
//   return jsonResponse;
// }

// trial

// console.log(responseData);s
// function getValue(url) {
//   const fetchData = fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((response) => {
//       return response;
//     });
//   console.log(fetchData);
// }
// getValue(url);

//   .then((e) => {})
//   .catch((err) => {
//     console.log(err);
//   });

// displayProfile();
//console.log(nameList);
// console.log("ddasd");
// return { name: nameList, email: emailList, avatar: avatarList };

// Used async await for Asynchronous functionality for fetching data
// async function getResponseData() {
//   const url = "https://reqres.in/api/users?per_page=12";
//   const fetchData = await fetch(url);
//   const jsonResponse = await fetchData.json();
//   return jsonResponse;
// }
// console.log(getResponseData());
// getResponseData();
