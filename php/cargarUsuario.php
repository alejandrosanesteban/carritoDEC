<?php

include 'conexion.php';

$dni = $_POST['dni'];
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$direccion = $_POST['direccion'];
$poblacion = $_POST['poblacion'];
$correo = $_POST['correo'];

$query = mysqli_query($conexion, "INSERT INTO usuarios VALUES ('$dni', '$nombre', '$apellidos', '$direccion', '$poblacion', '$correo')");


if($query) {
    echo 'ok';
} else {
    echo 'Ha habido un error en la inserción de datos';
}


?>
