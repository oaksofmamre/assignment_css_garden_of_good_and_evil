"use strict";
const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const GOOD_IMAGE = "carried.jpg";
const EVIL_IMAGE = "alone.jpg";
const DEFAULT_IMAGE = "blank.gif";
const GOOD_CHOICE = "good";
const EVIL_CHOICE = "evil";

const PORT = 3000;

//setup handlebars
app.set("views", __dirname + "/views");
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setup middleware
app.use(cookieParser()); // save cookies in req.cookies
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	//get cookies
	let cookieChoice = req.cookies.cookieChoice || "";
	let colorChoice = req.cookies.colorChoice || "";
	let goodEvilChoice = req.cookies.goodEvilChoice || DEFAULT_IMAGE;

	res.render("results", {
		cookie: cookieChoice,
		color: colorChoice,
		choice: goodEvilChoice
	});
});

app.post("/update", (req, res) => {
	let cookieChoice = req.body.cookieChoice;
	let colorChoice = req.body.colorChoice;
	let goodEvilChoice = req.body.goodEvilChoice;

	//set cookies
	res.cookie("cookieChoice", cookieChoice);
	res.cookie("colorChoice", colorChoice);
	res.cookie("goodEvilChoice", _getImage(goodEvilChoice));

	res.redirect("back");
});

let _getImage = goodEvilChoice => {
	let image = DEFAULT_IMAGE;
	if (goodEvilChoice === GOOD_CHOICE) {
		image = GOOD_IMAGE;
	} else if (goodEvilChoice === EVIL_CHOICE) {
		image = EVIL_IMAGE;
	}
	return image;
};

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}!`);
});
