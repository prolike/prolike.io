
function githubIssue() {
    var element = document.getElementById("btn");
        element.parentNode.removeChild(element);

    if (document.getElementById('issue_yes').checked) {

        document.getElementById("response").innerHTML = 
        '<div class="col-12"><h4>Work Duration <span>*</span></h4><p>HH:MM</p><input type="time" name="workDuration" required></div>'

    } else {
        document.getElementById("response").innerHTML = 
        '<div class="col-12"><h4>hi Duration <span>*</span></h4><p>HH:MM</p><input type="time" name="workDuration" required></div>'
    }
}