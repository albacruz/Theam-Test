import { User } from "../entity/User";
import { getConnection } from "typeorm";

export async function createUser(req, res) {
  const newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  await getConnection()
    .manager.save(newUser)
    .then(() => {
      res.send(newUser);
    })
    .catch((error) => console.log(error));
}
