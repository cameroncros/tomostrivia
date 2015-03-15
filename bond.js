// Bash script to help get all the possible familiars
//for i in {1..34}; do wget http://flightrising.com/main.php?p=bestiary\&tab=familiars\&page=$i ; done
//more main.php\?p\=bestiary\&tab\=familiars\&page\=* | grep "/images/cms/familiar/art/"

var familiars = [];

var links = document.getElementsByClassName("clue");
for (var i = 0; i < links.length; i++) {
	var id = links[i].rel.match(/(\d+)/)[0];
	familiars.push(id);
}
var dragonID = window.location.href.split("did=")[1];

function detachFamiliar()
{
	attachFamiliar('0');
}

function attachFamiliar(familiarID)
{
	$(document).trigger('hideCluetip');

	$.ajax({
		data: {id: dragonID, itm: familiarID},
		url: "includes/familiar_active.php",
		async:false
	}).done(function(msg){
		$("#familiar").html(msg);

		$.ajax({
			url: "includes/familiar_inv.php",
			async:false
		}).done(function(msg){
			$("#invwindow").html(msg);
		});
	});
}

function bondJamesbond(id)
{

	$('body').append('<div id="bonding"></div>');
	$("#bonding").html('<img src="/images/layout/loading.gif"> loading...');

	$('#bonding').dialog({
		autoOpen: false,
		title: "Bond with Familiar",
		width: 450,
		height: "auto",
		modal: true,
		resizable: false,
		draggable: false,
		closeOnEscape: false,
		open: function(event, ui) {
			$(".ui-dialog-titlebar-close", ui.dialog).hide();
		}
	});

	$('#bonding').dialog('open');

	$.ajax({
		type: "POST",
		data: {id: id},
		url: "includes/ol/fam_bonding.php",
		cache:false,
		async:false
		
	}).done(function(stuff){
		$("#bonding").html(stuff);
	});
}
if (dragonID == undefined) {
	alert("You must be on a dragon page for this to work");
}
var startAll = new Date();
for (var i = 0; i < familiars.length; i++) {
        var start = new Date();
	fam = familiars[i];
	detachFamiliar();
	attachFamiliar(fam);
	bondJamesbond(fam);
	 var end  = new Date();
	 var time = end.getTime() - start.getTime();
	console.log("Bonded to "+fam+" - Took: "+time);
}
detachFamiliar();
var endAll  = new Date();
var time = endAll.getTime() - startAll.getTime();
console.log("All bonding took: "+time);
