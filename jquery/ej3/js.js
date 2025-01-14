$(document).ready(function() {
    /*$('div.hijo').on("click", function(e) {

        if (e.ctrlKey) {
            if ($(this).data('clicked')) {

                $(this).css('border', '0');
                $(this).data('clicked', false);

            } else {

                $(this).css('border', '2px solid red');
                $(this).data('clicked', true);
            }
        }
    });*/

	var selectedDiv;

    $('div.hijo').on("click", function(e) {

        if (e.ctrlKey) {

			
            var $selectedDiv = $(this);  // El div.hijo clickeado
            var prev = $selectedDiv.prev();
            var next = $selectedDiv.next();

            /*if (prev.hasClass("marcado") || next.hasClass("marcado")) {
                return;
            }*/

            $('div.hijo').find('.modal').remove();

            if ($selectedDiv.hasClass("marcado")) {

                $selectedDiv.removeClass("marcado");
                $selectedDiv.find('.modal').remove();
				
            } else {

				prev.removeClass('marcado');
				next.removeClass('marcado');

				$selectedDiv.toggleClass("marcado");

				// Modal
				var modal = $('<div class="modal"></div>');
				var modalContent = $('<div class="modal-content"></div>');
				var closeButton = $('<span class="close">&times;</span>');
				var arrowUp = $('<span class="arrow" id="arrowUp">&#8593;</span>');
				var arrowDown = $('<span class="arrow" id="arrowDown">&#8595;</span>');

				// Content
				modalContent.append(closeButton);
				modalContent.append('<p id="modalContent">' + $selectedDiv.find('.titulo').text() + '</p>');
				modalContent.append('<div class="arrows"></div>');
				modalContent.find('.arrows').append(arrowUp);
				modalContent.find('.arrows').append(arrowDown);
				modal.append(modalContent);

				// Agregar la modal al div.hijo
				$selectedDiv.append(modal);

				modal.show();

				closeButton.on("click", function() {
					modal.remove();
				});

				arrowUp.on("click", function() {
					var prevDiv = $selectedDiv.prev('.hijo');
					if (prevDiv.length) {
						$selectedDiv.insertBefore(prevDiv);
					}
				});

				arrowDown.on("click", function() {
					var nextDiv = $selectedDiv.next('.hijo');
					if (nextDiv.length) {
						$selectedDiv.insertAfter(nextDiv);
					}
				});
			}

			/*selectedDiv = $(this);
			$('#modalContent').text($(this).find('.titulo').text());
			$('#myModal').show();*/
        }
    });

	$('div.hijo').each(function(index) {
        $(this).data('index', index);
    });

	/*$(document).on('keydown', function(e) {
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();

            var sortedDivs = $('div.hijo').sort(function(a, b) {
                return $(a).data('index') - $(b).data('index');
            });

            $('div.padre').html('');
            $('div.padre').append(sortedDivs);

            $('div.hijo').removeClass('marcado');
            $('div.hijo').find('.modal').remove();
        }
    });*/

	$(document).on('keydown', function(e) {
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
			
            var divs = $('div.hijo').get(); // Convertimos el objeto jQuery a un array normal

            // Ordenamos los divs por el valor del 'data-index'
            divs.sort(function(a, b) {
                return $(a).data('index') - $(b).data('index');
            });

            // Reinsertamos los divs en el contenedor en el nuevo orden
            var container = $('div.padre');
            divs.forEach(function(div) {
                container.append(div); // Movemos el div a la nueva posición sin borrarlo
            });

            // Limpiar el estado de "marcado" y cerrar modales
            $('div.hijo').removeClass('marcado');
            $('div.hijo').find('.modal').remove();
        }
    });

	/*var originalOrder = [];

    $('div.hijo').each(function() {
        originalOrder.push($(this)[0]);
    });

	$(document).on('keydown', function(e) {
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();

            $('div.padre').html('');
            $.each(originalOrder, function(index, hijo) {
                $('div.padre').append(hijo);
            });

            $('div.hijo').removeClass('marcado');
            $('div.hijo').find('.modal').remove();
        }
    });*/

	/*$('.close').on("click", function() {
		$('#myModal').hide();
	});

	$('#arrowUp').on("click", function() {
		var prevDiv = selectedDiv.prev();
		if (prevDiv.length) {
			selectedDiv.insertBefore(prevDiv);
		}
	});

	$('#arrowDown').on("click", function() {
		var nextDiv = selectedDiv.next();
		if (nextDiv.length) {
			selectedDiv.insertAfter(nextDiv);
		}
	});*/
});
