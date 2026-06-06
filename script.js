document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todos los formularios de compra dentro de las tarjetas
    const checkoutFormularios = document.querySelectorAll(".checkout-form");

    checkoutFormularios.forEach(formulario => {
        formulario.addEventListener("submit", async (evento) => {
            evento.preventDefault(); // Evita que la página se recargue

            const botonEnvio = formulario.querySelector(".btn-buy");
            const textoOriginal = botonEnvio.innerHTML;

            // Cambiamos el estado del botón visualmente para dar feedback al usuario
            botonEnvio.disabled = true;
            botonEnvio.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Procesando...</span>';

            // Recolectamos los datos del formulario de la tarjeta actual
            const formData = new FormData(formulario);
            
            // Convertimos los datos a un objeto JSON limpio
            const datosCompra = Object.fromEntries(formData.entries());

            try {
                // Enviamos los datos al puente FormSubmit (reemplaza por tu URL final luego)
                const respuesta = await fetch(formulario.action, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(datosCompra)
                });

                if (respuesta.ok) {
                    // Feedback visual de éxito extremo
                    botonEnvio.style.backgroundColor = "#25d366"; // Verde WhatsApp
                    botonEnvio.style.borderColor = "#25d366";
                    botonEnvio.style.color = "#ffffff";
                    botonEnvio.innerHTML = '<span><i class="fas fa-check-circle"></i> ¡Pedido Registrado!</span>';
                    
                    // Reseteamos el formulario por si quieren comprar otra
                    formulario.reset();
                } else {
                    throw new Error("Error en el servidor de envío");
                }

            } catch (error) {
                // Si algo falla, avisamos al usuario y restauramos el botón
                alert("Hubo un problema al procesar tu orden. Por favor, inténtalo de nuevo.");
                botonEnvio.disabled = false;
                botonEnvio.innerHTML = textoOriginal;
            }
        });
    });
});