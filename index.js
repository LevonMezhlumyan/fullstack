import cors from "cors";
// import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
import LikeRouter from "./routes/likes.js";
import UserRouter from "./routes/users.js";
import PostsRouter from "./routes/posts.js";
import ShipsRouter from "./routes/Ships.js";
import CommentsRouter from "./routes/comments.js";
import path from "path";
// dotenv.config();

const app = express();
const port = process.env.PORT || 4545;

app.use(express.json());
app.use(cors({ origin: "https://magnificent-rose-antelope.cyclic.app" }));
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/ships", ShipsRouter);
app.use("/api/likes", LikeRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/comments", CommentsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./social-media/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "social-media", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});
