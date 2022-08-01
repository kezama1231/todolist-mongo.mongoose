module.exports.establishConnection = establishConnection;
module.exports.closeConnection = closeConnection;
module.exports.createSchemaAndModel = createSchemaAndModel;
module.exports.populateWebApplication = populateWebApplication;

const mongoose = require('mongoose');

/*ready states being:

0: disconnected
1: connected
2: connecting
3: disconnecting*/

async function establishConnection(url){
  console.log("Establishing connection to mongoose at : \n" + url);
  await mongoose.connect(url);
  console.log("Mongoose state now at : " + mongoose.connection.readyState);
}

async function closeConnection(){
  console.log("Closing mongoose connection.");
  await mongoose.close();
  console.log("Mongoose state now at : " + mongoose.connection.readyState);
}

function createSchemaAndModel(name){
  let schema = new mongoose.Schema({
    name : String
  });
  let model = mongoose.model(name, schema, name);
  return model;
}

function populateWebApplication(model){
  let userItems2 = [];
  let result = new Promise(function(resolve, reject){
    model.find({}, function(err, docs){
      if(err){
        console.log("Error occured retrieving documents from database.");
        reject(err);
      }else{
        docs.forEach(function(value){
          userItems2.push(value.name);
        });
        resolve("Documents are loaded into web application.");
      }
    });
  });
  result.then(
    function(success){
      console.log("In populateWebApplication")
      console.log(userItems2);
      console.log(success);
    },
    function(err){
      console.log(err);
    }
  );
  result.finally(function(){
    return userItems2;
  });

}
