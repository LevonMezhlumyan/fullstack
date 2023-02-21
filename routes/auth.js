import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../controllers/AuthController.js";

const router = new Router();

router.post(
  "/login",
  [
    check("username")
      .escape()
      .notEmpty()
      .withMessage("Username required")
      .customSanitizer((value) => value.replace(/\s/g, ""))
      .isLength({ min: 3, max: 15 })
      .withMessage("Username must be between 3 and 15 characters")
      .matches(/^[A-Za-z0-9_.]+$/),
    check("password", "Password length must be from 4 to 12").isLength({
      min: 4,
      max: 12,
    }),
  ],
  AuthController.login
);

router.post(
  "/register",
  [
    check("username")
      .escape()
      .notEmpty()
      .withMessage("Username required")
      .customSanitizer((value) => value.replace(/\s/g, ""))
      .isLength({ min: 3, max: 15 })
      .withMessage("Username must be between 3 and 15 characters")
      .matches(/^[A-Za-z0-9_.]+$/),
    check("email", "Invalid email")
      .isEmail()
      .customSanitizer((value) => value.replace(/\s/g, "")),
    check("name", "Invalid name")
      .isLength({ min: 3, max: 15 })
      .customSanitizer((value) => value.replace(/\s/g, "")),
    check("password", "Password length must be from 4 to 12").isLength({
      min: 4,
      max: 12,
    }),
  ],
  AuthController.register
);

router.post("/logout", AuthController.logout);

export default router;
