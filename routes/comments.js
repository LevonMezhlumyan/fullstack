import { Router } from "express";
import { check } from "express-validator";
import { CheckAuth } from "../middlewares/ChekAuth.js";
import CommentsController from "../controllers/CommentsController.js";

const router = new Router();

router.get("/", CheckAuth, CommentsController.getComments);
router.post(
  "/",
  [
    check("desc")
      .escape()
      .notEmpty()
      .withMessage("Description required")
      .isLength({ min: 3, max: 200 })
      .withMessage("Description must be between 3 and 200 characters")
      .matches(/^[A-Za-z0-9_.!:;\s'"`]+$/),
  ],
  CheckAuth,
  CommentsController.addComment
);

export default router;
