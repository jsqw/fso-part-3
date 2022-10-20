const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
  {
    id: 1,
    content: "James Maxwell",
    number: "123456789",
  },
  {
    id: 2,
    content: "Leonardo Da Vinci",
    number: "7562359",
  },
  {
    id: 3,
    content: "Mikael Kosola",
    number: "22",
  },
];

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

app.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const infoSize = persons.length;
  res.send(
    `<p> Phonebook has information about ${infoSize} people <br> ${date} </p>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((p) => p.id !== id)
    res.status(204).end()

})