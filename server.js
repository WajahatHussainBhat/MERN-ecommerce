const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express()
const port = process.env.PORT || 8080;
//config env
dotenv.config();

//database config
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`.bgCyan.white)
})