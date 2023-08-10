const express = require('express');
const router = express.Router();

// ****************************  CUSTOMER ROUTES *********************************

//create customer
router.post('/customers/create', (req, res) => {
	console.log('Customer creation logic here');
});

// get all customers
// Protected route only admins can have this access
router.get('/customers/all', (req, res) => {
	console.log('Get all customers');
});

// get One customer by ID
// Protected route only admins can have this access
router.get('/customers/:uuid', (req, res) => {
	console.log('Get one customer');
});

// update user info
// Protected route admins and cusomers can edit account info
router.put('/customers/edit/:uuid', (req, res) => {});

// Delete a customer account
// Protected route only admins and customer with that id can delete the account.
router.delete('/customers/:uuid', (req, res) => {
	console.log('Delete customer');
});

// ****************************  ADMIN ROUTES *********************************

//create customer
router.post('/admins/create', (req, res) => {
	console.log('admin creation logic here');
});

// get all admins
// Protected route only admins can have this access
router.get('/admins/all', (req, res) => {
	console.log('Get all admins');
});

// get One customer by ID
// Protected route only admins can have this access
router.get('/admins/:uuid', (req, res) => {
	console.log('Get one admin');
});

// update user info
// Protected route admins and admins can edit account info
router.put('/admins/edit/:uuid', (req, res) => {});

// Delete a customer account
// Protected route only admins with that id can delete the account.
router.delete('/admins/:uuid', (req, res) => {
	console.log('Delete Admin');
});
