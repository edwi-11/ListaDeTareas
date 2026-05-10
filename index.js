let editingTaskId = null;

function handleFormSubmit(event) {
	event.preventDefault();

	const formData = new FormData(event.target);
	const task = Object.fromEntries(formData);
	
	const ulContainer = document.getElementById("task-list-container");

	if(editingTaskId){
		const existingTask = document.getElementById(editingTaskId);

		existingTask.querySelector("h3").textContent = task.title;
		existingTask.querySelector("p").textContent = task.description;

		alert("La tarea se actualizó correctamente");

		editingTaskId = null;

		document.getElementById("NuevaTarea").textContent = "Nueva Tarea";

        document.querySelector("#agregar button").innerHTML ='<i class="fa-solid fa-plus"></i> Agregar Tarea';

		document.getElementById("cancelar").style = "none";

		event.target.reset();

		return;
	}

	const existingTitles = document.querySelectorAll(".task-content h3");

const duplicatedTask = [...existingTitles].some(title => title.textContent.toLowerCase() === task.title.toLowerCase());

if(duplicatedTask){
	alert("Ya existe una tarea con ese título");
	return;
}


	task.id = Date.now();

	const taskElement = createTaskElement(task);

	ulContainer.appendChild(taskElement);

	event.target.reset();

	ulContainer.appendChild(taskElement);
	// ulContainer.innerHTML = taskElement;
}

function createTaskElement (task) {
	const divTaskContent = document.createElement("div");
	divTaskContent.classList.add("task-content");

	const h3Title = document.createElement("h3");
	h3Title.textContent = task.title;
	const pDescription = document.createElement("p");
	pDescription.textContent = task.description;

	divTaskContent.appendChild(h3Title);
	divTaskContent.appendChild(pDescription);

	const divTaskAction = document.createElement("div");
	divTaskAction.classList.add("task-actions");
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Eliminar";
	deleteButton.style.background = "linear-gradient(135deg, #ff6b6b, #ff8e8e)";
	deleteButton.style.borderRadius = "5px";
	deleteButton.style.border = "none";
	deleteButton.addEventListener("click", () => deleteTaskElement(task.id))

	divTaskAction.appendChild(deleteButton);

	const li = document.createElement("li");

	li.style.background = "rgba(255,255,255,0.18)";
	li.classList.add("task-item");
	li.id = task.id;

	li.appendChild(divTaskContent);
	li.appendChild(divTaskAction);

	const updateButton = document.createElement("button")
	updateButton.textContent = "Actualizar"

	updateButton.style.background = "linear-gradient(135deg,#3b82f6,#06b6d4)";
	updateButton.style.border = "none";
	updateButton.style.borderRadius = "5px"

	updateButton.addEventListener("click", () => loadTaskToForm(task));

	divTaskAction.appendChild(updateButton);

// 	const liTemplate = `
// <li id="${task.id}" class="task-item">
// 	<div class="task-content">
// 			<h3>${task.title}</h3>
// 			<p>${task.description}</p>
// 	</div>
// 	<div class="task-actions">
// 			<button onclick="deleteTaskElement(${task.id})">Eliminar</button>
// 	</div>
// </li>`;

// 	return liTemplate;

	return li;
}

function loadTaskToForm(task){
	document.getElementById("NuevaTarea").textContent = "Actualizar Tarea";
   
	document.querySelector("#agregar button").innerHTML ='<i class="fa-solid fa-pen"></i> Actualizar';

	document.getElementById("cancelar").style.display = "block";
	
	document.querySelector('input[name="title"]').value = task.title;

	document.querySelector('textarea[name="description"]').value = task.description;

	editingTaskId = task.id;
}

function deleteTaskElement(taskId) {
	const li = document.getElementById(taskId);
	li.remove();
}

document.getElementById("cancelar")
.addEventListener("click", () => {

	document.querySelector('input[name="title"]').value = "";

	document.querySelector('textarea[name="description"]').value = "";

	editingTaskId = null;

	alert("Se ha cancelado la acción");

	document.getElementById("NuevaTarea").textContent =
	"Nueva Tarea";

	document.querySelector("#agregar button").innerHTML =
	'<i class="fa-solid fa-plus"></i> Agregar Tarea';

	document.getElementById("cancelar").style.display =
	"none";
});

