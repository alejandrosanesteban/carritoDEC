<?php

include 'conexion.php';


$codVenta = $_POST['codVenta'];
$dni = $_POST['dni'];

$query = mysqli_query($conexion, "INSERT INTO ventas VALUES ('$codVenta',CURDATE(),'$dni');");

if($query) {
    echo 'ok';
} else {
    echo 'Ha habido un error';
}


?>