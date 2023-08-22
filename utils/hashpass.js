const bcrypt = require('bcrypt');
const saltRounds = 10;

// const hashPassword = async (password) => {
// 	var hashed;
// 	await bcrypt.hash(password, saltRounds, function (err, hash) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		hashed = hash;
// 		// console.log(hashed);
// 	});
// 	return hashed;
// };

// export default hashPassword;

const hashPassword = async (password) => {
	try {
		const hashed = await bcrypt.hash(password, saltRounds);
		return hashed;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

module.exports = hashPassword;

// hashPassword('Simbarashe');
