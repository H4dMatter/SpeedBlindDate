//Packages
const mongoose = require('mongoose');


//User Schema
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ collection: 'users' }
);

const User = mongoose.model('User', userSchema);


//Profile Schema
const profileSchema = new mongoose.Schema(
	{
		username: String,
		firstName: String,
		lastName: String,
		age: Number,
		hobbies: [String],
		gender: String,
		preferences: {
			genderPref: String,
			ageRange: {
				minAge: Number,
				maxAge: Number
			}
		},
		images: [{ data: 'Buffer', contentType: String }]
	},
	{ collection: 'profiles' }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { User: User, Profile: Profile };
