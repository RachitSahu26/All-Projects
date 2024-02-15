import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://curiousrachit26:curious2005261@cluster0.cmdu8dc.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // Increase the connection timeout
      socketTimeoutMS: 45000, // Increase the socket timeout
    });
    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
