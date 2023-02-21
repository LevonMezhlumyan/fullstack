import { db } from "../connect.js";
import dto from "../dtos/dto.js";

class UserController {
  getUser(req, res) {
    if (!req.params?.userId)
      return res.status(404).json({ message: "Profile not found" });
    const userId = req.params.userId;
    const q = "select * from users where id = ?";

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(dto(data[0]));
    });
  }
  updateUser(req, res) {
    if (!req.body.profilePic || !req.body.coverPic)
      return res.status(500).json({ message: "Images are not selected" });
    const q =
      "update users set `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? where id = ?";

    const value = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilePic,
      req.body.coverPic,
      req.user.id,
    ];

    db.query(q, value, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({ message: "Updated" });
    });
  }
}
export default new UserController();
