const express = require('express');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/auth');
const app = express();

if (process.env.ENVIRONMENT !== 'production') {
	require('dotenv').config();
}

// Middleware
app.use(express.json());

//Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	// sequelize.sync({ alter: true });
	// sequelize.sync({ force: true });
	console.log(`Server listening on port ${port}`);
});
