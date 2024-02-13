import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
await connect('mongodb+srv://curiousrachit26:<password>@cluster0.cmdu8dc.mongodb.net/');
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;