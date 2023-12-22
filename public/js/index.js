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
			fetch("http://localhost:5500/addtask", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: sessionStorage.getItem("email"),
					password: sessionStorage.getItem("password"),
					task: taskText,
				}),
			});
		} else {
			console.log("Le conteneur (Div) n'est pas défini.");
		}
	} else {
		let ParagraphError = document.getElementById("error");
		ParagraphError.innerText = "Veuillez entrer une tâche à faire.";
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

document.addEventListener("click", e => {
	if (e.target.id == `task-${e.target.innerText}`) {
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

document.addEventListener("DOMContentLoaded", function () {
	// Récupérer les informations utilisateur depuis le sessionStorage
	const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	let p = document.createElement("p");
	p.innerText(userInfo.email);
	// Vérifier si les informations utilisateur existent
	if (userInfo) {
		const tasks = userInfo.tasks;

		// Assurez-vous que tasks est un tableau
		if (Array.isArray(tasks)) {
			// Parcourez le tableau des tâches
			for (let i = 0; i < tasks.length; i++) {
				// Appel à la fonction AddTask avec la tâche actuelle
				AddTask(tasks[i]);
			}
		} else {
			console.error('La propriété "tasks" n\'est pas un tableau.');
		}
	} else {
		// Rediriger vers la page de connexion si les informations ne sont pas disponibles
		window.location.href = "http://127.0.0.1:5500/public/html/login.html";
	}
});

Title.addEventListener("click", () => {
	const jsConfetti = new JSConfetti({ Title });
	jsConfetti.addConfetti({
		emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
		emojiSize: 20,
		confettiNumber: 100,
		confettiRadius: 6,
	});
});
