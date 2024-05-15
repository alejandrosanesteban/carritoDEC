<?php

include 'conexion.php';

$id = $_POST['id'];
$cantidad = $_POST['cantidad'];

$query  = mysqli_query($conexion, "UPDATE articulos SET cantidad = cantidad + $cantidad WHERE codArticulo = '$id'");
$query2 = mysqli_query($conexion, "UPDATE lineas SET cantidad = cantidad - 1 WHERE codArticulo = '$id'");

if($query && $query2) {
    echo 'ok';
} else {
    echo 'error';
}

?>