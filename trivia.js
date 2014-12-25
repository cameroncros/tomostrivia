var answers_solver = [];

var question_solver = "";
var options_solver = [];

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var lines = xmlhttp.responseText.split("\n");
      for (var i = 0; i < lines.length/3; i++) 
      {
        answers_solver.push({question:lines[i*3], answer:lines[i*3+1]});
      }
      getQuestionsAndOptions();
      solveQuestion();
    }
  }
xmlhttp.open("GET","https://gist.githubusercontent.com/cameroncros/4e0fe4c3bc188c603c2a/raw/356a778fe6a6e0346e3050819a66d4ba7a80b5fd/Tomos%20Answers",true);
xmlhttp.send();

function solveQuestion() {
  for (var i = 0; i < answers_solver.length; i++) {
    if (answers_solver[i].question == question_solver) {
      for (var j = 0; j < 4; j++) {
        if (answers_solver[i].answer == options_solver[j]) {
          alert(j);
          trivia_submitAnswer(j);
          return;
        }
      }
    }
  }
  alert("Failed to find answer, prehaps its not in the correct format, or missing entirely from the data set, please report with a screenshot of the question")
}

function getQuestionsAndOptions() {
  question_solver = document.getElementById("tomo_question").innerHTML.trim();
  options_solver.push(document.getElementById("answer0").innerHTML.trim());
  options_solver.push(document.getElementById("answer1").innerHTML.trim());
  options_solver.push(document.getElementById("answer2").innerHTML.trim());
  options_solver.push(document.getElementById("answer3").innerHTML.trim());
}


