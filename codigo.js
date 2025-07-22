var informacionVisible = false;
var datosCalidadAire = {};
var imagenesVehiculos = {};
var modalCreadores = false;

document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
});

function inicializarAplicacion() {
    configurarImagenesVehiculos();
    actualizarCalidadAire();
    return true;
}

function configurarImagenesVehiculos() {
    imagenesVehiculos = {
        motocicleta1: [
            "img/0001.jpg",
            "img/0002.jpg",
            "img/0003.jpg"
        ],
        motocicleta2: [
            "img/0004.jpg",
            "img/0005.jpg",
            "img/0006.jpg"
        ],
        automovil1: [
            "img/0007.jpg",
            "img/0008.jpg",
            "img/0009.jpg"
        ],
        automovil2: [
            "img/0010.jpg",
            "img/0011.jpg",
            "img/0012.jpg"
        ],
        busUrbano: [
            "img/0013.jpg",
            "img/0014.jpg",
            "img/0015.jpg"
        ],
        camion: [
            "img/0016.jpg",
            "img/0017.jpg",
            "img/0018.jpg"
        ]
    };
    return imagenesVehiculos;
}

function mostrarInformacion() {
    var contenidoInfo = document.getElementById('informacionCalidad');
    var botonInfo = document.querySelector('.boton-informacion');
    
    if (informacionVisible == false) {
        contenidoInfo.classList.add('mostrar');
        botonInfo.innerHTML = '<i class="bi bi-info-circle me-2"></i>Ocultar información';
        informacionVisible = true;
        return 'mostrado';
    } else {
        contenidoInfo.classList.remove('mostrar');
        botonInfo.innerHTML = '<i class="bi bi-info-circle me-2"></i>¿Qué es la calidad del aire?';
        informacionVisible = false;
        return 'ocultado';
    }
}

function mostrarCreadores() {
    var modal = document.getElementById('modalCreadores');
    
    if (modalCreadores == false) {
        modal.classList.add('mostrar');
        modalCreadores = true;
        document.body.style.overflow = 'hidden';
        return 'modal_mostrado';
    }
    
    return 'modal_ya_visible';
}

function cerrarCreadores() {
    var modal = document.getElementById('modalCreadores');
    
    if (modalCreadores == true) {
        modal.classList.remove('mostrar');
        modalCreadores = false;
        document.body.style.overflow = 'auto';
        return 'modal_cerrado';
    }
    
    return 'modal_ya_cerrado';
}

document.addEventListener('click', function(evento) {
    var modal = document.getElementById('modalCreadores');
    
    if (evento.target === modal && modalCreadores == true) {
        cerrarCreadores();
    }
});

document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Escape' && modalCreadores == true) {
        cerrarCreadores();
    }
});

function procesarImagenesVehiculo(tipoVehiculo, contenedorImagenes) {
    var contador = 0;
    var imagenesArray = imagenesVehiculos[tipoVehiculo];
    
    while (contador < imagenesArray.length) {
        var imagen = document.createElement('img');
        imagen.src = imagenesArray[contador];
        imagen.alt = tipoVehiculo;
        contenedorImagenes.appendChild(imagen);
        contador++;
    }
    
    return contador;
}

function obtenerDatosRestriccion(tipoVehiculo) {
    var datosRestriccion = {
        estaRestringido: false,
        mensaje: '',
        clase: ''
    };
    
    switch (tipoVehiculo) {
        case 'motocicleta1':
            datosRestriccion.estaRestringido = true;
            datosRestriccion.mensaje = '🚫 SU VEHÍCULO ESTÁ RESTRINGIDO HOY';
            datosRestriccion.clase = 'restriccion-denegada';
            break;
        case 'motocicleta2':
            datosRestriccion.estaRestringido = true;
            datosRestriccion.mensaje = '🚫 SU VEHÍCULO ESTÁ RESTRINGIDO HOY';
            datosRestriccion.clase = 'restriccion-denegada';
            break;
        case 'automovil1':
            datosRestriccion.estaRestringido = false;
            datosRestriccion.mensaje = '✅ SU VEHÍCULO PUEDE CIRCULAR';
            datosRestriccion.clase = 'restriccion-permitida';
            break;
        case 'automovil2':
            datosRestriccion.estaRestringido = true;
            datosRestriccion.mensaje = '🚫 SU VEHÍCULO ESTÁ RESTRINGIDO HOY';
            datosRestriccion.clase = 'restriccion-denegada';
            break;
        case 'busUrbano':
            datosRestriccion.estaRestringido = true;
            datosRestriccion.mensaje = '🚫 SU VEHÍCULO ESTÁ RESTRINGIDO HOY';
            datosRestriccion.clase = 'restriccion-denegada';
            break;
        case 'camion':
            datosRestriccion.estaRestringido = true;
            datosRestriccion.mensaje = '🚫 SU VEHÍCULO ESTÁ RESTRINGIDO HOY';
            datosRestriccion.clase = 'restriccion-denegada';
            break;
        default:
            datosRestriccion.mensaje = 'Seleccione un tipo de vehículo';
            datosRestriccion.clase = '';
            break;
    }
    
    return datosRestriccion;
}

