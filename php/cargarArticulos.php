<?php

include 'conexion.php';

$query = mysqli_query($conexion, "SELECT * FROM articulos");

if ($query -> num_rows > 0) {
    $rows = array();
    while($row = $query -> fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo 'No hay resultados en la tabla';
}

?>