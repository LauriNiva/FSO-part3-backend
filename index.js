const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "345-43562435",
        "id": 4
    },
    {
        "name": "Test Testersson",
        "number": "123-234234",
        "id": 5
    }

];

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person){
        res.json(person);
    }else{
        res.status(404).end();
    }
    
});

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();

});

const generateId = () => {
    return Math.floor(Math.random() * 99999) + 1;
};

app.post("/api/persons/", (req, res) =>{
    const body = req.body;
    const newId = generateId();
    console.log(newId);

    const person = {...body, id: newId };

    persons = persons.concat(person);

    res.json(person);



});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
});



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
