<?php
	header('Content-Type: application/json; charset=utf-8');
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
			$contenido=json_encode($productos[$_GET["id"]]);
			break;
		case "ver_carrito":
			$contenido=ver_carrito_json();
			break;
		case "total":
			$contenido="{\"total\":" . $_SESSION["carrito"]["total"] . "}";
			break;
		case "comprar":
			comprar($_GET["id"]);
			$contenido = "{\"respuesta\" : \"ok\"}";
			break;
		case "disminuir":
			disminuir($_GET["id"]);
			$contenido = "{\"respuesta\" : \"ok\"}";
			break;
		case "eliminar":
			eliminar($_GET["id"]);
			$contenido = "{\"respuesta\" : \"ok\"}";
			break;	
		default:
			$contenido=ver_productos_json();
	}
	
	function simular_transmision($resultado){
		//desactivar la siguiente linea para no hacer espera
		usleep(strlen($resultado)*1000);
		return $resultado;
	}
	ob_start("simular_transmision");	
	echo $contenido;
	ob_end_flush();
?>