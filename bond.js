// Bash script to help get all the possible familiars
//for i in {1..34}; do wget http://flightrising.com/main.php?p=bestiary\&tab=familiars\&page=$i ; done
//more main.php\?p\=bestiary\&tab\=familiars\&page\=* | grep "/images/cms/familiar/art/"

var familiars = [];
var moneyMade = 0;
var rustedTotal = 0;
var ironTotal = 0;
var gildedTotal = 0;
var totalBonded = 0;

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
		if (stuff.indexOf("You have already bonded with this familiar today.") > -1) {
			console.log("Already bonded to: "+id);
		} else if (stuff.indexOf("You've earned these rewards today:") > -1) {
			console.log("Successfully bonded to: "+id);
			moneyMade+=stuff.match(/\s([0-9][0-9])\s/)[1]*1;
			totalBonded++;
		} else if (stuff.indexOf("lair") > -1) {
			console.log("Failed to bond, manually bond with this familiar first");
			debugger;
		} else {
			debugger;
		}
		
		if (stuff.indexOf("574.png") > -1) {
			rustedTotal++;
		}
		if (stuff.indexOf("575.png") > -1) {
			ironTotal++;
		}
		if (stuff.indexOf("Gilded Decorative Chest") > -1) {
			gildedTotal++;
		}
		
		
		$("#bonding").html(stuff);
	});
}
if (dragonID == undefined) {
	alert("You must be on a dragon page for this to work");
}
if (confirm("You have "+familiars.length+" familiars, this should take approximately "+familiars.length*2+" seconds to complete. Do not interrupt it. Press F12 and click the console tab to monitor the process. Are you sure you want to do this?")) {
	var startAll = new Date();
	for (var i = 0; i < familiars.length; i++) {
			var start = new Date();
		fam = familiars[i];
		detachFamiliar();
		attachFamiliar(fam);
		bondJamesbond(fam);
		 var end  = new Date();
		 var time = end.getTime() - start.getTime();
		console.log("Took: "+time);
		
	}
	detachFamiliar();
	var endAll  = new Date();
	var time = endAll.getTime() - startAll.getTime();
	console.log("All bonding took: "+time);
	alert("Bonded to "+totalBonded+" familiars, and earnt "+moneyMade+" gold. Got "+rustedTotal+" Rusted Chests, "+ironTotal+" Iron Chests and "+gildedTotal+" gilded Chests");
}
