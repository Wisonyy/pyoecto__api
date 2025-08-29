// Declaramos una función asíncrona para poder usar 'await' al hacer peticiones HTTP
async function consultarRuc() {
    // Obtenemos el valor ingresado por el usuario en el input con id "ruc"
    const ruc = document.getElementById("ruc").value;

    // Obtenemos el elemento donde mostraremos el resultado o los mensajes
    const resultado = document.getElementById("resultado");

    // Token de acceso que se obtiene al registrarse en consultasperu.com
    const token = "33ea060565b4471005064c08932a36d928c66e617d2295b733a3163b928557d3"; // Reemplaza esta cadena por tu token real

    // Validamos que el RUC ingresado tenga 11 dígitos y sea numérico
    if (ruc.length !== 11 || isNaN(ruc)) {
        resultado.innerHTML = '<p style="color:red;">Ingrese un RUC válido de 11 dígitos.</p>';
        return;
    }

    // Mostramos un mensaje temporal mientras se realiza la consulta
    resultado.innerHTML = "Consultando...";

    try {
        // Realizamos una petición POST a la API de ConsultasPeru
        const response = await fetch("https://api.consultasperu.com/api/v1/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                type_document: "ruc",
                document_number: ruc
            })
        });

        const json = await response.json();

        if (!json.success) {
            resultado.innerHTML = "<p style='color:red;'>RUC no encontrado o token inválido.</p>";
            return;
        }

        const data = json.data;

        resultado.innerHTML = `
            <p><strong>RUC:</strong> ${data.number}</p>
            <p><strong>Razón Social:</strong> ${data.name}</p>
            <p><strong>Línea de negocio:</strong> ${data.business_line}</p>
            <p><strong>Estado:</strong> ${data.status}</p>
            <p><strong>Condición de domicilio:</strong> ${data.domicile_conditions}</p>
            <p><strong>Dirección:</strong> ${data.address}</p>
            <p><strong>Departamento:</strong> ${data.department}</p>
            <p><strong>Provincia:</strong> ${data.province}</p>
            <p><strong>Distrito:</strong> ${data.district}</p>
            <p><strong>Zona:</strong> ${data.zone}</p>
            <p><strong>Tipo de persona:</strong> ${data.person_type}</p>
            <p><strong>Fecha de creación:</strong> ${data.date_creation}</p>
            <p><strong>Última actualización:</strong> ${data.date_update}</p>
            <p><strong>Buen contribuyente:</strong> ${data.es_buen_contribuyente ? 'SI' : 'NO'}</p>
            <p><strong>Agente de Retención:</strong> ${data.es_agente_de_retencion ? 'SI' : 'NO'}</p>
        `;
    } catch (error) {
        resultado.innerHTML = '<p style="color:red;">Error al conectar con la API.</p>';

        console.error("Error en la solicitud:", error);
    }
}