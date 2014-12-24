var answers = [];

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var lines = xmlhttp.responseText.split("\n");
      for (var i = 0; i < lines.length/3; i++) 
      {
        answers.push({question:lines[i*3], answer:lines[i*3+1]});
      }
      alert(answers);
      debugger;
      solveQuestion();
    }
  }
xmlhttp.open("GET","https://gist.githubusercontent.com/cameroncros/4e0fe4c3bc188c603c2a/raw/356a778fe6a6e0346e3050819a66d4ba7a80b5fd/Tomos%20Answers",true);
xmlhttp.send();

function solveQuestion() {

}
