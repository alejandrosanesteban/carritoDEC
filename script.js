const spanContador = document.getElementById("contador");

let numProductosCesta = 0;
let carrito = [];
let dni;
let codVenta;

//#region Funciones de apoyo
// ==========================

// Funcion para actualizar el numero de la cesta
const actualizarCesta = () => spanContador.textContent = numProductosCesta;

// Mostrar el carro al clickar el boton
const btnCarrito = document.getElementById('btn-carrito');
btnCarrito.addEventListener('click',carritoToggle);

// Funcion para abrir y cerrar el carrito
function carritoToggle() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.classList.toggle('hide');
}

// Funcion de genera una clave de 11 numeros para asignar como CodVenta
function generarCodVenta() {
    const numeros = '0123456789';
    const letrasMayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinus = letrasMayus.toLocaleLowerCase();
    const codigo = [...numeros, ...letrasMayus, ...letrasMinus];
    let codVenta = '';
  
    for(let i = 0; i < 11 ; i++) {
      codVenta += codigo[Math.floor(Math.random() * codigo.length)];
    }
    return codVenta;
}

function calcularDiasTranscurridos(fechaCompra) {
    const fechaActual = new Date();
    const diferenciaTiempo = fechaActual - new Date(fechaCompra);
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    return diferenciaDias;
}

// Funcion para vaciar el contenido del carrito
const vaciarCarritoContainer = () => document.getElementById('carrito').innerHTML = '';

// Funcion para vaciar el main de la pagina
const vaciarMain = () => document.getElementById('articles-container').innerHTML = '';

function deshabilitarBotones() {
    const botonesAgregarCarrito = document.querySelectorAll(".add-to-cart");
    botonesAgregarCarrito.forEach(boton => {
        boton.disabled = true;
    })
}

spanContador.textContent = numProductosCesta;

//#region Mostrar carrito
// Funcion para ir metiendo los articulos en el array carrito
function agregarAlCarrito(articulo) {
    const index = carrito.findIndex( e => e.id === articulo.id);
    if(index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push(articulo);
    }
    mostrarCarrito();
}

// Funcion para añadir los elementos del array carrito al container
function mostrarCarrito() {
    const carritoContainer = document.querySelector('.items');
    const cantidadTotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

    carritoContainer.innerHTML = '';

        carrito.forEach(item => {
            const itemHTML = `
            <div class="articulo-item">
                <div class="articulo-img">
                    <img src="img/${item.id}.webp" alt="">
                </div>
                <div class="articulo-info">
                    <p class='nombre'>${item.nombre}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Precio Ud. ${item.precio}€</p>
                    <p>Precio Total ${(item.precio * item.cantidad).toFixed(2)}€</p>
                </div>
            </div>
            `;
            carritoContainer.innerHTML += itemHTML;
            
        });

    const precioTotalHTML = `
        <div id="precioTotal" class='articulo-item'>Precio Total: ${cantidadTotal.toFixed(2)}€</div>
        <button class='btn btn-primary mt-3' onclick='gestionarCompra()'><i class="bi bi-cart2"></i> Hacer Compra</button>
    `;
    carritoContainer.insertAdjacentHTML('beforeend', precioTotalHTML);
}


//#region USUARIO
function gestionarCompra() {
    
    vaciarCarritoContainer();
    deshabilitarBotones();
    const carritoContainer = document.getElementById('carrito');
    const userControl = document.createElement('div');
    userControl.classList.add('titulo');
    userControl.innerHTML = `
        <div class='user-dni'>
            <div>
                <h2>Mi cuenta</h2>
            </div>
            <form id="loginForm">
                <div class="inputGroup">
                    <input type="text" required id="dniInput">
                    <label for="dni" id='dni'>DNI</label>
                </div>
                <div>
                    <span class='error'>Introduce un Dni válido. Ej: 12345678A</span>
                </div>
                <div class='text-center'>
                    <button type='submit' class='btn btn-primary mt-3'>Log In</button>
                </div>
            </form>
        </div>
    `;
    carritoContainer.appendChild(userControl);

    // Agregar un controlador de eventos para el envío del formulario
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        dni = document.getElementById('dniInput').value;

        //#region DNI
        
        // Comprobar el formato del DNI, si es false, span de error
        //  y si esta bien comprobar el DNI en la BD
        const dniRegex = /^\d{8}[a-zA-Z]$/;
        if (!dniRegex.test(dni)) {
            document.querySelector('.error').style.display = 'block';
        } else {
            // La logica con el DNI
            comprobarDNI(dni);
        }
    });
}

