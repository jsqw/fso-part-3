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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
