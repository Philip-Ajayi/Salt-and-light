var express = require("express");
//Excutin the express function
var app = express();
//we defined port to be 3000 to host in local
var port = 3000;
//To parse the data in the body we will need to add middleware into our application
var bodyParser = require('body-parser');
//Get the data from the server and convert into the JSON format to store it in database
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//var router = express.Router();

//To connecting the Mongodb database Mongoose module is necessary 
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//Connect to the database by telling it the location of the database and the name of the database by default it runs in the 27017 port number
mongoose.connect('mongodb://localhost:27017/nfriendship');

//In order to know the format of the data in the database, we need to have a Schema.
//THe data stored in all the fields is the string
var nameSchema = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String
});
//After creating schema its necessary build a model for it
var User = mongoose.model('User', nameSchema);
//module.exports=mongoose.model('User',nameSchema);
app.get("/", (req, res) => {
    //we will be using the sendFile command to show the contactus.html file
    res.sendFile(__dirname + "/contactus.html");
});

//It will listen the requests from the browser and return the answer back to the browser
app.post("/contactus", (req, res) => {
    
   var myData = new User(req.body);
     //   var name= req.query.name; //mytext is the name of your input box
   // res.send('Name:' +name); 
    myData.save()

        .then(item => {
            res.send("Submitted Successfully");
        })
        .catch(err => {
            res.status(400).send("Error");
        });
});




// This will starts the server and listen the to the port number 
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
