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

    // Reprogramo carrito
    $('a[id^="ver_carrito"]').on('click', function(e) {
        e.preventDefault();
        
        console.log('Ver carrito');

        // Descargo la plantilla
        $("<div>").load("plantillas/carrito.html", function () {
            let plantilla = $(this);
            $.getJSON("ajax.php?accion=ver_carrito", function (datos) {
                console.log(datos);

                let productos = datos.productos || [];
                
             // Si no hay productos en el carrito
             if (productos.length === 0) {
                plantilla.find(".cuerpo").html("<p>No hay productos en el carrito.</p>");
                plantilla.find(".carrito_total").hide();

            } else {
                let primerProducto = productos[0];

                // Hacemos la solicitud para obtener los detalles del primer producto
                $.getJSON("ajax.php?accion=detalle&id=" + primerProducto.id, function(detalles) {
                    console.log(detalles);

                    let productoTemplate = plantilla.find(".producto_detalle").first();
                    let carritoTotal = plantilla.find(".carrito_total");
                    let btnVolver = plantilla.find(".volver");
                    plantilla.find(".cuerpo").empty();

                    // Ahora clonamos los productos restantes
                    for (let i = 0; i < productos.length; i++) {
                        let producto = productos[i];

                        // Hacemos la solicitud para obtener los detalles de cada producto
                        $.getJSON("ajax.php?accion=detalle&id=" + producto.id, function(detalles) {
                            console.log(detalles);

                            // Clonamos el primer producto para agregarlo al carrito
                            let productoClone = productoTemplate.clone();

                            // Asignamos un ID único al clon usando el id del producto
                            productoClone.attr('id', 'producto_' + producto.id);

                            // Modificamos el clon con los detalles del producto
                            productoClone.find("h3").text(detalles.nombre);
                            productoClone.find(".precio").eq(0).text(detalles.precio + " €");
                            productoClone.find(".precio").eq(1).text(producto.cantidad + " unidades");
                            productoClone.find(".precio").eq(2).text((producto.precio) + " €");
                            productoClone.find("img").attr("src", "index_files/" + ((detalles.id < 10 ? "0" : "") + detalles.id) + "coc.jpg");

                            // Actualizamos los enlaces de acción para cada producto
                            //eliminar
                            productoClone.find("a").eq(0).on("click", function(e) {
                                e.preventDefault();
                                let productoId = producto.id
                                console.log(producto.precio);
                                

                                $.get("ajax.php?accion=eliminar&id=" + productoId, function(response) {                                    

                                    if (response.respuesta === "ok") {
                                        productoClone.remove();
                                        
                                        if (plantilla.find(".producto_detalle").length === 0) {
                                            plantilla.find(".cuerpo").html("<p>No hay productos en el carrito.</p>");
                                            plantilla.find(".carrito_total").hide();
                                        }

                                        actualizarTotal();

                                    } else {
                                        console.log("Error al eliminar el producto");
                                    }
                                });
                            });
                            //comprar

                            productoClone.find("a").eq(1).on("click", function(e) {
                                e.preventDefault();
                                let productoId = producto.id;
                                console.log('Aumentar cantidad del producto: ', productoId);

                                $.get("ajax.php?accion=comprar&id=" + productoId, function(response) {

                                    if (response.respuesta === "ok") {
                                        productoClone.find(".precio").eq(1).text(++producto.cantidad + " unidades"); 
                                        let precioTotal = producto.cantidad * detalles.precio;    
                                        productoClone.find(".precio").eq(2).text(precioTotal.toFixed(2) + " €");

                                        // Actualizamos el total del carrito después de la modificación
                                        actualizarTotal();
                                    } else {
                                        console.log("Error al aumentar la cantidad");
                                    }
                                });      
                            }); 

                            //disminuir
                            productoClone.find("a").eq(2).on("click", function(e) {
                                e.preventDefault();
                                let productoId = producto.id;
                                console.log('Disminuir cantidad del producto: ', productoId);

                                $.get("ajax.php?accion=disminuir&id=" + productoId, function(response) {

                                    if (response.respuesta === "ok") {
                                        productoClone.find(".precio").eq(1).text(--producto.cantidad + " unidades"); 
                                        let precioTotal = producto.cantidad * detalles.precio;    
                                        productoClone.find(".precio").eq(2).text(precioTotal.toFixed(2) + " €");

                                        // Si la cantidad es 0, eliminamos el producto
                                        if (producto.cantidad === 0) {
                                            productoClone.remove();

                                            if (plantilla.find(".producto_detalle").length === 0) {
                                                plantilla.find(".cuerpo").html("<p>No hay productos en el carrito.</p>");
                                                plantilla.find(".carrito_total").hide();
                                            }
                                        }

                                        // Actualizamos el total del carrito después de la modificación
                                        actualizarTotal();
                                    } else {
                                        console.log("Error al disminuir la cantidad");
                                    }
                                });      
                            });                     

                            // Añadimos el producto clonado al cuerpo del carrito
                            plantilla.find(".cuerpo").append(productoClone);
                            carritoTotal.find("span").text(datos.total);
                            plantilla.find(".cuerpo").append(carritoTotal);
                            // Evento para cerrar el modal cuando se hace clic en "Volver"
                            btnVolver.on("click", function(e) {
                                e.preventDefault();
                                plantilla.dialog("close");  // Cerrar el modal
                                console.log("Modal cerrado");
                            });
                            plantilla.find(".cuerpo").append(btnVolver);
                        });
                    }

                    // Abro el modal
                    plantilla.dialog({
                        modal: true,
                        width: 600,
                        height: 400,
                    });

                    });
                }
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
        console.log("enteor");
		$.getJSON("http://localhost/DEWEC2/tienda/ajax.php?accion=total",
        function(datos) {
            console.log("interrupcion" + datos);            
            $("#total_carrito").text(datos.total.toFixed(2));
            $("#total").find("span").text(datos.total.toFixed(2));
        });
	}

    // Acción de comprar
    $('a[id^="comprar"]').on('click', function(e) {
        e.preventDefault();
        let id = this.id.split('_')[1];
        console.log('Comprar: ' + id);
        comprar(id);
    });
});

