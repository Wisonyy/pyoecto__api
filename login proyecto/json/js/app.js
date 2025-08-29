$(document).ready(function () {
    // Cargar datos generales desde iestp.json
    $.ajax({
        url: "data/iestp.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $("#carrera").text(data.carrera);
            $("#practica").text(data.practica);
            $("#alumno").text(data.alumno);
            $("#ud").text(data.ud);
        },
        error: function () {
            console.error("Error al cargar iestp.json");
        }
    });

    // Cargar lista de alumnos desde alumnos.json
    $.ajax({
        url: "data/alumnos.json",
        method: "GET",
        dataType: "json",
        success: function (alumnos) {
            alumnos.forEach(function (alumno) {
                const fila = `
                    <tr>
                        <td>${alumno.dni}</td>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.apellido}</td>
                        <td>${alumno.edad}</td>
                    </tr>`;
                $("#tabla-Alumnos tbody").append(fila);
            });
        },
       
    });

    // Cargar lista de cursos desde curso.json
    $.ajax({
        url: "data/cursos.json",
        method: "GET",
        dataType: "json",
        success: function (cursos) {
            cursos.forEach(function (curso) {
                const fila = `
                    <tr>
                        <td>${curso.id_curso}</td>
                        <td>${curso.nombre_curso}</td>
                        <td>${curso.n_horas}</td>
                    </tr>`;
                $("#tabla-Cursos tbody").append(fila);
            });
        },
        
    });
        // Cargar lista de docentes desde docentes.json
// Cargar lista de docentes desde docentes.json
$.ajax({
    url: "data/docentes.json",
    method: "GET",
    dataType: "json",
    success: function (docentes) {
        docentes.forEach(function (docente) {
            const fila = `
                <tr>
                    <td>${docente.dni}</td>
                    <td>${docente.nombre}</td>
                    <td>${docente.apellido}</td>
                    <td>${docente.curso}</td>
                </tr>`;
            $("#tabla-Docentes tbody").append(fila);
        });
    },
    error: function () {
        console.error("Error al cargar docentes.json");
    }
});



});
