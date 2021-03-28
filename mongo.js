const mongoose = require ("mongoose");

if (process.argv.lenght<3){
    console.log("Please give a password as an argument");
    process.exit(1);
};

const password = process.argv[2];

const url = `mongodb+srv://user1:${password}@cluster0.ijxqs.mongodb.net/phonebook?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3 ){

    console.log("Phonebook:");
    Person
    .find({})
    .then(result => {
        result.forEach( person =>{
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
};

if (process.argv.length > 4){
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(result => {
        console.log("New person saved to the phonebook!");
        mongoose.connection.close();
    })
};