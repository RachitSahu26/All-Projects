import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
await connect('mongodb+srv://curiousrachit26:curious2005261@cluster0.cmdu8dc.mongodb.net/');
// mongodb+srv://curiousrachit26:curious2005261@cluster0.cmdu8dc.mongodb.net/notebook
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;