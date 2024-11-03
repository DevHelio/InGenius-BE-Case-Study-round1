"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var create = require("./routes/c");
var read = require("./routes/r");
var update = require("./routes/u");
var cDelete = require("./routes/d");
//For env File
dotenv_1.default.config();
//Could also be done in .env btw
var app = (0, express_1.default)();
var port = process.env["PORT"] || 8000;
//Swagger/openapi testing...
var _a = require('./swagger'), specs = _a.specs, swaggerUi = _a.swaggerUi;
app.use(express_1.default.json(), swaggerUi.serve, swaggerUi.setup(specs));
// app.use(express.urlencoded({ extended: true }));
// routes/sample.js
/**
 * @swagger
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
*/
app.get("/", function (req, res) {
    res.send("\n    <div style=\"width: 100%; height: 100%; display: flex; justify-content: center; align-items: center\">\n    <h1>Hey, nu dat je mijn opdracht ".concat(req.body, " ziet moet je wel de internship aan mij geven!</h1>\n    </div>\n    "));
});
// (C)rud Creating new courses, lessons or modules
app.post("/create", function (req, res) {
    try {
        var i = create(req.body);
        res.send(i.message);
    }
    catch (error) {
        console.error(error);
    }
});
// c(R)ud Reading courses, lessons or modules
app.get("/read", function (req, res) {
    try {
        var i = read(req.body);
        res.send("<h1>".concat(i.message, "</h1> <pre>").concat(JSON.stringify(i.content), "</pre>"));
    }
    catch (error) {
        console.error(error);
    }
});
//  cr(U)d Updating courses, lessons or modules
app.put("/update", function (req, res) {
    try {
        var i = update(req.body);
        res.send(i.message);
    }
    catch (error) {
        console.error(error);
    }
});
app.delete("/delete", function (req, res) {
    try {
        var i = cDelete(req.body);
        res.send(i.message);
    }
    catch (error) {
        console.log(error);
    }
    res.send("Delete operation succesful");
});
var server = app.listen(port, function () {
});
module.exports = server;
