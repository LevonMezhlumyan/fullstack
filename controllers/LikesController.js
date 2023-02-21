import { db } from "../connect.js";

class LikesController {
  getLikes(req, res) {
    if (!req.query.postId)
      return res.status(404).json({ message: "Post not found" });
    const q = "select userId from likes where postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data.map((like) => like.userId));
    });
  }
  addLike(req, res) {
    if (!req.query.postId)
      return res.status(404).json({ message: "Post not found" });
    const q = "insert into likes (`userId`, `postId`) values (?)";
    let values = [req.user.id, req.query.postId];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Post has been liked" });
    });
  }
  deleteLike(req, res) {
    if (!req.query.postId)
      return res.status(404).json({ message: "Post not found" });
    const q = "delete from likes where `userId` = ? AND `postId` = ?";
    db.query(q, [req.user.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Like has been deleted" });
    });
  }
}

export default new LikesController();
