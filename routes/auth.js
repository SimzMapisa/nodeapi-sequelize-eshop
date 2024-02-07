const express = require('express');
const { Admin, Customer } = require('../models');
const { ROLES } = require('../utils/roles');
const { hashPassword } = require('../utils/hashpass');
const passport = require('passport');
const router = express.Router();
require('../config/passport');

// ****************************  ROUTES *********************************
/**
 * @route POST /admins/create_super
 * @group Admins - Operations about admins
 * @param {string} name.body.required - admin name
 * @param {string} email.body.required - admin email
 * @param {string} password.body.required - admin password
 */

router.post('/admins/create_super', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const checkUser = await Admin.findOne({ where: { email } });
		if (checkUser) {
			return res.json({ msg: 'Account already exist please login instead!' });
		}

		const hashedPass = await hashPassword(password);

		// Check if any admin exists
		const existingAdmin = await Admin.findOne();

		// If no admin exists, make this user a super admin
		const role = existingAdmin ? ROLES.ADMIN : ROLES.SUPER_ADMIN;

		const admin = await Admin.create({
			name,
			email,
			password: hashedPass,
			role,
		});

		return res.json(admin);
	} catch (error) {
		return res.status(500).json({ msg: 'An error occurred', error });
	}
});

/**
 * @route POST /admins/create
 * @description Create a new admin account with role of moderator by default this can be changed later and only super_admins * create new admins
 */

// TODO: add authentication middleware to this route so only super_admins can create new admins

router.post('/admins/create', async (req, res) => {
	const { name, email, password, role } = req.body;

	try {
		const checkUser = await Admin.findOne({ where: { email } });
		if (checkUser) {
			return res.json({ msg: 'Account already exist please login instead!' });
		}
		const hashedPass = await hashPassword(password);
		const admin = await Admin.create({
			name,
			email,
			password: hashedPass,
			role: role || ROLES.MODERATOR,
		});

		return res.json(admin);
	} catch (error) {
		return res.status(500).json({ msg: 'An error occurred', error });
	}
});

// Here we will create the customer ceate account route
router.post('/customer', async (req, res) => {
	const { name, email, physicalAddress, password, role } = req.body;

	try {
		const checkUser = await Customer.findOne({ where: { email } });
		if (checkUser) {
			return res.json({ msg: 'Account already exist please login instead!' });
		}
		const hashedPass = await hashPassword(password);
		const customer = await Customer.create({
			name,
			email,
			physicalAddress,
			password: hashedPass,
			role: role || ROLES.CUSTOMER,
		});

		return res.json(customer);
	} catch (error) {
		return res.status(500).json({ msg: 'An error occurred', error });
	}
});

// Admin Login Route
router.post('/login', passport.authenticate('local'));

router.get('/dashboard', (req, res) => {
	res.send('Welcome to the dashboard');
});

/**
 * @route GET /admins/all
 * @description Get all admins only super_admins, admins and moderators can have this access
 */

// TODO: add authentication middleware to this route so only super_admins, admins and moderators can have this access

router.get('/admins/all', async (req, res) => {
	try {
		const admins = await Admin.findAll();
		return res.json(admins);
	} catch (error) {
		return res.status(500).json({ msg: 'An error occurred', error });
	}
});

// get One customer by ID
// Protected route only admins can have this access
router.get('/admins/:uuid', async (req, res) => {
	console.log('Get one admin');
});

/**
 * @route PUT /admins/edit/:uuid
 * @description Edit a user account and only admins super admins moderator and the user can edit the account
 */

// TODO: add authentication middleware to this route so only admins super admins moderator and the user can edit the account

router.put('/admins/edit/:uuid', async (req, res) => {});

// Delete a customer account
// Protected route only admins with that id can delete the account.
router.delete('/admins/:uuid', async (req, res) => {
	console.log('Delete Admin');
});

module.exports = router;
