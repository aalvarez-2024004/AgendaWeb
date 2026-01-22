// Obtener elementos del HTML
let nombreInput = document.getElementById('txtNombre');
let descInput = document.getElementById('txtDescripcion');
let categoriaSelect = document.getElementById('categorias');
let botonAgregar = document.getElementById('btnAgregar');
let listaPendientes = document.getElementById('lista-pendientes');

// Array de tareas
let tareas = [];

const prioridadOrden = {
    "Importante": 1,
    "Intermedia": 2,
    "Noimportante": 3
};


// Función para mostrar todas las tareas
function mostrarTareas() {
    listaPendientes.innerHTML = '';

    // ORDENAR POR PRIORIDAD
    tareas.sort((a, b) => {
        return prioridadOrden[a.categoria] - prioridadOrden[b.categoria];
    });

    for (let i = 0; i < tareas.length; i++) {
        let tarea = tareas[i];

        let tarjeta = document.createElement('div');
        tarjeta.className = `tarea ${tarea.categoria}`;
        tarjeta.innerHTML = `
            <h3>${tarea.nombre}</h3>
            <p>${tarea.descripcion}</p>
            <small>Prioridad: ${tarea.categoria}</small>
            <div class="acciones">
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </div>
        `;

        // ELIMINAR
        tarjeta.querySelector('.eliminar').onclick = function () {
            tareas.splice(i, 1);
            mostrarTareas();
        };

        // EDITAR
        tarjeta.querySelector('.editar').onclick = function () {
            nombreInput.value = tarea.nombre;
            descInput.value = tarea.descripcion;
            categoriaSelect.value = tarea.categoria;

            botonAgregar.textContent = 'Actualizar';

            botonAgregar.onclick = function () {
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
        };

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
