const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { Admin, Customer } = require('../models');

const { comparePasswords } = require('../utils/hashpass');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				const admin = await Admin.findOne({ where: { email } });
				const customer = await Customer.findOne({ where: { email } });

				console.log({ admin, customer });
			} catch (error) {
				return done(error);
			}
		}
	)
);

// passport.serializeUser((user, done) => {
// 	console.log(user);
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	Admin.findByPk(id)
// 		.then((user) => {
// 			if (user) {
// 				done(null, user.get());
// 			} else {
// 				Customer.findByPk(id)
// 					.then((user) => {
// 						done(null, user.get());
// 					})
// 					.catch((err) => {
// 						done(err, null);
// 					});
// 			}
// 		})
// 		.catch((err) => {
// 			done(err, null);
// 		});
// });

module.exports = passport;
