
$(document).ready(function () {
  loadBoard();
});



function loadBoard() {

  var token = sessionStorage.getItem("user_t");
  var url = new URL(window.location.href);

  var workspace_id = url.searchParams.get("wp");
  var user = sessionStorage.getItem("user");


  var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var isodate = firstDay.toISOString()
var est = [];
var getTitle = new XMLHttpRequest();
  getTitle.open("GET", "https://europe-west1-prohub-6f0e8.cloudfunctions.net/zenhub/workspaces/" + "?email=" + user, true);
  getTitle.onload = function () {
    var data = JSON.parse(this.response);
    data.forEach(workspace => {

      if (workspace.id == workspace_id) {
        workspace.repositories.forEach(repo => {
          est.push(getIssues(repo));
        })
        $(".board-title").replaceWith("<h1>" + workspace.name + "</h1>");
        $(".est").replaceWith("<h1>" + sum(est) + "</h1>");
      }
    })
  };

  getTitle.send();




  var getPipelines = new XMLHttpRequest();
  getPipelines.open("GET", "https://europe-west1-prohub-6f0e8.cloudfunctions.net/zenhub/pipelines/" + workspace_id + "?email=" + user, true);
  getPipelines.onload = function () {
    var data = JSON.parse(this.response);
    if (getPipelines.status >= 200 && getTitle.status < 400) {


      var estimates = [];
      
        data.forEach(workspace => {

          workspace.forEach(pipeline => {
            
            var pipeline_name = pipeline.name.toLowerCase();
            
            if (pipeline_name == "to do" || pipeline_name == "up next") {

              estimates.push(pipeline.estimate)


              

            }
          });

        });

      
      var content = ""
      var summedEstimates = sum(estimates);
      content += makeTile(summedEstimates);
      $(".tiles").replaceWith(content);
      
    }
  };

  getPipelines.send();



}

function makeTile(sum) {
  var element = '<div class="summed-tile"><h2>' + sum + '<h2><h3>story points left</h3><h4>in To Do & Up Next</h4></div>'
  return element;
}

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

function getIssues(repo) {
  var token = sessionStorage.getItem("user_t");
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var isodate = firstDay.toISOString()
  var summedestimatesorallrepos = 0;
 
  var allestimatesonerepo = [];
  
  var getClosedIssues = new XMLHttpRequest();
  getClosedIssues.open("GET", "https://api.github.com/repositories/" + repo + "/issues?state=closed&since=" + isodate , false);
  getClosedIssues.setRequestHeader("Authorization", " token " + token);
  getClosedIssues.onload = function () {
    var data = JSON.parse(this.response);
    data.forEach(issue => {
      allestimatesonerepo.push(getEstimates(issue.number, repo)); 

      
    })
    summedestimatesorallrepos = sum(allestimatesonerepo);
  };
  getClosedIssues.send();

return summedestimatesorallrepos;
  
}



  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

function getEstimates(number, repo) {
  var estimate = 0;
  var getClosedIssuesEstimates = new XMLHttpRequest();
  getClosedIssuesEstimates.open("GET", "https://api.zenhub.io/p1/repositories/" + repo + "/issues/" + number, false);
  getClosedIssuesEstimates.setRequestHeader("X-Authentication-Token", "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7");
  getClosedIssuesEstimates.onload = function () {
    var data = JSON.parse(this.response);
  if (data.estimate) {
      estimate = data.estimate.value;
      

    } 
      

      
    
  };
  getClosedIssuesEstimates.send();

  return estimate;
}


