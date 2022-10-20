const express = require("express");
const app = express();

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

app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
