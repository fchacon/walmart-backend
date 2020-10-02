const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url = require("url");
const { isIdentifier, isPalindrome } = require("./utils");

// const connectionString =
// 	"mongodb://productListUser:productListPassword@host.docker.internal:27018/admin";

const connectionString =
	"mongodb+srv://productListUser:productListPassword@cluster0.a2bfg.mongodb.net/admin";

MongoClient.connect(
	connectionString,
	{
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) {
			return console.error(err);
		}

		console.log("Connected to Database");
		const db = client.db("promotions");

		app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept"
			);
			next();
		});

		app.get("/products", async (req, res) => {
			const queryObject = url.parse(req.url, true).query;
			const text = queryObject.text;
			let limit = parseInt(queryObject.perPage, 10);
			let page = parseInt(queryObject.page, 10);
			let skip = (page - 1) * limit;

			let query;
			let discount = 0;

			if (text) {
				if (text.length >= 3 && isPalindrome(text)) {
					discount = 50;
				}

				if (isIdentifier(text)) {
					query = {
						id: parseInt(text, 10),
					};

					page = 1;
					limit = 1;
					skip = 0;
				} else {
					query = {
						$or: [
							{
								brand: new RegExp(".*" + text + ".*"),
							},
							{
								description: new RegExp(".*" + text + ".*"),
							},
						],
					};
				}
			}

			const cursor = db
				.collection("products")
				.find(query, { limit, skip });

			const count = await cursor.count();

			cursor
				.toArray()
				.then((results) => {
					results.forEach((result) => (result.discount = discount));

					const response = {
						data: results,
						total: count,
					};
					res.statusCode = 200;
					res.json(response);
					res.end();
				})
				.catch((error) => console.error(error));
		});

		const port = process.env.PORT || 3000;
		app.listen(port, () => {
			console.log("listening on " + port);
		});
	}
);
