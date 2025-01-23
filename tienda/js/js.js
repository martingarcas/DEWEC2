$(document).ready(function() {
    // Reprogramo detalle
    $('a[id^="detalles"]').on('click', function(e) {
        e.preventDefault();
        let id = this.id.split('_')[1];
        console.log('Detalles: ' + id);

		//Descargo plantilla
		/*$("<div>").load("plantillas/detalle.html", function () {

			$.getJSON("", function (datos) {
				
			});

		});*/

        // Descargo la plantilla
        $("<div>").load("plantillas/detalle.html", function () {
            let plantilla = $(this);
            $.getJSON("ajax.php?accion=detalle&id=" + id, function (datos) {
                console.log(datos);

                // Actualizo los campos del producto
                plantilla.find(".titulo_zona").text(datos.nombre);
                plantilla.find(".precio").text(datos.precio + " €");  
                plantilla.find("p").text(datos.descripcion);  
                plantilla.find("img").attr("src", "index_files/" + ((id < 10) ? "0" : "") + id + "coc.jpg");

                // Abro el modal
                plantilla.dialog({
                    modal: true,
                    width: 600,
                    height: 400,
                });

                // Evento para cerrar el modal cuando se hace clic en "Volver"
                plantilla.find(".volver a").on("click", function(e) {
                    e.preventDefault();
                    plantilla.dialog("close");  // Cerrar el modal
                    console.log("Modal cerrado");
                });

				// Evento para prevenir la acción predeterminada del botón de "Comprar"
                plantilla.find("a").first().on("click", function(e) {
                    e.preventDefault();
					comprar();
                    console.log("Intentando comprar el producto con ID: " + id);
                });
            });
        });
    });

	// Función comprar
	function comprar(id) {
		
		$.getJSON("ajax.php?accion=comprar&id=" + id, 
			function (datos) {
				if (datos.respuesta != "ok") {
					alert("Error en la compra");

				} else {
					actualizarTotal();
				}		
			}
		);
	}

	// Actuualizar total carrito
	function actualizarTotal() {
		
	}

    // Acción de comprar
    $('a[id^="comprar"]').on('click', function(e) {
        e.preventDefault();
        let id = this.id.split('_')[1];
        console.log('Comprar: ' + id);
        // Aquí puedes agregar la lógica para procesar la compra si es necesario
    });
});

