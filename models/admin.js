'use strict';
const { Model } = require('sequelize');
const { ROLES } = require('../utils/roles');

module.exports = (sequelize, DataTypes) => {
	class ADMIN extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ADMIN.init(
		{
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
		},
		{
			sequelize,
			tableName: 'admins',
			modelName: 'Admin',
		}
	);
	return ADMIN;
};
