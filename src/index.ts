import mongoose from "mongoose";
import app from "./app";

const start = async () => {

  if (!process.env.DATABASE) {
    throw new Error('DATABASE url is not defined!');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined!');
  }


  try {
    await mongoose.connect(process.env.DATABASE || "mongodb+srv://admin:xxxxx@");
  } catch (error) {
    console.log("Error : ", error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
}

start();


