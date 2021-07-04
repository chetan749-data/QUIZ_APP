console.clear();

$(document).ready(function () {
    var mainBody = $("#mainBody");
    var submitButonClicked = 0;
    var mainBodyHeadingDiv = $("#mainBodyHeadingDiv");
    var mainBodyQuestionsDiv = $("#mainBodyQuestionsDiv");
    var mainBodyMarksObtained = $("#marksObtained");
    mainBodyHeadingDiv.append($("<h1>").html("The Quiz App").attr("id", "mainBodyHeading"));
    $.ajax({
        //$("input[type='radio']:checked").val(); - use this to get the value
        type: "GET",
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",
        data: null,
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                mainBodyQuestionsDiv.append($("<h2>").html("Q" + (i + 1) + "." + response[i].question).attr("id", response[i].id).attr("class", "mainBodyQuestionsDivHeading"));
                for (var j = 0; j < response[i].options.length; j++) {
                    var mainBodyAnswerDiv = $("<div>").attr("id", "answerDivisions" + (((i + 1) * 10) + (j + 1))).addClass("mainBodyAnswerDiv");
                    mainBodyAnswerDiv.append($("<label>").attr("class", "mainBodyAnswerLabel").append($("<input>").attr("id", "answer" + (i + 1) + (j + 1)).attr("type", "radio").attr("name", "Question" + (i + 1)).attr("value", j + 1)).append($("<h4>").html(response[i].options[j])));
                    mainBodyQuestionsDiv.append(mainBodyAnswerDiv);
                }
                mainBodyQuestionsDiv.append($("<div>").attr("class", "divLine"));
            }
            mainBodyQuestionsDiv.append($("<div>").css("margin", "30px 0px").append($("<div>").html("Submit").attr("id", "buttonSubmit")));
            var submitButton = document.getElementById("buttonSubmit");
            submitButton.addEventListener("click", function () {
                if (submitButonClicked == 1) {
                    alert("Already Got the result for your selection");
                }
                else {
                    for (var k = 0; k < response.length; k++) {
                        var tkOnce = 0;
                        for (var m = 0; m < response[k].options.length; m++) {
                            var selectedChecked = $("#answer" + (((k + 1) * 10) + (m + 1)));
                            selectedChecked[0].disabled = true;
                            submitButonClicked = 1;
                            if (selectedChecked[0].checked == true) {
                                selectedChecked[0].disabled = false;
                                if (response[k].answer == selectedChecked[0].value) {
                                    mainBodyMarksObtained[0].innerHTML = parseInt(mainBodyMarksObtained[0].innerHTML) + 1;
                                } else {
                                    $("#answerDivisions" + (((k + 1) * 10) + (m + 1))).append($("<i>").attr("class", "fa").addClass("fa-times").addClass("wrongAnswer"));
                                }
                            } else {
                                if (tkOnce == 0) {
                                    $("#answerDivisions" + (((k + 1) * 10) + response[k].answer)).append($("<i>").attr("class", "fa").addClass("fa-check").addClass("correctAnswer"));
                                    tkOnce = 1;
                                }
                                $("#marksStatus").html("Failed").css("color", "red");
                            }
                        }
                    }
                    if (parseInt(mainBodyMarksObtained[0].innerHTML) > 2) {
                        $("#marksStatus").html("Passed").css("color", "green");
                    } else {
                        $("#marksStatus").html("Failed").css("color", "red");
                    }
                }
            });
        }
    });
});