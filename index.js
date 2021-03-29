require("dotenv").config();
const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.model");

const app = express();

morgan.token("person", (req) => {
    return JSON.stringify(req.body);
})

app.use(express.static('build'))
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());




app.get("/api/persons", (req, res) => {
    Person.find({})
    .then(persons1 => {
        console.log(persons1);
        res.json(persons1);
    })
    
    //res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }

});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();

});

const generateId = () => {
    return Math.floor(Math.random() * 99999) + 1;
};

app.post("/api/persons/", morgan(":person"), (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({
            error: "name missing"
        });
    }

    if (!body.number) {
        return res.status(400).json({
            error: "number missing"
        });
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: "name already in the phonebook"
        });
    }

    const person = { ...body, id: generateId() };

    persons = persons.concat(person);

    res.json(person);



});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
});



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
