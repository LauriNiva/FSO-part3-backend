const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");




const url = process.env.MONGODB_URI;

mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(res => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log("Error connecting to MongoDB: ", err.message);
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    number:{
        type: String,
        required: true,
        minlength: 8
    }
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString();
        delete returnObj._id;
        delete returnObj.__v;
    }
})

module.exports = mongoose.model("Person", personSchema);

