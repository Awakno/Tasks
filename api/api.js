const express = require("express");
const db = require("./db/db");

const router = express();
const port = 3000;

router.use(express.json());

router.post("/register", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const result = await db.NewUser(email, password);
		if (result) {
			res.send({ success: true });
		} else {
			res.send({ success: false });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			error: "Internal Server Error",
		});
	}
});

router.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const result = await db.GetUser(email, password);
		console.log(result);
		if (result) {
			res.send({ success: true });
		} else {
			res.send({ success: false });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			error: "Internal Server Error",
		});
	}
});

router.listen(port, () => {
	console.log(`Serveur écoutant sur le port ${port}`);
});
