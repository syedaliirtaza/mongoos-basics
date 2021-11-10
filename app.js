
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
    rating: 4,
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
// lets commen this before reading the data coz everytime we runthe app it will run insert many again so to avoid duplicating documents we can comment this out for this moment

// Fruit.insertMany([kiwi, banana, orange], function(err){
//     if(err){
//         console.log("error inserting!!!");
//     } else {
//         console.log("success!!!")
//     }
// })


// reading data from database

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else {
        console.log(fruits);
    }
})

// mongoose data validation
// we can actually validate our data so invalid data can't be inserted into the database
// for that lets create a schema

creating a schema
const employeeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "no Name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
});

// creating a model
const Employee = mongoose.model("Employee", employeeSchema);

// creating the document
const employee = new Employee ({
        name: "Murtaza",
    rating: 37
});

 
//it will give validation err coz rating we give it greater then 10
employee.save();

// we know the we get array of objects back when reading from database
// now lets create a foreach loop to get only names back

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else {

    // close mongoose connection
    // mongoose.connection.close();

    fruits.forEach(function(fruit){
        console.log(fruit.name);
    })
}
})


// update data in databse
Fruit.updateOne({_id: "618bd1816e699dabe46c0bfd"}, {name: "Peech"}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("success!!!!!!!!!")
    }
})

// delete data from the mongoose
Fruit.deleteOne({name: "Peech"}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("deleted!!!!!!!!!")
    }
})


// we can also use deleteMany
People.deleteMany({name: "Irtaza"}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted all documents named Irtaza!!!!!!!!!")
        }
    })
    

// relationships btw documents and embed documents into each others
// as we have one document in empolyee model
// lets add fav fruit for murtaza using relationship with fruit model 

// now lets change our emoplyee schemea so that we have our fav fuirt

// creating a schema
const employeeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "no Name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    favouriteFruit: fruitSchema
});

// creating a model
const Employee = mongoose.model("Employee", employeeSchema);

// creating the new document
const employee = new Employee ({
    name: "Amy",
    rating: 4,
    favouriteFruit: kiwi
});

employee.save();