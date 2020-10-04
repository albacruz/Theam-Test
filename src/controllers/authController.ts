import { User } from "../entities/User";
import { getConnection } from "typeorm";
import * as jwt from "jsonwebtoken";

const accessTokenSecret = "0123456789";

export async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await getConnection().manager.findOne(User, {
    where: { username: username, password: password },
  });

  if (user) {
    const accesToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      accessTokenSecret
    );
    res.json({
      accesToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
}
