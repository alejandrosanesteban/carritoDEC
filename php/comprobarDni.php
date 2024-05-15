<?php

include 'conexion.php';

$dni = $_POST['dni'];

$query = mysqli_query($conexion, "SELECT * FROM usuarios WHERE DNI = '$dni'");

if ($query) {
    $resultado = mysqli_fetch_assoc($query);
    $nombre = $resultado['nombre'];

    if($nombre) {
        echo "ok,$nombre";
    }

} else {
    echo 'No se ha encontrado el Dni solicitado';
}

?>