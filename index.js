require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[name-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((people) => {
    const date = new Date();
    const infoSize = people.length;
    res.send(
      `<p> Phonebook has information about ${infoSize} people <br> ${date} </p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "Name and or number missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((p) => {
    res.json(p);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*   app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((p) => p.id !== id);
    res.status(204).end();
  });*/
