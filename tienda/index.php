<?php
	session_start();
	require_once("funciones.php");
	require_once("bd.php");
	if(!isset($_SESSION["carrito"])){
		$_SESSION["carrito"]=array();
		$_SESSION["carrito"]["total"]=0;
		$_SESSION["carrito"]["productos"]=array();
	}
	
	$contenido = "";
	$accion=(isset($_GET["accion"])?$_GET["accion"]:"");
	switch($accion){
		case "detalle":
			$contenido=ver_detalle_html($_GET["id"]);
			break;
		case "ver_carrito":
			$contenido=ver_carrito_html();
			break;
		case "comprar":
			comprar($_GET["id"]);
			$contenido=ver_carrito_html();
			break;
		case "disminuir":
			disminuir($_GET["id"]);
			$contenido=ver_carrito_html();
			break;
		case "eliminar":
			eliminar($_GET["id"]);
			$contenido=ver_carrito_html();
			break;	
		default:
			$contenido=ver_productos_html();
	}
	
	function simular_transmision($resultado){
		//desactivar la siguiente linea para no hacer espera
		//usleep(strlen($resultado)*1000);
		return $resultado;
	}
	ob_start("simular_transmision");	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es"> 
	<head>
		<title>Curso de AJAX</title>
		<meta http-equiv="Content-Type" content="application/xhtml+xml"; charset="utf8" />
		<link rel="stylesheet" type="text/css" href="css.css" />
		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
		<!--<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">-->
		<link rel="stylesheet" href="css/jquery-ui.css">
		<script type="text/javascript" src="js/jquery-ui.js"></script>
		<script type="text/javascript" src="js/js.js"></script>
	</head>
	<body>
		<div id="web">
			<div id="cabecera"><h1>Tienda virtual</h1></div>
			<div id="carrito">
				<h2 class="superior">Compra actual</h2>
				<div class="inferior"><span id="total_carrito"><?php echo sprintf("%.2f",$_SESSION["carrito"]["total"]);?></span> €</div>
				<a id="ver_carrito" href="index.php?accion=ver_carrito">Ver carrito</a>
			</div>	
			<div id="cabecera2"></div>
			<?php echo $contenido;?>
			<div id="lateral"></div>
			<div id="pie"></div>
		</div>
	</body>
</html>
<?php
	ob_end_flush();
?>