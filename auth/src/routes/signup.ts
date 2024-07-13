import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/user";
import {validateRequest, BadRequestError} from "@mr/lib-common";

const router = express.Router();
const validators = [
  body('email')
    .isEmail()
    .withMessage("Email is required"),
  body('password')
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password is must be at least 6 characters and max 16"),
];

router.post("/api/users/signup", validators, validateRequest, async (req: Request, res: Response) => {
  const {
    email,
    password
  } = req.body;

  const isUserExist = await User.exists({ email });

  if (isUserExist) {
    throw new BadRequestError('Email exist.');
  }

  const user = User.build({ email, password })
  await user.save();

  const jwt = Jwt.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_KEY!);


  req.session = { ...req.session, jwt };
  res.status(201).send(user)
})

export default router;
