$(document).ready(function() {
	// $('div div.impar').click(function() {
	// 	$(this).css('color', 'white');
	// });
	//
	// $('div div.par').click(function() {
	// 	$(this).css('background-color', 'red');
	// });

	$('div div:even').on("click", function() {
		$(this).css('color', 'white');
	});

	$('div div:odd').on("click", function() {
		$(this).css('background-color', 'red');
	});

	$('div div').on("click", function(e) {
		if (e.ctrlKey) {
			$(this).slideUp(4000, function () {
				console.log("Abajo")
			}).slideDown(4000, function () {
				console.log("Arriba");
			});
		}
	});

	$('div div').on("click", function(e) {
		if (e.altKey) {
			$(this).animate({
				rotate: "180deg",
			}, 1000).animate({
				width: "100px",
			}, 1000).animate({
				height: "100px",
			}, 1000).animate({
				width: "100%"
			}, 1000).animate({
				height: "300px",
			}, 1000).animate({
				rotate: "360deg",
			}, function() {
				$(this).css("rotate", "0deg");
			});
		}
	});

	$('div div').on("click", function() {

		var index = $('div div').index($(this)) + 1;
		var text = $(this).data('text');
		var textInicial = text;

		if ($(this).data('clicked')) {

			$(this).text(textInicial);
			$(this).data('clicked', false);

		} else {

			$(this).data('text', $(this).text());
			$(this).text(index + ". " + $(this).text());
			$(this).data('clicked', true);
		}
	});
});