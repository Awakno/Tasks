const config = require("../config.json");
const { MongoClient } = require("mongodb");
const uri =
	"mongodb+srv://user:" +
	config.password +
	"@cluster0.r2obzqu.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function NewUser(email, password) {
	try {
		const client = await MongoClient.connect(uri);
		const db = client.db();

		const result = await db
			.collection("tasks")
			.insertOne({ email, password });

		client.close();

		if (result.insertedCount === 1) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error(
			"Erreur lors de la création d'un nouvel utilisateur:",
			error
		);
		throw new Error("Erreur lors de la création d'un nouvel utilisateur");
	}
}

async function GetUser(email, password) {
	try {
		const client = await MongoClient.connect(uri);
		const db = client.db();

		const result = await db
			.collection("tasks")
			.findOne({ email, password });

		client.close();

		if (result === null) {
			console.log("is false");
			return false;
		} else {
			console.log("is true");
			return true;
		}
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de l'utilisateur:",
			error
		);
		throw new Error("Erreur lors de la récupération de l'utilisateur");
	}
}

async function GetTask(email, password) {
	try {
		const client = await MongoClient.connect(uri);
		const db = client.db();
		const result = await db
			.collection("tasks")
			.findOne({ email, password });
		client.close();
		if (result.tasks != []) {
			return result.tasks;
		} else {
			return [];
		}
	} catch (error) {
		console.error(
			"Erreur lors de la création d'un nouvel utilisateur:",
			error
		);
		throw new Error("Erreur lors de la création d'un nouvel utilisateur");
	}
}

async function AddTask(email, password, task) {
	try {
		const client = await MongoClient.connect(uri);
		const db = client.db();
		const result = await db
			.collection("tasks")
			.updateOne({ email, password }, { $push: { tasks: task } });
		client.close();
		console.log(result);
		if (result.modifiedCount === 1) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error(
			"Erreur lors de la création d'un nouvel utilisateur:",
			error
		);
		throw new Error("Erreur lors de la création d'un nouvel utilisateur");
	}
}
module.exports = { NewUser, GetUser, GetTask, AddTask };
