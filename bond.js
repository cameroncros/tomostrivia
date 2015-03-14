// Bash script to help get all the possible familiars
//for i in {1..34}; do wget http://flightrising.com/main.php?p=bestiary\&tab=familiars\&page=$i ; done
//more main.php\?p\=bestiary\&tab\=familiars\&page\=* | grep "/images/cms/familiar/art/"

var familiars = [4350,376,356,1779,358,405,1149,600,639,2151,7698,1272,378,649,377,416,403,785,643,1594,2072,7594,669,904,2258,7704,611,3120,748,341,2577,919,620,727,609,3782,6715,414,2420,5177,353,1034,4881,593,1796,375,6073,382,355,1221,2782,650,2623,819,3176,7705,5178,7699,4356,4347,7702,339,975,982,4927,422,803,804,421,338,5511,4348,1578,884,7882,360,3177,4353,4351,4354,4352,622,8319,6340,4887,7595,1929,594,381,640,7591,987,670,6334,1795,597,3783,4886,8968,3643,6604,905,4805,800,4355,418,6338,619,595,651,725,4806,9226,1987,1673,8400,1101,1564,638,747,412,607,6335,1035,1313,601,4349,1174,637,2887,8320,408,410,598,1363,820,354,7596,1364,7597,6333,6332,407,2917,610,1479,359,1930,5197,1365,4678,409,592,3119,746,7703,413,2604,7697,786,1273,4880,1449,1573,7598,1671,1969,2073,4001,883,406,7599,7600,623,373,596,628,2591,616,1173,2421,910,591,618,4156,7700,799,1293,4884,7601,7602,420,1968,343,4883,2259,612,4882,1480,1672,7701,773,3327,7883,599,3148,6341,989,6337,6339,7427,3071,608,1565,411,2781,3175,9225,2394,5196,2590,419,342,6336,4002,361,4679,648,621,1294,617,1222,340,760,4885,1450,7592,7593,2393,631,6605,7328,1145,629,632,380,379,636,404,3070,374,372,1144,2780,772,642,415,2888,357,635,417];
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
for (var i = 0; i < familiars.length; i++) {
	fam = familiars[i];
	detachFamiliar();
	attachFamiliar(fam);
	bondJamesbond(fam);
	alert("Bonded");
}
