$(function () {
    $("#notRelatedToGithubIssue").hide();
    $("#relatedToGithubIssue").hide();
    $("input[type='radio'][name='issue']").change(function () {
        if ($(this).val() == "yes") {
            $("#relatedToGithubIssue").show();
            $("#notRelatedToGithubIssue").hide();
        }
        else if ($(this).val() == "no") {
            $("#notRelatedToGithubIssue").show();
            $("#relatedToGithubIssue").hide();
        } else {
            $("#notRelatedToGithubIssue").hide();
            $("#relatedToGithubIssue").hide();
        }
    });
});

function validatePart1() {
    let allAreFilled = true;
    document.getElementById("timereg_form_part1").querySelectorAll("[required]").forEach(function (element) {
        if (element.value == "") {
            element.setAttribute("style", "border: 1px solid red;");
        } else {
            element.setAttribute("style", "border: 1px solid #ccc;");
        }

        if (!element.value) allAreFilled = false;
    })
    return allAreFilled;
}
function validatePart2a() {
    validatePart1();
    let allAreFilled = true;
    document.getElementById("timereg_form_part2a").querySelectorAll("[required]").forEach(function (element) {
        if (element.value == "") {
            element.setAttribute("style", "border: 1px solid red;");
        } else {
            element.setAttribute("style", "border: 1px solid #ccc;");
        }

        if (!element.value) allAreFilled = false;

    })
    if (!allAreFilled) return;
}
function validatePart2b() {
    validatePart1();
    let allAreFilled = true;
    document.getElementById("timereg_form_part2b").querySelectorAll("[required]").forEach(function (element) {
        if (element.value == "") {
            element.setAttribute("style", "border: 1px solid red;");
        } else {
            element.setAttribute("style", "border: 1px solid #ccc;");
        }

        if (!element.value) allAreFilled = false;

    })
    if (!allAreFilled) return;
}

/// Required radio button
// if (element.type === "radio") {
//     let radioValueCheck = false;
//     document.getElementById("timereg_form_part2b").querySelectorAll(`[name=${element.name}]`).forEach(function (radio) {
//         if (radio.checked) radioValueCheck = true;
//     })
//     allAreFilled = radioValueCheck;
// }