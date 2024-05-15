<?php

include 'conexion.php';

$codArticulo = $_POST['codArticulo'];
$cantidadComprada = $_POST['cantidad'];

$query = mysqli_query($conexion, " UPDATE articulos SET cantidad = cantidad - $cantidadComprada WHERE codArticulo = $codArticulo ");


if($query) {
    echo 'ok';
} else {
    echo 'Error al actualizar el stock';
}

?>