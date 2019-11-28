"use strict";
var token;
var githubCode = window.location.href;
var urlCode = new URL(githubCode);
var ghCode = urlCode.searchParams.get("code");
const proxyurl = "https://cors-anywhere.herokuapp.com/";

if (ghCode == null) {
  window.location.replace("/");
} else {
  var env = document.querySelector(".env").innerHTML;

  if (env == "prod") {
    var clientID = "e0f6efcea962b1fd7d27";
    var clientSecret = "93c8a991d9fec3d2a66d2b0466db70b728376e0b";
    var siteurl = "https://www.prolike.io";
  }

  if (env == "stage") {
    var clientID = "4ea04d5b07580f9ac8e0";
    var clientSecret = "daf26bafa5ace6dbfff1076cb59f9f573c5d9c32";
    var siteurl = "https://stage.prolike.io";
  }

  if (env == "local") {
    var clientID = "44203f7dbb6402bb922b";
    var clientSecret = "8f820f0af6d38f1a6945bafa6184b3e3d6ede080";
    var siteurl = "http://dockerhost";
  }

  var redirect_url = siteurl + "/login/";

  var data;

  var requestToken = new XMLHttpRequest();
  requestToken.open(
    "POST",
    proxyurl +
      "https://github.com/login/oauth/access_token?client_id=" +
      clientID +
      "&client_secret=" +
      clientSecret +
      "&code=" +
      ghCode +
      "&redirect_uri=" +
      redirect_url,
    false
  );
  requestToken.setRequestHeader("Accept", "application/json");
  var token;
  requestToken.onload = function() {
    var data = JSON.parse(this.response);
    if (requestToken.status >= 200 && requestToken.status < 400) {
      token = data.access_token;
    } else {
      window.location.replace("/");
    }
  };

  requestToken.send();
}

var getOrg = new XMLHttpRequest();
getOrg.open("GET", proxyurl + "https://api.github.com/user/orgs", false);
getOrg.setRequestHeader("Authorization", " token " + token);
getOrg.setRequestHeader("Access-Control-Allow-Headers", "*");
var org_array = [];
getOrg.onload = function() {
  if (getOrg.status == 429) {
    alert("Too many requests!");
  }
  var data = JSON.parse(this.response);

  data.forEach(org => {
    org_array.push(org.login);
  });
};

getOrg.send();

// if (org_array.indexOf("Prolike-io") !== -1) {

if (token == null) {
  window.location.replace("/");
} else {
  sessionStorage.setItem("user_t", token);
  sessionStorage.setItem("user", "user");
  window.location.replace("/boards/");
}
// } else {
//   window.location.replace("/noaccess/");
// }
