import { passportConfig } from "../../../config/passport.config";
import { Router, Request, Response } from "express";
import { signJwt } from "../../../utils/jwt";
import {
  InternalErrorResponse,
  SuccessResponse,
} from "../../../helpers/response.helper";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send("logging in");
});

router.get(
  "/google",
  passportConfig.authenticate("google", { scope: ["profile"] }),
);

router.get(
  "/google/redirect",
  passportConfig.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req: Request, res: Response) => {
    const user: any = req.user;

    if (!user) {
      return InternalErrorResponse(
        res,
        "User login error occured. Profile not found",
      );
    }

    signJwt(user, "xxxxx", "24h").then((token) => {
      // Successful authentication, redirect home.
      return SuccessResponse(res, { user, accessToken: token });
    });
  },
);

router.get("/logout", (req: Request, res: Response) => {
  res.send("logging out");
});

export default router;
