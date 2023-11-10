const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
	try {
		const hashed = await bcrypt.hash(password, saltRounds);
		return hashed;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const comparePasswords = (password, dbPassword) => {
	bcrypt.compare(password, dbPassword, function (err, result) {
		if (err) {
			return false;
		}

		return true;
	});
};

module.exports = { hashPassword, comparePasswords };
