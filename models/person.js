const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, "Username is required!"],
  },
  number: {
    type: String,
    required: [true, "Phone number is required!"],
    validate: {
      validator: function (v) {
        const c = "-";
        if (v.length < 8) {
          return false;
        } else if (v.indexOf(c) !== 2 && v.indexOf(c) !== 3) {
          return false;
        } else {
          return true;
        }
      },
      message: "Invalid phone number.",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
