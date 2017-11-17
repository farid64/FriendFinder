const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var friends = require("./app/data/friends.js")

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/" , function(req, res){
	res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

app.get("/survey", function(req, res){
	res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

app.get("/api/friends", function(req, res){
	res.json(friends);
});

app.post("/api/friends", function(req, res){

	var newFriend = {
		name: req.body.name,
		photo: req.body.photo,
		scores: JSON.parse(req.body.scores)
	}
	console.log(newFriend);

	var diffArray = [];

	friends.forEach( function(item, index){
		var difference = 0;
		for(var i=0; i<item.scores.length; i++){
			difference += Math.abs(item.scores[i] - newFriend.scores[i]);
		}
		diffArray.push({"difference" : difference, "index": index});
	});

	diffArray.sort(function(a, b){
		return a.difference - b.difference;
	});





	friends.push(newFriend);



	res.json(friends[diffArray[0].index]);
})



app.listen(PORT);