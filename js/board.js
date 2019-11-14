'use strict';

// Check if there is a user logged in

if (sessionStorage.getItem("user") == null) {
    window.location.replace("/");
}

// get the sessioned profile image

document.querySelector(".profile-picture").src = sessionStorage.getItem('user-img');



var token = sessionStorage.getItem("user_t");
var repo_name = document.querySelector(".cost-name").innerHTML;

const proxyurl = "https://cors-anywhere.herokuapp.com/";

var zenhub_token = "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7";

var userlogin = sessionStorage.getItem("user");
document.querySelector(".profile-name").innerHTML = userlogin;


// Get repo id
var getSRepos = new XMLHttpRequest()
var repo_id;
getSRepos.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name, false)
getSRepos.setRequestHeader("Authorization", " token " + token)
getSRepos.setRequestHeader('Access-Control-Allow-Headers', '*')
getSRepos.onload = function () {
    var data = JSON.parse(this.response)
    if (getSRepos.status >= 200 && getSRepos.status < 400) {

        repo_id = data.id;
    }



    else {


    }
}

getSRepos.send()

// get the workspaces related to the selected repo.

var getWorkspaces = new XMLHttpRequest()
getWorkspaces.open('GET', proxyurl + 'https://api.zenhub.io/p2/repositories/' + repo_id + '/workspaces', false)
getWorkspaces.setRequestHeader("X-Authentication-Token", zenhub_token)
getWorkspaces.setRequestHeader('Access-Control-Allow-Headers', '*')
var workspaceArray = [];
var repoArray = [];

getWorkspaces.onload = function () {
    var data = JSON.parse(this.response)
    if (getWorkspaces.status >= 200 && getWorkspaces.status < 400) {
        data.forEach(workspace => {

            workspaceArray.push(workspace.id);

            workspace.repositories.forEach(repo => {
                repoArray.push(repo)
            })

        })
    }
    else {
    }
}

getWorkspaces.send()

// Get all issues and pipelines from all workspaces out in a json var

var allIssuesInTodoandUpnext = [];
var allpipelines = [];
var allIssuesInToDo = []
workspaceArray.forEach(getWorkspace);

function getWorkspace(value) {

    var linktoworkspace = "https://app.zenhub.com/workspaces/" + repo_name + "-" + value + "/board?repos=" + repo_id;
    document.querySelector(".zenhub-link").href = linktoworkspace;

    var getPipeline = new XMLHttpRequest()
    getPipeline.open('GET', proxyurl + 'https://api.zenhub.io/p2/workspaces/' + value + '/repositories/' + repo_id + '/board', false)
    getPipeline.setRequestHeader("X-Authentication-Token", zenhub_token)
    getPipeline.setRequestHeader('Access-Control-Allow-Headers', '*')

    getPipeline.onload = function () {
        var data = JSON.parse(this.response)
        if (getPipeline.status >= 200 && getPipeline.status < 400) {
            data.pipelines.forEach(pipeline => {
                allpipelines.push(pipeline);

                var issueEstimates = [];
                pipeline.issues.forEach(issue => {
                    if (issue.estimate != undefined) {
                        issueEstimates.push(issue.estimate.value);
                    }

                })

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



                var text = '<p><span class="issue-number">' + pipeline.issues.length + '</span> issues in <span class="issue-name">' + pipeline.name + ' - ' + summedEstimates + '</span> Story Points</p>';
                pipelineItem.innerHTML = text;

                pipelineItem.setAttribute('class', "pipeline")
                document.querySelector(".pipeline-box").appendChild(pipelineItem);

                var pipelinename = pipeline.name;
                var pipelinenametoLower = pipelinename.toLowerCase();


                if (pipelinenametoLower == "to do" || pipelinenametoLower == "up next") {
                    pipeline.issues.forEach(issue => {
                        allIssuesInTodoandUpnext.push(issue);
                    })
                }

                if (pipelinenametoLower == "to do" || pipelinenametoLower == "up next") {
                    pipeline.issues.forEach(issue => {
                        allIssuesInToDo.push(issue);
                    })
                }


            })
        }

        else {
        }
    }

    getPipeline.send()
}






// Get all open issues, sort out the statuses and push them to own array, and the rest to another array

var newestIssues = new XMLHttpRequest()
newestIssues.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name + '/issues?sort=created', false)
newestIssues.setRequestHeader("Authorization", " token " + token)
newestIssues.setRequestHeader('Access-Control-Allow-Headers', '*')
var allissuesArray = [];
var newissueDate;
var statuses = [];
newestIssues.onload = function () {
    var data = JSON.parse(this.response)
    if (newestIssues.status >= 200 && newestIssues.status < 400) {

        data.forEach(issue => {


            issue.labels.forEach(label => {
                var labelName = label.name.toLowerCase()
                if (labelName == "status") {
                    statuses.push(issue);
                }
                else {
                    allissuesArray.push(issue)
                }
            })

        })




    }
    else {
    }
}

newestIssues.send()

document.querySelector(".ni-number").innerHTML += allissuesArray[0].number;
document.querySelector(".ni-title").innerHTML = allissuesArray[0].title;
newissueDate = allissuesArray[0].created_at;


document.querySelector(".ni-cont").innerHTML = allissuesArray[0].user.login;
document.querySelector(".ni-link").href = allissuesArray[0].html_url;

console.log(statuses)

var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

var newdate = new Date(newissueDate);

var formatedNewissueDate = newdate.toLocaleDateString("en-GB", + dateOptions);

document.querySelector(".ni-time").innerHTML = formatedNewissueDate;


// get newest 'closed' issue

