import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import 'dotenv/config'

const app = express();
app.set('trust proxy', true); 
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)

app.use(json());
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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


