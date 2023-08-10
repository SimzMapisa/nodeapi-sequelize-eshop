const express = require('express');
const { Product, Category } = require('../models');
const router = express.Router();

// This route is used to get all the products
router.get('/products/all', async (req, res) => {
	try {
		const products = await Product.findAll({ include: Category });
		return res.json(products);
	} catch (error) {
		console.log('Could not find products!', error.message);
		return res.status(404).json({ error: 'Could not find products' });
	}
});

// Use this rout to get only one product
router.get('/products/:uuid', async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const product = await Product.findOne({
			where: { uuid },
			include: Category,
		});
		return res.json(product);
	} catch (error) {
		return res.status(404).json({ message: 'Product not found' });
	}
});

// Create a new product
router.post('/products/create', async (req, res) => {
	const { name, description, shortDescription, brand, CategoryId, price } =
		req.body;
	const exists = await Product.findOne({ where: { name } });
	if (exists) {
		return res.status(400).json({ message: 'Product already exists' });
	}
	try {
		const product = await Product.create({
			name,
			price,
			description,
			shortDescription,
			brand,
			CategoryId,
		});
		return res.status(201).json(product);
	} catch (error) {
		console.error('Error creating product:', error.message);
		return res.status(500).json({ error: 'Failed to create product' });
	}
});

// Edit a product
router.put('/products/:uuid', async (req, res) => {
	try {
		const uuid = req.params.uuid;
		const { name, shortDescription, brand, categoryId, description, price } =
			req.body;
		const toUpdate = await Product.findOne({ where: { uuid } });
		if (toUpdate) {
			await Product.update(
				{
					name,
					price,
					description,
					shortDescription,
					brand,
					categoryId,
				},
				{ where: { uuid } }
			);
			return res.status(204).json({ msg: 'Product updated successfully!' });
		} else {
			return res.status(404).json({ msg: 'Product not found!' });
		}
	} catch (error) {
		return res.status(500).json({ msg: 'Internal Server Error!' });
	}
});

// Delete a product by id
router.delete('/products/:uuid', async (req, res) => {
	try {
		const uuid = req.params.uuid;
		const toDelete = await Product.findOne({ where: { uuid } });
		if (toDelete) {
			await Product.destroy({ where: { uuid } });
			return res.status(204).json({ msg: 'Product deleted successfully' });
		} else {
			return res.status(404).json({ msg: 'can not find product with that id' });
		}
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error!' });
	}
});

module.exports = router;
