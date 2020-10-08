import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { hashPassword } from "./userController";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env["ACCESS_TOKEN"];

export async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await getConnection().manager.findOne(User, {
    where: { username: username },
  });

  const hashedPassword = hashPassword(password, user.salt);

  if (hashedPassword === user.password) {
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
