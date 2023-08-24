'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataType) {
		await queryInterface.createTable('products', {
			uuid: { type: DataTypes.UUID, defaultValue: DataType.UUIDV4 },
			name: { type: DataTypes.STRING, allowNull: false },
			shortDescription: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.TEXT, allowNull: false },
			price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
			brand: { type: DataTypes.STRING, allowNull: false },
		});
	},

	async down(queryInterface, DataType) {
		await queryInterface.dropTable('products');
	},
};
