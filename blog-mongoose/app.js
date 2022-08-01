//inititalize express
const express = require('express');
const app = express();
//initialize body-parser
const bodyParser = require('body-parser');
const lodash = require('lodash');
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended : true}));
//initialoze path for static files
app.use(express.static("public"));
app.use('/posts', express.static('public'));
//initialize ejs templating
app.set('view engine', 'ejs');

const secondaryHeaders = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutusHeader = "1Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactusHeader = "2Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var posts = [];
mongoose.connect("mongodb://localhost:27017/toDoListDB");
const Schema = mongoose.Schema;
const postsSchema = new Schema({
  name : String
});
const postsModel = mongoose.model("post",postsSchema,"posts");


app.get('/', function(request,response){
  response.render('index', {
    ejs_secondaryHeaders : secondaryHeaders,
    ejs_posts : posts
  });
  //for each for console log here can be referred in saves.text
});

app.get('/aboutus',function(request,response){
  response.render('about', {ejs_secondaryHeaders : aboutusHeader});
});

app.get('/contactus', function(request,response){
  response.render('contact', {ejs_secondaryHeaders : contactusHeader});
});

app.get('/compose' , function(request,response){
  response.render('compose');
});

app.get('/posts/:titleParam', function(request,response){
  let userParameter = lodash.lowerCase(request.params.titleParam);
  posts.forEach(function(value,index){
    if( userParameter == lodash.lowerCase(value.title)){
      //console.log("Match Found");
      response.render('post', {ejs_posts : posts[index]});
    }
  });
});

app.post('/compose' , function(request,response){
  let title = request.body.title;
  let post = request.body.post;
  //console.log("Title = " + title + "\n" + "Body = " + post);
  let composeValue = {
    title : title,
    post : post
  }
  posts.push(composeValue);
  response.redirect('/');
});

app.listen(3000, function(){
  console.log("Server has started listening on port 3000 for blog project.");
})
