const express = require('express');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const { sequelize } = require('./models');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	// sequelize.sync({ alter: true });
	// sequelize.sync({ force: true });
	console.log(`Server listening on port ${port}`);
});
