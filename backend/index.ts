//Packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const User = require('./dbConfigUser').User;
const Profile = require('./dbConfigUser').Profile;

var app = express();
var http = require('http');

var cors = require('cors');

//Brings in local strategy from passport-config file
require('./passport-config')(passport);

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

	let hobbies = req.body.hobbies.split(',');
	hobbies.forEach((element, index, hobbies) => {
		hobbies[index] = element.trim();
	});

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

//gets specific profile by username
router.get('/profile/:username', (req, res) => getProfile(req, res));

//User login
router.post('/user/login', passport.authenticate('local'), (req, res) => {
	res.send({msg: 'Successfully logged in'});
});

//User logout --> dashboard
router.get('/user/logout', (req, res) => logoutUser(req, res));

//ShowsUser
router.get('/user/:username', (req, res) => showUser(req, res));

//Deletes user
router.delete('/user/:username', (req, res) => deleteUser(req, res));

//Update user
router.put('/user/:username', (req, res) => updateUser(req, res));

//Functions

async function updateUser(req, res) {
	const errors = [];
	let userToBeUpdated;

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

	if (errors.length > 0) {
		res.send(errors);
	} else {
		if (!req.body.email) {
			await User.findOne({ username: req.params.username }, (err, user) => {
				if (err) console.log('error'); //redirect
				if (user) {
					userToBeUpdated = {
						email: user.email,
						username: req.body.username
					};
				}
			});
		} else {
			if (!req.body.username) {
				userToBeUpdated = {
					email: req.body.email,
					username: req.params.username
				};
			} else {
				userToBeUpdated = {
					email: req.body.email,
					username: req.body.username
				};
			}
		}

		User.findOneAndUpdate({ username: req.params.username }, userToBeUpdated, (err, user) => {
			if (err) console.log('error'); //redirect
			if (user) {
				res.json(userToBeUpdated);
			} else {
				res.json({msg: 'No user found'});
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
			res.json({msg: 'You are successfully registe

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
