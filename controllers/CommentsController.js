import { validationResult } from "express-validator";
import { db } from "../connect.js";
import moment from "moment";

class CommentsController {
  getComments(req, res) {
    if (!req.query.postId)
      return res.status(404).json({ message: "Post not found" });
    const q = `select c.*, u.id as usrId, name, profilePic 
    from comments as c join users as u on (u.id = c.userId)
    where c.postId = ? order by c.createdAt desc`;

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  }
  addComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).json({ message: "Invalid inputs" });
    }
    const q =
      "insert into comments (`desc`, `createdAt`, `userId`, `postId`) values (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.user.id,
      req.body.postId,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Comment added!" });
    });
  }
}

export default new CommentsController();