function mostrarRestriccion() {
    var tipoVehiculo = document.getElementById('vehiculo').value;
    var contenedorResultado = document.getElementById('resultado');
    var contenedorImagenes = document.getElementById('contenedorImagenes');

    contenedorImagenes.innerHTML = '';
    
    if (tipoVehiculo == '') {
        contenedorResultado.classList.remove('mostrar');
        return false;
    }
  
    if (imagenesVehiculos[tipoVehiculo]) {
        procesarImagenesVehiculo(tipoVehiculo, contenedorImagenes);
    }

    var datosRestriccion = obtenerDatosRestriccion(tipoVehiculo);
 
    contenedorResultado.innerHTML = '<h5>' + datosRestriccion.mensaje + '</h5>';
    contenedorResultado.className = 'resultado-restriccion mostrar ' + datosRestriccion.clase;
    
    return datosRestriccion.estaRestringido;
}

function calcularEstadoCalidad(valorIca) {
    var estadoCalidad = '';
    var descripcionCalidad = '';
    var colorCirculo = '';
    
    switch (true) {
        case (valorIca <= 50):
            estadoCalidad = 'BUENA';
            descripcionCalidad = 'La calidad del aire es satisfactoria';
            colorCirculo = '#4caf50';
            break;
        case (valorIca <= 100):
            estadoCalidad = 'MODERADA';
            descripcionCalidad = 'La calidad del aire es aceptable';
            colorCirculo = '#ffeb3b';
            break;
        case (valorIca <= 150):
            estadoCalidad = 'NOCIVA';
            descripcionCalidad = 'Grupos sensibles pueden verse afectados';
            colorCirculo = '#ff9800';
            break;
        case (valorIca <= 200):
            estadoCalidad = 'MALA';
            descripcionCalidad = 'Todos pueden verse afectados';
            colorCirculo = '#f44336';
            break;
        default:
            estadoCalidad = 'MUY MALA';
            descripcionCalidad = 'Riesgo grave para todos';
            colorCirculo = '#9c27b0';
            break;
    }
    
    return {
        estado: estadoCalidad,
        descripcion: descripcionCalidad,
        color: colorCirculo
    };
}

function actualizarElementosDOM(valorIca, datosCalidad) {
    var elementoValor = document.getElementById('valorIca');
    var elementoEstado = document.getElementById('estadoCalidad');
    var elementoDescripcion = document.getElementById('descripcionCalidad');
    var circuloAire = document.querySelector('.circulo-aire');
    
    var contador = 0;
    var elementos = [elementoValor, elementoEstado, elementoDescripcion, circuloAire];
    
    while (contador < elementos.length) {
        if (elementos[contador]) {
            switch (contador) {
                case 0:
                    elementos[contador].textContent = valorIca;
                    break;
                case 1:
                    elementos[contador].textContent = datosCalidad.estado;
                    elementos[contador].style.color = datosCalidad.color;
                    break;
                case 2:
                    elementos[contador].textContent = datosCalidad.descripcion;
                    break;
                case 3:
                    elementos[contador].style.backgroundColor = datosCalidad.color;
                    break;
            }
        }
        contador++;
    }
    
    return true;
}

function actualizarCalidadAire() {
    var valorIca = Math.floor(Math.random() * (136 - 105 + 1)) + 105;
    var datosCalidad = calcularEstadoCalidad(valorIca);
    
    datosCalidadAire = {
        ica: valorIca,
        estado: datosCalidad.estado,
        descripcion: datosCalidad.descripcion,
        color: datosCalidad.color
    };
    
    var resultado = actualizarElementosDOM(valorIca, datosCalidad);
    
    return resultado;
}

function validarFormulario() {
    var vehiculoSeleccionado = document.getElementById('vehiculo').value;
    var esValido = false;
    
    switch (vehiculoSeleccionado) {
        case 'motocicleta1':
        case 'motocicleta2':
        case 'automovil1':
        case 'automovil2':
        case 'busUrbano':
        case 'camion':
            esValido = true;
            break;
        default:
            esValido = false;
            break;
    }
    
    return esValido;
}