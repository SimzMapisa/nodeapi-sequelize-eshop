const express = require('express');
const { Category, Product } = require('../models');
const router = express.Router();

//Create Categories
router.post('/categories/create', async (req, res) => {
	const { name, description, parentId } = req.body;
	const categoryExists = await Category.findOne({ where: { name } });
	if (categoryExists) {
		return res.status(400).json({ msg: 'Category already exists!' });
	}
	try {
		const newCategory = await Category.create({ name, description, parentId });
		return res.status(201).json(newCategory);
	} catch (error) {
		console.log(error);
	}
});
//Get category by ID
router.get('/categories/category/:uuid', async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const category = await Category.findOne({
			where: { uuid },
			include: Product,
		});
		if (category) {
			return res.status(200).json(category);
		} else {
			return res.status(404).json({ msg: 'Category not found!' });
		}
	} catch (error) {
		console.log(error);
	}
});
//Get all categories
router.get('/categories/all', async (req, res) => {
	try {
		const allCategories = await Category.findAll();
		if (allCategories.length !== 0) {
			return res.status(200).json(allCategories);
		} else {
			return res.status(200).json({ msg: 'no categories' });
		}
	} catch (error) {
		console.log(error);
	}
});

//Update category
router.put('/categories/category/:uuid', async (req, res) => {
	const uuid = req.params.uuid;
	const { name, description, parentId } = req.body;
	try {
		const categoryToUpdate = await Category.findOne({ where: { uuid } });
		if (categoryToUpdate) {
			await Category.update(
				{
					name,
					description,
					parentId,
				},
				{ where: { uuid } }
			);
			return res.status(200).json({ msg: 'category updated!' });
		} else {
			return res.status(404).json({ msg: 'category not found!' });
		}
	} catch (error) {}
});
//Delete category
router.delete('/categories/:uuid', async (req, res) => {
	const uuid = req.params.uuid;
	let toDelete;
	try {
		const category = await Category.findOne({ where: { uuid } });
		if (category) {
			toDelete = category;
			Category.destroy({ where: { uuid } }).then(() => {
				console.log('category deleted successfully');
			});
			return res.status(200).json(toDelete);
		} else {
			return res.status(404).json({ msg: 'category not found!' });
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
