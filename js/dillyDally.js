$(function () {
    $("#notRelatedToGithubIssue").hide();
    $("#relatedToGithubIssue").hide();
    $("input[type='radio'][name='githubIssue']").change(function () {
        if ($(this).val() == "yes") {
            $("#relatedToGithubIssue").show();
            $("#notRelatedToGithubIssue").hide();
        }
        else if ($(this).val() == "no") {
            $("#notRelatedToGithubIssue").show();
            $("#relatedToGithubIssue").hide();
        }
    });
});

function validatePart2a() {
    let form1 = validate("timereg_form_part1");
    let form2 = validate("timereg_form_part2a")

    if (form1 && form2) {
        submitform($("#timereg_form").serializeArray())
    }
}
function validatePart2b() {
    let form1 = validate("timereg_form_part1");
    let form2 = validate("timereg_form_part2b")

    if (form1 && form2) {
        submitform($("#timereg_form").serializeArray())
    }
}

function validate(element) {
    let allAreFilled = true;
    document.getElementById(element).querySelectorAll("[required]").forEach(function (element) {
        if (element.value == "") {
            element.setAttribute("style", "border: 1px solid red;");
        } else {
            element.setAttribute("style", "border: 1px solid #ccc;");
        }

        if (!element.value) allAreFilled = false;

    })
    return allAreFilled;
}

function submitform(data) {
    let result = {};
    $.each(data, function () {
        var type = document.getElementsByName(this.name)[0].type;
        var value = document.getElementsByName(this.name)[0].value;

        if (type === "number") {
            if (value === "") {
                result[this.name] = 0;
            } else {
                result[this.name] = Number(this.value) ? Number(this.value) : this.value;
            }
        } else {
            result[this.name] = this.value
        }
    });

    let workhours = '{"type": "workhours", "fields" : ' + JSON.stringify(result) + ' }';

    axios({
        method: 'post',
        url: 'https://us-central1-dillydally-stage.cloudfunctions.net/api',
        data: workhours,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) => {
            console.log(res.status + " " + res.statusText); // Todo synglig fejlhåndtering i frontend
        })
        .catch((error) => {
            console.log(error.message);
        });
}


/// Required radio button
// if (element.type === "radio") {
//     let radioValueCheck = false;
//     document.getElementById("timereg_form_part2b").querySelectorAll(`[name=${element.name}]`).forEach(function (radio) {
//         if (radio.checked) radioValueCheck = true;
//     })
//     allAreFilled = radioValueCheck;
// }