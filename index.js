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

});

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person);
        })
        .catch(err => next(err));

});

app.put("/api/persons/:id", (req, res, next) => {

    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(err => next(err));

});

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(err => next(err));

});

app.post("/api/persons/", morgan(":person"), (req, res, next) => {
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

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error));


});

app.get("/info", (req, res) => {
    Person.find({})
        .then(persons => {
            res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`);
        });


});

const errorHandler = (error, request, response, next) => {
    console.log("error from handler:", error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message});
    };

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
