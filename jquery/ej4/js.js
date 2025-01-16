$(function() {
	
	//Pido los paises del mundo
	$.getJSON("https://restcountries.com/v3.1/all",
		
		/*function(data, status) {

			data.sort(function(a, b) {
				return a.translations.spa.common.localeCompare(b.translations.spa.common);
			});

			data.forEach(element => {

				//console.log(element);				
				var option = $("<option>")
							.text(element.translations.spa.common)
							.val(element.cca3)
							.click(function() {								

								var contenedor = $("#contenedor");
								contenedor.empty();
								$.getJSON("https://restcountries.com/v3.1/alpha/" + $(this).val(),

									function(data, status) {

										$("<div>").html(
											"<span>Población: </span>" +
											"<span>" + data[0].population + "</span>"
										)
										.appendTo(contenedor);

										for (moneda in data[0].currencies) {

											$("<div>").html(
												"<span>Moneda: </span>" +
												"<span>" + data[0].currencies[moneda].symbol + "(" + data[0].currencies[moneda].name + ")" + "</span>"
											)
											.appendTo(contenedor);
										}
								});
							});

				$("#paises").append(option); //Válido también appendTo
			});
		}*/

		function(data, status) {

			data.sort(function(a, b) {
				return a.translations.spa.common.localeCompare(b.translations.spa.common);
			});

			let regiones = [...new Set(data.map(element => element.region))].filter(region => region !== "Antarctic");
			
			// Agregar las regiones al select
			regiones.forEach(region => {
				var option = $("<option>")
							.text(region)
							.val(region)
							.click(function() {	

								var contenedor = $("#contenedor");
								contenedor.empty();

								var paisesPorRegion = data.filter(element => element.region === $(this).val());

								paisesPorRegion.forEach(element => {
									
									var pais = $("<option>")
												.val(element.cca3)
												.html(element.translations.spa.common)
												.click(function() {

													var contenedor = $("#contenedor-pais");
													contenedor.empty();

													$("<div>").html(
														"<img src='" + element.flags.png + "' alt='" + element.flag + "' style='width: 50px; height: 30px;'>"
													)
													.appendTo(contenedor);

													$("<div>").html(
														"<span>Nombre: </span>" +
														"<span>" + element.translations.spa.common + "</span>"
													)
													.appendTo(contenedor);

													$("<div>").html(
														"<span>Capital: </span>" +
														"<span>" + element.capital + "</span>"
													)
													.appendTo(contenedor);

													$("<div>").html(
														"<span>Población: </span>" +
														"<span>" + element.population + "</span>"
													)
													.appendTo(contenedor);

													if (element.borders && element.borders.length > 0) {

														var paisesVecinos = $("<div style='display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap:24px'>");

														element.borders.forEach(borderCode => {
															$.getJSON("https://restcountries.com/v3.1/alpha/" + borderCode, function(neighborData) {
																neighborData.forEach(neighbor => {

																	$("<div>").html(
																		"<span>Países fronterizos: </span>" +
																		"<img src='" + neighbor.flags.png + "' alt='" + neighbor.flag + "' style='width: 50px; height: 30px;'>"
																	)
																	.appendTo(paisesVecinos);
																});
																contenedor.append(paisesVecinos);
															});
														});
													}
												})
												.appendTo(contenedor);
								});
								

								$(this).val();								
							});

				$("#paises").append(option);
			});
		}
	);
});