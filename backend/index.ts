//Packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const User = require('./dbConfigUser').User;
const Profile = require('./dbConfigUser').Profile;
const jwt = require('jsonwebtoken');

var app = express();

var cors = require('cors');

let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
const chatPort = process.env.PORT || 3000;

var users = {};

var privateRoomId = 0;

io.sockets.on('connection', function(client) {
	client.on('new-user', function(username) {
		client.username = username;
		console.log(username + ' connected');
		users[client.username] = client;
		io.emit('new-user', Object.keys(users));
	});

	client.on('disconnect', function() {
		delete users[client.username];
		console.log('user disconnected');
		io.emit('new-user', Object.keys(users));
	});

	client.on('new-message', message => {
		io.emit('new-message', message);
	});

	client.on('private-chat', username => {
		client.join('room' + privateRoomId);
		users[username].join('room' + privateRoomId);
		io.to('room' + privateRoomId).emit('private-room', privateRoomId);
		privateRoomId++;
	});

	client.on('private-message', messageObj => {
		console.log(messageObj.roomNr + ' ' + messageObj.message);
		io.to('room' + messageObj.roomNr).emit('private-message', messageObj);
	});
});

server.listen(chatPort, () => {
	console.log(`started on port: ${chatPort}`);
});

//Brings in local strategy from passport-config file
//require('./passport-config')(passport);

//Uses
router.use(cors());
router.use(express.json()); //to parse body objects within URL
router.use(express.urlencoded({ extended: true }));
router.use(
	session({
		secret: 'speeddate',
		resave: true,
		saveUninitialized: true
	})
);

router.use(passport.initialize());
router.use(passport.session());

//Mongoose Schemas and Models

//User Registration - instanciates new user and saves it to database
router.post('/user', (req, res) => registrationUser(req, res));

//Routes
router.get('/', (req, res) => {
	res.send('LoginPage');
});

/**
 * This function executes logout-functionality
 * @param req - Represents the request object
 * @param res - Represents the response object
 */
function getProfile(req, res) {
	console.log(req.params.username);
	Profile.findOne({ username: req.params.username }, (err, user) => {
		if (err) console.log('error');
		console.log('Profile of user with name ' + req.params.username + ' requested');
		res.json(user);
	});
}

//TODO: Images!
router.post('/profile', function(req, res) {
	console.log('Profile created, Body:');
	console.log(req.body);

	let hobbies = null;
	if (req.body.hobbies != null) {
		hobbies = req.body.hobbies.split(',');
		hobbies.forEach((element, index, hobbies) => {
			hobbies[index] = element.trim();
		});
	}

	var profile = new Profile({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		age: req.body.age,
		hobbies: hobbies,
		gender: req.body.gender,
		preferences: {
			genderPref: req.body.genderPref,
			ageRange: {
				minAge: req.body.minAge,
				maxAge: req.body.maxAge
			}
		}
	});
	console.log(profile);

	profile.save().then(() => res.send('Profile created successfully'));
});
function changeProfile(req, res) {
	console.log('Profile of ' + req.body.username + ' will be updated with: ');
	console.log(req.body);

	let hobbies = null;
	if (req.body.hobbies != null) {
		hobbies = req.body.hobbies.split(',');
		hobbies.forEach((element, index, hobbies) => {
			hobbies[index] = element.trim();
		});
	}

	var update = {
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		age: req.body.age,
		hobbies: hobbies,
		gender: req.body.gender,
		preferences: {
			genderPref: req.body.genderPref,
			ageRange: {
				minAge: req.body.minAge,
				maxAge: req.body.maxAge
			}
		}
	};
	console.log(update);

	Profile.findOneAndUpdate({ username: req.body.username }, update).then(() =>
		res.send('Profile updated successfully')
	);
}
//gets specific profile by username
router.get('/profile/:username', (req, res) => getProfile(req, res));

//changes a profile
router.put('/profile/:username', (req, res) => changeProfile(req, res));
//User login
router.post('/user/login', (req, res) => loginUser(req, res));

//User logout --> dashboard
router.get('/user/logout', (req, res) => logoutUser(req, res));

//ShowsUser
router.get('/user/:username', (req, res) => showUser(req, res));

