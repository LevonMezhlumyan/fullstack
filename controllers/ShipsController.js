import { db } from "../connect.js";

class ShipsController {
  getShip(req, res) {
    if (!req.query.followedUserId)
      return res.status(404).json({ message: "User not found" });
    const q =
      "select followerUserId from relationships where followedUserId = ?";

    db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data.map((relationShip) => relationShip.followerUserId));
    });
  }
  addShip(req, res) {
    if (!req.query.userId)
      return res.status(404).json({ message: "User not found" });
    const q =
      "insert into relationships (`followerUserId`, `followedUserId`) values (?)";
    let values = [req.user.id, req.query.userId];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Following" });
    });
  }
  deleteShip(req, res) {
    if (!req.query.userId)
      return res.status(404).json({ message: "User not found" });
    const q =
      "delete from relationships where `followerUserId`=? and  `followedUserId` = ?";
    db.query(q, [req.user.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Unfollow" });
    });
  }
}

export default new ShipsController();
