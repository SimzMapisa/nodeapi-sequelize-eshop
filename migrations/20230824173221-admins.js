'use strict';

const { DataTypes } = require('sequelize');
const ROLES = require('../utils/roles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('admins', {
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ROLES.MODERATOR,
				validate: {
					isIn: [Object.values(ROLES)],
				},
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
	},
};
