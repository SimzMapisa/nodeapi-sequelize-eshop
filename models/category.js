'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Product }) {
			// define association here
			Category.hasMany(Product);
			Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
			Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	Category.init(
		{
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
		},
		{
			sequelize,
			tableName: 'categories',
			modelName: 'Category',
		}
	);
	return Category;
};
