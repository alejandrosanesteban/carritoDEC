<?php

    $server = 'localhost';
    $user = 'root';
    $pass = '';
    $bd = "tienda";

    $conexion = mysqli_connect($server,$user,$pass,$bd);

    if(!$conexion) {
        echo 'Ha habido un error en la conexion'. mysqli_connect_error();
    }


?>