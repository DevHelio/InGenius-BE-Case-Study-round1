/* const create = require("./operations/c");
const read = require("./operations/r");
const update = require("./operations/u");
const cDelete = require("./operations/d"); */

import request from "supertest";

const app = require("./index");

describe("Router and CRUD operations manager", () => {
  it("GET / should return status 200", () => {
    const r = request(app).get("/")
        .then((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
  });

  it("POST /create should return status 200", async () => {
    const response = await request(app)
      .post("/create")
      .send({
    "type": "lesson",
    "title": "Introduction to Web Development",
    "description": "Learn about HTML tags and document structure",
    "topics": [
        "HTML tags",
        "Document structure",
        "Semantic HTML"
    ],
    "content": [
        {
            "type": "text",
            "data": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser."
        },
        {
            "type": "video",
            "data": "https://example.com/intro-to-html-video"
        }
    ]
      });
    expect(response.status).toBe(200);
  });
  

  it("GET /read should return status 200", async () => {
    const response = await request(app).get("/read").send({ id: 1});
    expect(response.status).toBe(200);
  });

  it("PUT /update should return status 200", async () => {
    const response = await request(app)
      .put("/update")
      .send({ id: 1, name: "Updated Course" });
    expect(response.status).toBe(200);
  });

  it("DELETE /delete should return status 200", async () => {
    const response = await request(app).delete("/delete").send({ id: 1 });
    expect(response.status).toBe(200);
  });
