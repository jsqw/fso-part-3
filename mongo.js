const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please give password as an argument.");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fso:${password}@cluster0.uawhpio.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook: ");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number} `);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const nameInput = process.argv[3];
  const numberInput = process.argv[4];
  const person = new Person({
    name: nameInput,
    number: numberInput,
  });

  person.save().then((result) => {
    console.log("New person saved!");
    mongoose.connection.close();
  });
} else {
  console.log("Invalid amount of arguments.");
  mongoose.connection.close();
  process.exit(1);
}
