// Import required modules
import express from 'express';
import morgan from 'morgan';
import connectToMongo from './dataBase/db.js';
import router from './routes/authRoute.js';


// Create an Express application
const app = express();
const port = 3000;


// middle ware
app.use(express.json())
app.use(morgan("dev"))
  

// databse connection is here 
connectToMongo();



// Define a route
app.use("/api/auth",router);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
