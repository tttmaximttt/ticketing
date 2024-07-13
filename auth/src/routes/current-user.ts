import express, {Request, Response} from "express";
import { currentUser, requireAuth } from "@mr/lib-common";

const router = express.Router();

router.get( "/api/users/currentUser", currentUser, requireAuth, (req: Request, res: Response) => {
  if (!req.ctx?.user) {
    return res.send({ user: null });
  }

  res.status(200).send({ user: req.ctx.user });
})

export default router;
