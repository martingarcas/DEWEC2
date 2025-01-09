$(document).ready(function() {
	// $('td.impar').click(function() {
	// 	$(this).css('color', 'white');
	// });
	//
	// $('td.par').click(function() {
	// 	$(this).css('background-color', 'red');
	// });

	$('td:even').on("click", function() {
		$(this).css('color', 'white');
	});

	$('td:odd').on("click", function() {
		$(this).css('background-color', 'red');
	});

	$('td').on("click", function(e) {
		if (e.ctrlKey) {
			//$(this).closest('tr').remove();
			$(this).closest('tr').hide(2000).show(2000);
		}
	});

	$('td').on("click", function(e) {
		if (e.ctrlKey) {
			$(this).slideDown(4000, function () {
				console.log("Arriba");
			}).slideUp(4000, function () {
				console.log()
			});
		}
	});
});