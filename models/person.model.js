const mongoose = require ("mongoose");


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
    name: String,
    number: String,
});

personSchema.set("toJSON", {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString();
        delete returnObj._id;
        delete returnObj.__v;
    }
})

module.exports = mongoose.model("Person", personSchema);

