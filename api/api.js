const express = require("express");
const db = require("./db/db");
const cors = require("cors");
const router = express();
const port = 5500;

router.use(express.json());
router.use(cors());

router.post("/register", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const result = await db.NewUser(email, password);
		console.log("result", result);
		
		res.send({ success: true });
		
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
		const task = await db.GetTask(email, password);
		console.log(result);
		if (result) {
			res.send({ success: true ,"tasks": task });
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

router.post("/addtask", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const taskText = req.body.task;
	const result = await db.AddTask(email, password, taskText);
	if (result) {
		res.send({ success: true });
	} else {
		res.send({ success: false });
	}

})

router.listen(port, () => {
	console.log(`Serveur écoutant sur le port ${port}`);
});