// Si existe, se crea mensaje de compra ok, sino se crea el nuevo usuario
function comprobarDNI(dni) {

    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {

            const response = xhr.responseText.split(",");

            if(response[0] === 'ok') {
                // TODO verUsuario() traer datos del DNI ======================
                const nombre = response[1].trim();
                mensajeCompra(nombre);

            } else {
                crearUsuario(dni);
                crearLinea();

            }
            

        } else {
            console.log(`Error en ajax: ${xhr.status}`)
        }

    })

    xhr.open('POST','php/comprobarDni.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(`dni=${dni}`);
}

//#region Nuevo usuario
// Crear nuevo usuario si no existe el dni en la BD
function crearUsuario(dni) {
    vaciarCarritoContainer();
    const carritoContainer = document.getElementById('carrito');
    const userControl = document.createElement('div');
    userControl.classList.add('titulo');
    userControl.innerHTML = `
        <div class='nuevo-user'>
            <div>
                <h2>Crea tu Cuenta</h2>
            </div>
            <form id='signup-form'>
                <div class="form-group row">
                    <label for="nombre" class="col-3 col-form-label">Nombre</label> 
                    <div class="col-9">
                    <input id="nombre" name="nombre" type="text" required="required" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="apellidos" class="col-3 col-form-label">Apellidos</label> 
                    <div class="col-9">
                    <input id="apellidos" name="apellidos" type="text" class="form-control" required="required">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="direccion" class="col-3 col-form-label">Dirección</label> 
                    <div class="col-9">
                    <input id="direccion" name="direccion" type="text" class="form-control" required="required">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="poblacion" class="col-3 col-form-label">Población</label> 
                    <div class="col-9">
                    <input id="poblacion" name="poblacion" type="text" class="form-control" required="required">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="correo" class="col-3 col-form-label">Email</label> 
                    <div class="col-9">
                    <input id="correo" name="correo" type="text" class="form-control" required="required">
                    </div>
                </div> 
                <div class="form-group row">
                    <div class="offset-3 col-9">
                    <button name="submit" type="submit" class="btn btn-primary">Crear Usuario</button>
                    </div>
                </div>
            </form>
        </div>
    `;
    carritoContainer.appendChild(userControl);

    // Agregar un controlador de eventos para el envío del formulario
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', event => {
        event.preventDefault();
        nombre = document.getElementById('nombre').value;
        apellidos = document.getElementById('apellidos').value;
        direccion = document.getElementById('direccion').value;
        poblacion = document.getElementById('poblacion').value;
        correo = document.getElementById('correo').value;

        nuevoUsuarioBD(dni,nombre,apellidos,direccion,poblacion,correo);
    });
    
}

//#region Envio del usuario nuevo a la BD
// Funcion que recoge los datos del formulario y los manda a la BD para crear el nuevo usuario
function nuevoUsuarioBD(dni,nombre,apellidos,direccion,poblacion,correo) {

    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {

            if (xhr.responseText == 'ok') {
                mensajeCompra(nombre);
            } else {
                console.log("Error en la respuesta Ajax");
            }

        } else {
            console.log(`Error en Ajax: ${xhr.status}`);
        }
    })
    
    xhr.open('POST','php/cargarUsuario.php',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const envio = `dni=${dni}&nombre=${nombre}&apellidos=${apellidos}&direccion=${direccion}&poblacion=${poblacion}&correo=${correo}`;
    xhr.send(envio);

}


function mensajeCompra(nombre) {
    vaciarCarritoContainer();
    const carritoContainer = document.getElementById('carrito');
    const userControl = document.createElement('div');
    userControl.classList.add('titulo');
    userControl.innerHTML = `
        <div class='compraMsg'>
            <h2 class='titulo'>Gracias <span class='nombre'>${nombre}</span>,</h2>
            <p>Su pedido se ha realizado correctamente, <span class='tick'>&#10003;</span></p>
            <button class='btn btn-primary mt-3' onclick='reiniciarCompra()'>Volver</button>
        </div>
        `;
    carritoContainer.appendChild(userControl);

    
    crearVenta();
    crearLinea();
    
}

