<<<<<<< HEAD:backend/index.ts
var express = require('express');
var app = express();
var http = require('http');
const mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());
=======
//Packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const User = require('./dbConfigUser');
>>>>>>> login:backend/index.js

//Brings in local strategy from passport-config file
require('./passport-config')(passport);


//Uses
router.use(express.json());         //to parse body objects within URL
router.use(express.urlencoded());
router.use(session(
    {
        secret: 'speeddate',
        resave: true,
        saveUninitialized: true
    }));

router.use(passport.initialize());
router.use(passport.session());


//User Registration - instanciates new user and saves it to database
router.post('/user', (req, res) => registrationUser(req, res));

//Routes
router.get('/', (req, res) => {res.send('LoginPage')});

<<<<<<< HEAD:backend/index.ts
app.post('/profile', function(req, res) {
	console.log('Profile created');
	console.log(req.params);
	res.send('OK');
});

//HIER soll docs hin
app.get('/profile/:id', (req, res) => getProfile(req, res));
=======
//User login
router.post('/user/login', passport.authenticate('local'), (req, res) => {res.send('logged in')});

//User logout --> dashboard
router.get('/user/logout', (req,res) => logoutUser(req, res));

//ShowsUser
router.get('/user/:username', (req, res) => showUser(req, res));

//Deletes user
router.delete('/user/:username', (req,res) => deleteUser(req, res));

//Update user
router.put('/user/:username', async (req,res) => {

        if(req.body.passwordOne != req.body.passwordTwo) {
            res.send("Password mismatch");
        }

        const hashedPW = await bcrypt.hash(req.body.passwordOne, 10);

        const userToBeUpdated = {
            email: req.body.email,
            username: req.body.username,
            password: hashedPW
        };

        User.findOneAndUpdate({ username: req.params.username }, userToBeUpdated, (err, user) => {
            if (err) console.log('error'); //redirect
            if (user) {
                res.json(userToBeUpdated);
            } else {
                res.send('No user found');
            }
        });
        //res.send('update');
    }
);









//Functions
/**
 * Registrates new user - but checks before if user already exists
 * @param {object} req - Represents the request object
 * @param {object} res - Represents the response object
 *
 */
async function registrationUser(req, res) {

    const errors = [];

    await User.findOne({username: req.body.username}, (err, user) => {
        if (err) console.log('error'); //redirect
        if (user) {
            errors.push({msg: "User with this username already exists"});
        }
    });

    await User.findOne({email: req.body.email}, async (err, user) => {
        if (err) console.log('error'); //redirect
        if (user) {
            errors.push({msg: "User with this email already exists"});
        }
    });


    try {
        const {email, username, passwordOne, passwordTwo} = req.body;

        // If not all required fields are filled in or password-mismatch
        if (!email || !username || !passwordOne || !passwordTwo) {
            errors.push({msg: "Fill in all required fields"});
        }

        // On password-mismatch
        if (passwordOne != passwordTwo) {
            errors.push({msg: "Password One does not match password Two"});
        }

        //Errors are found
        if (errors.length > 0) {
            res.json(errors);
            //redirect
        } else {           //Valid input
            const hashedPW = await bcrypt.hash(passwordOne, 10);

            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPW
            });

            //console.log(hashedPW + " " + user);
            user.save();
            res.send("well done")

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
        res.send("Not logged in");
    }
}

>>>>>>> login:backend/index.js

/**
 * This function executes logout-functionality
 * @param req - Represents the request object
 * @param res - Represents the response object
 */
<<<<<<< HEAD:backend/index.ts
function getProfile(req, res) {
	console.log('Profile of user with id ' + req.params.id + ' requested');
	// res.header('Access-Control-Allow-Origin', '*');

	mongoose.connect('mongodb://localhost:27017/speeddating', {
		useNewUrlParser: true
	});
}

var profileSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	age: Number,
	hobbies: [String]
});

var Profile = mongoose.model('Profile', profileSchema);
=======
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
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log('error'); //redirect
        res.json(user);
    })
}


/**
 * Deletes user
 * @param req - Represents the request object
 * @param res - Represents the response object
 *
 */
function deleteUser(req, res) {

    User.findOneAndDelete({username: req.params.username}, (err, user) => {
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
>>>>>>> login:backend/index.js
