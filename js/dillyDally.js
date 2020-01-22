$(function () {
    $('input:radio').change(function () {
        if ($(this).val() == "yes") {
            $("#relatedToGithubIssue").show();
            $("#notRelatedToGithubIssue").hide();
        }
        else {
            $("#notRelatedToGithubIssue").show();
            $("#relatedToGithubIssue").hide();
        }
    });
});