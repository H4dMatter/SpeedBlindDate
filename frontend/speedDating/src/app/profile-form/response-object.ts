/**
 * This class gives definitions for the Response Object when searching for Users, this way the profile-form knows the fields you can access on it
 */
export class ResponseObject {
	username: string;
	firstName: string = null;
	lastName: string = null;
	age: number = null;
	hobbies: [string] = null;
	gender: string = null;
	preferences: {
		genderPref: string;
		ageRange: {
			minAge: number;
			maxAge: number;
		};
	};
}
