

// =========================
// SELECCIÓN DE SERVICIOS
// =========================

const servicios = document.querySelectorAll(".servicio");
const selectorServicio = document.querySelector("#servicio");

// =========================
// RELACIONAR SERVICIOS
// =========================

function normalizarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

const serviciosFormulario = {
    "consulta dental": "consulta",
    "limpieza dental": "limpieza",
    "blanqueamiento dental": "blanqueamiento",
    "ortodoncia": "ortodoncia",
    "resina dental": "resina",
    "extraccion dental": "extraccion",
    "cirugia de muela del juicio": "cirugia-muela-juicio"
};

// =========================
// SELECCIONAR Y DESELECCIONAR
// =========================

servicios.forEach(function(servicio) {

    servicio.addEventListener("click", function() {

        const titulo = servicio.querySelector("h3").textContent;
        const nombre = normalizarTexto(titulo);
        const valor = serviciosFormulario[nombre];

        if (servicio.classList.contains("seleccionada")) {

            servicio.classList.remove("seleccionada");

            if (selectorServicio.value === valor) {
                selectorServicio.value = "";
            }

            return;
        }

        servicios.forEach(function(otraTarjeta) {
            otraTarjeta.classList.remove("seleccionada");
        });

        servicio.classList.add("seleccionada");

        if (valor) {
            selectorServicio.value = valor;
        }

    });

});

// =========================
// SINCRONIZAR FORMULARIO
// =========================

selectorServicio.addEventListener("change", function() {

    servicios.forEach(function(servicio) {

        const titulo = servicio.querySelector("h3").textContent;
        const nombre = normalizarTexto(titulo);
        const valor = serviciosFormulario[nombre];

        if (valor && valor === selectorServicio.value) {
            servicio.classList.add("seleccionada");
        } else {
            servicio.classList.remove("seleccionada");
        }

    });

});

/* ====== VALIDAR TELEFONO ======*/

const campoTelefono = document.querySelector("#telefono");

campoTelefono.addEventListener("input", function() {

    // Conservar únicamente los números
    const digitos = campoTelefono.value.replace(/\D/g, "");

    // Permitir un máximo de 10 dígitos
    campoTelefono.value = digitos.slice(0, 10);

    // Comprobar la cantidad de dígitos
    if (campoTelefono.value.length !== 10) {

        campoTelefono.setCustomValidity(
            "El teléfono debe tener exactamente 10 dígitos."
        );

    } else {

        campoTelefono.setCustomValidity("");

    }

});

/* ====== VALIDAR CORREO OPCIONAL ======*/

const campoCorreo = document.querySelector("#correo");

/* AVISO CUANDO EL CORREO CAMBIA */
campoCorreo.addEventListener("input", function() {

    // Guardar el correo sin espacios al inicio o al final
    const correo = campoCorreo.value.trim();

    // Si está vacío, permitir continuar
    if (correo === "") {
        campoCorreo.setCustomValidity("");
        return;
    }

    // Revisar si el formato es incorrecto
    if (campoCorreo.validity.typeMismatch) {

        campoCorreo.setCustomValidity(
            "Escribe un correo válido, por ejemplo: nombre@correo.com"
        );

    } else {

        // Quitar el aviso cuando el correo sea correcto
        campoCorreo.setCustomValidity("");

    }

});

/* AVISO AL INTENTAR ENVIAR EL FORMULARIO */
campoCorreo.addEventListener("blur", function() {

    // Revisar el correo cuando la persona salga del campo
    const correo = campoCorreo.value.trim();

    if (correo !== "" && campoCorreo.validity.typeMismatch) {

        campoCorreo.reportValidity();

    }

});

/* =========================
   FECHA PREFERIDA DE CITA
========================= */

const fechaCita = document.querySelector("#fechaCita");

// Obtener la fecha local de hoy
const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");

// Establecer hoy como fecha mínima
fechaCita.min = `${anio}-${mes}-${dia}`;



/* ====== PREGUNTAS FRECUENTES ======*/

const botonesPregunta =
document.querySelectorAll(".boton-pregunta");

botonesPregunta.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const pregunta =
        boton.parentElement;
        const respuesta =
        pregunta.nextElementSibling;

        if
        (respuesta.style.display ===
            "block") {

        respuesta.style.display =
        "none";

        boton.textContent =
        "+";

            } else {

            botonesPregunta.forEach(function(otroBoton) {

                const
                otraPregunta =
                otroBoton.parentElement;

                const
                otraRespuesta =
                otraPregunta.nextElementSibling;

                otraRespuesta.style.display =
                "none";

                otroBoton.textContent = "+";
            });


            respuesta.style.display =
            "block";
                    boton.textContent =
                    "-";

        }
    });
});

/* ====== CARRUSEL DEL HERO ======*/

const imagenCarrusel =
document.querySelector("#imagenCarrusel");

const imagenes = [ 
"imagenes/dentista.jpg",
"imagenes/dentista2.jpg",
"imagenes/ayudante1.jpg",
"imagenes/espacio1.jpg",
"imagenes/procedimiento1.jpg",
"imagenes/clinica.jpg"

];

let indice = 0;

/* ====== CAMBIAR IMAGEN ======*/

function cambiarImagen() {
    imagenCarrusel.style.opacity
    = "0";

    setTimeout(function() {

        indice++;

        if (indice >=
            imagenes.length) {
                indice = 0;
            }

        imagenCarrusel.src =
        imagenes[indice];

        imagenCarrusel.style.opacity =
        "1";


        
    }, 500);
    
}

/* ====== CAMBIO AUTOMATICO ======*/

setInterval(cambiarImagen, 2500);

/* =========================
   FORMULARIO DE CITAS
   ENVÍO POR WHATSAPP
========================= */

const formularioCita = document.querySelector("#formularioCita");

formularioCita.addEventListener("submit", function(event) {

    // Evitar que la página se recargue
    event.preventDefault();

    /* =========================
       OBTENER DATOS DEL PACIENTE
    ========================= */

    const nombre = document.querySelector("#nombre").value.trim();

    const telefono = document.querySelector("#telefono").value.trim();

    const correo = document.querySelector("#correo")?.value.trim()
        || "No proporcionado";

    const servicio = document.querySelector("#servicio").value;

    const fecha = document.querySelector("#fechaCita").value;

    const motivo = document.querySelector("#mensaje").value.trim()
        || "No especificado";


    /* =========================
       PREPARAR MENSAJE
    ========================= */

    const mensajeWhatsApp = `
Hola, quisiera solicitar una cita dental.

Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${correo}
Tratamiento: ${servicio}
Fecha preferida: ${fecha}

Motivo de la cita:
${motivo}

¿Podrían confirmarme la disponibilidad, por favor?
`;


    /* =========================
       ABRIR WHATSAPP
    ========================= */

    const numeroClinica = "526941195909";

    const enlace = `https://wa.me/${numeroClinica}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    window.open(enlace, "_blank");

});
