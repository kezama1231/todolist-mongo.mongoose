const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const db = require(__dirname + '/mongoose.js');
const mongoose =  require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use("/css", express.static('css'));
app.set('view engine', 'ejs');
db.establishConnection("mongodb://localhost:27017/todolistDB");

//require schema
const model = db.createSchemaAndModel('todolist_items');
//initialuze variables
let userItems = ["Watch Obi Wan", "Play Dota", "Get Jacked"];
let userItems2 = [];
let workItems = [];
let resolveVal = [];
//make promise to find and add items to userItems2(let)
let result = new Promise(function(resolve, reject){
  model.find({}, function(err, docs){
    if(err){
      console.log("Error occured retrieving documents from database.");
      reject(err);
    }else{
      docs.forEach(function(value){
        userItems2.push(value.name);
        resolveVal.push(value.name);
      });
      console.log("Documents are loaded into web application.");
      resolve(resolveVal);
    }
  });
});

result.then(
  function(success){
    console.log(success);
    //default values
    let docArray = [{name : "Welcome to our To-do-list"},{name : "Hit + button to add a new item"},{name : "<-- Hit this to delete an item"}];
    //Inserted once to populate DB...if empty insert and find again
    if(success.length === 0){
      model.insertMany(docArray, function(err, docs){
        if(err){
          console.log("Inserting documents encountered some error");
          console.log(err);
        }else{
          console.log(docs + "\n" + "has successfully been inserted to database.");
          model.find({}, function(err, docs){
            if(err){
              console.log("Error occured retrieving documents from database.");
            }else{
              docs.forEach(function(value){
                userItems2.push(value.name);
              });
              console.log("Documents are loaded into web application.");
              console.log(userItems2);
            }
          });
        }
      });
    }
  },
  function(err){
    console.log(err);
  }
);

app.get("/", function(request,response){
  let today = date.getDate();
  response.render('list',{
    listTitle : today,
    newItem : userItems2});
});

app.post("/", function(request,response){
  //console.log(request.body);
  let userItem = request.body.newItem;
  if(request.body.list == 'Work'){
    workItems.push(userItem);
    response.redirect("/work");
  } else{
    userItems.push(userItem);
    response.redirect("/");
  }
});

app.get("/work" , function(request,response){
  response.render("list", {listTitle : "Work", newItem : workItems});
});

app.post("/work", function(request,response){
  let item = request.body.newItem;
  workItems.push(item);
  response.redirect("/work");
});

app.get("/about",function(request,response){
  response.render('about');
});



app.listen(3000,function(){
  console.log("Server has started listening on port 3000.");
});