/*

// Check if there is a user logged in

if (sessionStorage.getItem("user") == null) {
  window.location.replace("/");
}

// get the sessioned profile image

document.querySelector(".profile-picture").src = sessionStorage.getItem(
  "user-img"
);

var token = sessionStorage.getItem("user_t");
var repo_name = document.querySelector(".cost-name").innerHTML;

const proxyurl = "";

var zenhub_token =
  "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7";

var userlogin = sessionStorage.getItem("user");
document.querySelector(".profile-name").innerHTML = userlogin;

// Get repo id
var getSRepos = new XMLHttpRequest();
var repo_id;
getSRepos.open(
  "GET",
  proxyurl + "https://api.github.com/repos/prolike/" + repo_name,
  false
);
getSRepos.setRequestHeader("Authorization", " token " + token);
getSRepos.onload = function () {
  var data = JSON.parse(this.response);
  if (getSRepos.status >= 200 && getSRepos.status < 400) {
    repo_id = data.id;
  } else {
  }
};

getSRepos.send();


// Get issues
var getIssues = new XMLHttpRequest();
var all_issues = [];
getIssues.open(
  "GET",
  proxyurl + "https://api.github.com/repos/prolike/" + repo_name + "/issues?sort=created",
  false
);
getIssues.setRequestHeader("Authorization", " token " + token);
getIssues.onload = function () {

  var data = JSON.parse(this.response);

  data.forEach(issue => {
    all_issues.push(issue);


  });


};

getIssues.send();

// Sort status issues and normal issues

var statusIssues = [];
var allNonStatusIssues = [];
var allEpics = [];




all_issues.forEach(issue => {


  if (issue.labels.length == 0) {
    allNonStatusIssues.push(issue)

  }

  issue.labels.forEach(label => {
    var labelName = label.name.toLowerCase();

    if (labelName == "status") {
      statusIssues.push(issue);
    }
    else if (labelName == "epic") {
      allEpics.push(issue);
    }
    else if (labelName == "no board") {


    }

    else {
      allNonStatusIssues.push(issue);
    }
  });
});



// Create status dropdowns

for (var i = 0; i < statusIssues.length; i++) {
  // For every issue marked with status labeled in statuses array

  var card = document.createElement("DIV");
  card.setAttribute("class", "card");

  var card_header = document.createElement("DIV");
  card_header.setAttribute("class", "card-header");
  card_header.setAttribute("id", "heading" + i);

  var button = document.createElement("BUTTON");
  button.setAttribute("class", "status-link");
  button.setAttribute("type", "button");
  button.setAttribute("data-toggle", "collapse");
  button.setAttribute("data-target", "#collapse" + i);
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-controls", "collapse" + i);


  button.innerHTML = statusIssues[i].title;

  card_header.appendChild(button);

  var collapse = document.createElement("DIV");
  collapse.setAttribute("id", "collapse" + i);
  collapse.setAttribute("class", "collapse");

  if (i == 0) {
    collapse.setAttribute("class", "collapse show");
  }

  collapse.setAttribute("aria-labelledby", "heading" + i);
  collapse.setAttribute("data-parent", "#status-messages");

  var card_body = document.createElement("DIV");
  card_body.setAttribute("class", "card-body");

  card_body.innerHTML = statusIssues[i].body.replace(/\n/g, '<br>');

  collapse.appendChild(card_body);

  card.appendChild(card_header);
  card.appendChild(collapse);

  document.querySelector("#status-messages").appendChild(card);
}

var newissueDate;


// spit out newest issue
if (allNonStatusIssues != 0) {
  document.querySelector(".ni-number").innerHTML += allNonStatusIssues[0].number;
  document.querySelector(".ni-title").innerHTML = allNonStatusIssues[0].title;
  newissueDate = allNonStatusIssues[0].created_at;

  document.querySelector(".ni-cont").innerHTML = allNonStatusIssues[0].user.login;
  document.querySelector(".ni-link").href = allNonStatusIssues[0].html_url;

  var dateOptions = { year: "numeric", month: "short", day: "numeric" };

  var newdate = new Date(newissueDate);

  var formatedNewissueDate = newdate.toLocaleDateString("en-GB", +dateOptions);

  document.querySelector(".ni-time").innerHTML = formatedNewissueDate;
}
else {
  document.querySelector(".newIssue").innerHTML = "<div class='col-12'><p>Ingen issues nye åbne issues</p></div>";
}




// get workspaces
var workspaceId;
var repos = [];

var getWorkspaces = new XMLHttpRequest();
getWorkspaces.open(
  "GET",
  proxyurl + "https://api.zenhub.io/p2/repositories/" + repo_id + "/workspaces",
  false
);

getWorkspaces.setRequestHeader("X-Authentication-Token", zenhub_token);

getWorkspaces.onload = function () {
  var data = JSON.parse(this.response);
 workspaceId = data[0].id;
}

getWorkspaces.send();


// get all pipelines

var toDoAndUpNext = [];
var allPipelines = [];

var getPipelines = new XMLHttpRequest();

getPipelines.open(
  "GET",
  proxyurl +
  "https://api.zenhub.io/p2/workspaces/" +
  workspaceId +
  "/repositories/" +
  repo_id +
  "/board",
  false
)
getPipelines.setRequestHeader("X-Authentication-Token", zenhub_token);

getPipelines.onload = function () {
  var data = JSON.parse(this.response);
   data.pipelines.forEach(pipeline => {

    allPipelines.push(pipeline);
  }
    )
}
getPipelines.send();

var allSortedPipelines = [];



allPipelines.forEach(pipeline => {
  var pipelinename = pipeline.name;
var pipelinenametoLower = pipelinename.toLowerCase();
if(pipelinenametoLower == "to do" ||
pipelinenametoLower == "up next" ) {
  toDoAndUpNext.push(pipeline.issues);
  allSortedPipelines.push(pipeline);
}
else if (pipelinenametoLower != "epics" || pipelinenametoLower != "new issues") {
 allSortedPipelines.push(pipeline);
}

})

allSortedPipelines.forEach(pipeline => {
  var issueEstimates = [];
  pipeline.issues.forEach(issue => {
    if (issue.estimate != undefined) {
      issueEstimates.push(issue.estimate.value);
    }
  });

  var summedEstimates = sum(issueEstimates);

  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

  var pipelineItem = document.createElement("DIV");

  var text =
    '<p><span class="issue-number">' +
    pipeline.issues.length +
    '</span> issues in <span class="issue-name">' +
    pipeline.name +
    " - " +
    summedEstimates +
    "</span> Story Points</p>";
  pipelineItem.innerHTML = text;

  pipelineItem.setAttribute("class", "pipeline");
  document.querySelector(".pipeline-box").appendChild(pipelineItem);
})



var issueStorypoints = [];

console.log(toDoAndUpNext)
toDoAndUpNext.forEach( pipeline => {
  pipeline.forEach(issue => {

    if (issue.estimate != undefined) {
      issueStorypoints.push(issue.estimate.value);
    }
  } )

});

var summedStorypoints = sum(issueStorypoints);

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

document.querySelector(
  ".storypoint-number"
).innerHTML += summedStorypoints.toString(); */

