$(function () {
    $("#timereg_form_part2a").hide();
    $("#timereg_form_part2b").hide();
    $("input[type='radio'][name='githubIssue']").change(function () {
        if ($(this).val() == "yes") {
            $("#timereg_form_part2a").show();
            $("#timereg_form_part2b").hide();
        }
        else if ($(this).val() == "no") {
            $("#timereg_form_part2a").hide();
            $("#timereg_form_part2b").show();
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
    let doc_id = document.getElementById('doc_id').value;
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
        method: 'put',
        url: 'https://us-central1-dillydally-stage.cloudfunctions.net/api/' + doc_id,
        data: workhours,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) => {
            if (res.status === 200) {
                let div = document.createElement('div');
                div.className = "success";
                div.innerHTML = "<strong>Worklog updated!</strong>";
                document.getElementById("success").append(div);
                setTimeout(function () {
                    div.style.display = 'none';
                }, 3000);
            } else {
                let div = document.createElement('div');
                div.className = "error";
                div.innerHTML = "<strong>Ups... Worklog not updated.</strong>";
                document.getElementById("error").append(div);
                setTimeout(function () {
                    div.style.display = 'none';
                }, 3000);
            }
        })
        .catch((error) => {
            if (error) {
                let div = document.createElement('div');
                div.className = "error";
                div.innerHTML = "<strong>Ups... Worklog not added to time registration!</strong>";
                document.getElementById("error").append(div);
                setTimeout(function () {
                    div.style.display = 'none';
                }, 3000);
            }
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