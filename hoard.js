var uselessItem = [6, 10, 13, 15, 20, 40, 46, 53, 74, 79, 91, 94, 106, 134, 164, 683, 810, 828, 830, 990, 1117, 1119, 1132, 1136, 1575, 1577, 1574, 1576, 1755, 2044, 2391, 2593, 2942, 2944, 2945, 2948, 2990, 3020, 3021, 3406, 3457, 3482, 3669, 4326, 4370, 3551, 4439, 4440, 180, 182, 183, 184, 185, 189, 191, 192, 196, 198, 199, 245, 246, 247, 250, 252, 255, 256, 257, 258, 261, 671, 672, 677, 968, 1014, 1017, 1046, 1047, 1048, 1064, 1084, 1086, 1087, 1148, 1175, 2256, 2257, 2415, 2939, 3032, 3083, 3448, 3450, 3506, 3677, 5173, 5410, 5412, 5414, 3393, 739, 751, 338, 339, 376, 377, 598, 406, 412, 731, 729, 201, 243, 265, 266, 574, 788, 805, 1137, 1138, 1163, 1168, 3479, 3989, 3990, 5700, 6536];

var invent = document.getElementById("invent");
var items = invent.getElementsByTagName("span");
var count = 0;
for (var i = 0; i < items.length; i++) {
	if (items[i].getElementsByTagName("select").length != 0) {
		var image = items[i].getElementsByTagName("img")[0].src;
		var id = image.match(/[0-9]{1,}/)[0]*1;
		if (!(uselessItem.indexOf(id) == -1)) {
			items[i].getElementsByTagName("input")[0].checked = true;
			count++;
		}
	}
}
alert("Found "+count+" valuable items");
