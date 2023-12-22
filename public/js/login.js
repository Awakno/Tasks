let login_button = document.getElementById("login-button");

login_button.addEventListener("click", () => {
	let email = document.getElementById("login-email");
	let password = document.getElementById("login-password");
	let email_error = document.getElementById("email-error");
	let pass_error = document.getElementById("password-error");
	email_error.innerText = "";
	pass_error.innerText = "";
	if (email.value == "") {
		email_error.innerText = "Le champ email ne doit pas être vide";
	}
	if (password.value == "") {
		pass_error.innerText = "Le champ mot de passe ne doit pas être vide";
	}
	if (email.value != "" && password.value != "") {
		fetch("http://localhost:5500/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
            })
            .then((res) => {
                if (res.status === 200) {
                return res.json();
                } else {
                alert("Erreur de requête");
                }
            })
            .then((data) => {
                if (data.success === true) {
                // Stockez les informations utilisateur dans le sessionStorage
                sessionStorage.setItem("userInfo", JSON.stringify(email, password,data.tasks));

                // Rediriger vers la page du tableau de bord
                window.location.href = "http://127.0.0.1:5500/public/html/index.html";
                } else {
                alert("Email ou mot de passe incorrect");
                }
            })
            .catch((error) => {
                console.error(error);
            });
                }
});
