import { db } from "../connect.js";
import dto from "../dtos/dto.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

class AuthController {
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(409).json({ message: "Invalid credentials" });
    const { username, password } = req.body;
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [username], async (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0)
        return res.status(404).json({ message: "Not found" });

      const checkPwd = await bcrypt.compare(password, data[0].password);
      if (!checkPwd)
        return res.status(400).json({ message: "Wrong password or username" });

      const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
      res.json({ ...dto(data[0]), token });
    });
  }

  register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(409).json({ message: "Invalid credentials" });
    const { username, email, password, name } = req.body;
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], async (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPwd = await bcrypt.hash(password, 10);
      const q =
        "insert into users (`username`, `email`, `password`, `name`) VALUE (?)";
      db.query(q, [[username, email, hashedPwd, name]], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json({ message: "User has been created" });
      });
    });
  }

  logout(req, res) {
    res
      .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "User has been logged out" });
  }
}
export default new AuthController();
