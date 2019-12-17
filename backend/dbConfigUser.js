//Packages
const mongoose = require('mongoose');

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

var profileSchema = new mongoose.Schema(
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

var Profile = mongoose.model('Profile', profileSchema);

module.exports = { User: User, Profile: Profile };
