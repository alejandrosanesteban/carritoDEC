-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2024 a las 07:31:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `codArticulo` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `PVP` decimal(10,2) DEFAULT NULL,
  `IVA` decimal(5,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `cantidadMinima` int(11) DEFAULT NULL,
  `correoProveedor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`codArticulo`, `nombre`, `PVP`, `IVA`, `cantidad`, `cantidadMinima`, `correoProveedor`) VALUES
(1035, 'Apple Ipad 2022 10.9\"', 424.99, 21.00, 13, 5, 'apple@ejemplo.com'),
(2120, 'Lenovo IdeaPad Slim 3', 628.99, 21.00, 9, 30, 'lenovo@mail.com'),
(3001, 'Asus VA249HE 23.8\"', 129.71, 18.00, 38, 5, 'asus@mail.com'),
(4120, 'HP LaserJet Pro', 371.07, 18.00, 18, 30, 'hp@mail.com'),
(7001, 'Microsoft Windows 11 Home 64 Bits', 157.93, 18.00, 143, 20, 'microsoft@mail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineas`
--

CREATE TABLE `lineas` (
  `CodLinea` int(11) NOT NULL,
  `codVenta` varchar(11) DEFAULT NULL,
  `codArticulo` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `lineas`
--

INSERT INTO `lineas` (`CodLinea`, `codVenta`, `codArticulo`, `cantidad`, `precio`) VALUES
(59, 'JKgorTYnuwZ', 2120, 1, 628.99),
(60, 'JKgorTYnuwZ', 3001, 2, 259.42),
(61, 'JKgorTYnuwZ', 7001, 1, 157.93),
(62, 'K6RpyDTJR6g', 2120, 1, 628.99),
(63, 'K6RpyDTJR6g', 3001, 2, 259.42),
(64, 'K6RpyDTJR6g', 4120, 1, 371.07),
(66, 'MpmiWP38GTv', 3001, 1, 129.71),
(67, 'MpmiWP38GTv', 2120, 1, 628.99),
(68, '3ek48ZC00J5', 7001, 2, 315.86),
(69, 'FStFGIQcZIA', 3001, 2, 259.42),
(70, 'FStFGIQcZIA', 1035, 1, 424.99),
(71, 'FStFGIQcZIA', 4120, 1, 371.07),
(72, 'FStFGIQcZIA', 7001, 2, 315.86),
(73, 'FStFGIQcZIA', 2120, 1, 628.99),
(74, 'onn4c9cCyQ4', 2120, 2, 1257.98);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `DNI` varchar(9) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `poblacion` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`DNI`, `nombre`, `apellidos`, `direccion`, `poblacion`, `correo`) VALUES
('01234567W', 'Pepe', 'Palotes Pooo', 'C/ Falsa', 'Poblacion', 'random@email.com'),
('12345678A', 'Alejandro', 'Díaz Heredia', 'Calle Mayor 123', 'San Esteban de Pravia', 'alejandro@example.com'),
('23456789D', 'Ana', 'Sánchez Martín', 'Calle Gran Vía 56', 'Valencia', 'ana@example.com'),
('45678901C', 'Pedro', 'Martínez Ruiz', 'Plaza España 7', 'Sevilla', 'pedro@example.com'),
('55555555g', 'Cuenta', 'Prueba', 'Una', 'Otra', 'asda@example.com'),
('78901234E', 'Luis', 'Fernández Gutiérrez', 'Paseo del Prado 21', 'Bilbao', 'luis@example.com'),
('98765432B', 'Marina', 'López García', 'Avenida Libertad 45', 'Barcelona', 'marina@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `codVenta` varchar(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `DNI` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`codVenta`, `fecha`, `DNI`) VALUES
('3ek48ZC00J5', '2024-05-15', '98765432b'),
('FStFGIQcZIA', '2024-05-15', '55555555g'),
('JKgorTYnuwZ', '2024-05-15', '12345678a'),
('K6RpyDTJR6g', '2024-05-15', '12345678a'),
('MpmiWP38GTv', '2024-05-15', '98765432b'),
('onn4c9cCyQ4', '2024-05-15', '12345678a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`codArticulo`);

--
-- Indices de la tabla `lineas`
--
ALTER TABLE `lineas`
  ADD PRIMARY KEY (`CodLinea`),
  ADD KEY `codVenta` (`codVenta`),
  ADD KEY `codArticulo` (`codArticulo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`codVenta`),
  ADD KEY `DNI` (`DNI`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lineas`
--
ALTER TABLE `lineas`
  MODIFY `CodLinea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lineas`
--
ALTER TABLE `lineas`
  ADD CONSTRAINT `lineas_ibfk_1` FOREIGN KEY (`codVenta`) REFERENCES `ventas` (`codVenta`),
  ADD CONSTRAINT `lineas_ibfk_2` FOREIGN KEY (`codArticulo`) REFERENCES `articulos` (`codArticulo`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuarios` (`DNI`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
