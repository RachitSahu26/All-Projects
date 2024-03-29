// Import required modules
import express from 'express';
import morgan from 'morgan';

import router from './routes/authRoute.js';
import dotenv from "dotenv";
import cors from 'cors';
import categoryRoute from './routes/categoryRoute.js';
// import productModel from './models/productModel.js';

import productRoute from './routes/productRoute.js'
import { connectToMongo } from './dataBase/db.js';

//configure env
dotenv.config();
// Create an Express application
const app = express();
const port = 3000;


// middle ware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
  

// databse connection is here 
connectToMongo();



// Define a route
app.use("/api/auth",router);
app.use("/api/category",categoryRoute);
app.use("/api/product",productRoute);






app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
