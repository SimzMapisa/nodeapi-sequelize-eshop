'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('categories', {
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			parentId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('categories');
	},
};
