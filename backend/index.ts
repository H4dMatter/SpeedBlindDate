//Packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./dbConfigUser').User;
const Profile = require('./dbConfigUser').Profile;
const ChatLog = require('./dbConfigUser').ChatLog;
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

	client.on('private-chat', usernames => {
		client.join('room' + privateRoomId);
		users[usernames.to].join('room' + privateRoomId);
		io.to('room' + privateRoomId).emit('private-room', {
			privateRoomId: privateRoomId,
			username: usernames.from
		});
		privateRoomId++;
	});

	client.on('private-message', messageObj => {
		io.to('room' + messageObj.roomNr).emit('private-message', messageObj);
	});

	// client.on('leave-private-rooms', privateRoomIds => {
	// 	console.log(messageObj.roomNr + ' ' + messageObj.message);
	// });
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

//Routes

//User Registration
router.post('/user', (req, res) => registrationUser(req, res));

router.post('/profile', (req, res) => profileUser(req, res));

//Gets specific profile by username
router.get('/profile/:username', (req, res) => getProfile(req, res));

//Changes a profile
router.put('/profile/:username', (req, res) => changeProfile(req, res));

//User login
router.post('/user/login', (req, res) => loginUser(req, res));

//ShowsUser
router.get('/user/:username', (req, res) => showUser(req, res));

//Deletes user
router.delete('/user/:username', (req, res) => deleteUser(req, res));

//Update user
router.put('/user/:username', (req, res) => updateUser(req, res));

router.post('/chatLog', (req, res) => saveMessages(req, res));

//Functions
function saveMessages(req, res) {
	console.log(req.body);
	let chatLogElement = new ChatLog({
		betweenUsers: req.body.betweenUsers,
		chatLog: req.body.chatLog
	});
	ChatLog.updateOne(
		{ betweenUsers: req.body.betweenUsers },
		{ chatLog: req.body.chatLog },
		{
			upsert: true
		}
	).then(() => res.send('Messages logged successfully'));
}

/**
 * This function saves profile to database
 * @param req - Represents the request object
 * @param res - Represents the response object
 */
function profileUser(req, res) {
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

	profile.save().then(() => res.send('Profile created successfully'));
}

/**
 * This function changes profile and updates it in database
 * @param req - Represents the request object
 * @param res - Represents the response object
 */
function changeProfile(req, res) {
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

/**
 * This function gets profile and sends it to frontend
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

/**
 * Logs in user - if all requirenments are fullfilled (right password, email does exist...)
 * @param {object} req - Represents the request object
 * @param {object} res - Represents the response object
 *
 */
async function loginUser(req, res) {
	let userData = req.body;

	if (!req.body.username || !req.body.password) {
		res.writeHead(400, 'Invalid input - not all required fields filled in');
		res.end();
	} else {
		User.findOne({ username: userData.username }, (err, user) => {
			if (err) {
				console.log(err);
			} else {
				if (!user) {
					res.writeHead(404, 'User not found');
					res.end();
				} else {
					bcrypt.compare(userData.password, user.password, (err, isMatch) => {
						if (!isMatch) {
							res.writeHead(401, 'Password mismatch');
							res.end();
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
}

/**
 * Updates user - after valid changes (if neither email nor username already exist)
 * @param {object} req - Represents the request object
 * @param {object} res - Represents the response object
 *
 */
async function updateUser(req, res) {
	let userToBeUpdated;
	console.log(req.body.username + ' ' + req.body.email);

	await User.find({ username: req.body.username }, async (err, usersbyUsername) => {
		if (err) console.log('error'); //redirect
		if (usersbyUsername.length > 1) {
			res.writeHead(406, 'Username already taken');
			res.end();
		} else {
			await User.find({ email: req.body.email }, (err, usersbyEmail) => {
				if (err) console.log('error'); //redirect
				if (usersbyEmail.length > 1) {
					res.writeHead(409, 'Email already taken');
					res.end();
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
							res.writeHead(404, 'No user found');
							res.end();
						}
					});
				}
			});
		}
	});
}

/**
 * Registrates new user - but checks before if user already exists - and saves it to database
 * @param {object} req - Represents the request object
 * @param {object} res - Represents the response object
 *
 */
async function registrationUser(req, res) {
	await User.findOne({ email: req.body.email }, async (err, user) => {
		if (err) console.log('error'); //redirect
		if (user) {
			res.writeHead(409, 'Email already taken');
			res.end();
		} else {
			await User.findOne({ username: req.body.username }, async (err, user) => {
				if (err) console.log('error'); //redirect
				if (user) {
					res.writeHead(406, 'Username already taken');
					res.end();
				} else {
					const { email, username, passwordOne, passwordTwo } = req.body;

					// If not all required fields are filled in or password-mismatch
					if (!email || !username || !passwordOne || !passwordTwo) {
						res.writeHead(400, 'Invalid input - not all required fields filled in');
						res.end();
					} else {
						// On password-mismatch
						if (passwordOne != passwordTwo) {
							res.writeHead(401, 'Password mismatch');
							res.end();
						} else {
							//Valid input
							const hashedPW = await bcrypt.hash(req.body.passwordOne, 10);

							const user = new User({
								email: req.body.email,
								username: req.body.username,
								password: hashedPW
							});

							user.save();
							let payload = { subject: user.username };
							let token = jwt.sign(payload, 'secretKey');
							res.send({ token });
						}
					}
				}
			});
		}
	});
}

/**
 * Login data are presented in Blind Date > User Info as default input value
 * changeable
 * @param req - Represents the request object
 * @param res - Represents the response object
 */
function showUser(req, res) {
	User.findOne({ username: req.params.username }, (err, user) => {
		if (err) console.log('error');
		if (!user) {
			res.writeHead(404, 'User not found');
			res.end();
		} else {
			res.json(user);
		}
	});
}

/**
 * Deletes user and profile in Blind Date > User Info as default input value
 * @param req - Represents the request object
 * @param res - Represents the response object
 *
 */
async function deleteUser(req, res) {
	await User.findOneAndDelete({ username: req.params.username }, async (err, user) => {
		if (err) console.log('error');
		if (user) {
			await Profile.findOneAndDelete({ username: req.params.username }, async (error, profile) => {
				if (error) console.log('error');
				if (!profile) {
					res.writeHead(404, 'Profile not found');
					res.end();
				}
			});
		} else {
			res.writeHead(404, 'User not found');
			res.end();
		}
	});
	res.json({ msg: 'Successful deletion' });
}

//Functions not needed anymore since better solution but better not delete for now

/*router.get('/', (req, res) => {
	res.send('LoginPage');
});*/

/*/**
 * Checks if user is authenticated - if true: redirection to critical sides possible
 * @param req - Represents the request object
 * @param res - Represents the response object
 * @param next - calls the next middleware statement on stack
 */
/*function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.send('Not logged in');
	}
}*/

/*/**
 * Logs out user with passport authentification local strategy - now realized in frontend with tokens
 * @param req - Represents the request object
 * @param res - Represents the response object
 * @param next - calls the next middleware statement on stack
 */
/*function logoutUser(req, res) {
	req.logout();
	res.send('Successfully logged out');
}*/

/*//Brings in local strategy from passport-config file
require('./passport-config')(passport);*/

/*router.use(
	session({
		secret: 'speeddate',
		resave: true,
		saveUninitialized: true
	})
);*/
module.exports = router;
