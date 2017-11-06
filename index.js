"use strict";

const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

const PORT = 8080;

//setup handlebars
app.set("views", __dirname + "/views");
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setup cookies and sessions
app.use(express.static(__dirname + "/public"));
// app.use(cookieParser());
// app.use(session({ secret: "123456", resave: false, saveUninitialized: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	// Cookies that have not been signed
	// console.log("Cookies: ", req.cookies);
	// // Cookies that have been signed
	// console.log("Signed Cookies: ", req.signedCookies);
	// console.log("=================");
	// console.log("Session: ", req.session);
	// res.setHeader("Set-Cookie", ["dc-cookie-1=DCDC", "dc-cookie-2=YoYoYo!"]);
	// // res.end("hello\n");
	res.render("results", { test: "test content!!" });
});

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}!`);
});
