import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    const mongoURI = 'mongodb+srv://curiousrachit26:curious2005261@cluster0.cmdu8dc.mongodb.net/';
   
    mongoose.connect(mongoURI,);

    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};