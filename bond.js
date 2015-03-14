var familiars = [361,377,381,405,410,596,608,637,650,1795,7591,8968];

for (var i = 0; i < familiars.length; i++) {
fam = familiars[i];
$.ajax({
		data: {id: dragonID, itm: 0},
		url: "includes/familiar_active.php"
	}).done(function(msg){
		$("#familiar").html(msg);

		$.ajax({
			url: "includes/familiar_inv.php"
		}).done(function(msg){
			$("#invwindow").html(msg);
			$.ajax({
				data: {id: dragonID, itm: fam},
				url: "includes/familiar_active.php"
			}).done(function(msg){
				$("#familiar").html(msg);

				$.ajax({
					url: "includes/familiar_inv.php"
				}).done(function(msg){
					$("#invwindow").html(msg);
					$.ajax({
						type: "POST",
						data: {id: fam},
						url: "includes/ol/fam_bonding.php",
						cache:false
					}).done(function(stuff){
						$("#bonding").html(stuff);
					});
				});
			});
		});
	});
}
