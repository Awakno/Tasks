let TaskInput = document.getElementById("input");
let AddButton = document.getElementById("submit");
let Div = document.getElementById("list-task");
let AllSup = document.getElementById("all-sup");
let Title = document.getElementById("title");

TaskInput.addEventListener("mouseover", () => {
	if (TaskInput.value == "Votre tache à faire...") {
		TaskInput.value = "";
		let ParagraphError = document.getElementById("error");
		ParagraphError.innerText = "";
	}
});

TaskInput.addEventListener("mouseout", () => {
	if (TaskInput.value == "") {
		TaskInput.value = "Votre tache à faire...";
		let ParagraphError = document.getElementById("error");
		ParagraphError.innerText = "";
	}
});

function AddTask(taskText) {
	if (taskText !== "" && taskText !== "Votre tache à faire...") {
		TaskInput.value = "";
		let Newtask = document.createElement("li");
		Newtask.innerText = taskText;
		Newtask.classList.add("task");
		Newtask.id = `task-${taskText}`;

		let Div = document.getElementById("list-task");
		if (Div) {
			Div.appendChild(Newtask);

			// Ajouter la tâche au localStorage
			let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
			tasks.push(taskText);
			localStorage.setItem("tasks", JSON.stringify(tasks));
		} else {
			console.log("Le conteneur (Div) n'est pas défini.");
		}
	} else {
		let ParagraphError = document.getElementById("error");
		ParagraphError.innerText = "Veuillez entrer une tâche à faire.";
	}
}

window.onload = function() {
	if (isPrivateMode) {
		if (window.location.href = "/") {
			window.location.href = "error.html";
		}
		
	}
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	let Div = document.getElementById("list-task");

	if (Div) {
		tasks.forEach(function(taskText) {
			let Newtask = document.createElement("li");
			Newtask.innerText = taskText;
			Newtask.classList.add("task");
			Newtask.id = `task-${taskText}`;
			Div.appendChild(Newtask);
		});
	} else {
		console.log("Le conteneur (Div) n'est pas défini.");
	}
}

AddButton.addEventListener("click", () => {
	AddTask(TaskInput.value);
});

document.addEventListener("keydown", e => {
	if (e.key == "Enter") {
		AddTask(TaskInput.value);
	}
});

function isPrivateMode() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return false;
  } catch (e) {
    return true;
  }
}

document.addEventListener("click", e => {
	if (e.target.id == `task-${e.target.innerText}` || e.target.classList.contains("task")) {
		console.log("1");
		e.target.classList.add("done");
		e.target.classList.remove("task");
		setTimeout(() => {
			e.target.remove();
		}, 100);
	}
});

document.addEventListener("touchstart", e => {
	if (e.target.id == `task-${e.target.innerText}`) {
		e.target.classList.add("done");
		e.target.classList.remvoe("task");
		setTimeout(() => {
			e.target.remove();
		}, 100);
	}
});

AllSup.addEventListener("click", () => {
	console.log(Div.children);
	for (let i = 0; i < Div.children.length; i++) {
		if (Div.children[i].classList.contains("task"))
			Div.children[i].remove();
	}
});

/* document.addEventListener("DOMContentLoaded", () => {
	fetch("./data/data.json")
		.then(response => {
			if (!response.ok) {
				throw new Error(
					"Erreur lors de la récupération du fichier JSON"
				);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			let jsonData = data;
			// Accédez directement à la propriété "Username"
			if (
				jsonData &&
				jsonData.Username &&
				Array.isArray(jsonData.Username)
			) {
				// Assurez-vous que jsonData.Username est un tableau
				for (let i = 0; i < jsonData.Username.length; i++) {
					// Appel à la fonction AddTask avec la tâche actuelle
					AddTask(jsonData.Username[i]);
				}
			} else {
				console.log(
					"La propriété 'Username' n'est pas définie ou n'est pas un tableau dans le JSON."
				);
			}
		})
		.catch(error => {
			console.log(
				"Erreur lors de la récupération du fichier JSON :",
				error
			);
		});
});

 */

document.addEventListener("DOMContentLoaded", () => {
	new Typewriter("#title", {
		strings: ["Un Blocnote ?", "Une Checklist ? ", "Une Liste de tâches ?"],
		autoStart: true,
		loop: true,
		cursor: "|",
		delay: 50,
	});
});


Title.addEventListener("click", () => {
	const jsConfetti = new JSConfetti({ Title });
	jsConfetti.addConfetti({
		emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
		emojiSize: 100,
		confettiNumber: 30,
		confettiRadius: 6,
	});
});
