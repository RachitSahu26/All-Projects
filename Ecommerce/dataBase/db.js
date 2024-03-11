import mongoose from "mongoose";

 export  const connectToMongo = async () => {
  try {
    const mongoURI = 'mongodb+srv://curiousrachit26:curious2005261@cluster0.cmdu8dc.mongodb.net/';
    // const dbName = 'your_database_name';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Remove this line
      useUnifiedTopology: true, // Remove this line
      // useCreateIndex: true,
    });
    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    // Optionally, you can rethrow the error to terminate the application
    // throw error;
  }
};