function reiniciarCompra() {
    cargarArticulos();
    vaciarCarritoContainer();

    const carritoContainer = document.getElementById('carrito');
    const userControl = document.createElement('div');
    userControl.classList.add('titulo');
    userControl.innerHTML = `
        <div class="titulo">
            <h2>Mi Cesta:</h2>
        </div>
        <div class="items d-flex flex-column">               
            <!-- Items del Carrito -->
        </div>
        `;
    carritoContainer.appendChild(userControl);

    numProductosCesta = 0;
    actualizarCesta();
    carrito = [];
    carritoToggle();
    
}

//#region Cargar Articulos en la web
function cargarArticulos() {

    vaciarMain();
    codVenta = generarCodVenta();

    const articlesContainer = document.getElementById('articles-container');
    
    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {
            
            const bd = xhr.responseText;
            const data = JSON.parse(bd);
            console.log(data);
            let articuloItem = ''; 


            data.forEach(articulo => {           

                articuloItem += `
                <div class="col-sm-3">
                    <div class="thumb-wrapper">
                        <div class="img-box">
                            <img src="img/${articulo.codArticulo}.webp" class="img-fluid" alt="Foto de ${articulo.nombre}">									
                        </div>
                        <div class="thumb-content">
                            <h4>${articulo.nombre}</h4>									
                            <p class="item-price">${articulo.PVP}€</p>
                            <span class="stock" id="stock-${articulo.codArticulo}">Quedan ${articulo.cantidad} productos en stock</span>
                            <button class="btn btn-primary mx-3 add-to-cart" data-id="${articulo.codArticulo}">Añadir al carrito</button>
                        </div>						
                    </div>
                </div>`;
                
            });

            articlesContainer.innerHTML = articuloItem;

            // Volver a iterar para comprobar el span del stock
            data.forEach(articulo => {
                const stockElement = document.getElementById(`stock-${articulo.codArticulo}`);
                if (parseInt(articulo.cantidad) <= parseInt(articulo.cantidadMinima)) {
                    stockElement.style.display = 'block';
                } else {
                    stockElement.style.display = 'none';
                }
            });
            
            
            
            //#region Eventos del boton añadir
            const botonesAgregarCarrito = document.querySelectorAll(".add-to-cart");
            botonesAgregarCarrito.forEach(boton => {
                boton.addEventListener('click', event => {
                    const articleId = event.currentTarget.dataset.id;
                    console.log(`Agregado el artículo: ${articleId}`);
                    // TODO -- Llamar a funcion que cree el articulo / crear estructura de datos del articulo y mandar como parametro

                    const articulo = data.find(e => e.codArticulo === articleId);
                    let nuevoArticulo;
                    
                    // Si encuentra articulo, creamos objeto y lo añadimos al [] carrito, sino mostramos modal que no hay stock
                    if(articulo && articulo.cantidad > 0) {
                        nuevoArticulo = {
                            id: articulo.codArticulo,
                            nombre: articulo.nombre,
                            precio: articulo.PVP,
                            cantidad: 1
                        }
                        controlarStock(articulo, boton);
                        console.log(nuevoArticulo);
                        agregarAlCarrito(nuevoArticulo);
                        numProductosCesta++;
                        actualizarCesta();
                    } else {
                        // alert("No hay suficiente stock para agregar este artículo al carrito");
                        const stockModal = new bootstrap.Modal(document.getElementById('stock-modal'));
                        stockModal.show();
                        const btnCerrarModal = document.querySelector('.btn-cerrarModal');
                        btnCerrarModal.addEventListener('click', () => {
                            stockModal.hide();
                        });
                    }
                })
            });


        } else {
            console.log("Error en Ajax" + xhr.status);
        }

    });
    
    xhr.open("POST","php/cargarArticulos.php",true);
    xhr.send();
}

// Funcion que quita la cantidad de articulos, y muestra el span cuando baja de la cantidad minima
function controlarStock(articulo, boton) {
    console.log(`Quiero ver esto. Es el stock: ${articulo.cantidad}`);
    const stockControler = boton.parentNode.querySelector('.stock');
    if (articulo.cantidad > 0) {
        articulo.cantidad --;
        stockControler.textContent = `Quedan ${articulo.cantidad} productos en stock`;
        if ( articulo.cantidad <= articulo.cantidadMinima) {            
            stockControler.style.display = 'block';
        }
    } 
    console.log(`Quiero ver esto. Es el stock: ${articulo.cantidad}`);
} 