/*


// get the workspaces related to the selected repo.

var getWorkspaces = new XMLHttpRequest();
getWorkspaces.open(
  "GET",
  proxyurl + "https://api.zenhub.io/p2/repositories/" + repo_id + "/workspaces",
  false
);
getWorkspaces.setRequestHeader("X-Authentication-Token", zenhub_token);
var workspaceArray = [];
var repoArray = [];

getWorkspaces.onload = function () {
  var data = JSON.parse(this.response);
  if (getWorkspaces.status >= 200 && getWorkspaces.status < 400) {
    data.forEach(workspace => {
      workspaceArray.push(workspace.id);

      workspace.repositories.forEach(repo => {
        repoArray.push(repo);
      });
    });
  } else {
  }
};

getWorkspaces.send();

// Get all issues and pipelines from all workspaces out in a json var

var allIssuesInTodoandUpnext = [];
var allpipelines = [];
var allIssuesInToDo = [];
workspaceArray.forEach(getWorkspace);

function getWorkspace(value) {
  var linktoworkspace =
    "https://app.zenhub.com/workspaces/" +
    repo_name +
    "-" +
    value +
    "/board?repos=" +
    repo_id;
  document.querySelector(".zenhub-link").href = linktoworkspace;

  var getPipeline = new XMLHttpRequest();
  getPipeline.open(
    "GET",
    proxyurl +
    "https://api.zenhub.io/p2/workspaces/" +
    value +
    "/repositories/" +
    repo_id +
    "/board",
    false
  );
  getPipeline.setRequestHeader("X-Authentication-Token", zenhub_token);

  getPipeline.onload = function () {
    var data = JSON.parse(this.response);
    if (getPipeline.status >= 200 && getPipeline.status < 400) {
      data.pipelines.forEach(pipeline => {
        allpipelines.push(pipeline);

        var issueEstimates = [];
        pipeline.issues.forEach(issue => {
          if (issue.estimate != undefined) {
            issueEstimates.push(issue.estimate.value);
          }
        });

        var summedEstimates = sum(issueEstimates);

        function sum(obj) {
          var sum = 0;
          for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
              sum += parseFloat(obj[el]);
            }
          }
          return sum;
        }

        var pipelineItem = document.createElement("DIV");

        var text =
          '<p><span class="issue-number">' +
          pipeline.issues.length +
          '</span> issues in <span class="issue-name">' +
          pipeline.name +
          " - " +
          summedEstimates +
          "</span> Story Points</p>";
        pipelineItem.innerHTML = text;

        pipelineItem.setAttribute("class", "pipeline");
        document.querySelector(".pipeline-box").appendChild(pipelineItem);

        var pipelinename = pipeline.name;
        var pipelinenametoLower = pipelinename.toLowerCase();

        if (
          pipelinenametoLower == "to do" ||
          pipelinenametoLower == "up next"
        ) {
          pipeline.issues.forEach(issue => {
            allIssuesInTodoandUpnext.push(issue);
          });
        }

        if (
          pipelinenametoLower == "to do" ||
          pipelinenametoLower == "up next"
        ) {
          pipeline.issues.forEach(issue => {
            allIssuesInToDo.push(issue);
          });
        }
      });
    } else {
    }
  };

  getPipeline.send();
}

// Get all open issues, sort out the statuses and push them to own array, and the rest to another array

var newestIssues = new XMLHttpRequest();
newestIssues.open(
  "GET",
  proxyurl +
  "https://api.github.com/repos/prolike/" +
  repo_name +
  "/issues?sort=created",
  false
);
newestIssues.setRequestHeader("Authorization", " token " + token);
var allissuesArray = [];

var statuses = [];
newestIssues.onload = function () {
  var data = JSON.parse(this.response);
  if (newestIssues.status >= 200 && newestIssues.status < 400) {
    data.forEach(issue => {
      issue.labels.forEach(label => {
        var labelName = label.name.toLowerCase();
        if (labelName == "status") {
          statuses.push(issue);
        } else {
          allissuesArray.push(issue);
        }
      });
    });
  } else {
  }
};

newestIssues.send();






// Get the contributors

var getContributors = new XMLHttpRequest();
getContributors.open(
  "GET",
  proxyurl +
  "https://api.github.com/repos/prolike/" +
  repo_name +
  "/contributors",
  false
);
getContributors.setRequestHeader("Authorization", " token " + token);

var getMostconstributes = [];

getContributors.onload = function () {
  var data = JSON.parse(this.response);
  if (getContributors.status >= 200 && getContributors.status < 400) {
    data.forEach(contributors => {
      if (contributors.login != userlogin) {
        getMostconstributes.push(contributors);
      }
    });
  } else {
  }
};

getContributors.send();

var cutContrubutors = getMostconstributes.slice(0, 3);

//list contributors

cutContrubutors.forEach(contributor => {
  var contributorbox = document.createElement("DIV");
  var cont_pic = document.createElement("IMG");
  cont_pic.setAttribute("class", "img-fluid");
  var cont_login_box = document.createElement("H3");

  cont_login_box.innerHTML = contributor.login;

  cont_pic.src = contributor.avatar_url;
  cont_pic.setAttribute("alt", contributor.login);

  contributorbox.setAttribute("class", "contributer-box");
  contributorbox.appendChild(cont_pic);
  contributorbox.appendChild(cont_login_box);
  document.querySelector(".contributors").appendChild(contributorbox);
});

//Get all todo and upnext storypoints

var issueStorypoints = [];
allIssuesInTodoandUpnext.forEach(issue => {
  if (issue.estimate != undefined) {
    issueStorypoints.push(issue.estimate.value);
  }
});

var summedStorypoints = sum(issueStorypoints);

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

document.querySelector(
  ".storypoint-number"
).innerHTML += summedStorypoints.toString();

// Get all issues in todo & upnext

if (allIssuesInToDo.length != 0) {
  allIssuesInToDo.forEach(issue => {
    var getIssueName = new XMLHttpRequest();
    getIssueName.open(
      "GET",
      proxyurl +
      "https://api.github.com/repos/prolike/" +
      repo_name +
      "/issues/" +
      issue.issue_number,
      false
    );
    getIssueName.setRequestHeader("Authorization", " token " + token);
    var issueName;
    getIssueName.onload = function () {
      var data = JSON.parse(this.response);
      issueName = data.title;
    };

    getIssueName.send();

    var todo_issue = document.createElement("DIV");
    var todo_text =
      "<p>#" + issue.issue_number + " - " + issueName + "</span></p>";
    todo_issue.innerHTML = todo_text;
    document.querySelector(".todo-list").append(todo_issue);
  });
} else {
  var no_todo_issue = document.createElement("DIV");
  var no_todo_text = "No issues in To Do";
  no_todo_issue.innerHTML = no_todo_text;
  document.querySelector(".todo-list").innerHTML = "No issues in todo";
}

// Place Statuses


 */