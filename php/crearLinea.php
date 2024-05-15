<?php

include 'conexion.php';

$codVenta = $_POST['codVenta'];
$codArticulo = $_POST['codArticulo'];
$cantidad = $_POST['cantidad'];
$precio = $_POST['precio'];

// var_dump($codVenta);
// var_dump($codArticulo);
// var_dump($cantidad);
// var_dump($precio);

$query = mysqli_query($conexion, "INSERT INTO lineas (codVenta, codArticulo, cantidad, precio) VALUES ('$codVenta','$codArticulo','$cantidad', '$precio')");
if($query) {
    echo 'ok';
} else {
    echo 'Algo ha fallado';
}


?>