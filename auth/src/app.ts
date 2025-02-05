import express from "express";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import 'express-async-errors';
import currentUserRouter from './routes/current-user';
import signInRouter from './routes/signin';
import signupRouter from './routes/signup';
import signOutRouter from './routes/signout';
import { errorHandler, NotFoundError } from "@mr/lib-common";

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test",
}));

app.use(currentUserRouter);
app.use(signOutRouter);
app.use(signupRouter);
app.use(signInRouter);

app.use('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
