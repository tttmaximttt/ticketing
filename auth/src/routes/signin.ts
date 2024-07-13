import express, { Request, Response } from "express";
import { body } from "express-validator";
import {User} from "../models/user";
import Jwt from "jsonwebtoken";
import {Password} from "../utils/password";
import {validateRequest, BadRequestError, NotFoundError} from "@mr/lib-common";

const router = express.Router();

const validators = [
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage("Email is required"),
  body('password')
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
];

router.post("/api/users/signin", validators, validateRequest, async (req: Request, res: Response) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError('User not exist.');
  }

  const isPasswordCorrect = await Password.compare(user.password, password)

  if (!isPasswordCorrect) {
    throw new BadRequestError('Password does not match');
  }

  const jwt = Jwt.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_KEY!);


  req.session = { ...req.session, jwt };
  res.status(200).send(user)
})

export default router;
