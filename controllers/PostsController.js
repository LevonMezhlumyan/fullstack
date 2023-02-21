import { validationResult } from "express-validator";
import { db } from "../connect.js";
import moment from "moment";

class PostsController {
  getPosts(req, res) {
    const userId = req.query.userId;
    const q = userId
      ? `select p.*, u.id as usrId, name, profilePic 
    from posts as p join users as u on (u.id = p.userId) where p.userId = ?`
      : `select p.*, u.id as usrId, name, profilePic 
        from posts as p join users as u on (u.id = p.userId)
        left join relationships as r on (p.userId = r.followedUserId) 
        where r.followerUserid = ? or p.userId = ? order by p.createdAt desc`;

    const values = userId ? [userId] : [req.user.id, req.user.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  }
  addPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).json({ message: "Invalid credentials" });
    }

    const q =
      "insert into posts (`desc`, `img`, `createdAt`, `userId`) values (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.user.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Post has been created!" });
    });
  }
  deletePost(req, res) {
    if (!req.params.id)
      return res.status(404).json({ message: "Post not found" });
    const q = "delete from posts where `id`=? and `userId` = ?";

    db.query(q, [req.params.id, req.user.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Post has been deleted!" });
    });
  }
}

export default new PostsController();
