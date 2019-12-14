var express = require('express');
var app = express();
var http = require('http');

app.listen(3000, function() {
	console.log('Example app on Port 3000');
});

//User Routes
app.post('/user', function(req, res) {
	console.log('Added User');
});

app.get('/user/login', function(req, res) {
	console.log('User log in');
	res.send('Welcome user!');
});

app.get('/user/logout', function(req, res) {
	console.log('User log out');
});

app.get('/user/:username', function(req, res) {
	console.log('User with name: ' + req.params.username + ' gotten');
});

app.put('/user/:username', function(req, res) {
	console.log('User with name: ' + req.params.username + ' updated');
});

//this param should probably be changed to id to be more safe
app.delete('/user/:username', function(req, res) {
	console.log('User with name: ' + req.params.username + ' deleted');
});

app.post('/profile', function(req, res) {
	console.log('Profile created');
});

//HIER soll docs hin
app.get('/profile/:id',(req,res) => getProfile(req, res));

/**
 * Gets a specific user profile based on user id
 * @param {*object} req The request object
 * @param {*object} res The response object
 */
function getProfile(req, res) {
	console.log("Profile of user with id " + req.params.id + " requested");
	res.header('Access-Control-Allow-Origin', '*');
	res.send({"name":"Paul","age":"15"});
}
