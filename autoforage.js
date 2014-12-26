
for (int i = 0; i < 30; i++) {
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET","http://flightrising.com/main.php?p=gather&action=dig",true);
  xmlhttp.send();
}
