"use strict";

$(document).ready(function () {
  loadworkspaces();
});

function loadworkspaces() {

  var getWorkspaces = new XMLHttpRequest();
  getWorkspaces.open("GET", "https://europe-west1-prohub-6f0e8.cloudfunctions.net/zenhub/workspaces?email=carolineolivia@prolike.io", true);
  getWorkspaces.onload = function () {
    var data = JSON.parse(this.response);
    if (getWorkspaces.status >= 200 && getWorkspaces.status < 400) {
      console.log(data);
        
   
        var content = ""
        data.forEach(element => {
          content += makeTile(element);
        });
        // $(".workspaces").replaceWith("<p>" + JSON.stringify(data) + "</p>");
        $(".workspaces").replaceWith(content);
      
      
    }
  };

  getWorkspaces.send();
}

function makeTile(workspace) {
  var element = '<div class="board-link"><a href="/board?cost=' + workspace.id + '">' + workspace.name + '</a></div>'
  return element;
}


/* if (sessionStorage.getItem("user") == null) {
}

var token = sessionStorage.getItem("user_t");

const proxyurl = "";

var zenhub_token =
  "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7";

var getUser = new XMLHttpRequest();
getUser.open("GET", proxyurl + "https://api.github.com/user", true);
getUser.setRequestHeader("Authorization", " token " + token);
getUser.onload = function() {
  var data = JSON.parse(this.response);
  if (getUser.status >= 200 && getUser.status < 400) {
    sessionStorage.setItem("user-img", data.avatar_url);
    document.querySelector(".username").innerHTML = data.login;
    sessionStorage.setItem("user", data.login);
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

getUser.send();

var getTeams = new XMLHttpRequest();
getTeams.open("GET", proxyurl + "https://api.github.com/user/teams", false);
getTeams.setRequestHeader("Authorization", " token " + token);
var teamArray = [];
getTeams.onload = function() {
  var data = JSON.parse(this.response);
  if (getTeams.status >= 200 && getTeams.status < 400) {
    console.log(data);
    data.forEach(team => {
      teamArray.push(team.name);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

getTeams.send();

console.log(teamArray);

if (teamArray.length == 1) {
  teamArray.forEach(redirectToBoard);

  function redirectToBoard(team_one, index, array) {
    var one_name = team_one.replace(/[^\w\s]/gi, "");
    alert(one_name);
    window.location.replace("/boards/" + one_name + "/");
  }
}

if (teamArray.length == 0) {
  var no_teams_message = document.createElement("h3");
  no_teams_message.innerHTML = "No boards";
  document.querySelector(".button").appendChild(no_teams_message);
} else {
  teamArray.forEach(getAllBoards);

  function getAllBoards(repoName, index, array) {
    var btn2 = document.createElement("BUTTON");
    btn2.innerHTML = repoName;
    var compressedRepoName = repoName.replace(/[^\w\s]/gi, "");
    btn2.setAttribute("onclick", "showBoard('" + compressedRepoName + "')");
    btn2.setAttribute("class", "col-lg-3");

    document.querySelector(".button").appendChild(btn2);
  }
}



function showBoard(repo_name) {
  var name = repo_name.replace(/[^\w\s]/gi, "");

  window.location.replace("/boards/" + name.toLowerCase() + "/");
}

 */