//#region Ventas

function crearVenta() {


    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {

            if(xhr.responseText === 'ok') {
                console.log("La venta se ha registrado CORRECTAMENTE")

                
            } else {
                console.log(`Ha habido algun problema ${xhr.responseText}`);
            }


        } else {
            console.log(`Error en ajax: ${xhr.status}`);
        }
    })

    xhr.open('POST', 'php/crearVenta.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const envio = `dni=${dni}&codVenta=${codVenta}`
    xhr.send(envio);

}

function crearLinea() {

    carrito.forEach(producto => {

        let codArticulo = producto.id;
        let cantidad = producto.cantidad;
        let precio = producto.cantidad * producto.precio;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState != 4) return;
            if(xhr.status >= 200 && xhr.status < 300) {

                const response = xhr.responseText;
                console.log(response);

            } else {
                console.log(`Error en Ajax al crear una linea: ${xhr.status}`);
            }
        })

        xhr.open('POST', 'php/crearLinea.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        const envio = `codVenta=${codVenta}&codArticulo=${codArticulo}&cantidad=${cantidad}&precio=${precio}`;
        xhr.send(envio);

        actualizarStock(codArticulo,cantidad);
    });

}

//#region Actualizar Stock
function actualizarStock(codArticulo,cantidad) {

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {

            const response = xhr.responseText;
            console.log(response);

        } else {
            console.log(`Ha habido un error en el Ajax a actualizar stock: ${xhr.status}`);
        }
    })
    xhr.open('POST', 'php/actualizarStock.php', true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    xhr.send(`codArticulo=${codArticulo}&cantidad=${cantidad}`);
}

//#region Mostrar Almacen
function verAlmacen() {

    vaciarMain();

    const articlesContainer = document.getElementById('articles-container');
    
    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {
            
            const bd = xhr.responseText;
            const data = JSON.parse(bd);
            console.log(data);
            let articuloItem = ''; 


            data.forEach(articulo => {           

                articuloItem += `
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex align-items-center justify-content-center"">
                        <img src="img/${articulo.codArticulo}.webp" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${articulo.nombre}</h5>
                            <p class="card-text">Código de Producto: ${articulo.codArticulo}</p>
                            <p class="card-text">Precio: ${articulo.PVP}</p>
                            <p class="card-text">Cantidad: ${articulo.cantidad}</p>
                            <span class="text-danger" id='span-${articulo.codArticulo}' style='display:none'>Bajo stock</span>
                            <br><br>
                            <button class="btn btn-primary" onclick="window.location.href = 'mailto:${articulo.correoProveedor}'">Email al proveedor</button>
                        </div>
                        </div>
                    </div>
                </div>`;
                
            });

            articlesContainer.innerHTML = articuloItem;
            data.forEach(articulo => {
                const spanStock = document.getElementById(`span-${articulo.codArticulo}`);
                if (parseInt(articulo.cantidad) <= parseInt(articulo.cantidadMinima)) {
                    spanStock.style.display = 'block';
                } else {
                    spanStock.style.display = 'none';
                }
            });
            

        } else {
            console.log("Error en Ajax" + xhr.status);
        }

    });
    
    xhr.open("POST","php/cargarArticulos.php",true);
    xhr.send();
}

//#region Mostrar Ventas
function verVentas() {

    vaciarMain();
    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = `
    <div class='user-dni'>
        <div>
            <h2>Mi cuenta</h2>
        </div>
        <form id="dniForm" class='d-flex flex-column justify-content-center align-items-center'>
            <div class="inputGroup">
                <input type="text" required id="dniInput">
                <label for="dni" id='dni'>DNI</label>
            </div>
            <div>
                <span class='dniBD text-danger' style='display:none'>El DNI introducido no esta en la Base de Datos</span>
            </div>
            <div class='text-center'>
                <button type='submit' class='btn btn-primary mt-3'>Ver Compras</button>
            </div>
        </form>
    </div>
    `;
    const dniForm = document.getElementById('dniForm');
    dniForm.addEventListener('submit', event => {
        event.preventDefault();
        const dniVentas = document.getElementById('dniInput').value;
        
        console.log(dniVentas);

        const xhr = new XMLHttpRequest();
        console.log(xhr);
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState != 4) return;
            if(xhr.status >= 200 && xhr.status < 300) {

                if(xhr.responseText == 'error') {
                    document.querySelector('.dniBD').style.display = 'block';
                } else {
                    const productos = JSON.parse(xhr.responseText);
                    console.log(productos);
                    mostrarProductos(productos);
                }

            } else {
                console.log("Error en Ajax" + xhr.status);
            }


    });
    xhr.open('POST', 'php/cargarVentas.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(`dni=${dniVentas}`);

    });
}

