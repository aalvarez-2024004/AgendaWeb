// Obtener elementos del HTML
let nombreInput = document.getElementById('txtNombre');
let descInput = document.getElementById('txtDescripcion');
let categoriaSelect = document.getElementById('categorias');
let botonAgregar = document.getElementById('btnAgregar');
let listaPendientes = document.getElementById('lista-pendientes');

// Array de tareas
let tareas = [];

// Función para mostrar todas las tareas
function mostrarTareas() {
    listaPendientes.innerHTML = '';

    for (let i = 0; i < tareas.length; i++) {
        let tarea = tareas[i];

        let tarjeta = document.createElement('div');
        tarjeta.className = 'tarea ' + tarea.categoria.replace(' ', ''); // clase simple
        tarjeta.innerHTML = `
            <h3>${tarea.nombre}</h3>
            <p>${tarea.descripcion}</p>
            <div class="acciones">
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </div>
        `;

        // Botón eliminar
        tarjeta.querySelector('.eliminar').addEventListener('click', function() {
            tareas.splice(i, 1);
            mostrarTareas();
        });

        // Botón editar
        tarjeta.querySelector('.editar').addEventListener('click', function() {
            nombreInput.value = tarea.nombre;
            descInput.value = tarea.descripcion;
            categoriaSelect.value = tarea.categoria;

            // Al presionar agregar mientras se edits, se actualiza la tarea
            botonAgregar.onclick = function() {
                tarea.nombre = nombreInput.value;
                tarea.descripcion = descInput.value;
                tarea.categoria = categoriaSelect.value;

                nombreInput.value = '';
                descInput.value = '';
                categoriaSelect.value = 'Importante';

                botonAgregar.textContent = 'Agregar';
                botonAgregar.onclick = agregarTarea;

                mostrarTareas();
            };

            botonAgregar.textContent = 'Actualizar';
        });

        listaPendientes.appendChild(tarjeta);
    }
}

// Función para agregar tarea nueva
function agregarTarea() {
    let nombre = nombreInput.value;
    let descripcion = descInput.value;
    let categoria = categoriaSelect.value;

    if (nombre === '' || descripcion === '') {
        alert('Completa todos los campos por favor :D');
        return;
    }

    tareas.push({ nombre: nombre, descripcion: descripcion, categoria: categoria });

    nombreInput.value = '';
    descInput.value = '';
    categoriaSelect.value = 'Importante';

    mostrarTareas();
}

// Evento click del botón
botonAgregar.onclick = agregarTarea;
