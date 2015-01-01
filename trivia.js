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
        answers_solver.push({question:lines[i*3].trim(), answer:lines[i*3+1].trim()});
      }
      
      getQuestionsAndOptions();
      solveQuestion();
    }
  }
xmlhttp.open("GET","https://cdn.rawgit.com/cameroncros/tomostrivia/97945bfc9a9bab5ed9499963a5535e28678acfb7/tomosanswers.txt",true);
xmlhttp.send();

function solveQuestion() {
  debugger;
  for (var i = 0; i < answers_solver.length; i++) {
    if (answers_solver[i].question == question_solver) {
      for (var j = 0; j < 4; j++) {
        if (answers_solver[i].answer == options_solver[j]) {
          //alert(j);
          trivia_submitAnswer(j);
          setTimeout(function(){
            window.location = 'main.php?p=tradepost&lot=trivia&cont=1';
          },1000);
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