function mostrarProductos(productos) {
    vaciarMain();
    const articlesContainer = document.getElementById('articles-container');

    const ventasPorCodVenta = {};
            
    // Agrupar artículos por codVenta
    productos.forEach(articulo => {
        if (!ventasPorCodVenta.hasOwnProperty(articulo.codVenta)) {
            ventasPorCodVenta[articulo.codVenta] = [];
        }
        ventasPorCodVenta[articulo.codVenta].push(articulo);
    });
    
    // Crear elementos HTML para cada codVenta
    for (const codVenta in ventasPorCodVenta) {
        if (Object.hasOwnProperty.call(ventasPorCodVenta, codVenta)) {
            const articulosVenta = ventasPorCodVenta[codVenta];
            let articuloItem = '';
            
            // Crear un contenedor para cada codVenta
            const ventaContainer = document.createElement('div');
            ventaContainer.classList.add('codVenta-container');

            articulosVenta.forEach(articulo => {
                // Crear la tarjeta solo si la cantidad es mayor a 0
                if (articulo.cantidad > 0) {  
                    let selectOptions = '';
                    for (let i = 1; i <= articulo.cantidad; i++) {
                        selectOptions += `<option value="${i}">${i}</option>`;   
                    }    

                    let botonDevolucion = '';
                    if(calcularDiasTranscurridos(articulo.fecha) <= 15) {
                        botonDevolucion = `<a href="#" class="btn btn-danger devoluciones" data-id='${articulo.codArticulo}'>Devolver</a>`;
                    }
                    

                    
                    // Agregar la tarjeta al contenedor
                    articuloItem += `
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4 d-flex align-items-center justify-content-center">
                                <img src="img/${articulo.codArticulo}.webp" class="img-fluid rounded-start">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${articulo.nombre}</h5>
                                    <p class="card-text">Cantidad: ${articulo.cantidad}</p>
                                    <p class="card-text">Precio Ud: ${articulo.PVP}</p>
                                    <p class="card-text">Precio Total: ${articulo.PVP * articulo.cantidad}</p>
                                    <select class="form-select cantidad-devolucion" id="cantidadDevolucion-${articulo.codArticulo}">
                                        ${selectOptions}
                                    </select>
                                    ${botonDevolucion}
                                </div>
                            </div>
                        </div>
                    </div>`;
                }
            });

            
            if (articuloItem !== '') {
                ventaContainer.innerHTML = `<h4>Fecha del Pedido: ${articulosVenta[0].fecha}</h4>`;
                ventaContainer.innerHTML += articuloItem;
                articlesContainer.appendChild(ventaContainer);
            }
        }
    }

    const btnDevoluciones = document.querySelectorAll('.devoluciones');

    btnDevoluciones.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            const cardContainer = boton.closest('.card');
            const cantidadSeleccionada = cardContainer.querySelector('select').value;
            hacerDevolucion(id,cantidadSeleccionada);
        })
    });
}

function hacerDevolucion(id, cantidadSeleccionada) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState != 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            if (xhr.responseText == 'ok') {
                const devolucionModal = new bootstrap.Modal(document.getElementById('devolucion-ok'));
                devolucionModal.show();
                const btnCerrarModal = document.querySelector('.btn-cerrarModalDevolucion');
                btnCerrarModal.addEventListener('click', () => {
                    devolucionModal.hide();
                });
            } else {
                console.log("Error en el php: gestionarDevoluciones");
            }
        } else {
            console.log(`Error en el ajax. ${xhr.status}`);
        }
    });

    xhr.open('POST', 'php/gestionarDevolucion.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const envio = `id=${id}&cantidad=${cantidadSeleccionada}`;
    xhr.send(envio);
}



window.addEventListener('load', () => {
    cargarArticulos();
})
