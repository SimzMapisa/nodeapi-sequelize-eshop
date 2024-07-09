const express = require('express');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/auth');
const sequelize = require('sequelize');
const session = require('express-session');
const app = express();

if (process.env.ENVIRONMENT !== 'production') {
	require('dotenv').config();
}

// set up session
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false, maxAge: 60000 },
	})
);

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	// sequelize.sync({ alter: true });
	// sequelize.sync({ force: true });
	console.log(`Server listening on port ${port}`);
});
