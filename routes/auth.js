const express = require('express');
const { Admin, Customer } = require('../models');
const ROLES = require('../utils/roles');
const hashPassword = require('../utils/hashpass');
const router = express.Router();

// ****************************  CUSTOMER ROUTES *********************************

//create customer
router.post('/customers/create', async (req, res) => {
	console.log('Customer creation logic here');
});

// get all customers
// Protected route only admins can have this access
router.get('/customers/all', async (req, res) => {
	console.log('Get all customers');
});

// get One customer by ID
// Protected route only admins can have this access
router.get('/customers/:uuid', async (req, res) => {
	console.log('Get one customer');
});

// update user info
// Protected route admins and cusomers can edit account info
router.put('/customers/edit/:uuid', async (req, res) => {});

// Delete a customer account
// Protected route only admins and customer with that id can delete the account.
router.delete('/customers/:uuid', async (req, res) => {
	console.log('Delete customer');
});

// ****************************  ADMIN ROUTES *********************************

//create customer
router.post('/admins/create', async (req, res) => {
	const { name, email, password, role } = req.body;

	console.log('Valid Roles:', Object.values(ROLES));
	console.log('Provided Role:', role);

	try {
		const checkUser = await Admin.findOne({ where: { email } });
		if (checkUser) {
			res.json({ msg: 'Account already exist please login instead!' });
		} else {
			const hashedPass = await hashPassword(password);

			const admin = await Admin.create({
				name,
				email,
				password: hashedPass,
				role,
			});
			return res.status(201).json(admin);
		}
	} catch (error) {
		res.json({ error: error.message });
	}
});

// Admin Login Route
router.post('/admins/login', (req, res, next) => {
	passport.authenticate('local', (err, admin, info));
});

// get all admins
// Protected route only admins can have this access
router.get('/admins/all', async (req, res) => {
	console.log('Get all admins');
});

// get One customer by ID
// Protected route only admins can have this access
router.get('/admins/:uuid', async (req, res) => {
	console.log('Get one admin');
});

// update user info
// Protected route admins and admins can edit account info
router.put('/admins/edit/:uuid', async (req, res) => {});

// Delete a customer account
// Protected route only admins with that id can delete the account.
router.delete('/admins/:uuid', async (req, res) => {
	console.log('Delete Admin');
});

module.exports = router;
