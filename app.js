// const express = require("express");
// const bodyParser = require("body-parser");

const mongoose = require("mongoose");

// connecting url
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});


// creating a schema
const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

// creating a model
const Fruit = mongoose.model("Fruit", fruitSchema);

// creating the document
const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Pretty solid"
});

// creating a new collection of people 
const peopleSchema = new mongoose.Schema ({
    name: String,
    age: Number, 
});

// creating the model for people
const People = mongoose.model("People", peopleSchema);

// creating the document
const people = new People({
    name: "Irtaza",
    age: 21
});
// people.save();

// fruit.save();

// craeting multiple documents and inserting it at once
const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 10,
    review: "Pretty goiod"
});

const banana = new Fruit ({
    name: "Banana",
    rating: 7,
    review: "Pretty fair"
});

const orange = new Fruit ({
    name: "Orange",
    rating: 10,
    review: "tasty & solid"
});

// now we can use insertmany method of model in mongoose to insert it
Fruit.insertMany([kiwi, banana, orange], function(err){
    if(err){
        console.log("error inserting!!!");
    } else {
        console.log("success!!!")
    }
})







// const app = express();


// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", function(req,res){
//     res.send("hh")
// });

// app.listen(3000, function(){
//     console.log("Server is running on port 3000");
// })