const express = require('express');
const app = express();

app.listen(3000,function(){
  console.log("Server has started listening on port 3000 for mongoDB database for fruits project.");
})

const { MongoClient } = require("mongodb");
// Connection URI
const url = "mongodb://localhost:27017";
// Create a new MongoClient
const client = new MongoClient(url);
const dbname = "fruitsDB";

async function connectMDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
connectMDB().catch(console.dir);

async function insertMDB() {
  try {
    const database = client.db("fruitsDB");
    const fruits = database.collection("fruits");
    // create a document to insert
    const doc = [
        {
          name : "Apple",
          score : 8,
          review : "Great Fruit"
        },
        {
          name : "Orange",
          score : 6,
          review : "Kinda Sour"
        },
        {
          name : "Banana",
          score : 9,
          review : "Great Stuff!!"
        }
      ]
    ;
    const result = await fruits.insertMany(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

insertMDB().catch(console.dir);

//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
