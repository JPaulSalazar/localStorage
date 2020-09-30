//
// Lista de tareas
//

// Modelo.
//array para introducir los objetos de cada tarea
let tareas = [];

//para extraer la informacion guardada
const datosLocalStorage = localStorage.getItem('tareas');

//para evitar errores, si todavia no hay nada guardado
if (datosLocalStorage !== null){
  tareas = JSON.parse(datosLocalStorage);
}

//contador para genrar los ids
let count = 0;

//funcion hecha para añadir tareas
function addTask(nombreTarea, fechaTarea, completoTarea){
  //objeto que contiene las caracteristicas de cada tarea
  const miTarea = {
    id:count,
    nombre:nombreTarea,
    completo:completoTarea,
    //fecha
    date:fechaTarea,
  };

  //agrega nuevas tareas al array
  tareas.push(miTarea);

  //se le suma al contador
  count++;

  //agrega las tareas que acabamos de escribir 
  appendTaskDom(miTarea);

  //guarda en el browser el array
  localStorage.setItem('tareas', JSON.stringify(tareas));

  //para ver en la consola las tareas agregadas
  console.log(tareas);
}

//vista

//llamar a al formulario
const formulario = document.getElementById('new-task-form');

//llamar a la lista
const lista = document.getElementById('task-list');

//funcion agregar la nueva tarea en html
function appendTaskDom(tarea){
  //cada elemento de las lista de tareas
  const item = document.createElement('li');
  item.className = 'task-list_item';
  lista.appendChild(item);

  //checkbox
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', `tarea-${tarea.id}`);
  item.appendChild(checkbox);

  //label
  const label = document.createElement('label');
  label.setAttribute('for', `tarea-${tarea.id}`);
  label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;
  item.appendChild(label);
}

//ir añadiendo los elementos del array ya guardado dentro del local storage en el dom
for (let i = 0; i < tareas.length; i++) {
  appendTaskDom(tareas[i]);
}

//Controlador

formulario.addEventListener('submit', (event) => {
  // Se cancela el comportamiento default del formulario.
  event.preventDefault();
  // Texto introducido por el usuario (formulario.elements[].value)
addTask(formulario.elements[0].value, formulario.elements[1].value, false);

  //se resetea el apartado
  formulario.elements[0].value = '';
  formulario.elements[1].value = '';
});