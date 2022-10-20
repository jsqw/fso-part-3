import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import "./index.css";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.findIndex((n) => {
        return n.name === newName;
      }) !== -1
    ) {
      const person = persons.find((p) => p.name === newName);
      const askUpdate = window.confirm(`${newName} found, update number?`);
      if (askUpdate) {
        const newPerson = { ...person, number: newNumber };
        const newId = person.id;
        return personService
          .update(newId, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((i) => (i.id !== newId ? i : returnedPerson.data))
            );
            setNotificationMessage(`${newName}'s number has been updated`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `${newName} has already been deleted from the server!`
            );
            console.log(error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then((response) => {
        console.log(response);
        setPersons(persons.concat(response.data));
        setNotificationMessage(`${newName} has been added`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    console.log(`Delete ${id}`);
    const person = persons.find((n) => n.id === id);
    const askUser = window.confirm(`Delete ${person.name}?`);
    if (askUser) {
      personService.delPerson(id).then((returnedPerson) => {
        persons.map((person) => (person.id !== id ? person : returnedPerson));
      });
      setPersons(persons.filter((person) => person.id !== id));
      setNotificationMessage(`${person.name} has been deleted.`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((n) =>
          n.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h3>Phonebook</h3>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <div>
        <h3>Add new</h3>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
        />
      </div>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
