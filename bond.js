var familiars = [361,377,381,405,410,596,608,637,650,1795,7591,8968];

function detachFamiliar()
{
	attachFamiliar('0');
}

function attachFamiliar(familiarID)
{
	$(document).trigger('hideCluetip');

	var dragonID = '7874793';

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

for (var i = 0; i < familiars.length; i++) {
	fam = familiars[i];
	detachFamiliar();
	attachFamiliar(fam);
	bondJamesbond(fam);
}
