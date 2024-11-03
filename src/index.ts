import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";

const create = require("./routes/c");
const read = require("./routes/r");
const update = require("./routes/u");
const cDelete = require("./routes/d");

//For env File
dotenv.config();

//Could also be done in .env btw
const app: Application = express();
const port = process.env["PORT"] || 8000;

//Swagger/openapi testing...
const { specs, swaggerUi } = require('./swagger');

app.use(express.json(), swaggerUi.serve, swaggerUi.setup(specs));
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
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
    <h1>Hey, nu dat je mijn opdracht ${req.body} ziet moet je wel de internship aan mij geven!</h1>
    </div>
    `);
});

// (C)rud Creating new courses, lessons or modules
app.post("/create", (req: Request, res: Response) => {
  try {
    const i = create(req.body);
    res.send(i.message);
  }
  catch (error) {
    console.error(error);
  }
});

// c(R)ud Reading courses, lessons or modules
app.get("/read", (req: Request, res: Response) => {
  try {
    const i = read(req.body);
    res.send(`<h1>${i.message}</h1> <pre>${JSON.stringify(i.content)}</pre>`);
  }
  catch (error) {
    console.error(error);
  }
});

//  cr(U)d Updating courses, lessons or modules
app.put("/update", (req: Request, res: Response) => {
  try {
    const i = update(req.body);
    res.send(i.message);
  }
  catch (error) {
    console.error(error);
  }
});

app.delete("/delete", (req: Request, res: Response) => {
  try {
    const i = cDelete(req.body);
    res.send(i.message);
  } catch (error) {
    console.log(error);
  }
  res.send("Delete operation succesful");
});

var server = app.listen(port, () => {
});

module.exports = server; 