var newestClosedIssue = new XMLHttpRequest()
newestClosedIssue.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name + '/issues?state=closed&sort=updated', false)
newestClosedIssue.setRequestHeader("Authorization", " token " + token)
newestClosedIssue.setRequestHeader('Access-Control-Allow-Headers', '*')

var newestClosedIssueDate;
var allclosedIssues = [];
newestClosedIssue.onload = function () {
    var data = JSON.parse(this.response)
    if (newestClosedIssue.status >= 200 && newestClosedIssue.status < 400) {

        data.forEach(issue => {


            issue.labels.forEach(label => {
                var labelName = label.name.toLowerCase()
                if (labelName != "status") {
                    allclosedIssues.push(issue)
                }

            })

        })


    }
    else {
    }
}

newestClosedIssue.send()

document.querySelector(".ci-number").innerHTML += allclosedIssues[0].number;
document.querySelector(".ci-title").innerHTML = allclosedIssues[0].title;
newestClosedIssueDate = allclosedIssues[0].created_at;


document.querySelector(".ci-cont").innerHTML = allclosedIssues[0].user.login;
document.querySelector(".ci-link").href = allclosedIssues[0].html_url;

var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

var old_date = new Date(newestClosedIssueDate);

var formatedNewissueDate = old_date.toLocaleDateString("en-GB", + dateOptions);

document.querySelector(".ci-time").innerHTML = formatedNewissueDate;


// Get the contributors

var getContributors = new XMLHttpRequest()
getContributors.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name + '/contributors', false)
getContributors.setRequestHeader("Authorization", " token " + token)
getContributors.setRequestHeader('Access-Control-Allow-Headers', '*')

var getMostconstributes = [];

getContributors.onload = function () {
    var data = JSON.parse(this.response)
    if (getContributors.status >= 200 && getContributors.status < 400) {
        data.forEach(contributors => {
            if (contributors.login != userlogin) {
                getMostconstributes.push(contributors)
            }
        }

        )
    }
    else {
    }
}

getContributors.send()

var cutContrubutors = getMostconstributes.slice(0, 3);


//list contributors


cutContrubutors.forEach(contributor => {
    var contributorbox = document.createElement("DIV")
    var cont_pic = document.createElement("IMG");
    cont_pic.setAttribute("class", "img-fluid")
    var cont_login_box = document.createElement("H3");

    cont_login_box.innerHTML = contributor.login;

    cont_pic.src = contributor.avatar_url;
    cont_pic.setAttribute("alt", contributor.login)



    contributorbox.setAttribute("class", "contributer-box");
    contributorbox.appendChild(cont_pic);
    contributorbox.appendChild(cont_login_box);
    document.querySelector(".contributors").appendChild(contributorbox);



})

//Get all todo and upnext storypoints

var issueStorypoints = [];
allIssuesInTodoandUpnext.forEach(issue => {
    if (issue.estimate != undefined) {
        issueStorypoints.push(issue.estimate.value);
    }

})

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



document.querySelector(".storypoint-number").innerHTML += summedStorypoints.toString();

// Get all issues in todo & upnext

if (allIssuesInToDo.length != 0) {


    allIssuesInToDo.forEach(issue => {

        var getIssueName = new XMLHttpRequest;
        getIssueName.open("GET", proxyurl + "https://api.github.com/repos/prolike/" + repo_name + "/issues/" + issue.issue_number, false)
        getIssueName.setRequestHeader("Authorization", " token " + token)
        getIssueName.setRequestHeader('Access-Control-Allow-Headers', '*')
        var issueName;
        getIssueName.onload = function () {
            var data = JSON.parse(this.response)
            issueName = data.title;
        }

        getIssueName.send()


        var todo_issue = document.createElement("DIV");
        var todo_text = "<p>#" + issue.issue_number + " - " + issueName + "</span></p>";
        todo_issue.innerHTML = todo_text;
        document.querySelector(".todo-list").append(todo_issue);
    })
}

else {
    var no_todo_issue = document.createElement("DIV");
    var no_todo_text = "No issues in To Do"
    no_todo_issue.innerHTML = no_todo_text;
    document.querySelector(".todo-list").innerHTML = "No issues in todo"
}

// Place Statuses

for (var i = 0; i < statuses.length; i++) { // For every issue marked with status labeled in statuses array

    var card = document.createElement("DIV");
    card.setAttribute("class", "card");

    var card_header = document.createElement("DIV");
    card_header.setAttribute("class", "card-header");
    card_header.setAttribute("id", "heading" + i);

    var button = document.createElement("BUTTON");
    button.setAttribute("class", "status-link")
    button.setAttribute("type", "button")
    button.setAttribute("data-toggle", "collapse")
    button.setAttribute("data-target", "#collapse" + i)
    button.setAttribute("aria-expanded", "true")
    button.setAttribute("aria-controls", "collapse" + i)

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


    var issue_date = new Date(statuses[i].created_at)
    var date = issue_date.getDate();
    var month = monthNames[issue_date.getMonth()];
    var year = issue_date.getFullYear();

    var formatedIssueDate = date + ". " + month + " " + year;

    button.innerHTML = formatedIssueDate + " - " + statuses[i].title;

    card_header.appendChild(button);

    var collapse = document.createElement("DIV");
    collapse.setAttribute("id", "collapse" + i);
    collapse.setAttribute("class", "collapse")

    if (i == 0) {
        collapse.setAttribute("class", "collapse show")
    }

    collapse.setAttribute("aria-labelledby", "heading" + i)
    collapse.setAttribute("data-parent", "#status-messages")


    var card_body = document.createElement("DIV")
    card_body.setAttribute("class", "card-body");
    card_body.innerHTML = statuses[i].body;


    collapse.appendChild(card_body)

    card.appendChild(card_header);
    card.appendChild(collapse);

    document.querySelector("#status-messages").appendChild(card);



}