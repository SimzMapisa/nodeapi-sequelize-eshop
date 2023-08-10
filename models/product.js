'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Category }) {
			// define association here
			Product.belongsTo(Category);
			// Product.sync({ alter: true });
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	Product.init(
		{
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			name: { type: DataTypes.STRING, allowNull: false },
			shortDescription: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.TEXT, allowNull: false },
			price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
			brand: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			tableName: 'products',
			modelName: 'Product',
		}
	);
	return Product;
};
