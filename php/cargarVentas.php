<?php

include 'conexion.php';


$dni = $_POST['dni'];

$query = mysqli_query($conexion, "SELECT v.codVenta, v.fecha, a.nombre, l.cantidad, a.PVP, a.codArticulo
FROM ventas v
INNER JOIN lineas l ON v.codVenta = l.codVenta
INNER JOIN articulos a ON l.codArticulo = a.codArticulo
WHERE v.DNI = '$dni'
ORDER BY v.codVenta, l.cantidad, v.fecha");

if($query) {

    $resultados = array();
    
    while($fila = mysqli_fetch_assoc($query)) {
        $resultados[] = $fila;
    }

    echo json_encode($resultados);
} else {
    echo "error";
}



?>