//Deletes user
router.delete('/user/:username', (req, res) => deleteUser(req, res));

//Update user
router.put('/user/:username', (req, res) => updateUser(req, res));

//Functions

async function loginUser(req, res) {
	let userData = req.body;
	User.findOne({ username: userData.username }, (err, user) => {
		if (err) {
			console.log(err);
		} else {
			if (!user) {
				res.send('Invalid email');
			} else {
				bcrypt.compare(userData.password, user.password, (err, isMatch) => {
					if (!isMatch) {
						res.send('Invalid password');
					} else {
						let payload = { subject: user.username };
						let token = jwt.sign(payload, 'secretKey');
						res.send({ token });
					}
				});
			}
		}
	});
}

async function updateUser(req, res) {
	const errors = [];
	let userToBeUpdated;

	await User.find({ username: req.body.username }, (err, users) => {
		if (err) console.log('error'); //redirect
		if (users.length > 1) {
			console.log(users);
			errors.push({ msg: 'User with this username already exists' });
		}
	});

	await User.find({ email: req.body.email }, async (err, users) => {
		if (err) console.log('error'); //redirect
		if (users.length > 1) {
			errors.push({ msg: 'User with this email already exists' });
		}
	});

	if (errors.length > 0) {
		res.send(errors);
	} else {
		userToBeUpdated = {
			email: req.body.email,
			username: req.body.username
		};

		User.findOneAndUpdate({ username: req.params.username }, userToBeUpdated, (err, user) => {
			if (err) console.log('error'); //redirect
			if (user) {
				res.json(userToBeUpdated);
			} else {
				res.json({ msg: 'No user found' });
			}
		});
	}
}

/**
 * Registrates new user - but checks before if user already exists
 * @param {object} req - Represents the request object
 * @param {object} res - Represents the response object
 *
 */
async function registrationUser(req, res) {
	const errors = [];

	await User.findOne({ username: req.body.username }, (err, user) => {
		if (err) console.log('error'); //redirect
		if (user) {
			errors.push({ msg: 'User with this username already exists' });
		}
	});

	await User.findOne({ email: req.body.email }, async (err, user) => {
		if (err) console.log('error'); //redirect
		if (user) {
			errors.push({ msg: 'User with this email already exists' });
		}
	});

	try {
		const { email, username, passwordOne, passwordTwo } = req.body;

		// If not all required fields are filled in or password-mismatch
		if (!email || !username || !passwordOne || !passwordTwo) {
			errors.push({ msg: 'Fill in all required fields' });
		}

		// On password-mismatch
		if (passwordOne != passwordTwo) {
			errors.push({ msg: 'Password One does not match password Two' });
		}

		//Errors are found
		if (errors.length > 0) {
			res.json(errors);
			//redirect
		} else {
			//Valid input
			const hashedPW = await bcrypt.hash(passwordOne, 10);

			const user = new User({
				email: req.body.email,
				username: req.body.username,
				password: hashedPW
			});

			//console.log(hashedPW + " " + user);
			user.save();
			res.json({ msg: 'You are successfully registered' });

			//Redirect
		}
	} catch {
		//redirect
	}
}

/**
 * Checks if user is authenticated - if true: redirection to critical sides possible
 * @param req - Represents the request object
 * @param res - Represents the response object
 * @param next - calls the next middleware statement on stack
 */
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.send('Not logged in');
	}
}

function logoutUser(req, res) {
	req.logout();
	res.send('Successfully logged out');
}

/**
 * Shows loginData user
 * @param req - Represents the request object
 * @param res - Represents the response object
 */
function showUser(req, res) {
	User.findOne({ username: req.params.username }, (err, user) => {
		if (err) console.log('error'); //redirect
		res.json(user);
	});
}

/**
 * Deletes user
 * @param req - Represents the request object
 * @param res - Represents the response object
 *
 */
function deleteUser(req, res) {
	User.findOneAndDelete({ username: req.params.username }, (err, user) => {
		if (err) console.log('error'); //redirect
		if (user) {
			res.json(user);
		} else {
			res.send('No user found');
		}
	});
	//res.send('delete');
}

module.exports = router;
