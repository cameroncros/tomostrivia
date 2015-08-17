function addOption() {
    var div = document.getElementById("options");


    var span = document.createElement("span");
    div.appendChild(span);

    var type = document.createElement("select");
    type.name = "type";

    var option = document.createElement("option");
    option.value = "hunt";
    option.text = "Hunting";
    type.appendChild(option);
    var option = document.createElement("option");
    option.value = "fish";
    option.text = "Fishing";
    type.appendChild(option);
    var option = document.createElement("option");
    option.value = "catch";
    option.text = "Insect Catching";
    type.appendChild(option);
    var option = document.createElement("option");
    option.value = "forage";
    option.text = "Foraging";
    type.appendChild(option);
    var option = document.createElement("option");
    option.value = "dig";
    option.text = "Digging";
    type.appendChild(option);
    var option = document.createElement("option");
    option.value = "scavenge";
    option.text = "Scavenging";
    type.appendChild(option);
    span.appendChild(type);

    var gather = document.createElement("select");
    gather.name = "gather";

    var option = document.createElement("option");
    option.value = "1";
    option.text = "Earth";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "2";
    option.text = "Plague";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "3";
    option.text = "Wind";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "4";
    option.text = "Water";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "5";
    option.text = "Lightning";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "6";
    option.text = "Ice";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "7";
    option.text = "Shadow";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "8";
    option.text = "Light";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "9";
    option.text = "Arcane";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "10";
    option.text = "Nature";
    gather.appendChild(option);
    var option = document.createElement("option");
    option.value = "11";
    option.text = "Fire";
    gather.appendChild(option);

    span.appendChild(gather);

    var number = document.createElement("input")
    number.type = "number";
    number.name = "number";
    span.appendChild(number);

    var br = document.createElement("br");
    div.appendChild(br);
}

function runTest() {
    var actions = document.getElementsByName("type");
    var regions = document.getElementsByName("gather");
    var numbers = document.getElementsByName("number");
    for (var i = 0; i < actions.length; i++) {
        var action = actions[i].options[actions[i].selectedIndex].value;
        var region = regions[i].options[regions[i].selectedIndex].value;;
        //alert(action+region+numbers[i].value)
        if (numbers[i].value > 0 && numbers[i].value < 100) {
            for (var j = 0; j < numbers[i].value; j++) {
                jQuery.post("/main.php?p=gather&action=" + action, "gather=" + region, null, "html")
            }
        }
    }
    location.reload();
}

var superCont = document.getElementById("super-container");
var divs = superCont.getElementsByTagName("div");
var div = divs[5];
while(div.firstChild){
    div.removeChild(div.firstChild);
}

var options = document.createElement("div");
options.id = "options";
div.appendChild(options);

var add = document.createElement("button");
var t = document.createTextNode("Add");
add.appendChild(t);
add.onclick = addOption;
div.appendChild(add);

var go = document.createElement("button");
var t = document.createTextNode("Go");
go.appendChild(t);
go.onclick = runTest;
div.appendChild(go);

addOption();
