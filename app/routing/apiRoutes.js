var friends = require("../data/friends.js");
const fs = require("fs");
const path = require("path");


module.exports = function(app){

	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post("/api/friends", function(req, res){

		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: JSON.parse(req.body.scores)
		};


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

		var savedInfo = "var friendsList = " + JSON.stringify(friends) + "\n module.exports = friendsList;";

		fs.writeFile(path.join(__dirname, "../data/friends.js"), savedInfo, function(err) {

			if (err) {
				return console.log(err);
			}

			console.log("friends.js was updated");
		});

		res.json(friends[diffArray[0].index]);
	});

}