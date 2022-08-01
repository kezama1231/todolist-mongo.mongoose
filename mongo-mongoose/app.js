/*String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
Schema*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');


/*
  _______                                    _
(_______)                               _  (_)
 _       ___  ____  ____  _____  ____ _| |_ _  ___  ____
| |     / _ \|  _ \|  _ \| ___ |/ ___|_   _) |/ _ \|  _ \
| |____| |_| | | | | | | | ____( (___  | |_| | |_| | | | |
 \______)___/|_| |_|_| |_|_____)\____)  \__)_|\___/|_| |_|
*/

async function connectMongoose(){
  console.log("Connection to mongoose initiated.");
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
}
async function closeMongoose(){
  await mongoose.connection.close();
}

connectMongoose().catch(err => console.log(err));

/*
  ______ .______       __    __   _______
 /      ||   _  \     |  |  |  | |       \
|  ,----'|  |_)  |    |  |  |  | |  .--.  |
|  |     |      /     |  |  |  | |  |  |  |
|  `----.|  |\  \----.|  `--'  | |  '--'  |
 \______|| _| `._____| \______/  |_______/
*/

//Inserting data with mongoose
//Creating schema for database
function insertFruit(){
  const fruitSchema = new mongoose.Schema({
    name : String,
    rating : Number,
    review : String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

  //insert one
  const fruit = new Fruit({
    name : "Apple",
    rating : 7,
    review : "Pretty solid as a fruit."
  })

  //fruit.save();
  //insert many
  let fruitsArray = [
    {
      name : "Kiwi",
      rating : 10,
      review : "I mean its a kiwi."
  },
  {
    name : "Orange",
    rating : 9,
    review : "Its bright."
  },

  {
    name : "Banana",
    rating : 8,
    review : "Weird texture."
  }]
  Fruit.insertMany(fruitsArray, function(err,docs){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully inserted fruits array.");
    }
    console.log(docs);
  })
};
//inserting with data validation
function insertFruitWithValidation(){
  const fruitSchema = new mongoose.Schema({
    name : {
      type : String,
      required : true,
    },
    rating : {
      type : Number,
      min : 1,
      max : 10,
    },
    review : String
  });

  const fruitModel = mongoose.model('fruits',fruitSchema,'fruits');
  const fruitRecord = new fruitModel({
    name : "Durian",
    rating : 10,
    review : "I like mango + steens."
  });
  fruitRecord.save();
  console.log("Record has been updated.");
  //closeMongoose();
}
//updating data with mongoose

function updateFruit(){
  let fruitSchema = new mongoose.Schema({
    name : String,
    rating : Number,
    review : String,
  });

  const fruitModel = mongoose.model("fruits", fruitSchema);
  fruitModel.updateOne({_id : "62d87b5814a280c9303b0218"} , { review : "Durians are secretly addictive." } , function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Updated record in fruits collection in fruitsDB.");
    }
  });
}
//delete fruit with mongoose
function deleteFruit(){
  const fruitSchema = new mongoose.Schema({
    name : String,
    rating : Number,
    review : String
  });
  const fruitModel = mongoose.model("fruits", fruitSchema);
  fruitModel.deleteOne({_id : "62d7771ad4306562e0b9ef6b"}, function(err){
    console.log("Records successfully deleted.");
  });
}
//function to find fruits
function findFruits(){
  const fruitSchema = new mongoose.Schema({
    name : String,
    rating : Number,
    review : String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

  Fruit.find(function(err, docs){
    if(err){
      console.log(err);
    }else{
      docs.forEach(function(value, index){
        console.log(value.name);
      })
    }
  });
}
//function for challenge insert people
function insertPeople(){

  const peopleSchema = mongoose.Schema({
    name : String,
    age : Number
  });

  const peopleModel = mongoose.model("people", peopleSchema, "peopleCollection");

  const people = new peopleModel({
    name : "John",
    age : 37
  })

  people.save();
}
//function for establishing relationship between collections
function fruitRelationshipsPeople(){
  const fruitSchema = new mongoose.Schema({
    _id : String,
    name : String,
    rating : Number,
    review : String
  });

  const fruitModel = mongoose.model("fruits", fruitSchema);
  const durian = new fruitModel({
    _id : "Order66",
    name : "Durian",
    rating : 66,
    review : "Execute Order 66."
  })

  //durian.save();

  const peopleSchema = new mongoose.Schema({
    name : String,
    age : Number,
    favouriteFruit : fruitSchema //(line 186)
  });

  const personModel = mongoose.model('peopleCollection', peopleSchema, "peopleCollection");
  const person = new personModel({
    name : "Obi Wan",
    age : "40",
    favouriteFruit : durian //(line 194)
  });
 person.save();
}



/*
.______       __    __  .__   __.
|   _  \     |  |  |  | |  \ |  |
|  |_)  |    |  |  |  | |   \|  |
|      /     |  |  |  | |  . `  |
|  |\  \----.|  `--'  | |  |\   |
| _| `._____| \______/  |__| \__|
*/

//run functions here
//insertFruit();
//insertPeople();
//insertFruitWithValidation();
//findFruits();
//updateFruit();
//deleteFruit();
//fruitRelationshipsPeople();

//finally close connection
//closeMongoose();
